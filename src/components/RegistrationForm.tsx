// Created by Raihan Patel
// Registration form component with Slovak-specific fields

import React, { useState } from 'react';

interface RegistrationData {
  studentName: string;
  dateOfBirth: string;
  languageLevel: string;
  parentName: string;
  email: string;
  phone: string;
  address: string;
  slovakBackground: string;
  emergencyContact: string;
  medicalInfo: string;
  photoConsent: boolean;
  termsAccepted: boolean;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    studentName: '',
    dateOfBirth: '',
    languageLevel: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    slovakBackground: '',
    emergencyContact: '',
    medicalInfo: '',
    photoConsent: false,
    termsAccepted: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation and submission logic
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Registračný Formulár / Registration Form</h2>

      {/* Student Information */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Informácie o Študentovi / Student Information</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meno a Priezvisko / Full Name *
            </label>
            <input
              type="text"
              name="studentName"
              required
              value={formData.studentName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dátum Narodenia / Date of Birth *
            </label>
            <input
              type="date"
              name="dateOfBirth"
              required
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Language Level */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Úroveň Jazyka / Language Level</h3>
        <select
          name="languageLevel"
          value={formData.languageLevel}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Vyberte úroveň / Select level</option>
          <option value="beginner">Začiatočník / Beginner</option>
          <option value="intermediate">Mierne Pokročilý / Intermediate</option>
          <option value="advanced">Pokročilý / Advanced</option>
          <option value="native">Rodený Hovoriaci / Native Speaker</option>
        </select>
      </section>

      {/* Contact Information */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Kontaktné Údaje / Contact Information</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Telefón / Phone *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Dodatočné Informácie / Additional Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Slovenský Pôvod / Slovak Background
            </label>
            <textarea
              name="slovakBackground"
              rows={3}
              value={formData.slovakBackground}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Prosím, opíšte vaše slovenské korene / Please describe your Slovak background"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Zdravotné Informácie / Medical Information
            </label>
            <textarea
              name="medicalInfo"
              rows={3}
              value={formData.medicalInfo}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Alergie, lieky, alebo iné zdravotné informácie / Allergies, medications, or other health information"
            ></textarea>
          </div>
        </div>
      </section>

      {/* Consents */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Súhlasy / Consents</h3>
        <div className="space-y-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              name="photoConsent"
              checked={formData.photoConsent}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 block text-sm text-gray-700">
              Súhlasím s fotografovaním a natáčaním počas aktivít / 
              I consent to photography and video recording during activities
            </span>
          </label>
          <label className="flex items-start">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              required
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 block text-sm text-gray-700">
              Súhlasím s podmienkami a pravidlami školy * /
              I agree to the school's terms and conditions *
            </span>
          </label>
        </div>
      </section>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   transition-colors duration-200"
      >
        Odoslať Registráciu / Submit Registration
      </button>
    </form>
  );
};

export default RegistrationForm;