module Post.Title where

import Control.Applicative (pure)
import Control.Bind (discard)
import Control.Semigroupoid ((<<<))
import Data.Function (($))
import Data.Functor (map)
import Data.Generic (class Generic)
import Data.Newtype (class Newtype, unwrap, wrap)
import Data.String (replaceAll)
import Data.Tuple.Nested (tuple1)
import Database.PostgreSQL (class FromSQLValue, class ToSQLRow, class ToSQLValue, fromSQLValue, toSQLRow, toSQLValue)
import Global (decodeURIComponent)
import Hyper.Form (required)
import Scaffold.Destroy (class EncodeDestroy)
import Scaffold.Edit (class EncodeEdit)
import Scaffold.Field (class EncodeField)
import Scaffold.Form (class FromForm)
import Scaffold.New (class EncodeNew)
import Scaffold.SQL (class Columns)
import Scaffold.Show (class EncodeShow)
import Text.Smolder.HTML (dd, dt, input, label)
import Text.Smolder.HTML.Attributes (name, type', value)
import Text.Smolder.Markup (text, (!))
import Type.Trout.ContentType.HTML (class EncodeHTML, encodeHTML)

newtype Title = Title String

derive instance genericTitle :: Generic Title

derive instance newtypeTitle :: Newtype Title _

instance columnsTitle :: Columns Title where
  columns _ = pure "title"

instance encodeDestroyTitle :: EncodeDestroy Title where
  encodeDestroy = encodeHTML

instance encodeEditTitle :: EncodeEdit Title where
  encodeEdit t =
    label do
      text "Title"
      input
        ! name "title"
        ! type' "text"
        ! value (unwrap t)

instance encodeShowTitle :: EncodeShow Title where
  encodeShow title = do
    dt $ text "Title"
    dd $ encodeHTML title

instance encodeFieldTitle :: EncodeField Title where
  encodeField = encodeHTML

instance encodeHTMLTitle :: EncodeHTML Title where
  encodeHTML = text <<< unwrap

instance encodeNewTitle :: EncodeNew Title where
  encodeNew _ =
    label do
      text "Title"
      input
        ! name "title"
        ! type' "text"

instance fromSQLValueTitle :: FromSQLValue Title where
  fromSQLValue = map wrap <<< fromSQLValue

instance fromFormTitle :: FromForm Title where
  fromForm = map wrap <<< map (decodeURIComponent <<< replaceAll (wrap "+") (wrap " ")) <<< required "title"

instance toSQLRowTitle :: ToSQLRow Title where
  toSQLRow = toSQLRow <<< tuple1

instance toSQLValueTitle :: ToSQLValue Title where
  toSQLValue = toSQLValue <<< unwrap
