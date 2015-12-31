import {Component} from "angular2/core";
import {HealthService} from "../../services/health_service";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {Response} from "angular2/http";
import {ServiceHealth} from "../../types/service_health";
import {HealthCmp} from "./health";

@Component({
    directives: [HealthCmp],
    selector: "health-overview",
    providers: [HealthService],
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: "./components/health/health_overview.html"
})
export class HealthOverviewCmp {
    states:Array<HealthCmp> = [];
    hasError:boolean;

    constructor(public health:HealthService) {
        this.hasError = false;
        health.all()
            .toArray().subscribe(
            (svcs:Array<HealthCmp>) => {
                this.states = svcs;
            },
            (e:any) => {
                console.error(e);
                this.hasError = true;
            }
        );
    }
}
