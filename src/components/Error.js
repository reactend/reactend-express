import React from 'react';
import PropTypes from 'prop-types';

const isDev = process.env.NODE_ENV !== 'production';
const color = '#83CD29';
const msgStyle = { backgroundColor: '#222', color, padding: 5, borderRadius: 4, fontSize: 15 };

export const Error = ({ title, msg, error }) => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      position: 'fixed',
      top: 0,
      left: 0,
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: '50vh',
        left: '50vw',
        transform: 'translate(-50%, -50%)',
        width: 'fit-contents',
        height: 'auto',
        padding: 10,
        border: `2px solid ${color}`,
        borderRadius: 8,
        fontFamily: 'sans-serif',
        boxShadow: `0 2px 1px rgba(0,0,0,0.02), 
      0 4px 2px rgba(255,0,0,0.02), 
      0 8px 4px rgba(255,0,0,0.02), 
      0 16px 8px rgba(255,0,0,0.02),
      0 32px 16px rgba(255,0,0,0.02)`,
      }}
    >
      <h2 style={{ color, margin: 0, marginBottom: 10 }}>{title || '🐛 Reactend Error'}</h2>
      {isDev && (
        <>
          <code style={msgStyle}>{msg}</code>
          <br />
          <b style={{ color, marginBottom: 5 }}>message:</b>
          {error.message && <code style={msgStyle}>{error.message}</code>}
          <br />
          <b style={{ color, marginBottom: 5 }}>stack:</b>
          {error.stack && <code style={msgStyle}>{error.stack}</code>}
        </>
      )}
    </div>
  </div>
);

Error.propTypes = {
  title: PropTypes.string,
  msg: PropTypes.string.isRequired,
  error: PropTypes.any,
};
