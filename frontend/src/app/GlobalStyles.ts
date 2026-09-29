import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Сброс базовых стилей */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none; 
      -webkit-user-select: none; 
       -khtml-user-select: none; 
         -moz-user-select: none; 
          -ms-user-select: none; 
              user-select: none;
  }

  #root {
    min-height: 100%;
    display: flex; 
    flex-direction: column;
  }

  body {
  height: 100%;
  overflow-x: hidden;
  position: relative;
  background: #C30A36;
  
}

  html, body {
    overscroll-behavior-y: contain;
    height: -webkit-fill-available;
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: 'Titillium Web', sans-serif;  
    color: #333;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
  overflow: hidden;
}

.react-multi-carousel-list{

    overflow-x: hidden !important;
    overflow-y: visible !important;
}
body::-webkit-scrollbar {
  display: none; 
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

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Кнопки и интерактивные элементы */
  button, input, textarea, select {
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    outline: none;
  }

  /* Базовые стили для заголовков */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    color: #222;
  }
`;

export default GlobalStyle;
