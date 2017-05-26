module Scaffold where

import Control.Bind (discard)
import Data.Foldable (traverse_)
import Data.Function (($))
import Data.Generic (class Generic, toSignature)
import Data.Newtype (class Newtype, unwrap)
import Data.Semigroup ((<>))
import Data.Symbol (class IsSymbol)
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
import Scaffold.Show (class EncodeShow, encodeShow)
import Text.Smolder.HTML (div, dl, form, h1, input, section, table, tbody, td, thead, tr)
import Text.Smolder.HTML.Attributes (action, method, type', value)
import Text.Smolder.Markup (Markup, text, (!))
import Type.Proxy (Proxy(..))
import Type.Trout (type (:<|>), type (:>), type (:/), (:<|>), Capture, Resource)
import Type.Trout.ContentType.HTML (class EncodeHTML, HTML, linkTo)
import Type.Trout.Links (linksTo)
import Type.Trout.Method (Get, Post)

type Scaffold name a
  = IndexApi name a
  :<|> CRUDApi name a
  :<|> NewApi name a
  :<|> CreateApi name a

type CreateApi name a
  = name :/ Resource (Post a) HTML
type IndexApi name a
  = name :/ Resource (Get (Index name a)) HTML
type NewApi name a
  = name :/ "new" :/ Resource (Get (New name a)) HTML
type CRUDApi name a
  = name :/ Capture "id" Id
  :> ( Resource (Get (Show name a)) HTML
     :<|> "edit" :/ Resource (Get (Edit name a)) HTML
     :<|> "update" :/ Resource (Post a) HTML
     :<|> "destroy" :/ Resource (Get (Destroy name a)) HTML
     )

type Server name m persisted
  = m (Index name persisted)
  :<|> (CRUD name m persisted)
  :<|> m (New name persisted)
  :<|> Create m persisted

type Create m a = m a
newtype Destroy (name :: Symbol) a = Destroy a
newtype Edit (name :: Symbol) a = Edit a
newtype Index (name :: Symbol) a = Index (Array a)
newtype Show (name :: Symbol) a = Show a
data New (name :: Symbol) a = New
type CRUD (name :: Symbol) m a
  = Id ->
      ( m (Show name a)
      :<|> m (Edit name a)
      :<|> m a
      :<|> m (Destroy name a)
      )

derive instance newtypeDestroy :: Newtype (Destroy name a) _
derive instance newtypeEdit :: Newtype (Edit name a) _
derive instance newtypeShow :: Newtype (Show name a) _

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
      showLink a =
        case linksTo (Proxy :: Proxy (CRUDApi name a)) (getId a) of
          link :<|> _ :<|> _ :<|> _ -> link
      indexLink :: URI
      indexLink = linksTo (Proxy :: Proxy (IndexApi name a))
      updateLink :: a -> URI
      updateLink a =
        case linksTo (Proxy :: Proxy (CRUDApi name a)) (getId a) of
          _ :<|> _ :<|> link :<|> _ -> link

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
      editLink a =
        case linksTo (Proxy :: Proxy (CRUDApi name a)) (getId a) of
          _ :<|> link :<|> _ :<|> _ -> link
      indexLink :: URI
      indexLink = linksTo (Proxy :: Proxy (IndexApi name a))
      updateLink :: a -> URI
      updateLink a =
        case linksTo (Proxy :: Proxy (CRUDApi name a)) (getId a) of
          _ :<|> _ :<|> link :<|> _ -> link

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
      showLink x =
        case linksTo (Proxy :: Proxy (CRUDApi name a)) (getId x) of
          link :<|> _ :<|> _ :<|> _ -> link
      editLink :: a -> URI
      editLink x =
        case linksTo (Proxy :: Proxy (CRUDApi name a)) (getId x) of
          _ :<|> link :<|> _ :<|> _ -> link
      destroyLink :: a -> URI
      destroyLink x =
        case linksTo (Proxy :: Proxy (CRUDApi name a)) (getId x) of
          _ :<|> _ :<|> _ :<|> link -> link

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
