import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Users, BarChart, TrendingUp, PieChart, CheckCircle, Briefcase, Lightbulb } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useNavigationWithScroll } from '../components/utils/NavigationUtils';
import { useLanguage } from '../components/context/LanguageContext';
const BusinessConsultingPage = () => {
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
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500 opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/0 via-blue-900/10 to-blue-900/30"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Back button */}
          <button 
            onClick={() => navigateToHomeWithScroll('servicios')}
            className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>{t('pages.business_consulting.back_to_home')}</span>
          </button>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              {t('pages.business_consulting.title')}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 md:mb-10 px-4 md:px-0">
              {t('pages.business_consulting.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <button 
                onClick={() => navigateToHomeWithScroll('contacto')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm md:text-base"
              >
                {t('pages.business_consulting.request_consultation')}
              </button>
              <a href="#areas" className="bg-transparent border-2 border-blue-400 text-blue-100 hover:text-white hover:border-white font-medium py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 text-sm md:text-base">
{t('pages.business_consulting.explore_areas')}
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Areas of Consulting */}
      <AnimatedSection id="areas" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {t('pages.business_consulting.areas_title')}
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              {t('pages.business_consulting.areas_subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Area Card 3 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.2s'
          }}>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                  <PieChart className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {t('pages.business_consulting.area_processes.title')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('pages.business_consulting.area_processes.description')}
                </p>
                <ul className="space-y-2">
                  {(() => {
                    const features = t('pages.business_consulting.area_processes.features');
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
            {/* Area Card 4 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.3s'
          }}>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                  <BarChart className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {t('pages.business_consulting.area_crm.title')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('pages.business_consulting.area_crm.description')}
                </p>
                <ul className="space-y-2">
                  {(() => {
                    const features = t('pages.business_consulting.area_crm.features');
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
            {/* Area Card 6 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.5s'
          }}>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                  <Lightbulb className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {t('pages.business_consulting.area_innovation.title')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('pages.business_consulting.area_innovation.description')}
                </p>
                <ul className="space-y-2">
                  {(() => {
                    const features = t('pages.business_consulting.area_innovation.features');
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
      {/* Benefits Section */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {t('pages.business_consulting.benefits_title')}
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              {t('pages.business_consulting.benefits_subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit Card 1 */}
            <div className="bg-blue-50 rounded-xl p-6 animate-on-scroll opacity-0 translate-y-8">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {t('pages.business_consulting.benefits.sales.title')}
              </h3>
              <p className="text-gray-600">
                {t('pages.business_consulting.benefits.sales.description')}
              </p>
            </div>
            {/* Benefit Card 2 */}
            <div className="bg-blue-50 rounded-xl p-6 animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.1s'
          }}>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {t('pages.business_consulting.benefits.efficiency.title')}
              </h3>
              <p className="text-gray-600">
                {t('pages.business_consulting.benefits.efficiency.description')}
              </p>
            </div>
            {/* Benefit Card 3 */}
            <div className="bg-blue-50 rounded-xl p-6 animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.2s'
          }}>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {t('pages.business_consulting.benefits.processes.title')}
              </h3>
              <p className="text-gray-600">
                {t('pages.business_consulting.benefits.processes.description')}
              </p>
            </div>
            {/* Benefit Card 4 */}
            <div className="bg-blue-50 rounded-xl p-6 animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.3s'
          }}>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {t('pages.business_consulting.benefits.decisions.title')}
              </h3>
              <p className="text-gray-600">
                {t('pages.business_consulting.benefits.decisions.description')}
              </p>
            </div>
            {/* Benefit Card 5 */}
            <div className="bg-blue-50 rounded-xl p-6 animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.4s'
          }}>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {t('pages.business_consulting.benefits.competitive.title')}
              </h3>
              <p className="text-gray-600">
                {t('pages.business_consulting.benefits.competitive.description')}
              </p>
            </div>
            {/* Benefit Card 6 */}
            <div className="bg-blue-50 rounded-xl p-6 animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.5s'
          }}>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {t('pages.business_consulting.benefits.culture.title')}
              </h3>
              <p className="text-gray-600">
                {t('pages.business_consulting.benefits.culture.description')}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('pages.business_consulting.cta_title')}
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            {t('pages.business_consulting.cta_subtitle')}
          </p>
          <button 
            onClick={() => navigateToHomeWithScroll('contacto')}
            className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-block"
          >
            {t('pages.business_consulting.request_consultation')}
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
export default BusinessConsultingPage;