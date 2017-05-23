// Generated by purs version 0.11.4
"use strict";
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Profunctor = require("../Data.Profunctor");
var Data_Profunctor_Choice = require("../Data.Profunctor.Choice");
var Data_Profunctor_Cochoice = require("../Data.Profunctor.Cochoice");
var Data_Profunctor_Costrong = require("../Data.Profunctor.Costrong");
var Data_Profunctor_Strong = require("../Data.Profunctor.Strong");
var Prelude = require("../Prelude");
var Re = function (x) {
    return x;
};
var profunctorRe = function (dictProfunctor) {
    return new Data_Profunctor.Profunctor(function (f) {
        return function (g) {
            return function (v) {
                return function ($28) {
                    return v(Data_Profunctor.dimap(dictProfunctor)(g)(f)($28));
                };
            };
        };
    });
};
var strongRe = function (dictStrong) {
    return new Data_Profunctor_Costrong.Costrong(function () {
        return profunctorRe(dictStrong.Profunctor0());
    }, function (v) {
        return function ($29) {
            return v(Data_Profunctor_Strong.first(dictStrong)($29));
        };
    }, function (v) {
        return function ($30) {
            return v(Data_Profunctor_Strong.second(dictStrong)($30));
        };
    });
};
var newtypeRe = new Data_Newtype.Newtype(function (n) {
    return n;
}, Re);
var costrongRe = function (dictCostrong) {
    return new Data_Profunctor_Strong.Strong(function () {
        return profunctorRe(dictCostrong.Profunctor0());
    }, function (v) {
        return function ($31) {
            return v(Data_Profunctor_Costrong.unfirst(dictCostrong)($31));
        };
    }, function (v) {
        return function ($32) {
            return v(Data_Profunctor_Costrong.unsecond(dictCostrong)($32));
        };
    });
};
var cochoiceRe = function (dictCochoice) {
    return new Data_Profunctor_Choice.Choice(function () {
        return profunctorRe(dictCochoice.Profunctor0());
    }, function (v) {
        return function ($33) {
            return v(Data_Profunctor_Cochoice.unleft(dictCochoice)($33));
        };
    }, function (v) {
        return function ($34) {
            return v(Data_Profunctor_Cochoice.unright(dictCochoice)($34));
        };
    });
};
var choiceRe = function (dictChoice) {
    return new Data_Profunctor_Cochoice.Cochoice(function () {
        return profunctorRe(dictChoice.Profunctor0());
    }, function (v) {
        return function ($35) {
            return v(Data_Profunctor_Choice.left(dictChoice)($35));
        };
    }, function (v) {
        return function ($36) {
            return v(Data_Profunctor_Choice.right(dictChoice)($36));
        };
    });
};
module.exports = {
    Re: Re, 
    newtypeRe: newtypeRe, 
    profunctorRe: profunctorRe, 
    choiceRe: choiceRe, 
    cochoiceRe: cochoiceRe, 
    strongRe: strongRe, 
    costrongRe: costrongRe
};
