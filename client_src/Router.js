import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Link} from "react-router";

import "./index.css";

import {history} from "./history";

import counter from "./something";

var Main = props => (
    <div className="main_view">
        Main!
    </div>
);

ReactDOM.render((
    <Router history={history}>
        <Route path="*" component={Main} />
    </Router>
), window["app-root"]);
