module Data.Functor.App where

import Prelude

import Control.Alt (class Alt)
import Control.Alternative (class Alternative)
import Control.Comonad (class Comonad)
import Control.Extend (class Extend)
import Control.Lazy (class Lazy)
import Control.MonadPlus (class MonadPlus)
import Control.Plus (class Plus)

import Data.Eq (class Eq1, eq1)
import Data.Foldable (class Foldable)
import Data.Newtype (class Newtype)
import Data.Ord (class Ord1, compare1)
import Data.Traversable (class Traversable)

import Unsafe.Coerce (unsafeCoerce)

newtype App f a = App (f a)

hoistApp
  :: forall f g
   . (f ~> g)
  -> App f
  ~> App g
hoistApp f (App fa) = App (f fa)

hoistLiftApp :: forall f g a. f (g a) -> f (App g a)
hoistLiftApp = unsafeCoerce -- safe as newtypes have no runtime representation

hoistLowerApp :: forall f g a. f (App g a) -> f (g a)
hoistLowerApp = unsafeCoerce -- safe as newtypes have no runtime representation

derive instance newtypeApp :: Newtype (App f a) _

instance eqApp :: (Eq1 f, Eq a) => Eq (App f a) where
  eq = eq1

instance eq1App :: Eq1 f => Eq1 (App f) where
  eq1 (App fa1) (App fa2) = eq1 fa1 fa2

instance ordApp :: (Ord1 f, Ord a) => Ord (App f a) where
  compare = compare1

instance ord1App :: Ord1 f => Ord1 (App f) where
  compare1 (App fa1) (App fa2) = compare1 fa1 fa2

instance showApp :: Show (f a) => Show (App f a) where
  show (App fa) = "(App " <> show fa <> ")"

derive newtype instance functorApp :: Functor f => Functor (App f)
derive newtype instance applyApp :: Apply f => Apply (App f)
derive newtype instance applicativeApp :: Applicative f => Applicative (App f)
derive newtype instance bindApp :: Bind f => Bind (App f)
derive newtype instance monadApp :: Monad f => Monad (App f)
derive newtype instance altApp :: Alt f => Alt (App f)
derive newtype instance plusApp :: Plus f => Plus (App f)
derive newtype instance alternativeApp :: Alternative f => Alternative (App f)
derive newtype instance monadPlusApp :: MonadPlus f => MonadPlus (App f)
derive newtype instance lazyApp :: Lazy (f a) => Lazy (App f a)
derive newtype instance foldableApp :: Foldable f => Foldable (App f)
derive newtype instance traversableApp :: Traversable f => Traversable (App f)
derive newtype instance extendApp :: Extend f => Extend (App f)
derive newtype instance comonadApp :: Comonad f => Comonad (App f)
