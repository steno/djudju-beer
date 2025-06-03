import React, { useRef, useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { motion } from 'framer-motion';
import videoCache from '../utils/videoCache';

const ASSET_BASE_URL = 'https://mdfeywsadyvaqhsdbxqb.supabase.co/storage/v1/object/public/images/';

const About: React.FC = () => {
  const { t } = useTranslation();
  useScrollToTop();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const heroBackgroundUrl = `${ASSET_BASE_URL}mainherobg-comp.mp4`;

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
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        {/* Gold gradient background */}
        <div className="absolute inset-0 z-10 hero"></div>
        {/* Pattern background */}
        <div className="absolute inset-0 z-20 heropattern"></div>
        {/* Video layer (hidden on mobile) - now above pattern */}
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
        <div className="relative z-50 text-center mt-16 text-beige">
          <h1 className="font-akhio text-4xl md:text-6xl mb-4">{t('about.title')}</h1>
          <p className="text-xl max-w-2xl mx-auto px-4">{t('about.subtitle')}</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-akhio text-4xl md:text-5xl mb-6 text-brown">{t('about.mission.title')}</h2>
            <p className="text-xl text-gray-600  max-w-3xl mx-auto text-brown">{t('about.mission.description')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t('about.mission.features.innovation.title'),
                description: t('about.mission.features.innovation.description'),
                image: 'https://mdfeywsadyvaqhsdbxqb.supabase.co/storage/v1/object/public/images//brewery.jpg',
              },
              {
                title: t('about.mission.features.quality.title'),
                description: t('about.mission.features.quality.description'),
                image: 'https://mdfeywsadyvaqhsdbxqb.supabase.co/storage/v1/object/public/images//fruitmix.jpg',
              },
              {
                title: t('about.mission.features.sustainability.title'),
                description: t('about.mission.features.sustainability.description'),
                image: 'https://mdfeywsadyvaqhsdbxqb.supabase.co/storage/v1/object/public/images//sustain1.jpg',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-beige rounded-lg overflow-hidden shadow-lg"
              >
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="p-6 text-center">
                  <h3 className="font-akhio text-2xl mb-3 text-brown">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 hero heropattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 parallaxbg">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 md:h-[500px]"
            >
              <img
                src="https://mdfeywsadyvaqhsdbxqb.supabase.co/storage/v1/object/public/images//beermeile.jpg"
                alt="DjuDju Beer Mile"
                className="w-full h-96 md:h-full object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:h-[500px] flex flex-col justify-center"
            >
              <h2 className="font-akhio text-beige text-4xl md:text-5xl mb-6">{t('about.story.title')}</h2>
              <div className="space-y-4 text-xl text-beige">
                {Array.isArray(t('about.story.content')) ? 
                  t('about.story.content').map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  )) : 
                  <p>{t('about.story.content')}</p>
                }
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-akhio text-4xl md:text-5xl mb-6 text-brown">{t('about.team.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('about.team.subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: t('about.team.members.brewer.name'),
                role: t('about.team.members.brewer.role'),
                description: t('about.team.members.brewer.description'),
                image: 'https://mdfeywsadyvaqhsdbxqb.supabase.co/storage/v1/object/public/images//andy1.jpg',
              },
              {
                name: t('about.team.members.ceo.name'),
                role: t('about.team.members.ceo.role'),
                description: t('about.team.members.ceo.description'),
                image: 'https://mdfeywsadyvaqhsdbxqb.supabase.co/storage/v1/object/public/images//rontos1.png',
              },
              {
                name: t('about.team.members.innovation.name'),
                role: t('about.team.members.innovation.role'),
                description: t('about.team.members.innovation.description'),
                image: 'https://mdfeywsadyvaqhsdbxqb.supabase.co/storage/v1/object/public/images//frank1.png',
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="font-akhio text-2xl mb-2 text-brown">{member.name}</h3>
                <p className="text-yellow-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;