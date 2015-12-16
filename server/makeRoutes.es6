import Router from "koa-router";
import R from "ramda";

// Set up the routes based on an array of route definition objects.
export default function makeRouterFromSpec(routeList) {
    let router = new Router();
    routeList.map(({method, route, handler, middleware = []}) => {
        // koa-router can talke multiple middlewares per route. This builds an array of middlewares from the spec.
        let handlers = [];

        // handler and middleware can be a single generator function or an array of generators.
        if (!Array.isArray(middleware)) middleware = [middleware];
        if (!Array.isArray(handler)) handler = [handler];

        handlers = handlers.concat(middleware, handler);
        router[method](route, ...handlers);
    });
    return router.middleware();
};
