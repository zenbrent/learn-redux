import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Link} from "react-router";

import "./index.css";

import {history} from "./history";

import Counter from "./Counter";

var Main = props => (
    <div className="main_view">
        {props.children}
    </div>
);

ReactDOM.render((
    <Router history={history}>
    <Route path="/" component={Main}>
    <Route path="/counter" component={Counter} />
    </Route>
    </Router>
), window["app-root"]);
