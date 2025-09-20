import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, X, CheckCircle, ExternalLink, ChevronDown, Clock, Search, Smartphone, Database, BarChart, Map } from 'lucide-react';
interface PapeleriaAbrilCaseStudyProps {
  onClose: () => void;
}
const PapeleriaAbrilCaseStudy: React.FC<PapeleriaAbrilCaseStudyProps> = ({
  onClose
}) => {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollPosition = containerRef.current.scrollTop;
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(index);
        }
      });
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  const scrollToSection = (index: number) => {
    if (sectionRefs.current[index]) {
      containerRef.current?.scrollTo({
        top: sectionRefs.current[index]!.offsetTop - 20,
        behavior: 'smooth'
      });
    }
  };
  return <div ref={containerRef} className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-gray-800">
      {/* Close button */}
      <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-800/80 text-white hover:bg-gray-700 transition-colors" aria-label="Close case study">
        <X className="w-5 h-5" />
      </button>
      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            Papelería Abril – Caso de Éxito
          </h2>
          <div className="hidden md:flex space-x-6 text-sm">
            {['Inicio', 'Cliente', 'Objetivo', 'Solución', 'Resultados', 'Testimonio'].map((item, index) => <button key={index} onClick={() => scrollToSection(index)} className={`transition-colors ${activeSection === index ? 'text-cyan-400 font-medium' : 'text-gray-400 hover:text-white'}`}>
                {item}
              </button>)}
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <div ref={el => sectionRefs.current[0] = el} className="relative min-h-[50vh] flex items-center bg-gradient-to-r from-gray-900 via-blue-950 to-gray-900 overflow-hidden">
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
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-cyan-400 text-sm font-medium">
              Caso de Éxito
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Papelería Abril –{' '}
              <span className="text-cyan-400">Sitio Web y SEO Local</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
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
      </div>
      {/* About the Client Section */}
      <div ref={el => sectionRefs.current[1] = el} className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <div className="rounded-xl overflow-hidden border-2 border-gray-800 shadow-xl" style={{
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.1)'
              }}>
                  <div className="aspect-video bg-gray-800 flex items-center justify-center">
                    <Map className="w-16 h-16 text-gray-600" />
                  </div>
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
                  Con más de 10 años de experiencia en el mercado, buscaban
                  modernizar su presencia digital para llegar a más clientes en
                  su región.
                </p>
                <div className="flex items-center text-cyan-400 font-medium">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>Establecido desde 2013</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Project Objectives Section */}
      <div ref={el => sectionRefs.current[2] = el} className="py-16 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-white text-center">
              Objetivos del proyecto
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-cyan-900/50"></div>
              {/* Objective 1 */}
              <div className="relative mb-12 md:mb-20">
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
              <div className="relative mb-12 md:mb-20">
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
              <div className="relative">
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
      </div>
      {/* What We Did Section */}
      <div ref={el => sectionRefs.current[3] = el} className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
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
                  Creamos un sitio web moderno y completamente responsivo
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
                  Implementamos un sistema de catálogo dinámico con filtrado por
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
              {/* Solution Card 5 */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all duration-300 hover:border-cyan-700 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-cyan-900/20 group md:col-span-2">
                <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-800/50 transition-colors">
                  <BarChart className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                  Optimización de rendimiento
                </h3>
                <p className="text-gray-300">
                  Implementamos hosting en Azure, optimización de imágenes con
                  formato WebP, y técnicas de carga progresiva para asegurar un
                  sitio rápido y eficiente.
                </p>
              </div>
            </div>
            {/* Before/After Mockup */}
            <div className="mt-16 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-6 text-white text-center">
                Antes / Después
              </h3>
              <div className="relative h-64 md:h-80 bg-gray-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                  Mockup del sitio web
                </div>
                <div className="absolute right-4 bottom-4 bg-cyan-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                  Después
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Results Section */}
      <div ref={el => sectionRefs.current[4] = el} className="py-16 bg-gray-950">
        <div className="container mx-auto px-6">
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
      </div>
      {/* Testimonial Section */}
      <div ref={el => sectionRefs.current[5] = el} className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 md:p-10 border border-gray-700 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-600/10 rounded-full blur-3xl"></div>
              {/* Quote mark */}
              <div className="text-7xl font-serif text-cyan-800/30 absolute top-4 left-6">
                "
              </div>
              <div className="relative z-10">
                <p className="text-xl md:text-2xl text-gray-300 italic mb-8 relative z-10">
                  Estamos encantados con el nuevo sitio, ahora nuestros clientes
                  nos encuentran fácilmente en Google. La organización por
                  categorías ha facilitado mucho mostrar nuestro catálogo y
                  hemos notado un aumento en las consultas y ventas.
                </p>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                    <span className="text-cyan-400 font-bold text-xl">A</span>
                  </div>
                  <div>
                    <div className="font-bold text-white">Ana Martínez</div>
                    <div className="text-gray-400">
                      Gerente, Papelería Abril
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* CTA Section */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-6 text-white">
                ¿Listo para impulsar tu negocio local?
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://abrilpapeleria.azurewebsites.net/" target="_blank" rel="noopener noreferrer" className="group bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center">
                  Ver sitio en vivo
                  <ExternalLink className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a href="#proyectos" onClick={e => {
                e.preventDefault();
                onClose();
              }} className="bg-transparent border-2 border-cyan-400 text-cyan-100 hover:text-white hover:border-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center">
                  Ver más proyectos
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
              {/* QR Code */}
              <div className="mt-12 flex flex-col items-center">
                <p className="text-gray-400 mb-4">
                  Escanea para visitar el sitio en tu móvil
                </p>
                <div className="w-32 h-32 bg-white p-2 rounded-lg">
                  <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                    Código QR
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Custom scrollbar for the container */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #1f2937;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #0891b2;
          border-radius: 20px;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(5px);
          }
        }
      `}</style>
    </div>;
};
export default PapeleriaAbrilCaseStudy;