import Immutable from "immutable";
import { createStore } from "redux";

const todos = (_state = [], action) => {
    let state = Immutable.List(_state);
    switch (action.type) {
        case "ADD_TODO":
            return state.push({
                id: action.id,
                text: action.text,
                completed: false
            });
        default:
            return Immutable.List();
    }
};

export { todos };
