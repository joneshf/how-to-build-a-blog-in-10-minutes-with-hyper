module Scaffold.Server where

import Scaffold.SQL as Scaffold.SQL
import Control.Applicative (class Applicative, pure)
import Control.Bind (bind)
import Control.Monad.Aff.Class (class MonadAff, liftAff)
import Control.Monad.Eff.Console (CONSOLE)
import Control.Monad.Error.Class (class MonadThrow, throwError)
import Data.Array (uncons)
import Data.Either (Either(..))
import Data.Function (($))
import Data.Functor (map, (<$>))
import Data.Maybe (Maybe(Just, Nothing))
import Data.Newtype (wrap)
import Data.Tuple.Nested ((/\))
import Data.Unit (unit)
import Database.PostgreSQL (class FromSQLRow, class ToSQLRow, Connection, POSTGRESQL, query)
import Hyper.Status (status, statusNotFound)
import Hyper.Trout.Router (RoutingError(HTTPError))
import Scaffold (CRUD, CollectionShow, Create, Destroy, Index(Index), New(New), Server)
import Scaffold.Id (Id)
import Scaffold.SQL (class Columns, class ForeignKey, class Table)
import Type.Trout ((:<|>))

server
  :: forall a b e m fields name
  . Columns a
  => ForeignKey b Id
  => FromSQLRow a
  => FromSQLRow b
  => MonadAff (console :: CONSOLE, postgreSQL :: POSTGRESQL | e) m
  => MonadThrow RoutingError m
  => Table a
  => Table b
  => ToSQLRow fields
  => Connection
  -> Either String fields
  -> Server name m a b
server conn fields =
  index conn
  :<|> crud conn fields
  :<|> new
  :<|> create conn fields

index
  :: forall a e m name
  . FromSQLRow a
  => MonadAff (postgreSQL :: POSTGRESQL | e) m
  => Table a
  => Connection
  -> m (Index name a)
index conn = liftAff $ Index <$> query conn Scaffold.SQL.index unit

crud
  :: forall a b e m fields name
  . Columns a
  => ForeignKey b Id
  => FromSQLRow a
  => FromSQLRow b
  => MonadAff (console :: CONSOLE, postgreSQL :: POSTGRESQL | e) m
  => MonadThrow RoutingError m
  => Table a
  => Table b
  => ToSQLRow fields
  => Connection
  -> Either String fields
  -> CRUD name m a b
crud conn fields id =
  collection conn fields id
  :<|> (wrap <$> get conn id)
  :<|> update conn id fields
  :<|> destroy conn id

collection
  :: forall a b e m fields name
  . ForeignKey b Id
  => FromSQLRow a
  => FromSQLRow b
  => MonadAff (console :: CONSOLE, postgreSQL :: POSTGRESQL | e) m
  => MonadThrow RoutingError m
  => Table a
  => Table b
  => Connection
  -> Either String fields
  -> Id
  -> m (CollectionShow name a b)
collection conn fields id = do
  elements <- liftAff $ wrap <$> query conn Scaffold.SQL.collection id
  shown <- wrap <$> get conn id
  pure $ wrap (elements /\ shown)

get
  :: forall a e m
  . FromSQLRow a
  => MonadAff (postgreSQL :: POSTGRESQL | e) m
  => MonadThrow RoutingError m
  => Table a
  => Connection
  -> Id
  -> m a
get conn id = do
  ps <- liftAff $ query conn Scaffold.SQL.show id
  case uncons ps of
    Nothing ->
      throwError $ HTTPError
        { status: statusNotFound
        , message: Just "Not Found"
        }
    Just { head: p } ->
      pure p

new :: forall a f name. Applicative f => f (New name a)
new = pure New

createElement
  :: forall a b e m fields name
  . Columns b
  => ForeignKey b Id
  => FromSQLRow a
  => FromSQLRow b
  => MonadAff (console :: CONSOLE, postgreSQL :: POSTGRESQL | e) m
  => MonadThrow RoutingError m
  => Table a
  => Table b
  => ToSQLRow fields
  => Connection
  -> Either String fields
  -> Id
  -> m (CollectionShow name a b)
createElement conn fields id = do
  _ <- create conn fields :: Create m b
  collection conn fields id

create
  :: forall a e m fields
  . Columns a
  => FromSQLRow a
  => MonadAff (console :: CONSOLE, postgreSQL :: POSTGRESQL | e) m
  => MonadThrow RoutingError m
  => Table a
  => ToSQLRow fields
  => Connection
  -> Either String fields
  -> Create m a
create conn = case _ of
  Left err -> do
    throwError $ HTTPError
      { status: status 422 "Unprocessable Entity"
      , message: Just "\"title\" is required"
      }
  Right fields -> do
    ps <- liftAff $ query conn Scaffold.SQL.create fields
    case uncons ps of
      Nothing ->
        throwError $ HTTPError
          { status: statusNotFound
          , message: Just "Not Found"
          }
      Just { head: p } ->
        pure p

update
  :: forall a e m fields
  . Columns a
  => FromSQLRow a
  => MonadAff (console :: CONSOLE, postgreSQL :: POSTGRESQL | e) m
  => MonadThrow RoutingError m
  => Table a
  => ToSQLRow fields
  => Connection
  -> Id
  -> Either String fields
  -> m a
update conn id = case _ of
  Left err -> do
    throwError $ HTTPError
      { status: status 422 "Unprocessable Entity"
      , message: Just "\"title\" is required"
      }
  Right fields -> do
    ps <- liftAff $ query conn Scaffold.SQL.update (id /\ fields)
    case uncons ps of
      Nothing ->
        throwError $ HTTPError
          { status: statusNotFound
          , message: Just "Not Found"
          }
      Just { head: p } ->
        pure p

destroy
  :: forall a e m name
  . FromSQLRow a
  => MonadAff (postgreSQL :: POSTGRESQL | e) m
  => MonadThrow RoutingError m
  => Table a
  => Connection
  -> Id
  -> m (Destroy name a)
destroy conn id = map wrap do
  ps <- liftAff $ query conn Scaffold.SQL.destroy id
  case uncons ps of
    Nothing ->
      throwError $ HTTPError
        { status: statusNotFound
        , message: Just "Not Found"
        }
    Just { head: p } ->
      pure p
