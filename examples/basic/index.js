import React from "react";
import ReactExpress from "./src/renderer";

const ExpressApp = () => (
  <app port={8080}>
    <static publicPath="/public" />
    <router path="/">
      <get
        content={() => (
          <div>
            <h1>Hello World</h1>
          </div>
        )}
      />
      <get path="*" content="Not Found" status={404} />
    </router>
  </app>
);

ReactExpress.render(<ExpressApp />);
