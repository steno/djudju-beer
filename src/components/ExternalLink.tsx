import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ExternalLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, className, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { language } = useLanguage();

  const tooltipText = language === 'en' 
    ? 'This link will open in a new tab'
    : 'Dieser Link wird in einem neuen Tab geöffnet';

  return (
    <div className="relative inline-block w-full">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
      >
        {children}
      </a>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 backdrop-blur-sm text-white text-sm rounded shadow-lg whitespace-nowrap z-50">
          {tooltipText}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black/80"></div>
        </div>
      )}
    </div>
  );
};

export default ExternalLink;