module Type.Trout.Links
       ( Link
       , class HasLinks
       , toLinks
       , linksTo
       ) where

import Prelude
import Data.Array (singleton, unsnoc)
import Data.Either (Either(..))
import Data.Foldable (foldl)
import Data.Generic (class Generic)
import Data.Maybe (Maybe(..))
import Data.Monoid (class Monoid, mempty)
import Data.Newtype (class Newtype)
import Data.Path.Pathy (dir, file, rootDir, (</>))
import Data.Symbol (class IsSymbol, SProxy(..), reflectSymbol)
import Data.URI (HierarchicalPart(..), URI(..))
import Type.Proxy (Proxy(..))
import Type.Trout (type (:<|>), type (:>), Capture, CaptureAll, Resource, Lit, Raw, (:<|>))
import Type.Trout.PathPiece (class ToPathPiece, toPathPiece)

-- | A link, containing zero or more path segments.
newtype Link = Link (Array String)

instance monoidLink :: Monoid Link where
  mempty = Link []

instance semigroupLink :: Semigroup Link where
  append (Link p1) (Link p2) = Link (p1 <> p2)

derive instance newtypeLink :: Newtype Link _
derive instance genericLink :: Generic Link
derive instance eqLink :: Eq Link

linkToURI :: Link -> URI
linkToURI (Link segments) =
  URI
  Nothing
  (HierarchicalPart Nothing (Just path))
  Nothing
  Nothing
  where
    path =
      case unsnoc segments of
        Just { init, last } ->
          Right (foldl (</>) rootDir (map dir init) </> file last)
        Nothing ->
          Left rootDir

-- | A routing type `t` which has links of type `links`.
class HasLinks t links | t -> links where
  toLinks :: Proxy t -> Link -> links

instance hasLinksLit :: (HasLinks sub subMk, IsSymbol lit)
                       => HasLinks (Lit lit :> sub) subMk where
  toLinks _ =
    toLinks (Proxy :: Proxy sub) <<< flip append (Link [segment])
    where
      segment = reflectSymbol (SProxy :: SProxy lit)

instance hasLinksCapture :: (HasLinks sub subMk, IsSymbol c, ToPathPiece t)
                           => HasLinks (Capture c t :> sub) (t -> subMk) where
  toLinks _ l =
    toLinks (Proxy :: Proxy sub) <<< append l <<< Link <<< singleton <<< toPathPiece

instance hasLinksCaptureAll :: (HasLinks sub subMk, IsSymbol c, ToPathPiece t)
                              => HasLinks (CaptureAll c t :> sub) (Array t -> subMk) where
  toLinks _ l =
    toLinks (Proxy :: Proxy sub) <<< append l <<< Link <<< map toPathPiece

instance hasLinksResource :: HasLinks (Resource ms cts) URI where
  toLinks _ = linkToURI

instance hasLinksRaw :: HasLinks (Raw m) URI where
  toLinks _ = linkToURI

instance hasLinksAltE :: (HasLinks e1 mk1, HasLinks e2 mk2) => HasLinks (e1 :<|> e2) (mk1 :<|> mk2) where
  toLinks _ link =
    toLinks (Proxy :: Proxy e1) link
    :<|> toLinks (Proxy :: Proxy e2) link

-- | Derive links for the type `t`.
linksTo :: forall t links. HasLinks t links => Proxy t -> links
linksTo x = toLinks x mempty
