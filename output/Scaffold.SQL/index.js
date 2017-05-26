"use strict";
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_List = require("../Data.List");
var Data_List_Types = require("../Data.List.Types");
var Data_Monoid = require("../Data.Monoid");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Show = require("../Data.Show");
var Data_Tuple = require("../Data.Tuple");
var Data_Unit = require("../Data.Unit");
var Database_PostgreSQL = require("../Database.PostgreSQL");
var Scaffold_Id = require("../Scaffold.Id");
var Type_Proxy = require("../Type.Proxy");
var Table = function (table) {
    this.table = table;
};
var Columns = function (columns) {
    this.columns = columns;
};
var table = function (dict) {
    return dict.table;
};
var show = function (dictTable) {
    return Database_PostgreSQL.Query("SELECT * FROM " + (table(dictTable)(Type_Proxy["Proxy"].value) + " WHERE id = $1"));
};
var index = function (dictTable) {
    return Database_PostgreSQL.Query("SELECT * FROM " + table(dictTable)(Type_Proxy["Proxy"].value));
};
var destroy = function (dictTable) {
    return Database_PostgreSQL.Query("DELETE FROM " + (table(dictTable)(Type_Proxy["Proxy"].value) + " WHERE id = $1 RETURNING *"));
};
var columnsUnit = new Columns(function (v) {
    return Data_List_Types.Nil.value;
});
var columns = function (dict) {
    return dict.columns;
};
var columnsTuple = function (dictColumns) {
    return function (dictColumns1) {
        return new Columns(function (v) {
            return Data_Semigroup.append(Data_List_Types.semigroupList)(columns(dictColumns)(Type_Proxy["Proxy"].value))(columns(dictColumns1)(Type_Proxy["Proxy"].value));
        });
    };
};
var create = function (dictColumns) {
    return function (dictTable) {
        var go = function (n) {
            return function (v) {
                return "$" + Data_Show.show(Data_Show.showInt)(n + 1 | 0);
            };
        };
        var fieldNames = columns(dictColumns)(Type_Proxy["Proxy"].value);
        var fieldPositions = Data_List.mapWithIndex(go)(fieldNames);
        return Database_PostgreSQL.Query("INSERT INTO " + (table(dictTable)(Type_Proxy["Proxy"].value) + (" (" + (Data_Foldable.intercalate(Data_List_Types.foldableList)(Data_Monoid.monoidString)(", ")(fieldNames) + (") VALUES (" + (Data_Foldable.intercalate(Data_List_Types.foldableList)(Data_Monoid.monoidString)(", ")(fieldPositions) + ") RETURNING *"))))));
    };
};
var update = function (dictColumns) {
    return function (dictTable) {
        var go = function (n) {
            return function (column) {
                return column + (" = $" + Data_Show.show(Data_Show.showInt)(n + 2 | 0));
            };
        };
        var assignments = Data_List.mapWithIndex(go)(columns(dictColumns)(Type_Proxy["Proxy"].value));
        return Database_PostgreSQL.Query("UPDATE " + (table(dictTable)(Type_Proxy["Proxy"].value) + (" SET " + (Data_Foldable.intercalate(Data_List_Types.foldableList)(Data_Monoid.monoidString)(", ")(assignments) + " WHERE id = $1 RETURNING *"))));
    };
};
module.exports = {
    Columns: Columns, 
    Table: Table, 
    columns: columns, 
    create: create, 
    destroy: destroy, 
    index: index, 
    show: show, 
    table: table, 
    update: update, 
    columnsUnit: columnsUnit, 
    columnsTuple: columnsTuple
};
