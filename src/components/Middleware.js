import React from 'react';
import PropTypes from 'prop-types';

export const Middleware = ({ handler }) => <middleware handler={handler} />;
Middleware.propTypes = {
  handler: PropTypes.func.isRequired,
};
