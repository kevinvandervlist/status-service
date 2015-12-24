/// <reference path="../src/typings/tsd.d.ts" />
import assert = require("power-assert");

describe("test", () => {
    it("should foo()", () => {
        assert([1, 2, 3].indexOf(1) === 0);
    });
    it("should bar()", () => {
        assert([1, 2, 3].indexOf(2) === 1);
    });
    it("should baz()", () => {
        var expected: number = 5;
        var result: number = 1;
        assert(result !== expected);
    });
});
