import React from "react";
import styled from "styled-components";
import { BaseLayout } from "../components/layout/BaseLayout";

export const AboutPage = ({ ctx: { req } }) => {
  return (
    <BaseLayout>
      <Wrapper>
        <h1>About Page</h1>
      </Wrapper>
    </BaseLayout>
  );
};

const Wrapper = styled.div``;

const Content = styled.div``;
