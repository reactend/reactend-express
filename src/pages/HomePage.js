import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { BaseLayout } from "../components/layout/BaseLayout";

export const HomePage = () => {
  return (
    <BaseLayout>
      <Helmet>
        <title>ReactXpress | React renderer to build Node.js server</title>
      </Helmet>
      <Hero>
        <div>
          <img src="/logo.svg" />
          <h1>
            React<span>Xpress</span>
          </h1>
          <h2>React renderer to build Node.js server</h2>
        </div>
        <CodeExample src="/code-example.png" />
      </Hero>
    </BaseLayout>
  );
};

const Hero = styled.div`
  height: 570px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.brandVeryDark};
  position: relative;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  h1 {
    font-size: 5em;
    color: ${(props) => props.theme.colors.white};
    font-weight: 900;

    span {
      color: ${(props) => props.theme.colors.brandVeryLight};
    }
  }

  h2 {
    font-weight: normal;
    color: ${(props) => props.theme.colors.brandVeryLight};
  }

  @media (max-width: 600px) {
    flex-direction: column;
    h1 {
      font-size: 3em;
    }
    h2 {
      font-size: 1em;
    }
  }

  &:before {
    content: "";
    height: 100%;
    width: 100vw;
    background-color: ${(props) => props.theme.colors.brandVeryDark};
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -50vw;
    z-index: -1;
  }
`;

const CodeExample = styled.img`
  width: 700px;
  margin-top: 100px;

  @media (max-width: 600px) {
    margin-top: 40px;
  }
`;
