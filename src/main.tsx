import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AudioProvider } from './context/AudioContext';
import App from './App';
import './index.css';
import './fonts/stylesheet.css';

// Lazy load page components for better code splitting
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Contact = lazy(() => import('./pages/Contact'));
const Impressum = lazy(() => import('./pages/Impressum'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-brown text-beige flex items-center justify-center">
    <div className="text-center">
      <img
        src="/images/djudju-logo.png"
        alt="Loading..."
        className="w-20 h-20 animate-spin mx-auto mb-4"
        style={{ filter: 'drop-shadow(0 0 8px #F5E8C7)' }}
      />
      <p className="text-beige opacity-80">Loading...</p>
    </div>
  </div>
);

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <LanguageProvider>
      <AudioProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/impressum" element={<Impressum />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AudioProvider>
    </LanguageProvider>
  </StrictMode>
);