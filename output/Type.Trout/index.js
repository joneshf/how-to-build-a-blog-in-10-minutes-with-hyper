// Generated by purs version 0.11.4
"use strict";
var AltE = (function () {
    function AltE(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    AltE.create = function (value0) {
        return function (value1) {
            return new AltE(value0, value1);
        };
    };
    return AltE;
})();
module.exports = {
    AltE: AltE
};