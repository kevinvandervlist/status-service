/// <reference path="../typings/tsd.d.ts"/>
import express = require('express');
import {ServiceHealth,Service,AllServices} from '../services/service';
import {ServerError} from '../util/http';

export function Router():express.Router {
    var r:express.Router = express.Router();

    r.get('/all', allServiceState);
    r.get('/:name', singleServiceState);

    return r;
}

function allServiceState(req:express.Request, res:express.Response):void {
    AllServices().flatMap((s: Service) => {
        return s.single();
    }).subscribe(
        (h:ServiceHealth) => {
            res.write(h);
        },
        (e:any) => {
            res.status(500).send(new ServerError(e));
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

