import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './style/global.css';
import { ProviderGlobal } from './models/contextoGlobal';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProviderGlobal>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProviderGlobal>
  </React.StrictMode>,
);
