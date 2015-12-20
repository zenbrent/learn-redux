import React, {Component} from "react";

import {store} from "./todo";

let nextTodoId = 0;

class TodoApp extends Component {
    render () {
        return (
            <div>
                <input ref={node => {
                    this.input = node;
                }} />
                <button onClick={() => {
                    store.dispatch({
                        type: "ADD_TODO",
                        text: this.input.value,
                        id: nextTodoId++
                    });
                    this.input.value = "";
                }}>Add Todo</button>
                <ul>
                    {this.props.todos.map(todo =>
                        <li key={todo.id}>
                            {todo.text}
                        </li>
                    )}
                </ul>
            </div>
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
