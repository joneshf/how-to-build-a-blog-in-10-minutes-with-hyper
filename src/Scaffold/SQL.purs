module Scaffold.SQL where

import Data.Show as Data.Show
import Data.Foldable (intercalate)
import Data.Function (($))
import Data.List (mapWithIndex)
import Data.List.Types (List(..))
import Data.Semigroup ((<>))
import Data.Semiring ((+))
import Data.Tuple (Tuple)
import Data.Unit (Unit)
import Database.PostgreSQL (Query(..))
import Scaffold.Id (Id)
import Type.Proxy (Proxy(..))

class Table a where
  table :: Proxy a -> String

class Columns a where
  columns :: Proxy a -> List String

instance columnsUnit :: Columns Unit where
  columns _ = Nil

instance columnsTuple :: (Columns a, Columns b) => Columns (Tuple a b) where
  columns _ = columns (Proxy :: Proxy a) <> columns (Proxy :: Proxy b)

class ForeignKey row id | row -> id where
  foreignKey :: row -> id
  foreignKey' :: Proxy row -> String

index :: forall a row. Table row => Query a row
index = Query $ "SELECT * FROM " <> table (Proxy :: Proxy row)

show :: forall row. Table row => Query Id row
show = Query $ "SELECT * FROM " <> table (Proxy :: Proxy row) <> " WHERE id = $1"

collection :: forall row id . ForeignKey row id => Table row => Query id row
collection =
  Query
    $ "SELECT * FROM "
    <> table (Proxy :: Proxy row)
    <> " WHERE "
    <> foreignKey' (Proxy :: Proxy row)
    <> " = $1"

create :: forall a row. Columns row => Table row => Query a row
create =
  Query
    $ "INSERT INTO "
    <> table (Proxy :: Proxy row)
    <> " ("
    <> intercalate ", " fieldNames
    <> ") VALUES ("
    <> intercalate ", " fieldPositions
    <> ") RETURNING *"
  where
  fieldNames = columns (Proxy :: Proxy row)
  fieldPositions = mapWithIndex go fieldNames
  go n _ = "$" <> Data.Show.show (n + 1)

update :: forall a row. Columns row => Table row => Query (Tuple Id a) row
update =
  Query
    $ "UPDATE "
    <> table (Proxy :: Proxy row)
    <> " SET "
    <> intercalate ", " assignments
    <> " WHERE id = $1 RETURNING *"
  where
  assignments = mapWithIndex go $ columns $ Proxy :: Proxy row
  go n column = column <> " = $" <> Data.Show.show (n + 2)

destroy :: forall row. Table row => Query Id row
destroy =
  Query
    $ "DELETE FROM "
    <> table (Proxy :: Proxy row)
    <> " WHERE id = $1 RETURNING *"
