"use strict";
/// <reference path="../typings/tsd.d.ts" />

import {Observable,ConnectableObservable,Scheduler,Subscription} from "@reactivex/rxjs";
import * as request from "request";

export class AllServices {
    private services:ConnectableObservable<Service>;
    private subscription:Subscription;

    constructor() {
        var svcs:Array<string> = [
            "foo",
            "bar",
            "baz"
        ];
        // TODO: is this an acceptable caching strategy?
        this.services = Observable.fromArray(svcs).map((n:string) => {
            return new Service(n);
        }).publishReplay(3);
        this.subscription = this.services.connect();
    }

    public observe():Observable<Service> {
        return this.services;
    }
}

export interface ServiceHealth {
    ServiceName :string;
    Version: string;
    Hostname: string;
    Timestamp: string;
    Dependencies: Array<string>;
}

function constructAddress(name:string):string {
    return "http://localhost:8080/demo/" + name + "/health";
}

export class Service {
    state:Observable<any>;
    address:string;

    constructor(private name:string, private interval?:number) {
        console.log("New " + name);
        if (!this.interval) {
            this.interval = 500;
        }

        this.address = constructAddress(name);

        this.state = Observable.create((observer:any) => {
            console.log("new create" + name);
            var f = () => {
                if (observer.isUnsubscribed) {
                    console.log("unsubscribed - a: " + name);
                    return;
                }
                console.log("Getting: " + name);
                request.get(this.address, {}, (error:any, response:any, body:any) => {
                    console.log("resp: " + name);
                    if (observer.isUnsubscribed) {
                        console.log("unsubscribed - b: " + name);
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
