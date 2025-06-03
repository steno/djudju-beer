import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

interface AgeVerificationProps {
  onVerify: (isAdult: boolean) => void;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerify }) => {
  const { language } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-4xl  text-gray-900 font-bold mb-6">Welcome!</h2>
        <p className="text-2xl  text-gray-900 mb-8">
          {language === 'en' ? 'Are you 18 or older?' : 'Bist du 18 oder älter?'}
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => onVerify(true)}
            className="w-full btn-primary"
          >
            {language === 'en' ? 'I am 18+' : 'Ich bin 18+'}
          </button>
          
          <button
            onClick={() => onVerify(false)}
            className="myfont w-full btn-secondary"
          >
            {language === 'en' ? 'I am under 18' : 'Ich bin unter 18'}
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          {language === 'en' ? 'By entering this site you are agreeing to the ' : 'Mit dem Betreten dieser Seite stimmen Sie den '}
          <Link to="/privacy" className="text-[#C19A6B] hover:underline">
            {language === 'en' ? 'Privacy Policy' : 'Datenschutzbestimmungen'}
          </Link>
          {language === 'en' ? ' and ' : ' und den '}
          <Link to="/terms" className="text-[#C19A6B] hover:underline">
            {language === 'en' ? 'Terms of Use' : 'Nutzungsbedingungen'}
          </Link>
          {language === 'en' ? '.' : ' zu.'}
        </p>
      </div>
    </div>
  );
};

export default AgeVerification;