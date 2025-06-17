import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // 🟢 import BrowserRouter

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/FE"> {/* 🟢 Fix: basename for GitHub Pages */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
