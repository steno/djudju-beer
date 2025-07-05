import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useVideoPreload } from '../hooks/useVideoPreload';
import ExternalLink from './ExternalLink';

interface ParallaxSectionProps {
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

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ flavor, index }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const distantRef = useRef<HTMLDivElement>(null);
  const midGroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showLayers, setShowLayers] = useState(false);
  const { t } = useTranslation();

  const videoUrls = [
    flavor.distantBackground,
    flavor.midGroundBackground,
    flavor.foregroundBackground
  ].filter(url => url && (url.endsWith('.webm') || url.endsWith('.mp4')));

  const { isLoaded } = useVideoPreload(videoUrls);

  useEffect(() => {
    if (isLoaded && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  }, [isLoaded]);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current || !showLayers) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const scrollPosition = window.scrollY;
    const sectionTop = rect.top + scrollPosition;
    const sectionHeight = rect.height;
    const relativeScroll = scrollPosition - sectionTop;

    if (relativeScroll >= 0 && relativeScroll <= sectionHeight) {
      const parallaxAmount = relativeScroll;

      requestAnimationFrame(() => {
        if (midGroundRef.current) {
          const midGroundSpeed =1;
          midGroundRef.current.style.transform = `translateY(${parallaxAmount * midGroundSpeed}px)`;
        }

        if (foregroundRef.current) {
          const foregroundSpeed = 0.8;
          foregroundRef.current.style.transform = `translateY(${parallaxAmount * foregroundSpeed}px)`;
        }

        if (distantRef.current) {
          const distantSpeed = 0.2;
          distantRef.current.style.transform = `translateY(${parallaxAmount * distantSpeed}px)`;
        }
      });
    }
  }, [showLayers]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              setShowLayers(true);
            });
          } else {
            requestAnimationFrame(() => {
              setShowLayers(false);
            });
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const contentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              entry.target.classList.add('animate-in');
            });
          }
        });
      },
      {
        threshold: [0.1],
        rootMargin: '-10% 0px'
      }
    );

    if (contentRef.current) contentObserver.observe(contentRef.current);
    if (bottleRef.current) contentObserver.observe(bottleRef.current);

    return () => contentObserver.disconnect();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const isDistantVideo = flavor.distantBackground?.endsWith('.webm') || flavor.distantBackground?.endsWith('.mp4');
  const isMidGroundVideo = flavor.midGroundBackground?.endsWith('.mp4') || flavor.midGroundBackground?.endsWith('.webm');
  const isForegroundVideo = flavor.foregroundBackground?.endsWith('.mp4') || flavor.foregroundBackground?.endsWith('.webm');

  const getVideoType = (url: string) => {
    if (url.endsWith('.webm')) return 'video/webm';
    if (url.endsWith('.mp4')) return 'video/mp4';
    return 'video/mp4';
  };

  const getOrderLink = (flavorName: string) => {
    return 'https://amzn.eu/d/3BGzLJY';
  };

  return (
    <section
      ref={sectionRef}
      id={flavor.name.toLowerCase().replace(/\s+/g, '-')}
      className="min-h-screen relative overflow-hidden flex items-center justify-center py-20 md:py-0"
      style={{ background: '#c3bca8' }}
    >
      {/* Background Layers Container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Distant Background - z-index: 1 */}
        {flavor.distantBackground && (
          <div
            ref={distantRef}
            className="absolute inset-0 "
            style={{ zIndex: 1 }}
          >
            {isDistantVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
              >
                <source src={flavor.distantBackground} type={getVideoType(flavor.distantBackground)} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${flavor.distantBackground})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  opacity: 0.8,
                  mixBlendMode: 'overlay'
                }}
              />
            )}
          </div>
        )}
        
        {/* Mid-ground Background - z-index: 2 */}
        {flavor.midGroundBackground && (
          <div
            ref={midGroundRef}
            className={`absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out ${
              showLayers ? 'opacity-50 translate-x-0' : '-translate-x-full opacity-0'
            }`}
            style={{ zIndex: 2 }}
          >
            {isMidGroundVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ mixBlendMode: 'soft-light' }}
              >
                <source src={flavor.midGroundBackground} type={getVideoType(flavor.midGroundBackground)} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div
                className=" midground-layer absolute inset-0"
                style={{
                  backgroundImage: `url(${flavor.midGroundBackground})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  mixBlendMode: 'soft-light',
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Content Container - z-index: 3 */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 3 }}>
        <div className="bg-white/30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
            {/* Bottle Image */}
            <div 
              ref={bottleRef}
              className={`order-1 lg:order-${index % 2 === 0 ? '2' : '1'} relative flex justify-center items-center p-8 opacity-0 translate-y-16 transition-all duration-1000 ease-out`}
            >
              <img 
                src={flavor.bottleImage}
                alt={`${flavor.name} bottle`}
                className="h-auto w-auto max-h-[60vh] object-contain transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Text Content */}
            <div 
              ref={contentRef}
              className={`order-2 lg:order-${index % 2 === 0 ? '1' : '2'} relative p-8 bg-beige`}
            >
              <h2 className="font-akhio text-4xl font-bold mb-4 text-brown">{flavor.name}</h2>
              <p className="text-lg mb-6 text-brown leading-relaxed">{flavor.description}</p>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-brown">{t('beers.ingredients.title')}</h3>
                <ul className="list-disc list-inside space-y-2">
                  {flavor.ingredients.map((ingredient) => (
                    <li key={ingredient} className="text-base text-brown">
                      {ingredient}
                    </li>
                  ))}
                </ul>
                <ExternalLink
                  href={getOrderLink(flavor.name)}
                  className="mt-8 inline-block w-full btn-primary text-center"
                >
                  {t('beers.orderNow')}
                </ExternalLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Foreground Layer - z-index: 10 */}
      {flavor.foregroundBackground && (
        <div
          ref={foregroundRef}
          className={`absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out ${
            showLayers ? 'opacity-50 translate-x-0' : 'translate-x-full opacity-0'
          }`}
          style={{ zIndex: 2 }}
        >
          {isForegroundVideo ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              crossOrigin="anonymous"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ mixBlendMode: 'soft-light' }}
            >
              <source src={flavor.foregroundBackground} type={getVideoType(flavor.foregroundBackground)} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div
              className="foreground-layer absolute inset-0"
              style={{
                backgroundImage: `url(${flavor.foregroundBackground})`,
                backgroundSize: '100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                mixBlendMode: 'soft-light',
              }}
            />
          )}
        </div>
      )}
    </section>
  );
}

export default ParallaxSection;