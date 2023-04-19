import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Head } from '../components';
import { Error } from '../components/Error';

import { ReqResContext } from '../context';
import { log } from './helpers';

export async function renderPage(Component, ctx, options) {
  try {
    const { appHOC, renderHTML } = options;
    const PrenderedComponent = await Component({ ctx });

    const sheet = new ServerStyleSheet();
    const root = renderToString(
      sheet.collectStyles(
        <ReqResContext.Provider value={ctx}>
          {appHOC(() => PrenderedComponent)}
        </ReqResContext.Provider>
      )
    );

    const styles = sheet.getStyleTags();
    const helmet = Head.renderStatic();
    const head = [helmet.title, helmet.meta, helmet.link].map((h) => h.toString()).join('\n');

    return renderHTML({ head, styles, root });
  } catch (error) {
    const msg = `Error while rendering React DOM Component at "${ctx.req.originalUrl}" path`;
    log('error', msg);

    ctx.res.end(await renderPage(() => <Error msg={msg} error={error} />, ctx, options));
    return false;
  }
}
