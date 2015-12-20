import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Link} from "react-router";

import "./index.css";

import {history} from "./history";

import Counter from "./pages/Counter";
import Todo from "./pages/Todo";

var Main = props => (
    <div className="main_view">
        {props.children}
    </div>
);

ReactDOM.render((
    <Router history={history}>
    <Route path="/" component={Main}>
    <Route path="/counter" component={Counter} />
    <Route path="/todo" component={Todo} />
    </Route>
    </Router>
), window["app-root"]);
