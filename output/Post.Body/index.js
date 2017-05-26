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
var Data_Ord = require("../Data.Ord");
var Data_Semigroup = require("../Data.Semigroup");
var Data_String = require("../Data.String");
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
var Body = function (x) {
    return x;
};
var newtypeBody = new Data_Newtype.Newtype(function (n) {
    return n;
}, Body);
var toSQLValueBody = new Database_PostgreSQL.ToSQLValue(function ($17) {
    return Database_PostgreSQL.toSQLValue(Database_PostgreSQL.toSQLValueString)(Data_Newtype.unwrap(newtypeBody)($17));
});
var genericBody = new Data_Generic.Generic(function (v) {
    if (v instanceof Data_Generic.SProd && (v.value0 === "Post.Body.Body" && v.value1.length === 1)) {
        return Control_Apply.apply(Data_Maybe.applyMaybe)(new Data_Maybe.Just(Body))(Data_Generic.fromSpine(Data_Generic.genericString)(v["value1"][0](Data_Unit.unit)));
    };
    return Data_Maybe.Nothing.value;
}, function ($dollarq) {
    return new Data_Generic.SigProd("Post.Body.Body", [ {
        sigConstructor: "Post.Body.Body", 
        sigValues: [ function ($dollarq1) {
            return Data_Generic.toSignature(Data_Generic.genericString)(Data_Generic.anyProxy);
        } ]
    } ]);
}, function (v) {
    return new Data_Generic.SProd("Post.Body.Body", [ function ($dollarq) {
        return Data_Generic.toSpine(Data_Generic.genericString)(v);
    } ]);
});
var fromSQLValueBody = new Database_PostgreSQL.FromSQLValue(function ($18) {
    return Data_Functor.map(Data_Either.functorEither)(Data_Newtype.wrap(newtypeBody))(Database_PostgreSQL.fromSQLValue(Database_PostgreSQL.fromSQLValueString)($18));
});
var fromFormBody = new Scaffold_Form.FromForm(function ($19) {
    return Data_Functor.map(Data_Either.functorEither)(Data_Newtype.wrap(newtypeBody))(Data_Functor.map(Data_Either.functorEither)(function ($20) {
        return Global["decodeURIComponent"](Data_String.replaceAll(Data_Newtype.wrap(Data_String.newtypePattern)("+"))(Data_Newtype.wrap(Data_String.newtypeReplacement)(" "))($20));
    })(Hyper_Form.required("body")($19)));
});
var encodeNewBody = new Scaffold_New.EncodeNew(function (v) {
    return Text_Smolder_HTML.label(Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_Markup.text("Body"))(function () {
        return Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupMF)(Text_Smolder_HTML.textarea)(Text_Smolder_HTML_Attributes.name("body"))(Text_Smolder_Markup.text(""));
    }));
});
var encodeHTMLBody = new Type_Trout_ContentType_HTML.EncodeHTML(function ($21) {
    return Text_Smolder_Markup.text(Data_Newtype.unwrap(newtypeBody)($21));
});
var encodeShowBody = new Scaffold_Show.EncodeShow(function (body) {
    return Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_HTML.dt(Text_Smolder_Markup.text("Body")))(function () {
        return Text_Smolder_HTML.dd(Type_Trout_ContentType_HTML.encodeHTML(encodeHTMLBody)(body));
    });
});
var encodeFieldBody = new Scaffold_Field.EncodeField((function () {
    var truncate = function (v) {
        var $16 = Data_String.length(v) > 20;
        if ($16) {
            return Body(Data_String.take(20)(v) + "\u2026");
        };
        return v;
    };
    return function ($22) {
        return Type_Trout_ContentType_HTML.encodeHTML(encodeHTMLBody)(truncate($22));
    };
})());
var encodeEditBody = new Scaffold_Edit.EncodeEdit(function (t) {
    return Text_Smolder_HTML.label(Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_Markup.text("Body"))(function () {
        return Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupMF)(Text_Smolder_HTML.textarea)(Text_Smolder_HTML_Attributes.name("body"))(Text_Smolder_Markup.text(Data_Newtype.unwrap(newtypeBody)(t)));
    }));
});
var encodeDestroyBody = new Scaffold_Destroy.EncodeDestroy(Type_Trout_ContentType_HTML.encodeHTML(encodeHTMLBody));
var columnsBody = new Scaffold_SQL.Columns(function (v) {
    return Control_Applicative.pure(Data_List_Types.applicativeList)("body");
});
module.exports = {
    Body: Body, 
    genericBody: genericBody, 
    newtypeBody: newtypeBody, 
    columnsBody: columnsBody, 
    encodeDestroyBody: encodeDestroyBody, 
    encodeEditBody: encodeEditBody, 
    encodeFieldBody: encodeFieldBody, 
    encodeHTMLBody: encodeHTMLBody, 
    encodeNewBody: encodeNewBody, 
    encodeShowBody: encodeShowBody, 
    fromFormBody: fromFormBody, 
    fromSQLValueBody: fromSQLValueBody, 
    toSQLValueBody: toSQLValueBody
};
