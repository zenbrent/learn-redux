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

export {Todo, TodoList};
