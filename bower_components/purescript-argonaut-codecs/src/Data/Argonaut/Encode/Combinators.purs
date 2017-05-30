-- | Provides operators for a DSL to construct `Json` values:
-- |
-- | ``` purescript
-- | myJson
-- |  = "key1" := value1
-- |  ~> "key2" := value2
-- |  ~> jsonEmptyObject
-- | ```
module Data.Argonaut.Encode.Combinators where

import Prelude

import Data.Argonaut.Core (Json, JAssoc, foldJsonObject, fromObject, jsonSingletonObject)
import Data.Argonaut.Encode.Class (class EncodeJson, encodeJson)
import Data.StrMap as SM
import Data.Tuple (Tuple(..))

-- | Creates a `JAssoc` entry, representing a key/value pair for an object.
infix 7 assoc as :=

-- | The named implementation of the `(:=)` operator.
assoc :: forall a. EncodeJson a => String -> a -> JAssoc
assoc k = Tuple k <<< encodeJson

-- | Extends a Json object with a `JAssoc` property.
infixr 6 extend as ~>

-- | The named implementation of the `(~>)` operator.
extend :: forall a. EncodeJson a => JAssoc -> a -> Json
extend (Tuple k v) =
  foldJsonObject
    (jsonSingletonObject k v)
    (SM.insert k v >>> fromObject)
    <<< encodeJson
