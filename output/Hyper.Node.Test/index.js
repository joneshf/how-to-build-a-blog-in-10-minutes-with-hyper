// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Monad = require("../Control.Monad");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Array = require("../Data.Array");
var Data_Function = require("../Data.Function");
var Data_Monoid = require("../Data.Monoid");
var Data_Semigroup = require("../Data.Semigroup");
var Hyper_Middleware = require("../Hyper.Middleware");
var Hyper_Response = require("../Hyper.Response");
var Node_Buffer = require("../Node.Buffer");
var TestResponseBody = function (x) {
    return x;
};
var semigroupBufferResponse = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        return Data_Semigroup.append(Data_Semigroup.semigroupArray)(v)(v1);
    };
});
var monoidBufferResponse = new Data_Monoid.Monoid(function () {
    return semigroupBufferResponse;
}, [  ]);
var bufferTestResponseBody = function (dictMonad) {
    return new Hyper_Response.ResponseWritable(function ($5) {
        return Control_Applicative.pure(Hyper_Middleware.applicativeMiddleware(dictMonad))(TestResponseBody(Data_Array.singleton($5)));
    });
};
module.exports = {
    TestResponseBody: TestResponseBody, 
    bufferTestResponseBody: bufferTestResponseBody, 
    semigroupBufferResponse: semigroupBufferResponse, 
    monoidBufferResponse: monoidBufferResponse
};
