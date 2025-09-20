import { useEffect, useState, useRef } from 'react';
import { Code, LineChart, Lightbulb } from 'lucide-react';
import ServiceCard from '../ui/ServiceCard';
import { useLanguage } from '../context/LanguageContext';
const ServicesSection = () => {
  const {
    t
  } = useLanguage();
  
  // Helper function to get array from translation
  const getFeatures = (key: string): string[] => {
    try {
      // Try to get the translation as an array
      const features = t(key, { returnObjects: true });
      
      // If it's already an array, return it
      if (Array.isArray(features)) {
        return features;
      }
      
      // If it's a string, try to parse it as JSON
      if (typeof features === 'string') {
        try {
          const parsed = JSON.parse(features);
          return Array.isArray(parsed) ? parsed : [features];
        } catch {
          return [features];
        }
      }
      
      // Fallback: return as single item array
      return [features];
    } catch (error) {
      console.error('Error getting features for key:', key, error);
      return ['Error loading features'];
    }
  };
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Detect scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
      if (!sectionRef.current) return;
      // Animate elements
      const elements = sectionRef.current.querySelectorAll('.service-animate');
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.9;
        if (isVisible) {
          setTimeout(() => {
            el.classList.add('active');
            el.setAttribute('data-scroll', scrollDirection);
          }, index * 50);
        } else {
          el.classList.remove('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(handleScroll, 50);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  const services = [{
    id: 1,
    title: t('services.web_development.title') as string,
    description: t('services.web_development.description') as string,
    icon: <Code className="w-10 h-10 text-blue-500" />,
    features: getFeatures('services.web_development.features'),
    animationClass: 'service-left',
    link: '/servicios/desarrollo-web'
  }, {
    id: 2,
    title: t('services.digital_marketing.title') as string,
    description: t('services.digital_marketing.description') as string,
    icon: <LineChart className="w-10 h-10 text-blue-500" />,
    features: getFeatures('services.digital_marketing.features'),
    animationClass: 'service-top',
    link: '/servicios/marketing-digital'
  }, {
    id: 3,
    title: t('services.business_consulting.title') as string,
    description: t('services.business_consulting.description') as string,
    icon: <Lightbulb className="w-10 h-10 text-blue-500" />,
    features: getFeatures('services.business_consulting.features'),
    animationClass: 'service-right',
    link: '/servicios/consultoria-comercial'
  }];
  return <section id="servicios" className="py-20 bg-gray-950 relative overflow-hidden" ref={sectionRef}>
      {/* Retro-futuristic background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Retro grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(0deg, rgba(34, 211, 238, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(60deg) translateZ(-100px) translateY(-20%)'
        }}></div>
        </div>
        {/* Digital particles */}
        {[...Array(15)].map((_, i) => <div key={`particle-${i}`} className="absolute rounded-full bg-cyan-400" style={{
        width: `${Math.random() * 4 + 1}px`,
        height: `${Math.random() * 4 + 1}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.6 + 0.2,
        boxShadow: '0 0 8px 2px rgba(34, 211, 238, 0.4)',
        animation: `float ${Math.random() * 10 + 15}s linear infinite`,
        animationDelay: `${Math.random() * 5}s`
      }}></div>)}
        {/* Glowing orbs */}
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-cyan-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
        {/* Digital scanlines */}
        <div className="absolute inset-0 bg-scanlines opacity-5"></div>
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 service-animate service-down">
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-4 text-white">
            {t('services.title')}
          </h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
          <p className="text-xl md:text-xl lg:text-xl text-blue-200">{t('services.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8 relative z-10">
          {services.map((service, index) => <div key={service.id} className={`service-animate ${service.animationClass}`} style={{
          transitionDelay: `${index * 80}ms`
        }} data-scroll={scrollDirection}>
              <ServiceCard service={service} />
            </div>)}
        </div>
        {/* Rotating background element */}
        <div className="relative mt-20 overflow-hidden rounded-xl p-1">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl animate-spin opacity-10" style={{
          animationDuration: '30s'
        }}></div>
          <a href="#contacto" className="group bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl relative z-10 service-animate service-scale block cursor-pointer hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
            <p className="text-blue-100 text-center text-lg md:text-xl italic group-hover:text-cyan-300 transition-colors duration-300">
              {t('services.request_quote')}
            </p>
          </a>
        </div>
      </div>
      {/* Custom animations for service elements */}
      <style>{`
        /* Base styles for service animations */
        .service-animate {
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: transform, opacity, rotate;
        }
        /* Left animation with rotation */
        .service-left {
          transform: translateX(-50px) rotate(-8deg);
        }
        .service-left.active {
          transform: translateX(0) rotate(0deg);
          opacity: 1;
        }
        /* Top animation with rotation */
        .service-top {
          transform: translateY(-50px) rotate(8deg);
        }
        .service-top.active {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        /* Right animation with rotation */
        .service-right {
          transform: translateX(50px) rotate(8deg);
        }
        .service-right.active {
          transform: translateX(0) rotate(0deg);
          opacity: 1;
        }
        /* Down animation with rotation */
        .service-down {
          transform: translateY(-30px) rotate(-5deg);
        }
        .service-down.active {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        /* Scale animation */
        .service-scale {
          transform: scale(0.8) rotate(-3deg);
        }
        .service-scale.active {
          transform: scale(1) rotate(0deg);
          opacity: 1;
        }
        /* Prevent jumping when scrolling direction changes */
        .service-animate.active {
          transition-delay: 0.1s;
        }
        /* Mobile and tablet optimizations */
        @media (max-width: 1024px) {
          .service-animate {
            transition-duration: 0.5s;
          }
          .service-left,
          .service-right {
            transform: translateX(0) translateY(30px) rotate(0deg);
          }
          .service-left.active,
          .service-right.active {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
        }
        
        @media (max-width: 768px) {
          .service-animate {
            transition-duration: 0.4s;
          }
        }
        .bg-scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(34, 211, 238, 0.1) 50%
          );
          background-size: 100% 4px;
        }
      `}</style>
    </section>;
};
export default ServicesSection;