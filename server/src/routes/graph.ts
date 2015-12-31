/// <reference path="../typings/tsd.d.ts"/>
import express = require("express");
import {ServiceHealth,Service,AllServices} from "../services/service";
import {ServerError} from "../util/server";
import {Observable,ConnectableObservable} from "@reactivex/rxjs";
import {Edge,edgelist} from "../graph/graphbuilder";
import {Headers} from "request";

export function Router():express.Router {
    var r:express.Router = express.Router();

    r.get("/", dependencyGraph);

    return r;
}

export interface DependencyGraph {
    nodes: Array<ServiceHealth>;
    edges: Array<Edge>;
}

function dependencyGraph(req:express.Request, res:express.Response):void {
    var health:Observable<ServiceHealth> = new AllServices()
        .observe()
        .flatMap((s:Service) => {
            return s.single();
        });

    var edges:Observable<Array<Edge>> = edgelist(health)
        .reduce((acc:Array<Edge>, e:Edge):Array<Edge> => {
            acc.push(e);
            return acc;
        }, []);
    var nodes:Observable<Array<ServiceHealth>> = health
        .reduce((acc:Array<ServiceHealth>, s:ServiceHealth):Array<ServiceHealth> => {
            acc.push(s);
            return acc;
        }, []);

    Observable
        .zip(nodes, edges, (n:Array<ServiceHealth>, e:Array<Edge>) => {
            return <DependencyGraph> {
                nodes: n,
                edges: e,
            };
        })
        .subscribe(
            (d:DependencyGraph) => {
                res.send(d);
            },
            (e:any) => {
                res.status(500).send(new ServerError(e));
            }
        );
}
