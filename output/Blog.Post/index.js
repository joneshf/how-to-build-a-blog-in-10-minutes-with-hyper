"use strict";
var Control_Apply = require("../Control.Apply");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Either = require("../Data.Either");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Generic = require("../Data.Generic");
var Data_Maybe = require("../Data.Maybe");
var Data_Newtype = require("../Data.Newtype");
var Data_Tuple_Nested = require("../Data.Tuple.Nested");
var Data_Unit = require("../Data.Unit");
var Database_PostgreSQL = require("../Database.PostgreSQL");
var Post_Title = require("../Post.Title");
var Scaffold_Destroy = require("../Scaffold.Destroy");
var Scaffold_Edit = require("../Scaffold.Edit");
var Scaffold_Field = require("../Scaffold.Field");
var Scaffold_Header = require("../Scaffold.Header");
var Scaffold_Id = require("../Scaffold.Id");
var Scaffold_New = require("../Scaffold.New");
var Scaffold_SQL = require("../Scaffold.SQL");
var Scaffold_Show = require("../Scaffold.Show");
var Text_Smolder_HTML = require("../Text.Smolder.HTML");
var Type_Proxy = require("../Type.Proxy");
var Type_Trout_ContentType_HTML = require("../Type.Trout.ContentType.HTML");
var Post = function (x) {
    return x;
};
var tablePost = new Scaffold_SQL.Table(function (v) {
    return "post";
});
var queryMap = function (v) {
    return function (v1) {
        return v1;
    };
};

