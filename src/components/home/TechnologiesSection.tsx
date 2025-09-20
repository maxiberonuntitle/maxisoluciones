import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
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
  // Technologies without category
  const technologies = [{
    name: 'React',
    category: 'stack'
  }, {
    name: 'TypeScript',
    category: 'stack'
  }, {
    name: 'JavaScript',
    category: 'stack'
  }, {
    name: 'Node.js',
    category: 'stack'
  }, {
    name: 'TailwindCSS',
    category: 'stack'
  }, {
    name: 'Vite',
    category: 'stack'
  }];
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
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-blue-200">{t('tech_subtitle')}</p>
        </div>
        {/* Technologies grid - without category header */}
        <div className="space-y-12">
          <div className="tech-animate tech-slide-up">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-6">
              {technologies.map((tech, techIndex) => <div key={tech.name} className="tech-animate tech-expand bg-blue-900/30 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:bg-blue-800/40 border border-blue-800/30 group" style={{
              transitionDelay: `${techIndex * 50}ms`
            }} data-scroll={scrollDirection}>
                  {/* Nombre de tecnología con efecto hover */}
                  <span className="text-xl font-bold text-blue-100 transition-all duration-300 group-hover:text-white group-hover:scale-110">
                    {tech.name}
                  </span>
                  {/* Efecto de brillo al hacer hover */}
                  <div className="mt-2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></div>
                  {/* Efecto de halo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </div>)}
            </div>
          </div>
        </div>
        {/* Floating code snippets */}
        <div className="mt-16 relative max-w-4xl mx-auto">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-full blur-2xl transition-opacity duration-700 tech-animate tech-fade"></div>
          <div className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-blue-800/30 shadow-xl tech-animate tech-reveal">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {t('tech_project_question')}
                </h3>
                <p className="text-blue-200 mb-6">{t('tech_project_desc')}</p>
                <a href="#contacto" className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1">
                  {t('tech_project_cta')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Custom animations for tech section */}
      <style jsx>{`
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
        /* Expand animation for tech cards */
        .tech-expand {
          transform: scale(0.8);
        }
        .tech-expand.active {
          transform: scale(1);
          opacity: 1;
          animation: techPulse 0.5s ease-out;
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
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
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
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .tech-animate {
            transition-duration: 0.5s;
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
      `}</style>
    </section>;
};
export default TechnologiesSection;