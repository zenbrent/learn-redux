import { createStore } from "redux";

// The reducer
const counter = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT": return state + 1;
        case "DECREMENT": return state - 1;
        default: return state;
    }
}

// Create a store with counter as the reducer that says
// how state is updated with actions.
const store = createStore(counter);

export {counter};
export {store};
