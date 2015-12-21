import React, {Component} from "react";

import {store} from "../../todo";
import {TodoList} from "./Todo";
import {FilterLink} from "./FilterLink";

let nextTodoId = 0;

const Footer = () => (
    <p>
        Show: {" "}
        <FilterLink filter="SHOW_ALL">All</FilterLink> {", "}
        <FilterLink filter="SHOW_ACTIVE">Active</FilterLink> {", "}
        <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
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

const AddTodo = () => {
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
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render () {
        const props = this.props;
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
const TodoApp = () => (
    <div>
        <AddTodo />
        <Footer />
        <VisibleTodoList />
    </div>
);

// The root of the the Todo page.
export default () => <TodoApp />;
