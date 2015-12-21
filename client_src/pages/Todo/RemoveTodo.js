import { connect } from "react-redux";
import React from "react";

import { removeTodo } from "../../actionCreators/todo";

const Button = ({
    id,
    dispatch,
    children
}) =>  {
    return (
        <input
            type="button"
            value="Delete"
            onClick={() => {
                dispatch(removeTodo(id))
            }}
        />
    );
}

const Remove = connect()(Button);

export { Remove };
