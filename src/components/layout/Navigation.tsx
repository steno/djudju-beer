import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../context/LanguageContext';
import { HandDrawnMenu, HandDrawnX, HandDrawnArrowUp } from '../icons';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-lg' 
            : 'bg-black/30 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                className="h-12"
                onClick={closeMobileMenu}
                aria-label="DjuDju Beer"
              >
                <img 
                  src="/images/djudju-logo.png" 
                  alt="DjuDju Beer" 
                  className="h-full w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link
                to="/"
                className="text-beige hover:text-yellow-400 transition-colors text-lg"
              >
                {t('navigation.home')}
              </Link>
              <Link
                to="/about"
                className="text-beige hover:text-yellow-400 transition-colors text-lg"
              >
                {t('navigation.about')}
              </Link>
              <Link
                to="/contact"
                className="text-beige hover:text-yellow-400 transition-colors text-lg"
              >
                {t('navigation.contact')}
              </Link>
              <Link
                to="/impressum"
                className="text-beige hover:text-yellow-400 transition-colors text-lg"
              >
                {t('navigation.impressum')}
              </Link>
              <button
                onClick={toggleLanguage}
                className="text-beige hover:text-yellow-400 transition-colors text-lg"
              >
                {t('navigation.language')}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-beige p-2 bg-black/30 backdrop-blur-sm rounded-full"
              >
                {isMobileMenuOpen ? (
                  <HandDrawnX />
                ) : (
                  <HandDrawnMenu />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-black/80 backdrop-blur-lg"
            >
              <div className="px-4 pt-2 pb-3 space-y-3">
                <Link
                  to="/"
                  className="block text-white hover:text-yellow-400 transition-colors text-lg py-2"
                  onClick={closeMobileMenu}
                >
                  {t('navigation.home')}
                </Link>
                <Link
                  to="/about"
                  className="block text-white hover:text-yellow-400 transition-colors text-lg py-2"
                  onClick={closeMobileMenu}
                >
                  {t('navigation.about')}
                </Link>
                <Link
                  to="/contact"
                  className="block text-white hover:text-yellow-400 transition-colors text-lg py-2"
                  onClick={closeMobileMenu}
                >
                  {t('navigation.contact')}
                </Link>
                <Link
                  to="/impressum"
                  className="block text-white hover:text-yellow-400 transition-colors text-lg py-2"
                  onClick={closeMobileMenu}
                >
                  {t('navigation.impressum')}
                </Link>
                <button
                  onClick={() => {
                    toggleLanguage();
                    closeMobileMenu();
                  }}
                  className="block w-full text-left text-white hover:text-yellow-400 transition-colors text-lg py-2"
                >
                  {t('navigation.language')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-black/80 backdrop-blur-sm hover:bg-black/60 text-white p-3 rounded-full shadow-lg transition-all duration-200"
          >
            <HandDrawnArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;