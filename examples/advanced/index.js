import React from "react";
import { ReactXpress, App, Static, Router, Get } from "../../lib";
import { postHandler, postsHandler } from "./handlers";

const ExpressApp = () => (
  <App port={8080}>
    <Static publicPath="/public" />
    <Router path="/">
      <Get path="/posts" handler={postsHandler} />
      <Get path="/posts/:id" handler={postHandler} />
      <Get path="*" content="Not Found" status={404} />
    </Router>
  </App>
);

ReactXpress.render(<ExpressApp />);
