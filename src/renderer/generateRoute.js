import { renderPage } from './renderPage';

function paramfn(sq, req, res, next, options) {
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
    }
  }
}

export function generateRoute(router, props, options = {}) {
  router[props.method](
    props.path || '/',
    ...[
      ...(props.middlewares || []),
      async (req, res, next) => {
        if (props.paramsSeq) {
          paramfn(props.paramsSeq, req, res, next, options);
        }

        if (props.handler)
          await props.handler(req, res, next, (Component) => renderPage(Component, { req, res }));
      },
    ]
  );
}
