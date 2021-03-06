module Data.Distributive where

import Prelude

import Data.Identity (Identity(..))
import Data.Newtype (unwrap)

-- | Categorical dual of `Traversable`:
-- |
-- | - `distribute` is the dual of `sequence` - it zips an arbitrary collection
-- |   of containers.
-- | - `collect` is the dual of `traverse` - it traverses an arbitrary
-- |   collection of values.
class Functor f <= Distributive f where
  distribute :: forall a g. Functor g => g (f a) -> f (g a)
  collect :: forall a b g. Functor g => (a -> f b) -> g a -> f (g b)

instance distributiveIdentity :: Distributive Identity where
  distribute = Identity <<< map unwrap
  collect f = Identity <<< map (unwrap <<< f)

instance distributiveFunction :: Distributive ((->) e) where
  distribute a e = map (_ $ e) a
  collect f = distribute <<< map f

-- | A default implementation of `distribute`, based on `collect`.
distributeDefault
  :: forall a f g
   . Distributive f
  => Functor g
  => g (f a)
  -> f (g a)
distributeDefault = collect id

-- | A default implementation of `collect`, based on `distribute`.
collectDefault
  :: forall a b f g
   . Distributive f
  => Functor g
  => (a -> f b)
  -> g a
  -> f (g b)
collectDefault f = distribute <<< map f

-- | Zip an arbitrary collection of containers and summarize the results
cotraverse
  :: forall a b f g
   . Distributive f
  => Functor g
  => (g a -> b)
  -> g (f a)
  -> f b
cotraverse f = map f <<< distribute
