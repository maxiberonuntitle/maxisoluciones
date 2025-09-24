import React, { useEffect, useState, useRef } from 'react';
import { ChevronRightIcon, MousePointerClickIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import NotebookImage from './NotebookImage';
const HeroSection = () => {
  const {
    t
  } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    setIsLoaded(true);
    // Setup the parallax effect - simplified for better performance
    const handleMouseMove = (e: MouseEvent) => {
      const parallaxElements = document.querySelectorAll('.parallax-effect');
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || '0.05';
        const x = (window.innerWidth - e.pageX * parseFloat(speed)) / 100;
        const y = (window.innerHeight - e.pageY * parseFloat(speed)) / 100;
        // @ts-ignore
        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };
    // Track scroll position for notebook rotation
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      // Detect scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  return <section id="inicio" className="relative min-h-screen flex items-center bg-gradient-to-r from-gray-950 via-blue-950 to-gray-900 overflow-hidden">
      {/* Animated background elements - updated for retro-futuristic style */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Retro grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(0deg, rgba(34, 211, 238, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.2) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(60deg) translateZ(-100px) translateY(-20%)'
        }}></div>
        </div>
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 opacity-10 rounded-full filter blur-3xl animate-pulse transition-all duration-1000 ease-in-out ${isLoaded ? 'scale-100' : 'scale-0'}`} style={{
        animationDuration: '8s'
      }}></div>
        <div className={`absolute bottom-1/3 right-1/3 w-80 h-80 bg-indigo-500 opacity-10 rounded-full filter blur-3xl animate-pulse transition-all duration-1000 delay-300 ease-in-out ${isLoaded ? 'scale-100' : 'scale-0'}`} style={{
        animationDuration: '12s',
        animationDelay: '1s'
      }}></div>
        {/* Digital particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => <div key={i} className="absolute rounded-full bg-cyan-400" style={{
          width: `${Math.random() * 4 + 1}px`,
          height: `${Math.random() * 4 + 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.6 + 0.2,
          boxShadow: '0 0 8px 2px rgba(34, 211, 238, 0.4)',
          animation: `float ${Math.random() * 10 + 15}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`
        }}></div>)}
        </div>
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/0 via-gray-950/10 to-gray-950/30 animate-pulse" style={{
        animationDuration: '15s'
      }}></div>
        {/* Digital scanlines */}
        <div className="absolute inset-0 bg-scanlines opacity-5"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 z-10 pt-12 sm:pt-16 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-8 lg:gap-12 items-center min-h-[75vh] sm:min-h-[80vh] md:min-h-[85vh] lg:min-h-[90vh]">
          <div className="text-white max-w-xl mx-auto lg:mx-0 text-center lg:text-left order-2 lg:order-1">
            <div className={`overflow-hidden transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 md:mb-6 leading-tight">
                {/* Mobile version - 2 lines */}
                <div className="lg:hidden">
                  <div className="text-white mb-2">{t('hero.title_mobile')} <span className="text-cyan-400">{t('hero.title_highlight')}</span></div>
                  <div className="text-white">{t('hero.title_mobile_2')} <span className="text-cyan-400">{t('hero.title_highlight_2')}</span></div>
                </div>
                {/* Desktop version */}
                <div className="hidden lg:block">
                  <span className="text-white">{t('hero.title_desktop')} </span>
                  <span className="text-cyan-400">{t('hero.title_highlight')}</span>
                  <span className="text-white"> {t('hero.title_desktop_2')} </span>
                  <span className="text-cyan-400">{t('hero.title_highlight_2')}</span>
                </div>
              </h1>
            </div>
            <div className={`transition-all duration-1000 delay-300 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-lg sm:text-xl md:text-xl lg:text-xl text-blue-100 mb-8 sm:mb-10 md:mb-8 px-2 md:px-0 leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>
            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-4 md:gap-6 lg:gap-6 transition-all duration-1000 delay-500 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <a href="#contacto" className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] relative overflow-hidden text-base sm:text-lg md:text-lg shadow-lg">
                <span className="relative z-10 flex items-center justify-center">
                  {t('hero.cta_primary')}
                  <ChevronRightIcon className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </a>
              <a href="#servicios" className="group bg-transparent border-2 border-cyan-400 text-cyan-400 hover:border-cyan-300 hover:text-cyan-300 hover:bg-cyan-400/10 font-semibold py-4 px-8 rounded-xl transition-all duration-500 flex items-center justify-center relative overflow-hidden text-base sm:text-lg md:text-lg backdrop-blur-sm">
                <span className="relative z-10">{t('hero.cta_secondary')}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              </a>
            </div>
          </div>
          
          {/* Mobile Visual Element */}
          <div className={`lg:hidden order-1 lg:order-2 mb-8 transition-all duration-1000 delay-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="relative h-[200px] sm:h-[250px] flex items-center justify-center">
              {/* Mobile decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute w-16 h-16 sm:w-20 sm:h-20 bg-cyan-400/40 rounded-full blur-md animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>
              {/* Floating particles for mobile */}
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute rounded-full bg-cyan-400 animate-pulse" style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.6 + 0.3,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`
                }}></div>
              ))}
            </div>
          </div>

          {/* Desktop Notebook Image */}
          <div className={`hidden lg:block transition-all duration-1000 delay-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-20 opacity-0 rotate-3'}`}>
            <div className="relative h-[400px] notebook-container">
              <NotebookImage scrollY={scrollY} />
              {/* Decorative elements - updated for retro-futuristic style */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse parallax-effect" data-speed="0.08"></div>
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-cyan-500 opacity-20 rounded-full filter blur-md animate-pulse parallax-effect" data-speed="0.05"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <span className="text-cyan-200 text-xs sm:text-sm mb-2 hidden sm:block">{t('hero.scroll_indicator')}</span>
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-cyan-200 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-cyan-200 rounded-full mt-1.5 sm:mt-2 animate-bounce"></div>
        </div>
      </div>

      {/* Custom animations - with retro-futuristic style */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(5px);
          }
        }
        .notebook-container {
          perspective: 1000px;
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
export default HeroSection;