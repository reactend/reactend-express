import React from 'react';
import PropTypes from 'prop-types';

export const Static = ({ publicPath, path, options }) => (
  <static$ publicPath={publicPath} path={path} options={options} />
);

Static.propTypes = {
  publicPath: PropTypes.string.isRequired,
  path: PropTypes.string,
  options: PropTypes.object,
};
