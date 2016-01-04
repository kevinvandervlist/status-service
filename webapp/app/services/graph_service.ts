import {Http} from "angular2/http";
import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {ServiceHealth} from "../types/service_health";
import {Response} from "angular2/http";
import {HealthCmp} from "../components/health/health";
import {DependencyGraph} from "../types/dependency_graph";
import {Edge} from "../types/edge";
import {Dependency} from "angular2/core";

@Injectable()
export class GraphService {
    url:string;

    constructor(public http:Http) {
        this.url = "/api/graph/";
    }

    read():Observable<DependencyGraph> {
        return this.http
            .get(this.url)
            .map((res:Response) => res.json())
            .flatMap((e:any) => {
                return Observable.zip(
                    Observable
                        .fromArray(e.nodes)
                        .map((x:any) => {
                            // todo: reuse with lift after let
                            return <ServiceHealth> {
                                ServiceName: x.ServiceName,
                                Hostname: x.Hostname,
                                State: x.State,
                                Version: x.Version,
                                Timestamp: x.Timestamp,
                                Dependencies: x.Dependencies,
                            };
                        })
                        .toArray(),
                    Observable
                        .fromArray(e.edges)
                        .map((x:any) => {
                            return <Edge> {
                                from: x.from,
                                to: x.to,
                            };
                        })
                        .toArray(),
                    (nodes:Array<ServiceHealth>, edges:Array<Edge>) => {
                        return <DependencyGraph> {
                            nodes: nodes,
                            edges: edges,
                        }
                    }
                )
            });
    }
}
