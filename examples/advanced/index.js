import React from "react";
import ReactExpress from "../../src/renderer";
import { postHandler, postsHandler } from "./handlers";

const ExpressApp = () => (
  <app port={8080}>
    <static publicPath="/public" />
    <router path="/">
      <get path="/posts" handler={postsHandler} />
      <get path="/posts/:id" handler={postHandler} />
      <get path="*" content="Not Found" status={404} />
    </router>
  </app>
);

ReactExpress.render(<ExpressApp />);
