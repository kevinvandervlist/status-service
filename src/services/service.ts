/// <reference path='../typings/tsd.d.ts' />

import {Observable} from '@reactivex/rxjs';
import * as request from 'request';

export module Facade {
    export interface ServiceHealth {
        ServiceName: string;
        Version: string;
        Hostname: string;
        Timestamp: string;
        Dependencies: [ServiceHealth];
    }
    export function Observe(address: string) : Observable<ServiceHealth> {
        var opts = {};
        var obs: Observable<ServiceHealth> = Observable.create(observer => {
            request.get(address, opts, (error: any, response: any, body: any) => {
                if (error) {
                    observer.error(error);
                } else {
                    observer.next(body);
                    observer.complete();
                }
            });
        });
        return obs;
    }
}
