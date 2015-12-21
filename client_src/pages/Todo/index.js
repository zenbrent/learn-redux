import React, {Component} from "react";

import {todoApp} from "../../todo";
import {TodoList} from "./Todo";
import {FilterLink} from "./FilterLink";
import { createStore } from "redux";

let nextTodoId = 0;

const Footer = ({ store }) => (
    <p>
        Show: {" "}
        <FilterLink filter="SHOW_ALL" store={store}>All</FilterLink> {", "}
        <FilterLink filter="SHOW_ACTIVE" store={store}>Active</FilterLink> {", "}
        <FilterLink filter="SHOW_COMPLETED" store={store}>Completed</FilterLink>
    </p>
)

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case "SHOW_ALL":
            return todos;
        case "SHOW_COMPLETED":
            return todos.filter(t => t.completed);
        case "SHOW_ACTIVE":
            return todos.filter(t => !t.completed);
    }
}

const AddTodo = ({ store }) => {
    let input;
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            store.dispatch({
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

class VisibleTodoList extends Component {
    componentDidMount () {
        const { store } = this.props;
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render () {
        const props = this.props;
        const { store } = props;
        const state = store.getState();

        return (
            <TodoList
                todos={
                    getVisibleTodos(
                        state.todos,
                        state.visibilityFilter
                    )
                }
                onTodoClick={id =>
                    store.dispatch({
                        type: "TOGGLE_TODO",
                        id
                    })
                }
            />
        );
    }
}

// General approach:
// Extract presentational components
// If there is too much boilerplate passing props through,
//     then create containers around them that load the data and specify the behavior.
const TodoApp = ({ store }) => (
    <div>
        <AddTodo store={store} />
        <Footer store={store} />
        <VisibleTodoList store={store} />
    </div>
);

// The root of the the Todo page.
export default () => <TodoApp store={createStore(todoApp)} />;
