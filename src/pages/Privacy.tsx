import React from 'react';
import Layout from '../components/layout/Layout';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { motion } from 'framer-motion';
import { HandDrawnShield, HandDrawnLock, HandDrawnUserCheck, HandDrawnFileText } from '../components/icons';
import DataRequestForm from '../components/DataRequestForm';

const Privacy: React.FC = () => {
  const { t } = useTranslation();
  useScrollToTop();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden hero">
         {/* Gold gradient background */}
        <div className="absolute inset-0 z-10 hero heropattern"></div>
        <div className="relative z-10 mt-16  text-center text-beige">
          <h1 className="font-akhio text-4xl md:text-6xl mb-4">{t('privacy.title')}</h1>
          <p className="text-xl max-w-2xl mx-auto px-4">
            {t('privacy.subtitle')}
          </p>
        </div>
      </section>

      {/* Key Privacy Features */}
      <section className="py-20 bg-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: <HandDrawnShield className="w-8 h-8" />,
                ...t('privacy.features.protection')
              },
              {
                icon: <HandDrawnLock className="w-8 h-8" />,
                ...t('privacy.features.storage')
              },
              {
                icon: <HandDrawnUserCheck className="w-8 h-8" />,
                ...t('privacy.features.rights')
              },
              {
                icon: <HandDrawnFileText className="w-8 h-8" />,
                ...t('privacy.features.transparency')
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-beige rounded-lg"
              >
                <div className="text-yellow-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-akhio text-xl mb-2 text-brown">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Privacy Content */}
          <div className="max-w-4xl mx-auto prose prose-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-akhio text-3xl mb-6 text-brown">{t('privacy.content.introduction.title')}</h2>
              <p className="text-gray-600 mb-8">
                {t('privacy.content.introduction.text')}
              </p>

              <h2 className="font-akhio text-3xl mb-6 text-brown">{t('privacy.content.collection.title')}</h2>
              <ul className="list-disc pl-6 mb-8 text-gray-600">
                {t('privacy.content.collection.items').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="font-akhio text-3xl mb-6 text-brown">{t('privacy.content.usage.title')}</h2>
              <ul className="list-disc pl-6 mb-8 text-gray-600">
                {t('privacy.content.usage.items').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="font-akhio text-3xl mb-6 text-brown">{t('privacy.content.rights.title')}</h2>
              <ul className="list-disc pl-6 mb-8 text-gray-600">
                {t('privacy.content.rights.items').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Data Request Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto mt-16"
          >
            <h2 className="font-akhio text-3xl mb-6 text-center text-brown">
              {t('privacy.content.rights.title')}
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              {t('privacy.content.introduction.text')}
            </p>
            <DataRequestForm />
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-akhio text-3xl mb-4 text-brown">{t('privacy.contact.title')}</h2>
            <p className="text-gray-600 mb-4">
              {t('privacy.contact.text')}
            </p>
            <a 
              href={`mailto:${t('privacy.contact.email')}`}
              className="text-yellow-600 hover:text-yellow-700 transition-colors font-semibold"
            >
              {t('privacy.contact.email')}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;