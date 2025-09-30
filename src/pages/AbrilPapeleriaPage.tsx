import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, ExternalLink, ChevronDown, Clock, Search, Smartphone, Database, Map } from 'lucide-react';
import { useNavigationWithScroll } from '../components/utils/NavigationUtils';
import { useLanguage } from '../components/context/LanguageContext';

const AbrilPapeleriaPage = () => {
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
              Caso de Éxito
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Papelería Abril –{' '}
              <span className="text-cyan-400">Sitio Web y SEO Local</span>
            </h1>
            <p className="text-xl text-cyan-100 mb-10 max-w-2xl mx-auto">
              Transformación digital para una papelería local con visión
              moderna.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://abrilpapeleria.azurewebsites.net/" target="_blank" rel="noopener noreferrer" className="group bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center">
                Visitar sitio
                <ExternalLink className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button onClick={() => scrollToSection(1)} className="bg-transparent border-2 border-cyan-400 text-cyan-100 hover:text-white hover:border-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center">
                Ver detalles
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
                    src="/papeleriaaabril.png" 
                    alt="Papelería local con útiles escolares" 
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
                  Sobre el cliente
                </h2>
                <p className="text-gray-300 mb-6">
                  Papelería Abril es un negocio local establecido en Tacuarembó,
                  Uruguay, que ofrece una amplia gama de útiles escolares,
                  artículos de oficina y regalos personalizados.
                </p>
                <p className="text-gray-300 mb-6">
                  Con una visión moderna y emprendedora, buscaban
                  modernizar su presencia digital para llegar a más clientes en
                  su región.
                </p>
                <div className="flex items-center text-cyan-400 font-medium">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>Establecido desde 2022</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Objectives Section */}
      <section ref={el => sectionRefs.current[2] = el as HTMLDivElement} className="py-16 bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-white text-center">
              Objetivos del proyecto
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-cyan-900/50 z-0"></div>
              
              {/* Objective 1 */}
              <div className="relative z-10 mb-12 md:mb-20">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 order-2 md:order-1 md:text-right md:pr-12 mt-6 md:mt-0">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-3">
                      Visibilidad en Google
                    </h3>
                    <p className="text-gray-300">
                      Necesitaban mejorar su presencia en buscadores para ser
                      encontrados por clientes potenciales en Tacuarembó y
                      alrededores.
                    </p>
                  </div>
                  <div className="flex-shrink-0 order-1 md:order-2 bg-cyan-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10" style={{
                  boxShadow: '0 0 15px rgba(34, 211, 238, 0.5)'
                }}>
                    <Search className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Objective 2 */}
              <div className="relative z-10 mb-12 md:mb-20">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-shrink-0 order-1 bg-cyan-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10" style={{
                  boxShadow: '0 0 15px rgba(34, 211, 238, 0.5)'
                }}>
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div className="flex-1 order-2 md:pl-12 mt-6 md:mt-0">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-3">
                      Modernizar su imagen online
                    </h3>
                    <p className="text-gray-300">
                      Querían proyectar una imagen profesional y moderna que
                      reflejara la calidad de sus productos y servicios.
                    </p>
                  </div>
                </div>
              </div>

              {/* Objective 3 */}
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 order-2 md:order-1 md:text-right md:pr-12 mt-6 md:mt-0">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-3">
                      Mostrar su catálogo de productos
                    </h3>
                    <p className="text-gray-300">
                      Necesitaban una forma sencilla de mostrar su amplio
                      catálogo de productos organizados por categorías.
                    </p>
                  </div>
                  <div className="flex-shrink-0 order-1 md:order-2 bg-cyan-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10" style={{
                  boxShadow: '0 0 15px rgba(34, 211, 238, 0.5)'
                }}>
                    <Database className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Did Section */}
      <section ref={el => sectionRefs.current[3] = el as HTMLDivElement} className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-white text-center">
              Mi solución
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Solution Card 1 */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all duration-300 hover:border-cyan-700 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-cyan-900/20 group">
                <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-800/50 transition-colors">
                  <Smartphone className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                  Diseño y desarrollo web responsivo
                </h3>
                <p className="text-gray-300">
                  Creé un sitio web moderno y completamente responsivo
                  utilizando React, asegurando una experiencia perfecta en todos
                  los dispositivos.
                </p>
              </div>

              {/* Solution Card 2 */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all duration-300 hover:border-cyan-700 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-cyan-900/20 group">
                <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-800/50 transition-colors">
                  <Database className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                  Catálogo de productos organizado
                </h3>
                <p className="text-gray-300">
                  Implementé un sistema de catálogo dinámico con filtrado por
                  categorías, facilitando a los clientes encontrar exactamente
                  lo que buscan.
                </p>
              </div>

              {/* Solution Card 3 */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all duration-300 hover:border-cyan-700 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-cyan-900/20 group">
                <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-800/50 transition-colors">
                  <Map className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                  Integración de contacto y ubicación
                </h3>
                <p className="text-gray-300">
                  Integramos WhatsApp, formulario de contacto y Google Maps para
                  facilitar la comunicación y ayudar a los clientes a encontrar
                  la tienda física.
                </p>
              </div>

              {/* Solution Card 4 */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all duration-300 hover:border-cyan-700 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-cyan-900/20 group">
                <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-800/50 transition-colors">
                  <Search className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                  SEO técnico y local
                </h3>
                <p className="text-gray-300">
                  Optimizamos el sitio con keywords locales, meta tags, schema
                  markup y contenido relevante para mejorar su posicionamiento
                  en búsquedas locales.
                </p>
              </div>
            </div>

            {/* Before/After Mockup */}
            <div className="mt-16 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-6 text-white text-center">
                Antes / Después
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative h-64 bg-gray-800 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                    Diseño anterior
                  </div>
                  <div className="absolute left-4 bottom-4 bg-gray-700 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Antes
                  </div>
                </div>
                <div className="relative h-64 bg-gray-800 rounded-lg overflow-hidden">
                  <img 
                    src="/papeleriaaabril.png" 
                    alt="Diseño moderno de sitio web" 
                    className="w-full h-full object-cover" 
                    width="400"
                    height="256"
                    loading="lazy"
                    style={{ aspectRatio: '400/256' }}
                  />
                  <div className="absolute right-4 bottom-4 bg-cyan-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                    Después
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section ref={el => sectionRefs.current[4] = el as HTMLDivElement} className="py-16 bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-white text-center">
              Impacto del proyecto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Result Card 1 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  +200
                </div>
                <p className="text-white font-medium">
                  búsquedas mensuales en Google
                </p>
              </div>

              {/* Result Card 2 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  Top 3
                </div>
                <p className="text-white font-medium">en búsquedas locales</p>
              </div>

              {/* Result Card 3 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  +50%
                </div>
                <p className="text-white font-medium">consultas vía WhatsApp</p>
              </div>

              {/* Result Card 4 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  +30%
                </div>
                <p className="text-white font-medium">crecimiento en ventas</p>
              </div>
            </div>

            <div className="mt-12 bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-white">
                Mejoras clave logradas
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    Presencia activa en Google Maps y búsquedas locales
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    Primeros resultados en búsquedas como "papelería Tacuarembó"
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    Crecimiento orgánico desde el primer mes de implementación
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    Mayor visibilidad de productos y ofertas especiales
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
              ¿Listo para impulsar tu negocio local?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Contáctate hoy mismo y descubre cómo una estrategia de transformación digital 
              puede impulsar tu negocio local.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://abrilpapeleria.azurewebsites.net/" target="_blank" rel="noopener noreferrer" className="group bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center">
                Ver sitio en vivo
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

export default AbrilPapeleriaPage;
