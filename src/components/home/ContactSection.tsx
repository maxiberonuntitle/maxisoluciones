import React, { useEffect, useState, useRef } from 'react';
import ContactForm from '../ui/ContactForm';
import { PhoneIcon, MapPinIcon, ClockIcon, MailIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SpaceBackground from '../ui/SpaceBackground';
const ContactSection = () => {
  const {
    t
  } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);
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
      // Check if section is in view
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      setIsInView(isVisible);
      // Animate elements - optimizado para mejor rendimiento
      if (isVisible) {
        const elements = sectionRef.current.querySelectorAll('.contact-animate');
        elements.forEach((el, index) => {
          const elRect = el.getBoundingClientRect();
          const elIsVisible = elRect.top < window.innerHeight * 0.95;
          if (elIsVisible) {
            // Reducir el delay para una animación más rápida y fluida
            setTimeout(() => {
              el.classList.add('active');
              el.setAttribute('data-scroll', scrollDirection);
            }, index * 30); // Reducido de 50ms a 30ms
          } else {
            el.classList.remove('active');
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    // Initial check
    setTimeout(handleScroll, 30); // Reducido de 50ms a 30ms
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  const contactInfo = [{
    icon: <PhoneIcon className="w-5 h-5 text-blue-500" />,
    title: t('contact.info.phone'),
    details: '+598 98 009 803',
    link: 'tel:+59898009803'
  }, {
    icon: <MailIcon className="w-5 h-5 text-blue-500" />,
    title: t('contact.info.email'),
    details: 'maxisolucionesdigitales@gmail.com',
    link: 'mailto:maxisolucionesdigitales@gmail.com'
  }, {
    icon: <MapPinIcon className="w-5 h-5 text-blue-500" />,
    title: t('contact.info.address'),
    details: 'Barcelona',
    link: '#'
  }, {
    icon: <ClockIcon className="w-5 h-5 text-blue-500" />,
    title: t('contact.info.hours'),
    details: 'Lun - Vie: 9:00 - 18:00',
    link: '#'
  }];
  return <section id="contacto" className="py-16 md:py-20 bg-gray-950 relative overflow-hidden" ref={sectionRef}>
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
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.7 + 0.3,
        boxShadow: '0 0 5px 2px rgba(34, 211, 238, 0.3)',
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
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 contact-animate contact-title">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t('contact.title')}
          </h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
          <p className="text-xl text-blue-200">{t('contact.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div className="contact-animate contact-left">
            <div className="bg-blue-900/30 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-sm mb-6 md:mb-8 border border-blue-800/50">
              <h3 className="text-2xl font-bold mb-6 text-white">
                {t('contact.info.title')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {contactInfo.map((item, index) => <a key={index} href={item.link} className="flex items-start p-4 bg-blue-800/30 rounded-lg hover:bg-blue-800/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-blue-700/30 contact-animate contact-info" style={{
                transitionDelay: `${index * 100}ms`
              }}>
                    <div className="mr-4 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      <p className="text-blue-200">{item.details}</p>
                    </div>
                  </a>)}
              </div>
            </div>
            {/* Mapa - reducir altura en móviles para mejor visibilidad */}
            <div className="bg-blue-900/30 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-sm h-48 md:h-64 lg:h-80 border border-blue-800/50 relative overflow-hidden contact-animate contact-map">
              {/* Map placeholder with animated elements */}
              <div className="w-full h-full bg-blue-800/30 rounded-lg flex items-center justify-center relative">
                <div className="absolute inset-0">
                  {/* Grid lines */}
                  {[...Array(5)].map((_, i) => <div key={`map-h-${i}`} className="absolute h-px w-full bg-blue-700/30" style={{
                  top: `${i * 25}%`
                }}></div>)}
                  {[...Array(5)].map((_, i) => <div key={`map-v-${i}`} className="absolute w-px h-full bg-blue-700/30" style={{
                  left: `${i * 25}%`
                }}></div>)}
                  {/* Location marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-12 h-12 bg-blue-500/30 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
                  </div>
                </div>
                <span className="text-blue-300 relative z-10">
                  Mapa de ubicación
                </span>
              </div>
            </div>
          </div>
          <div className="contact-animate contact-right">
            <ContactForm />
          </div>
        </div>
      </div>
      {/* Estilos optimizados para animaciones */}
      <style>{`
        /* Base styles for contact animations */
        .contact-animate {
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }
        /* Title animation with 3D effect */
        .contact-title {
          transform: perspective(1000px) rotateX(-10deg) translateY(-20px);
          transform-origin: center top;
        }
        .contact-title.active {
          transform: perspective(1000px) rotateX(0) translateY(0);
          opacity: 1;
        }
        /* Left column animation */
        .contact-left {
          transform: translateX(-30px) scale(0.95);
          opacity: 0;
        }
        .contact-left.active {
          transform: translateX(0) scale(1);
          opacity: 1;
          transition-delay: 0.1s;
        }
        /* Right column animation */
        .contact-right {
          transform: translateX(30px) scale(0.95);
          opacity: 0;
        }
        .contact-right.active {
          transform: translateX(0) scale(1);
          opacity: 1;
          transition-delay: 0.2s;
        }
        /* Map animation with 3D effect */
        .contact-map {
          transform: perspective(1000px) rotateY(-5deg) translateY(20px);
          opacity: 0;
        }
        .contact-map.active {
          transform: perspective(1000px) rotateY(0) translateY(0);
          opacity: 1;
          transition-delay: 0.3s;
        }
        /* Contact info items with staggered animation */
        .contact-info {
          opacity: 0;
          transform: translateY(15px);
        }
        .contact-info.active {
          opacity: 1;
          transform: translateY(0);
        }
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .contact-animate {
            transition-duration: 0.4s;
          }
          .contact-left,
          .contact-right {
            transform: translateY(15px) scale(0.98);
          }
          .contact-left.active,
          .contact-right.active {
            transform: translateY(0) scale(1);
          }
          .contact-title {
            transform: translateY(-15px);
          }
          .contact-title.active {
            transform: translateY(0);
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
export default ContactSection;