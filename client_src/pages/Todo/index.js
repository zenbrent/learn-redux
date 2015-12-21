import React, {Component} from "react";

import { todoApp } from "../../todo";
import { AddTodo } from "./AddTodo";
import { VisibleTodoList } from "./Todo";
import { Footer } from "./Footer";
import { createStore } from "redux";
import { Provider } from "react-redux";

// General approach:
// Extract presentational components
// If there is too much boilerplate passing props through,
//     then create containers around them that load the data and specify the behavior.
const TodoApp = () => (
    <div>
        <AddTodo />
        <Footer />
        <VisibleTodoList />
    </div>
);

// Provider is a "wormhole" from the Provider component to all the children views.
// Context should usually only be used for dependency injection.

// The root of the the Todo page.
export default () => (
    <Provider store={createStore(todoApp)}>
        <TodoApp />
    </Provider>
);
