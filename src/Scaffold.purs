module Scaffold where

import Blog.Types.Collection as Blog.Types.Collection
import Control.Bind (discard)
import Data.Foldable (for_, traverse_)
import Data.Function (($))
import Data.Generic (class Generic, toSignature)
import Data.Newtype (class Newtype, unwrap)
import Data.Semigroup ((<>))
import Data.Show (class Show, show)
import Data.Symbol (class IsSymbol)
import Data.Tuple.Nested (type (/\), (/\))
import Data.URI (printURI)
import Data.URI.Types (URI)
import Data.Unit (Unit)
import Scaffold.Destroy (class EncodeDestroy, encodeDestroy)
import Scaffold.Edit (class EncodeEdit, encodeEdit)
import Scaffold.Field (class EncodeField, encodeField)
import Scaffold.Generic (prettySignature)
import Scaffold.Header (class EncodeHeader, encodeHeader)
import Scaffold.Id (class GetId, Id, getId)
import Scaffold.New (class EncodeNew, encodeNew)
import Scaffold.SQL (class ForeignKey, foreignKey')
import Scaffold.Show (class EncodeShow, encodeShow)
import Text.Smolder.HTML (div, dl, form, h1, header, input, section, table, tbody, td, thead, tr)
import Text.Smolder.HTML.Attributes (action, method, name, type', value)
import Text.Smolder.Markup (Markup, text, (!))
import Type.Proxy (Proxy(..))
import Type.Trout (type (:/), type (:<|>), type (:>), Capture, Resource)
import Type.Trout.ContentType.HTML (class EncodeHTML, HTML, linkTo)
import Type.Trout.Links (linksTo)
import Type.Trout.Method (Get, Post)

type Scaffold name a b
  = IndexApi name a
  :<|> CRUDApi name a b
  :<|> NewApi name a
  :<|> CreateApi name a

type CollectionApi name a b
  = name :/ Capture "id" Id :> Resource (Post (CollectionShow name a b)) HTML

type CreateApi name a
  = name :/ Resource (Post a) HTML
type IndexApi name a
  = name :/ Resource (Get (Index name a)) HTML
type NewApi name a
  = name :/ "new" :/ Resource (Get (New name a)) HTML
type CRUDApi name a b
  = name :/ Capture "id" Id
  :> ( Resource (Get (CollectionShow name a b)) HTML
     :<|> "edit" :/ Resource (Get (Edit name a)) HTML
     :<|> "update" :/ Resource (Post a) HTML
     :<|> "destroy" :/ Resource (Get (Destroy name a)) HTML
     )

type DestroyApi name a
  = name :/ Capture "id" Id :> "destroy" :/ Resource (Get (Destroy name a)) HTML
type EditApi name a
  = name :/ Capture "id" Id :> "edit" :/ Resource (Get (Edit name a)) HTML
type ShowApi name a
  = name :/ Capture "id" Id :> Resource (Get (Show name a)) HTML
type UpdateApi name a
  = name :/ Capture "id" Id :> "update" :/ Resource (Post a) HTML

type Server name m a b
  = m (Index name a)
  :<|> (CRUD name m a b)
  :<|> m (New name a)
  :<|> Create m a

type Create m a = m a
newtype Destroy (name :: Symbol) a = Destroy a
newtype Edit (name :: Symbol) a = Edit a
newtype Index (name :: Symbol) a = Index (Array a)
newtype Show (name :: Symbol) a = Show a
newtype CollectionShow (name :: Symbol) a b
  = CollectionShow (Blog.Types.Collection.Collection b /\ Show name a)
data New (name :: Symbol) a = New
type CRUD (name :: Symbol) m a b
  = Id ->
      ( m (CollectionShow name a b)
      :<|> m (Edit name a)
      :<|> m a
      :<|> m (Destroy name a)
      )
type Collection (name :: Symbol) m a b
  = Id -> m (CollectionShow name a b)

derive instance newtypeDestroy :: Newtype (Destroy name a) _
derive instance newtypeEdit :: Newtype (Edit name a) _
derive instance newtypeShow :: Newtype (Show name a) _
derive instance newtypeCollectionShow :: Newtype (CollectionShow name a b) _

instance encodeHTMLDestroy
  :: ( EncodeDestroy a
     , Generic a
     , GetId a
     , IsSymbol name
     )
  => EncodeHTML (Destroy name a) where
    encodeHTML x =
      section do
        h1 do
          text $ "Destroyed " <> prettySignature (toSignature $ Proxy :: Proxy a)
        encodeDestroy $ unwrap x
        div do
          linkTo indexLink $ text "Back"
      where
      indexLink :: URI
      indexLink = linksTo (Proxy :: Proxy (IndexApi name a))

instance encodeHTMLEdit
  :: ( EncodeEdit a
     , Generic a
     , GetId a
     , IsSymbol name
     )
  => EncodeHTML (Edit name a) where
    encodeHTML x =
      section do
        h1 do
          text $ "Editing " <> prettySignature (toSignature $ Proxy :: Proxy a)
        form ! action (printURI $ updateLink $ unwrap x) ! method "POST" $ do
          encodeEdit $ unwrap x
          input
            ! type' "submit"
            ! value "Update"
          div do
            linkTo (showLink $ unwrap x) $ text "Show"
            text "|"
            linkTo indexLink $ text "Back"
      where
      showLink :: a -> URI
      showLink a = linksTo (Proxy :: Proxy (ShowApi name a)) (getId a)
      indexLink :: URI
      indexLink = linksTo (Proxy :: Proxy (IndexApi name a))
      updateLink :: a -> URI
      updateLink a = linksTo (Proxy :: Proxy (UpdateApi name a)) (getId a)

instance encodeHTMLShow
  :: ( EncodeShow a
     , Generic a
     , GetId a
     , IsSymbol name
     )
  => EncodeHTML (Show name a) where
    encodeHTML x =
      section do
        dl do
          encodeShow $ unwrap x
        div do
          linkTo (editLink $ unwrap x) $ text "Edit"
          text "|"
          linkTo indexLink $ text "Back"
      where
      editLink :: a -> URI
      editLink a = linksTo (Proxy :: Proxy (EditApi name a)) (getId a)
      indexLink :: URI
      indexLink = linksTo (Proxy :: Proxy (IndexApi name a))
      updateLink :: a -> URI
      updateLink a = linksTo (Proxy :: Proxy (UpdateApi name a)) (getId a)

instance encodeHTMLIndex
  :: ( EncodeHeader a
     , EncodeField a
     , Generic a
     , GetId a
     , IsSymbol name
     )
  => EncodeHTML (Index name a) where
    encodeHTML (Index xs) =
      section do
        h1 do
          text $ "Listing " <> prettySignature (toSignature proxy) <> "s"
        table do
          tbody $ traverse_ encodeEach xs
          thead $ encodeHeader proxy
        div do
          linkTo newLink $ text $ "New " <> prettySignature (toSignature proxy)

      where
      encodeEach :: a -> Markup Unit
      encodeEach x =
        tr do
          encodeField x
          td $ linkTo (showLink x) $ text "Show"
          td $ linkTo (editLink x) $ text "Edit"
          td $ linkTo (destroyLink x) $ text "Destroy"
      proxy :: Proxy a
      proxy = Proxy
      newLink = linksTo (Proxy :: Proxy (NewApi name a))
      showLink :: a -> URI
      showLink x = linksTo (Proxy :: Proxy (ShowApi name a)) (getId x)
      editLink :: a -> URI
      editLink x = linksTo (Proxy :: Proxy (EditApi name a)) (getId x)
      destroyLink :: a -> URI
      destroyLink x = linksTo (Proxy :: Proxy (DestroyApi name a)) (getId x)

instance encodeHTMLNew
  :: ( EncodeNew a
     , Generic a
     , IsSymbol name
     )
  => EncodeHTML (New name a) where
    encodeHTML _ =
      section do
        h1 do
          text $ "New " <> prettySignature (toSignature $ Proxy :: Proxy a)
        form ! action (printURI createLink) ! method "POST" $ do
          encodeNew $ Proxy :: Proxy a
          input
            ! type' "submit"
            ! value "Create"
          div do
            linkTo indexLink $ text "Back"
      where
      indexLink = linksTo (Proxy :: Proxy (IndexApi name a))
      createLink = linksTo (Proxy :: Proxy (CreateApi name a))

instance encodeHTMLCollectionShow
  :: ( EncodeHTML b
     , EncodeNew b
     , EncodeShow a
     , EncodeShow b
     , ForeignKey b id
     , Generic b
     , GetId a
     , IsSymbol name
     , Show id
     )
  => EncodeHTML (CollectionShow name a b) where
    encodeHTML (CollectionShow (collection /\ show')) = do
      encodeShow $ unwrap show'
      section do
        header do
          h1 do
            text $ prettySignature (toSignature $ Proxy :: Proxy b) <> "s"
        for_ collection encodeShow
        form ! method "POST" $ do
          encodeNew $ Proxy :: Proxy b
          input
            ! type' "submit"
            ! value (prettySignature (toSignature $ Proxy :: Proxy b))
          input
            ! name (foreignKey' $ Proxy :: Proxy b)
            ! type' "hidden"
            ! value (show $ unwrap $ getId $ unwrap $ show')
      section do
        div do
          linkTo (editLink $ unwrap show') $ text "Edit"
          text "|"
          linkTo indexLink $ text "Back"
      where
      editLink :: a -> URI
      editLink a = linksTo (Proxy :: Proxy (EditApi name a)) (getId a)
      indexLink :: URI
      indexLink = linksTo (Proxy :: Proxy (IndexApi name a))
