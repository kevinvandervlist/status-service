/// <reference path="../../src/typings/tsd.d.ts" />
import assert = require('power-assert');
import * as service from '../../src/services/service';

describe('services/observer_test.ts', () => {
    it('should foo()', (done) => {
        service.Facade
            .Observe('http://localhost:8080/demo/foo/health')
            .subscribe(
                n => {
                    assert.equal(n.Hostname, 'abc');
                },
                e => {
                    done(e);
                },
                () => {
                    done();
                }
            )
        ;
    });
});
