module Database.PostgreSQL
( POSTGRESQL
, PoolConfiguration
, Pool
, Connection
, Query(..)
, class ToSQLRow
, class FromSQLRow
, class ToSQLValue
, class FromSQLValue
, toSQLRow
, fromSQLRow
, toSQLValue
, fromSQLValue
, newPool
, withConnection
, withTransaction
, execute
, query
, scalar
) where

import Control.Monad.Aff (Aff)
import Control.Monad.Eff (kind Effect)
import Control.Monad.Eff.Exception (error)
import Control.Monad.Error.Class (catchError, throwError)
import Control.Monad.Except (runExcept)
import Data.Array (head, uncons)
import Data.Bifunctor (lmap)
import Data.ByteString (ByteString)
import Data.DateTime.Instant (Instant)
import Data.Either (Either(..))
import Data.Foreign (Foreign, isNull, readArray, readBoolean, readChar, readInt, readNumber, readString, toForeign, unsafeFromForeign)
import Data.List (List)
import Data.List as List
import Data.Maybe (Maybe(..))
import Data.Newtype (class Newtype)
import Data.Traversable (traverse)
import Data.Tuple (fst, Tuple)
import Data.Tuple.Nested ((/\))
import Prelude

foreign import data POSTGRESQL :: Effect

-- | PostgreSQL connection pool configuration.
type PoolConfiguration =
    { user              :: String
    , password          :: String
    , host              :: String
    , port              :: Int
    , database          :: String
    , max               :: Int
    , idleTimeoutMillis :: Int
    }

foreign import null :: Foreign

-- | PostgreSQL connection pool.
foreign import data Pool :: Type

-- | PostgreSQL connection.
foreign import data Connection :: Type

-- | PostgreSQL query with parameter (`$1`, `$2`, …) and return types.
newtype Query i o = Query String

derive instance newtypeQuery :: Newtype (Query i o) _

-- | Convert things to SQL rows.
class ToSQLRow a where
    toSQLRow :: a -> Array Foreign

-- | Convert things from SQL rows.
class FromSQLRow a where
    fromSQLRow :: Array Foreign -> Either String a

-- | Convert things to SQL values.
class ToSQLValue a where
    toSQLValue :: a -> Foreign

-- | Convert things from SQL values.
class FromSQLValue a where
    fromSQLValue :: Foreign -> Either String a

instance toSQLRowUnit :: ToSQLRow Unit where
    toSQLRow _ = []

instance toSQLRowTuple :: (ToSQLValue a, ToSQLRow b) => ToSQLRow (Tuple a b) where
    toSQLRow (a /\ b) = [toSQLValue a] <> toSQLRow b

instance fromSQLRowUnit :: FromSQLRow Unit where
    fromSQLRow [] = pure unit
    fromSQLRow _ = throwError "FromSQLRow: row has too many columns"

instance fromSQLRowTuple :: (FromSQLValue a, FromSQLRow b) => FromSQLRow (Tuple a b) where
    fromSQLRow = uncons >>> case _ of
      Just {head, tail} -> (/\) <$> fromSQLValue head <*> fromSQLRow tail
      Nothing -> throwError "FromSQLRow: row has too few columns"

instance toSQLValueBoolean :: ToSQLValue Boolean where
    toSQLValue = toForeign

instance fromSQLValueBoolean :: FromSQLValue Boolean where
    fromSQLValue = lmap show <<< runExcept <<< readBoolean

instance toSQLValueChar :: ToSQLValue Char where
    toSQLValue = toForeign

instance fromSQLValueChar :: FromSQLValue Char where
    fromSQLValue = lmap show <<< runExcept <<< readChar

instance toSQLValueInt :: ToSQLValue Int where
    toSQLValue = toForeign

instance fromSQLValueInt :: FromSQLValue Int where
    fromSQLValue = lmap show <<< runExcept <<< readInt

instance toSQLValueNumber :: ToSQLValue Number where
    toSQLValue = toForeign

instance fromSQLValueNumber :: FromSQLValue Number where
    fromSQLValue = lmap show <<< runExcept <<< readNumber

instance toSQLValueString :: ToSQLValue String where
    toSQLValue = toForeign

