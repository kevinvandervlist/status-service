import {Component} from "angular2/core";
import {HealthService} from "../../services/health_service";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {Response} from "angular2/http";
import {ServiceHealth} from "../../types/service_health";
import {HealthCmp} from "./health";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {BasePollCmp} from "./../../util/base_poll_component";

@Component({
    directives: [HealthCmp],
    selector: "health-overview",
    providers: [HealthService],
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: "./components/health/health_overview.html"
})
export class HealthOverviewCmp extends BasePollCmp {
    states:Array<ServiceHealth> = [];
    hasError:boolean;

    constructor(public health:HealthService) {
        super(10000);
        this.hasError = false;
        let provider = () => {
            return health.all().toArray();
        };
        this.subscription = this.poll(provider)
            .subscribe(
                (svcs:Array<ServiceHealth>) => {
                    this.states = svcs;
                },
                (e:any) => {
                    console.error(e);
                    this.hasError = true;
                }
            );
    }
}
