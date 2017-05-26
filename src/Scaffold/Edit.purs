module Scaffold.Edit where

import Control.Bind (discard)
import Data.Function (($))
import Data.Monoid (mempty)
import Data.Tuple (Tuple(..))
import Data.Unit (Unit)
import Text.Smolder.HTML (div)
import Text.Smolder.Markup (Markup)

class EncodeEdit a where
  encodeEdit :: a -> Markup Unit

instance encodeEditUnit :: EncodeEdit Unit where
  encodeEdit _ = mempty

instance encodeEditTuple :: (EncodeEdit a, EncodeEdit b) => EncodeEdit (Tuple a b) where
  encodeEdit (Tuple x y) = do
    div $ encodeEdit x
    encodeEdit y
