import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AudioProvider } from './context/AudioContext';
import App from './App';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import Impressum from './pages/Impressum';
import './index.css';
import './fonts/stylesheet.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <LanguageProvider>
      <AudioProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/impressum" element={<Impressum />} />
          </Routes>
        </BrowserRouter>
      </AudioProvider>
    </LanguageProvider>
  </StrictMode>
);