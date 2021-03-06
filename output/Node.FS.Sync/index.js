// Generated by purs version 0.11.4
"use strict";
var Control_Bind = require("../Control.Bind");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Exception = require("../Control.Monad.Eff.Exception");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_DateTime = require("../Data.DateTime");
var Data_DateTime_Instant = require("../Data.DateTime.Instant");
var Data_EuclideanRing = require("../Data.EuclideanRing");
var Data_Function = require("../Data.Function");
var Data_Function_Uncurried = require("../Data.Function.Uncurried");
var Data_Functor = require("../Data.Functor");
var Data_Int = require("../Data.Int");
var Data_Maybe = require("../Data.Maybe");
var Data_Nullable = require("../Data.Nullable");
var Data_Show = require("../Data.Show");
var Data_Time_Duration = require("../Data.Time.Duration");
var Node_Buffer = require("../Node.Buffer");
var Node_Encoding = require("../Node.Encoding");
var Node_FS = require("../Node.FS");
var Node_FS_Internal = require("../Node.FS.Internal");
var Node_FS_Perms = require("../Node.FS.Perms");
var Node_FS_Stats = require("../Node.FS.Stats");
var Node_Path = require("../Node.Path");
var Prelude = require("../Prelude");
var fs = Node_FS_Internal.unsafeRequireFS;
var link = function (src) {
    return function (dst) {
        return Node_FS_Internal.mkEff(function (v) {
            return fs.linkSync(src, dst);
        });
    };
};
var mkdir$prime = function (file) {
    return function (perms) {
        return Node_FS_Internal.mkEff(function (v) {
            return fs.mkdirSync(file, Node_FS_Perms.permsToString(perms));
        });
    };
};
var mkdir = Data_Function.flip(mkdir$prime)(Node_FS_Perms.mkPerms(Node_FS_Perms.all)(Node_FS_Perms.all)(Node_FS_Perms.all));
var readFile = function (file) {
    return Node_FS_Internal.mkEff(function (v) {
        return fs.readFileSync(file, {});
    });
};
var readTextFile = function (encoding) {
    return function (file) {
        return Node_FS_Internal.mkEff(function (v) {
            return fs.readFileSync(file, {
                encoding: Data_Show.show(Node_Encoding.showEncoding)(encoding)
            });
        });
    };
};
var readdir = function (file) {
    return Node_FS_Internal.mkEff(function (v) {
        return fs.readdirSync(file);
    });
};
var readlink = function (path) {
    return Node_FS_Internal.mkEff(function (v) {
        return fs.readlinkSync(path);
    });
};
var realpath = function (path) {
    return Node_FS_Internal.mkEff(function (v) {
        return fs.realpathSync(path, {});
    });
};
var realpath$prime = function (path) {
    return function (cache) {
        return Node_FS_Internal.mkEff(function (v) {
            return fs.realpathSync(path, cache);
        });
    };
};
var rename = function (oldFile) {
    return function (newFile) {
        return Node_FS_Internal.mkEff(function (v) {
            return fs.renameSync(oldFile, newFile);
        });
    };
};
var rmdir = function (file) {
    return Node_FS_Internal.mkEff(function (v) {
        return fs.rmdirSync(file);
    });
};
var stat = function (file) {
    return Data_Functor.map(Control_Monad_Eff.functorEff)(Node_FS_Stats.Stats.create)(Node_FS_Internal.mkEff(function (v) {
        return fs.statSync(file);
    }));
};
var symlink = function (src) {
    return function (dst) {
        return function (ty) {
            return Node_FS_Internal.mkEff(function (v) {
                return fs.symlinkSync(src, dst, Node_FS.symlinkTypeToNode(ty));
            });
        };
    };
};
var truncate = function (file) {
    return function (len) {
        return Node_FS_Internal.mkEff(function (v) {
            return fs.truncateSync(file, len);
        });
    };
};
var unlink = function (file) {
    return Node_FS_Internal.mkEff(function (v) {
        return fs.unlinkSync(file);
    });
};
var utimes = function (file) {
    return function (atime) {
        return function (mtime) {
            var toEpochMilliseconds = function ($33) {
                return Data_DateTime_Instant.unInstant(Data_DateTime_Instant.fromDateTime($33));
            };
            var ms = function (v) {
                return Data_Int.round(v);
            };
            var fromDate = function (date) {
                return ms(toEpochMilliseconds(date)) / 1000 | 0;
            };
            return Node_FS_Internal.mkEff(function (v) {
                return fs.utimesSync(file, fromDate(atime), fromDate(mtime));
            });
        };
    };
};
var writeFile = function (file) {
    return function (buff) {
        return Node_FS_Internal.mkEff(function (v) {
            return fs.writeFileSync(file, buff, {});
        });
    };
};
var writeTextFile = function (encoding) {
    return function (file) {
        return function (text) {
            return Node_FS_Internal.mkEff(function (v) {
                return fs.writeFileSync(file, text, {
                    encoding: Data_Show.show(Node_Encoding.showEncoding)(encoding)
                });
            });
        };
    };
};
var fdWrite = function (fd) {
    return function (buff) {
        return function (off) {
            return function (len) {
                return function (pos) {
                    return Node_FS_Internal.mkEff(function (v) {
                        return fs.writeSync(fd, buff, off, len, Data_Nullable.toNullable(pos));
                    });
                };
            };
        };
    };
};
var fdRead = function (fd) {
    return function (buff) {
        return function (off) {
            return function (len) {
                return function (pos) {
                    return Node_FS_Internal.mkEff(function (v) {
                        return fs.readSync(fd, buff, off, len, Data_Nullable.toNullable(pos));
                    });
                };
            };
        };
    };
};
var fdOpen = function (file) {
    return function (flags) {
        return function (mode) {
            return Node_FS_Internal.mkEff(function (v) {
                return fs.openSync(file, Node_FS.fileFlagsToNode(flags), Data_Nullable.toNullable(mode));
            });
        };
    };
};
var fdNext = function (fd) {
    return function (buff) {
        return function __do() {
            var v = Node_Buffer.size(buff)();
            return fdRead(fd)(buff)(0)(v)(Data_Maybe.Nothing.value)();
        };
    };
};
var fdFlush = function (fd) {
    return Node_FS_Internal.mkEff(function (v) {
        return fs.fsyncSync(fd);
    });
};
var fdClose = function (fd) {
    return Node_FS_Internal.mkEff(function (v) {
        return fs.closeSync(fd);
    });
};
var fdAppend = function (fd) {
    return function (buff) {
        return function __do() {
            var v = Node_Buffer.size(buff)();
            return fdWrite(fd)(buff)(0)(v)(Data_Maybe.Nothing.value)();
        };
    };
};
var exists = function (file) {
    return Node_FS_Internal.mkEff(function (v) {
        return fs.existsSync(file);
    });
};
var chown = function (file) {
    return function (uid) {
        return function (gid) {
            return Node_FS_Internal.mkEff(function (v) {
                return fs.chownSync(file, uid, gid);
            });
        };
    };
};
var chmod = function (file) {
    return function (perms) {
        return Node_FS_Internal.mkEff(function (v) {
            return fs.chmodSync(file, Node_FS_Perms.permsToString(perms));
        });
    };
};
var appendTextFile = function (encoding) {
    return function (file) {
        return function (buff) {
            return Node_FS_Internal.mkEff(function (v) {
                return fs.appendFileSync(file, buff, {
                    encoding: Data_Show.show(Node_Encoding.showEncoding)(encoding)
                });
            });
        };
    };
};
var appendFile = function (file) {
    return function (buff) {
        return Node_FS_Internal.mkEff(function (v) {
            return fs.appendFileSync(file, buff, {});
        });
    };
};
module.exports = {
    appendFile: appendFile, 
    appendTextFile: appendTextFile, 
    chmod: chmod, 
    chown: chown, 
    exists: exists, 
    fdAppend: fdAppend, 
    fdClose: fdClose, 
    fdFlush: fdFlush, 
    fdNext: fdNext, 
    fdOpen: fdOpen, 
    fdRead: fdRead, 
    fdWrite: fdWrite, 
    link: link, 
    mkdir: mkdir, 
    "mkdir'": mkdir$prime, 
    readFile: readFile, 
    readTextFile: readTextFile, 
    readdir: readdir, 
    readlink: readlink, 
    realpath: realpath, 
    "realpath'": realpath$prime, 
    rename: rename, 
    rmdir: rmdir, 
    stat: stat, 
    symlink: symlink, 
    truncate: truncate, 
    unlink: unlink, 
    utimes: utimes, 
    writeFile: writeFile, 
    writeTextFile: writeTextFile
};
