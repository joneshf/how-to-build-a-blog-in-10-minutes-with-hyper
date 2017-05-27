module Blog.Types.PostId where

import Control.Applicative (pure)
import Control.Bind ((<=<))
import Control.Semigroupoid ((<<<))
import Data.Either (Either(..))
import Data.Functor (map)
import Data.Generic (class Generic)
import Data.Int (fromString)
import Data.Maybe (maybe)
import Data.Newtype (class Newtype, unwrap, wrap)
import Database.PostgreSQL (class FromSQLValue, class ToSQLValue, fromSQLValue, toSQLValue)
import Hyper.Form (required)
import Scaffold.Form (class FromForm)
import Scaffold.Id (Id)
import Scaffold.SQL (class Columns)

newtype PostId
  = PostId Id

derive instance genericPostId :: Generic PostId

derive instance newtypePostId :: Newtype PostId _

instance columnsPostId :: Columns PostId where
  columns _ = pure "post_id"

instance fromFormPostId :: FromForm PostId where
  fromForm =
    map (wrap <<< wrap)
      <<< maybe (Left "\"post_id\" was not an integer") Right
      <=< map fromString
      <<< required "post_id"

instance fromSQLValuePostId :: FromSQLValue PostId where
  fromSQLValue = map wrap <<< fromSQLValue

instance toSQLValuePostId :: ToSQLValue PostId where
  toSQLValue = toSQLValue <<< unwrap
