// index.ts
import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleSheetManager } from 'styled-components';
import { App } from './app';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyleSheetManager target={document.head}>
      <App />
    </StyleSheetManager>
  </React.StrictMode>
);

reportWebVitals();
