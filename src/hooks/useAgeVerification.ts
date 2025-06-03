import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useAgeVerification = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(false);

  useEffect(() => {
    const ageVerified = Cookies.get('age-verified');
    if (!ageVerified) {
      setShowAgeVerification(true);
    }
  }, []);

  const handleVerification = (isAdult: boolean) => {
    if (isAdult) {
      Cookies.set('age-verified', 'true', { expires: 365 });
      setShowAgeVerification(false);
    } else {
      window.location.href = 'https://disney.com';
    }
  };

  return {
    showAgeVerification,
    handleVerification
  };
};