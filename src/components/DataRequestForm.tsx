import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const DataRequestForm: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    requestType: '',
    details: '',
    consent: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 hero heropattern p-6 rounded-lg shadow-sm">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {language === 'en' ? 'Full Name' : 'Vollständiger Name'}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {language === 'en' ? 'Email Address' : 'E-Mail-Adresse'}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="requestType" className="block text-sm font-medium text-gray-700">
          {language === 'en' ? 'Request Type' : 'Art der Anfrage'}
        </label>
        <select
          id="requestType"
          name="requestType"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          value={formData.requestType}
          onChange={handleChange}
        >
          <option value="">
            {language === 'en' ? 'Select a request type' : 'Wählen Sie eine Anfrageart'}
          </option>
          <option value="access">
            {language === 'en' ? 'Access my data' : 'Zugriff auf meine Daten'}
          </option>
          <option value="rectification">
            {language === 'en' ? 'Correct my data' : 'Meine Daten korrigieren'}
          </option>
          <option value="erasure">
            {language === 'en' ? 'Delete my data' : 'Meine Daten löschen'}
          </option>
          <option value="restriction">
            {language === 'en' ? 'Restrict processing' : 'Verarbeitung einschränken'}
          </option>
          <option value="portability">
            {language === 'en' ? 'Data portability' : 'Datenübertragbarkeit'}
          </option>
          <option value="objection">
            {language === 'en' ? 'Object to processing' : 'Verarbeitung widersprechen'}
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="details" className="block text-sm font-medium text-gray-700">
          {language === 'en' ? 'Additional Details' : 'Weitere Details'}
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          value={formData.details}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          checked={formData.consent}
          onChange={handleChange}
        />
        <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
          {language === 'en' 
            ? 'I confirm that I am the data subject and the information provided is accurate'
            : 'Ich bestätige, dass ich der Betroffene bin und die angegebenen Informationen korrekt sind'}
        </label>
      </div>

      <button
        type="submit"
        className="w-full btn-primary"
      >
        {language === 'en' ? 'Submit Request' : 'Anfrage einreichen'}
      </button>
    </form>
  );
};

export default DataRequestForm;