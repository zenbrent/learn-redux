/**
 * Set up static routes.
 */

import compose from "koa-compose";
import fs from "fs";
import mount from "koa-mount";
import serve from "koa-static";
import {join} from "path";

var readFile = src => new Promise((resolve, reject) => {
    fs.readFile(src, {'encoding': 'utf8'}, (err, data) => {
        if (err) return void reject(err);
        resolve(data);
    });
});

let getPath = (...segments) => join(__dirname, "..", ...segments);

export function staticResources () {
    return compose([
        mount("/static", serve(getPath("client_dist"), {
            index: "index.html"
        })),
        mount("/static", serve(getPath("client_src", "static")))
    ]);
};

export var defaultRoute = [{
    method: "get",
    route: "/*",
    handler: function *() {
        this.body = yield readFile(getPath("client_dist", "index.html"));
    }
}];
