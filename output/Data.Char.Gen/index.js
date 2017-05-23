// Generated by purs version 0.11.4
"use strict";
var Control_Monad_Gen = require("../Control.Monad.Gen");
var Control_Monad_Gen_Class = require("../Control.Monad.Gen.Class");
var Data_Char = require("../Data.Char");
var Data_Functor = require("../Data.Functor");
var Prelude = require("../Prelude");
var genUnicodeChar = function (dictMonadGen) {
    return Data_Functor.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Char.fromCharCode)(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(0)(65536));
};
var genDigitChar = function (dictMonadGen) {
    return Data_Functor.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Char.fromCharCode)(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(48)(57));
};
var genAsciiChar$prime = function (dictMonadGen) {
    return Data_Functor.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Char.fromCharCode)(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(0)(127));
};
var genAsciiChar = function (dictMonadGen) {
    return Data_Functor.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Char.fromCharCode)(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(32)(127));
};
module.exports = {
    genAsciiChar: genAsciiChar, 
    "genAsciiChar'": genAsciiChar$prime, 
    genDigitChar: genDigitChar, 
    genUnicodeChar: genUnicodeChar
};
