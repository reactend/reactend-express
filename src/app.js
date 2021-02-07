import React from "react";
import { HomePage } from "./pages/HomePage";
import { ComponentsPage } from "./pages/ComponentsPage";
import ReactExpress from "./renderer";

const ExpressApp = () => (
  <app port={process.env.PORT || 8080}>
    <static publicPath="/public" />
    <router path="/">
      <get content={HomePage} />
      <router path="/components">
        <get content={ComponentsPage} />
      </router>
      <router path="/api">
        <post path="/status" content={{ msg: "It is okay, bro" }} />
      </router>
      <get path="*" content="Not Found" status={404} />
    </router>
  </app>
);

ReactExpress.render(<ExpressApp />);
