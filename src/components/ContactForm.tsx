import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const ContactForm: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-beige mb-1">
            {language === 'en' ? 'Name' : 'Name'}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-beige mb-1">
            {language === 'en' ? 'Email' : 'E-Mail'}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-beige mb-1">
          {language === 'en' ? 'Subject' : 'Betreff'}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-beige mb-1">
          {language === 'en' ? 'Message' : 'Nachricht'}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-full btn-primary"
      >
        {language === 'en' ? 'Send Message' : 'Nachricht senden'}
      </button>
    </form>
  );
};

export default ContactForm;