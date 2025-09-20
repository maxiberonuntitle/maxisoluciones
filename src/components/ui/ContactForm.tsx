import React, { useState } from 'react';
import { SendIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
const ContactForm = () => {
  const {
    t
  } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };
    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.required');
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.form.invalid_email');
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.required');
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Create mailto link with form data
        const subject = formData.subject ? 
          `${t('contact.form.subject_options.' + formData.subject)} - ${formData.name}` : 
          `Contacto desde web - ${formData.name}`;
        
        const body = `Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone || 'No proporcionado'}
Asunto: ${formData.subject ? t('contact.form.subject_options.' + formData.subject) : 'No especificado'}

Mensaje:
${formData.message}`;

        const mailtoLink = `mailto:maxisolucionesdigitales@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Simulate success after a short delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitted(true);
        
        // Reset form after delay
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
          setIsSubmitted(false);
        }, 3000);
        
      } catch (error) {
        console.error('Error sending email:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  const handleFocus = (name: string) => {
    setFocused(name);
  };
  const handleBlur = () => {
    setFocused(null);
  };
  return <div className="bg-blue-900/30 backdrop-blur-sm p-8 rounded-xl shadow-lg relative overflow-hidden group border border-blue-800/50">
      {/* Background gradient accents */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
      {/* Success overlay */}
      <div className={`absolute inset-0 bg-blue-900/90 flex flex-col items-center justify-center z-20 transition-all duration-500 ${isSubmitted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          {t('contact.form.success')}
        </h3>
        <p className="text-blue-200 text-center">
          {t('contact.form.success_message')}
        </p>
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-6 text-white relative inline-block">
          {t('contact.title')}
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
        </h3>
        <form onSubmit={handleSubmit} className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="relative">
              <label htmlFor="name" className={`block text-sm font-medium mb-1 transition-all duration-300 ${focused === 'name' ? 'text-blue-300' : 'text-blue-200'}`}>
                {t('contact.form.name')}*
              </label>
              <div className="relative">
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} onFocus={() => handleFocus('name')} onBlur={handleBlur} className={`w-full px-4 py-2 bg-blue-800/30 border rounded-lg transition-all duration-300 text-white ${errors.name ? 'border-red-500 bg-red-900/20' : focused === 'name' ? 'border-blue-400 ring-2 ring-blue-500/20 bg-blue-800/50' : 'border-blue-700 hover:border-blue-600'}`} placeholder={t('contact.form.placeholder_name')} />
                {/* Animated bottom border */}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 ${focused === 'name' ? 'w-full' : ''}`}></span>
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-400 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.name}
                </p>}
            </div>
            <div className="relative">
              <label htmlFor="email" className={`block text-sm font-medium mb-1 transition-all duration-300 ${focused === 'email' ? 'text-blue-300' : 'text-blue-200'}`}>
                {t('contact.form.email')}*
              </label>
              <div className="relative">
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} onFocus={() => handleFocus('email')} onBlur={handleBlur} className={`w-full px-4 py-2 bg-blue-800/30 border rounded-lg transition-all duration-300 text-white ${errors.email ? 'border-red-500 bg-red-900/20' : focused === 'email' ? 'border-blue-400 ring-2 ring-blue-500/20 bg-blue-800/50' : 'border-blue-700 hover:border-blue-600'}`} placeholder={t('contact.form.placeholder_email')} />
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 ${focused === 'email' ? 'w-full' : ''}`}></span>
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-400 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.email}
                </p>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="relative">
              <label htmlFor="phone" className={`block text-sm font-medium mb-1 transition-all duration-300 ${focused === 'phone' ? 'text-blue-300' : 'text-blue-200'}`}>
                {t('contact.form.phone')}
              </label>
              <div className="relative">
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} onFocus={() => handleFocus('phone')} onBlur={handleBlur} className={`w-full px-4 py-2 bg-blue-800/30 border rounded-lg transition-all duration-300 text-white ${focused === 'phone' ? 'border-blue-400 ring-2 ring-blue-500/20 bg-blue-800/50' : 'border-blue-700 hover:border-blue-600'}`} placeholder={t('contact.form.placeholder_phone')} />
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 ${focused === 'phone' ? 'w-full' : ''}`}></span>
              </div>
            </div>
            <div className="relative">
              <label htmlFor="subject" className={`block text-sm font-medium mb-1 transition-all duration-300 ${focused === 'subject' ? 'text-blue-300' : 'text-blue-200'}`}>
                {t('contact.form.subject')}
              </label>
              <div className="relative">
                <select id="subject" name="subject" value={formData.subject} onChange={handleChange} onFocus={() => handleFocus('subject')} onBlur={handleBlur} className={`w-full px-4 py-2 bg-blue-800/30 border rounded-lg transition-all duration-300 text-white ${focused === 'subject' ? 'border-blue-400 ring-2 ring-blue-500/20 bg-blue-800/50' : 'border-blue-700 hover:border-blue-600'}`}>
                  <option value="">{t('contact.form.placeholder_subject')}</option>
                  <option value="web_development">{t('contact.form.subject_options.web_development')}</option>
                  <option value="digital_marketing">{t('contact.form.subject_options.digital_marketing')}</option>
                  <option value="business_consulting">{t('contact.form.subject_options.business_consulting')}</option>
                  <option value="other">{t('contact.form.subject_options.other')}</option>
                </select>
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 ${focused === 'subject' ? 'w-full' : ''}`}></span>
              </div>
            </div>
          </div>
          <div className="mb-6 relative">
            <label htmlFor="message" className={`block text-sm font-medium mb-1 transition-all duration-300 ${focused === 'message' ? 'text-blue-300' : 'text-blue-200'}`}>
              {t('contact.form.message')}*
            </label>
            <div className="relative">
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} onFocus={() => handleFocus('message')} onBlur={handleBlur} rows={5} className={`w-full px-4 py-2 bg-blue-800/30 border rounded-lg transition-all duration-300 text-white ${errors.message ? 'border-red-500 bg-red-900/20' : focused === 'message' ? 'border-blue-400 ring-2 ring-blue-500/20 bg-blue-800/50' : 'border-blue-700 hover:border-blue-600'}`} placeholder={t('contact.form.placeholder_message')}></textarea>
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 ${focused === 'message' ? 'w-full' : ''}`}></span>
            </div>
            {errors.message && <p className="mt-1 text-sm text-red-400 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.message}
              </p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 relative overflow-hidden">
            <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <span className="relative flex items-center justify-center">
              {isSubmitting ? <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </> : <>
                  {t('contact.form.submit')}
                  <SendIcon className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </>}
            </span>
          </button>
        </form>
      </div>
    </div>;
};
export default ContactForm;