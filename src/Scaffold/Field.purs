module Scaffold.Field where

import Control.Bind (discard)
import Data.Function (($))
import Data.Monoid (mempty)
import Data.Tuple (Tuple(..))
import Data.Unit (Unit)
import Text.Smolder.HTML (td)
import Text.Smolder.Markup (Markup)

class EncodeField a where
  encodeField :: a -> Markup Unit

instance encodeFieldUnit :: EncodeField Unit where
  encodeField _ = mempty

instance encodeFieldTuple :: (EncodeField a, EncodeField b) => EncodeField (Tuple a b) where
  encodeField (Tuple x y) = do
    td $ encodeField x
    encodeField y
