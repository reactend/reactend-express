# ReactXpress

**React renderer to build Node.js server**
<br />

![Planet Express](public/logo.svg)

### Why?

It's the only crazy idea to use React to structure Backend on Node.js.
<br />

### How it works?

It works with express.js framework to run Node.js server. Custom renderer we have is building express structure app from React Components.
<br />

### Code Example

```js
import React from 'react';
import { resolve } from 'path';
import { ReactXpress, App, Static, Router, Get, Post, Res } from '../lib';

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

// Updates! 🤩
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

ReactXpress.render(<ExpressApp />);

```

### How to use

1. Clone the repo
2. `npm install`
3. Run dev mode - `npm run dev`
4. Do all changes in `./src` folder as it's not library yet.

### Components

`<app />` - App Instance (props: port)
<br/>
`<static />` - Static route (props: publicPath, path, options)
<br/>
`<router />` - Router-Provider (props: path)
<br/>
`<get />, <post /> and ...` - Route component (props: path, content, handler, status)
<br />
<br />

### What is planning?

I work on it and I'm trying to improve it, even it's not a good idea to use this kinda renderer for real-world app. But It would be awesome to have contributors to make its DX much better.

### Contact me

Email me if you have any idea and you would like to be contributor [orkhanjafarovr@gmail.com](mailto:orkhanjafarovr@gmail.com)

Resources: <br/>
https://dev.to/orkhanjafarovr/express-in-react-react-backend-whut-4lkg
