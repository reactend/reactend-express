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
import React from "react";
import { ReactXpress, App, Static, Router, Get, Post } from "../lib";

const HomePage = () => <h1>Welcome to home page</h1>;
const AboutPage = () => <h1>About Company</h1>;

const ExpressApp = () => (
  <App port={8080}>
    <Static publicPath="/public" />
    <Router path="/">
      <Get content={<HomePage />} />
      <Get path="*" content="Not Found" status={404} />
    </Router>
    <Router path="/company">
      <Get path="/about" content={<AboutPage />} />
    </Router>
    <Router path="/api">
      <Post path="/status" content={{ msg: "It is okay, bro" }} />
    </Router>
  </App>
);

ReactExpress.render(<ExpressApp />);
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
