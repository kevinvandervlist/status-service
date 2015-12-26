/// <reference path="../typings/tsd.d.ts"/>
import {ServiceHealth} from "../services/service";
import {ServerError} from "../util/server";
import {Observable,ConnectableObservable} from "@reactivex/rxjs";

export interface Edge {
    from: string;
    to: string;
}

export function edgelist(src:Observable<ServiceHealth>):Observable<Edge> {
    return src
        .map((h:ServiceHealth) => {
            h.Hostname = h.ServiceName.toLowerCase();
            h.Dependencies = h.Dependencies.map((s:string) => s.toLowerCase());
            return h;
        })
        .flatMap((h:ServiceHealth) => {
            return Observable
                .fromArray(h.Dependencies)
                .map((s:string) => {
                    return <Edge>{
                        from: h.Hostname,
                        to: s
                    };
                });
        });
}
