import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';
import { ReqResContext } from '../context';

const sheet = new ServerStyleSheet();

function renderPage(Component, req, res) {
  const app = renderToString(
    sheet.collectStyles(
      <ReqResContext.Provider value={{ req, res }}>
        <Component />
      </ReqResContext.Provider>
    )
  );
  const styleTags = sheet.getStyleTags();
  const helmet = Helmet.renderStatic();

  const html = `
    <!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${styleTags}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="root">
          ${app}
        </div>
        </body>
    </html>
  `;

  res.send(html);
}

function paramfn(sq, req, res, next) {
  // eslint-disable-next-line no-restricted-syntax
  for (const param of sq) {
    switch (param.type) {
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
        else res.redirect(param.content.path);
        res.end();
        break;
      case 'render':
        renderPage(param.content, req, res);
        break;
      case 'send-file':
        res.sendFile(param.content.path, param.content.options, (err) => {
          if (err) {
            param.content.onError(err);
            next();
          }
        });
        break;
      default:
    }
  }
}

export function generateRoute(parentInstance, props) {
  parentInstance.routerInstance[props.method](
    props.path || '/',
    ...[
      ...(props.middlewares || []),
      async (req, res, next) => {
        if (props.paramsSeq) {
          paramfn(props.paramsSeq, req, res, next);
        }

        if (props.handler)
          await props.handler(req, res, next, (Component) => renderPage(Component, req, res));
      },
    ]
  );
}
