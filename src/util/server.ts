"use strict";
export class ServerError {
    public message:string;
    public stacktrace:any;

    constructor(e:any) {
        if(typeof e === "string") {
            this.message = e;
        } else if(e.message) {
            this.message = e.message;
        } else {
            this.message = "No error message defined.";
        }
        if(e.stack) {
            this.stacktrace = e.stack;
        }
    }

    toJSON():string {
        return JSON.stringify({
            message: this.message,
            stack: this.stacktrace
        });

    }

    toString():string {
        if(this.stacktrace) {
            return this.message + ":\n" + this.stacktrace;
        } else {
            return this.message;
        }
    }
}
