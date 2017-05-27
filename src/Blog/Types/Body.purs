module Blog.Types.Body where

import Control.Applicative (pure)
import Control.Bind (discard)
import Control.Semigroupoid ((<<<))
import Data.Function (($))
import Data.Functor (map)
import Data.Generic (class Generic)
import Data.Newtype (class Newtype, unwrap, wrap)
import Data.Ord ((>))
import Data.Semigroup ((<>))
import Data.String (length, replaceAll, take)
import Database.PostgreSQL (class FromSQLValue, class ToSQLValue, fromSQLValue, toSQLValue)
import Global (decodeURIComponent)
import Hyper.Form (required)
import Scaffold.Destroy (class EncodeDestroy)
import Scaffold.Edit (class EncodeEdit)
import Scaffold.Field (class EncodeField)
import Scaffold.Form (class FromForm)
import Scaffold.New (class EncodeNew)
import Scaffold.SQL (class Columns)
import Scaffold.Show (class EncodeShow)
import Text.Smolder.HTML (dd, dt, label, textarea)
import Text.Smolder.HTML.Attributes (name)
import Text.Smolder.Markup (text, (!))
import Type.Trout.ContentType.HTML (class EncodeHTML, encodeHTML)

newtype Body
  = Body String

derive instance genericBody :: Generic Body
derive instance newtypeBody :: Newtype Body _

instance columnsBody :: Columns Body where
  columns _ = pure "body"

instance encodeDestroyBody :: EncodeDestroy Body where
  encodeDestroy = encodeHTML

instance encodeEditBody :: EncodeEdit Body where
  encodeEdit t =
    label do
      text "Body"
      textarea
        ! name "body"
        $ text $ unwrap t

instance encodeFieldBody :: EncodeField Body where
  encodeField = encodeHTML <<< truncate
    where
    truncate :: Body -> Body
    truncate (Body str) =
      if length str > 20 then
        Body $ take 20 str <> "..."
      else
        Body str

instance encodeHTMLBody :: EncodeHTML Body where
  encodeHTML = text <<< unwrap

instance encodeNewBody :: EncodeNew Body where
  encodeNew _ =
    label do
      text "Body"
      textarea
        ! name "body"
        $ text ""

instance encodeShowBody :: EncodeShow Body where
  encodeShow body = do
    dt $ text "Body"
    dd $ encodeHTML body

instance fromFormBody :: FromForm Body where
  fromForm = map wrap <<< map (decodeURIComponent <<< replaceAll (wrap "+") (wrap " ")) <<< required "body"

instance fromSQLValueBody :: FromSQLValue Body where
  fromSQLValue = map wrap <<< fromSQLValue

instance toSQLValueBody :: ToSQLValue Body where
  toSQLValue = toSQLValue <<< unwrap
