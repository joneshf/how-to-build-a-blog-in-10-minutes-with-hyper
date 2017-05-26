"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_IxMonad = require("../Control.IxMonad");
var Control_Monad = require("../Control.Monad");
var Data_Either = require("../Data.Either");
var Data_Functor = require("../Data.Functor");
var Data_Tuple = require("../Data.Tuple");
var Data_Unit = require("../Data.Unit");
var Hyper_Conn = require("../Hyper.Conn");
var Hyper_Form = require("../Hyper.Form");
var Hyper_Middleware = require("../Hyper.Middleware");
var Hyper_Request = require("../Hyper.Request");
var FromForm = function (fromForm) {
    this.fromForm = fromForm;
};
var fromFormUnit = new FromForm(function (v) {
    return Control_Applicative.pure(Data_Either.applicativeEither)(Data_Unit.unit);
});
var fromForm = function (dict) {
    return dict.fromForm;
};
var fromFormTuple = function (dictFromForm) {
    return function (dictFromForm1) {
        return new FromForm(function (form) {
            return Control_Apply.apply(Data_Either.applyEither)(Data_Functor.map(Data_Either.functorEither)(Data_Tuple.Tuple.create)(fromForm(dictFromForm)(form)))(fromForm(dictFromForm1)(form));
        });
    };
};
var parseFromForm = function (dictMonad) {
    return function (dictRequest) {
        return function (dictReadableBody) {
            return function (dictFromForm) {
                return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Form.parseForm(dictMonad)(dictRequest)(dictReadableBody))(function (v) {
                    if (v instanceof Data_Either.Left) {
                        return Control_IxMonad.ipure(Hyper_Middleware.ixMonadMiddleware(dictMonad))(new Data_Either.Left(v.value0));
                    };
                    if (v instanceof Data_Either.Right) {
                        return Control_IxMonad.ipure(Hyper_Middleware.ixMonadMiddleware(dictMonad))(fromForm(dictFromForm)(v.value0));
                    };
                    throw new Error("Failed pattern match at Scaffold.Form line 32, column 32 - line 36, column 25: " + [ v.constructor.name ]);
                });
            };
        };
    };
};
module.exports = {
    FromForm: FromForm, 
    fromForm: fromForm, 
    parseFromForm: parseFromForm, 
    fromFormUnit: fromFormUnit, 
    fromFormTuple: fromFormTuple
};
