// Generated by purs version 0.11.4
"use strict";
var Control_IxMonad = require("../Control.IxMonad");
var Control_Monad_Aff_Class = require("../Control.Monad.Aff.Class");
var Control_Monad_Eff_Class = require("../Control.Monad.Eff.Class");
var Data_Boolean = require("../Data.Boolean");
var Data_Foldable = require("../Data.Foldable");
var Data_Show = require("../Data.Show");
var Data_Tuple = require("../Data.Tuple");
var Hyper_Conn = require("../Hyper.Conn");
var Hyper_Middleware = require("../Hyper.Middleware");
var Hyper_Middleware_Class = require("../Hyper.Middleware.Class");
var Hyper_Request = require("../Hyper.Request");
var Hyper_Response = require("../Hyper.Response");
var Hyper_Status = require("../Hyper.Status");
var Node_Buffer = require("../Node.Buffer");
var Node_FS = require("../Node.FS");
var Node_FS_Aff = require("../Node.FS.Aff");
var Node_FS_Stats = require("../Node.FS.Stats");
var Node_Path = require("../Node.Path");
var Prelude = require("../Prelude");
var serveFile = function (dictMonad) {
    return function (dictMonadAff) {
        return function (dictResponseWritable) {
            return function (dictResponse) {
                return function (path) {
                    return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Middleware["lift'"](dictMonad)(Control_Monad_Aff_Class.liftAff(dictMonadAff)(Node_FS_Aff.readFile(path))))(function (v) {
                        return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Control_Monad_Eff_Class.liftEff(Hyper_Middleware.monadEffMiddleware(dictMonadAff.MonadEff0()))(Node_Buffer.size(v)))(function (v1) {
                            return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Response.writeStatus(dictResponse)(Hyper_Status.statusOK))(function (v2) {
                                return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Response.headers(Data_Foldable.foldableArray)(dictMonad)(dictResponse)([ new Data_Tuple.Tuple("Content-Type", "*/*; charset=utf-8"), new Data_Tuple.Tuple("Content-Length", Data_Show.show(Data_Show.showInt)(v1)) ]))(function (v3) {
                                    return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Response.toResponse(dictResponseWritable)(v))(function (v4) {
                                        return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Response.send(dictResponse)(v4))(function (v5) {
                                            return Hyper_Response.end(dictResponse);
                                        });
                                    });
                                });
                            });
                        });
                    });
                };
            };
        };
    };
};
var fileServer = function (dictMonad) {
    return function (dictMonadAff) {
        return function (dictRequest) {
            return function (dictResponseWritable) {
                return function (dictResponse) {
                    return function (dir) {
                        return function (on404) {
                            var serveStats = function (absolutePath) {
                                return function (stats) {
                                    if (Node_FS_Stats.isFile(stats)) {
                                        return serveFile(dictMonad)(dictMonadAff)(dictResponseWritable)(dictResponse)(absolutePath);
                                    };
                                    if (Node_FS_Stats.isDirectory(stats)) {
                                        return serve(Node_Path.concat([ absolutePath, "index.html" ]));
                                    };
                                    if (Data_Boolean.otherwise) {
                                        return on404;
                                    };
                                    throw new Error("Failed pattern match at Hyper.Node.FileServer line 65, column 24 - line 81, column 12: " + [ absolutePath.constructor.name, stats.constructor.name ]);
                                };
                            };
                            var serve = function (absolutePath) {
                                return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Middleware["lift'"](dictMonad)(Control_Monad_Aff_Class.liftAff(dictMonadAff)(Node_FS_Aff.exists(absolutePath))))(function (v) {
                                    if (v) {
                                        return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Middleware["lift'"](dictMonad)(Control_Monad_Aff_Class.liftAff(dictMonadAff)(Node_FS_Aff.stat(absolutePath))))(serveStats(absolutePath));
                                    };
                                    return on404;
                                });
                            };
                            return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Middleware_Class.getConn(Hyper_Middleware.ixMonadMiddlewareMiddleware(dictMonad.Applicative0())))(function (v) {
                                return Control_IxMonad.ibind(Hyper_Middleware.ixMonadMiddleware(dictMonad))(Hyper_Request.getRequestData(dictRequest))(function (v1) {
                                    return serve(Node_Path.concat([ dir, v1.url ]));
                                });
                            });
                        };
                    };
                };
            };
        };
    };
};
module.exports = {
    fileServer: fileServer
};
