/// <reference path="../typings/tsd.d.ts"/>
import express = require("express");
import {ServiceHealth,Service,AllServices} from "../services/service";
import {ServerError} from "../util/server";
import {Observable} from "@reactivex/rxjs";
import {InterweaveOperator} from "../util/interweave";

export function Router():express.Router {
    var r:express.Router = express.Router();

    r.get("/all", allServiceState);
    r.get("/:name", singleServiceState);

    return r;
}

function allServiceState(req:express.Request, res:express.Response):void {
    new AllServices()
        .observe()
        .flatMap((s:Service) => {
            return s.single();
        })
        .map((h:ServiceHealth) => {
            return JSON.stringify(h);
        })
        .lift(new InterweaveOperator(",\n"))
        .subscribe(
            (h:ServiceHealth) => {
                if (!res.headersSent) {
                    res.setHeader("Transfer-Encoding", "chunked");
                    res.write("[");
                }
                res.write(h);
            },
            (e:any) => {
                if (!res.headersSent) {
                    res = res.status(500);
                }
                var err:ServerError = new ServerError(e);
                console.log(err.toString());
                res.send(err);
            },
            () => {
                res.write("]");
                res.end();
            }
        );
}

function singleServiceState(req:express.Request, res:express.Response):void {
    new Service(req.params.name)
        .single()
        .subscribe(
            (h:ServiceHealth) => {
                res.send(h);
            },
            (e:any) => {
                res.status(500).send(new ServerError(e));
            }
        );
}

