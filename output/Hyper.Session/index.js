// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_IxMonad = require("../Control.IxMonad");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Boolean = require("../Data.Boolean");
var Data_Either = require("../Data.Either");
var Data_Eq = require("../Data.Eq");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Maybe = require("../Data.Maybe");
var Data_Newtype = require("../Data.Newtype");
var Data_NonEmpty = require("../Data.NonEmpty");
var Data_Ord = require("../Data.Ord");
var Data_StrMap = require("../Data.StrMap");
var Data_Unit = require("../Data.Unit");
var Hyper_Conn = require("../Hyper.Conn");
var Hyper_Cookies = require("../Hyper.Cookies");
var Hyper_Middleware = require("../Hyper.Middleware");
var Hyper_Middleware_Class = require("../Hyper.Middleware.Class");
var Hyper_Response = require("../Hyper.Response");
var Prelude = require("../Prelude");
var SessionID = function (x) {
    return x;
};
var SessionStore = function ($$delete, get, newSessionID, put) {
    this["delete"] = $$delete;
    this.get = get;
    this.newSessionID = newSessionID;
    this.put = put;
};
var put = function (dict) {
    return dict.put;
};
var newtypeSessionID = new Data_Newtype.Newtype(function (n) {
    return n;
}, SessionID);
var newSessionID = function (dict) {
    return dict.newSessionID;
};
var get = function (dict) {
    return dict.get;
};
var eqSessionID = new Data_Eq.Eq(function (x) {
    return function (y) {
        return x === y;
    };
});
var ordSessionID = new Data_Ord.Ord(function () {
    return eqSessionID;
}, function (x) {
    return function (y) {
        return Data_Ord.compare(Data_Ord.ordString)(x)(y);
    };
});
var $$delete = function (dict) {
    return dict["delete"];
};
var currentSessionID = function (dictMonad) {
    return function (dictSessionStore) {
        return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Middleware_Class.getConn(Hyper_Middleware.ixMonadMiddlewareMiddleware(dictMonad.Applicative0())))(function (conn) {
            if (conn.components.cookies instanceof Data_Either.Left) {
                return Control_IxMonad.ipure(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Data_Maybe.Nothing.value);
            };
            if (conn.components.cookies instanceof Data_Either.Right) {
                return Control_Applicative.pure(Hyper_Middleware.applicativeMiddleware(dictMonad))(Data_Functor.map(Data_Maybe.functorMaybe)(function ($44) {
                    return SessionID(Data_NonEmpty.head($44));
                })(Data_StrMap.lookup(conn.components.sessions.key)(conn.components.cookies.value0)));
            };
            throw new Error("Failed pattern match at Hyper.Session line 65, column 3 - line 71, column 13: " + [ conn.components.cookies.constructor.name ]);
        });
    };
};
var deleteSession = function (dictMonad) {
    return function (dictResponse) {
        return function (dictSessionStore) {
            return Control_Bind.bind(Hyper_Middleware.bindMiddleware(dictMonad))(Hyper_Middleware_Class.getConn(Hyper_Middleware.ixMonadMiddlewareMiddleware(dictMonad.Applicative0())))(function (v) {
                return Control_Bind.bind(Hyper_Middleware.bindMiddleware(dictMonad))(Data_Functor.map(Hyper_Middleware.functorMiddleware(dictMonad))(Data_Maybe.maybe(Control_IxMonad.ipure(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Data_Unit.unit))(function ($45) {
                    return Hyper_Middleware["lift'"](dictMonad)($$delete(dictSessionStore)(v.components.sessions.store)($45));
                }))(currentSessionID(dictMonad)(dictSessionStore)))(function (v1) {
                    return Hyper_Cookies.setCookie(dictMonad)(dictResponse)(v.components.sessions.key)("");
                });
            });
        };
    };
};
var getSession = function (dictMonad) {
    return function (dictSessionStore) {
        return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Middleware_Class.getConn(Hyper_Middleware.ixMonadMiddlewareMiddleware(dictMonad.Applicative0())))(function (v) {
            return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(currentSessionID(dictMonad)(dictSessionStore))(function (v1) {
                if (v1 instanceof Data_Maybe.Just) {
                    return Hyper_Middleware["lift'"](dictMonad)(get(dictSessionStore)(v.components.sessions.store)(v1.value0));
                };
                if (v1 instanceof Data_Maybe.Nothing) {
                    return Control_IxMonad.ipure(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Data_Maybe.Nothing.value);
                };
                throw new Error("Failed pattern match at Hyper.Session line 97, column 3 - line 99, column 29: " + [ v1.constructor.name ]);
            });
        });
    };
};
var saveSession = function (dictMonad) {
    return function (dictResponse) {
        return function (dictSessionStore) {
            return function (session) {
                return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Middleware_Class.getConn(Hyper_Middleware.ixMonadMiddlewareMiddleware(dictMonad.Applicative0())))(function (v) {
                    return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(currentSessionID(dictMonad)(dictSessionStore))(function (v1) {
                        if (v1 instanceof Data_Maybe.Just) {
                            if (Data_Newtype.unwrap(newtypeSessionID)(v1.value0) !== "") {
                                return Control_IxMonad.ipure(Hyper_Middleware.ixMonadMiddleware(dictMonad))(v1.value0);
                            };
                            if (Data_Boolean.otherwise) {
                                return Hyper_Middleware["lift'"](dictMonad)(newSessionID(dictSessionStore)(v.components.sessions.store));
                            };
                        };
                        if (v1 instanceof Data_Maybe.Nothing) {
                            return Hyper_Middleware["lift'"](dictMonad)(newSessionID(dictSessionStore)(v.components.sessions.store));
                        };
                        throw new Error("Failed pattern match at Hyper.Session line 123, column 5 - line 127, column 69: " + [ v1.constructor.name ]);
                    }))(function (v1) {
                        return Control_Bind.discard(Control_Bind.discardUnit)(Hyper_Middleware.bindMiddleware(dictMonad))(Hyper_Middleware["lift'"](dictMonad)(put(dictSessionStore)(v.components.sessions.store)(v1)(session)))(function () {
                            return Hyper_Cookies.setCookie(dictMonad)(dictResponse)(v.components.sessions.key)(Data_Newtype.unwrap(newtypeSessionID)(v1));
                        });
                    });
                });
            };
        };
    };
};
module.exports = {
    SessionID: SessionID, 
    SessionStore: SessionStore, 
    "delete": $$delete, 
    deleteSession: deleteSession, 
    get: get, 
    getSession: getSession, 
    newSessionID: newSessionID, 
    put: put, 
    saveSession: saveSession, 
    eqSessionID: eqSessionID, 
    ordSessionID: ordSessionID, 
    newtypeSessionID: newtypeSessionID
};