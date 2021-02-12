# Reactend / Express

React-like http-server on Nodejs<br/>

### 🕹 [Playground on repl.it](https://repl.it/@orkhanjafarov/reactend-playground?v=1)

### 📄 [Reactend Template](https://github.com/gigantz/reactend-template)

<br />

![Planet Express](./logo.svg)
<br/>

## Why?

It's the only crazy idea to use React to structure Backend on Node.js.
<br /><br />

## How it works?

It works with express.js framework to run Node.js server. Custom renderer we have is building express structure app from React Components.
<br /><br />

## Get started

Run this to create reactend project on your local machine

```
npx create-reactend my-app
```

<br />

## Code Example

```js
import React from 'react';
import { resolve } from 'path';

import { registerApp, App, Static, Router, Get, Post, Res, Logger } from '@reactend/express';

const ExpressApp = () => (
  <App port={process.env.PORT || 8080}>
    <Static publicPath="/public" />
    <Logger mode="dev" />
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
      <Get path="*" text="Not Found" status={404} />
    </Router>
  </App>
);
```

<br />

## You can use this way too

```js
import cors from 'cors';
<Middleware handler={cors()} />;
```

```js
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
```

<br/>

## Components

_This minor description for now (Docs is on the way)_<br/><br/>
`<App />` - App Instance (props: port) <br />
`<Static />` - Static route (props: publicPath, path, options) <br />
`<Router />` - Router-Provider (props: path) <br />
`<Get />, <Post /> and ...` - Route component (props: path, content, <br />handler, status) <br />
`<Middleware />` - Middleware (props: handler) <br />
`<Logger />` - morgan logger (props: mode, disabled) <br />
`<Res />` - Response components <br />
`<Res.Render />` - Render (props: component) <br />
`<Res.Content />` - Response send (props: json, text, contentType) <br />
`<Res.Status />` - Response Status (props: statusCode) <br />
`<Res.SendFile />` - Response Send File (props: path, options, <br />onError) <br />
`<Res.Redirect />` - Redirect (props: path, statusCode) <br />
<br />
<br />

---

## Contact me

Email me if you have any idea and you would like to be contributor [orkhanjafarovr@gmail.com](mailto:orkhanjafarovr@gmail.com)

Cheers ✨
