// Generated by purs version 0.11.4
"use strict";
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Functor_Product = require("../Data.Functor.Product");
var Data_Lens_Iso_Newtype = require("../Data.Lens.Iso.Newtype");
var Data_Lens_Lens = require("../Data.Lens.Lens");
var Data_Lens_Lens_Tuple = require("../Data.Lens.Lens.Tuple");
var Prelude = require("../Prelude");
var _2 = function (dictStrong) {
    return function ($2) {
        return Data_Lens_Iso_Newtype._Newtype(Data_Functor_Product.newtypeProduct)(Data_Functor_Product.newtypeProduct)(dictStrong.Profunctor0())(Data_Lens_Lens_Tuple._2(dictStrong)($2));
    };
};
var _1 = function (dictStrong) {
    return function ($3) {
        return Data_Lens_Iso_Newtype._Newtype(Data_Functor_Product.newtypeProduct)(Data_Functor_Product.newtypeProduct)(dictStrong.Profunctor0())(Data_Lens_Lens_Tuple._1(dictStrong)($3));
    };
};
module.exports = {
    _1: _1, 
    _2: _2
};
