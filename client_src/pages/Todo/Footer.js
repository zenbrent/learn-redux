import React from "react";

import { FilterLink } from "./FilterLink";

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

export { Footer };
