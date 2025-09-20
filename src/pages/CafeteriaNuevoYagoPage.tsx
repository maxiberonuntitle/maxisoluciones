import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Coffee, MapPin, Search, Smartphone, Users, BarChart, Heart } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useNavigationWithScroll } from '../components/utils/NavigationUtils';
import { useLanguage } from '../components/context/LanguageContext';

const CafeNuevoYagoPage = () => {
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
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-amber-900 via-orange-800 to-red-900 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-orange-500 opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/0 via-amber-900/10 to-amber-900/30"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Back button */}
          <button 
            onClick={() => navigateToHomeWithScroll('proyectos')}
            className="inline-flex items-center text-amber-200 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>{t('common.back')}</span>
          </button>
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Cafetería <span className="text-amber-400">Nuevo Yago</span>
            </h1>
            <p className="text-lg md:text-xl text-amber-100 mb-8 md:mb-10 px-4 md:px-0">
              Transformación digital completa para cafeterianuevoyago.es. Desarrollo web, SEO local especializado 
              y optimización de presencia en Google Maps para aumentar clientes locales.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <a 
                href="https://cafeterianuevoyago.es" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm md:text-base"
              >
                {t('projects.view_project')}
              </a>
              <a href="#servicios" className="bg-transparent border-2 border-amber-400 text-amber-100 hover:text-white hover:border-white font-medium py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 text-sm md:text-base">
                {t('services.view_service')}
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
                <img src="/src/public/cafefeterianuevojago.png" alt="Sitio web de Cafetería Nuevo Jago" className="w-full h-auto aspect-video object-cover" />
              </div>
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.2s' }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Transformación Digital para Cafetería
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Estrategia integral de transformación digital para cafeterianuevoyago.es. 
                El proyecto incluyó desarrollo web completo, SEO local especializado para restaurantes 
                y optimización de presencia en Google Maps para aumentar clientes locales.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-2">{t('projects.web_development')}</h3>
                  <p className="text-amber-700 text-sm">Sitio web moderno para cafetería</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">SEO Local</h3>
                  <p className="text-green-700 text-sm">Optimización para restaurantes</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Google Maps</h3>
                  <p className="text-purple-700 text-sm">Presencia local optimizada</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">{t('services.digital_marketing.title')}</h3>
                  <p className="text-orange-700 text-sm">Estrategia digital integral</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Services Provided */}
      <AnimatedSection id="servicios" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Servicios Implementados
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Soluciones integrales para potenciar la presencia digital de una cafetería local
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <Coffee className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('projects.web_development')}</h3>
              <p className="text-gray-600">
                Sitio web moderno y atractivo desarrollado específicamente para cafeterías, 
                con menú digital, galería de productos y información de contacto.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">SEO Local</h3>
              <p className="text-gray-600">
                Optimización SEO local especializada para restaurantes y cafeterías, 
                incluyendo palabras clave como "cafetería cerca de mí" y "mejor café local".
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Google Maps</h3>
              <p className="text-gray-600">
                Optimización completa de presencia en Google Maps con información actualizada, 
                horarios, fotos y reseñas para atraer clientes locales.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Smartphone className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Diseño Responsive</h3>
              <p className="text-gray-600">
                Diseño completamente responsive que se adapta perfectamente a móviles, 
                tablets y escritorios para una experiencia óptima en todos los dispositivos.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Experiencia de Usuario</h3>
              <p className="text-gray-600">
                Interfaz intuitiva y atractiva que refleja la calidez y ambiente 
                acogedor de la cafetería, mejorando la experiencia del cliente.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.5s' }}>
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('services.digital_marketing.title')}</h3>
              <p className="text-gray-600">
                Estrategia de marketing digital integral que incluye gestión de redes sociales 
                y promoción online para aumentar la visibilidad de la cafetería.
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
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Impacto medible en la presencia digital de la cafetería
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Result 1 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-6 text-center animate-on-scroll opacity-0 translate-y-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Mejora SEO Local
              </h3>
              <p className="text-gray-600">
                Posicionamiento mejorado en búsquedas locales relacionadas con cafeterías y restaurantes.
              </p>
            </div>

            {/* Result 2 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-6 text-center animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Visibilidad en Maps
              </h3>
              <p className="text-gray-600">
                Mayor presencia en Google Maps con información actualizada y reseñas positivas.
              </p>
            </div>

            {/* Result 3 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-6 text-center animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Más Clientes
              </h3>
              <p className="text-gray-600">
                Aumento significativo en el número de clientes locales que descubren la cafetería online.
              </p>
            </div>

            {/* Result 4 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden p-6 text-center animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Imagen Moderna
              </h3>
              <p className="text-gray-600">
                Sitio web que proyecta modernidad y profesionalismo, mejorando la percepción de marca.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-amber-600 to-orange-700 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Necesitas Transformar tu Negocio Local?
          </h2>
          <p className="text-xl text-amber-100 mb-10 max-w-3xl mx-auto">
            Contáctame hoy mismo y descubre cómo mi estrategia de transformación digital 
            puede impulsar tu negocio local.
          </p>
          <button 
            onClick={() => navigateToHomeWithScroll('contacto')}
            className="bg-white text-amber-600 hover:bg-amber-50 font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-block"
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

export default CafeNuevoYagoPage;
