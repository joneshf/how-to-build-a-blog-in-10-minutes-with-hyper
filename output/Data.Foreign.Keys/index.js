// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Applicative = require("../Control.Applicative");
var Control_Monad_Except_Trans = require("../Control.Monad.Except.Trans");
var Data_Boolean = require("../Data.Boolean");
var Data_Eq = require("../Data.Eq");
var Data_Foreign = require("../Data.Foreign");
var Data_Function = require("../Data.Function");
var Data_Identity = require("../Data.Identity");
var Prelude = require("../Prelude");
var keys = function (value) {
    if (Data_Foreign.isNull(value)) {
        return Data_Foreign.fail(new Data_Foreign.TypeMismatch("object", "null"));
    };
    if (Data_Foreign.isUndefined(value)) {
        return Data_Foreign.fail(new Data_Foreign.TypeMismatch("object", "undefined"));
    };
    if (Data_Foreign.typeOf(value) === "object") {
        return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))($foreign.unsafeKeys(value));
    };
    if (Data_Boolean.otherwise) {
        return Data_Foreign.fail(new Data_Foreign.TypeMismatch("object", Data_Foreign.typeOf(value)));
    };
    throw new Error("Failed pattern match at Data.Foreign.Keys line 16, column 1 - line 20, column 59: " + [ value.constructor.name ]);
};
module.exports = {
    keys: keys
};
