import React from "react";
import { ReactXpress, App, Static, Router, Get } from "../../lib";

const ExpressApp = () => (
  <App port={8080}>
    <Static publicPath="/public" />
    <Router path="/">
      <Get
        render={() => (
          <div>
            <h1>Hello World</h1>
          </div>
        )}
      />
      <Get path="*" text="Not Found" status={404} />
    </Router>
  </App>
);

ReactXpress.render(<ExpressApp />);
