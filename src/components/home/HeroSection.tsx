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
      <div className="container mx-auto px-4 md:px-6 z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white max-w-xl">
            <div className={`overflow-hidden transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="hidden md:inline">Potenciamos tu </span>
                <span className="md:hidden">Tu </span>
                <span className="text-cyan-400">presencia digital</span>
                <span className="hidden md:inline"> para impulsar tu </span>
                <span className="md:hidden"> para tu </span>
                <span className="text-cyan-400">éxito</span>
              </h1>
            </div>
            <div className={`transition-all duration-1000 delay-300 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-xl text-blue-100 mb-8">
                Transformamos tu visión en soluciones digitales que conectan,
                convierten y hacen crecer tu negocio en el mundo online.
              </p>
            </div>
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link to="/#contacto" className="group bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  {t('hero_cta_primary')}
                  <ChevronRightIcon className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              </Link>
              <a href="#servicios" className="group bg-transparent border-2 border-cyan-400 text-cyan-400 hover:border-cyan-300 hover:text-cyan-300 font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden">
                <span className="relative z-10">{t('hero_cta_secondary')}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </a>
            </div>
          </div>
          {/* Replace 3D Spaceship Model with 2D Notebook Image */}
          <div className={`hidden lg:block transition-all duration-1000 delay-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-20 opacity-0 rotate-3'}`}>
            <div className="relative h-[400px] notebook-container">
              {/* Replace SpaceshipModel3D with NotebookImage */}
              <NotebookImage scrollY={scrollY} />
              {/* Decorative elements - updated for retro-futuristic style */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse parallax-effect" data-speed="0.08"></div>
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-cyan-500 opacity-20 rounded-full filter blur-md animate-pulse parallax-effect" data-speed="0.05"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <span className="text-cyan-200 text-sm mb-2">{t('hero_discover')}</span>
        <div className="w-6 h-10 border-2 border-cyan-200 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-cyan-200 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>

      {/* Custom animations - with retro-futuristic style */}
      <style jsx>{`
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