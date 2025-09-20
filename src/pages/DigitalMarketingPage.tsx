import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, BarChart, LineChart, Mail, Target, CheckCircle, TrendingUp, Globe } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
const DigitalMarketingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
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
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-indigo-500 opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/0 via-indigo-900/10 to-indigo-900/30"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Back button */}
          <Link to="/" className="inline-flex items-center text-indigo-200 hover:text-white mb-8 transition-colors group">
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>Volver a inicio</span>
          </Link>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Marketing <span className="text-indigo-300">Digital</span>{' '}
              Estratégico
            </h1>
            <p className="text-xl text-indigo-100 mb-10">
              Estrategias de marketing digital que generan resultados medibles y
              aumentan la visibilidad de tu marca.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/#contacto" className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Solicitar estrategia
              </Link>
              <a href="#servicios-marketing" className="bg-transparent border-2 border-indigo-400 text-indigo-100 hover:text-white hover:border-white font-medium py-3 px-8 rounded-lg transition-all duration-300">
                Explorar servicios
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Services Grid */}
      <AnimatedSection id="servicios-marketing" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Nuestros Servicios de Marketing
            </h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Soluciones integrales para potenciar tu presencia digital y
              aumentar tus conversiones
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8">
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
                  <Search className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">SEO</h3>
                <p className="text-gray-600 mb-4">
                  Optimización para motores de búsqueda que mejora tu
                  visibilidad y posicionamiento orgánico.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Auditoría SEO completa
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Optimización on-page</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Estrategia de contenidos
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
                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-5">
                  <Target className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Google Ads
                </h3>
                <p className="text-gray-600 mb-4">
                  Campañas de publicidad en Google que generan tráfico
                  cualificado y conversiones.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Campañas de búsqueda</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Remarketing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Optimización de conversiones
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
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
                  <Globe className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Social Media
                </h3>
                <p className="text-gray-600 mb-4">
                  Gestión profesional de redes sociales para conectar con tu
                  audiencia y aumentar engagement.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Estrategia de contenidos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Publicaciones orgánicas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Análisis de resultados
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
                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-5">
                  <Mail className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Email Marketing
                </h3>
                <p className="text-gray-600 mb-4">
                  Estrategias de email marketing que nutren leads y fidelizan
                  clientes.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Diseño de newsletters</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Secuencias automatizadas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Segmentación avanzada</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Service Card 5 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.4s'
          }}>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
                  <BarChart className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Analítica Web
                </h3>
                <p className="text-gray-600 mb-4">
                  Análisis de datos para entender el comportamiento de tus
                  usuarios y mejorar resultados.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Configuración de Analytics
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Informes personalizados
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Recomendaciones de mejora
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Service Card 6 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.5s'
          }}>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-5">
                  <TrendingUp className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Marketing de Contenidos
                </h3>
                <p className="text-gray-600 mb-4">
                  Creación de contenido relevante que atrae, convierte y
                  fideliza a tu audiencia.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Blogs y artículos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Infografías y ebooks</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vídeos y webinars</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {/* Results Section */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Resultados que Puedes Esperar
            </h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Nuestras estrategias de marketing digital están orientadas a
              resultados medibles
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Result Card 1 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-6 text-center animate-on-scroll opacity-0 translate-y-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <LineChart className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Aumento de Tráfico
              </h3>
              <p className="text-gray-600">
                Incremento significativo del tráfico cualificado a tu sitio web.
              </p>
            </div>
            {/* Result Card 2 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-6 text-center animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.1s'
          }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Mejora de Conversiones
              </h3>
              <p className="text-gray-600">
                Mayor tasa de conversión y generación de leads cualificados.
              </p>
            </div>
            {/* Result Card 3 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-6 text-center animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.2s'
          }}>
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Visibilidad de Marca
              </h3>
              <p className="text-gray-600">
                Mayor reconocimiento y posicionamiento de tu marca en el
                mercado.
              </p>
            </div>
            {/* Result Card 4 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-6 text-center animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.3s'
          }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                ROI Positivo
              </h3>
              <p className="text-gray-600">
                Retorno de inversión medible y estrategias optimizadas
                continuamente.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Potencia tu Presencia Digital
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto">
            Solicita una consultoría gratuita y descubre cómo nuestras
            estrategias de marketing digital pueden impulsar tu negocio.
          </p>
          <Link to="/#contacto" className="bg-white text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-block">
            Solicitar consultoría gratuita
          </Link>
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
export default DigitalMarketingPage;