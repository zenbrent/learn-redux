import React, {Component} from "react";
import {store} from "../../todo";

// Link only specifies the appearance of the component.
const Link = ({
    active,
    onClick,
    children
}) =>  {
    if (active) {
        return <span>{children}</span>
    }
    return (
        <a href="#"
            onClick={e => {
                e.preventDefault();
                onClick();
            }} >
            {children}
        </a>
    );
};

// Specifies the actual behavior of the component.
export class FilterLink extends Component {
    componentDidMount () {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const { store } = this.context;
        const state = store.getState();

        return (
            <Link
                active={ props.filter === state.visibilityFilter }
                onClick={() => 
                    store.dispatch({
                        type: "SET_VISIBILITY_FILTER",
                        filter: props.filter
                    })
                }
            >
                {props.children}
            </Link>
        );
    }
}
FilterLink.contextTypes = {
    store: React.PropTypes.object
};
