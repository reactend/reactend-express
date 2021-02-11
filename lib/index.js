'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var ReactReconciler = require('react-reconciler');
var express = require('express');
var path = require('path');
var server = require('react-dom/server');
var reactHelmet = require('react-helmet');
var styledComponents = require('styled-components');
var PropTypes = require('prop-types');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
var ReactReconciler__default = /*#__PURE__*/ _interopDefaultLegacy(ReactReconciler);
var express__default = /*#__PURE__*/ _interopDefaultLegacy(express);
var PropTypes__default = /*#__PURE__*/ _interopDefaultLegacy(PropTypes);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m', // Scarlet
  },
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m',
  },
};
var libName = '⚡️react-end';
function log(type, msg) {
  switch (type) {
    case 'success':
      console.log(
        ''
          .concat(colors.fg.blue)
          .concat(colors.bright, '[')
          .concat(libName, '] ')
          .concat(msg)
          .concat(colors.reset)
      );
      break;

    case 'warn':
      console.log(
        ''.concat(colors.fg.yellow, '[').concat(libName, '] ').concat(msg).concat(colors.reset)
      );
      break;

    default:
      console.log('['.concat(libName, '] ').concat(msg));
      break;
  }
}

var ReqResContext = React.createContext({
  req: null,
  res: null,
});

function renderPage(Component, ctx, options) {
  var { appHOC, renderHTML } = options;
  var sheet = new styledComponents.ServerStyleSheet();
  var root = server.renderToString(
    sheet.collectStyles(
      /*#__PURE__*/ React__default['default'].createElement(
        ReqResContext.Provider,
        {
          value: ctx,
        },
        appHOC(Component)
      )
    )
  );
  var styles = sheet.getStyleTags();
  var helmet = reactHelmet.Helmet.renderStatic();
  var head = [helmet.title, helmet.meta, helmet.link].map((h) => h.toString()).join('\n');
  return renderHTML({
    head,
    styles,
    root,
  });
}

function paramfn(sq, req, res, next, options) {
  var _loop = function _loop(param) {
    switch (param.type) {
      case 'header':
        res.setHeader(param.content.name, param.content.value);
        break;

      case 'json':
        res.send(param.content);
        break;

      case 'text':
        res.send(param.content);
        break;

      case 'status':
        res.statusCode = param.content;
        break;

      case 'contentType':
        res.setHeader('Content-Type', param.content);
        break;

      case 'redirect':
        if (param.content.statusCode) res.redirect(param.content.statusCode, param.content.path);
        else res.redirect(param.content.path); // res.end();

        break;

      case 'render':
        res.send(
          renderPage(
            param.content,
            {
              req,
              res,
            },
            options
          )
        );
        break;

      case 'send-file':
        res.sendFile(param.content.path, param.content.options, (err) => {
          if (err) {
            param.content.onError(err);
            next();
          }
        });
        break;
    }
  };

  // eslint-disable-next-line no-restricted-syntax
  for (var param of sq) {
    _loop(param);
  }
}

function generateRoute(router, props) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  router[props.method](
    props.path || '/',
    ...[
      ...(props.middlewares || []),
      /*#__PURE__*/ (function () {
        var _ref = _asyncToGenerator(function* (req, res, next) {
          if (props.paramsSeq) {
            paramfn(props.paramsSeq, req, res, next, options);
          }

          if (props.handler)
            yield props.handler(req, res, next, (Component) =>
              renderPage(Component, {
                req,
                res,
              })
            );
        });

        return function (_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      })(),
    ]
  );
}

var renderHTML = (_ref) => {
  var { head, styles, root } = _ref;
  return '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    '
    .concat(head, '\n    ')
    .concat(styles, '\n  </head>\n  <body>\n    <div id="root">\n      ')
    .concat(root, '\n    </div>\n  </body>\n</html>\n');
};

