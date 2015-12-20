import { createStore, combineReducers } from "redux";

/**
 * Reducer composition:  Different reducers specify how different parts of the
 * state tree are updated in response to actions.
 */

// reducer for a single item
const todo = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case "TOGGLE_TODO":
            if (state.id !== action.id) {
                return state;
            } else {
                return {
                    ...state,
                    completed: !state.completed
                };
            }
        default:
            return state;
    }
};

// reducer for a list of items
const todos = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [ ...state, todo(undefined, action) ];
        case "TOGGLE_TODO":
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.filter;
        default:
            return state;
    }
}

// Build a more general app store using reducer composition that includes the different subdomains.
// Pass actions on to them.
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const store = createStore(todoApp);

export { store, todos };
