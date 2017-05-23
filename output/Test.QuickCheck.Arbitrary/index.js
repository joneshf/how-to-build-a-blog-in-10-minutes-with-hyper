// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Category = require("../Control.Category");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Char = require("../Data.Char");
var Data_Either = require("../Data.Either");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Identity = require("../Data.Identity");
var Data_Int = require("../Data.Int");
var Data_Lazy = require("../Data.Lazy");
var Data_List = require("../Data.List");
var Data_List_NonEmpty = require("../Data.List.NonEmpty");
var Data_List_Types = require("../Data.List.Types");
var Data_Maybe = require("../Data.Maybe");
var Data_Newtype = require("../Data.Newtype");
var Data_NonEmpty = require("../Data.NonEmpty");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Ring = require("../Data.Ring");
var Data_Semiring = require("../Data.Semiring");
var Data_String = require("../Data.String");
var Data_Tuple = require("../Data.Tuple");
var Data_Unit = require("../Data.Unit");
var Prelude = require("../Prelude");
var Test_QuickCheck_Gen = require("../Test.QuickCheck.Gen");
var Arbitrary = function (arbitrary) {
    this.arbitrary = arbitrary;
};
var Coarbitrary = function (coarbitrary) {
    this.coarbitrary = coarbitrary;
};
var coarbitrary = function (dict) {
    return dict.coarbitrary;
};
var coarbUnit = new Coarbitrary(function (v) {
    return Test_QuickCheck_Gen.perturbGen(1.0);
});
var coarbTuple = function (dictCoarbitrary) {
    return function (dictCoarbitrary1) {
        return new Coarbitrary(function (v) {
            return function ($62) {
                return coarbitrary(dictCoarbitrary1)(v.value1)(coarbitrary(dictCoarbitrary)(v.value0)($62));
            };
        });
    };
};
var coarbOrdering = new Coarbitrary(function (v) {
    if (v instanceof Data_Ordering.LT) {
        return Test_QuickCheck_Gen.perturbGen(1.0);
    };
    if (v instanceof Data_Ordering.EQ) {
        return Test_QuickCheck_Gen.perturbGen(2.0);
    };
    if (v instanceof Data_Ordering.GT) {
        return Test_QuickCheck_Gen.perturbGen(3.0);
    };
    throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary line 89, column 3 - line 90, column 3: " + [ v.constructor.name ]);
});
var coarbNumber = new Coarbitrary(Test_QuickCheck_Gen.perturbGen);
var coarbNonEmpty = function (dictCoarbitrary) {
    return function (dictCoarbitrary1) {
        return new Coarbitrary(function (v) {
            return function ($63) {
                return coarbitrary(dictCoarbitrary)(v.value1)(coarbitrary(dictCoarbitrary1)(v.value0)($63));
            };
        });
    };
};
var coarbMaybe = function (dictCoarbitrary) {
    return new Coarbitrary(function (v) {
        if (v instanceof Data_Maybe.Nothing) {
            return Test_QuickCheck_Gen.perturbGen(1.0);
        };
        if (v instanceof Data_Maybe.Just) {
            return coarbitrary(dictCoarbitrary)(v.value0);
        };
        throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary line 119, column 3 - line 120, column 3: " + [ v.constructor.name ]);
    });
};
var coarbList = function (dictCoarbitrary) {
    return new Coarbitrary(Data_Foldable.foldl(Data_List_Types.foldableList)(function (f) {
        return function (x) {
            return function ($64) {
                return f(coarbitrary(dictCoarbitrary)(x)($64));
            };
        };
    })(Control_Category.id(Control_Category.categoryFn)));
};
var coarbNonEmptyList = function (dictCoarbitrary) {
    return new Coarbitrary(function (v) {
        return coarbitrary(coarbNonEmpty(coarbList(dictCoarbitrary))(dictCoarbitrary))(v);
    });
};
var coarbLazy = function (dictCoarbitrary) {
    return new Coarbitrary(function (a) {
        return coarbitrary(dictCoarbitrary)(Data_Lazy.force(a));
    });
};
var coarbInt = new Coarbitrary(function ($65) {
    return Test_QuickCheck_Gen.perturbGen(Data_Int.toNumber($65));
});
var coarbIdentity = function (dictCoarbitrary) {
    return new Coarbitrary(function (v) {
        return coarbitrary(dictCoarbitrary)(v);
    });
};
var coarbEither = function (dictCoarbitrary) {
    return function (dictCoarbitrary1) {
        return new Coarbitrary(function (v) {
            if (v instanceof Data_Either.Left) {
                return coarbitrary(dictCoarbitrary)(v.value0);
            };
            if (v instanceof Data_Either.Right) {
                return coarbitrary(dictCoarbitrary1)(v.value0);
            };
            throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary line 128, column 3 - line 128, column 40: " + [ v.constructor.name ]);
        });
    };
};
var coarbChar = new Coarbitrary(function (c) {
    return coarbitrary(coarbInt)(Data_Char.toCharCode(c));
});
var coarbBoolean = new Coarbitrary(function (v) {
    if (v) {
        return Test_QuickCheck_Gen.perturbGen(1.0);
    };
    if (!v) {
        return Test_QuickCheck_Gen.perturbGen(2.0);
    };
    throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary line 52, column 3 - line 53, column 3: " + [ v.constructor.name ]);
});
var coarbArray = function (dictCoarbitrary) {
    return new Coarbitrary(Data_Foldable.foldl(Data_Foldable.foldableArray)(function (f) {
        return function (x) {
            return function ($66) {
                return f(coarbitrary(dictCoarbitrary)(x)($66));
            };
        };
    })(Control_Category.id(Control_Category.categoryFn)));
};
var coarbString = new Coarbitrary(function (s) {
    return coarbitrary(coarbArray(coarbMaybe(coarbInt)))(Data_Functor.map(Data_Functor.functorArray)(Data_String.charCodeAt(0))(Data_String.split(Data_Newtype.wrap(Data_String.newtypePattern)(""))(s)));
});
var arbitrary = function (dict) {
    return dict.arbitrary;
};
var arbitraryIdentity = function (dictArbitrary) {
    return new Arbitrary(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Identity.Identity)(arbitrary(dictArbitrary)));
};
var arbitraryLazy = function (dictArbitrary) {
    return new Arbitrary(Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(arbitrary(dictArbitrary))(function ($67) {
        return Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(Data_Lazy.defer(Data_Function["const"]($67)));
    }));
};
var arbitraryList = function (dictArbitrary) {
    return new Arbitrary(Test_QuickCheck_Gen.sized(function (n) {
        return Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(Test_QuickCheck_Gen.chooseInt(0)(n))(Data_Function.flip(Test_QuickCheck_Gen.listOf)(arbitrary(dictArbitrary)));
    }));
};
var arbUnit = new Arbitrary(Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(Data_Unit.unit));
var arbTuple = function (dictArbitrary) {
    return function (dictArbitrary1) {
        return new Arbitrary(Control_Apply.apply(Test_QuickCheck_Gen.applyGen)(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Tuple.Tuple.create)(arbitrary(dictArbitrary)))(arbitrary(dictArbitrary1)));
    };
};
var arbOrdering = new Arbitrary(Test_QuickCheck_Gen.oneOf(new Data_NonEmpty.NonEmpty(Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(Data_Ordering.LT.value), [ Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(Data_Ordering.EQ.value), Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(Data_Ordering.GT.value) ])));
var arbNumber = new Arbitrary(Test_QuickCheck_Gen.uniform);
var arbNonEmpty = function (dictArbitrary) {
    return function (dictArbitrary1) {
        return new Arbitrary(Control_Apply.apply(Test_QuickCheck_Gen.applyGen)(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_NonEmpty.NonEmpty.create)(arbitrary(dictArbitrary1)))(arbitrary(dictArbitrary)));
    };
};
var arbNonEmptyList = function (dictArbitrary) {
    return new Arbitrary(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_List_Types.NonEmptyList)(arbitrary(arbNonEmpty(arbitraryList(dictArbitrary))(dictArbitrary))));
};
var arbInt = new Arbitrary(Test_QuickCheck_Gen.chooseInt(-1000000 | 0)(1000000));
var arbFunction = function (dictCoarbitrary) {
    return function (dictArbitrary) {
        return new Arbitrary(Test_QuickCheck_Gen.repeatable(function (a) {
            return coarbitrary(dictCoarbitrary)(a)(arbitrary(dictArbitrary));
        }));
    };
};
var arbChar = new Arbitrary(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Char.fromCharCode)(Test_QuickCheck_Gen.chooseInt(0)(65536)));
var arbBoolean = new Arbitrary(Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(Test_QuickCheck_Gen.uniform)(function (v) {
    return Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(v * 2.0 < 1.0);
}));
var arbEither = function (dictArbitrary) {
    return function (dictArbitrary1) {
        return new Arbitrary(Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(arbitrary(arbBoolean))(function (v) {
            if (v) {
                return Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Either.Left.create)(arbitrary(dictArbitrary));
            };
            return Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Either.Right.create)(arbitrary(dictArbitrary1));
        }));
    };
};
var arbMaybe = function (dictArbitrary) {
    return new Arbitrary(Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(arbitrary(arbBoolean))(function (v) {
        if (v) {
            return Control_Applicative.pure(Test_QuickCheck_Gen.applicativeGen)(Data_Maybe.Nothing.value);
        };
        return Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Maybe.Just.create)(arbitrary(dictArbitrary));
    }));
};
var arbArray = function (dictArbitrary) {
    return new Arbitrary(Test_QuickCheck_Gen.arrayOf(arbitrary(dictArbitrary)));
};
var arbString = new Arbitrary(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_String.fromCharArray)(arbitrary(arbArray(arbChar))));
var coarbFunction = function (dictArbitrary) {
    return function (dictCoarbitrary) {
        return new Coarbitrary(function (f) {
            return function (gen) {
                return Control_Bind.bind(Test_QuickCheck_Gen.bindGen)(arbitrary(arbArray(dictArbitrary)))(function (v) {
                    return coarbitrary(coarbArray(dictCoarbitrary))(Data_Functor.map(Data_Functor.functorArray)(f)(v))(gen);
                });
            };
        });
    };
};
module.exports = {
    Arbitrary: Arbitrary, 
    Coarbitrary: Coarbitrary, 
    arbitrary: arbitrary, 
    coarbitrary: coarbitrary, 
    arbBoolean: arbBoolean, 
    coarbBoolean: coarbBoolean, 
    arbNumber: arbNumber, 
    coarbNumber: coarbNumber, 
    arbInt: arbInt, 
    coarbInt: coarbInt, 
    arbString: arbString, 
    coarbString: coarbString, 
    arbChar: arbChar, 
    coarbChar: coarbChar, 
    arbUnit: arbUnit, 
    coarbUnit: coarbUnit, 
    arbOrdering: arbOrdering, 
    coarbOrdering: coarbOrdering, 
    arbArray: arbArray, 
    coarbArray: coarbArray, 
    arbFunction: arbFunction, 
    coarbFunction: coarbFunction, 
    arbTuple: arbTuple, 
    coarbTuple: coarbTuple, 
    arbMaybe: arbMaybe, 
    coarbMaybe: coarbMaybe, 
    arbEither: arbEither, 
    coarbEither: coarbEither, 
    arbitraryList: arbitraryList, 
    coarbList: coarbList, 
    arbitraryIdentity: arbitraryIdentity, 
    coarbIdentity: coarbIdentity, 
    arbitraryLazy: arbitraryLazy, 
    coarbLazy: coarbLazy, 
    arbNonEmpty: arbNonEmpty, 
    coarbNonEmpty: coarbNonEmpty, 
    arbNonEmptyList: arbNonEmptyList, 
    coarbNonEmptyList: coarbNonEmptyList
};