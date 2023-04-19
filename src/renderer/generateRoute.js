/* eslint-disable no-return-await */
import React from 'react';
import { replaceValues } from '../utils/propsUtil';
import { renderPage } from './renderPage';
import { log } from './helpers';
import { Error } from '../components/Error';

async function paramfn(sq, req, res, next, options) {
  // eslint-disable-next-line no-restricted-syntax
  for (const param of sq) {
    switch (param.type) {
      case 'header':
        res.setHeader(param.content.name, param.content.value);
        break;
      case 'json':
        res.send(param.content);
        break;
      case 'text':
        res.send(replaceValues(req, param.content));
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
        // res.end();
        break;
      case 'render':
        // eslint-disable-next-line no-await-in-loop
        res.send(await renderPage(param.content, { req, res }, options));
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

export function generateRoute(router, props, options = {}) {
  router[props.method](
    props.path || '/',
    ...[
      ...(props.middlewares || []),
      async (req, res, next) => {
        if (props.handler)
          try {
            await props.handler(
              req,
              res,
              next,
              async (Component) => await renderPage(Component, { req, res }, options)
            );
          } catch (error) {
            const msg = `Error in the handler passed to this route <${props.method[0].toUpperCase()}${props.method.slice(
              1
            )} path="${props.path || '/'}">`;

            log('error', msg);

            res.writableEnded = true;
            res.statusCode = 500;
            if (props.method === 'get') {
              res.end(
                await renderPage(() => <Error msg={msg} error={error} />, { req, res }, options)
              );
            } else {
              res.end(msg);
            }
          }

        if (props.paramsSeq && !res.writableEnded) {
          await paramfn(props.paramsSeq, req, res, next, options);
        }
      },
    ]
  );
}
