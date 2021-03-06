import koa from "koa";
import {join} from "path";

import {staticResources, defaultRoute} from "./static";

import makeRouter from "./makeRoutes";

var app = koa();

// logger
app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(staticResources());

// Add the routes
app.use(makeRouter(defaultRoute));

export var app;

export default function (port = 3000) {
    app.listen(port);
    console.log("server listening on localhost:3000");
}
