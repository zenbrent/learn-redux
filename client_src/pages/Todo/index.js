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

const TodoApp = ({ todos, visibilityFilter }) => (
    <div>
        <AddTodo
        onAddClick={text => store.dispatch({
            type: "ADD_TODO",
            id: nextTodoId++,
            text
        })} />
        <Footer />
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
    componentDidMount () {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    },

    componentWillUnmount () {
        this.unsubscribe();
    },

    render () {
        return <TodoApp {...store.getState()} />
    }
});
