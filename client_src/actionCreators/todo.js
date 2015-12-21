let nextTodoId = 0;

const addTodo = (text) => {
    return {
        type: "ADD_TODO",
        id: nextTodoId++,
        text
    }
}

const setVisibilityFilter = (filter) => {
    return {
        type: "SET_VISIBILITY_FILTER",
        filter
    };
};

const toggleTodo = (id) => {
    return {
        type: "TOGGLE_TODO",
        id
    };
};

const removeTodo = (id) => {
    return {
        type: "REMOVE_TODO",
        id
    };
};

export {
    addTodo,
    removeTodo,
    setVisibilityFilter,
    toggleTodo
};