var options = {
  appHOC: (Component) => /*#__PURE__*/ React__default['default'].createElement(Component, null),
  renderHTML,
};
var reconciler = ReactReconciler__default['default']({
  getRootHostContext(rootContainerInstance) {},

  getChildHostContext(parentHostContext, type, rootContainerInstance) {},

  getPublicInstance(instance) {},

  prepareForCommit(containerInfo) {},

  resetAfterCommit(containerInfo) {},

  createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    if (type === 'app') {
      var app = express__default['default']();
      app.use(express__default['default'].json());
      app.use(
        express__default['default'].urlencoded({
          extended: true,
        })
      );
      app.listen(props.port || 8080, () =>
        log('success', 'app is running on '.concat(props.port || 8080))
      );
      return app;
    }

    if (type === 'router') {
      var router = express__default['default'].Router({
        caseSensitive: !!props.caseSensitive,
        mergeParams: !!props.mergeParams,
        strict: !!props.strict,
      });
      return {
        routerInstance: router,
        path: props.path,
      };
    }

    if (type === 'route') {
      var paramsSeq = [];
      return {
        type,
        props: _objectSpread2(
          _objectSpread2({}, props),
          {},
          {
            paramsSeq,
          }
        ),
      };
    }

    if (type === 'param') {
      return {
        type,
        props,
      };
    }

    if (type === 'static') {
      return {
        path: props.path,
        static: express__default['default'].static(
          path.join(__dirname, props.publicPath),
          props.options
        ),
      };
    } // eslint-disable-next-line react/destructuring-assignment

    if (type === 'logger') {
      return {
        type,
        props,
      };
    }

    return null;
  },

  appendInitialChild(parentInstance, child) {
    if (child.routerInstance) {
      if (parentInstance.routerInstance) {
        parentInstance.routerInstance.use(child.path || '/', child.routerInstance);
      } else {
        parentInstance.use(child.path || '/', child.routerInstance);
      }

      return;
    }

    if (child.type === 'route') {
      generateRoute(parentInstance.routerInstance, child.props, options);
      return;
    }

    if (child.type === 'param') {
      parentInstance.props.paramsSeq.push(child.props);
    }

    if (child.static) {
      parentInstance.use(...(child.path ? [child.path, child.static] : [child.static]));
      return;
    }

    if (child.type === 'logger') {
      if (!child.props.disabled) {
        parentInstance.use(child.props.use);
      }

      return;
    }
  },

  finalizeInitialChildren(instance, type, props, rootContainerInstance, hostContext) {},

  prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, hostContext) {},

  shouldSetTextContent(type, props) {},

  shouldDeprioritizeSubtree(type, props) {},

  createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
    return text;
  },

  now: null,
  isPrimaryRenderer: true,
  scheduleDeferredCallback: '',
  cancelDeferredCallback: '',
  supportsMutation: true,

  commitMount(instance, type, newProps, internalInstanceHandle) {},

  commitUpdate(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) {},

  resetTextContent(instance) {},

  commitTextUpdate(textInstance, oldText, newText) {},

  appendChild(parentInstance, child) {},

  appendChildToContainer(container, child) {
    if (child.type === 'app');
  },

  insertBefore(parentInstance, child, beforeChild) {},

  insertInContainerBefore(container, child, beforeChild) {},

  removeChild(parentInstance, child) {},

  removeChildFromContainer(container, child) {},

  clearContainer(container, child) {},
});
var registerApp = function registerApp(App) {
  var custom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options;
  options = _objectSpread2(_objectSpread2({}, options), custom);
  log('success', 'starting...');
  var container = reconciler.createContainer(null, false, false);
  reconciler.updateContainer(
    /*#__PURE__*/ React__default['default'].createElement(App, null),
    container,
    null,
    null
  );
};

var App = (_ref) => {
  var { children, port } = _ref;
  return /*#__PURE__*/ React__default['default'].createElement(
    'app',
    {
      port: port,
    },
    children
  );
};
App.propTypes = {
  port: PropTypes__default['default'].number,
  children: PropTypes__default['default'].node,
};

var Static = (_ref) => {
  var { publicPath, path, options } = _ref;
  return /*#__PURE__*/ React__default['default'].createElement('static', {
    publicPath: publicPath,
    path: path,
    options: options,
  });
};
Static.propTypes = {
  publicPath: PropTypes__default['default'].string.isRequired,
  path: PropTypes__default['default'].string,
  options: PropTypes__default['default'].object,
};

