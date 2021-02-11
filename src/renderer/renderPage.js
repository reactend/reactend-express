import React from 'react';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';

import { ReqResContext } from '../context';

export function renderPage(Component, ctx, options) {
  const { appHOC, renderHTML } = options;
  const sheet = new ServerStyleSheet();
  const root = renderToString(
    sheet.collectStyles(
      <ReqResContext.Provider value={ctx}>{appHOC(Component)}</ReqResContext.Provider>
    )
  );

  const styles = sheet.getStyleTags();
  const helmet = Helmet.renderStatic();
  const head = [helmet.title, helmet.meta, helmet.link].map((h) => h.toString()).join('\n');

  return renderHTML({ head, styles, root });
}
