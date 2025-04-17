import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Layout from './components/layout/Layout';
import ParallaxSection from './components/ParallaxSection';
import AgeVerification from './components/AgeVerification';
import CookieConsent from './components/CookieConsent';
import { HandDrawnLeaf, HandDrawnPalmtree, HandDrawnSun, HandDrawnFlower, HandDrawnChevronLeft, HandDrawnChevronRight } from './components/icons';
import { useParallax } from './hooks/useParallax';
import { useTranslation } from './hooks/useTranslation';
import { useAgeVerification } from './hooks/useAgeVerification';
import { useCookieConsent } from './hooks/useCookieConsent';
import { useScrollToTop } from './hooks/useScrollToTop';
// Add react-icons for speaker icons (or use your own HandDrawn icons)
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';

const ASSET_BASE_URL = 'https://mdfeywsadyvaqhsdbxqb.supabase.co/storage/v1/object/public/images/';

// Singleton cache for preloaded videos
const videoCache: { [url: string]: HTMLVideoElement } = {};

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
  const audioRef = useRef<HTMLAudioElement>(null); // Ref for audio element
  const { handleScroll } = useParallax();
  const { t } = useTranslation();
  const { showAgeVerification, handleVerification } = useAgeVerification();
  const { showConsent, handleAccept, handleDecline } = useCookieConsent();
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false); // State for sound toggle
  useScrollToTop();

  const videoUrls = useMemo(() => [`${ASSET_BASE_URL}mainherobg.mp4`], []);
  const heroBackgroundUrl = videoUrls[0];
  const isVideo = heroBackgroundUrl.endsWith('.mp4');
  const audioUrl = `${ASSET_BASE_URL}djudju.mp3`; // Replace with your audio file URL

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle sound toggle
  const toggleSound = () => {
    if (audioRef.current) {
      if (isSoundPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
      setIsSoundPlaying(!isSoundPlaying);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const handleError = () => {
      setVideoError('Error loading video');
      setIsVideoLoaded(true); // Allow UI to render even if there's an error
    };

    const handleLoadedData = () => {
      setVideoError(null);
      setIsVideoLoaded(true);
      video.play().catch(error => {
        setVideoError(`Error playing video: ${error.message}`);
      });
    };

    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);

    // Load video in background
    if (!video.src && !videoCache[heroBackgroundUrl]) {
      video.src = heroBackgroundUrl;
      videoCache[heroBackgroundUrl] = video; // Cache the video element
    } else if (videoCache[heroBackgroundUrl] && videoCache[heroBackgroundUrl].readyState >= 2) {
      // Reuse cached video
      video.src = heroBackgroundUrl;
      handleLoadedData();
    }

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [heroBackgroundUrl]);

  const flavors: Flavor[] = useMemo(
    () => [
      {
        name: 'DjuDju Banana',
        description: t => t('beers.banana.description'),
        ingredients: ['Wheat', 'Barley Malt', 'Natural Banana Extract', 'Hops', 'Spring Water'],
        distantBackground: '',
        midGroundBackground: `${ASSET_BASE_URL}midbg-banana.png`,
        foregroundBackground: `${ASSET_BASE_URL}vorbg-banana.png`,
        icon: <HandDrawnPalmtree />,
        color: 'from-[#C19A6B] to-[#A37F5A]',
        bottleImage: `${ASSET_BASE_URL}single-banana2.png`,
      },
      {
        name: 'DjuDju Mango',
        description: t => t('beers.mango.description'),
        ingredients: ['Wheat', 'Barley Malt', 'Natural Mango Extract', 'Hops', 'Spring Water'],
        distantBackground: '',
        midGroundBackground: `${ASSET_BASE_URL}midbg-mango.png`,
        foregroundBackground: `${ASSET_BASE_URL}vorbg-mango1.png`,
        icon: <HandDrawnSun />,
        color: 'from-[#C19A6B] to-[#8B6B43]',
        bottleImage: `${ASSET_BASE_URL}single-mango3.png`,
      },
      {
        name: 'DjuDju Pineapple',
        description: t => t('beers.pineapple.description'),
        ingredients: ['Wheat', 'Barley Malt', 'Natural Pineapple Extract', 'Hops', 'Spring Water'],
        distantBackground: '',
        midGroundBackground: `${ASSET_BASE_URL}midbg-pineapple1.png`,
        foregroundBackground: `${ASSET_BASE_URL}vorbg-pineapple3.png`,
        icon: <HandDrawnSun />,
        color: 'from-[#C19A6B] to-[#96774F]',
        bottleImage: `${ASSET_BASE_URL}single-pinapple2.png`,
      },
      {
        name: 'DjuDju Palm',
        description: t => t('beers.palm.description'),
        ingredients: ['Wheat', 'Corn', 'Palm Essence', 'Hops', 'Spring Water'],
        distantBackground: ``,
        midGroundBackground: `${ASSET_BASE_URL}midbg.png`,
        foregroundBackground: `${ASSET_BASE_URL}vorbg.png`,
        icon: <HandDrawnPalmtree />,
        color: 'from-[#C19A6B] to-[#7D5B35]',
        bottleImage: `${ASSET_BASE_URL}single-palm3.png`,
      },
      {
        name: 'DjuDju Passion Fruit',
        description: t => t('beers.passionFruit.description'),
        ingredients: ['Wheat', 'Barley Malt', 'Natural Passion Fruit Extract', 'Hops', 'Spring Water'],
        distantBackground: '',
        midGroundBackground: `${ASSET_BASE_URL}midbg-passionf3.png`,
        foregroundBackground: `${ASSET_BASE_URL}vorbg-passionf4.png`,
        icon: <HandDrawnFlower />,
        color: 'from-[#C19A6B] to-[#8B6B43]',
        bottleImage: `${ASSET_BASE_URL}single-passionf1.png`,
      },
    ],
    []
  );

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
  <div className="absolute inset-0 herogold" style={{ zIndex: 1 }} />

  {/* New div layer above gradient */}
  <div
    className="absolute inset-0 heropattern"
    style={{ zIndex: 2 }}
  >
    {/* Add your content or styles here */}
  </div>

  {/* Video layer */}
  <div className="absolute inset-0 opacity-20 w-full h-full" style={{ zIndex: 3 }}>
    {isVideo && (
      <>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
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
      </>
    )}
  </div>

  {/* Audio element */}
          <audio ref={audioRef} loop preload="auto" crossOrigin="anonymous">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          {/* Content layer */}
          <div className="relative z-10 mt-16 text-center text-beige w-full md:mt-32">
            <h1 className="font-akhio mt-4 text-4xl md:text-6xl font-bold mb-2">{t('hero.title')}</h1>
            <p className="text-lg md:text-xl mb-4">{t('hero.subtitle')}</p>

            {/* Sound toggle button */}
            <button
              onClick={toggleSound}
              className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-beige rounded-full transition-all duration-200"
              aria-label={isSoundPlaying ? 'Mute sound' : 'Unmute sound'}
            >
              {isSoundPlaying ? <HiSpeakerWave size={24} /> : <HiSpeakerXMark size={24} />}
            </button>

            {/* Desktop View */}
            <div className="hidden md:flex items-end justify-center gap-2 md:gap-0 px-4 mt-16 min-h-[60vh]">
              {flavors.map(flavor => (
                <button
                  key={flavor.name}
                  onClick={() => scrollToSection(flavor.name.toLowerCase().replace(/\s+/g, '-'))}
                  className="transform hover:-translate-y-6 transition-transform duration-300 cursor-pointer focus:outline-none"
                >
                  <img
                    src={flavor.bottleImage}
                    alt={`${flavor.name} bottle`}
                    className="h-[60vh] w-auto object-contain max-w-full"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            {/* Mobile View with Swiper */}
            <div className="md:hidden w-full px-4">
              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                  }}
                  pagination={{ clickable: true }}
                  loop={false}
                  className="w-full"
                >
                  {flavors.map(flavor => (
                    <SwiperSlide key={flavor.name}>
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => scrollToSection(flavor.name.toLowerCase().replace(/\s+/g, '-'))}
                          className="transform hover:-translate-y-4 transition-transform duration-300 cursor-pointer focus:outline-none"
                        >
                          <img
                            src={flavor.bottleImage}
                            alt={`${flavor.name} bottle`}
                            className="h-[60vh] w-auto object-contain max-w-full"
                            loading="lazy"
                          />
                        </button>
                        <h3 className="font-akhio text-xl font-semibold mt-4">{flavor.name}</h3>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <button
                  className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/80 backdrop-blur-sm hover:bg-black/60 text-white p-3 rounded-full shadow-lg transition-all duration-200"
                  aria-label="Previous slide"
                >
                  <HandDrawnChevronLeft />
                </button>
                <button
                  className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/80 backdrop-blur-sm hover:bg-black/60 text-white p-3 rounded-full shadow-lg transition-all duration-200"
                  aria-label="Next slide"
                >
                  <HandDrawnChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Flavor Sections */}
        {flavors.map((flavor, index) => (
          <ParallaxSection
            key={flavor.name}
            flavor={{
              ...flavor,
              description: flavor.description(t),
            }}
            index={index}
          />
        ))}
      </div>
    </Layout>
  );
};

export default App;