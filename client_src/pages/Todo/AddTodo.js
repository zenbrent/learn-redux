import { connect } from "react-redux";
import React from "react";

import { addTodo } from "../../actionCreators/todo";

// 2nd argument in a functional component is the context.
let AddTodo = ({ dispatch }) => {
    let input;
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(addTodo(input.value))
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

export { AddTodo };
