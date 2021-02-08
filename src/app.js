import React from "react";
import { HomePage } from "./pages/HomePage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { ReactXpress, App, Static, Router, Get, Post } from "../lib";

const ExpressApp = () => (
  <App port={process.env.PORT || 8080}>
    <Static publicPath="/public" />
    <Router path="/">
      <Get content={HomePage} />
      <Router path="/components">
        <Get content={ComponentsPage} />
      </Router>
      <Router path="/api">
        <Post path="/status" content={{ msg: "It is okay, bro" }} />
      </Router>
      <Get path="*" content="Not Found" status={404} />
    </Router>
  </App>
);

ReactXpress.render(<ExpressApp />);
