import events = require('events');
import fs = require('fs');

const EventEmitter = events.EventEmitter;

const LogLevelE = {
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4
}

const LogMethodE = {
    CONSOLE: 1,
    FILE: 2
}

const colors = {
    reset: "\x1b[0m",
    fgcyan: "\x1b[36m",
    fgmagenta: "\x1b[35m",
    error: "\x1b[31m",
    warn: "\x1b[33m",
    info: "\x1b[32m",
    debug: "\x1b[34m"
}

interface LogOptionsI {
    logLevel?: number,
    logMethod?: number,
    logFileName?: string
}

class Logger extends EventEmitter {
    private options: LogOptionsI = {};
    constructor(options: LogOptionsI) {
        super()
        this.options.logLevel = options.logLevel;
        this.options.logMethod = options.logMethod;
        this.options.logFileName = options.logFileName;
    }

    error(...params): void {
        if (this.options.logLevel >= LogLevelE.ERROR) {
            logEvent.call(this, 'error', ...params)
        }
    }

    warn(...params): void {
        if (this.options.logLevel >= LogLevelE.WARN) {
            logEvent.call(this, 'warn', ...params)
        }
    }

    info(...params): void {
        if (this.options.logLevel >= LogLevelE.INFO) {
            logEvent.call(this, 'info', ...params)
        }
    }

    debug(...params): void {
        if (this.options.logLevel >= LogLevelE.DEBUG) {
            logEvent.call(this, 'debug', ...params)
        }
    }

    getOptions(): LogOptionsI {
        return this.options;
    }
    setOptions(options: LogOptionsI) {
        for (let key in options) {
            if (this.options.hasOwnProperty(key)) {
                this.options[key] = options[key]
            } else {
                let errMsg = ` one of the provided option name "${key}"" is not valid.
        Please check documentation for more`
                this.emit('LogConfigError', new Error(errMsg))
                break;
            }
        }
    }

}

let options: LogOptionsI = {
    logLevel: LogLevelE.ERROR,
    logMethod: LogMethodE.CONSOLE,
    logFileName: 'app.log'
}

export = new Logger(options);

function logEvent(evname: string, ...params) {
    let logLineDetail = ((new Error().stack).split("at ")[3]).trim();

    if (this.options.logMethod == LogMethodE.CONSOLE) {
        let logMsg = colors[evname] + `[${evname.toUpperCase()}] ${colors.reset} on ${colors.fgcyan} ${new Date().toUTCString()} ${colors.reset} at ${colors.fgmagenta} ${logLineDetail} ${colors.reset}`
        console.log(logMsg)
        for (let i = 0; i < params.length; i++) {
            if (params[i] instanceof Error) {
                params[i] = params[i].stack
            } else if (typeof params[i] === 'object') {
                params[i] = JSON.stringify(params[i], null, 3)
            }
            console.log('Object' + i + ': ', params[i])
        }
    } else {
        let logMsg = `[${evname.toUpperCase()}]  on  ${new Date().toUTCString()}  at  ${logLineDetail}`
        params.unshift(logMsg);
        for (let i = 0; i < params.length; i++) {
            if (params[i] instanceof Error) {
                params[i] = params[i].stack;
            } else if (typeof params[i] === 'object') {
                params[i] = JSON.stringify(params[i], null, 3)
            }
            fs.appendFile(this.options.logFileName, params[i] + '\n' + 'Object' + i + ': ', (err, msg) => {
                if (err) {
                    this.emit('LogConfigError', err)
                }
            })
        }
    }

}
