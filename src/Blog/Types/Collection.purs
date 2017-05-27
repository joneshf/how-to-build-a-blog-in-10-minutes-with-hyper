module Blog.Types.Collection where

import Control.Semigroupoid ((<<<))
import Data.Foldable (class Foldable, foldMap, foldl, foldr)
import Data.Functor (class Functor)
import Data.Generic (class Generic)
import Data.Newtype (class Newtype, unwrap)
import Type.Trout.ContentType.HTML (class EncodeHTML, encodeHTML)

newtype Collection a
  = Collection (Array a)

derive instance functorCollection :: Functor Collection

derive instance genericCollection :: Generic a => Generic (Collection a)

derive instance newtypeCollection :: Newtype (Collection a) _

instance foldableCollection :: Foldable Collection where
  foldr f z = foldr f z <<< unwrap
  foldl f z = foldl f z <<< unwrap
  foldMap f = foldMap f <<< unwrap

instance encodeHTMLCollection :: (EncodeHTML a) => EncodeHTML (Collection a) where
  encodeHTML = foldMap encodeHTML
