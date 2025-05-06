import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react'

import App from './App';
import { ThemeProvider } from './providers/ThemeProvider';

import '@/styles/main.scss';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
);
