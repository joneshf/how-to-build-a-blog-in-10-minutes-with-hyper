// Generated by purs version 0.11.4
"use strict";
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Either = require("../Data.Either");
var Data_Function = require("../Data.Function");
var Data_Lens_Internal_Wander = require("../Data.Lens.Internal.Wander");
var Data_Newtype = require("../Data.Newtype");
var Data_Profunctor = require("../Data.Profunctor");
var Data_Profunctor_Choice = require("../Data.Profunctor.Choice");
var Data_Profunctor_Strong = require("../Data.Profunctor.Strong");
var Data_Tuple = require("../Data.Tuple");
var Prelude = require("../Prelude");
var Indexed = function (x) {
    return x;
};
var profunctorIndexed = function (dictProfunctor) {
    return new Data_Profunctor.Profunctor(function (f) {
        return function (g) {
            return function (v) {
                return Data_Profunctor.dimap(dictProfunctor)(Data_Profunctor_Strong.second(Data_Profunctor_Strong.strongFn)(f))(g)(v);
            };
        };
    });
};
var strongIndexed = function (dictStrong) {
    return new Data_Profunctor_Strong.Strong(function () {
        return profunctorIndexed(dictStrong.Profunctor0());
    }, function (v) {
        return Indexed(Data_Profunctor.lmap(dictStrong.Profunctor0())(function (v1) {
            return new Data_Tuple.Tuple(new Data_Tuple.Tuple(v1.value0, v1.value1.value0), v1.value1.value1);
        })(Data_Profunctor_Strong.first(dictStrong)(v)));
    }, function (v) {
        return Indexed(Data_Profunctor.lmap(dictStrong.Profunctor0())(function (v1) {
            return new Data_Tuple.Tuple(v1.value1.value0, new Data_Tuple.Tuple(v1.value0, v1.value1.value1));
        })(Data_Profunctor_Strong.second(dictStrong)(v)));
    });
};
var newtypeIndexed = new Data_Newtype.Newtype(function (n) {
    return n;
}, Indexed);
var choiceIndexed = function (dictChoice) {
    return new Data_Profunctor_Choice.Choice(function () {
        return profunctorIndexed(dictChoice.Profunctor0());
    }, function (v) {
        return Indexed(Data_Profunctor.lmap(dictChoice.Profunctor0())(function (v1) {
            return Data_Either.either(function ($47) {
                return Data_Either.Left.create(Data_Tuple.Tuple.create(v1.value0)($47));
            })(Data_Either.Right.create)(v1.value1);
        })(Data_Profunctor_Choice.left(dictChoice)(v)));
    }, function (v) {
        return Indexed(Data_Profunctor.lmap(dictChoice.Profunctor0())(function (v1) {
            return Data_Either.either(Data_Either.Left.create)(function ($48) {
                return Data_Either.Right.create(Data_Tuple.Tuple.create(v1.value0)($48));
            })(v1.value1);
        })(Data_Profunctor_Choice.right(dictChoice)(v)));
    });
};
var wanderIndexed = function (dictWander) {
    return new Data_Lens_Internal_Wander.Wander(function () {
        return choiceIndexed(dictWander.Choice1());
    }, function () {
        return strongIndexed(dictWander.Strong0());
    }, function (trav) {
        return function (v) {
            return Indexed(Data_Lens_Internal_Wander.wander(dictWander)(function (dictApplicative) {
                return function (ia2fb) {
                    return function (v1) {
                        return trav(dictApplicative)(function ($49) {
                            return ia2fb(Data_Tuple.Tuple.create(v1.value0)($49));
                        })(v1.value1);
                    };
                };
            })(v));
        };
    });
};
module.exports = {
    Indexed: Indexed, 
    newtypeIndexed: newtypeIndexed, 
    profunctorIndexed: profunctorIndexed, 
    strongIndexed: strongIndexed, 
    choiceIndexed: choiceIndexed, 
    wanderIndexed: wanderIndexed
};
