import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Globe, MapPin, Search, Smartphone, CheckCircle, Users, Zap, BarChart, Target } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useNavigationWithScroll } from '../components/utils/NavigationUtils';
import { useLanguage } from '../components/context/LanguageContext';

const AntonioYadamaPage = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const { navigateToHomeWithScroll } = useNavigationWithScroll();

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.8;
        if (isInView) {
          el.classList.add('is-visible');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={pageRef} className={`transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-indigo-500 opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/0 via-blue-900/10 to-blue-900/30"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Back button */}
          <button 
            onClick={() => navigateToHomeWithScroll('proyectos')}
            className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>{t('common.back')}</span>
          </button>
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white leading-tight">
              {t('project_pages.antonio_yadama.hero.title')} <span className="text-blue-400">{t('project_pages.antonio_yadama.hero.title_highlight')}</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-xl text-blue-100 mb-8 md:mb-10 px-4 md:px-0">
              {t('project_pages.antonio_yadama.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <a 
                href="https://antonioyadama.es" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm md:text-base"
              >
                {t('projects.view_project')}
              </a>
              <a href="#proceso" className="bg-transparent border-2 border-blue-400 text-blue-100 hover:text-white hover:border-white font-medium py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 text-sm md:text-base">
                {t('common.learn_more')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0 translate-y-8">
              <div className="rounded-xl overflow-hidden border-2 border-gray-200 shadow-xl">
                <img src="/antonioyadamajardineria.png" alt="Sitio web de Antonio Yadama" className="w-full h-auto aspect-video object-cover" />
              </div>
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.2s' }}>
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6 text-gray-900">
                {t('project_pages.antonio_yadama.overview.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('project_pages.antonio_yadama.overview.description')}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">{t('projects.web_development')}</h3>
                  <p className="text-blue-700 text-sm">{t('project_pages.antonio_yadama.overview.web_development')}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">SEO</h3>
                  <p className="text-green-700 text-sm">{t('project_pages.antonio_yadama.overview.seo')}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Google Maps</h3>
                  <p className="text-purple-700 text-sm">{t('project_pages.antonio_yadama.overview.google_maps')}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">Diseño</h3>
                  <p className="text-orange-700 text-sm">{t('project_pages.antonio_yadama.overview.design')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Services Provided */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-4 text-gray-900">
              {t('project_pages.antonio_yadama.services.title')}
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              {t('project_pages.antonio_yadama.services.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('project_pages.antonio_yadama.services.web_development.title')}</h3>
              <p className="text-gray-600">
                {t('project_pages.antonio_yadama.services.web_development.description')}
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('project_pages.antonio_yadama.services.seo_specialized.title')}</h3>
              <p className="text-gray-600">
                {t('project_pages.antonio_yadama.services.seo_specialized.description')}
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('project_pages.antonio_yadama.services.google_maps.title')}</h3>
              <p className="text-gray-600">
                {t('project_pages.antonio_yadama.services.google_maps.description')}
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Smartphone className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('project_pages.antonio_yadama.services.responsive_design.title')}</h3>
              <p className="text-gray-600">
                {t('project_pages.antonio_yadama.services.responsive_design.description')}
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('project_pages.antonio_yadama.services.digital_portfolio.title')}</h3>
              <p className="text-gray-600">
                {t('project_pages.antonio_yadama.services.digital_portfolio.description')}
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.5s' }}>
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('project_pages.antonio_yadama.services.contact_optimized.title')}</h3>
              <p className="text-gray-600">
                {t('project_pages.antonio_yadama.services.contact_optimized.description')}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Results Section */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-4 text-gray-900">
              {t('project_pages.antonio_yadama.results.title')}
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              {t('project_pages.antonio_yadama.results.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-8">
            {/* Result 1 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-6 text-center animate-on-scroll opacity-0 translate-y-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {t('project_pages.antonio_yadama.results.seo_improvement.title')}
              </h3>
              <p className="text-gray-600">
                {t('project_pages.antonio_yadama.results.seo_improvement.description')}
              </p>
            </div>

            {/* Result 2 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-6 text-center animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {t('project_pages.antonio_yadama.results.local_visibility.title')}
              </h3>
              <p className="text-gray-600">
                {t('project_pages.antonio_yadama.results.local_visibility.description')}
              </p>
            </div>

            {/* Result 3 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-6 text-center animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {t('project_pages.antonio_yadama.results.more_queries.title')}
              </h3>
              <p className="text-gray-600">
                {t('project_pages.antonio_yadama.results.more_queries.description')}
              </p>
            </div>

            {/* Result 4 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-6 text-center animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {t('project_pages.antonio_yadama.results.professional_image.title')}
              </h3>
              <p className="text-gray-600">
                {t('project_pages.antonio_yadama.results.professional_image.description')}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6">
            {t('project_pages.antonio_yadama.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            {t('project_pages.antonio_yadama.cta.description')}
          </p>
          <button 
            onClick={() => navigateToHomeWithScroll('contacto')}
            className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-block"
          >
            {t('common.contact_us')}
          </button>
        </div>
      </AnimatedSection>

      <style>{`
        .animate-on-scroll {
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default AntonioYadamaPage;
