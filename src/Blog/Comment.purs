module Blog.Comment where

import Blog.Types.Body (Body)
import Blog.Types.PostId (PostId)
import Control.Bind (discard)
import Control.Semigroupoid ((<<<))
import Data.Function (($))
import Data.Functor (map)
import Data.Generic (class Generic)
import Data.Newtype (class Newtype, unwrap, wrap)
import Data.Tuple.Nested (type (/\), get2, get3)
import Data.Unit (Unit)
import Database.PostgreSQL (class FromSQLRow, fromSQLRow)
import Scaffold.Id (Id)
import Scaffold.New (class EncodeNew)
import Scaffold.SQL (class Columns, class ForeignKey, class Table, columns)
import Scaffold.Show (class EncodeShow)
import Text.Smolder.HTML (label, p, textarea)
import Text.Smolder.HTML.Attributes (name)
import Text.Smolder.Markup (text, (!))
import Type.Proxy (Proxy(..))
import Type.Trout.ContentType.HTML (class EncodeHTML, encodeHTML)

newtype Comment
  = Comment (Id /\ Fields)

type Fields
  = Body
  /\ PostId
  /\ Unit

derive instance genericComment :: Generic Comment

derive instance newtypeComment :: Newtype Comment _

instance columnsComment :: Columns Comment where
  columns _ = columns (Proxy :: Proxy Fields)

instance encodeHTMLComment :: EncodeHTML Comment where
  encodeHTML comment =
    p do
      encodeHTML $ get2 $ unwrap comment

instance encodeNewComment :: EncodeNew Comment where
  encodeNew _ =
    label do
      text "Post a new comment"
      textarea
        ! name "body"
        $ text ""

instance encodeShowComment :: EncodeShow Comment where
  encodeShow = encodeHTML

instance foreignKeyCommentPostId :: ForeignKey Comment PostId where
  foreignKey = get3 <<< unwrap
  foreignKey' _ = "post_id"

instance foreignKeyCommentId :: ForeignKey Comment Id where
  foreignKey = unwrap <<< get3 <<< unwrap
  foreignKey' _ = "post_id"

instance fromSQLRowComment :: FromSQLRow Comment where
  fromSQLRow = map wrap <<< fromSQLRow

instance tableComment :: Table Comment where
  table _ = "comment"
