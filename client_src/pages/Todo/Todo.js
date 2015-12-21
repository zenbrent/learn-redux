import { connect } from "react-redux";
import React from "react";

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

// mapStateToProps and mapDispatchToProps describe a container
// component so well that it can be generated.
const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: id => dispatch({
            type: "TOGGLE_TODO",
            id
        })
    }
}
const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList); // Curried function, call it with the presentational component
             // that you wanted to wrap and pass the props to.

export { VisibleTodoList };
