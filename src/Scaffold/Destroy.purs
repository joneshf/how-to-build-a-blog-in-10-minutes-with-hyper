module Scaffold.Destroy where

import Control.Bind (discard)
import Data.Function (($))
import Data.Monoid (mempty)
import Data.Tuple (Tuple(..))
import Data.Unit (Unit)
import Text.Smolder.HTML (div)
import Text.Smolder.Markup (Markup)

newtype Destroy (name :: Symbol) a = Destroy a

class EncodeDestroy a where
  encodeDestroy :: a -> Markup Unit

instance encodeDestroyUnit :: EncodeDestroy Unit where
  encodeDestroy _ = mempty

instance encodeDestroyTuple :: (EncodeDestroy a, EncodeDestroy b) => EncodeDestroy (Tuple a b) where
  encodeDestroy (Tuple x y) = do
    div $ encodeDestroy x
    encodeDestroy y