var Router = (_ref) => {
  var { path, caseSensitive, mergeParams, strict, children } = _ref;
  return /*#__PURE__*/ React__default['default'].createElement(
    'router',
    {
      path: path,
      caseSensitive: !!caseSensitive,
      mergeParams: !!mergeParams,
      strict: !!strict,
    },
    children
  );
};
Router.propTypes = {
  path: PropTypes__default['default'].string.isRequired,
  caseSensitive: PropTypes__default['default'].bool,
  mergeParams: PropTypes__default['default'].bool,
  strict: PropTypes__default['default'].bool,
  children: PropTypes__default['default'].node,
};

/**
 * @param {{ name: 'Accept-Patch' | 'Accept-Ranges' | 'Age' | 'Allow' | 'Alt-Svc' | 'Cache-Control' | 'Connection' | 'Content-Disposition' | 'Content-Encoding' | 'Content-Language' | 'Content-Length' | 'Content-Location' | 'Content-Range' | 'Content-Type' | 'Date' | 'Delta-Base' | 'ETag' | 'Expires' | 'IM' | 'Last-Modified' | 'Link' | 'Location' | 'Pragma' | 'Proxy-Authenticate' | 'Public-Key-Pins' | 'Retry-After' | 'Server' | 'Set-Cookie' | 'Strict-Transport-Security' | 'Trailer' | 'Transfer-Encoding' | 'Tk' | 'Upgrade' | 'Vary' | 'Via' | 'Warning' | 'WWW-Authenticate' | 'Content-Security-Policy' | 'Refresh' | 'X-Powered-By' | 'X-Request-ID' | 'X-UA-Compatible' | 'X-XSS-Protection' }} props
 */

var Header = (_ref) => {
  var { name, value } = _ref;
  return /*#__PURE__*/ React__default['default'].createElement('param', {
    type: 'header',
    content: {
      name,
      value,
    },
  });
};

Header.propTypes = {
  name: PropTypes__default['default'].string.isRequired,
  value: PropTypes__default['default'].any,
};

var Render = (_ref2) => {
  var { component } = _ref2;
  return /*#__PURE__*/ React__default['default'].createElement('param', {
    type: 'render',
    content: component,
  });
};

Render.propTypes = {
  component: PropTypes__default['default'].func,
};

var Content = (_ref3) => {
  var { json, contentType, text } = _ref3;
  var ComponentsArray = [];
  if (contentType)
    ComponentsArray.push(
      /*#__PURE__*/ React__default['default'].createElement('param', {
        key: 'contentType',
        type: 'content-type',
        content: contentType,
      })
    );
  if (json)
    ComponentsArray.push(
      /*#__PURE__*/ React__default['default'].createElement('param', {
        key: 'json',
        type: 'json',
        content: json,
      })
    );
  if (text)
    ComponentsArray.push(
      /*#__PURE__*/ React__default['default'].createElement('param', {
        key: 'text',
        type: 'text',
        content: text,
      })
    );
  return ComponentsArray;
};

Content.propTypes = {
  json: PropTypes__default['default'].oneOfType([
    PropTypes__default['default'].object,
    PropTypes__default['default'].array,
  ]),
  contentType: PropTypes__default['default'].string,
  text: PropTypes__default['default'].string,
};

var Status = (_ref4) => {
  var { statusCode } = _ref4;
  return /*#__PURE__*/ React__default['default'].createElement('param', {
    type: 'status',
    content: statusCode,
  });
};

Status.propTypes = {
  statusCode: PropTypes__default['default'].number,
};

var Redirect = (_ref5) => {
  var { path, statusCode } = _ref5;
  return /*#__PURE__*/ React__default['default'].createElement('param', {
    type: 'redirect',
    content: {
      path,
      statusCode,
    },
  });
};

Redirect.propTypes = {
  path: PropTypes__default['default'].string.isRequired,
  statusCode: PropTypes__default['default'].number,
};

