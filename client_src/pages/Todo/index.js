import React, {Component} from "react";

import { todoApp } from "../../todo";
import { VisibleTodoList } from "./Todo";
import { FilterLink } from "./FilterLink";
import { createStore } from "redux";
import { Provider } from "react-redux";

let nextTodoId = 0;

const Footer = () => (
    <p>
        Show: {" "}
        <FilterLink filter="SHOW_ALL">All</FilterLink> {", "}
        <FilterLink filter="SHOW_ACTIVE">Active</FilterLink> {", "}
        <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
    </p>
)
Footer.contextTypes = {
    store: React.PropTypes.object
};

// 2nd argument in a functional component is the context.
let AddTodo = ({ dispatch }) => {
    let input;
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            dispatch({
                type: "ADD_TODO",
                id: nextTodoId++,
                text: input.value
            })
            input.value = "";
        }}>
            <input ref={node => { input = node; }} />
            <input type="submit" value="Add Todo" />
        </form>
    );
}
AddTodo = connect()(AddTodo);

// AddTodo = connect(
//     // there are no props that depend on the current state. Null tells it to not subscribe to the store.
//     null,
//     null // defaults to: dispatch => ({ dispatch })
// )(AddTodo);


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
