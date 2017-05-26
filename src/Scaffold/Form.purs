module Scaffold.Form where

import Control.Applicative (pure)
import Control.Apply ((<*>))
import Control.IxMonad (ipure, (:>>=))
import Control.Monad (class Monad)
import Data.Either (Either(..))
import Data.Functor ((<$>))
import Data.Tuple (Tuple(..))
import Data.Unit (Unit, unit)
import Hyper.Conn (Conn)
import Hyper.Form (Form, parseForm)
import Hyper.Middleware (Middleware)
import Hyper.Request (class ReadableBody, class Request)

class FromForm a where
  fromForm :: Form -> Either String a

instance fromFormUnit :: FromForm Unit where
  fromForm _ = pure unit

instance fromFormTuple :: (FromForm a, FromForm b) => FromForm (Tuple a b) where
  fromForm form = Tuple <$> fromForm form <*> fromForm form

parseFromForm
  :: forall m req res c a
  . Monad m
  => Request req m
  => ReadableBody req m String
  => FromForm a
  => Middleware m (Conn req res c) (Conn req res c) (Either String a)
parseFromForm = parseForm :>>= case _ of
  Left err ->
    ipure (Left err)
  Right form ->
    ipure (fromForm form)
