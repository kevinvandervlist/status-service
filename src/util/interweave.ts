"use strict";
import {Observable,Operator,Subscriber} from "@reactivex/rxjs";

export class InterweaveOperator<T, R> implements Operator<T, R> {
    constructor(private divider:T) {
    }

    call<T, R>(subscriber: Subscriber<T>): Subscriber<T> {
        return new InterweaveSubscriber<any>(subscriber, this.divider);
    }
}

class InterweaveSubscriber<T> extends Subscriber<T> {
    private prev:any = undefined;
    constructor(destination: Subscriber<T>, private divider:T) {
        super(destination);
    }

    _next(val:T):void {
        if (this.prev !== undefined) {
            this.destination.next(this.prev);
            this.destination.next(this.divider);
        }
        this.prev = val;
    }
    _complete():void {
        this.destination.next(this.prev);
        this.destination.complete();
    }
}
