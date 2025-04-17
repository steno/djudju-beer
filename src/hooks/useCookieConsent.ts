import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const useCookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = (preferences: CookiePreferences) => {
    Cookies.set('cookie-consent', JSON.stringify(preferences), { expires: 365 });
    
    // Set individual cookie preferences
    if (preferences.analytics) {
      Cookies.set('analytics-enabled', 'true', { expires: 365 });
    }
    if (preferences.marketing) {
      Cookies.set('marketing-enabled', 'true', { expires: 365 });
    }
    
    setShowConsent(false);
  };

  const handleDecline = () => {
    Cookies.set('cookie-consent', JSON.stringify({ necessary: true, analytics: false, marketing: false }), { expires: 365 });
    setShowConsent(false);
  };

  return {
    showConsent,
    handleAccept,
    handleDecline
  };
};