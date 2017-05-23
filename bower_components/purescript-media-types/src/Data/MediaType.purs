module Data.MediaType where

import Prelude

import Data.Generic (class Generic)
import Data.Newtype (class Newtype)

newtype MediaType = MediaType String

derive instance newtypeMediaType :: Newtype MediaType _
derive instance eqMediaType :: Eq MediaType
derive instance ordMediaType :: Ord MediaType
derive instance genericMediaType :: Generic MediaType

instance showMediaType :: Show MediaType where
  show (MediaType h) = "(MediaType " <> show h <> ")"
