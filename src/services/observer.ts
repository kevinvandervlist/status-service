/// <reference path="../typings/tsd.d.ts" />

import {Observable} from '@reactivex/rxjs'
import * as request from 'request';

import ServiceHealth = ServiceHealth.ServiceHealth;

module Service {
    export function Observe(address: string) : Observable<ServiceHealth> {
        var opts = {};
        var obs: Observable<ServiceHealth> = Observable.create<ServiceHealth>(observer => {
            request.get(address, opts, (error: any, response: any, body: any) => {
            });
            observer.onNext("Yay");
        });

        return obs.publish();
    }
}
