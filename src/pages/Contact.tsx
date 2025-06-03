import React, { useRef, useState, useEffect } from 'react';
import SimpleLayout from '../components/SimpleLayout';
import ContactForm from '../components/ContactForm';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { motion } from 'framer-motion';
import { HandDrawnMail, HandDrawnPhone, HandDrawnMapPin } from '../components/icons';
import videoCache from '../utils/videoCache';

const ASSET_BASE_URL = 'https://mdfeywsadyvaqhsdbxqb.supabase.co/storage/v1/object/public/images/';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  useScrollToTop();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const heroBackgroundUrl = `${ASSET_BASE_URL}mainherobg-comp.mp4`;
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!showVideo || !videoRef.current) return;

    const video = videoRef.current;

    const handleError = () => {
      setVideoError('Error loading video');
      setIsVideoLoaded(true);
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

    if (!video.src) {
      video.src = heroBackgroundUrl;
    }

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [showVideo, videoRef, heroBackgroundUrl]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkScreen = () => setShowVideo(window.innerWidth >= 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return (
    <SimpleLayout>
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden hero">
        {/* Gold gradient background */}
        <div className="absolute inset-0 z-10 hero"></div>
        {/* Pattern background */}
        <div className="absolute inset-0 z-20 heropattern"></div>
        {/* Video layer (hidden on mobile) - above pattern */}
        {showVideo && (
          <div className="absolute inset-0 w-full h-full opacity-20" style={{ zIndex: 30 }}>
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              crossOrigin="anonymous"
              className={`absolute inset-0 w-full h-full object-top object-cover ${
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
        {/* Overlay for readability */}
        <div className="absolute inset-0 z-40 bg-black/40 md:bg-black/20"></div>
        {/* Content */}
        <div className="relative z-50 mt-16 text-center text-beige">
          <h1 className="font-akhio text-4xl md:text-6xl mb-4">{t('contact.title')}</h1>
          <p className="text-xl max-w-2xl mx-auto px-4">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center p-6 bg-beige myrotate1 rounded-lg hero heropattern"
            >
              <HandDrawnMail className="w-8 h-8 mx-auto mb-4 text-brown" />
              <h3 className=" text-3xl mb-2 font-akhio text-brown">{t('contact.info.email.title')}</h3>
              <a href={`mailto:${t('contact.info.email.value')}`} className="text-brown hover:text-yellow-600 transition-colors">
                {t('contact.info.email.value')}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6 bg-beige myrotate2 rounded-lg hero heropattern"
            >
              <HandDrawnPhone className="w-8 h-8 mx-auto mb-4 text-brown" />
              <h3 className="text-3xl mb-2 font-akhio text-brown">{t('contact.info.phone.title')}</h3>
              <a href={`tel:${t('contact.info.phone.value')}`} className="text-brown hover:text-yellow-600 transition-colors">
                {t('contact.info.phone.value')}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center p-6 bg-beige myrotate3 rounded-lg hero heropattern"
            >
              <HandDrawnMapPin className="w-8 h-8 mx-auto mb-4 text-brown" />
              <h3 className="text-3xl mb-2 font-akhio text-brown">{t('contact.info.address.title')}</h3>
              <div className="text-brown">
                {t('contact.info.address.lines').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-beige p-8 rounded-lg shadow-sm hero heropattern"
            >
              <h2 className="font-akhio text-3xl mb-6 text-center text-beige">{t('contact.form.title')}</h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </SimpleLayout>
  );
};

export default Contact;