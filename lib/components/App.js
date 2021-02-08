import React from "react";
import PropTypes from "prop-types";

export const App = ({ children, port }) => <app port={port}>{children}</app>;

App.propTypes = {
  port: PropTypes.number,
};
