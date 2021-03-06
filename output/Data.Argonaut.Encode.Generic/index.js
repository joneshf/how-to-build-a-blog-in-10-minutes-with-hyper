// Generated by purs version 0.11.4
"use strict";
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Argonaut_Core = require("../Data.Argonaut.Core");
var Data_Argonaut_Encode_Class = require("../Data.Argonaut.Encode.Class");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Generic = require("../Data.Generic");
var Data_Int = require("../Data.Int");
var Data_StrMap = require("../Data.StrMap");
var Data_String = require("../Data.String");
var Data_Unit = require("../Data.Unit");
var Prelude = require("../Prelude");
var gEncodeJson$prime = (function () {
    var addField = function (field) {
        return Data_StrMap.insert(field.recLabel)(gEncodeJson$prime(field.recValue(Data_Unit.unit)));
    };
    return function (v) {
        if (v instanceof Data_Generic.SInt) {
            return Data_Argonaut_Core.fromNumber(Data_Int.toNumber(v.value0));
        };
        if (v instanceof Data_Generic.SString) {
            return Data_Argonaut_Core.fromString(v.value0);
        };
        if (v instanceof Data_Generic.SChar) {
            return Data_Argonaut_Core.fromString(Data_String.singleton(v.value0));
        };
        if (v instanceof Data_Generic.SNumber) {
            return Data_Argonaut_Core.fromNumber(v.value0);
        };
        if (v instanceof Data_Generic.SBoolean) {
            return Data_Argonaut_Core.fromBoolean(v.value0);
        };
        if (v instanceof Data_Generic.SArray) {
            return Data_Argonaut_Core.fromArray(Data_Functor.map(Data_Functor.functorArray)(function ($14) {
                return gEncodeJson$prime((function (v1) {
                    return v1(Data_Unit.unit);
                })($14));
            })(v.value0));
        };
        if (v instanceof Data_Generic.SUnit) {
            return Data_Argonaut_Core.jsonNull;
        };
        if (v instanceof Data_Generic.SProd) {
            return Data_Argonaut_Core.fromObject(Data_StrMap.insert("tag")(Data_Argonaut_Encode_Class.encodeJson(Data_Argonaut_Encode_Class.encodeJsonJString)(v.value0))(Data_StrMap.singleton("values")(Data_Argonaut_Encode_Class.encodeJson(Data_Argonaut_Encode_Class.encodeJsonArray(Data_Argonaut_Encode_Class.encodeJsonJson))(Data_Functor.map(Data_Functor.functorArray)(function ($15) {
                return gEncodeJson$prime((function (v1) {
                    return v1(Data_Unit.unit);
                })($15));
            })(v.value1)))));
        };
        if (v instanceof Data_Generic.SRecord) {
            return Data_Argonaut_Core.fromObject(Data_Foldable.foldr(Data_Foldable.foldableArray)(addField)(Data_StrMap.empty)(v.value0));
        };
        throw new Error("Failed pattern match at Data.Argonaut.Encode.Generic line 22, column 16 - line 35, column 48: " + [ v.constructor.name ]);
    };
})();
var gEncodeJson = function (dictGeneric) {
    return function ($16) {
        return gEncodeJson$prime(Data_Generic.toSpine(dictGeneric)($16));
    };
};
module.exports = {
    gEncodeJson: gEncodeJson, 
    "gEncodeJson'": gEncodeJson$prime
};
