import {OnDestroy} from "angular2/core";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

export class BaseHealthCmp implements OnDestroy {

    protected last_update:string;
    protected subscription:Subscription<any>;

    constructor(private refresh_rate:number) {
    }

    ngOnDestroy():any {
        if (this.subscription && !this.subscription.isUnsubscribed) {
            this.subscription.unsubscribe();
        }
        return undefined;
    }

    private updated():void {
        var d = new Date();
        this.last_update = d.toLocaleDateString() + " " + d.toLocaleTimeString();
    }

    protected poll<T>(provider:() => Observable<T>):Observable<T> {
        return Observable
            .merge(
                provider(),
                Observable
                    .interval(this.refresh_rate)
                    .flatMap(() => {
                        return provider()
                    }))
            .do(() => this.updated());
    }
}
