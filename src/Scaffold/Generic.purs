module Scaffold.Generic where

import Data.Array (last)
import Data.Function (($))
import Data.Generic (GenericSignature(..))
import Data.Maybe (fromMaybe)
import Data.Newtype (wrap)
import Data.String (split)
import Data.Unit (unit)

prettySignature :: GenericSignature -> String
prettySignature = case _ of
  SigBoolean -> "Boolean"
  SigChar -> "Char"
  SigInt -> "Int"
  SigNumber -> "Number"
  SigString -> "String"
  SigUnit -> "Unit"
  SigArray f -> prettySignature (f unit)
  SigRecord fields -> ""
  SigProd ty _ -> fromMaybe ty $ last $ split (wrap ".") ty
