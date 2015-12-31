import {Component, ViewEncapsulation} from "angular2/core";
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from "angular2/router";
// import {HTTP_PROVIDERS} from "angular2/http";

import {HomeCmp} from "../home/home";
import {AboutCmp} from "../about/about";
import {HealthOverviewCmp} from "../health/health_overview";

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
  { path: "/about", component: AboutCmp, as: "About" }
])
export class AppCmp {}
