module Blog where

import Blog.Post (Post, Fields)
import Control.Bind (bind)
import Control.IxMonad ((:*>), (:>>=))
import Control.Monad.Aff (Aff, launchAff)
import Control.Monad.Aff.AVar (AVAR)
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Class (liftEff)
import Control.Monad.Eff.Console (CONSOLE)
import Control.Monad.Eff.Exception (EXCEPTION)
import Data.Either (Either)
import Data.Foldable (fold)
import Data.Function (($))
import Data.Functor (void)
import Data.Maybe (Maybe)
import Data.MediaType.Common (textHTML)
import Data.Unit (Unit)
import Database.PostgreSQL (Connection, POSTGRESQL, PoolConfiguration, newPool, withConnection)
import Hyper.Conn (Conn)
import Hyper.Middleware (Middleware)
import Hyper.Node.Server (HttpRequest, HttpResponse, defaultOptionsWithLogging, runServer)
import Hyper.Response (ResponseEnded, StatusLineOpen, closeHeaders, contentType, respond, writeStatus)
import Hyper.Status (Status)
import Hyper.Trout.Router (router)
import Node.HTTP (HTTP)
import Scaffold (Scaffold)
import Scaffold.Form (parseFromForm)
import Scaffold.Server as Scaffold.Server
import Type.Proxy (Proxy(..))

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
    parseFromForm :>>= server' conn
  server' :: forall e. Connection -> Either String Fields -> Server e {}
  server' conn fields =
    router blog (Scaffold.Server.server conn fields) onRoutingError

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

type Blog = Scaffold "blog" Post

blog :: Proxy Blog
blog = Proxy
