module Scaffold.Header where

import Control.Bind (discard)
import Data.Function (($))
import Data.Generic (class Generic, toSignature)
import Data.Monoid (mempty)
import Data.Tuple (Tuple)
import Data.Unit (Unit)
import Scaffold.Generic (prettySignature)
import Text.Smolder.HTML (td)
import Text.Smolder.Markup (Markup, text)
import Type.Proxy (Proxy(..))

class EncodeHeader a where
  encodeHeader :: Proxy a -> Markup Unit

instance encodeHeaderUnit :: EncodeHeader Unit where
  encodeHeader _ = mempty

instance encodeHeaderTuple :: (Generic a, EncodeHeader b) => EncodeHeader (Tuple a b) where
  encodeHeader _ = do
    td $ text $ prettySignature (toSignature $ Proxy :: Proxy a)
    encodeHeader (Proxy :: Proxy b)
