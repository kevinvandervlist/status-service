/// <reference path="../src/typings/mocha/mocha.d.ts" />
/// <reference path="../src/typings/assert/assert.d.ts" />
import assert = require("power-assert");

describe('test', () => {
    it('should foo()', () => {
        assert([1, 2, 3].indexOf(1) === 0);
    });
    it('should bar()', () => {
        assert([1, 2, 3].indexOf(2) === 1);
    });
    it('should baz()', () => {
        const expected: number = 5;
        let result: number = 1;
        assert(result !== expected);
    });
});
