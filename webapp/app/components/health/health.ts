import {Component, View} from "angular2/core";
import {ServiceHealth} from "../../types/service_health";

@Component({
    selector: "health"
})
@View({
    templateUrl: "./components/health/health.html"
})
export class HealthCmp {
    constructor(public state:ServiceHealth) {
    }
}
