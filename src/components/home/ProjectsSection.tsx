import React, { useEffect, useState, useRef } from 'react';
import ProjectCard from '../ui/ProjectCard';
import { useLanguage } from '../context/LanguageContext';
const ProjectsSection = () => {
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
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      setIsInView(isVisible);
      // Animate elements
      const elements = sectionRef.current.querySelectorAll('.project-animate');
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
  const projects = [{
    id: 1,
    title: 'Papelería Abril',
    category: 'Papelería',
    location: 'Tacuarembó',
    description: `${t('projects.services_applied')}: ${t('projects.web_development')}, ${t('projects.seo')}, ${t('projects.google_maps')}, ${t('projects.responsive_design')}. ${t('projects.papeleria_abril.description')}`,
    image: '/src/public/papeleriaaabril.png',
    link: '/proyectos/papeleria-abril',
    technologies: [t('projects.web_development'), t('projects.seo'), t('projects.google_maps'), t('projects.responsive_design')],
    showCaseStudy: true
  }, {
    id: 2,
    title: 'Antonio y Adama Jardinería',
    category: 'Jardinería',
    location: 'Lloret de Mar',
    description: `${t('projects.services_applied')}: ${t('projects.web_development')}, ${t('projects.seo')}, ${t('projects.google_maps')}, ${t('projects.professional_design')}. ${t('projects.antonio_yadama.description')}`,
    image: '/src/public/antonioyadamajardineria.png',
    link: '/proyectos/antonio-yadama',
    technologies: [t('projects.web_development'), t('projects.seo'), t('projects.google_maps'), t('projects.professional_design')]
  }, {
    id: 3,
    title: 'Cafetería Nuevo Jago',
    category: 'Cafetería',
    location: 'Madrid',
    description: `${t('projects.services_applied')}: ${t('projects.web_development')}, ${t('projects.local_seo')}, ${t('projects.google_maps')}, ${t('projects.digital_marketing')}. ${t('projects.cafe_nuevo_jago.description')}`,
    image: '/src/public/cafefeterianuevojago.png',
    link: '/proyectos/cafe-nuevo-jago',
    technologies: [t('projects.web_development'), t('projects.local_seo'), t('projects.google_maps'), t('projects.digital_marketing')]
  }];
  return <section id="proyectos" className="py-20 bg-gradient-to-b from-gray-950 to-indigo-950 relative overflow-hidden" ref={sectionRef}>
      {/* Background elements - updated for retro-futuristic look */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cyan-600 opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-600 opacity-5 rounded-full filter blur-3xl"></div>
        {/* Retro grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(0deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(75deg) translateZ(-100px) translateY(-20%)'
        }}></div>
        </div>
        {/* Digital particles */}
        {[...Array(20)].map((_, i) => <div key={`particle-${i}`} className="absolute rounded-full bg-cyan-400" style={{
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.7 + 0.3,
        boxShadow: '0 0 8px 2px rgba(34, 211, 238, 0.6)',
        animation: `float ${Math.random() * 10 + 15}s infinite alternate ${Math.random() * 5}s ease-in-out`
      }}></div>)}
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 project-animate project-title">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t('projects.title')}
          </h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
          <p className="text-xl text-blue-200">{t('projects.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => <div key={project.id} className={`project-animate project-card-${index % 3}`} style={{
          transitionDelay: `${index * 50}ms`
        }} data-scroll={scrollDirection}>
              <ProjectCard project={project} />
            </div>)}
        </div>
      </div>
      {/* Custom animations for projects section */}
      <style>{`
        /* Base styles for project animations */
        .project-animate {
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: transform, opacity;
        }
        /* Title animation */
        .project-title {
          transform: translateY(-30px);
        }
        .project-title.active {
          transform: translateY(0);
          opacity: 1;
        }
        /* Card animations - different for each column */
        .project-card-0 {
          transform: perspective(1000px) rotateY(-15deg) translateX(-30px);
        }
        .project-card-0.active {
          transform: perspective(1000px) rotateY(0) translateX(0);
          opacity: 1;
        }
        .project-card-1 {
          transform: translateY(40px);
        }
        .project-card-1.active {
          transform: translateY(0);
          opacity: 1;
        }
        .project-card-2 {
          transform: perspective(1000px) rotateY(15deg) translateX(30px);
        }
        .project-card-2.active {
          transform: perspective(1000px) rotateY(0) translateX(0);
          opacity: 1;
        }
        /* When scrolling up, animate differently */
        .project-animate[data-scroll='up'].active {
          transition-delay: 0s;
        }
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .project-animate {
            transition-duration: 0.5s;
          }
          .project-card-0,
          .project-card-1,
          .project-card-2 {
            transform: translateY(30px);
          }
          .project-card-0.active,
          .project-card-1.active,
          .project-card-2.active {
            transform: translateY(0);
          }
        }
        @keyframes slideRight {
          from {
            transform: translateX(-5%) translateY(-50%);
            opacity: 0.2;
          }
          to {
            transform: translateX(0) translateY(-50%);
            opacity: 0.8;
          }
        }
        @keyframes slideDown {
          from {
            transform: translateY(-5%) translateX(-50%);
            opacity: 0.2;
          }
          to {
            transform: translateY(0) translateX(-50%);
            opacity: 0.8;
          }
        }
      `}</style>
    </section>;
};
export default ProjectsSection;