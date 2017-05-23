module Blog where

import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)
import Data.Unit (Unit)

main :: forall e. Eff ( console :: CONSOLE | e ) Unit
main = log "Hello LambdaConf!"
