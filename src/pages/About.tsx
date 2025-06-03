import React from 'react';
import Layout from '../components/layout/Layout';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { motion } from 'framer-motion';
import HorizontalBar from '../components/HorizontalBar';

const About: React.FC = () => {
  const { t } = useTranslation();
  useScrollToTop();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        {/* Gold gradient background */}
        <div className="absolute inset-0 z-10 hero heropattern"></div>

        {/* Content */}
        <div className="relative z-20 text-center mt-16 text-beige">
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
      <section className="py-20  hero heropattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 parallaxbg">
          <div className="grid md:grid-cols-2 gap-12 items-center">
           
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-lg overflow-hidden"
            >
              <img
                src="https://mdfeywsadyvaqhsdbxqb.supabase.co/storage/v1/object/public/images//beermeile.jpg"
                alt="Brewing process"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
             <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-akhio text-beige text-4xl md:text-5xl mb-6">{t('about.story.title')}</h2>
              <div className="space-y-4 text-xl text-beige">
                {t('about.story.content').map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
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
                ...t('about.team.members.brewer'),
                image: 'https://mdfeywsadyvaqhsdbxqb.supabase.co/storage/v1/object/public/images//andy1.jpg',
              },
              {
                ...t('about.team.members.ceo'),
                image: 'https://mdfeywsadyvaqhsdbxqb.supabase.co/storage/v1/object/public/images//rontos1.png',
              },

              {
                ...t('about.team.members.innovation'),
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