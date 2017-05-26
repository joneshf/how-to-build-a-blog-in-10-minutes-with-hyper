module Scaffold.New where

import Control.Bind (discard)
import Data.Function (($))
import Data.Monoid (mempty)
import Data.Tuple (Tuple)
import Data.Unit (Unit)
import Text.Smolder.HTML (div)
import Text.Smolder.Markup (Markup)
import Type.Proxy (Proxy(..))

class EncodeNew a where
  encodeNew :: Proxy a -> Markup Unit

instance encodeNewUnit :: EncodeNew Unit where
  encodeNew _ = mempty

instance encodeNewTuple :: (EncodeNew a, EncodeNew b) => EncodeNew (Tuple a b) where
  encodeNew _ = do
    div $ encodeNew (Proxy :: Proxy a)
    encodeNew (Proxy :: Proxy b)
