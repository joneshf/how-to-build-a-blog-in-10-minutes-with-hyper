// Generated by purs version 0.11.4
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Array = require("../Data.Array");
var Data_Eq = require("../Data.Eq");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Identity = require("../Data.Identity");
var Data_Lens_Internal_Wander = require("../Data.Lens.Internal.Wander");
var Data_Lens_Types = require("../Data.Lens.Types");
var Data_Map = require("../Data.Map");
var Data_Maybe = require("../Data.Maybe");
var Data_Set = require("../Data.Set");
var Data_StrMap = require("../Data.StrMap");
var Data_Traversable = require("../Data.Traversable");
var Prelude = require("../Prelude");
var Index = function (ix) {
    this.ix = ix;
};
var ix = function (dict) {
    return dict.ix;
};
var indexStrMap = new Index(function (k) {
    return function (dictWander) {
        return Data_Lens_Internal_Wander.wander(dictWander)(function (dictApplicative) {
            return function (coalg) {
                return function (m) {
                    return Data_Maybe.maybe(Control_Applicative.pure(dictApplicative)(m))(function ($20) {
                        return Data_Functor.map((dictApplicative.Apply0()).Functor0())(function (v) {
                            return Data_StrMap.insert(k)(v)(m);
                        })(coalg($20));
                    })(Data_StrMap.lookup(k)(m));
                };
            };
        });
    };
});
var indexSet = function (dictOrd) {
    return new Index(function (x) {
        return function (dictWander) {
            return Data_Lens_Internal_Wander.wander(dictWander)(function (dictApplicative) {
                return function (coalg) {
                    return function ($21) {
                        return Control_Applicative.pure(dictApplicative)(Data_Set.insert(dictOrd)(x)($21));
                    };
                };
            });
        };
    });
};
var indexMaybe = new Index(function (v) {
    return function (dictWander) {
        return Data_Lens_Internal_Wander.wander(dictWander)(function (dictApplicative) {
            return Data_Traversable.traverse(Data_Traversable.traversableMaybe)(dictApplicative);
        });
    };
});
var indexMap = function (dictOrd) {
    return new Index(function (k) {
        return function (dictWander) {
            return Data_Lens_Internal_Wander.wander(dictWander)(function (dictApplicative) {
                return function (coalg) {
                    return function (m) {
                        return Data_Maybe.maybe(Control_Applicative.pure(dictApplicative)(m))(function ($22) {
                            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(function (v) {
                                return Data_Map.insert(dictOrd)(k)(v)(m);
                            })(coalg($22));
                        })(Data_Map.lookup(dictOrd)(k)(m));
                    };
                };
            });
        };
    });
};
var indexIdentity = new Index(function (v) {
    return function (dictWander) {
        return Data_Lens_Internal_Wander.wander(dictWander)(function (dictApplicative) {
            return Data_Traversable.traverse(Data_Identity.traversableIdentity)(dictApplicative);
        });
    };
});
var indexArray = new Index(function (n) {
    return function (dictWander) {
        return Data_Lens_Internal_Wander.wander(dictWander)(function (dictApplicative) {
            return function (coalg) {
                return function (xs) {
                    return Data_Maybe.maybe(Control_Applicative.pure(dictApplicative)(xs))(function ($23) {
                        return Data_Functor.map((dictApplicative.Apply0()).Functor0())(function (x) {
                            return Data_Maybe.fromMaybe(xs)(Data_Array.updateAt(n)(x)(xs));
                        })(coalg($23));
                    })(Data_Array.index(xs)(n));
                };
            };
        });
    };
});
var indexArr = function (dictEq) {
    return new Index(function (i) {
        return function (dictWander) {
            return Data_Lens_Internal_Wander.wander(dictWander)(function (dictApplicative) {
                return function (coalg) {
                    return function (f) {
                        return Data_Functor.mapFlipped((dictApplicative.Apply0()).Functor0())(coalg(f(i)))(function (a) {
                            return function (j) {
                                var $19 = Data_Eq.eq(dictEq)(i)(j);
                                if ($19) {
                                    return a;
                                };
                                return f(j);
                            };
                        });
                    };
                };
            });
        };
    });
};
module.exports = {
    Index: Index, 
    ix: ix, 
    indexArr: indexArr, 
    indexMaybe: indexMaybe, 
    indexIdentity: indexIdentity, 
    indexArray: indexArray, 
    indexSet: indexSet, 
    indexMap: indexMap, 
    indexStrMap: indexStrMap
};
