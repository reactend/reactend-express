import React from 'react';
import chalk from 'chalk';
import { replaceValues } from '../utils/propsUtil';
import { renderPage } from './renderPage';
import { log } from './helpers';
import { ErrorMsg } from '../components/Error';
import { typeormParams } from './typeormParams';

async function paramfn(sq, req, res, next, options) {
  // eslint-disable-next-line no-restricted-syntax
  for (const param of sq) {
    switch (param.type) {
      case 'console.log': {
        const colors = [
          'black',
          'red',
          'green',
          'yellow',
          'blue',
          'magenta',
          'cyan',
          'white',
          'blackBright',
          'redBright',
          'greenBright',
          'yellowBright',
          'blueBright',
          'magentaBright',
          'cyanBright',
          'whiteBright',
        ];

        const bgColors = [
          'bgBlack',
          'bgRed',
          'bgGreen',
          'bgYellow',
          'bgBlue',
          'bgMagenta',
          'bgCyan',
          'bgWhite',
          'bgBlackBright',
          'bgRedBright',
          'bgGreenBright',
          'bgYellowBright',
          'bgBlueBright',
          'bgMagentaBright',
          'bgCyanBright',
          'bgWhiteBright',
        ];

        if (!!param.content.color && !colors.includes(param.content.color))
          throw new Error(`Wrong color value. Available colors: ${colors.join(', ')}`);
        if (!!param.content.bgColor && !bgColors.includes(param.content.bgColor))
          throw new Error(`Wrong background color value. Available colors: ${bgColors.join(', ')}`);

        const logContent =
          typeof param.content.children === 'function'
            ? param.content.children(req)
            : param.content.children;
        const key1 = param.content.color;
        const key2 = param.content.bgColor;

        if (!!key1 && !!key2) {
          console.log(chalk[key1][key2](logContent));
        } else if (key1) {
          console.log(chalk[key1](logContent));
        } else if (key2) {
          console.log(chalk[key2](logContent));
        } else {
          console.log(logContent);
        }
        break;
      }
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
        res.send(renderPage(param.content, { req, res }, options));
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
        break;
    }

    if (param.type.includes('typeorm')) {
      typeormParams(param, req, res);
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
            await props.handler(req, res, next, (Component) =>
              renderPage(Component, { req, res }, options)
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
                renderPage(() => <ErrorMsg msg={msg} error={error} />, { req, res }, options)
              );
            } else {
              res.end(msg);
            }
          }

        if (props.paramsSeq && !res.writableEnded) {
          paramfn(props.paramsSeq, req, res, next, options);
        }
      },
    ]
  );
}
