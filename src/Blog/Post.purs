module Blog.Post where

import Blog.Types.Body (Body)
import Control.Bind (discard)
import Control.Semigroupoid ((<<<))
import Data.Function (($))
import Data.Functor (map)
import Data.Generic (class Generic)
import Data.Newtype (class Newtype, unwrap, wrap)
import Data.Tuple (snd)
import Data.Tuple.Nested (type (/\), get1, get2, get3)
import Data.Unit (Unit)
import Database.PostgreSQL (class FromSQLRow, Query(..), fromSQLRow)
import Post.Title (Title)
import Scaffold.Destroy (class EncodeDestroy, encodeDestroy)
import Scaffold.Edit (class EncodeEdit, encodeEdit)
import Scaffold.Field (class EncodeField, encodeField)
import Scaffold.Header (class EncodeHeader, encodeHeader)
import Scaffold.Id (class GetId, Id)
import Scaffold.New (class EncodeNew, encodeNew)
import Scaffold.SQL (class Columns, class Table, columns)
import Scaffold.Show (class EncodeShow)
import Text.Smolder.HTML (h1, header, p, section)
import Type.Proxy (Proxy(..))
import Type.Trout.ContentType.HTML (class EncodeHTML, encodeHTML)

newtype Post
  = Post (Id /\ Fields)

type Fields
  = Title
  /\ Body
  /\ Unit

derive instance genericPost :: Generic Post

derive instance newtypePost :: Newtype Post _

instance columnsPost :: Columns Post where
  columns _ = columns (Proxy :: Proxy Fields)

instance encodeDestroyPost :: EncodeDestroy Post where
  encodeDestroy = encodeDestroy <<< fields

instance encodeEditPost :: EncodeEdit Post where
  encodeEdit = encodeEdit <<< fields

instance encodeShowPost :: EncodeShow Post where
  encodeShow = encodeHTML

instance encodeFieldPost :: EncodeField Post where
  encodeField = encodeField <<< fields

instance encodeHeaderPost :: EncodeHeader Post where
  encodeHeader _ = encodeHeader $ Proxy :: Proxy Fields

instance encodeHTMLPost :: EncodeHTML Post where
  encodeHTML post =
    section do
      header do
        h1 do
          encodeHTML $ title post
      p do
        encodeHTML $ body post

instance encodeNewPost :: EncodeNew Post where
  encodeNew _ = encodeNew $ Proxy :: Proxy Fields

instance fromSQLRowPost :: FromSQLRow Post where
  fromSQLRow = map wrap <<< fromSQLRow

instance getIdPost :: GetId Post where
  getId = get1 <<< unwrap

instance tablePost :: Table Post where
  table _ = "post"

fields :: Post -> Fields
fields = snd <<< unwrap

title :: Post -> Title
title = get2 <<< unwrap

body :: Post -> Body
body = get3 <<< unwrap

-- TODO: Make PRs for these types to implement all of the typeclasses they can.
proxyMap :: forall a b. (a -> b) -> Proxy a -> Proxy b
proxyMap _ _ = Proxy

queryMap :: forall a b i. (a -> b) -> Query i a -> Query i b
queryMap _ (Query str) = Query str
