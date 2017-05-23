// Generated by purs version 0.11.4
"use strict";
var Control_Monad_State_Class = require("../Control.Monad.State.Class");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_EuclideanRing = require("../Data.EuclideanRing");
var Data_Function = require("../Data.Function");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Lens_Internal_Indexed = require("../Data.Lens.Internal.Indexed");
var Data_Lens_Types = require("../Data.Lens.Types");
var Data_Maybe = require("../Data.Maybe");
var Data_Ring = require("../Data.Ring");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Tuple = require("../Data.Tuple");
var Prelude = require("../Prelude");
var over = function (l) {
    return l;
};
var set = function (l) {
    return function (b) {
        return over(l)(Data_Function["const"](b));
    };
};
var setJust = function (p) {
    return function ($24) {
        return set(p)(Data_Maybe.Just.create($24));
    };
};
var subOver = function (dictRing) {
    return function (p) {
        return function ($25) {
            return over(p)(Data_Function.flip(Data_Ring.sub(dictRing))($25));
        };
    };
};
var mulOver = function (dictSemiring) {
    return function (p) {
        return function ($26) {
            return over(p)(Data_Function.flip(Data_Semiring.mul(dictSemiring))($26));
        };
    };
};
var modifying = function (dictMonadState) {
    return function (p) {
        return function (f) {
            return Control_Monad_State_Class.modify(dictMonadState)(over(p)(f));
        };
    };
};
var mulModifying = function (dictMonadState) {
    return function (dictSemiring) {
        return function (p) {
            return function ($27) {
                return modifying(dictMonadState)(p)(Data_Function.flip(Data_Semiring.mul(dictSemiring))($27));
            };
        };
    };
};
var subModifying = function (dictMonadState) {
    return function (dictRing) {
        return function (p) {
            return function ($28) {
                return modifying(dictMonadState)(p)(Data_Function.flip(Data_Ring.sub(dictRing))($28));
            };
        };
    };
};
var iover = function (l) {
    return function (f) {
        return l(Data_Lens_Internal_Indexed.Indexed(Data_Tuple.uncurry(f)));
    };
};
var divOver = function (dictEuclideanRing) {
    return function (p) {
        return function ($29) {
            return over(p)(Data_Function.flip(Data_EuclideanRing.div(dictEuclideanRing))($29));
        };
    };
};
var divModifying = function (dictMonadState) {
    return function (dictEuclideanRing) {
        return function (p) {
            return function ($30) {
                return modifying(dictMonadState)(p)(Data_Function.flip(Data_EuclideanRing.div(dictEuclideanRing))($30));
            };
        };
    };
};
var disjOver = function (dictHeytingAlgebra) {
    return function (p) {
        return function ($31) {
            return over(p)(Data_Function.flip(Data_HeytingAlgebra.disj(dictHeytingAlgebra))($31));
        };
    };
};
var disjModifying = function (dictMonadState) {
    return function (dictHeytingAlgebra) {
        return function (p) {
            return function ($32) {
                return modifying(dictMonadState)(p)(Data_Function.flip(Data_HeytingAlgebra.disj(dictHeytingAlgebra))($32));
            };
        };
    };
};
var conjOver = function (dictHeytingAlgebra) {
    return function (p) {
        return function ($33) {
            return over(p)(Data_Function.flip(Data_HeytingAlgebra.conj(dictHeytingAlgebra))($33));
        };
    };
};
var conjModifying = function (dictMonadState) {
    return function (dictHeytingAlgebra) {
        return function (p) {
            return function ($34) {
                return modifying(dictMonadState)(p)(Data_Function.flip(Data_HeytingAlgebra.conj(dictHeytingAlgebra))($34));
            };
        };
    };
};
var assign = function (dictMonadState) {
    return function (p) {
        return function (b) {
            return Control_Monad_State_Class.modify(dictMonadState)(set(p)(b));
        };
    };
};
var assignJust = function (dictMonadState) {
    return function (p) {
        return function ($35) {
            return assign(dictMonadState)(p)(Data_Maybe.Just.create($35));
        };
    };
};
var appendOver = function (dictSemigroup) {
    return function (p) {
        return function ($36) {
            return over(p)(Data_Function.flip(Data_Semigroup.append(dictSemigroup))($36));
        };
    };
};
var appendModifying = function (dictMonadState) {
    return function (dictSemigroup) {
        return function (p) {
            return function ($37) {
                return modifying(dictMonadState)(p)(Data_Function.flip(Data_Semigroup.append(dictSemigroup))($37));
            };
        };
    };
};
var addOver = function (dictSemiring) {
    return function (p) {
        return function ($38) {
            return over(p)(Data_Semiring.add(dictSemiring)($38));
        };
    };
};
var addModifying = function (dictMonadState) {
    return function (dictSemiring) {
        return function (p) {
            return function ($39) {
                return modifying(dictMonadState)(p)(Data_Semiring.add(dictSemiring)($39));
            };
        };
    };
};
module.exports = {
    addModifying: addModifying, 
    addOver: addOver, 
    appendModifying: appendModifying, 
    appendOver: appendOver, 
    assign: assign, 
    assignJust: assignJust, 
    conjModifying: conjModifying, 
    conjOver: conjOver, 
    disjModifying: disjModifying, 
    disjOver: disjOver, 
    divModifying: divModifying, 
    divOver: divOver, 
    iover: iover, 
    modifying: modifying, 
    mulModifying: mulModifying, 
    mulOver: mulOver, 
    over: over, 
    set: set, 
    setJust: setJust, 
    subModifying: subModifying, 
    subOver: subOver
};