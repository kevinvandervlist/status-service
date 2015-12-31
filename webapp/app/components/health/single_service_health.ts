import {Component} from "angular2/core";
import {HealthService} from "../../services/health_service";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {Response} from "angular2/http";
import {ServiceHealth} from "../../types/service_health";
import {Observable} from "rxjs/Observable";
import {RouteParams} from "angular2/router";
import {Subscription} from "rxjs/Subscription";
import {OnDestroy} from "angular2/core";

@Component({
    selector: "health-overview",
    providers: [HealthService],
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: "./components/health/single_service_health.html"
})
export class SingleServiceHealthCmp implements OnDestroy {
    state:ServiceHealth;
    last_update:string;
    name:string;
    hasError:boolean;
    subscription:Subscription<ServiceHealth>;

    constructor(public health:HealthService, params:RouteParams) {
        let refresh_interval = 5000;
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

        this.subscription = Observable
            .merge(
                health.one(this.name),
                Observable
                    .interval(refresh_interval)
                    .flatMap(() => {
                        return health.one(this.name);
                    })
            )
            .do(() => {
                this.updated();
            })
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

    ngOnDestroy():any {
        if (this.subscription && !this.subscription.isUnsubscribed) {
            this.subscription.unsubscribe();
        }
        return undefined;
    }

    private updated():void {
        var d = new Date();
        this.last_update = d.toLocaleDateString() + " " + d.toLocaleTimeString();
    }
}
