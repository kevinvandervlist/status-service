"use strict";
export class ServerError {
    public message:string;
    public stacktrace:any;

    constructor(e:any) {
        this.message = e.message;
        this.stacktrace = e.stacktrace;
    }

    toString():string {
        return this.message + ":\n" + this.stacktrace;

    }
}
