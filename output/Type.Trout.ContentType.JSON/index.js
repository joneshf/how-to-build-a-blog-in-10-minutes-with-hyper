// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Argonaut = require("../Data.Argonaut");
var Data_Argonaut_Core = require("../Data.Argonaut.Core");
var Data_Argonaut_Encode_Class = require("../Data.Argonaut.Encode.Class");
var Data_List_Types = require("../Data.List.Types");
var Data_MediaType_Common = require("../Data.MediaType.Common");
var Data_Tuple = require("../Data.Tuple");
var Prelude = require("../Prelude");
var Type_Trout_ContentType = require("../Type.Trout.ContentType");
var mimeRenderJson = function (dictEncodeJson) {
    return new Type_Trout_ContentType.MimeRender(function (v) {
        return function ($4) {
            return Data_Argonaut_Core.stringify(Data_Argonaut_Encode_Class.encodeJson(dictEncodeJson)($4));
        };
    });
};
var hasMediaTypeJson = new Type_Trout_ContentType.HasMediaType(function (v) {
    return Data_MediaType_Common.applicationJSON;
});
var allMimeRenderJson = function (dictEncodeJson) {
    return new Type_Trout_ContentType.AllMimeRender(function (p) {
        return function (x) {
            return Control_Applicative.pure(Data_List_Types.applicativeNonEmptyList)(new Data_Tuple.Tuple(Type_Trout_ContentType.getMediaType(hasMediaTypeJson)(p), Type_Trout_ContentType.mimeRender(mimeRenderJson(dictEncodeJson))(p)(x)));
        };
    });
};
module.exports = {
    hasMediaTypeJson: hasMediaTypeJson, 
    mimeRenderJson: mimeRenderJson, 
    allMimeRenderJson: allMimeRenderJson
};
