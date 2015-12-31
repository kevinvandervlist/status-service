import {Component, View} from "angular2/core";
import {ServiceHealth} from "../../types/service_health";
import {NgClass} from "angular2/common";

@Component({
    selector: "health",
    properties: ["state: state"]
})
@View({
    templateUrl: "./components/health/health.html",
    directives: [NgClass]
})
export class HealthCmp {
    state:ServiceHealth;

    status():string {
        return this.state.State;
    }
    isHealthy():boolean {
        return this.status() === "ok";
    }
    name():string {
        return this.state.ServiceName;
    }
    version():string {
        return this.state.Version;
    }
}
