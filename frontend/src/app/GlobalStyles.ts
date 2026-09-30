import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }

  #root {
    min-height: 100dvh;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  html, body {
    overscroll-behavior-y: contain;
    width: 100%;
    min-height: 100dvh;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: 'Titillium Web', system-ui, sans-serif;
    color: #e8eaed;
    line-height: 1.5;
    background: #0a0e14;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    overflow-x: hidden;
  }

  body {
    overflow-x: hidden;
    overflow-y: auto;
  }

  body::-webkit-scrollbar {
    width: 8px;
  }

  body::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
    height: auto;
  }

  button, input, textarea, select {
    font: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    color: #ffffff;
  }

  input, textarea, select {
    user-select: text;
    -webkit-user-select: text;
  }
`;

export default GlobalStyle;
