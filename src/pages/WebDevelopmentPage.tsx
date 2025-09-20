import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Server, Smartphone, Globe, CheckCircle, Users, Zap } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useNavigationWithScroll } from '../components/utils/NavigationUtils';
const WebDevelopmentPage = () => {
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
          <Link to="/" className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors group">
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>Volver a inicio</span>
          </Link>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Desarrollo Web <span className="text-blue-400">Profesional</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10">
              Creamos sitios web y aplicaciones que destacan por su diseño,
              rendimiento y experiencia de usuario.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => navigateToHomeWithScroll('contacto')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Solicitar presupuesto
              </button>
              <a href="#proceso" className="bg-transparent border-2 border-blue-400 text-blue-100 hover:text-white hover:border-white font-medium py-3 px-8 rounded-lg transition-all duration-300">
                Ver mi proceso
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Services Grid */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Mis Servicios de Desarrollo
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Ofrecemos soluciones digitales completas para cualquier necesidad
              de negocio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8">
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                  <Globe className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Sitios Web Corporativos
                </h3>
                <p className="text-gray-600 mb-4">
                  Diseño y desarrollo de sitios web profesionales que
                  representan la identidad de tu empresa.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Diseño responsive</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Optimización SEO</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Integración con redes sociales
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Service Card 2 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.1s'
          }}>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
                  <Code className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Aplicaciones Web
                </h3>
                <p className="text-gray-600 mb-4">
                  Desarrollo de aplicaciones web a medida con funcionalidades
                  avanzadas para tu negocio.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Interfaces intuitivas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Arquitectura escalable
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Integraciones con APIs
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Service Card 3 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.2s'
          }}>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                  <Smartphone className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Desarrollo Responsive
                </h3>
                <p className="text-gray-600 mb-4">
                  Sitios web adaptados a todos los dispositivos para una
                  experiencia óptima.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Compatibilidad móvil</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Diseño adaptativo</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Rendimiento optimizado
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Service Card 4 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.3s'
          }}>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
                  <Server className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  E-commerce
                </h3>
                <p className="text-gray-600 mb-4">
                  Tiendas online completas con todas las funcionalidades para
                  vender tus productos.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Pasarelas de pago</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Gestión de inventario</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Carrito de compras</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Service Card 5 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.4s'
          }}>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                  <Users className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  CMS Personalizados
                </h3>
                <p className="text-gray-600 mb-4">
                  Sistemas de gestión de contenido a medida para facilitar la
                  actualización de tu sitio.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Interfaz intuitiva</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Gestión de usuarios</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Personalización total</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Service Card 6 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.5s'
          }}>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
                  <Zap className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Mantenimiento Web
                </h3>
                <p className="text-gray-600 mb-4">
                  Servicios de mantenimiento y actualización para mantener tu
                  sitio seguro y funcional.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Actualizaciones de seguridad
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Copias de seguridad</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Soporte técnico</span>
                  </li>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Mi Proceso de Desarrollo
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Un enfoque metódico que garantiza resultados excepcionales
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
                  <div className="flex-1 order-2 md:order-1 md:text-right md:pr-12 mt-6 md:mt-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Análisis y Planificación
                    </h3>
                    <p className="text-gray-600">
                      Comenzamos con una evaluación detallada de tus
                      necesidades, objetivos y público objetivo. Definimos la
                      arquitectura, funcionalidades y planificamos el proyecto.
                    </p>
                  </div>
                  <div className="flex-shrink-0 order-1 md:order-2 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-bold">1</span>
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
                  <div className="flex-1 order-2 md:pl-12 mt-6 md:mt-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Diseño UX/UI
                    </h3>
                    <p className="text-gray-600">
                      Creamos wireframes y prototipos para visualizar la
                      estructura y experiencia de usuario. Diseñamos interfaces
                      atractivas y funcionales que reflejan tu marca.
                    </p>
                  </div>
                </div>
              </div>
              {/* Step 3 */}
              <div className="relative z-10 mb-12 md:mb-20 animate-on-scroll opacity-0 translate-y-8" style={{
              transitionDelay: '0.2s'
            }}>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 order-2 md:order-1 md:text-right md:pr-12 mt-6 md:mt-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Desarrollo
                    </h3>
                    <p className="text-gray-600">
                      Implemento el diseño utilizando
                      las tecnologías más adecuadas para tu proyecto, asegurando
                      código limpio, eficiente y escalable.
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
                  <div className="flex-1 order-2 md:pl-12 mt-6 md:mt-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Pruebas y Optimización
                    </h3>
                    <p className="text-gray-600">
                      Realizamos pruebas exhaustivas para garantizar la
                      funcionalidad, seguridad y rendimiento. Optimizamos para
                      velocidad, SEO y experiencia de usuario.
                    </p>
                  </div>
                </div>
              </div>
              {/* Step 5 */}
              <div className="relative z-10 animate-on-scroll opacity-0 translate-y-8" style={{
              transitionDelay: '0.4s'
            }}>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 order-2 md:order-1 md:text-right md:pr-12 mt-6 md:mt-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Lanzamiento y Soporte
                    </h3>
                    <p className="text-gray-600">
                      Implementamos tu proyecto y te proporcionamos
                      capacitación. Ofrecemos soporte continuo y mantenimiento
                      para asegurar el éxito a largo plazo.
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para iniciar tu proyecto?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Contáctame hoy mismo y convierte tu idea en realidad con mi
            equipo de expertos en desarrollo web.
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