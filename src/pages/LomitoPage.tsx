import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, ExternalLink, ChevronDown, Clock, Search, Smartphone, Database, Map, Utensils } from 'lucide-react';
import { useNavigationWithScroll } from '../components/utils/NavigationUtils';
import { useLanguage } from '../components/context/LanguageContext';

const LomitoPage = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const { navigateToHomeWithScroll } = useNavigationWithScroll();
  
  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      if (!pageRef.current) return;
      const scrollPosition = window.scrollY;
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(index);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    if (sectionRefs.current[index]) {
      window.scrollTo({
        top: sectionRefs.current[index]!.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={pageRef} className={`transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section ref={el => sectionRefs.current[0] = el as HTMLDivElement} className="relative py-20 md:py-32 bg-gradient-to-r from-cyan-900 via-blue-950 to-cyan-900 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(0deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(75deg) translateZ(-100px) translateY(-10%)'
        }}></div>
          {/* Digital particles */}
          {[...Array(15)].map((_, i) => <div key={`particle-${i}`} className="absolute rounded-full bg-cyan-400" style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.7 + 0.3,
          boxShadow: '0 0 8px 2px rgba(34, 211, 238, 0.6)',
          animation: `float ${Math.random() * 10 + 15}s infinite alternate ${Math.random() * 5}s ease-in-out`
        }}></div>)}
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Back button */}
          <button 
            onClick={() => navigateToHomeWithScroll('proyectos')}
            className="inline-flex items-center text-cyan-200 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>{t('common.back')}</span>
          </button>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-cyan-400 text-sm font-medium">
              {t('project_pages.lomito.hero.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t('project_pages.lomito.hero.title')} –{' '}
              <span className="text-cyan-400">{t('project_pages.lomito.hero.title_highlight')}</span>
            </h1>
            <p className="text-xl text-cyan-100 mb-10 max-w-2xl mx-auto">
              {t('project_pages.lomito.hero.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://lomito.netlify.app" target="_blank" rel="noopener noreferrer" className="group bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center">
                {t('project_pages.lomito.hero.visit_site')}
                <ExternalLink className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button onClick={() => scrollToSection(1)} className="bg-transparent border-2 border-cyan-400 text-cyan-100 hover:text-white hover:border-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center">
                {t('project_pages.lomito.hero.view_details')}
                <ChevronDown className="ml-2 w-4 h-4 animate-bounce" />
              </button>
            </div>
          </div>
        </div>
        {/* Navigation dots */}
        <div className="hidden md:flex flex-col fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
          {[0, 1, 2, 3, 4, 5].map(index => <button key={index} onClick={() => scrollToSection(index)} className={`w-3 h-3 rounded-full my-2 transition-all duration-300 ${activeSection === index ? 'bg-cyan-400 scale-125' : 'bg-gray-400 hover:bg-gray-300'}`} aria-label={`Scroll to section ${index + 1}`} />)}
        </div>
      </section>

      {/* About the Client Section */}
      <section ref={el => sectionRefs.current[1] = el as HTMLDivElement} className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <div className="rounded-xl overflow-hidden border-2 border-gray-800 shadow-xl" style={{
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.1)'
              }}>
                  <img 
                    src="/preview-lomito.png" 
                    alt={t('project_pages.lomito.about_client.image_alt')} 
                    className="w-full h-auto aspect-video object-cover" 
                    width="800"
                    height="450"
                    loading="lazy"
                    decoding="async"
                    style={{ aspectRatio: '16/9' }}
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-white">
                  {t('project_pages.lomito.about_client.title')}
                </h2>
                <p className="text-gray-300 mb-6">
                  {t('project_pages.lomito.about_client.description_1')}
                </p>
                <p className="text-gray-300 mb-6">
                  {t('project_pages.lomito.about_client.description_2')}
                </p>
                <div className="flex items-center text-cyan-400 font-medium">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{t('project_pages.lomito.about_client.established')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview Section */}
      <section ref={el => sectionRefs.current[2] = el as HTMLDivElement} className="py-16 bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-white text-center">
              {t('project_pages.lomito.overview.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto">
              {t('project_pages.lomito.overview.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center">
                <Utensils className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">
                  {t('project_pages.lomito.overview.web_development')}
                </h3>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center">
                <Search className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">
                  {t('project_pages.lomito.overview.local_seo')}
                </h3>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center">
                <Map className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">
                  {t('project_pages.lomito.overview.google_maps')}
                </h3>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center">
                <Smartphone className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">
                  {t('project_pages.lomito.overview.responsive_design')}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={el => sectionRefs.current[3] = el as HTMLDivElement} className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-white text-center">
              {t('project_pages.lomito.services.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-12 text-center">
              {t('project_pages.lomito.services.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all duration-300 hover:border-cyan-700 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-cyan-900/20 group">
                <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-800/50 transition-colors">
                  <Smartphone className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                  {t('project_pages.lomito.services.web_development.title')}
                </h3>
                <p className="text-gray-300">
                  {t('project_pages.lomito.services.web_development.description')}
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all duration-300 hover:border-cyan-700 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-cyan-900/20 group">
                <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-800/50 transition-colors">
                  <Search className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                  {t('project_pages.lomito.services.local_seo.title')}
                </h3>
                <p className="text-gray-300">
                  {t('project_pages.lomito.services.local_seo.description')}
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all duration-300 hover:border-cyan-700 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-cyan-900/20 group">
                <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-800/50 transition-colors">
                  <Map className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                  {t('project_pages.lomito.services.google_maps.title')}
                </h3>
                <p className="text-gray-300">
                  {t('project_pages.lomito.services.google_maps.description')}
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all duration-300 hover:border-cyan-700 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-cyan-900/20 group">
                <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-800/50 transition-colors">
                  <Database className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                  {t('project_pages.lomito.services.responsive_design.title')}
                </h3>
                <p className="text-gray-300">
                  {t('project_pages.lomito.services.responsive_design.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section ref={el => sectionRefs.current[4] = el as HTMLDivElement} className="py-16 bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-white text-center">
              {t('project_pages.lomito.results.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-12 text-center">
              {t('project_pages.lomito.results.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  +150
                </div>
                <p className="text-white font-medium">
                  {t('project_pages.lomito.results.searches_label')}
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  Top 5
                </div>
                <p className="text-white font-medium">{t('project_pages.lomito.results.local_ranking_label')}</p>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  +40%
                </div>
                <p className="text-white font-medium">{t('project_pages.lomito.results.whatsapp_label')}</p>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  +25%
                </div>
                <p className="text-white font-medium">{t('project_pages.lomito.results.sales_growth_label')}</p>
              </div>
            </div>

            <div className="mt-12 bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-white">
                {t('project_pages.lomito.results.key_improvements_title')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    {t('project_pages.lomito.results.improvements.0')}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    {t('project_pages.lomito.results.improvements.1')}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    {t('project_pages.lomito.results.improvements.2')}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    {t('project_pages.lomito.results.improvements.3')}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={el => sectionRefs.current[5] = el as HTMLDivElement} className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6 text-white">
              {t('project_pages.lomito.cta.title')}
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('project_pages.lomito.cta.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://lomito.netlify.app" target="_blank" rel="noopener noreferrer" className="group bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center">
                {t('project_pages.lomito.cta.view_live_site')}
                <ExternalLink className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button 
                onClick={() => navigateToHomeWithScroll('contacto')}
                className="bg-transparent border-2 border-cyan-400 text-cyan-100 hover:text-white hover:border-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center"
              >
                {t('common.contact_us')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
};

export default LomitoPage;
