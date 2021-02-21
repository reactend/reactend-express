import React from 'react';
import PropTypes from 'prop-types';
import { Faker } from './Faker';

/**
 * @param {{ name: 'Accept-Patch' | 'Accept-Ranges' | 'Age' | 'Allow' | 'Alt-Svc' | 'Cache-Control' | 'Connection' | 'Content-Disposition' | 'Content-Encoding' | 'Content-Language' | 'Content-Length' | 'Content-Location' | 'Content-Range' | 'Content-Type' | 'Date' | 'Delta-Base' | 'ETag' | 'Expires' | 'IM' | 'Last-Modified' | 'Link' | 'Location' | 'Pragma' | 'Proxy-Authenticate' | 'Public-Key-Pins' | 'Retry-After' | 'Server' | 'Set-Cookie' | 'Strict-Transport-Security' | 'Trailer' | 'Transfer-Encoding' | 'Tk' | 'Upgrade' | 'Vary' | 'Via' | 'Warning' | 'WWW-Authenticate' | 'Content-Security-Policy' | 'Refresh' | 'X-Powered-By' | 'X-Request-ID' | 'X-UA-Compatible' | 'X-XSS-Protection' }} props
 */
const Header = ({ name, value }) => <param$ type="header" content={{ name, value }} />;

Header.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
};

const Render = ({ component }) => <param$ type="render" content={component} />;

Render.propTypes = {
  component: PropTypes.func,
};

const Content = ({ json, contentType, text }) => {
  const ComponentsArray = [];

  if (contentType)
    ComponentsArray.push(<param$ key="contentType" type="content-type" content={contentType} />);
  if (json) ComponentsArray.push(<param$ key="json" type="json" content={json} />);
  if (text) ComponentsArray.push(<param$ key="text" type="text" content={text} />);

  return ComponentsArray;
};

Content.propTypes = {
  json: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  contentType: PropTypes.string,
  text: PropTypes.string,
};

const Status = ({ statusCode }) => <param$ type="status" content={statusCode} />;
Status.propTypes = {
  statusCode: PropTypes.number,
};

const Redirect = ({ path, statusCode }) => (
  <param$ type="redirect" content={{ path, statusCode }} />
);

Redirect.propTypes = {
  path: PropTypes.string.isRequired,
  statusCode: PropTypes.number,
};

const SendFile = ({ path, options, onError = () => {} }) => (
  <param$ type="send-file" content={{ path, options, onError }} />
);

SendFile.propTypes = {
  path: PropTypes.string.isRequired,
  options: PropTypes.object,
  onError: PropTypes.func,
};

export const Res = {
  Header,
  Render,
  Content,
  Status,
  Redirect,
  SendFile,
  Faker,
};
