/// <reference path="../../src/typings/tsd.d.ts" />
import assert = require("power-assert");
import {Edge,edgelist} from "../../src/graph/graphbuilder"
import {Observable} from "@reactivex/rxjs";
import {ServiceHealth} from "../../src/services/service"

function verify(input:Array<ServiceHealth>, expected:Array<Edge>, done) {
    var cnt:number = 0;
    var obs:Observable<ServiceHealth> = Observable.fromArray(input);
    edgelist(obs)
        .subscribe(
            e => {
                assert.deepEqual(e, expected[cnt++]);
            },
            e => {
                done(e);
            },
            () => {
                assert.equal(cnt, expected.length);
                done();
            }
        );
}

describe("graph/gaphbuilder_test.ts", () => {
    it("should handle a single node()", (done) => {
        var input:Array<ServiceHealth> = [
            <ServiceHealth>{
                ServiceName: "Foo",
                Dependencies: [
                    "Bar",
                    "baz"
                ]
            }
        ];
        var expected:Array<Edge> = [
            <Edge> {
                from: "foo",
                to: "bar"
            },
            <Edge> {
                from: "foo",
                to: "baz"
            }
        ];
        verify(input, expected, done);
    });
    it("should deal with multiple nodes()", (done) => {
        var input:Array<ServiceHealth> = [
            <ServiceHealth>{
                ServiceName: "Foo",
                Dependencies: [
                    "Bar",
                    "baz"
                ]
            },
            <ServiceHealth>{
                ServiceName: "Bar",
                Dependencies: [
                    "baz",
                    "quuk"
                ]
            }
        ];
        var expected:Array<Edge> = [
            <Edge> {
                from: "foo",
                to: "bar"
            },
            <Edge> {
                from: "foo",
                to: "baz"
            },
            <Edge> {
                from: "bar",
                to: "baz"
            },
            <Edge> {
                from: "bar",
                to: "quuk"
            }
        ];
        verify(input, expected, done);
    });
});
