module Blog where

import Control.IxMonad ((:*>))
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE)
import Data.Unit (Unit)
import Hyper.Node.Server (defaultOptionsWithLogging, runServer)
import Hyper.Response (closeHeaders, respond, writeStatus)
import Hyper.Status (statusOK)
import Node.HTTP (HTTP)

main :: forall e. Eff (console :: CONSOLE, http :: HTTP | e) Unit
main =
  runServer defaultOptionsWithLogging {} blog
  where
  blog =
    writeStatus statusOK
      :*> closeHeaders
      :*> respond "Hello, LambdaConf!"
