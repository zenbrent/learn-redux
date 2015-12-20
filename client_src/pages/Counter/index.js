import React from "react";

import {store} from "../../simpleCounter";
window.store = store;

// "Dump component": it doesn't have any business logic, it only shows the current application state.
// Callbacks are just tied to event handlers.
var Counter = ({
        value,
        onIncrement,
        onDecrement
    }) => (
    <div>
        Some value! 
        {value}
        <div>
            <input type="button" value="-" onClick={onDecrement} />
            <input type="button" value="+" onClick={onIncrement} />
        </div>
    </div>
);

// The root of the the Counter page.
export default React.createClass({
    componentDidMount () {
        const render = () => void this.setState({ value: store.getState() });
        store.subscribe(render);
    },

    getInitialState () {
        return {
            value: store.getState(),
        };
    },
    render () {
        return <Counter
            value={ store.getState() }
            onIncrement={ () => store.dispatch({ type: "INCREMENT" }) }
            onDecrement={ () => store.dispatch({ type: "DECREMENT" }) } />
    }
});
