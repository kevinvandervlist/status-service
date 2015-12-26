/// <reference path="../../src/typings/tsd.d.ts" />
import assert = require("power-assert");
import * as s from "../../src/services/service"

describe("services/service_test.ts", () => {
    it("should foo()", (done) => {
        var service = new s.Service("foo");
        service.single()
            .subscribe(
                n => {
                    assert.equal(n.ServiceName, "Foo");
                },
                e => {
                    done(e);
                },
                () => {
                    done();
                }
            );
    });
});
