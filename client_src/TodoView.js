import React, {Component} from "react";

import {store} from "./todo";

let nextTodoId = 0;

class TodoApp extends Component {
    render () {
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
                <input ref={node => {
                    this.input = node;
                }} />
                <input type="submit" value="Add Todo" />
                <ul>
                    {this.props.todos.map(todo =>
                        <li key={todo.id}
                            onClick={() => {
                                store.dispatch({
                                    type: "TOGGLE_TODO",
                                    id: todo.id
                                });
                            }}
                            style={{
                                textDecoration: 
                                    todo.completed ?
                                    "line-through" :
                                    "none"
                            }}>
                            {todo.text}
                        </li>
                    )}
                </ul>
            </form>
        );
    }
}

// The root of the the Todo page.
export default React.createClass({
    getTodos () {
        return store.getState().todos;
    },

    componentDidMount () {
        store.subscribe(() => {
            this.setState({ value: this.getTodos() });
        });
    },

    getInitialState () {
        return {
            value: this.getTodos(),
        };
    },

    render () {
        return <TodoApp todos={ this.state.value } />
    }
});
