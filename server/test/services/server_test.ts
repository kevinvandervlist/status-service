/// <reference path="../../src/typings/tsd.d.ts" />
import assert = require("power-assert");
import {Observable,Scheduler} from "@reactivex/rxjs";
import * as s from "../../src/services/service"
import {ServiceHealth} from "../../src/services/service";

describe("services/service_test.ts", () => {
    it("should share subscriptions between service instances", (done) => {
        var service = <any>new s.Service("foo");
        var cnt = 0;
        service.src = Observable.create((observer:any) => {
            cnt++;
            var f = () => {
                if (observer.isUnsubscribed) {
                    return;
                }
                observer.next(`{"servicename":"Foo","state":"Up","version":"1.0.0","hostname":"abc","timestamp":1257894000,"dependencies":[]}`);
                Scheduler.queue.scheduleLater(f, 100);
            };
            Scheduler.queue.schedule(f);
        });
        Observable
            .zip(service.single(), service.single(), (a:ServiceHealth, b:ServiceHealth) => {
                return a.Hostname + ":" + b.Hostname;
            })
            .subscribe(
                s => {
                    assert.equal(s, "abc:abc");
                },
                e => {
                    done(e);
                },
                () => {
                    assert.equal(cnt, 1);
                    done();
                }
            );
    });
});
