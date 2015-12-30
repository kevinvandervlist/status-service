import {HealthService} from "./health_service";

import {MockBackend} from "angular2/http/testing";
import {Http,ResponseOptions,Response,BaseRequestOptions} from "angular2/http";
import {it,inject,beforeEachProviders} from "angular2/testing";
import {provide} from "angular2/core";
import {ServiceHealth} from "../types/service_health";
import "rxjs/Rx";

export function main():void {
    describe("Health Service", () => {
        beforeEachProviders(() => [
            MockBackend,
            BaseRequestOptions,
            provide(Http, {
                useFactory: function (backend:any, defaultOptions:any):Http {
                    return new Http(backend, defaultOptions);
                },
                deps: [MockBackend, BaseRequestOptions]
            }),
            HealthService
        ]);

        it("should return mock data", inject([HealthService, MockBackend], (service:HealthService, mockBackend:MockBackend) => {
            // fake response
            let fake = [
                <ServiceHealth> {
                    ServiceName: "foo",
                    Version: "1.0.0",
                    State: "Up",
                    Hostname: "foo.host",
                    Timestamp: "123",
                    Dependencies: [
                        "bar",
                        "baz"
                    ]
                }
            ];
            let response = new Response(new ResponseOptions({body: fake}));
            // return the response if we have a connection to the MockBackend
            mockBackend.connections.subscribe((connection:any) => connection.mockRespond(response));

            service.one("hello").subscribe(
                (e:ServiceHealth) => {
                    expect(e.ServiceName).toBe("foo");
                },
                (e:any) => {
                    new Error(e);
                }
            );
        }));
    });
}
