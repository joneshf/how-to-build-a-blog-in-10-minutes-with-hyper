// Generated by purs version 0.11.4
"use strict";
var $foreign = require("./foreign");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Foreign = require("../Data.Foreign");
var Data_Function = require("../Data.Function");
var Data_Functor_Contravariant = require("../Data.Functor.Contravariant");
var Data_Maybe = require("../Data.Maybe");
var Data_Op = require("../Data.Op");
var Data_Options = require("../Data.Options");
var Data_StrMap = require("../Data.StrMap");
var Node_HTTP = require("../Node.HTTP");
var Node_Stream = require("../Node.Stream");
var Node_URL = require("../Node.URL");
var Prelude = require("../Prelude");
var Unsafe_Coerce = require("../Unsafe.Coerce");
var RequestHeaders = function (x) {
    return x;
};
var IPV4 = (function () {
    function IPV4() {

    };
    IPV4.value = new IPV4();
    return IPV4;
})();
var IPV6 = (function () {
    function IPV6() {

    };
    IPV6.value = new IPV6();
    return IPV6;
})();
var statusMessage = function ($6) {
    return (function (v) {
        return v.statusMessage;
    })(Unsafe_Coerce.unsafeCoerce($6));
};
var statusCode = function ($7) {
    return (function (v) {
        return v.statusCode;
    })(Unsafe_Coerce.unsafeCoerce($7));
};
var responseAsStream = Unsafe_Coerce.unsafeCoerce;
var requestFromURI = function ($8) {
    return $foreign.requestImpl(Data_Foreign.toForeign(Node_URL.parse($8)));
};
var requestAsStream = Unsafe_Coerce.unsafeCoerce;
var request = function ($9) {
    return $foreign.requestImpl(Data_Options.options($9));
};
var rejectUnauthorized = Data_Options.opt("rejectUnauthorized");
var protocol = Data_Options.opt("protocol");
var port = Data_Options.opt("port");
var path = Data_Options.opt("path");
var method = Data_Options.opt("method");
var key = Data_Options.opt("key");
var httpVersion = function ($10) {
    return (function (v) {
        return v.httpVersion;
    })(Unsafe_Coerce.unsafeCoerce($10));
};
var hostname = Data_Options.opt("hostname");
var headers$prime = function ($11) {
    return (function (v) {
        return v.headers;
    })(Unsafe_Coerce.unsafeCoerce($11));
};
var responseCookies = function (res) {
    return Data_StrMap.lookup("set-cookie")(headers$prime(res));
};
var responseHeaders = function (res) {
    return Data_StrMap["delete"]("set-cookie")(headers$prime(res));
};
var headers = Data_Options.opt("headers");
var familyToOption = function (v) {
    if (v instanceof IPV4) {
        return 4;
    };
    if (v instanceof IPV6) {
        return 6;
    };
    throw new Error("Failed pattern match at Node.HTTP.Client line 109, column 1 - line 110, column 1: " + [ v.constructor.name ]);
};
var family = Data_Functor_Contravariant.cmap(Data_Op.contravariantOp)(familyToOption)(Data_Options.opt("family"));
var cert = Data_Options.opt("cert");
var auth = Data_Options.opt("auth");
module.exports = {
    IPV4: IPV4, 
    IPV6: IPV6, 
    RequestHeaders: RequestHeaders, 
    auth: auth, 
    cert: cert, 
    family: family, 
    headers: headers, 
    hostname: hostname, 
    httpVersion: httpVersion, 
    key: key, 
    method: method, 
    path: path, 
    port: port, 
    protocol: protocol, 
    rejectUnauthorized: rejectUnauthorized, 
    request: request, 
    requestAsStream: requestAsStream, 
    requestFromURI: requestFromURI, 
    responseAsStream: responseAsStream, 
    responseCookies: responseCookies, 
    responseHeaders: responseHeaders, 
    statusCode: statusCode, 
    statusMessage: statusMessage, 
    setTimeout: $foreign.setTimeout
};