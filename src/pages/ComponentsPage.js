import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { BaseLayout } from "../components/layout/BaseLayout";

export const ComponentsPage = () => {
  return (
    <BaseLayout>
      <Helmet>
        <title>ReactXpress | Components</title>
      </Helmet>
      <Wrapper>
        <h1>Components</h1>
        <p>
          <p>
            <span>{`<app />`}</span> - App Instance (props: port)
          </p>
          <p>
            <span>{`<static />`}</span> - Static route (props: publicPath, path,
            options)
          </p>
          <p>
            <span>{`<router />`}</span> - Router-Provider (props: path)
          </p>
          <p>
            <span>{`<get />, <post /> and ...`}</span> - Route component (props:
            path, content, handler, status)
          </p>
        </p>
        <br />
        <code>Sorry for this, better page is in process...</code>
      </Wrapper>
    </BaseLayout>
  );
};

const Wrapper = styled.div`
  h1 {
    margin: 10px 0;
  }
  p {
    margin-bottom: 10px;
  }
  p span {
    color: ${(props) => props.theme.colors.brandLight};
  }
`;

const Content = styled.div``;
