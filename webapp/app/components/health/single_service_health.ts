import {Component} from "angular2/core";
import {HealthService} from "../../services/health_service";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {Response} from "angular2/http";
import {ServiceHealth} from "../../types/service_health";
import {Observable} from "rxjs/Observable";
import {RouteParams} from "angular2/router";
import {Subscription} from "rxjs/Subscription";
import {BaseHealthCmp} from "./base_health";

@Component({
    selector: "health-overview",
    providers: [HealthService],
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: "./components/health/single_service_health.html"
})
export class SingleServiceHealthCmp extends BaseHealthCmp {
    state:ServiceHealth;
    last_update:string;
    name:string;
    hasError:boolean;
    subscription:Subscription<ServiceHealth>;

    constructor(public health:HealthService, params:RouteParams) {
        super(5000);
        this.state = <ServiceHealth> {
            ServiceName: "unknown",
            Version: "unknown",
            State: "unknown",
            Hostname: "unknown",
            Timestamp: "unknown",
            Dependencies: []
        };
        this.hasError = false;
        this.name = params.get("name");

        var provider = () => {
            return health.one(this.name);
        };

        this.subscription = this.poll(provider)
            .subscribe(
                (n:ServiceHealth) => {
                    this.hasError = false;
                    this.state = n;
                },
                (e:any) => {
                    console.error("An error occurred");
                    console.error(e);
                    this.hasError = true;
                }
            );
    }

    isHealthy():boolean {
        return this.state.State === "ok";
    }
}