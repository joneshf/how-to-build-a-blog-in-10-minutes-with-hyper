"use strict";
var Control_Bind = require("../Control.Bind");
var Data_Function = require("../Data.Function");
var Data_Monoid = require("../Data.Monoid");
var Data_Tuple = require("../Data.Tuple");
var Data_Unit = require("../Data.Unit");
var Text_Smolder_HTML = require("../Text.Smolder.HTML");
var Text_Smolder_Markup = require("../Text.Smolder.Markup");
var EncodeEdit = function (encodeEdit) {
    this.encodeEdit = encodeEdit;
};
var encodeEditUnit = new EncodeEdit(function (v) {
    return Data_Monoid.mempty(Text_Smolder_Markup.monoidMarkup);
});
var encodeEdit = function (dict) {
    return dict.encodeEdit;
};
var encodeEditTuple = function (dictEncodeEdit) {
    return function (dictEncodeEdit1) {
        return new EncodeEdit(function (v) {
            return Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_HTML.div(encodeEdit(dictEncodeEdit)(v.value0)))(function () {
                return encodeEdit(dictEncodeEdit1)(v.value1);
            });
        });
    };
};
module.exports = {
    EncodeEdit: EncodeEdit, 
    encodeEdit: encodeEdit, 
    encodeEditUnit: encodeEditUnit, 
    encodeEditTuple: encodeEditTuple
};
