-- | This module defines types and functions for working with nullable types
-- | using the FFI.

module Data.Nullable
  ( Nullable
  , toMaybe
  , toNullable
  ) where

import Prelude

import Data.Eq (class Eq1)
import Data.Function (on)
import Data.Function.Uncurried (Fn3, runFn3)
import Data.Maybe (Maybe(..), maybe)
import Data.Ord (class Ord1)

-- | A nullable type.
-- |
-- | This type constructor may be useful when interoperating with JavaScript functions
-- | which accept or return null values.
foreign import data Nullable :: Type -> Type

-- | The null value.
foreign import null :: forall a. Nullable a

foreign import nullable :: forall a r. Fn3 (Nullable a) r (a -> r) r

-- | Wrap a non-null value.
foreign import notNull :: forall a. a -> Nullable a

-- | Takes `Nothing` to `null`, and `Just a` to `a`.
toNullable :: forall a. Maybe a -> Nullable a
toNullable = maybe null notNull

-- | Represent `null` using `Maybe a` as `Nothing`.
toMaybe :: forall a. Nullable a -> Maybe a
toMaybe n = runFn3 nullable n Nothing Just

instance showNullable :: Show a => Show (Nullable a) where
  show = maybe "null" show <<< toMaybe

instance eqNullable :: Eq a => Eq (Nullable a) where
  eq = eq `on` toMaybe

instance eq1Nullable :: Eq1 Nullable where
  eq1 = eq

instance ordNullable :: Ord a => Ord (Nullable a) where
  compare = compare `on` toMaybe

instance ord1Nullable :: Ord1 Nullable where
  compare1 = compare
