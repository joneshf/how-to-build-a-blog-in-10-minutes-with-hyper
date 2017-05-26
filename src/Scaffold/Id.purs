module Scaffold.Id where

import Control.Alt (map)
import Control.Category ((<<<))
import Data.Generic (class Generic, gShow)
import Data.Monoid (mempty)
import Data.Newtype (class Newtype, unwrap, wrap)
import Data.Show (class Show, show)
import Data.Tuple.Nested (tuple1)
import Database.PostgreSQL (class FromSQLValue, class ToSQLRow, class ToSQLValue, fromSQLValue, toSQLRow, toSQLValue)
import Scaffold.Destroy (class EncodeDestroy)
import Scaffold.Edit (class EncodeEdit)
import Scaffold.Field (class EncodeField)
import Scaffold.New (class EncodeNew)
import Scaffold.Show (class EncodeShow)
import Text.Smolder.Markup (text)
import Type.Trout.ContentType.HTML (class EncodeHTML, encodeHTML)
import Type.Trout.PathPiece (class FromPathPiece, class ToPathPiece, fromPathPiece, toPathPiece)

newtype Id = Id Int

class GetId a where
  getId :: a -> Id

derive instance genericId :: Generic Id

derive instance newtypeId :: Newtype Id _

instance showId :: Show Id where
  show = gShow

instance fromSQLValueId :: FromSQLValue Id where
  fromSQLValue = map wrap <<< fromSQLValue

instance toSQLRow :: ToSQLRow Id where
  toSQLRow = toSQLRow <<< tuple1

instance toSQLValueId :: ToSQLValue Id where
  toSQLValue = toSQLValue <<< unwrap

instance fromPathPieceId :: FromPathPiece Id where
  fromPathPiece = map wrap <<< fromPathPiece

instance encodeDestroyId :: EncodeDestroy Id where
  encodeDestroy _ = mempty

instance encodeEditId :: EncodeEdit Id where
  encodeEdit _ = mempty

instance encodeFieldId :: EncodeField Id where
  encodeField = encodeHTML

instance encodeHTMLId :: EncodeHTML Id where
  encodeHTML = text <<< show <<< unwrap

instance encodeNewId :: EncodeNew Id where
  encodeNew _ = mempty

instance encodeShowId :: EncodeShow Id where
  encodeShow _ = mempty

instance toPathPieceId :: ToPathPiece Id where
  toPathPiece = toPathPiece <<< unwrap
