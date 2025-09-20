import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import SpaceBackground from '../ui/SpaceBackground';
const TechnologiesSection = () => {
  const {
    t
  } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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
      const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      setIsVisible(isInView);
      // Animate elements
      const elements = sectionRef.current.querySelectorAll('.tech-animate');
      elements.forEach((el, index) => {
        const elRect = el.getBoundingClientRect();
        const elIsVisible = elRect.top < window.innerHeight * 0.9;
        if (elIsVisible) {
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
  // Technologies list without categories or icons
  const technologies = [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'HTML5',
    'CSS3',
    'TailwindCSS',
    'Node.js',
    '.NET',
    'C#',
    'MongoDB',
    'Mongo Atlas',
    'PostgreSQL',
    'SQL',
    'AWS',
    'Azure',
    'Firebase',
    'Firestore',
    'Git',
    'GitHub',
    'Vite'
  ];
  return <section id="tecnologias" className="py-20 bg-gray-950 relative overflow-hidden" ref={sectionRef}>
      {/* Background elements - updated for retro-futuristic style */}
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
        {/* Digital scanlines */}
        <div className="absolute inset-0 bg-scanlines opacity-5"></div>
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 tech-animate tech-stagger">
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-4 text-white">
            {t('technologies.title')}
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
        </div>
        {/* Technologies Horizontal Scroll */}
        <div className="tech-animate tech-slide-up">
          <div className="relative overflow-hidden">
            {/* Gradient overlays for smooth fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none"></div>
            
            {/* Scrolling container with multiple copies for seamless loop */}
            <div className="flex gap-6 py-4">
              {/* Create 4 copies to ensure seamless loop */}
              {[...Array(4)].map((_, copyIndex) => (
                <div key={copyIndex} className="flex gap-6 animate-scroll">
                  {technologies.map((tech, techIndex) => (
                    <div 
                      key={`${copyIndex}-${tech}`}
                      className="tech-animate tech-expand group relative flex-shrink-0" 
                      style={{
                        transitionDelay: `${techIndex * 50}ms`
                      }} 
                      data-scroll={scrollDirection}
                    >
                      {/* Main Card */}
                      <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm rounded-xl p-4 md:p-6 lg:p-6 flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl border border-gray-700/30 group-hover:border-blue-400/50 relative overflow-hidden h-20 md:h-24 lg:h-24 w-32 md:w-36 lg:w-36">
                        
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                          }}></div>
                        </div>
                        
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm rounded-xl"></div>
                        
                        {/* Tech Name with better typography */}
                        <span className="relative z-10 text-xs md:text-sm lg:text-sm font-semibold text-gray-200 transition-all duration-300 group-hover:text-white text-center leading-tight">
                          {tech}
                        </span>
                        
                        {/* Progress bar effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700/50 rounded-b-xl overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                        </div>
                        
                        {/* Corner accent */}
                        <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        
                        {/* Hover border effect */}
                        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400/30 transition-all duration-300"></div>
                      </div>
                      
                      {/* Floating particles effect */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {[...Array(3)].map((_, i) => (
                          <div 
                            key={i}
                            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                            style={{
                              top: `${20 + i * 30}%`,
                              left: `${10 + i * 40}%`,
                              animationDelay: `${i * 0.5}s`,
                              animationDuration: '2s'
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Custom animations for tech section */}
      <style>{`
        /* Base styles for tech animations */
        .tech-animate {
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }
        /* Staggered entrance animation */
        .tech-stagger {
          transform: translateY(20px);
        }
        .tech-stagger.active {
          transform: translateY(0);
          opacity: 1;
        }
        /* Slide up animation */
        .tech-slide-up {
          transform: translateY(30px);
        }
        .tech-slide-up.active {
          transform: translateY(0);
          opacity: 1;
        }
        /* Enhanced expand animation for tech cards */
        .tech-expand {
          transform: scale(0.8) translateY(20px);
          opacity: 0;
        }
        .tech-expand.active {
          transform: scale(1) translateY(0);
          opacity: 1;
          animation: techPulse 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        /* Fade in animation */
        .tech-fade {
          opacity: 0;
        }
        .tech-fade.active {
          opacity: 1;
        }
        /* Reveal animation with clip path */
        .tech-reveal {
          clip-path: inset(0 100% 0 0);
        }
        .tech-reveal.active {
          clip-path: inset(0 0 0 0);
          opacity: 1;
          animation: techReveal 0.8s ease-out forwards;
        }
        @keyframes techPulse {
          0% {
            transform: scale(0.8) translateY(20px);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) translateY(-5px);
            opacity: 0.8;
          }
          75% {
            transform: scale(0.98) translateY(2px);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        @keyframes techReveal {
          0% {
            clip-path: inset(0 100% 0 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
          }
        }
        /* When scrolling up, animate differently */
        .tech-animate[data-scroll='up'].active {
          transition-delay: 0s;
        }
        /* Enhanced hover effects */
        .tech-expand:hover {
          transform: translateY(-8px) scale(1.02);
        }
        
        /* Staggered animation improvements */
        .tech-expand:nth-child(1) { transition-delay: 0ms; }
        .tech-expand:nth-child(2) { transition-delay: 100ms; }
        .tech-expand:nth-child(3) { transition-delay: 200ms; }
        .tech-expand:nth-child(4) { transition-delay: 300ms; }
        .tech-expand:nth-child(5) { transition-delay: 400ms; }
        .tech-expand:nth-child(6) { transition-delay: 500ms; }
        
        /* Mobile and tablet optimizations */
        @media (max-width: 1024px) {
          .tech-animate {
            transition-duration: 0.5s;
          }
          .tech-expand {
            transform: scale(0.9) translateY(10px);
          }
          .tech-expand.active {
            transform: scale(1) translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .tech-animate {
            transition-duration: 0.4s;
          }
          .tech-expand {
            transform: scale(0.85) translateY(15px);
          }
        }
        
        @media (max-width: 640px) {
          .tech-expand {
            transform: scale(0.8) translateY(20px);
          }
        }
        /* Digital scanlines */
        .bg-scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(34, 211, 238, 0.1) 50%
          );
          background-size: 100% 4px;
        }
        
        /* Horizontal scroll animation - infinite loop without jumps */
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        /* Pause animation on hover */
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>;
};
export default TechnologiesSection;