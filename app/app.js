import React from 'react';
import { resolve } from 'path';
import cors from 'cors';

import { registerApp, App, Static, Router, Get, Post, Res, Logger, Middleware } from '../src';
import { HomePage } from './pages/HomePage';
import { ComponentsPage } from './pages/ComponentsPage';

const isProd = process.env.NODE_ENV === 'production';

const ExpressApp = () => (
  <App port={process.env.PORT || 8080}>
    <Static publicPath="/../../public" />
    <Logger mode="dev" disabled={isProd} />
    <Middleware handler={cors()} />
    <Router path="/">
      <Get>
        <Res.Header name="Cache-Control" value="public, max-age=31557600" />
        <Res.Render component={HomePage} />
      </Get>
      <Get path="/components" render={ComponentsPage} />
      <Router path="/api">
        <Post
          path="/status"
          json={{ msg: 'It is okay, bro' }}
          handler={(req) => console.log(req.originalUrl)}
        />
      </Router>
      <Updates />
      <Get path="*" text="Not Found" status={404} />
    </Router>
  </App>
);

const Updates = () => (
  <>
    <Get path="/redirect">
      <Res.Redirect statusCode={301} path="https://ru.reactjs.org" />
    </Get>
    <Post path="/json">
      <Res.Status statusCode={401} />
      <Res.Content json={{ msg: 'No Access' }} contentType="application/json" />
    </Post>
    <Get path="/send-file">
      <Res.SendFile path={resolve('public/code-example.png')} onError={console.log} />
    </Get>
    <Get path="/render">
      <Res.Render component={() => <h1>Shut Up And Take My Money!</h1>} />
    </Get>
  </>
);

registerApp(ExpressApp);
