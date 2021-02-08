import React from 'react';
import PropTypes from 'prop-types';

const Render = ({ component }) => <param type="render" content={component} />;

Render.propTypes = {
  component: PropTypes.func,
};

const Content = ({ json, contentType, text }) => {
  const ComponentsArray = [];

  if (contentType)
    ComponentsArray.push(<param key="contentType" type="content-type" content={contentType} />);
  if (json) ComponentsArray.push(<param key="json" type="json" content={json} />);
  if (text) ComponentsArray.push(<param key="text" type="text" content={text} />);

  return ComponentsArray;
};

Content.propTypes = {
  json: PropTypes.any,
  contentType: PropTypes.string,
  text: PropTypes.string,
};

const Status = ({ statusCode }) => <param type="status" content={statusCode} />;

Status.propTypes = {
  statusCode: PropTypes.number,
};

const Redirect = ({ path, statusCode }) => <param type="redirect" content={{ path, statusCode }} />;

Redirect.propTypes = {
  path: PropTypes.string.isRequired,
  statusCode: PropTypes.number,
};

const SendFile = ({ path, options, onError = () => {} }) => (
  <param type="send-file" content={{ path, options, onError }} />
);

SendFile.propTypes = {
  path: PropTypes.string.isRequired,
  options: PropTypes.object,
  onError: PropTypes.func,
};

export const Res = {
  Render,
  Content,
  Status,
  Redirect,
  SendFile,
};
