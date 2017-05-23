"use strict";
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Console = require("../Control.Monad.Eff.Console");
var Data_Unit = require("../Data.Unit");
var main = Control_Monad_Eff_Console.log("Hello LambdaConf!");
module.exports = {
    main: main
};
