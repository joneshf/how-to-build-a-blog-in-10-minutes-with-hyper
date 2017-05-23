// Generated by purs version 0.11.4
"use strict";
var Control_Alt = require("../Control.Alt");
var Data_Functor = require("../Data.Functor");
var Data_URI_Common = require("../Data.URI.Common");
var Data_URI_Types = require("../Data.URI.Types");
var Prelude = require("../Prelude");
var Text_Parsing_StringParser = require("../Text.Parsing.StringParser");
var Text_Parsing_StringParser_Combinators = require("../Text.Parsing.StringParser.Combinators");
var Text_Parsing_StringParser_String = require("../Text.Parsing.StringParser.String");
var parseFragment = Text_Parsing_StringParser["try"](Data_Functor.map(Text_Parsing_StringParser.functorParser)(Data_URI_Common.joinWith(""))(Text_Parsing_StringParser_Combinators.many(Control_Alt.alt(Text_Parsing_StringParser.altParser)(Control_Alt.alt(Text_Parsing_StringParser.altParser)(Data_URI_Common.parsePChar)(Text_Parsing_StringParser_String.string("/")))(Text_Parsing_StringParser_String.string("?")))));
module.exports = {
    parseFragment: parseFragment
};