// Generated by purs version 0.11.4
"use strict";
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Function = require("../Data.Function");
var Data_Lens = require("../Data.Lens");
var Data_Lens_Lens = require("../Data.Lens.Lens");
var Data_Maybe = require("../Data.Maybe");
var Data_StrMap = require("../Data.StrMap");
var Data_Symbol = require("../Data.Symbol");
var Partial_Unsafe = require("../Partial.Unsafe");
var Prelude = require("../Prelude");
var Unsafe_Coerce = require("../Unsafe.Coerce");
var unsafeSet = function (s) {
    return function (a) {
        return function ($10) {
            return Unsafe_Coerce.unsafeCoerce(Data_StrMap.insert(s)(a)(Unsafe_Coerce.unsafeCoerce($10)));
        };
    };
};
var unsafeGet = function (s) {
    return function ($11) {
        return Data_Maybe.fromJust()(Data_StrMap.lookup(s)(Unsafe_Coerce.unsafeCoerce($11)));
    };
};
var set = function (dictIsSymbol) {
    return function (dictRowCons) {
        return function (dictRowCons1) {
            return function (l) {
                return unsafeSet(Data_Symbol.reflectSymbol(dictIsSymbol)(l));
            };
        };
    };
};
var get = function (dictIsSymbol) {
    return function (dictRowCons) {
        return function (l) {
            return unsafeGet(Data_Symbol.reflectSymbol(dictIsSymbol)(l));
        };
    };
};
var prop = function (dictIsSymbol) {
    return function (dictRowCons) {
        return function (dictRowCons1) {
            return function (l) {
                return function (dictStrong) {
                    return Data_Lens_Lens.lens(get(dictIsSymbol)(dictRowCons)(l))(Data_Function.flip(set(dictIsSymbol)(dictRowCons)(dictRowCons1)(l)))(dictStrong);
                };
            };
        };
    };
};
module.exports = {
    prop: prop
};
