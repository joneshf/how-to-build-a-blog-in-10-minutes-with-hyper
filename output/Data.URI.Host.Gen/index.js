// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad_Gen = require("../Control.Monad.Gen");
var Control_Monad_Gen_Class = require("../Control.Monad.Gen.Class");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Show = require("../Data.Show");
var Data_String = require("../Data.String");
var Data_URI_Host = require("../Data.URI.Host");
var Data_URI_Types = require("../Data.URI.Types");
var Prelude = require("../Prelude");
var genIPv4 = function (dictMonadGen) {
    return Control_Bind.bind((dictMonadGen.Monad0()).Bind1())(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(0)(255))(function (v) {
        return Control_Bind.bind((dictMonadGen.Monad0()).Bind1())(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(0)(255))(function (v1) {
            return Control_Bind.bind((dictMonadGen.Monad0()).Bind1())(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(0)(255))(function (v2) {
                return Control_Bind.bind((dictMonadGen.Monad0()).Bind1())(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(0)(255))(function (v3) {
                    return Control_Applicative.pure((dictMonadGen.Monad0()).Applicative0())(Data_URI_Types.IPv4Address.create(Data_String.joinWith(".")(Data_Functor.map(Data_Functor.functorArray)(Data_Show.show(Data_Show.showInt))([ v, v1, v2, v3 ]))));
                });
            });
        });
    });
};
module.exports = {
    genIPv4: genIPv4
};