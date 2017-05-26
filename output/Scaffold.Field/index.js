"use strict";
var Control_Bind = require("../Control.Bind");
var Data_Function = require("../Data.Function");
var Data_Monoid = require("../Data.Monoid");
var Data_Tuple = require("../Data.Tuple");
var Data_Unit = require("../Data.Unit");
var Text_Smolder_HTML = require("../Text.Smolder.HTML");
var Text_Smolder_Markup = require("../Text.Smolder.Markup");
var EncodeField = function (encodeField) {
    this.encodeField = encodeField;
};
var encodeFieldUnit = new EncodeField(function (v) {
    return Data_Monoid.mempty(Text_Smolder_Markup.monoidMarkup);
});
var encodeField = function (dict) {
    return dict.encodeField;
};
var encodeFieldTuple = function (dictEncodeField) {
    return function (dictEncodeField1) {
        return new EncodeField(function (v) {
            return Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_HTML.td(encodeField(dictEncodeField)(v.value0)))(function () {
                return encodeField(dictEncodeField1)(v.value1);
            });
        });
    };
};
module.exports = {
    EncodeField: EncodeField, 
    encodeField: encodeField, 
    encodeFieldUnit: encodeFieldUnit, 
    encodeFieldTuple: encodeFieldTuple
};
