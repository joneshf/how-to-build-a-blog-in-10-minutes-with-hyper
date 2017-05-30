module Hyper.Node.BasicAuth where

import Data.StrMap as StrMap
import Node.Buffer as Buffer
import Control.IxMonad (ibind, ipure)
import Control.Monad (class Monad, (>>=))
import Control.Monad.Eff.Class (liftEff, class MonadEff)
import Data.Functor ((<$>))
import Data.Maybe (Maybe(Nothing, Just))
import Data.Monoid ((<>))
import Data.String (Pattern(Pattern), split)
import Data.Tuple (Tuple(Tuple))
import Data.Unit (Unit)
import Hyper.Authentication (setAuthentication)
import Hyper.Conn (Conn)
import Hyper.Middleware (Middleware, lift')
import Hyper.Middleware.Class (getConn, modifyConn)
import Hyper.Request (class Request, getRequestData)
import Hyper.Response (class ResponseWritable, respond, class Response, ResponseEnded, StatusLineOpen, closeHeaders, writeHeader, writeStatus)
import Hyper.Status (statusUnauthorized)
import Node.Buffer (BUFFER)
import Node.Encoding (Encoding(ASCII, Base64))

type Realm = String

decodeBase64 ∷ ∀ m e c
  .  MonadEff (buffer ∷ BUFFER | e) m
  => String
  → Middleware m c c String
decodeBase64 encoded =
  liftEff (Buffer.fromString encoded Base64 >>= Buffer.toString ASCII)


withAuthentication
  :: forall m e req res c t
  .  MonadEff (buffer :: BUFFER | e) m
  => Request req m
  => (Tuple String String -> m (Maybe t))
  -> Middleware
     m
     (Conn req res { authentication :: Unit | c })
     (Conn req res { authentication :: Maybe t | c })
     Unit
withAuthentication mapper = do
  auth <- getAuth
  modifyConn (setAuthentication auth)
  where
    splitPair s =
      case split (Pattern ":") s of
        [username, password] -> Just (Tuple username password)
        _ -> Nothing
    getAuth = do
      { headers } <- getRequestData
      case StrMap.lookup "authorization" headers of
        Nothing -> ipure Nothing
        Just header -> do
          case split (Pattern " ") header of
            ["Basic", encoded] -> do
              decoded <- splitPair <$> decodeBase64 encoded
              case decoded of
                Just auth -> lift' (mapper auth)
                Nothing -> ipure Nothing
            parts -> ipure Nothing
    bind = ibind

authenticated
  :: forall m req res c b t
  .  Monad m
  => ResponseWritable b m String
  => Response res m b
  => Realm
  -> Middleware
      m
      (Conn req (res StatusLineOpen) { authentication :: t | c })
      (Conn req (res ResponseEnded) { authentication :: t | c })
      Unit
  -> Middleware
     m
     (Conn req (res StatusLineOpen) { authentication :: Maybe t | c })
     (Conn req (res ResponseEnded) { authentication :: Maybe t | c })
     Unit
authenticated realm mw = do
  conn ← getConn
  case conn.components.authentication of
    Nothing -> do
      _ <- writeStatus statusUnauthorized
      _ <- writeHeader (Tuple "WWW-Authenticate" ("Basic realm=\"" <> realm <> "\""))
      _ <- closeHeaders
      respond "Please authenticate."
    Just auth -> do
      _ <- modifyConn (setAuthentication auth)
      _ <- mw
      modifyConn (setAuthentication (Just auth))
  where
    bind = ibind
