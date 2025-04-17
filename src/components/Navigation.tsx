import React, { useState, useEffect } from 'react';

interface NavigationProps {
  flavors: {
    name: string;
    icon: React.ReactNode;
  }[];
  onNavigate: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ flavors, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Djudju
            </span>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {flavors.map((flavor) => (
              <button
                key={flavor.name}
                onClick={() => onNavigate(flavor.name.toLowerCase().replace(/\s+/g, '-'))}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isScrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-gray-200'
                } cursor-pointer focus:outline-none transition-colors duration-200`}
              >
                <span className="mr-2">{flavor.icon}</span>
                {flavor.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;