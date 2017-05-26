module Scaffold.Show where

import Control.Bind (discard)
import Data.Function (($))
import Data.Monoid (mempty)
import Data.Tuple (Tuple(..))
import Data.Unit (Unit)
import Text.Smolder.HTML (div)
import Text.Smolder.Markup (Markup)

class EncodeShow a where
  encodeShow :: a -> Markup Unit

instance encodeShowUnit :: EncodeShow Unit where
  encodeShow _ = mempty

instance encodeShowTuple :: (EncodeShow a, EncodeShow b) => EncodeShow (Tuple a b) where
  encodeShow (Tuple x y) = do
    div $ encodeShow x
    encodeShow y
