// Generated by purs version 0.11.4
"use strict";
var Control_Category = require("../Control.Category");
var Data_Function = require("../Data.Function");
var Prelude = require("../Prelude");
var IxMonad = function (ibind, ipure) {
    this.ibind = ibind;
    this.ipure = ipure;
};
var ipure = function (dict) {
    return dict.ipure;
};
var ibind = function (dict) {
    return dict.ibind;
};
var ibindFlipped = function (dictIxMonad) {
    return Data_Function.flip(ibind(dictIxMonad));
};
var ijoin = function (dictIxMonad) {
    return function (m) {
        return ibind(dictIxMonad)(m)(Control_Category.id(Control_Category.categoryFn));
    };
};
var iapplySecond = function (dictIxMonad) {
    return function (x) {
        return function (y) {
            return ibind(dictIxMonad)(x)(Data_Function["const"](y));
        };
    };
};
var iapplyFirst = function (dictIxMonad) {
    return function (x) {
        return function (y) {
            return ibind(dictIxMonad)(x)(function (v) {
                return ibind(dictIxMonad)(y)(function (v1) {
                    return ipure(dictIxMonad)(v);
                });
            });
        };
    };
};
var composeiKleisliFlipped = function (dictIxMonad) {
    return function (f) {
        return function (g) {
            return function (a) {
                return ibindFlipped(dictIxMonad)(f)(g(a));
            };
        };
    };
};
var composeiKleisli = function (dictIxMonad) {
    return function (f) {
        return function (g) {
            return function (a) {
                return ibind(dictIxMonad)(f(a))(g);
            };
        };
    };
};
module.exports = {
    IxMonad: IxMonad, 
    composeiKleisli: composeiKleisli, 
    composeiKleisliFlipped: composeiKleisliFlipped, 
    iapplyFirst: iapplyFirst, 
    iapplySecond: iapplySecond, 
    ibind: ibind, 
    ibindFlipped: ibindFlipped, 
    ijoin: ijoin, 
    ipure: ipure
};
