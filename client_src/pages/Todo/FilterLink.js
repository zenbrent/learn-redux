import React, {Component} from "react";
import { connect } from "react-redux";

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

const mapStateToProps = (
    state,
    ownProps
) => {
    return {
        active: ownProps.filter === state.visibilityFilter 
    };
};

const mapDispatchToProps = (
    dispatch,
    ownProps
) => {
    return {
        onClick: () => dispatch({
            type: "SET_VISIBILITY_FILTER",
            filter: ownProps.filter
        })
    };
};

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);

export { FilterLink };
