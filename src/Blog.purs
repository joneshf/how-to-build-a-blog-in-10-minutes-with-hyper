module Blog where

import Control.Bind (bind)
import Control.IxMonad ((:*>))
import Control.Monad.Aff (Aff, launchAff)
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Class (liftEff)
import Control.Monad.Eff.Console (CONSOLE)
import Control.Monad.Eff.Exception (EXCEPTION)
import Data.Function (($))
import Data.Functor (void)
import Data.Unit (Unit)
import Database.PostgreSQL (POSTGRESQL, PoolConfiguration, newPool, withConnection)
import Hyper.Conn (Conn)
import Hyper.Middleware (Middleware)
import Hyper.Node.Server (HttpRequest, HttpResponse, defaultOptionsWithLogging, runServer)
import Hyper.Response (ResponseEnded, StatusLineOpen, closeHeaders, respond, writeStatus)
import Hyper.Status (statusOK)
import Node.HTTP (HTTP)

type Server e c =
  Middleware
    (Aff e)
    (Conn HttpRequest (HttpResponse StatusLineOpen) c)
    (Conn HttpRequest (HttpResponse ResponseEnded) c)
    Unit

main :: forall e. Eff (exception :: EXCEPTION, postgreSQL :: POSTGRESQL, http :: HTTP, console :: CONSOLE | e) Unit
main = void $ launchAff do
  pool <- newPool poolConfiguration
  withConnection pool \conn ->
    liftEff $ runServer defaultOptionsWithLogging {} server
  where
  server :: forall c. Server (http :: HTTP, console :: CONSOLE, postgreSQL :: POSTGRESQL | e) c
  server =
    writeStatus statusOK
      :*> closeHeaders
      :*> respond "Hello LambdaConf!"

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
