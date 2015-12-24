'use strict';
/// <reference path='../typings/tsd.d.ts' />

import {Observable,AsyncSubject,Scheduler} from '@reactivex/rxjs';
import * as request from 'request';

export interface ServiceHealth {
    ServiceName :string;
    Version: string;
    Hostname: string;
    Timestamp: string;
    Dependencies: [string];
}
export class Service {
    state:Observable<any>;

    constructor(private address:string) {
        var subject = new AsyncSubject();

        request.get(address, {}, (error:any, response:any, body:any) => {
            if (error) {
                subject.error(error);
            } else {
                subject.next(body);
                subject.complete();
                // TOOD: Schedule retry eventually.
            }
        });

        this.state = subject;
    }

    observe():Observable<ServiceHealth> {
        return this.state
            .map(function (x:string):any {
                return JSON.parse(x);
            })
            .map(function (json:any):ServiceHealth {
                return <ServiceHealth> {
                    ServiceName: json.servicename,
                    Version: json.version,
                    Hostname: json.hostname,
                    Timestamp: json.timestamp,
                    Dependencies: ['foo', 'bar']
                };
            });
    }
}
