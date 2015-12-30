import {Http} from "angular2/http";
import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {ServiceHealth} from "../types/service_health";
import {Response} from "angular2/http";
@Injectable()
export class HealthService {
    constructor(public http:Http) {
    }

    all():Observable<ServiceHealth> {
        return this.one("all");
    }

    one(name:string):Observable<ServiceHealth> {
        var raw:Observable<any> = this.http
            .get("/api/health/" + name)
            .map((res:Response) => res.json())
            .flatMap((x:any) => Observable.fromArray(x));
        return this.transform(raw);
    }

    private transform(obs:Observable<any>):Observable<ServiceHealth> {
        // TODO: let
        return obs.map((x:any) => {
            return <ServiceHealth> {
                ServiceName: x.ServiceName,
                Hostname: x.Hostname,
                Version: x.Version,
                Timestamp: x.Timestamp,
                Dependencies: x.Dependencies,
            };
        });
    }
}
