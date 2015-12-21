import React, {Component} from "react";

import { todoApp } from "../../todo";
import { TodoList } from "./Todo";
import { FilterLink } from "./FilterLink";
import { createStore } from "redux";
import { Provider } from "react-redux";

let nextTodoId = 0;

const Footer = () => (
    <p>
        Show: {" "}
        <FilterLink filter="SHOW_ALL">All</FilterLink> {", "}
        <FilterLink filter="SHOW_ACTIVE">Active</FilterLink> {", "}
        <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
    </p>
)
Footer.contextTypes = {
    store: React.PropTypes.object
};

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

// 2nd argument in a functional component is the context.
const AddTodo = (props, { store }) => {
    let input;
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            store.dispatch({
                type: "ADD_TODO",
                id: nextTodoId++,
                text: input.value
            })
            input.value = "";
        }}>
            <input ref={node => { input = node; }} />
            <input type="submit" value="Add Todo" />
        </form>
    );
}
AddTodo.contextTypes = {
    store: React.PropTypes.object
};

class VisibleTodoList extends Component {
    componentDidMount () {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render () {
        const props = this.props;
        const { store } = this.context;
        const state = store.getState();

        return (
            <TodoList
                todos={
                    getVisibleTodos(
                        state.todos,
                        state.visibilityFilter
                    )
                }
                onTodoClick={id =>
                    store.dispatch({
                        type: "TOGGLE_TODO",
                        id
                    })
                }
            />
        );
    }
}
VisibleTodoList.contextTypes = {
    store: React.PropTypes.object
};

// General approach:
// Extract presentational components
// If there is too much boilerplate passing props through,
//     then create containers around them that load the data and specify the behavior.
const TodoApp = () => (
    <div>
        <AddTodo />
        <Footer />
        <VisibleTodoList />
    </div>
);

// Provider is a "wormhole" from the Provider component to all the children views.
// Context should usually only be used for dependency injection.

// The root of the the Todo page.
export default () => (
    <Provider store={createStore(todoApp)}>
        <TodoApp />
    </Provider>
);