// TODO: Make PRs for these types to implement all of the typeclasses they can.
var proxyMap = function (v) {
    return function (v1) {
        return Type_Proxy["Proxy"].value;
    };
};
var newtypePost = new Data_Newtype.Newtype(function (n) {
    return n;
}, Post);
var getIdPost = new Scaffold_Id.GetId(function ($20) {
    return Data_Tuple_Nested.get1(Data_Newtype.unwrap(newtypePost)($20));
});
var genericPost = new Data_Generic.Generic(function (v) {
    if (v instanceof Data_Generic.SProd && (v.value0 === "Blog.Post.Post" && v.value1.length === 1)) {
        return Control_Apply.apply(Data_Maybe.applyMaybe)(new Data_Maybe.Just(Post))(Data_Generic.fromSpine(Data_Generic.genericTuple(Scaffold_Id.genericId)(Data_Generic.genericTuple(Post_Title.genericTitle)(Data_Generic.genericUnit)))(v["value1"][0](Data_Unit.unit)));
    };
    return Data_Maybe.Nothing.value;
}, function ($dollarq) {
    return new Data_Generic.SigProd("Blog.Post.Post", [ {
        sigConstructor: "Blog.Post.Post", 
        sigValues: [ function ($dollarq1) {
            return Data_Generic.toSignature(Data_Generic.genericTuple(Scaffold_Id.genericId)(Data_Generic.genericTuple(Post_Title.genericTitle)(Data_Generic.genericUnit)))(Data_Generic.anyProxy);
        } ]
    } ]);
}, function (v) {
    return new Data_Generic.SProd("Blog.Post.Post", [ function ($dollarq) {
        return Data_Generic.toSpine(Data_Generic.genericTuple(Scaffold_Id.genericId)(Data_Generic.genericTuple(Post_Title.genericTitle)(Data_Generic.genericUnit)))(v);
    } ]);
});
var fromSQLRowPost = new Database_PostgreSQL.FromSQLRow(function ($21) {
    return Data_Functor.map(Data_Either.functorEither)(Data_Newtype.wrap(newtypePost))(Database_PostgreSQL.fromSQLRow(Database_PostgreSQL.fromSQLRowTuple(Scaffold_Id.fromSQLValueId)(Database_PostgreSQL.fromSQLRowTuple(Post_Title.fromSQLValueTitle)(Database_PostgreSQL.fromSQLRowUnit)))($21));
});
var encodeShowPost = new Scaffold_Show.EncodeShow(function ($22) {
    return Scaffold_Show.encodeShow(Scaffold_Show.encodeShowTuple(Scaffold_Id.encodeShowId)(Scaffold_Show.encodeShowTuple(Post_Title.encodeShowTitle)(Scaffold_Show.encodeShowUnit)))(Data_Newtype.unwrap(newtypePost)($22));
});
var encodeNewPost = new Scaffold_New.EncodeNew(function ($23) {
    return Scaffold_New.encodeNew(Scaffold_New.encodeNewTuple(Scaffold_Id.encodeNewId)(Scaffold_New.encodeNewTuple(Post_Title.encodeNewTitle)(Scaffold_New.encodeNewUnit)))(proxyMap(Data_Newtype.unwrap(newtypePost))($23));
});
var encodeHeaderPost = new Scaffold_Header.EncodeHeader(function ($24) {
    return Scaffold_Header.encodeHeader(Scaffold_Header.encodeHeaderTuple(Scaffold_Id.genericId)(Scaffold_Header.encodeHeaderTuple(Post_Title.genericTitle)(Scaffold_Header.encodeHeaderUnit)))(proxyMap(Data_Newtype.unwrap(newtypePost))($24));
});
var encodeHTMLPost = new Type_Trout_ContentType_HTML.EncodeHTML(function (post) {
    return Text_Smolder_HTML.section(Text_Smolder_HTML.header(Text_Smolder_HTML.h1(Type_Trout_ContentType_HTML.encodeHTML(Post_Title.encodeHTMLTitle)(Data_Tuple_Nested.get2(Data_Newtype.unwrap(newtypePost)(post))))));
});
var encodeFieldPost = new Scaffold_Field.EncodeField(function ($25) {
    return Scaffold_Field.encodeField(Scaffold_Field.encodeFieldTuple(Scaffold_Id.encodeFieldId)(Scaffold_Field.encodeFieldTuple(Post_Title.encodeFieldTitle)(Scaffold_Field.encodeFieldUnit)))(Data_Newtype.unwrap(newtypePost)($25));
});
var encodeEditPost = new Scaffold_Edit.EncodeEdit(function ($26) {
    return Scaffold_Edit.encodeEdit(Scaffold_Edit.encodeEditTuple(Scaffold_Id.encodeEditId)(Scaffold_Edit.encodeEditTuple(Post_Title.encodeEditTitle)(Scaffold_Edit.encodeEditUnit)))(Data_Newtype.unwrap(newtypePost)($26));
});
var encodeDestroyPost = new Scaffold_Destroy.EncodeDestroy(function ($27) {
    return Scaffold_Destroy.encodeDestroy(Scaffold_Destroy.encodeDestroyTuple(Scaffold_Id.encodeDestroyId)(Scaffold_Destroy.encodeDestroyTuple(Post_Title.encodeDestroyTitle)(Scaffold_Destroy.encodeDestroyUnit)))(Data_Newtype.unwrap(newtypePost)($27));
});
var columnsPost = new Scaffold_SQL.Columns(function (v) {
    return Scaffold_SQL.columns(Scaffold_SQL.columnsTuple(Post_Title.columnsTitle)(Scaffold_SQL.columnsUnit))(Type_Proxy["Proxy"].value);
});
module.exports = {
    Post: Post, 
    proxyMap: proxyMap, 
    queryMap: queryMap, 
    genericPost: genericPost, 
    newtypePost: newtypePost, 
    columnsPost: columnsPost, 
    encodeDestroyPost: encodeDestroyPost, 
    encodeEditPost: encodeEditPost, 
    encodeShowPost: encodeShowPost, 
    encodeFieldPost: encodeFieldPost, 
    encodeHeaderPost: encodeHeaderPost, 
    encodeHTMLPost: encodeHTMLPost, 
    encodeNewPost: encodeNewPost, 
    fromSQLRowPost: fromSQLRowPost, 
    getIdPost: getIdPost, 
    tablePost: tablePost
};
