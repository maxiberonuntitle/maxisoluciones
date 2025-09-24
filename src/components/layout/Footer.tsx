import React, { useEffect, useState, useRef } from 'react';
import { LinkedinIcon, MailIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from 'react-router-dom';
const Footer = () => {
  const {
    t
  } = useLanguage();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      // If on home page, scroll to section
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    } else {
      // If on another page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight * 0.9;
      setIsVisible(isInView);
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!footerRef.current || !isVisible) return;
      const rect = footerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({
        x,
        y
      });
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    // Initial check
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);
  // Parallax movement values
  const moveX = (mousePosition.x - 0.5) * 20;
  const moveY = (mousePosition.y - 0.5) * 10;
  return <footer ref={footerRef} className={`bg-gray-900 text-white pt-16 pb-8 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-80'}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-800 rounded-full opacity-10 blur-3xl transition-transform duration-500" style={{
        transform: isVisible ? `translate(${moveX * -1}px, ${moveY * -1}px)` : 'translate(0, 0)',
        transitionDelay: '100ms'
      }}></div>
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-indigo-800 rounded-full opacity-10 blur-3xl transition-transform duration-500" style={{
        transform: isVisible ? `translate(${moveX}px, ${moveY}px)` : 'translate(0, 0)',
        transitionDelay: '200ms'
      }}></div>
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(10)].map((_, i) => <div key={`footer-h-${i}`} className="absolute h-px w-full bg-blue-400 transition-all duration-700" style={{
          top: `${i * 10}%`,
          transform: isVisible ? `translateX(${moveX * (i % 2 === 0 ? 1 : -1)}px)` : 'translateX(0)',
          opacity: isVisible ? 0.4 : 0.1,
          transitionDelay: `${i * 50}ms`
        }}></div>)}
          {[...Array(10)].map((_, i) => <div key={`footer-v-${i}`} className="absolute w-px h-full bg-blue-400 transition-all duration-700" style={{
          left: `${i * 10}%`,
          transform: isVisible ? `translateY(${moveY * (i % 2 === 0 ? 1 : -1)}px)` : 'translateY(0)',
          opacity: isVisible ? 0.4 : 0.1,
          transitionDelay: `${i * 50}ms`
        }}></div>)}
        </div>
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => <div key={`footer-particle-${i}`} className={`absolute rounded-full bg-blue-400 transition-all duration-1000`} style={{
        width: `${Math.random() * 4 + 2}px`,
        height: `${Math.random() * 4 + 2}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: isVisible ? Math.random() * 0.3 + 0.1 : 0,
        transform: isVisible ? `translate(${moveX * (Math.random() - 0.5) * 5}px, ${moveY * (Math.random() - 0.5) * 5}px)` : 'translate(0, 0)',
        transitionDelay: `${i * 50}ms`
      }}></div>)}
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-8">
          {/* Company Info */}
          <div className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-xl font-bold mb-4">
              Maxi <span className="text-blue-500">Soluciones</span>
              <span className="text-blue-400">&gt;</span>
            </h3>
            <p className="text-gray-300 mb-4">{t('footer.description')}</p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/maxi-beron-laspiur/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors transform hover:scale-110">
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          {/* Services */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.services')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#servicios" className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block">
                  {t('services.web_development.title')}
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block">
                  {t('services.digital_marketing.title')}
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block">
                  {t('services.business_consulting.title')}
                </a>
              </li>
            </ul>
          </div>
          {/* Quick Links */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quick_links')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }} className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block">
                  {t('navigation.inicio')}
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('proyectos'); }} className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block">
                  {t('navigation.proyectos')}
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('contacto'); }} className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block">
                  {t('navigation.contacto')}
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center group">
                <MailIcon className="w-5 h-5 text-blue-400 mr-2 group-hover:scale-110 transition-transform" />
                <a href="mailto:maxisolucionesdigitales@gmail.com" className="text-gray-300 group-hover:text-blue-200 transition-colors">
                  maxisolucionesdigitales@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={`border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p>
            &copy; {new Date().getFullYear()} Maxi Soluciones Digitales
            <span className="text-blue-400">&gt;</span>. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;