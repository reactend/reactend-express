import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { Helmet } from "react-helmet";
import { context } from "../context";

const sheet = new ServerStyleSheet();

function renderPage(Component, req, res) {
  const app = renderToString(
    sheet.collectStyles(
      <context.Provider value={{ req, res }}>
        <Component />
      </context.Provider>
    )
  );
  const styleTags = sheet.getStyleTags();
  const helmet = Helmet.renderStatic();

  const html = `
    <!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
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

export function generateRoute(parentInstance, method, props) {
  parentInstance.routerInstance[method](
    props.path || "/",
    ...[
      ...(props.middlewares || []),
      async (req, res, next) => {
        if (props.content) {
          if (props.status) res.status(props.status);
          if (typeof props.content === "function") {
            renderPage(props.content, req, res);
          } else {
            res.send(props.content);
          }
        }
        if (props.handler)
          await props.handler(req, res, next, (Component) =>
            renderPage(Component, req, res)
          );
      },
    ]
  );
}
