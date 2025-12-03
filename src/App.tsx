import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSpeakerWave, HiSpeakerXMark, HiPlay } from 'react-icons/hi2';
import { HandDrawnPalmtree, HandDrawnSun, HandDrawnFlower, HandDrawnChevronLeft, HandDrawnChevronRight } from './components/icons';
import Layout from './components/layout/Layout';
import LazyParallaxSection from './components/LazyParallaxSection';
import AgeVerification from './components/AgeVerification';
import CookieConsent from './components/CookieConsent';
import { useParallax } from './hooks/useParallax';
import { useTranslation } from './hooks/useTranslation';
import { useAgeVerification } from './hooks/useAgeVerification';
import { useCookieConsent } from './hooks/useCookieConsent';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useAudio } from './context/AudioContext';
import videoCache from './utils/videoCache';

const ASSET_BASE_URL = 'https://mdfeywsadyvaqhsdbxqb.supabase.co/storage/v1/object/public/images/';

interface Flavor {
  name: string;
  description: (t: (key: string) => string) => string;
  ingredients: string[];
  distantBackground: string;
  midGroundBackground: string;
  foregroundBackground: string;
  icon: JSX.Element;
  color: string;
  bottleImage: string;
}

const App: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { handleScroll } = useParallax();
  const { t } = useTranslation();
  const { showAgeVerification, handleVerification } = useAgeVerification();
  const { showConsent, handleAccept, handleDecline } = useCookieConsent();
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { isSoundPlaying, toggleSound } = useAudio();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isModalVideoLoaded, setIsModalVideoLoaded] = useState(false);
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoUrl = `${ASSET_BASE_URL}djudjucommercial.webm`;
  const [showVideo, setShowVideo] = useState(false);

  useScrollToTop();

  const videoUrls = useMemo(() => [`${ASSET_BASE_URL}mainherobg-comp.mp4`], []);
  const heroBackgroundUrl = videoUrls[0];
  const isVideo = heroBackgroundUrl.endsWith('.mp4');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Defer scroll listener to avoid blocking initial render
  useEffect(() => {
    // Use requestIdleCallback to defer non-critical scroll listener
    const setupScrollListener = () => {
      window.addEventListener('scroll', handleScroll);
    };
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(setupScrollListener, { timeout: 1000 });
    } else {
      setTimeout(setupScrollListener, 100);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Defer video loading to avoid blocking initial render
  useEffect(() => {
    if (!showVideo || !videoRef.current) return;

    let mounted = true;
    let idleCallbackId: number | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    let cleanupVideo: (() => void) | null = null;

    // Defer video setup to avoid blocking critical rendering
    const setupVideo = () => {
      if (!mounted || !videoRef.current) return;
      
      const video = videoRef.current;

      const handleError = () => {
        if (!mounted) return;
        setVideoError('Error loading video');
        setIsVideoLoaded(true);
      };

      const handleLoadedData = () => {
        if (!mounted) return;
        setVideoError(null);
        setIsVideoLoaded(true);
        video.play().catch(error => {
          if (mounted) {
            setVideoError(`Error playing video: ${error.message}`);
          }
        });
      };

      video.addEventListener('error', handleError);
      video.addEventListener('loadeddata', handleLoadedData);

      cleanupVideo = () => {
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadeddata', handleLoadedData);
      };

      if (!video.src && !videoCache[heroBackgroundUrl]) {
        video.src = heroBackgroundUrl;
        videoCache[heroBackgroundUrl] = video;
      } else if (videoCache[heroBackgroundUrl] && videoCache[heroBackgroundUrl].readyState >= 2) {
        video.src = heroBackgroundUrl;
        handleLoadedData();
      }
    };

    // Use requestIdleCallback to defer video loading
    if ('requestIdleCallback' in window) {
      idleCallbackId = requestIdleCallback(setupVideo, { timeout: 2000 });
    } else {
      timeoutId = setTimeout(setupVideo, 200);
    }

    return () => {
      mounted = false;
      if (cleanupVideo) {
        cleanupVideo();
      }
      if (idleCallbackId !== null && 'cancelIdleCallback' in window) {
        cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [showVideo, heroBackgroundUrl]);

  // Modal video (promotional video) - loads on all devices when modal is opened
  // This is separate from background videos and should always be available
  useEffect(() => {
    if (!modalVideoRef.current) return;

    const video = modalVideoRef.current;

    const handleLoadedData = () => {
      setIsModalVideoLoaded(true);
      video.play().catch(error => {
        alert(`Error playing video: ${error.message}`);
        setIsModalVideoLoaded(true);
      });
    };

    const handleError = () => {
      alert('Error loading video');
      setIsModalVideoLoaded(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    if (!video.src && !videoCache[modalVideoUrl]) {
      video.src = modalVideoUrl;
      videoCache[modalVideoUrl] = video;
    } else if (videoCache[modalVideoUrl] && videoCache[modalVideoUrl].readyState >= 2) {
      video.src = modalVideoUrl;
      handleLoadedData();
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [modalVideoUrl, isVideoModalOpen]);

  // Check screen size immediately but defer resize listener
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkScreen = () => {
      const shouldShow = window.innerWidth >= 768;
      setShowVideo(shouldShow);
      // Clear video src when switching to mobile to prevent loading
      if (!shouldShow && videoRef.current) {
        videoRef.current.src = '';
        videoRef.current.load(); // Reset video element
      }
    };
    // Check immediately for initial render
    checkScreen();
    // Defer resize listener to avoid blocking
    const setupResizeListener = () => {
      window.addEventListener('resize', checkScreen);
    };
    if ('requestIdleCallback' in window) {
      requestIdleCallback(setupResizeListener, { timeout: 1000 });
    } else {
      setTimeout(setupResizeListener, 100);
    }
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const flavors: Flavor[] = useMemo(
    () => [
      {
        name: 'DjuDju Banana',
        description: t => t('beers.banana.description'),
        ingredients: ['Wheat', 'Barley Malt', 'Natural Banana Extract', 'Hops', 'Spring Water'],
        distantBackground: '',
        midGroundBackground: `${ASSET_BASE_URL}midbg-banana2.png`,
        foregroundBackground: `${ASSET_BASE_URL}vorbg-banana2.png`,
        icon: <HandDrawnPalmtree />,
        color: 'from-[#C19A6B] to-[#A37F5A]',
        bottleImage: `${ASSET_BASE_URL}single-banana2.png`,
      },
      {
        name: 'DjuDju Mango',
        description: t => t('beers.mango.description'),
        ingredients: ['Wheat', 'Barley Malt', 'Natural Mango Extract', 'Hops', 'Spring Water'],
        distantBackground: '',
        midGroundBackground: `${ASSET_BASE_URL}midbg-mango1.png`,
        foregroundBackground: `${ASSET_BASE_URL}vorbg-mango.png`,
        icon: <HandDrawnSun />,
        color: 'from-[#C19A6B] to-[#8B6B43]',
        bottleImage: `${ASSET_BASE_URL}single-mango3.png`,
      },
      {
        name: 'DjuDju Pineapple',
        description: t => t('beers.pineapple.description'),
        ingredients: ['Wheat', 'Barley Malt', 'Natural Pineapple Extract', 'Hops', 'Spring Water'],
        distantBackground: '',
        midGroundBackground: `${ASSET_BASE_URL}midbg-pineapple.png`,
        foregroundBackground: `${ASSET_BASE_URL}vorbg-pineapple.png`,
        icon: <HandDrawnSun />,
        color: 'from-[#C19A6B] to-[#96774F]',
        bottleImage: `${ASSET_BASE_URL}single-pinapple2.png`,
      },
      {
        name: 'DjuDju Palm',
        description: t => t('beers.palm.description'),
        ingredients: ['Wheat', 'Corn', 'Palm Essence', 'Hops', 'Spring Water'],
        distantBackground: '',
        midGroundBackground: `${ASSET_BASE_URL}midbg-palm.png`,
        foregroundBackground: `${ASSET_BASE_URL}vorbg-palm.png`,
        icon: <HandDrawnPalmtree />,
        color: 'from-[#C19A6B] to-[#7D5B35]',
        bottleImage: `${ASSET_BASE_URL}single-palm3.png`,
      },
      {
        name: 'DjuDju Passion Fruit',
        description: t => t('beers.passionFruit.description'),
        ingredients: ['Wheat', 'Barley Malt', 'Natural Passion Fruit Extract', 'Hops', 'Spring Water'],
        distantBackground: '',
        midGroundBackground: `${ASSET_BASE_URL}midbg-passionf.png`,
        foregroundBackground: `${ASSET_BASE_URL}vorbg-passionf.png`,
        icon: <HandDrawnFlower />,
        color: 'from-[#C19A6B] to-[#8B6B43]',
        bottleImage: `${ASSET_BASE_URL}single-passionf1.png`,
      },
    ],
    []
  );

  // Navigation for mobile slider
  const nextFlavor = () => {
    setCurrentFlavorIndex((prev) => (prev + 1) % flavors.length);
  };

  const prevFlavor = () => {
    setCurrentFlavorIndex((prev) => (prev - 1 + flavors.length) % flavors.length);
  };

  const handleFlavorClick = (flavorName: string) => {
    scrollToSection(flavorName.toLowerCase().replace(/\s+/g, '-'));
  };

  const handleKeyDown = (event: React.KeyboardEvent, flavorName: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleFlavorClick(flavorName);
    }
  };

  // Animation variants for pixelating fade effect
  const flavorVariants = {
    initial: {
      opacity: 0,
      filter: 'blur(10px)',
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        opacity: { duration: 0.2 },
        filter: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    },
    exit: {
      opacity: 0,
      filter: 'blur(10px)',
      scale: 0.95,
      transition: {
        opacity: { duration: 0.2 },
        filter: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    },
  };

  return (
    <Layout>
      {showAgeVerification && <AgeVerification onVerify={handleVerification} />}
      {showConsent && <CookieConsent onAccept={handleAccept} onDecline={handleDecline} />}
      <div className="relative">
        {/* Hero Section */}
        <div
          ref={heroRef}
          className="h-screen relative overflow-hidden flex items-center justify-center"
        >
          {/* Background color layer (gradient) */}
          <div className="absolute inset-0 herogold" />

          {/* New div layer above gradient */}
          <div className="absolute inset-0 heropattern" />

          {/* Video layer */}
          {showVideo && isVideo && (
            <div className="absolute inset-0 opacity-20 w-full h-full">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                crossOrigin="anonymous"
                className={`absolute inset-0 w-full h-full object-cover ${
                  !isVideoLoaded ? 'opacity-0' : 'opacity-100'
                } transition-opacity duration-300`}
              />
              {videoError && (
                <div className="absolute inset-0 bg-gray-800 text-white flex items-center justify-center">
                  <p>{videoError}</p>
                </div>
              )}
            </div>
          )}

          {/* Content layer - Show immediately for better FCP */}
          <div className="relative z-10 mt-0 text-center text-beige w-full md:mt-32">
            <h1 className="font-akhio mt-4 text-4xl md:text-6xl font-bold mb-2">{t('hero.title')}</h1>
            <p className=" newfont text-lg md:text-xl mb-4">{t('hero.subtitle')}</p>

            {/* Sound toggle button */}
            <button
              onClick={toggleSound}
              className="absolute top-4 md:top-2 right-4 p-2 bg-black/40 backdrop-blur-sm hover:bg-black/50 text-beige rounded-full transition-all duration-200"
              aria-label={isSoundPlaying ? 'Mute sound' : 'Unmute sound'}
            >
              {isSoundPlaying ? <HiSpeakerWave size={24} /> : <HiSpeakerXMark size={24} />}
            </button>

            {/* Desktop View */}
            <div className="hidden md:flex items-end justify-center gap-2 px-4 mt-16 min-h-[60vh]">
              {flavors.map((flavor) => (
                <div key={flavor.name} className="relative flex flex-col items-center">
                  <button
                    onClick={() => scrollToSection(flavor.name.toLowerCase().replace(/\s+/g, '-'))}
                    className="transform hover:-translate-y-6 transition-transform duration-300 cursor-pointer focus:outline-none flavor-button relative"
                    aria-label={`View ${flavor.name} details`}
                  >
                    <img
                      src={flavor.bottleImage}
                      alt={`${flavor.name} bottle`}
                      className="h-[60vh] w-auto object-contain max-w-full"
                      loading="lazy"
                    />
                    <span className="flavor-name absolute top-[-1rem] left-1/2 -translate-x-1/2 text-beige text-md font-semibold opacity-0 transition-opacity duration-300 pointer-events-none bg-black/70 px-4 py-2 rounded-md shadow-md">
                      {flavor.name}
                    </span>
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile View with Framer Motion */}
            <div className="md:hidden w-full px-4">
              <div className="relative">
                <div className="relative w-full max-w-[400px] h-[60vh] mx-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentFlavorIndex}
                      variants={flavorVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                      <button
                        onClick={() => handleFlavorClick(flavors[currentFlavorIndex].name)}
                        onKeyDown={(e) => handleKeyDown(e, flavors[currentFlavorIndex].name)}
                        className="cursor-pointer focus:outline-none relative"
                        aria-label={`View ${flavors[currentFlavorIndex].name} details`}
                        role="button"
                        tabIndex={0}
                      >
                        <img
                          src={flavors[currentFlavorIndex].bottleImage}
                          alt={`${flavors[currentFlavorIndex].name} bottle`}
                          className="h-[50vh] w-auto object-contain max-w-full"
                          fetchPriority="high"
                        />
                      </button>
                      <span className="bcap mt-4 text-beige text-xl font-semibold bg-black/70 px-4 py-2 rounded-sm shadow-md pointer-events-none">
                        {flavors[currentFlavorIndex].name}
                      </span>
                    </motion.div>
                  </AnimatePresence>

                  {/* Custom Navigation Buttons */}
                  <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/40 backdrop-blur-sm hover:bg-black/50 text-white p-2 rounded-full shadow-lg transition-all duration-200"
                    onClick={prevFlavor}
                    aria-label="Previous flavor"
                  >
                    <HandDrawnChevronLeft />
                  </button>
                  <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/40 backdrop-blur-sm hover:bg-black/50 text-white p-2 rounded-full shadow-lg transition-all duration-200"
                    onClick={nextFlavor}
                    aria-label="Next flavor"
                  >
                    <HandDrawnChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Playback Button and Modal */}
        <div className="flex justify-center py-2 bg-gradient-to-b from-transparent to-black/10">
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="video-play-button"
            aria-label="Play video"
          >
            <HiPlay className="play-icon w-6 h-6" />
            <span className="font-semibold text-lg">{t('video.playButton')}</span>
          </button>
        </div>

        {isVideoModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setIsVideoModalOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="relative w-full max-w-4xl mx-4 bg-black rounded-lg shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-beige rounded-full transition-all duration-200"
                aria-label="Close video modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="relative pt-[56.25%]">
                {!isModalVideoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/90">
                    <svg
                      className="w-12 h-12 text-beige animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  </div>
                )}
                <video
                  ref={modalVideoRef}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
                    isModalVideoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  autoPlay
                  controls
                  playsInline
                  src={`${ASSET_BASE_URL}djudjucommercial.webm`}
                  onError={() => {
                    alert('Error loading video');
                    setIsModalVideoLoaded(true);
                  }}
                  onLoadedData={() => setIsModalVideoLoaded(true)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Flavor Sections - Lazy loaded for better performance */}
        {flavors.map((flavor, index) => (
          <LazyParallaxSection
            key={flavor.name}
            flavor={{
              ...flavor,
              description: flavor.description(t as (key: string) => string),
            }}
            index={index}
          />
        ))}
      </div>
    </Layout>
  );
};

export default App;