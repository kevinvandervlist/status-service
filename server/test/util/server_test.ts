/// <reference path="../../src/typings/tsd.d.ts" />
import assert = require("power-assert");
import {ServerError} from "../../src/util/server";

describe("services/server_test.ts", () => {
    it("should be able to wrap an error", () => {
        var e = new Error("my-error");
        var se = new ServerError(e);
        assert.equal(se.toString().indexOf('\n') > -1, true);
    });
    it("should be able to deal with the lack of a stacktrace", () => {
        var se = new ServerError("an error");
        assert.equal(se.toString(), "an error");
        assert.equal(se.toString().indexOf('\n') > -1, false);
    });
});
