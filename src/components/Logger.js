import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {{
 *  mode: 'skip' | 'stream' | 'combined' | 'common' | 'dev' | 'short' | 'tiny'
 *  disabled: Boolean
 * }} props
 */
export const Logger = ({ mode, disabled }) => <logger$ mode={mode} disabled={disabled} />;
Logger.propTypes = {
  mode: PropTypes.oneOf(['skip', 'stream', 'combined', 'common', 'dev', 'short', 'tiny'])
    .isRequired,
  disabled: PropTypes.bool,
};