var SendFile = (_ref6) => {
  var { path, options, onError = () => {} } = _ref6;
  return /*#__PURE__*/ React__default['default'].createElement('param', {
    type: 'send-file',
    content: {
      path,
      options,
      onError,
    },
  });
};

SendFile.propTypes = {
  path: PropTypes__default['default'].string.isRequired,
  options: PropTypes__default['default'].object,
  onError: PropTypes__default['default'].func,
};
var Res = {
  Header,
  Render,
  Content,
  Status,
  Redirect,
  SendFile,
};

var BaseRoute = (method) => {
  var RouteComponent = (_ref) => {
    var { children, path, handler, render, status, json, text } = _ref;
    return /*#__PURE__*/ React__default['default'].createElement(
      'route',
      {
        method: method,
        path: path,
        handler: handler,
      },
      children,
      render &&
        /*#__PURE__*/ React__default['default'].createElement(Res.Render, {
          component: render,
        }),
      status &&
        /*#__PURE__*/ React__default['default'].createElement(Res.Status, {
          statusCode: status,
        }),
      text &&
        /*#__PURE__*/ React__default['default'].createElement(Res.Content, {
          text: text,
        }),
      json &&
        /*#__PURE__*/ React__default['default'].createElement(Res.Content, {
          json: json,
        })
    );
  };

  RouteComponent.propTypes = {
    path: PropTypes__default['default'].string,
    handler: PropTypes__default['default'].func,
    render: PropTypes__default['default'].func,
    status: PropTypes__default['default'].number,
    json: PropTypes__default['default'].any,
    text: PropTypes__default['default'].string,
  };
  return RouteComponent;
};

var Get = BaseRoute('get');
var Post = BaseRoute('post');
var Put = BaseRoute('put');
var Head = BaseRoute('head');
var Delete = BaseRoute('delete');
var Options = BaseRoute('options');
var Trace = BaseRoute('trace');
var Copy = BaseRoute('copy');
var Lock = BaseRoute('lock');
var Mkcol = BaseRoute('mkcol');
var Move = BaseRoute('move');
var Purge = BaseRoute('purge');
var Propfind = BaseRoute('propfind');
var Proppatch = BaseRoute('proppatch');
var Unlock = BaseRoute('unlock');
var Report = BaseRoute('report');
var Mkactivity = BaseRoute('mkactivity');
var Checkout = BaseRoute('checkout');
var Merge = BaseRoute('merge');
var Msearch = BaseRoute('m-search');
var Notify = BaseRoute('notify');
var Subscribe = BaseRoute('subscribe');
var Unsubscribe = BaseRoute('unsubscribe');
var Patch = BaseRoute('patch');
var Search = BaseRoute('search');
var Connect = BaseRoute('connect');

var Logger = (_ref) => {
  var { use, disabled } = _ref;
  return /*#__PURE__*/ React__default['default'].createElement('logger', {
    use: use,
    disabled: disabled,
  });
};
Logger.propTypes = {
  use: PropTypes__default['default'].func.isRequired,
  disabled: PropTypes__default['default'].bool,
};

exports.App = App;
exports.Checkout = Checkout;
exports.Connect = Connect;
exports.Copy = Copy;
exports.Delete = Delete;
exports.Get = Get;
exports.Head = Head;
exports.Lock = Lock;
exports.Logger = Logger;
exports.Merge = Merge;
exports.Mkactivity = Mkactivity;
exports.Mkcol = Mkcol;
exports.Move = Move;
exports.Msearch = Msearch;
exports.Notify = Notify;
exports.Options = Options;
exports.Patch = Patch;
exports.Post = Post;
exports.Propfind = Propfind;
exports.Proppatch = Proppatch;
exports.Purge = Purge;
exports.Put = Put;
exports.Report = Report;
exports.ReqResContext = ReqResContext;
exports.Res = Res;
exports.Router = Router;
exports.Search = Search;
exports.Static = Static;
exports.Subscribe = Subscribe;
exports.Trace = Trace;
exports.Unlock = Unlock;
exports.Unsubscribe = Unsubscribe;
exports.registerApp = registerApp;
