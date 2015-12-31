import {Component, ViewEncapsulation} from "angular2/core";
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from "angular2/router";
// import {HTTP_PROVIDERS} from "angular2/http";

import {HomeCmp} from "../home/home";
import {HealthOverviewCmp} from "../health/health_overview";
import {SingleServiceHealthCmp} from "../health/single_service_health";
import {GraphCmp} from "../graph/graph";

@Component({
  selector: "app",
  viewProviders: [],
  templateUrl: "./components/app/app.html",
  styleUrls: ["./components/app/app.css"],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: "/", component: HomeCmp, as: "Home" },
  { path: "/health", component: HealthOverviewCmp, as: "Health" },
  { path: "/health/:name", component: SingleServiceHealthCmp, as: "SingleHealth" },
  { path: "/graph", component: GraphCmp, as: "Graph"}
])
export class AppCmp {}
