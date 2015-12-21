import React, {Component} from "react";

import {store} from "../../todo";
import {TodoList} from "./Todo";

let nextTodoId = 0;

const FilterLink = ({
    filter,
    currentFilter,
    onClick,
    children
}) =>  {
    if (filter === currentFilter) {
        return <span>{children}</span>
    }
    return (
        <a href="#"
            onClick={e => {
                e.preventDefault();
                onClick(filter);
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

const AddTodo = ({onAddClick}) => {
    let input;
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onAddClick(input.value);
            input.value = "";
        }}>
            <input ref={node => { input = node; }} />
            <input type="submit" value="Add Todo" />
        </form>
    );
}

const Footer = ({
    visibilityFilter,
    onFilterClick
}) => (
    <p>
        Show: {" "}
        <FilterLink
            filter="SHOW_ALL"
            currentFilter={visibilityFilter}
            onClick={onFilterClick}>All</FilterLink> {", "}
        <FilterLink
            filter="SHOW_ACTIVE"
            currentFilter={visibilityFilter}
            onClick={onFilterClick}>Active</FilterLink> {", "}
        <FilterLink
            filter="SHOW_COMPLETED"
            currentFilter={visibilityFilter}
            onClick={onFilterClick}>Completed</FilterLink>
    </p>
)

const TodoApp = ({ todos, visibilityFilter }) => (
    <div>
        <AddTodo
        onAddClick={text => store.dispatch({
            type: "ADD_TODO",
            id: nextTodoId++,
            text
        })} />
        <Footer
            visiblityFilter={visibilityFilter}
            onFilterClick={filter => store.dispatch({
                type: "SET_VISIBILITY_FILTER",
                filter
            })} />
        <TodoList
            todos={getVisibleTodos(
                todos,
                visibilityFilter
            )}
            onTodoClick={id =>
                store.dispatch({
                    type: "TOGGLE_TODO",
                    id
                })
            } />
    </div>
);

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
