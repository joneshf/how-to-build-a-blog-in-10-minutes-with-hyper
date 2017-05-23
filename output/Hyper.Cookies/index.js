// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_IxMonad = require("../Control.IxMonad");
var Control_Monad_Error_Class = require("../Control.Monad.Error.Class");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Array = require("../Data.Array");
var Data_Either = require("../Data.Either");
var Data_Eq = require("../Data.Eq");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_NonEmpty = require("../Data.NonEmpty");
var Data_Semigroup = require("../Data.Semigroup");
var Data_StrMap = require("../Data.StrMap");
var Data_String = require("../Data.String");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Global = require("../Global");
var Hyper_Conn = require("../Hyper.Conn");
var Hyper_Middleware = require("../Hyper.Middleware");
var Hyper_Middleware_Class = require("../Hyper.Middleware.Class");
var Hyper_Request = require("../Hyper.Request");
var Hyper_Response = require("../Hyper.Response");
var Prelude = require("../Prelude");
var toPair = function (kv) {
    if (kv.length === 2) {
        return Control_Applicative.pure(Data_Either.applicativeEither)(new Data_Tuple.Tuple(Global["decodeURIComponent"](kv[0]), [ Global["decodeURIComponent"](kv[1]) ]));
    };
    return Control_Monad_Error_Class.throwError(Control_Monad_Error_Class.monadThrowEither)("Invalid cookie-pair: " + Data_String.joinWith(" ")(kv));
};
var splitPairs = function ($28) {
    return (function ($29) {
        return (function ($30) {
            return Data_Traversable.sequence(Data_Traversable.traversableArray)(Data_Either.applicativeEither)(Data_Functor.map(Data_Functor.functorArray)(toPair)($30));
        })(Data_Functor.map(Data_Functor.functorArray)(Data_String.split("="))(Data_Array.filter(Data_Eq.notEq(Data_Eq.eqString)(""))($29)));
    })(Data_Functor.map(Data_Functor.functorArray)(Data_String.trim)(Data_String.split(";")($28)));
};
var setCookie = function (dictMonad) {
    return function (dictResponse) {
        return function (key) {
            return function (value) {
                return Hyper_Response.writeHeader(dictResponse)(new Data_Tuple.Tuple("Set-Cookie", Global["encodeURIComponent"](key) + ("=" + Global["encodeURIComponent"](value))));
            };
        };
    };
};
var parseCookies = function (s) {
    var toCookieMap = function (v) {
        var v1 = Data_Array.uncons(v.value1);
        if (v1 instanceof Data_Maybe.Just) {
            return [ new Data_Tuple.Tuple(v.value0, new Data_NonEmpty.NonEmpty(v1.value0.head, v1.value0.tail)) ];
        };
        if (v1 instanceof Data_Maybe.Nothing) {
            return [  ];
        };
        throw new Error("Failed pattern match at Hyper.Cookies line 57, column 7 - line 59, column 22: " + [ v1.constructor.name ]);
    };
    var combineCookies = function (xs) {
        return function (xs$prime) {
            return new Data_NonEmpty.NonEmpty(Data_NonEmpty.head(xs), Data_Semigroup.append(Data_Semigroup.semigroupArray)(Data_Array.cons(Data_NonEmpty.head(xs$prime))(Data_NonEmpty.tail(xs)))(Data_NonEmpty.tail(xs$prime)));
        };
    };
    return Data_Functor.map(Data_Either.functorEither)(Data_StrMap.fromFoldableWith(Data_Foldable.foldableArray)(combineCookies))(Data_Functor.map(Data_Either.functorEither)(Data_Foldable.foldMap(Data_Foldable.foldableArray)(Data_Monoid.monoidArray)(toCookieMap))(splitPairs(s)));
};
var cookies = function (dictMonad) {
    return function (dictRequest) {
        return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Middleware_Class.getConn(Hyper_Middleware.ixMonadMiddlewareMiddleware(dictMonad.Applicative0())))(function (v) {
            return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Request.getRequestData(dictRequest))(function (v1) {
                var cookies$prime = Data_Maybe.maybe(Control_Applicative.pure(Data_Either.applicativeEither)(Data_StrMap.empty))(parseCookies)(Data_StrMap.lookup("cookie")(v1.headers));
                return Hyper_Middleware_Class.putConn(Hyper_Middleware.ixMonadMiddlewareMiddleware(dictMonad.Applicative0()))((function () {
                    var $24 = {};
                    for (var $25 in v) {
                        if ({}.hasOwnProperty.call(v, $25)) {
                            $24[$25] = v[$25];
                        };
                    };
                    $24.components = (function () {
                        var $21 = {};
                        for (var $22 in v.components) {
                            if ({}.hasOwnProperty.call(v.components, $22)) {
                                $21[$22] = v["components"][$22];
                            };
                        };
                        $21.cookies = cookies$prime;
                        return $21;
                    })();
                    return $24;
                })());
            });
        });
    };
};
module.exports = {
    cookies: cookies, 
    setCookie: setCookie
};
