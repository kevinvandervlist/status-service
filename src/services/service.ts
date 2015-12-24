"use strict";
/// <reference path="../typings/tsd.d.ts" />

import {Observable,AsyncSubject,Scheduler} from "@reactivex/rxjs";
import * as request from "request";

export function AllServices():Observable<Service> {
    return Observable.fromArray([
        "foo",
        "bar",
        "baz"
    ]).map((n:string) => {
        return new Service(n);
    });
}

export interface ServiceHealth {
    ServiceName :string;
    Version: string;
    Hostname: string;
    Timestamp: string;
    Dependencies: [string];
}

function constructAddress(name:string):string {
    return "http://localhost:8080/demo/" + name + "/health";
}

export class Service {
    state:Observable<any>;

    constructor(private name:string, private interval?:number) {
        if(! this.interval) {
            this.interval = 5000;
        }

        var address = constructAddress(name);

        this.state = Observable.create((observer: any) => {
            var f = () => {
                if (observer.isUnsubscribed) {
                    return;
                }
                request.get(address, {}, (error:any, response:any, body:any) => {
                    if (observer.isUnsubscribed) {
                        return;
                    }
                    if (error) {
                        observer.error(error);
                    } else {
                        observer.next(body);
                        Scheduler.queue.scheduleLater(f, this.interval);
                    }
                });
            };

            Scheduler.queue.schedule(f);
        });
    }

    single():Observable<ServiceHealth> {
        return this.observe().take(1);
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
                    Dependencies: ["foo", "bar"]
                };
            });
    }
}
