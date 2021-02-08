import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { TopNav } from './TopNav';
import { GlobalStyle } from './GlobalStyle';
import { theme } from '../../theme';

export const BaseLayout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <TopNav />
      <Content>{children}</Content>
      <GlobalStyle />
    </Wrapper>
  </ThemeProvider>
);

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const Content = styled.div`
  padding: 0 10px;
`;
