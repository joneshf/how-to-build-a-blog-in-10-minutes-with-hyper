module Blog where

import Blog.Comment as Blog.Comment
import Blog.Post as Blog.Post
import Scaffold as Scaffold
import Scaffold.Server as Scaffold.Server
import Blog.Comment (Comment)
import Blog.Post (Post)
import Control.Bind (bind)
import Control.IxMonad ((:*>), (:>>=))
import Control.Monad.Aff (Aff, launchAff)
import Control.Monad.Aff.AVar (AVAR)
import Control.Monad.Aff.Class (class MonadAff)
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Class (liftEff)
import Control.Monad.Eff.Console (CONSOLE)
import Control.Monad.Eff.Exception (EXCEPTION)
import Control.Monad.Error.Class (class MonadThrow)
import Data.Either (Either)
import Data.Foldable (fold)
import Data.Function (($))
import Data.Functor (void)
import Data.Maybe (Maybe)
import Data.MediaType.Common (textHTML)
import Data.Unit (Unit)
import Database.PostgreSQL (Connection, POSTGRESQL, PoolConfiguration, newPool, withConnection)
import Hyper.Conn (Conn)
import Hyper.Form (Form, parseForm)
import Hyper.Middleware (Middleware)
import Hyper.Node.Server (HttpRequest, HttpResponse, defaultOptionsWithLogging, runServer)
import Hyper.Response (ResponseEnded, StatusLineOpen, closeHeaders, contentType, respond, writeStatus)
import Hyper.Status (Status)
import Hyper.Trout.Router (RoutingError, router)
import Node.HTTP (HTTP)
import Scaffold (Scaffold, CollectionApi)
import Scaffold.Form (fromForm)
import Type.Proxy (Proxy(..))
import Type.Trout (type (:<|>), (:<|>))

type Server e c =
  Middleware
    (Aff (ServerEffects e))
    (Conn HttpRequest (HttpResponse StatusLineOpen) c)
    (Conn HttpRequest (HttpResponse ResponseEnded) c)
    Unit

type ServerEffects e =
  (avar :: AVAR, console :: CONSOLE, http :: HTTP, postgreSQL :: POSTGRESQL | e)

main :: Eff (ServerEffects (exception :: EXCEPTION)) Unit
main = void $ launchAff do
  pool <- newPool poolConfiguration
  withConnection pool \conn -> do
    liftEff $ runServer defaultOptionsWithLogging {} $ server conn
  where
  onRoutingError :: forall e. Status -> Maybe String -> Server e {}
  onRoutingError status msg =
    writeStatus status
    :*> contentType textHTML
    :*> closeHeaders
    :*> respond (fold msg)
  server :: forall e. Connection -> Server e {}
  server conn =
    parseForm :>>= server' conn
  server' :: forall e. Connection -> Either String Form -> Server e {}
  server' conn form =
    router blog (handlers conn form) onRoutingError
  handlers
    :: forall e m
    . MonadAff (console :: CONSOLE, postgreSQL :: POSTGRESQL | e) m
    => MonadThrow RoutingError m
    => Connection
    -> Either String Form
    -> Scaffold.Server "post" m Post Comment
      :<|> Scaffold.Collection "post" m Post Comment
  handlers conn form =
    Scaffold.Server.server conn (bind form fromForm :: Either String Blog.Post.Fields)
    :<|> Scaffold.Server.createElement conn (bind form fromForm :: Either String Blog.Comment.Fields)

poolConfiguration :: PoolConfiguration
poolConfiguration =
  { database : "blog"
  , host : "localhost"
  , idleTimeoutMillis : 600000
  , max : 100
  , password : ""
  , port : 5432
  , user : "blog"
  }

type Blog
  = Scaffold "post" Post Comment
  :<|> CollectionApi "post" Post Comment

blog :: Proxy Blog
blog = Proxy
