import {Component, View} from "angular2/core";
import {ServiceHealth} from "../../types/service_health";

@Component({
    selector: "health",
    properties: ["state: state"]
})
@View({
    templateUrl: "./components/health/health.html"
})
export class HealthCmp {
    state:ServiceHealth
}
