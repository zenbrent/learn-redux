import React, {Component} from "react";

import {store} from "./todo";

let nextTodoId = 0;


// Presentational components: they don't do anything, they just show things.
const Todo = ({
    onClick,
    completed, text
}) => (
    <li onClick={onClick}
        style={{
            textDecoration: 
                completed ?
                "line-through" :
                "none"
        }}>
        {text}
    </li>
);

const TodoList = ({
    todos,
    onTodoClick
}) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
                />
        )}
    </ul>
);

const FilterLink = ({
    filter,
    currentFilter,
    children
}) =>  {
    if (filter === currentFilter) {
        return <span>{children}</span>
    }
    return (
        <a href="#"
            onClick={e => {
                e.preventDefault();
                store.dispatch({
                    type: "SET_VISIBILITY_FILTER",
                    filter
                });
            }}
        >
            {children}
        </a>
    );
};

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

class TodoApp extends Component {
    render () {
        const {
            todos,
            visibilityFilter
        } = this.props;

        const visibleTodos = getVisibleTodos(
            todos,
            visibilityFilter
        );

        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                store.dispatch({
                    type: "ADD_TODO",
                    text: this.input.value,
                    id: nextTodoId++
                });
                this.input.value = "";
            }}>
                <input ref={node => { this.input = node; }} />
                <input type="submit" value="Add Todo" />
                <p>
                    Show: {" "}
                    <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter}>All</FilterLink> {", "}
                    <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter}>Active</FilterLink> {", "}
                    <FilterLink filter="SHOW_COMPLETED" currentFilter={visibilityFilter}>Completed</FilterLink>
                </p>
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={id =>
                        store.dispatch({
                            type: "TOGGLE_TODO",
                            id
                        })
                    } />
            </form>
        );
    }
}

// The root of the the Todo page.
export default React.createClass({
    getTodos () {
        return store.getState();
    },

    componentDidMount () {
        store.subscribe(() => {
            this.setState({ appState: this.getTodos() });
        });
    },

    getInitialState () {
        return {
            appState: this.getTodos(),
        };
    },

    render () {
        return <TodoApp {...this.state.appState} />
    }
});
