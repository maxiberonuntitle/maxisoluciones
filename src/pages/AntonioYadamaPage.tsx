import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Globe, MapPin, Search, Smartphone, CheckCircle, Users, Zap, BarChart, Target } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useNavigationWithScroll } from '../components/utils/NavigationUtils';

const AntonioYadamaPage = () => {
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
          <Link to="/" className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors group">
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>Volver a inicio</span>
          </Link>
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Desarrollo Web <span className="text-blue-400">Antonio y Adama Jardinería</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10">
              Sitio web profesional para Antonio y Adama Jardinería, especialistas en servicios de jardinería y paisajismo en Lloret de Mar.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://antonioyadama.es" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Ver el proyecto
              </a>
              <a href="#proceso" className="bg-transparent border-2 border-blue-400 text-blue-100 hover:text-white hover:border-white font-medium py-3 px-8 rounded-lg transition-all duration-300">
                Ver mi proceso
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
                <img src="/src/public/antonioyadamajardineria.png" alt="Sitio web de Antonio Yadama" className="w-full h-auto aspect-video object-cover" />
              </div>
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.2s' }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Proyecto de Jardinería Profesional
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Desarrollo de un sitio web profesional para Antonio y Adama Jardinería, especialistas en servicios de jardinería y paisajismo. 
                El proyecto incluyó desarrollo web moderno, optimización SEO local para servicios de jardinería y presencia 
                optimizada en Google Maps para atraer clientes locales en Lloret de Mar.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Desarrollo Web</h3>
                  <p className="text-blue-700 text-sm">Sitio web moderno y responsive</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">SEO</h3>
                  <p className="text-green-700 text-sm">Optimización para jardinería</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Google Maps</h3>
                  <p className="text-purple-700 text-sm">Presencia local optimizada</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">Diseño</h3>
                  <p className="text-orange-700 text-sm">Interfaz profesional</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Servicios Implementados
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Soluciones integrales para potenciar la presencia digital de un negocio de jardinería profesional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Desarrollo Web</h3>
              <p className="text-gray-600">
                Sitio web moderno y responsive desarrollado con las últimas tecnologías, 
                optimizado para mostrar servicios de jardinería y proyectos de paisajismo de manera profesional.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">SEO Especializado</h3>
              <p className="text-gray-600">
                Optimización SEO específica para servicios de jardinería, incluyendo palabras clave 
                relevantes como "jardinería Lloret de Mar" y estructura optimizada para motores de búsqueda.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Google Maps</h3>
              <p className="text-gray-600">
                Optimización de presencia en Google Maps para atraer clientes locales 
                interesados en servicios de jardinería y paisajismo en Lloret de Mar.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Smartphone className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Diseño Responsive</h3>
              <p className="text-gray-600">
                Diseño completamente responsive que se adapta perfectamente a todos 
                los dispositivos, desde móviles hasta escritorios.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Portfolio Digital</h3>
              <p className="text-gray-600">
                Galería profesional para mostrar proyectos de jardinería y paisajismo con 
                navegación intuitiva y presentación visual impactante.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.5s' }}>
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Contacto Optimizado</h3>
              <p className="text-gray-600">
                Formularios de contacto optimizados y información de contacto 
                clara para facilitar la comunicación con clientes potenciales.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Results Section */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Resultados Obtenidos
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Impacto medible en la presencia digital del arquitecto
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Result 1 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-6 text-center animate-on-scroll opacity-0 translate-y-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Mejora SEO
              </h3>
              <p className="text-gray-600">
                Posicionamiento mejorado en búsquedas relacionadas con jardinería y servicios de paisajismo.
              </p>
            </div>

            {/* Result 2 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-6 text-center animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Visibilidad Local
              </h3>
              <p className="text-gray-600">
                Mayor presencia en Google Maps y búsquedas locales de servicios de arquitectura.
              </p>
            </div>

            {/* Result 3 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-6 text-center animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Más Consultas
              </h3>
              <p className="text-gray-600">
                Aumento significativo en consultas de clientes potenciales interesados en servicios de jardinería.
              </p>
            </div>

            {/* Result 4 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-6 text-center animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Imagen Profesional
              </h3>
              <p className="text-gray-600">
                Sitio web que proyecta profesionalismo y confianza, mejorando la percepción de marca.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Necesitas un Sitio Web Profesional?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Contáctame hoy mismo y convierte tu idea en realidad con mi
            experiencia en desarrollo web profesional.
          </p>
          <button 
            onClick={() => navigateToHomeWithScroll('contacto')}
            className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-block"
          >
            Solicitar presupuesto gratuito
          </button>
        </div>
      </AnimatedSection>

      <style jsx>{`
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
