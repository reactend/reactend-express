import React from "react";
import { ReactXpress, App, Static, Router, Get } from "../../lib";

const ExpressApp = () => (
  <App port={8080}>
    <Static publicPath="/public" />
    <Router path="/">
      <Get
        content={() => (
          <div>
            <h1>Hello World</h1>
          </div>
        )}
      />
      <Get path="*" content="Not Found" status={404} />
    </Router>
  </App>
);

ReactXpress.render(<ExpressApp />);
