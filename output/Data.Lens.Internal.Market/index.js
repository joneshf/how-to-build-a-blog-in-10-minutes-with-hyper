// Generated by purs version 0.11.4
"use strict";
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Bifunctor = require("../Data.Bifunctor");
var Data_Either = require("../Data.Either");
var Data_Functor = require("../Data.Functor");
var Data_Profunctor = require("../Data.Profunctor");
var Data_Profunctor_Choice = require("../Data.Profunctor.Choice");
var Prelude = require("../Prelude");
var Market = (function () {
    function Market(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Market.create = function (value0) {
        return function (value1) {
            return new Market(value0, value1);
        };
    };
    return Market;
})();
var profunctorMarket = new Data_Profunctor.Profunctor(function (f) {
    return function (g) {
        return function (v) {
            return new Market(function ($19) {
                return g(v.value0($19));
            }, function ($20) {
                return Data_Bifunctor.lmap(Data_Either.bifunctorEither)(g)(v.value1(f($20)));
            });
        };
    };
});
var functorMarket = new Data_Functor.Functor(function (f) {
    return function (v) {
        return new Market(function ($21) {
            return f(v.value0($21));
        }, function ($22) {
            return Data_Bifunctor.lmap(Data_Either.bifunctorEither)(f)(v.value1($22));
        });
    };
});
var choiceMarket = new Data_Profunctor_Choice.Choice(function () {
    return profunctorMarket;
}, function (v) {
    return new Market(function ($23) {
        return Data_Either.Left.create(v.value0($23));
    }, Data_Either.either(function ($24) {
        return Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Data_Either.Left.create)(v.value1($24));
    })(function ($25) {
        return Data_Either.Left.create(Data_Either.Right.create($25));
    }));
}, function (v) {
    return new Market(function ($26) {
        return Data_Either.Right.create(v.value0($26));
    }, Data_Either.either(function ($27) {
        return Data_Either.Left.create(Data_Either.Left.create($27));
    })(function ($28) {
        return Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Data_Either.Right.create)(v.value1($28));
    }));
});
module.exports = {
    Market: Market, 
    functorMarket: functorMarket, 
    profunctorMarket: profunctorMarket, 
    choiceMarket: choiceMarket
};
