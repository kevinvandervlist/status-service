import {Component} from "angular2/core";
import {RouterLink} from "angular2/router";
import {GraphService} from "../../services/graph_service";
import {Observable} from "rxjs/Observable";
import {BasePollCmp} from "../../util/base_poll_component";
import {DependencyGraph} from "../../types/dependency_graph";

@Component({
    directives: [RouterLink],
    selector: "graph",
    templateUrl: "./components/graph/graph.html"
})
export class GraphCmp extends BasePollCmp {
    hasError:boolean;
    graph:DependencyGraph;

    constructor(public graph_service:GraphService) {
        super(15000);
        this.hasError = false;
        let provider = () => {
            return graph_service.read();
        };
        this.subscription = this.poll(provider)
            .subscribe(
                (g:DependencyGraph) => {
                    console.log(g);
                    this.graph = g;
                },
                (e:any) => {
                    console.error(e);
                    this.hasError = true;
                }
            );
    }
}
