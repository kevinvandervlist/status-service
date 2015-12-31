import {Http} from "angular2/http";
import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {ServiceHealth} from "../types/service_health";
import {Response} from "angular2/http";
import {HealthCmp} from "../components/health/health";

@Injectable()
export class HealthService {
    base:string;

    constructor(public http:Http) {
        this.base = "/api/health/";
    }

    all():Observable<ServiceHealth> {
        return this.transform(this
            .doRequest(this.base + "all")
            .flatMap((x:any) => Observable.fromArray(x)));
    }

    one(name:string):Observable<ServiceHealth> {
        return this.transform(this
            .doRequest(this.base + name));
    }

    private doRequest(endpoint:string):Observable<any> {
        return this.http
            .get(endpoint)
            .map((res:Response) => res.json())
    }

    private transform(obs:Observable<any>):Observable<ServiceHealth> {
        // TODO: let
        return obs.map((x:any) => {
            return <ServiceHealth> {
                ServiceName: x.ServiceName,
                Hostname: x.Hostname,
                State: x.State,
                Version: x.Version,
                Timestamp: x.Timestamp,
                Dependencies: x.Dependencies,
            };
        });
    }
}
