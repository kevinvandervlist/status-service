import {Component} from "angular2/core";
import {RouterLink} from "angular2/router";

@Component({
    directives: [RouterLink],
    selector: "home",
    templateUrl: "./components/home/home.html",
    styleUrls: ["./components/home/home.css"]
})
export class HomeCmp {
}
