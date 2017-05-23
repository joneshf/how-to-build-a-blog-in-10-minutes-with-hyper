// Generated by purs version 0.11.4
"use strict";
var Hyper_Conn = require("../Hyper.Conn");
var setAuthentication = function (auth) {
    return function (conn) {
        var $4 = {};
        for (var $5 in conn) {
            if ({}.hasOwnProperty.call(conn, $5)) {
                $4[$5] = conn[$5];
            };
        };
        $4.components = (function () {
            var $1 = {};
            for (var $2 in conn.components) {
                if ({}.hasOwnProperty.call(conn.components, $2)) {
                    $1[$2] = conn["components"][$2];
                };
            };
            $1.authentication = auth;
            return $1;
        })();
        return $4;
    };
};
module.exports = {
    setAuthentication: setAuthentication
};