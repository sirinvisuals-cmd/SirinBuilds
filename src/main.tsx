import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { ContentProvider } from './context/ContentContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContentProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ContentProvider>
  </StrictMode>,
);
