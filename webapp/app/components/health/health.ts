import {Component, View} from "angular2/core";
import {ServiceHealth} from "../../types/service_health";
import {NgClass} from "angular2/common";
import {RouterLink} from "angular2/router";

@Component({
    selector: "health",
    properties: ["state: state"]
})
@View({
    templateUrl: "./components/health/health.html",
    directives: [NgClass,RouterLink]
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
