"use strict";
var Control_Bind = require("../Control.Bind");
var Data_Function = require("../Data.Function");
var Data_Monoid = require("../Data.Monoid");
var Data_Tuple = require("../Data.Tuple");
var Data_Unit = require("../Data.Unit");
var Text_Smolder_HTML = require("../Text.Smolder.HTML");
var Text_Smolder_Markup = require("../Text.Smolder.Markup");
var Type_Proxy = require("../Type.Proxy");
var EncodeNew = function (encodeNew) {
    this.encodeNew = encodeNew;
};
var encodeNewUnit = new EncodeNew(function (v) {
    return Data_Monoid.mempty(Text_Smolder_Markup.monoidMarkup);
});
var encodeNew = function (dict) {
    return dict.encodeNew;
};
var encodeNewTuple = function (dictEncodeNew) {
    return function (dictEncodeNew1) {
        return new EncodeNew(function (v) {
            return Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_HTML.div(encodeNew(dictEncodeNew)(Type_Proxy["Proxy"].value)))(function () {
                return encodeNew(dictEncodeNew1)(Type_Proxy["Proxy"].value);
            });
        });
    };
};
module.exports = {
    EncodeNew: EncodeNew, 
    encodeNew: encodeNew, 
    encodeNewUnit: encodeNewUnit, 
    encodeNewTuple: encodeNewTuple
};
