# React-end

React http-server based on Express.js
<br />

![Planet Express](public/logo.svg)

## Install

`npm i --save @react-end/express`

### Why?

It's the only crazy idea to use React to structure Backend on Node.js.
<br />

### How it works?

It works with express.js framework to run Node.js server. Custom renderer we have is building express structure app from React Components.
<br />

### Code Example

```js
import React from 'react';
import { registerApp, App, Static, Router, Get, Post, Res } from '@react-end/express';

const HomePage = () => <h1>Home page</h1>;
const AboutPage = () => <h1>About Page</h1>;

const ExpressApp = () => (
  <App port={process.env.PORT || 8080}>
    <Static publicPath="/public" />
    <Router path="/">
      <Get render={HomePage} />
      <Get path="/about" render={AboutPage} />
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

registerApp(ExpressApp);
```

<br />

## You can use this way too

```js
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
```

### Components

`<App />` - App Instance (props: port)
`<Static />` - Static route (props: publicPath, path, options)
`<Router />` - Router-Provider (props: path)
`<Get />, <Post /> and ...` - Route component (props: path, content, handler, status)
`<Res />` - Response components
`<Res.Render />` - Render (props: component)
`<Res.Content />` - Response send (props: json, text, contentType)
`<Res.Status />` - Response Status (props: statusCode)
`<Res.SendFile />` - Response Send File (props: path, options, onError)
`<Res.Redirect />` - Redirect (props: path, statusCode)
<br />
<br />

### Contact me

Email me if you have any idea and you would like to be contributor [orkhanjafarovr@gmail.com](mailto:orkhanjafarovr@gmail.com)
