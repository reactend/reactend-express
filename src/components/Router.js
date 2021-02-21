import React from 'react';
import PropTypes from 'prop-types';

export const Router = ({ path, caseSensitive, mergeParams, strict, children }) => (
  <router$
    path={path}
    caseSensitive={!!caseSensitive}
    mergeParams={!!mergeParams}
    strict={!!strict}
  >
    {children}
  </router$>
);

Router.propTypes = {
  path: PropTypes.string.isRequired,
  caseSensitive: PropTypes.bool,
  mergeParams: PropTypes.bool,
  strict: PropTypes.bool,
  children: PropTypes.node,
};
