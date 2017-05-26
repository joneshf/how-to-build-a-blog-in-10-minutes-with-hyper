"use strict";
var Control_Bind = require("../Control.Bind");
var Data_Function = require("../Data.Function");
var Data_Monoid = require("../Data.Monoid");
var Data_Tuple = require("../Data.Tuple");
var Data_Unit = require("../Data.Unit");
var Text_Smolder_HTML = require("../Text.Smolder.HTML");
var Text_Smolder_Markup = require("../Text.Smolder.Markup");
var EncodeShow = function (encodeShow) {
    this.encodeShow = encodeShow;
};
var encodeShowUnit = new EncodeShow(function (v) {
    return Data_Monoid.mempty(Text_Smolder_Markup.monoidMarkup);
});
var encodeShow = function (dict) {
    return dict.encodeShow;
};
var encodeShowTuple = function (dictEncodeShow) {
    return function (dictEncodeShow1) {
        return new EncodeShow(function (v) {
            return Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_HTML.div(encodeShow(dictEncodeShow)(v.value0)))(function () {
                return encodeShow(dictEncodeShow1)(v.value1);
            });
        });
    };
};
module.exports = {
    EncodeShow: EncodeShow, 
    encodeShow: encodeShow, 
    encodeShowUnit: encodeShowUnit, 
    encodeShowTuple: encodeShowTuple
};
