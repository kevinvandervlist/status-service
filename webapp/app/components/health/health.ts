import {Component} from "angular2/core";
import {HealthService} from "../../services/health_service";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {Response} from "angular2/http";
import {ServiceHealth} from "../../types/service_health";

@Component({
    selector: "health",
    providers: [HealthService],
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: "./components/health/health.html"
})
export class HealthCmp {
    states:Array<ServiceHealth> = [];
    hasError:boolean;

    constructor(public health:HealthService) {
        this.hasError = false;
        health.all().toArray().subscribe(
            (svcs:Array<ServiceHealth>) => {
                this.states = svcs;
                console.log(this.states);
            },
            (e:any) => {
                console.error(e);
                this.hasError = true;
            }
        );
    }
}
