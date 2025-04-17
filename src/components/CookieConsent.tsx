import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

interface CookieConsentProps {
  onAccept: (preferences: { necessary: boolean; analytics: boolean; marketing: boolean }) => void;
  onDecline: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onDecline }) => {
  const { language } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false
  });

  const handleAccept = () => {
    onAccept(preferences);
  };

  const handleAcceptAll = () => {
    onAccept({
      necessary: true,
      analytics: true,
      marketing: true
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {!showDetails ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-gray-700">
                {language === 'en' 
                  ? 'We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.'
                  : 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Durch die weitere Nutzung dieser Website stimmen Sie der Verwendung von Cookies zu.'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowDetails(true)}
                className="myfont px-6 py-2 btn-secondary"
              >
                {language === 'en' ? 'Cookie Settings' : 'Cookie-Einstellungen'}
              </button>
              <button
                onClick={handleAcceptAll}
                className="myfont px-6 py-2 btn-primary"
              >
                {language === 'en' ? 'Accept All' : 'Alle akzeptieren'}
              </button>
              <button
                onClick={onDecline}
                className="myfont px-6 py-2 btn-secondary"
              >
                {language === 'en' ? 'Decline' : 'Ablehnen'}
              </button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowDetails(false)}
              className="absolute right-0 top-0 p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-semibold mb-4">
              {language === 'en' ? 'Cookie Settings' : 'Cookie-Einstellungen'}
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <h4 className="font-medium">
                    {language === 'en' ? 'Necessary' : 'Notwendig'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'en' 
                      ? 'Required for the website to function properly.'
                      : 'Erforderlich für die ordnungsgemäße Funktion der Website.'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.necessary}
                  disabled
                  className="h-5 w-5 text-[#C19A6B] rounded border-gray-300"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <h4 className="font-medium">
                    {language === 'en' ? 'Analytics' : 'Analyse'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'en'
                      ? 'Help us understand how visitors interact with our website.'
                      : 'Hilft uns zu verstehen, wie Besucher mit unserer Website interagieren.'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                  className="h-5 w-5 text-[#C19A6B] rounded border-gray-300"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <h4 className="font-medium">
                    {language === 'en' ? 'Marketing' : 'Marketing'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'en'
                      ? 'Used to deliver relevant ads and marketing campaigns.'
                      : 'Wird verwendet, um relevante Anzeigen und Marketingkampagnen bereitzustellen.'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                  className="h-5 w-5 text-[#C19A6B] rounded border-gray-300"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleAccept}
                className="px-6 py-2 btn-primary"
              >
                {language === 'en' ? 'Save Preferences' : 'Einstellungen speichern'}
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              {language === 'en' 
                ? 'For more information, please visit our '
                : 'Weitere Informationen finden Sie in unserer '}
              <Link to="/privacy" className="text-[#C19A6B] hover:underline">
                {language === 'en' ? 'Privacy Policy' : 'Datenschutzerklärung'}
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;