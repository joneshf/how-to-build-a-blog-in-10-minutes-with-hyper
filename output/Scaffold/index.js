"use strict";
var Control_Bind = require("../Control.Bind");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Generic = require("../Data.Generic");
var Data_Newtype = require("../Data.Newtype");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Symbol = require("../Data.Symbol");
var Data_URI = require("../Data.URI");
var Data_URI_Types = require("../Data.URI.Types");
var Data_Unit = require("../Data.Unit");
var Scaffold_Destroy = require("../Scaffold.Destroy");
var Scaffold_Edit = require("../Scaffold.Edit");
var Scaffold_Field = require("../Scaffold.Field");
var Scaffold_Generic = require("../Scaffold.Generic");
var Scaffold_Header = require("../Scaffold.Header");
var Scaffold_Id = require("../Scaffold.Id");
var Scaffold_New = require("../Scaffold.New");
var Scaffold_Show = require("../Scaffold.Show");
var Text_Smolder_HTML = require("../Text.Smolder.HTML");
var Text_Smolder_HTML_Attributes = require("../Text.Smolder.HTML.Attributes");
var Text_Smolder_Markup = require("../Text.Smolder.Markup");
var Type_Proxy = require("../Type.Proxy");
var Type_Trout = require("../Type.Trout");
var Type_Trout_ContentType_HTML = require("../Type.Trout.ContentType.HTML");
var Type_Trout_Links = require("../Type.Trout.Links");
var Type_Trout_Method = require("../Type.Trout.Method");
var Show = function (x) {
    return x;
};
var New = (function () {
    function New() {

    };
    New.value = new New();
    return New;
})();
var Index = function (x) {
    return x;
};
var Edit = function (x) {
    return x;
};
var Destroy = function (x) {
    return x;
};
var newtypeShow = new Data_Newtype.Newtype(function (n) {
    return n;
}, Show);
var newtypeEdit = new Data_Newtype.Newtype(function (n) {
    return n;
}, Edit);
var newtypeDestroy = new Data_Newtype.Newtype(function (n) {
    return n;
}, Destroy);
var encodeHTMLShow = function (dictEncodeShow) {
    return function (dictGeneric) {
        return function (dictGetId) {
            return function (dictIsSymbol) {
                return new Type_Trout_ContentType_HTML.EncodeHTML(function (x) {
                    var updateLink = function (a) {
                        var v = Type_Trout_Links.linksTo(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksCapture(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksResource)(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                            return "edit";
                        }))))(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                            return "update";
                        }))))(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                            return "destroy";
                        }))))(new Data_Symbol.IsSymbol(function () {
                            return "id";
                        }))(Scaffold_Id.toPathPieceId))(dictIsSymbol))(Type_Proxy["Proxy"].value)(Scaffold_Id.getId(dictGetId)(a));
                        return v.value0.value1;
                    };
                    var indexLink = Type_Trout_Links.linksTo(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(dictIsSymbol))(Type_Proxy["Proxy"].value);
                    var editLink = function (a) {
                        var v = Type_Trout_Links.linksTo(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksCapture(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksResource)(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                            return "edit";
                        }))))(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                            return "update";
                        }))))(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                            return "destroy";
                        }))))(new Data_Symbol.IsSymbol(function () {
                            return "id";
                        }))(Scaffold_Id.toPathPieceId))(dictIsSymbol))(Type_Proxy["Proxy"].value)(Scaffold_Id.getId(dictGetId)(a));
                        return v.value0.value0.value1;
                    };
                    return Text_Smolder_HTML.section(Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_HTML.dl(Scaffold_Show.encodeShow(dictEncodeShow)(Data_Newtype.unwrap(newtypeShow)(x))))(function () {
                        return Text_Smolder_HTML.div(Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Type_Trout_ContentType_HTML.linkTo(editLink(Data_Newtype.unwrap(newtypeShow)(x)))(Text_Smolder_Markup.text("Edit")))(function () {
                            return Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_Markup.text("|"))(function () {
                                return Type_Trout_ContentType_HTML.linkTo(indexLink)(Text_Smolder_Markup.text("Back"));
                            });
                        }));
                    }));
                });
            };
        };
    };
};
var encodeHTMLNew = function (dictEncodeNew) {
    return function (dictGeneric) {
        return function (dictIsSymbol) {
            return new Type_Trout_ContentType_HTML.EncodeHTML(function (v) {
                var indexLink = Type_Trout_Links.linksTo(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(dictIsSymbol))(Type_Proxy["Proxy"].value);
                var createLink = Type_Trout_Links.linksTo(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(dictIsSymbol))(Type_Proxy["Proxy"].value);
                return Text_Smolder_HTML.section(Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_HTML.h1(Text_Smolder_Markup.text("New " + Scaffold_Generic.prettySignature(Data_Generic.toSignature(dictGeneric)(Type_Proxy["Proxy"].value)))))(function () {
                    return Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupMF)(Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupMF)(Text_Smolder_HTML.form)(Text_Smolder_HTML_Attributes.action(Data_URI.printURI(createLink))))(Text_Smolder_HTML_Attributes.method("POST"))(Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Scaffold_New.encodeNew(dictEncodeNew)(Type_Proxy["Proxy"].value))(function () {
                        return Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupM)(Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupM)(Text_Smolder_HTML.input)(Text_Smolder_HTML_Attributes["type'"]("submit")))(Text_Smolder_HTML_Attributes.value("Create")))(function () {
                            return Text_Smolder_HTML.div(Type_Trout_ContentType_HTML.linkTo(indexLink)(Text_Smolder_Markup.text("Back")));
                        });
                    }));
                }));
            });
        };
    };
};
var encodeHTMLIndex = function (dictEncodeHeader) {
    return function (dictEncodeField) {
        return function (dictGeneric) {
            return function (dictGetId) {
                return function (dictIsSymbol) {
                    return new Type_Trout_ContentType_HTML.EncodeHTML(function (v) {
                        var showLink = function (x) {
                            var v1 = Type_Trout_Links.linksTo(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksCapture(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksResource)(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                                return "edit";
                            }))))(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                                return "update";
                            }))))(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                                return "destroy";
                            }))))(new Data_Symbol.IsSymbol(function () {
                                return "id";
                            }))(Scaffold_Id.toPathPieceId))(dictIsSymbol))(Type_Proxy["Proxy"].value)(Scaffold_Id.getId(dictGetId)(x));
                            return v1.value0.value0.value0;
                        };
                        var newLink = Type_Trout_Links.linksTo(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                            return "new";
                        })))(dictIsSymbol))(Type_Proxy["Proxy"].value);
                        var editLink = function (x) {
                            var v1 = Type_Trout_Links.linksTo(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksCapture(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksResource)(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                                return "edit";
                            }))))(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                                return "update";
                            }))))(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                                return "destroy";
                            }))))(new Data_Symbol.IsSymbol(function () {
                                return "id";
                            }))(Scaffold_Id.toPathPieceId))(dictIsSymbol))(Type_Proxy["Proxy"].value)(Scaffold_Id.getId(dictGetId)(x));
                            return v1.value0.value0.value1;
                        };
                        var destroyLink = function (x) {
                            var v1 = Type_Trout_Links.linksTo(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksCapture(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksResource)(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                                return "edit";
                            }))))(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                                return "update";
                            }))))(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                                return "destroy";
                            }))))(new Data_Symbol.IsSymbol(function () {
                                return "id";
                            }))(Scaffold_Id.toPathPieceId))(dictIsSymbol))(Type_Proxy["Proxy"].value)(Scaffold_Id.getId(dictGetId)(x));
                            return v1.value1;
                        };
                        var encodeEach = function (x) {
                            return Text_Smolder_HTML.tr(Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Scaffold_Field.encodeField(dictEncodeField)(x))(function () {
                                return Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_HTML.td(Type_Trout_ContentType_HTML.linkTo(showLink(x))(Text_Smolder_Markup.text("Show"))))(function () {
                                    return Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_HTML.td(Type_Trout_ContentType_HTML.linkTo(editLink(x))(Text_Smolder_Markup.text("Edit"))))(function () {
                                        return Text_Smolder_HTML.td(Type_Trout_ContentType_HTML.linkTo(destroyLink(x))(Text_Smolder_Markup.text("Destroy")));
                                    });
                                });
                            }));
                        };
                        return Text_Smolder_HTML.section(Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_HTML.h1(Text_Smolder_Markup.text("Listing " + (Scaffold_Generic.prettySignature(Data_Generic.toSignature(dictGeneric)(Type_Proxy["Proxy"].value)) + "s"))))(function () {
                            return Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_HTML.table(Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_HTML.tbody(Data_Foldable.traverse_(Text_Smolder_Markup.applicativeMarkupM)(Data_Foldable.foldableArray)(encodeEach)(v)))(function () {
                                return Text_Smolder_HTML.thead(Scaffold_Header.encodeHeader(dictEncodeHeader)(Type_Proxy["Proxy"].value));
                            })))(function () {
                                return Text_Smolder_HTML.div(Type_Trout_ContentType_HTML.linkTo(newLink)(Text_Smolder_Markup.text("New " + Scaffold_Generic.prettySignature(Data_Generic.toSignature(dictGeneric)(Type_Proxy["Proxy"].value)))));
                            });
                        }));
                    });
                };
            };
        };
    };
};
var encodeHTMLEdit = function (dictEncodeEdit) {
    return function (dictGeneric) {
        return function (dictGetId) {
            return function (dictIsSymbol) {
                return new Type_Trout_ContentType_HTML.EncodeHTML(function (x) {
                    var updateLink = function (a) {
                        var v = Type_Trout_Links.linksTo(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksCapture(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksResource)(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                            return "edit";
                        }))))(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                            return "update";
                        }))))(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                            return "destroy";
                        }))))(new Data_Symbol.IsSymbol(function () {
                            return "id";
                        }))(Scaffold_Id.toPathPieceId))(dictIsSymbol))(Type_Proxy["Proxy"].value)(Scaffold_Id.getId(dictGetId)(a));
                        return v.value0.value1;
                    };
                    var showLink = function (a) {
                        var v = Type_Trout_Links.linksTo(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksCapture(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksAltE(Type_Trout_Links.hasLinksResource)(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                            return "edit";
                        }))))(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                            return "update";
                        }))))(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(new Data_Symbol.IsSymbol(function () {
                            return "destroy";
                        }))))(new Data_Symbol.IsSymbol(function () {
                            return "id";
                        }))(Scaffold_Id.toPathPieceId))(dictIsSymbol))(Type_Proxy["Proxy"].value)(Scaffold_Id.getId(dictGetId)(a));
                        return v.value0.value0.value0;
                    };
                    var indexLink = Type_Trout_Links.linksTo(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(dictIsSymbol))(Type_Proxy["Proxy"].value);
                    return Text_Smolder_HTML.section(Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_HTML.h1(Text_Smolder_Markup.text("Editing " + Scaffold_Generic.prettySignature(Data_Generic.toSignature(dictGeneric)(Type_Proxy["Proxy"].value)))))(function () {
                        return Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupMF)(Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupMF)(Text_Smolder_HTML.form)(Text_Smolder_HTML_Attributes.action(Data_URI.printURI(updateLink(Data_Newtype.unwrap(newtypeEdit)(x))))))(Text_Smolder_HTML_Attributes.method("POST"))(Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Scaffold_Edit.encodeEdit(dictEncodeEdit)(Data_Newtype.unwrap(newtypeEdit)(x)))(function () {
                            return Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupM)(Text_Smolder_Markup["with"](Text_Smolder_Markup.attributableMarkupM)(Text_Smolder_HTML.input)(Text_Smolder_HTML_Attributes["type'"]("submit")))(Text_Smolder_HTML_Attributes.value("Update")))(function () {
                                return Text_Smolder_HTML.div(Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Type_Trout_ContentType_HTML.linkTo(showLink(Data_Newtype.unwrap(newtypeEdit)(x)))(Text_Smolder_Markup.text("Show")))(function () {
                                    return Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_Markup.text("|"))(function () {
                                        return Type_Trout_ContentType_HTML.linkTo(indexLink)(Text_Smolder_Markup.text("Back"));
                                    });
                                }));
                            });
                        }));
                    }));
                });
            };
        };
    };
};
var encodeHTMLDestroy = function (dictEncodeDestroy) {
    return function (dictGeneric) {
        return function (dictGetId) {
            return function (dictIsSymbol) {
                return new Type_Trout_ContentType_HTML.EncodeHTML(function (x) {
                    var indexLink = Type_Trout_Links.linksTo(Type_Trout_Links.hasLinksLit(Type_Trout_Links.hasLinksResource)(dictIsSymbol))(Type_Proxy["Proxy"].value);
                    return Text_Smolder_HTML.section(Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Text_Smolder_HTML.h1(Text_Smolder_Markup.text("Destroyed " + Scaffold_Generic.prettySignature(Data_Generic.toSignature(dictGeneric)(Type_Proxy["Proxy"].value)))))(function () {
                        return Control_Bind.discard(Control_Bind.discardUnit)(Text_Smolder_Markup.bindMarkupM)(Scaffold_Destroy.encodeDestroy(dictEncodeDestroy)(Data_Newtype.unwrap(newtypeDestroy)(x)))(function () {
                            return Text_Smolder_HTML.div(Type_Trout_ContentType_HTML.linkTo(indexLink)(Text_Smolder_Markup.text("Back")));
                        });
                    }));
                });
            };
        };
    };
};
module.exports = {
    Destroy: Destroy, 
    Edit: Edit, 
    Index: Index, 
    New: New, 
    Show: Show, 
    newtypeDestroy: newtypeDestroy, 
    newtypeEdit: newtypeEdit, 
    newtypeShow: newtypeShow, 
    encodeHTMLDestroy: encodeHTMLDestroy, 
    encodeHTMLEdit: encodeHTMLEdit, 
    encodeHTMLShow: encodeHTMLShow, 
    encodeHTMLIndex: encodeHTMLIndex, 
    encodeHTMLNew: encodeHTMLNew
};
