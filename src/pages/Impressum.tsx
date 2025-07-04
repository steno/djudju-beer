import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Impressum: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-brown text-beige pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="font-akhio text-4xl md:text-5xl mb-4">
            {t('impressum.title')}
          </h1>
          <p className="text-xl opacity-80">
            {t('impressum.subtitle')}
          </p>
        </div>

        <div className="prose prose-lg prose-invert max-w-none">
          <div className="space-y-8">
            {/* Company Information */}
            <section>
              <h2 className="font-akhio text-2xl mb-4">{t('impressum.company.title')}</h2>
              <div className="space-y-2 text-beige opacity-80">
                <p>D. Tagoe Imports</p>
                <p>{t('impressum.company.address.line1')}</p>
                <p>{t('impressum.company.address.line2')}</p>
                <p>{t('impressum.company.address.line3')}</p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="font-akhio text-2xl mb-4">{t('impressum.contact.title')}</h2>
              <div className="space-y-2 text-beige opacity-80">
                <p><strong>{t('impressum.contact.phone')}:</strong> +49 30 123456789</p>
                <p><strong>{t('impressum.contact.email')}:</strong> info@djudju.com</p>
                <p><strong>{t('impressum.contact.website')}:</strong> www.djudju.com</p>
              </div>
            </section>

            {/* Legal Representatives */}
            <section>
              <h2 className="font-akhio text-2xl mb-4">{t('impressum.representatives.title')}</h2>
              <div className="space-y-2 text-beige opacity-80">
                <p>{t('impressum.representatives.ceo')}: David Nii Ayi Tagoe</p>
          
              </div>
            </section>

            {/* Commercial Register */}
            <section>
              <h2 className="font-akhio text-2xl mb-4">{t('impressum.register.title')}</h2>
              <div className="space-y-2 text-beige opacity-80">
                <p>{t('impressum.register.court')}: Amtsgericht Berlin-Charlottenburg</p>
                <p>{t('impressum.register.number')}: HRB 123456</p>
                <p>{t('impressum.register.vat')}: DE123456789</p>
              </div>
            </section>

            {/* Content Responsibility */}
            <section>
              <h2 className="font-akhio text-2xl mb-4">{t('impressum.responsibility.title')}</h2>
              <div className="space-y-2 text-beige opacity-80">
                <p>{t('impressum.responsibility.content')}</p>
                <p>{t('impressum.responsibility.person')}: David Nii Ayi Tagoe</p>
                <p>{t('impressum.responsibility.address')}: Konradinstraße 5, 12105 Berlin, Germany</p>
              </div>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="font-akhio text-2xl mb-4">{t('impressum.disclaimer.title')}</h2>
              <div className="space-y-4 text-beige opacity-80">
                <p>{t('impressum.disclaimer.content')}</p>
                <p>{t('impressum.disclaimer.links')}</p>
                <p>{t('impressum.disclaimer.copyright')}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum; 