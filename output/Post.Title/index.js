"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Either = require("../Data.Either");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Generic = require("../Data.Generic");
var Data_List_Types = require("../Data.List.Types");
var Data_Maybe = require("../Data.Maybe");
var Data_Newtype = require("../Data.Newtype");
var Data_String = require("../Data.String");
var Data_Tuple_Nested = require("../Data.Tuple.Nested");
var Data_Unit = require("../Data.Unit");
var Database_PostgreSQL = require("../Database.PostgreSQL");
var Global = require("../Global");
var Hyper_Form = require("../Hyper.Form");
var Scaffold_Destroy = require("../Scaffold.Destroy");
var Scaffold_Edit = require("../Scaffold.Edit");
var Scaffold_Field = require("../Scaffold.Field");
var Scaffold_Form = require("../Scaffold.Form");
var Scaffold_New = require("../Scaffold.New");
var Scaffold_SQL = require("../Scaffold.SQL");
var Scaffold_Show = require("../Scaffold.Show");
var Text_Smolder_HTML = require("../Text.Smolder.HTML");
var Text_Smolder_HTML_Attributes = require("../Text.Smolder.HTML.Attributes");
var Text_Smolder_Markup = require("../Text.Smolder.Markup");
var Type_Trout_ContentType_HTML = require("../Type.Trout.ContentType.HTML");
var Title = function (x) {
    return x;
};
var newtypeTitle = new Data_Newtype.Newtype(function (n) {
    return n;
}, Title);
var toSQLValueTitle = new Database_PostgreSQL.ToSQLValue(function ($14) {
    return Database_PostgreSQL.toSQLValue(Database_PostgreSQL.toSQLValueString)(Data_Newtype.unwrap(newtypeTitle)($14));
});
var toSQLRowTitle = new Database_PostgreSQL.ToSQLRow(function ($15) {
    return Database_PostgreSQL.toSQLRow(Database_PostgreSQL.toSQLRowTuple(toSQLValueTitle)(Database_PostgreSQL.toSQLRowUnit))(Data_Tuple_Nested.tuple1($15));
});
var genericTitle = new Data_Generic.Generic(function (v) {
    if (v instanceof Data_Generic.SProd && (v.value0 === "Post.Title.Title" && v.value1.length === 1)) {
        return Control_Apply.apply(Data_Maybe.applyMaybe)(new Data_Maybe.Just(Title))(Data_Generic.fromSpine(Data_Generic.genericString)(v["value1"][0](Data_Unit.unit)));
    };
    return Data_Maybe.Nothing.value;
}, function ($dollarq) {
    return new Data_Generic.SigProd("Post.Title.Title", [ {
        sigConstructor: "Post.Title.Title", 
        sigValues: [ function ($dollarq1) {
            return Data_Generic.toSignature(Data_Generic.genericString)(Data_Generic.anyProxy);
        } ]
    } ]);
}, function (v) {
    return new Data_Generic.SProd("Post.Title.Title", [ function ($dollarq) {
        return Data_Generic.toSpine(Data_Generic.genericString)(v);
    } ]);
});
var fromSQLValueTitle = new Database_PostgreSQL.FromSQLValue(function ($16) {
    return Data_Functor.map(Data_Either.functorEither)(Data_Newtype.wrap(newtypeTitle))(Database_PostgreSQL.fromSQLValue(Database_PostgreSQL.fromSQLValueString)($16));
});
var fromFormTitle = new Scaffold_Form.FromForm(function ($17) {
    return Data_Functor.map(Data_Either.functorEither)(Data_Newtype.wrap(newtypeTitle))(Data_Functor.map(Data_Either.functorEither)(function ($18) {
        return Global["decodeURIComponent"](Data_String.replaceAll(Data_Newtype.wrap(Data_String.newtypePattern)("+"))(Data_Newtype.wrap(Data_String.newtypeReplacement)(" "))($18));
    })(Hyper_Form.required("title")($17)));
});
var encodeNewTitle = new Scaffold_New.EncodeNew(function (v) {
    return Text_Smolder_HTML.label(Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_Markup.text("Title"))(function () {
        return Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupM)(Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupM)(Text_Smolder_HTML.input)(Text_Smolder_HTML_Attributes.name("title")))(Text_Smolder_HTML_Attributes["type'"]("text"));
    }));
});
var encodeHTMLTitle = new Type_Trout_ContentType_HTML.EncodeHTML(function ($19) {
    return Text_Smolder_Markup.text(Data_Newtype.unwrap(newtypeTitle)($19));
});
var encodeShowTitle = new Scaffold_Show.EncodeShow(function (title) {
    return Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_HTML.dt(Text_Smolder_Markup.text("Title")))(function () {
        return Text_Smolder_HTML.dd(Type_Trout_ContentType_HTML.encodeHTML(encodeHTMLTitle)(title));
    });
});
var encodeFieldTitle = new Scaffold_Field.EncodeField(Type_Trout_ContentType_HTML.encodeHTML(encodeHTMLTitle));
var encodeEditTitle = new Scaffold_Edit.EncodeEdit(function (t) {
    return Text_Smolder_HTML.label(Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_Markup.text("Title"))(function () {
        return Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupM)(Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupM)(Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupM)(Text_Smolder_HTML.input)(Text_Smolder_HTML_Attributes.name("title")))(Text_Smolder_HTML_Attributes["type'"]("text")))(Text_Smolder_HTML_Attributes.value(Data_Newtype.unwrap(newtypeTitle)(t)));
    }));
});
var encodeDestroyTitle = new Scaffold_Destroy.EncodeDestroy(Type_Trout_ContentType_HTML.encodeHTML(encodeHTMLTitle));
var columnsTitle = new Scaffold_SQL.Columns(function (v) {
    return Control_Applicative.pure(Data_List_Types.applicativeList)("title");
});
module.exports = {
    Title: Title, 
    genericTitle: genericTitle, 
    newtypeTitle: newtypeTitle, 
    columnsTitle: columnsTitle, 
    encodeDestroyTitle: encodeDestroyTitle, 
    encodeEditTitle: encodeEditTitle, 
    encodeShowTitle: encodeShowTitle, 
    encodeFieldTitle: encodeFieldTitle, 
    encodeHTMLTitle: encodeHTMLTitle, 
    encodeNewTitle: encodeNewTitle, 
    fromSQLValueTitle: fromSQLValueTitle, 
    fromFormTitle: fromFormTitle, 
    toSQLRowTitle: toSQLRowTitle, 
    toSQLValueTitle: toSQLValueTitle
};
