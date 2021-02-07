# ReactXpress

**React renderer to build Node.js server** <br/>
DEMO - [click here](https://react-xpress-demo.herokuapp.com)
<br />

![Planet Express](https://seeklogo.com/images/P/Planet_Express-logo-584A6A9A38-seeklogo.com.png)

### Why?

It's the only crazy idea to use React to structure Backend on Node.js.
<br />

### How it works?

It works with express.js framework to run Node.js server. Custom renderer we have is building express structure app from React Components.
<br />

### Code Example

```js
import React from "react";
import ReactExpress from "./renderer";

const HomePage = () => <h1>Welcome to home page</h1>;
const AboutPage = () => <><h1>About Company</h1><p>Bla bla</p></>;

const ExpressApp = () => (
  <app port={8080}>
    <router path="/">
      <get content={<HomePage />} />
      <get path="*" content="Not Found" status={404} />
    </router>
    <router path="/company">
      <get path="/about" content={<AboutPage />} />
    </router>
    <router path="/api">
      <post path="/status" content={{ msg: "It is okay, bro" }} />
    </router>
  </app>
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
