import React, { useState, useEffect, useRef } from 'react';
import ParallaxSection from './ParallaxSection';

interface LazyParallaxSectionProps {
  flavor: {
    name: string;
    description: string;
    ingredients: string[];
    distantBackground: string;
    midGroundBackground: string;
    foregroundBackground: string;
    icon: React.ReactNode;
    color: string;
    bottleImage: string;
  };
  index: number;
}

const LazyParallaxSection: React.FC<LazyParallaxSectionProps> = ({ flavor, index }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!placeholderRef.current) return;

    // Use IntersectionObserver to detect when section is about to come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender(true);
            observer.disconnect();
          }
        });
      },
      {
        // Start loading when section is 500px away from viewport
        rootMargin: '500px 0px',
        threshold: 0
      }
    );

    observer.observe(placeholderRef.current);

    return () => observer.disconnect();
  }, []);

  // Render minimal placeholder to prevent layout shift
  // Use content-visibility to improve performance
  if (!shouldRender) {
    return (
      <div
        ref={placeholderRef}
        id={flavor.name.toLowerCase().replace(/\s+/g, '-')}
        className="min-h-screen relative overflow-hidden"
        style={{ 
          background: '#c3bca8',
          contentVisibility: 'auto',
          containIntrinsicSize: '100vh'
        }}
        aria-hidden="true"
      />
    );
  }

  return <ParallaxSection flavor={flavor} index={index} />;
};

export default LazyParallaxSection;

