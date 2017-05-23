// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class");
var Control_Monad_ST = require("../Control.Monad.ST");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Array = require("../Data.Array");
var Data_Array_ST = require("../Data.Array.ST");
var Data_Eq = require("../Data.Eq");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_List = require("../Data.List");
var Data_List_Types = require("../Data.List.Types");
var Data_Map = require("../Data.Map");
var Data_Monoid = require("../Data.Monoid");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Show = require("../Data.Show");
var Data_Unfoldable = require("../Data.Unfoldable");
var Data_Unit = require("../Data.Unit");
var Partial_Unsafe = require("../Partial.Unsafe");
var Prelude = require("../Prelude");
var $$Set = (function () {
    function $$Set(value0) {
        this.value0 = value0;
    };
    $$Set.create = function (value0) {
        return new $$Set(value0);
    };
    return $$Set;
})();
var union = function (dictOrd) {
    return function (v) {
        return function (v1) {
            return new $$Set(Data_Map.union(dictOrd)(v.value0)(v1.value0));
        };
    };
};
var toList = function (v) {
    return Data_Map.keys(v.value0);
};
var toUnfoldable = function (dictUnfoldable) {
    return function ($62) {
        return Data_List.toUnfoldable(dictUnfoldable)(toList($62));
    };
};
var size = function (v) {
    return Data_Map.size(v.value0);
};
var singleton = function (a) {
    return new $$Set(Data_Map.singleton(a)(Data_Unit.unit));
};
var showSet = function (dictShow) {
    return new Data_Show.Show(function (s) {
        return "(fromFoldable " + (Data_Show.show(Data_List_Types.showList(dictShow))(toList(s)) + ")");
    });
};
var semigroupSet = function (dictOrd) {
    return new Data_Semigroup.Semigroup(union(dictOrd));
};
var member = function (dictOrd) {
    return function (a) {
        return function (v) {
            return Data_Map.member(dictOrd)(a)(v.value0);
        };
    };
};
var isEmpty = function (v) {
    return Data_Map.isEmpty(v.value0);
};
var insert = function (dictOrd) {
    return function (a) {
        return function (v) {
            return new $$Set(Data_Map.insert(dictOrd)(a)(Data_Unit.unit)(v.value0));
        };
    };
};
var foldableSet = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return function ($63) {
            return Data_Foldable.foldMap(Data_List_Types.foldableList)(dictMonoid)(f)(toList($63));
        };
    };
}, function (f) {
    return function (x) {
        return function ($64) {
            return Data_Foldable.foldl(Data_List_Types.foldableList)(f)(x)(toList($64));
        };
    };
}, function (f) {
    return function (x) {
        return function ($65) {
            return Data_Foldable.foldr(Data_List_Types.foldableList)(f)(x)(toList($65));
        };
    };
});
var eqSet = function (dictEq) {
    return new Data_Eq.Eq(function (v) {
        return function (v1) {
            return Data_Eq.eq(Data_Map.eqMap(dictEq)(Data_Eq.eqUnit))(v.value0)(v1.value0);
        };
    });
};
var ordSet = function (dictOrd) {
    return new Data_Ord.Ord(function () {
        return eqSet(dictOrd.Eq0());
    }, function (s1) {
        return function (s2) {
            return Data_Ord.compare(Data_List_Types.ordList(dictOrd))(toList(s1))(toList(s2));
        };
    });
};
var eq1Set = new Data_Eq.Eq1(function (dictEq) {
    return Data_Eq.eq(eqSet(dictEq));
});
var empty = new $$Set(Data_Map.empty);
var fromFoldable = function (dictFoldable) {
    return function (dictOrd) {
        return Data_Foldable.foldl(dictFoldable)(function (m) {
            return function (a) {
                return insert(dictOrd)(a)(m);
            };
        })(empty);
    };
};
var intersection = function (dictOrd) {
    return function (s1) {
        return function (s2) {
            var toArray = function ($66) {
                return Data_Array.fromFoldable(Data_List_Types.foldableList)(toList($66));
            };
            var rs = toArray(s2);
            var rl = Data_Array.length(rs);
            var ls = toArray(s1);
            var ll = Data_Array.length(ls);
            var intersect = function (acc) {
                var go = function (l) {
                    return function (r) {
                        var $55 = l < ll && r < rl;
                        if ($55) {
                            var v = Data_Ord.compare(dictOrd)(ls[l])(rs[r]);
                            if (v instanceof Data_Ordering.EQ) {
                                return function __do() {
                                    var v1 = Data_Array_ST.pushSTArray(acc)(ls[l])();
                                    return new Control_Monad_Rec_Class.Loop({
                                        a: l + 1 | 0, 
                                        b: r + 1 | 0
                                    });
                                };
                            };
                            if (v instanceof Data_Ordering.LT) {
                                return Control_Applicative.pure(Control_Monad_Eff.applicativeEff)(new Control_Monad_Rec_Class.Loop({
                                    a: l + 1 | 0, 
                                    b: r
                                }));
                            };
                            if (v instanceof Data_Ordering.GT) {
                                return Control_Applicative.pure(Control_Monad_Eff.applicativeEff)(new Control_Monad_Rec_Class.Loop({
                                    a: l, 
                                    b: r + 1 | 0
                                }));
                            };
                            throw new Error("Failed pattern match at Data.Set line 162, column 12 - line 167, column 43: " + [ v.constructor.name ]);
                        };
                        return Control_Applicative.pure(Control_Monad_Eff.applicativeEff)(new Control_Monad_Rec_Class.Done(acc));
                    };
                };
                return Control_Monad_Rec_Class.tailRecM2(Control_Monad_Rec_Class.monadRecEff)(go)(0)(0);
            };
            return fromFoldable(Data_Foldable.foldableArray)(dictOrd)(Control_Monad_Eff.runPure(Data_Array_ST.runSTArray(Control_Bind.bind(Control_Monad_Eff.bindEff)(Data_Array_ST.emptySTArray)(intersect))));
        };
    };
};
var map = function (dictOrd) {
    return function (f) {
        return Data_Foldable.foldl(foldableSet)(function (m) {
            return function (a) {
                return insert(dictOrd)(f(a))(m);
            };
        })(empty);
    };
};
var monoidSet = function (dictOrd) {
    return new Data_Monoid.Monoid(function () {
        return semigroupSet(dictOrd);
    }, empty);
};
var unions = function (dictFoldable) {
    return function (dictOrd) {
        return Data_Foldable.foldl(dictFoldable)(union(dictOrd))(empty);
    };
};
var $$delete = function (dictOrd) {
    return function (a) {
        return function (v) {
            return new $$Set(Data_Map["delete"](dictOrd)(a)(v.value0));
        };
    };
};
var difference = function (dictOrd) {
    return function (s1) {
        return function (s2) {
            return Data_Foldable.foldl(Data_List_Types.foldableList)(Data_Function.flip($$delete(dictOrd)))(s1)(toList(s2));
        };
    };
};
var subset = function (dictOrd) {
    return function (s1) {
        return function (s2) {
            return isEmpty(difference(dictOrd)(s1)(s2));
        };
    };
};
var properSubset = function (dictOrd) {
    return function (s1) {
        return function (s2) {
            return subset(dictOrd)(s1)(s2) && Data_Eq.notEq(eqSet(dictOrd.Eq0()))(s1)(s2);
        };
    };
};
var checkValid = function (v) {
    return Data_Map.checkValid(v.value0);
};
module.exports = {
    checkValid: checkValid, 
    "delete": $$delete, 
    difference: difference, 
    empty: empty, 
    fromFoldable: fromFoldable, 
    insert: insert, 
    intersection: intersection, 
    isEmpty: isEmpty, 
    map: map, 
    member: member, 
    properSubset: properSubset, 
    singleton: singleton, 
    size: size, 
    subset: subset, 
    toUnfoldable: toUnfoldable, 
    union: union, 
    unions: unions, 
    eqSet: eqSet, 
    eq1Set: eq1Set, 
    showSet: showSet, 
    ordSet: ordSet, 
    monoidSet: monoidSet, 
    semigroupSet: semigroupSet, 
    foldableSet: foldableSet
};