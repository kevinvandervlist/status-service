"use strict";
/// <reference path="../typings/tsd.d.ts" />

import {Observable,ConnectableObservable,Scheduler,Subscription} from "@reactivex/rxjs";
import * as request from "request";
import {default_services} from "./addable";

export class AllServices {
    private services:ConnectableObservable<Service>;
    private subscription:Subscription;

    constructor(svcs?:Array<string>) {
        if (!svcs) {
            svcs = default_services();
        }
        // TODO: is this an acceptable caching strategy?
        this.services = Observable.fromArray(svcs).map((n:string) => {
            return new Service(n);
        }).publishReplay(svcs.length);
        this.subscription = this.services.connect();
    }

    public observe():Observable<Service> {
        return this.services;
    }
}

export interface ServiceHealth {
    ServiceName :string;
    Version: string;
    State: string;
    Hostname: string;
    Timestamp: string;
    Dependencies: Array<string>;
}

function constructAddress(name:string):string {
    return "http://localhost:8080/demo/" + name.toLowerCase() + "/health";
}

export class Service {
    src:Observable<any>;
    shared:Observable<any>;
    address:string;

    constructor(private name:string, private interval?:number) {
        if (!this.interval) {
            this.interval = 500;
        }

        this.address = constructAddress(name);

        this.src = Observable.create((observer:any) => {
            var f = () => {
                if (observer.isUnsubscribed) {
                    return;
                }
                request.get(this.address, {}, (error:any, response:any, body:any) => {
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

    private sharedObservable():Observable<any> {
        if (!this.shared) {
            this.shared = this.src.share();
        }
        return this.shared;
    }

    private down():ServiceHealth {
        return <ServiceHealth> {
            ServiceName: this.name,
            Version: "unknown",
            State: "down",
            Hostname: "unknown",
            Timestamp: String(new Date().getTime()),
            Dependencies: []
        };
    }

    single():Observable<ServiceHealth> {
        return this.observe().take(1);
    }

    observe():Observable<ServiceHealth> {
        return this
            .sharedObservable()
            .map(function (x:string):any {
                return JSON.parse(x);
            })
            .map(function (json:any):ServiceHealth {
                return <ServiceHealth> {
                    ServiceName: json.servicename,
                    Version: json.version,
                    State: "ok",
                    Hostname: json.hostname,
                    Timestamp: json.timestamp,
                    Dependencies: ["foo", "bar"]
                };
            }).catch((e:any) => {
                console.log(e);
                return Observable.of(this.down());
            });
    }
}