instance fromSQLValueString :: FromSQLValue String where
    fromSQLValue = lmap show <<< runExcept <<< readString

instance fromSQLValueArray :: (FromSQLValue a) => FromSQLValue (Array a) where
    fromSQLValue = traverse fromSQLValue <=< lmap show <<< runExcept <<< readArray

instance fromSQLValueList :: (FromSQLValue a) => FromSQLValue (List a) where
    fromSQLValue = map List.fromFoldable <<< traverse fromSQLValue <=< lmap show <<< runExcept <<< readArray

instance toSQLValueByteString :: ToSQLValue ByteString where
    toSQLValue = toForeign

instance fromSQLValueByteString :: FromSQLValue ByteString where
    fromSQLValue x
        | unsafeIsBuffer x = pure $ unsafeFromForeign x
        | otherwise = throwError "FromSQLValue ByteString: not a buffer"

instance toSQLValueInstant :: ToSQLValue Instant where
    toSQLValue = instantToString

instance toSQLValueMaybe :: (ToSQLValue a) => ToSQLValue (Maybe a) where
    toSQLValue Nothing = null
    toSQLValue (Just x) = toSQLValue x

instance fromSQLValueMaybe :: (FromSQLValue a) => FromSQLValue (Maybe a) where
    fromSQLValue x | isNull x  = pure Nothing
                   | otherwise = Just <$> fromSQLValue x

foreign import instantToString :: Instant -> Foreign
foreign import unsafeIsBuffer :: ∀ a. a -> Boolean

-- | Create a new connection pool.
foreign import newPool
    :: ∀ eff
     . PoolConfiguration
    -> Aff (postgreSQL :: POSTGRESQL | eff) Pool

-- | Run an action with a connection. The connection is released to the pool
-- | when the action returns.
foreign import withConnection
    :: ∀ eff a
     . Pool
    -> (Connection -> Aff (postgreSQL :: POSTGRESQL | eff) a)
    -> Aff (postgreSQL :: POSTGRESQL | eff) a

-- | Run an action within a transaction. The transaction is committed if the
-- | action returns, and rolled back when the action throws. If you want to
-- | change the transaction mode, issue a separate `SET TRANSACTION` statement
-- | within the transaction.
withTransaction
    :: ∀ eff a
     . Connection
    -> Aff (postgreSQL :: POSTGRESQL | eff) a
    -> Aff (postgreSQL :: POSTGRESQL | eff) a
withTransaction conn action =
    execute conn (Query "BEGIN TRANSACTION") unit
    *> catchError (Right <$> action) (pure <<< Left) >>= case _ of
        Right a -> execute conn (Query "COMMIT TRANSACTION") unit $> a
        Left e -> execute conn (Query "ROLLBACK TRANSACTION") unit *> throwError e

-- | Execute a PostgreSQL query and discard its results.
execute
    :: ∀ i o eff
     . (ToSQLRow i)
    => Connection
    -> Query i o
    -> i
    -> Aff (postgreSQL :: POSTGRESQL | eff) Unit
execute conn (Query sql) values =
    void $ _query conn sql (toSQLRow values)

-- | Execute a PostgreSQL query and return its results.
query
    :: ∀ i o eff
     . ToSQLRow i
    => FromSQLRow o
    => Connection
    -> Query i o
    -> i
    -> Aff (postgreSQL :: POSTGRESQL | eff) (Array o)
query conn (Query sql) values =
    _query conn sql (toSQLRow values)
    >>= traverse (fromSQLRow >>> case _ of
          Right row -> pure row
          Left  msg -> throwError (error msg))

scalar
    :: ∀ i o eff
     . ToSQLRow i
    => FromSQLValue o
    => Connection
    -> Query i (Tuple o Unit)
    -> i
    -> Aff (postgreSQL :: POSTGRESQL | eff) (Maybe o)
scalar conn sql values =
    query conn sql values
    <#> map fst <<< head

foreign import _query
    :: ∀ eff
     . Connection
    -> String
    -> Array Foreign
    -> Aff (postgreSQL :: POSTGRESQL | eff) (Array (Array Foreign))

fromRight :: ∀ a b. Either a b -> Maybe b
fromRight (Left _) = Nothing
fromRight (Right a) = Just a
