import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    background-color: #131516;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-family: system-ui,-apple-system,
                Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,
                BlinkMacSystemFont,Helvetica,Arial,Apple Color Emoji,
                Segoe UI Emoji,Segoe UI Symbol;
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;
