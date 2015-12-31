/// <reference path="../../src/typings/tsd.d.ts" />
import assert = require("power-assert");
import {ServerError} from "../../src/util/server";
import {InterweaveOperator} from "../../src/util/interweave";
import {Observable} from "@reactivex/rxjs";

describe("util/interweave_test.ts", () => {
    it("should be able to interweave values.", (done) => {
        var expected:Array<string> = ["a", "-", "b", "-", "c"];
        var i = 0;

        Observable
            .fromArray(["a", "b", "c"])
            .lift(new InterweaveOperator("-"))
            .subscribe(function (x) {
                assert.equal(x, expected[i++]);
            }, null, () => {
                assert.equal(i, 5);
                done();
            });
    });
});