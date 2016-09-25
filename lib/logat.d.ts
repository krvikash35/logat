// Type definitions for logat 1.x.x
// Project: https://github.com/krvikash35/logat
// Definitions by: Vikash <https://github.com/krvikash35/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'logat'{
  interface LogOptionsI {
    logLevel?: number,
    logMethod?: number,
    logFileName?: string
}
  export function error(...args: any[]): void;
  export function warn(...args: any[]): void;
  export function info(...args: any[]): void;
  export function debug(...args: any[]): void;
  export function getOptions(): LogOptionsI;
  export function setOptions(options: LogOptionsI);
}
