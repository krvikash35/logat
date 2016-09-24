"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events = require('events');
var fs = require('fs');
var EventEmitter = events.EventEmitter;
var LogLevelE = {
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4
};
var LogMethodE = {
    CONSOLE: 1,
    FILE: 2
};
var colors = {
    reset: "\x1b[0m",
    fgcyan: "\x1b[36m",
    fgmagenta: "\x1b[35m",
    error: "\x1b[31m",
    warn: "\x1b[33m",
    info: "\x1b[32m",
    debug: "\x1b[34m"
};
var Logger = (function (_super) {
    __extends(Logger, _super);
    function Logger(options) {
        _super.call(this);
        this.options = {};
        this.options.logLevel = options.logLevel;
        this.options.logMethod = options.logMethod;
        this.options.logFileName = options.logFileName;
    }
    Logger.prototype.error = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i - 0] = arguments[_i];
        }
        if (this.options.logLevel >= LogLevelE.ERROR) {
            logEvent.call.apply(logEvent, [this, 'error'].concat(params));
        }
    };
    Logger.prototype.warn = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i - 0] = arguments[_i];
        }
        if (this.options.logLevel >= LogLevelE.WARN) {
            logEvent.call.apply(logEvent, [this, 'warn'].concat(params));
        }
    };
    Logger.prototype.info = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i - 0] = arguments[_i];
        }
        if (this.options.logLevel >= LogLevelE.INFO) {
            logEvent.call.apply(logEvent, [this, 'info'].concat(params));
        }
    };
    Logger.prototype.debug = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i - 0] = arguments[_i];
        }
        if (this.options.logLevel >= LogLevelE.DEBUG) {
            logEvent.call.apply(logEvent, [this, 'debug'].concat(params));
        }
    };
    Logger.prototype.getOptions = function () {
        return this.options;
    };
    Logger.prototype.setOptions = function (options) {
        for (var key in options) {
            if (this.options.hasOwnProperty(key)) {
                this.options[key] = options[key];
            }
            else {
                var errMsg = " one of the provided option name \"" + key + "\"\" is not valid.\n        Please check documentation for more";
                this.emit('LogConfigError', new Error(errMsg));
                break;
            }
        }
    };
    return Logger;
}(EventEmitter));
var options = {
    logLevel: LogLevelE.ERROR,
    logMethod: LogMethodE.CONSOLE,
    logFileName: 'app.log'
};
function logEvent(evname) {
    var _this = this;
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    var logLineDetail = ((new Error().stack).split("at ")[3]).trim();
    if (this.options.logMethod == LogMethodE.CONSOLE) {
        var logMsg = colors[evname] + ("[" + evname.toUpperCase() + "] " + colors.reset + " on " + colors.fgcyan + " " + new Date().toUTCString() + " " + colors.reset + " at " + colors.fgmagenta + " " + logLineDetail + " " + colors.reset);
        console.log(logMsg);
        for (var i = 0; i < params.length; i++) {
            if (params[i] instanceof Error) {
                params[i] = params[i].stack;
            }
            else if (typeof params[i] === 'object') {
                params[i] = JSON.stringify(params[i], null, 3);
            }
            console.log('Object' + i + ': ', params[i]);
        }
    }
    else {
        var logMsg = "[" + evname.toUpperCase() + "]  on  " + new Date().toUTCString() + "  at  " + logLineDetail;
        params.unshift(logMsg);
        for (var i = 0; i < params.length; i++) {
            if (params[i] instanceof Error) {
                params[i] = params[i].stack;
            }
            else if (typeof params[i] === 'object') {
                params[i] = JSON.stringify(params[i], null, 3);
            }
            fs.appendFile(this.options.logFileName, params[i] + '\n' + 'Object' + i + ': ', function (err, msg) {
                if (err) {
                    _this.emit('LogConfigError', err);
                }
            });
        }
    }
}
module.exports = new Logger(options);
