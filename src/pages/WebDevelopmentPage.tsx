import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Code, Server, Smartphone, Globe, CheckCircle, Users, Zap } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useNavigationWithScroll } from '../components/utils/NavigationUtils';
import { useLanguage } from '../components/context/LanguageContext';
const WebDevelopmentPage = () => {
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
  return <div ref={pageRef} className={`transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
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
            onClick={() => navigateToHomeWithScroll('servicios')}
            className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>{t('pages.web_development.back_to_home')}</span>
          </button>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white leading-tight">
              {t('pages.web_development.title')}
            </h1>
            <p className="text-lg md:text-lg lg:text-xl text-blue-100 mb-8 md:mb-10 px-4 md:px-0">
              {t('pages.web_development.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6">
              <button 
                onClick={() => navigateToHomeWithScroll('contacto')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 md:py-3 lg:py-4 px-6 md:px-7 lg:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm md:text-sm lg:text-base"
              >
                {t('pages.web_development.request_quote')}
              </button>
              <a href="#proceso" className="bg-transparent border-2 border-blue-400 text-blue-100 hover:text-white hover:border-white font-medium py-3 md:py-3 lg:py-4 px-6 md:px-7 lg:px-8 rounded-lg transition-all duration-300 text-sm md:text-sm lg:text-base">
                {t('pages.web_development.see_process')}
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Services Grid */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-4 text-gray-900">
              {t('pages.web_development.services_title')}
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl lg:text-xl text-gray-600">
              {t('pages.web_development.services_subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-6 lg:gap-8 xl:gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8">
              <div className="p-4 md:p-5 lg:p-6">
                <div className="w-12 h-12 md:w-13 lg:w-14 md:h-13 lg:h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 md:mb-5">
                  <Globe className="h-6 w-6 md:h-6 lg:h-7 md:w-6 lg:w-7 text-blue-600" />
                </div>
                <h3 className="text-lg md:text-lg lg:text-xl font-bold mb-3 text-gray-900">
                  {t('pages.web_development.service_corporate.title')}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  {t('pages.web_development.service_corporate.description')}
                </p>
                <ul className="space-y-2">
                  {(() => {
                    const features = t('pages.web_development.service_corporate.features');
                    const featuresArray = Array.isArray(features) ? features : [];
                    return featuresArray.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ));
                  })()}
                </ul>
              </div>
            </div>
            {/* Service Card 2 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.1s'
          }}>
              <div className="p-4 md:p-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-4 md:mb-5">
                  <Code className="h-6 w-6 md:h-7 md:w-7 text-indigo-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">
                  {t('pages.web_development.service_apps.title')}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  {t('pages.web_development.service_apps.description')}
                </p>
                <ul className="space-y-2">
                  {(() => {
                    const features = t('pages.web_development.service_apps.features');
                    const featuresArray = Array.isArray(features) ? features : [];
                    return featuresArray.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ));
                  })()}
                </ul>
              </div>
            </div>
            {/* Service Card 3 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.2s'
          }}>
              <div className="p-4 md:p-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 md:mb-5">
                  <Smartphone className="h-6 w-6 md:h-7 md:w-7 text-blue-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">
                  {t('pages.web_development.service_responsive.title')}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  {t('pages.web_development.service_responsive.description')}
                </p>
                <ul className="space-y-2">
                  {(() => {
                    const features = t('pages.web_development.service_responsive.features');
                    const featuresArray = Array.isArray(features) ? features : [];
                    return featuresArray.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ));
                  })()}
                </ul>
              </div>
            </div>
            {/* Service Card 4 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.3s'
          }}>
              <div className="p-4 md:p-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-4 md:mb-5">
                  <Server className="h-6 w-6 md:h-7 md:w-7 text-indigo-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">
                  {t('pages.web_development.service_ecommerce.title')}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  {t('pages.web_development.service_ecommerce.description')}
                </p>
                <ul className="space-y-2">
                  {(() => {
                    const features = t('pages.web_development.service_ecommerce.features');
                    const featuresArray = Array.isArray(features) ? features : [];
                    return featuresArray.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ));
                  })()}
                </ul>
              </div>
            </div>
            {/* Service Card 5 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.4s'
          }}>
              <div className="p-4 md:p-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 md:mb-5">
                  <Users className="h-6 w-6 md:h-7 md:w-7 text-blue-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">
                  {t('pages.web_development.service_cms.title')}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  {t('pages.web_development.service_cms.description')}
                </p>
                <ul className="space-y-2">
                  {(() => {
                    const features = t('pages.web_development.service_cms.features');
                    const featuresArray = Array.isArray(features) ? features : [];
                    return featuresArray.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ));
                  })()}
                </ul>
              </div>
            </div>
            {/* Service Card 6 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.5s'
          }}>
              <div className="p-4 md:p-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-4 md:mb-5">
                  <Zap className="h-6 w-6 md:h-7 md:w-7 text-indigo-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">
                  {t('pages.web_development.service_maintenance.title')}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  {t('pages.web_development.service_maintenance.description')}
                </p>
                <ul className="space-y-2">
                  {(() => {
                    const features = t('pages.web_development.service_maintenance.features');
                    const featuresArray = Array.isArray(features) ? features : [];
                    return featuresArray.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ));
                  })()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {/* Process Section */}
      <AnimatedSection id="proceso" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-4 text-gray-900">
              {t('pages.web_development.process_title')}
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl lg:text-xl text-gray-600">
              {t('pages.web_development.process_subtitle')}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {/* Process Steps */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-blue-200 z-0"></div>
              {/* Step 1 */}
              <div className="relative z-10 mb-12 md:mb-20 animate-on-scroll opacity-0 translate-y-8">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 order-2 md:order-1 md:text-right md:pr-8 lg:pr-10 xl:pr-12 mt-6 md:mt-0">
                    <h3 className="text-xl md:text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                      {t('pages.web_development.process_steps.analysis.title')}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600">
                      {t('pages.web_development.process_steps.analysis.description')}
                    </p>
                  </div>
                  <div className="flex-shrink-0 order-1 md:order-2 bg-blue-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-bold text-sm md:text-base">1</span>
                  </div>
                </div>
              </div>
              {/* Step 2 */}
              <div className="relative z-10 mb-12 md:mb-20 animate-on-scroll opacity-0 translate-y-8" style={{
              transitionDelay: '0.1s'
            }}>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-shrink-0 order-1 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-bold">2</span>
                  </div>
                  <div className="flex-1 order-2 md:pl-10 lg:pl-12 mt-6 md:mt-0">
                    <h3 className='text-xl md:text-xl lg:text-2xl font-bold text-gray-900 mb-3'>
                      {t('pages.web_development.process_steps.design.title')}
                    </h3>
                    <p className='text-gray-600'>
                      {t('pages.web_development.process_steps.design.description')}
                    </p>
                  </div>
                </div>
              </div>
              {/* Step 3 */}
              <div className="relative z-10 mb-12 md:mb-20 animate-on-scroll opacity-0 translate-y-8" style={{
              transitionDelay: '0.2s'
            }}>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 order-2 md:order-1 md:text-right md:pr-10 lg:pr-12 mt-6 md:mt-0">
                    <h3 className='text-xl md:text-xl lg:text-2xl font-bold text-gray-900 mb-3'>
                      {t('pages.web_development.process_steps.development.title')}
                    </h3>
                    <p className='text-gray-600'>
                      {t('pages.web_development.process_steps.development.description')}
                    </p>
                  </div>
                  <div className="flex-shrink-0 order-1 md:order-2 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-bold">3</span>
                  </div>
                </div>
              </div>
              {/* Step 4 */}
              <div className="relative z-10 mb-12 md:mb-20 animate-on-scroll opacity-0 translate-y-8" style={{
              transitionDelay: '0.3s'
            }}>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-shrink-0 order-1 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-bold">4</span>
                  </div>
                  <div className="flex-1 order-2 md:pl-10 lg:pl-12 mt-6 md:mt-0">
                    <h3 className='text-xl md:text-xl lg:text-2xl font-bold text-gray-900 mb-3'>
                      {t('pages.web_development.process_steps.testing.title')}
                    </h3>
                    <p className='text-gray-600'>
                      {t('pages.web_development.process_steps.testing.description')}
                    </p>
                  </div>
                </div>
              </div>
              {/* Step 5 */}
              <div className="relative z-10 animate-on-scroll opacity-0 translate-y-8" style={{
              transitionDelay: '0.4s'
            }}>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 order-2 md:order-1 md:text-right md:pr-10 lg:pr-12 mt-6 md:mt-0">
                    <h3 className='text-xl md:text-xl lg:text-2xl font-bold text-gray-900 mb-3'>
                      {t('pages.web_development.process_steps.launch.title')}
                    </h3>
                    <p className='text-gray-600'>
                      {t('pages.web_development.process_steps.launch.description')}
                    </p>
                  </div>
                  <div className="flex-shrink-0 order-1 md:order-2 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-bold">5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6">
            {t('pages.web_development.cta_title')}
          </h2>
          <p className="text-lg md:text-xl lg:text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            {t('pages.web_development.cta_subtitle')}
          </p>
          <button 
            onClick={() => navigateToHomeWithScroll('contacto')}
            className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 md:py-3 lg:py-4 px-6 md:px-7 lg:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-block"
          >
            {t('pages.web_development.request_quote')}
          </button>
        </div>
      </AnimatedSection>
      <style>{`
        .animate-on-scroll {
          transition:
            opacity 0.8s ease-out,
            transform 0.8s ease-out;
        }
        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>;
};
export default WebDevelopmentPage;