import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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
              Consultoría <span className="text-blue-300">Comercial</span>{' '}
              Estratégica
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 md:mb-10 px-4 md:px-0">
              Optimizo tus procesos comerciales y estrategias de ventas para
              maximizar tus resultados de negocio.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <button 
                onClick={() => navigateToHomeWithScroll('contacto')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm md:text-base"
              >
                {t('pages.business_consulting.request_consultation')}
              </button>
              <a href="#areas" className="bg-transparent border-2 border-blue-400 text-blue-100 hover:text-white hover:border-white font-medium py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 text-sm md:text-base">
                Explorar áreas de consultoría
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
              Áreas de Consultoría Comercial
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Soluciones integrales para optimizar tus procesos comerciales y
              aumentar tus ventas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Area Card 1 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8">
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                  <Briefcase className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Estrategia de Ventas B2B
                </h3>
                <p className="text-gray-600 mb-4">
                  Desarrollo e implementación de estrategias de venta efectivas
                  para el mercado empresarial.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Análisis del ciclo de ventas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Prospección cualificada
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Negociación estratégica
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Area Card 2 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.1s'
          }}>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                  <Users className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Gestión de Equipos Comerciales
                </h3>
                <p className="text-gray-600 mb-4">
                  Optimización y capacitación de equipos de venta para maximizar
                  su rendimiento.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Formación especializada
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Sistemas de incentivos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Gestión del rendimiento
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Area Card 3 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.2s'
          }}>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                  <PieChart className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Optimización de Procesos
                </h3>
                <p className="text-gray-600 mb-4">
                  Análisis y mejora de los procesos comerciales para incrementar
                  la eficiencia.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Mapeo de procesos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Eliminación de cuellos de botella
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Automatización de tareas
                    </span>
                  </li>
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
                  Implementación de CRM
                </h3>
                <p className="text-gray-600 mb-4">
                  Selección e implementación de sistemas CRM adaptados a tus
                  necesidades.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Análisis de necesidades
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Configuración personalizada
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Formación de usuarios</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Area Card 5 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-on-scroll opacity-0 translate-y-8" style={{
            transitionDelay: '0.4s'
          }}>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                  <TrendingUp className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Estrategia Comercial B2C
                </h3>
                <p className="text-gray-600 mb-4">
                  Desarrollo de estrategias efectivas para la venta directa al
                  consumidor.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Experiencia del cliente
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Técnicas de venta persuasiva
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Fidelización de clientes
                    </span>
                  </li>
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
                  Innovación Comercial
                </h3>
                <p className="text-gray-600 mb-4">
                  Implementación de nuevas metodologías y enfoques para
                  diferenciarte en el mercado.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Design Thinking aplicado
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Nuevos modelos de negocio
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Transformación digital
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {/* Methodology Section */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Mi Metodología
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Un enfoque sistemático para transformar tu área comercial
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {/* Methodology Item 1 */}
              <div className="relative animate-on-scroll opacity-0 translate-y-8">
                <div className="absolute -left-4 top-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 pl-6">
                  Diagnóstico
                </h3>
                <p className="text-gray-600 pl-6">
                  Analizamos a fondo tu situación actual, identificando
                  fortalezas, debilidades y oportunidades de mejora en tus
                  procesos comerciales.
                </p>
              </div>
              {/* Methodology Item 2 */}
              <div className="relative animate-on-scroll opacity-0 translate-y-8" style={{
              transitionDelay: '0.1s'
            }}>
                <div className="absolute -left-4 top-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 pl-6">
                  Planificación Estratégica
                </h3>
                <p className="text-gray-600 pl-6">
                  Diseñamos un plan de acción personalizado con objetivos
                  claros, indicadores de rendimiento y plazos definidos.
                </p>
              </div>
              {/* Methodology Item 3 */}
              <div className="relative animate-on-scroll opacity-0 translate-y-8" style={{
              transitionDelay: '0.2s'
            }}>
                <div className="absolute -left-4 top-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 pl-6">
                  Implementación
                </h3>
                <p className="text-gray-600 pl-6">
                  Ejecutamos las estrategias definidas, acompañándote en cada
                  paso para asegurar una correcta adopción por parte de tu
                  equipo.
                </p>
              </div>
              {/* Methodology Item 4 */}
              <div className="relative animate-on-scroll opacity-0 translate-y-8" style={{
              transitionDelay: '0.3s'
            }}>
                <div className="absolute -left-4 top-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 pl-6">
                  Formación
                </h3>
                <p className="text-gray-600 pl-6">
                  Capacitamos a tu equipo comercial con las habilidades y
                  conocimientos necesarios para ejecutar las nuevas estrategias.
                </p>
              </div>
              {/* Methodology Item 5 */}
              <div className="relative animate-on-scroll opacity-0 translate-y-8" style={{
              transitionDelay: '0.4s'
            }}>
                <div className="absolute -left-4 top-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  5
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 pl-6">
                  Seguimiento
                </h3>
                <p className="text-gray-600 pl-6">
                  Monitorizamos los resultados, realizando ajustes necesarios
                  para asegurar el cumplimiento de los objetivos establecidos.
                </p>
              </div>
              {/* Methodology Item 6 */}
              <div className="relative animate-on-scroll opacity-0 translate-y-8" style={{
              transitionDelay: '0.5s'
            }}>
                <div className="absolute -left-4 top-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  6
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 pl-6">
                  Optimización Continua
                </h3>
                <p className="text-gray-600 pl-6">
                  Evaluamos periódicamente los resultados y refinamos las
                  estrategias para asegurar una mejora constante a largo plazo.
                </p>
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
              Beneficios de Mi Consultoría
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Resultados tangibles que transformarán tu área comercial
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit Card 1 */}
            <div className="bg-blue-50 rounded-xl p-6 animate-on-scroll opacity-0 translate-y-8">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Incremento de Ventas
              </h3>
              <p className="text-gray-600">
                Aumento significativo en la conversión y el volumen de ventas
                gracias a estrategias optimizadas.
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
                Equipos Más Eficientes
              </h3>
              <p className="text-gray-600">
                Mayor productividad y motivación en tus equipos comerciales con
                procesos claros y formación adecuada.
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
                Procesos Optimizados
              </h3>
              <p className="text-gray-600">
                Eliminación de ineficiencias y automatización de tareas para
                reducir costos y aumentar la productividad.
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
                Mejor Toma de Decisiones
              </h3>
              <p className="text-gray-600">
                Acceso a datos relevantes y KPIs claros para tomar decisiones
                informadas y estratégicas.
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
                Ventaja Competitiva
              </h3>
              <p className="text-gray-600">
                Diferenciación en el mercado con estrategias innovadoras y
                enfocadas en el cliente.
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
                Cultura de Mejora Continua
              </h3>
              <p className="text-gray-600">
                Implementación de una mentalidad de crecimiento y optimización
                constante en tu equipo.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Potencia tu Área Comercial
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Solicita una consulta inicial gratuita y descubre cómo mi
            consultoría comercial puede transformar tu negocio.
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