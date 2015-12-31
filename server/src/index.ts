/// <reference path="typings/tsd.d.ts"/>
import express = require("express");
import * as health from "./routes/health";
import * as graph from "./routes/graph";

var port = 3000;

var app:express.Application = express();

//app.use("/", express.static("webapp/dist/"));

app.use("/api/health", health.Router());
app.use("/api/graph", graph.Router());

app.use(express.static("../webapp/dist/"));

app.use((req:express.Request, res:express.Response) => {
    res.status(404).send("Url " + req.url + " not found.");
});

var server = app.listen(port, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Listening at http://%s:%s", host, port);
});
