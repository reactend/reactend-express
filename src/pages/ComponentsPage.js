import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { BaseLayout } from '../components/layout/BaseLayout';

export const ComponentsPage = () => (
  <BaseLayout>
    <Helmet>
      <title>ReactXpress | Components</title>
    </Helmet>
    <Wrapper>
      <p>
        <span>{`<App />`}</span> - App Instance (props: port)
      </p>
      <p>
        <span>{`<Static />`}</span> - Static route (props: publicPath, path, options)
      </p>
      <p>
        <span>{`<Router />`}</span> - Router-Provider (props: path)
      </p>
      <p>
        <span>{`<Get />, <Post /> and ...`}</span> - Route component (props: path, content, handler,
        status)
      </p>
      <p>
        <span>{`<Res />`}</span> - Response components
      </p>
      <p>
        <span>{`<Res.Render />`}</span> - Render (props: component)
      </p>
      <p>
        <span>{`<Res.Content />`}</span> - Response send (props: json, text, contentType)
      </p>
      <p>
        <span>{`<Res.Status />`}</span> - Response Status (props: statusCode)
      </p>
      <p>
        <span>{`<Res.SendFile />`}</span> - Response Send File (props: path, options, onError)
      </p>
      <p>
        <span>{`<Res.Redirect />`}</span> - Redirect (props: path, statusCode)
      </p>
      <br />
      <code>Sorry for this, better page is in process...</code>
    </Wrapper>
  </BaseLayout>
);

const Wrapper = styled.div`
  margin-top: 20px;
  color: ${(props) => props.theme.colors.white};

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
