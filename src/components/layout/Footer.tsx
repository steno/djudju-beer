import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-brown text-beige py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div>
            <h2 className="font-akhio text-2xl mb-4">Djudju Beer</h2>
            <p className="text-beige opacity-50 mb-6">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-4">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  {t('navigation.about')}
                </Link>
              </li>
               <li>
                <Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  {t('navigation.contact')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  {t('navigation.privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg mb-4">{t('footer.contact.title')}</h3>
            <ul className="space-y-3 text-gray-400">
              {t('contact.info.address.lines').map((line, index) => (
                <li key={index}>{line}</li>
              ))}
              <li className="pt-2">
                <a href="mailto:info@djudju.com" className="hover:text-yellow-400 transition-colors">
                  {t('contact.info.email.value')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;