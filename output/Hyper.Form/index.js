// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Category = require("../Control.Category");
var Control_IxMonad = require("../Control.IxMonad");
var Control_Monad_Error_Class = require("../Control.Monad.Error.Class");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Array = require("../Data.Array");
var Data_Either = require("../Data.Either");
var Data_Eq = require("../Data.Eq");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Generic = require("../Data.Generic");
var Data_Maybe = require("../Data.Maybe");
var Data_MediaType = require("../Data.MediaType");
var Data_MediaType_Common = require("../Data.MediaType.Common");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Data_StrMap = require("../Data.StrMap");
var Data_String = require("../Data.String");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Data_Unit = require("../Data.Unit");
var Global = require("../Global");
var Hyper_Conn = require("../Hyper.Conn");
var Hyper_Middleware = require("../Hyper.Middleware");
var Hyper_Middleware_Class = require("../Hyper.Middleware.Class");
var Hyper_Request = require("../Hyper.Request");
var Prelude = require("../Prelude");
var Form = function (x) {
    return x;
};
var ToForm = function (toForm) {
    this.toForm = toForm;
};
var FromForm = function (fromForm) {
    this.fromForm = fromForm;
};
var toTuple = function (kv) {
    if (kv.length === 1) {
        return Control_Applicative.pure(Data_Either.applicativeEither)(new Data_Tuple.Tuple(Global["decodeURIComponent"](kv[0]), Data_Maybe.Nothing.value));
    };
    if (kv.length === 2) {
        return Control_Applicative.pure(Data_Either.applicativeEither)(new Data_Tuple.Tuple(Global["decodeURIComponent"](kv[0]), new Data_Maybe.Just(Global["decodeURIComponent"](kv[1]))));
    };
    return Control_Monad_Error_Class.throwError(Control_Monad_Error_Class.monadThrowEither)("Invalid form key-value pair: " + Data_String.joinWith(" ")(kv));
};
var toForm = function (dict) {
    return dict.toForm;
};
var splitPairs = function ($38) {
    return (function ($39) {
        return Data_Traversable.sequence(Data_Traversable.traversableArray)(Data_Either.applicativeEither)(Data_Functor.map(Data_Functor.functorArray)(toTuple)($39));
    })(Data_Functor.map(Data_Functor.functorArray)(Data_String.split("="))(Data_String.split("&")($38)));
};
var showForm = Data_Show.showArray(Data_Tuple.showTuple(Data_Show.showString)(Data_Maybe.showMaybe(Data_Show.showString)));
var parseContentMediaType = function ($40) {
    return Data_Functor.map(Data_Maybe.functorMaybe)(Data_MediaType.MediaType)(Data_Array.head(Data_String.split(";")($40)));
};
var parseForm = function (dictMonad) {
    return function (dictRequest) {
        return function (dictReadableBody) {
            return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Middleware_Class.getConn(Hyper_Middleware.ixMonadMiddlewareMiddleware(dictMonad.Applicative0())))(function (v) {
                return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Request.getRequestData(dictRequest))(function (v1) {
                    return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Request.readBody(dictReadableBody))(function (v2) {
                        var v3 = Control_Bind.bind(Data_Maybe.bindMaybe)(Data_StrMap.lookup("content-type")(v1.headers))(parseContentMediaType);
                        if (v3 instanceof Data_Maybe.Nothing) {
                            return Control_IxMonad.ipure(Hyper_Middleware.ixMonadMiddleware(dictMonad))(new Data_Either.Left("Missing or invalid content-type header."));
                        };
                        if (v3 instanceof Data_Maybe.Just && Data_Eq.eq(Data_MediaType.eqMediaType)(v3.value0)(Data_MediaType_Common.applicationFormURLEncoded)) {
                            return Control_IxMonad.ipure(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Data_Functor.map(Data_Either.functorEither)(Form)(splitPairs(v2)));
                        };
                        if (v3 instanceof Data_Maybe.Just) {
                            return Control_IxMonad.ipure(Hyper_Middleware.ixMonadMiddleware(dictMonad))(new Data_Either.Left("Cannot parse media of type: " + Data_Show.show(Data_MediaType.showMediaType)(v3.value0)));
                        };
                        throw new Error("Failed pattern match at Hyper.Form line 94, column 3 - line 100, column 70: " + [ v3.constructor.name ]);
                    });
                });
            });
        };
    };
};
var ordForm = Data_Ord.ordArray(Data_Tuple.ordTuple(Data_Ord.ordString)(Data_Maybe.ordMaybe(Data_Ord.ordString)));
var newtypeForm = new Data_Newtype.Newtype(function (n) {
    return n;
}, Form);
var optional = function (key) {
    return function ($41) {
        return Data_Function.flip(Control_Bind.bind(Data_Maybe.bindMaybe))(Control_Category.id(Control_Category.categoryFn))(Data_Tuple.lookup(Data_Foldable.foldableArray)(Data_Eq.eqString)(key)(Data_Newtype.unwrap(newtypeForm)($41)));
    };
};
var required = function (key) {
    return function ($42) {
        return Data_Maybe.maybe(Control_Monad_Error_Class.throwError(Control_Monad_Error_Class.monadThrowEither)("Missing field: " + key))(Control_Applicative.pure(Data_Either.applicativeEither))(optional(key)($42));
    };
};
var monoidForm = Data_Monoid.monoidArray;
var genericForm = new Data_Generic.Generic(function (v) {
    if (v instanceof Data_Generic.SProd && (v.value0 === "Hyper.Form.Form" && v.value1.length === 1)) {
        return Control_Apply.apply(Data_Maybe.applyMaybe)(new Data_Maybe.Just(Form))(Data_Generic.fromSpine(Data_Generic.genericArray(Data_Generic.genericTuple(Data_Generic.genericString)(Data_Generic.genericMaybe(Data_Generic.genericString))))(v["value1"][0](Data_Unit.unit)));
    };
    return Data_Maybe.Nothing.value;
}, function ($dollarq) {
    return new Data_Generic.SigProd("Hyper.Form.Form", [ {
        sigConstructor: "Hyper.Form.Form", 
        sigValues: [ function ($dollarq1) {
            return Data_Generic.toSignature(Data_Generic.genericArray(Data_Generic.genericTuple(Data_Generic.genericString)(Data_Generic.genericMaybe(Data_Generic.genericString))))(Data_Generic.anyProxy);
        } ]
    } ]);
}, function (v) {
    return new Data_Generic.SProd("Hyper.Form.Form", [ function ($dollarq) {
        return Data_Generic.toSpine(Data_Generic.genericArray(Data_Generic.genericTuple(Data_Generic.genericString)(Data_Generic.genericMaybe(Data_Generic.genericString))))(v);
    } ]);
});
var fromForm = function (dict) {
    return dict.fromForm;
};
var parseFromForm = function (dictMonad) {
    return function (dictRequest) {
        return function (dictReadableBody) {
            return function (dictFromForm) {
                return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(parseForm(dictMonad)(dictRequest)(dictReadableBody))(function (v) {
                    if (v instanceof Data_Either.Left) {
                        return Control_IxMonad.ipure(Hyper_Middleware.ixMonadMiddleware(dictMonad))(new Data_Either.Left(v.value0));
                    };
                    if (v instanceof Data_Either.Right) {
                        return Control_IxMonad.ipure(Hyper_Middleware.ixMonadMiddleware(dictMonad))(fromForm(dictFromForm)(v.value0));
                    };
                    throw new Error("Failed pattern match at Hyper.Form line 124, column 3 - line 126, column 39: " + [ v.constructor.name ]);
                });
            };
        };
    };
};
var eqForm = Data_Eq.eqArray(Data_Tuple.eqTuple(Data_Eq.eqString)(Data_Maybe.eqMaybe(Data_Eq.eqString)));
module.exports = {
    Form: Form, 
    FromForm: FromForm, 
    ToForm: ToForm, 
    fromForm: fromForm, 
    optional: optional, 
    parseForm: parseForm, 
    parseFromForm: parseFromForm, 
    required: required, 
    toForm: toForm, 
    newtypeForm: newtypeForm, 
    genericForm: genericForm, 
    eqForm: eqForm, 
    ordForm: ordForm, 
    showForm: showForm, 
    monoidForm: monoidForm
};
