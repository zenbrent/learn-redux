import { createStore, combineReducers } from "redux";
// import { createStore, combineReducers } from "./reduxImplementation";

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

// todo: move this to an actual test...
const testStore = () => {
    // Even as more actions are added, existing code doesn't have to change.
    const store = createStore(todoApp);
    console.log("Initial state:");
    console.log(store.getState());
    console.log("----------------");

    console.log("Dispatching ADD_TODO");
    store.dispatch({
        type: "ADD_TODO",
        id: 0,
        text: "A todo!"
    });
    console.log("Current state:");
    console.log(store.getState());
    console.log("----------------");

    console.log("Dispatching TOGGLE_TODO:");
    store.dispatch({
        type: "TOGGLE_TODO",
        id: 0
    });
    console.log("Current state:");
    console.log(store.getState());
    console.log("----------------");

    console.log("Dispatching SET_VISIBILITY_FILTER:");
    store.dispatch({
        type: "SET_VISIBILITY_FILTER",
        filter: "SHOW_COMPLETED"
    });
    console.log("Current state:");
    console.log(store.getState());
    console.log("----------------");

    console.log("Dispatching :");
    store.dispatch({
        type: ""
    });
    console.log("Current state:");
    console.log(store.getState());
    console.log("----------------");
};
// testStore();

export { todos, todoApp };
