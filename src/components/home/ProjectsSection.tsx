import { useEffect, useState, useRef } from 'react';
import ProjectCard from '../ui/ProjectCard';
import { useLanguage } from '../context/LanguageContext';

const ProjectsSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Animaciones al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);

      if (!sectionRef.current) return;

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
    setTimeout(handleScroll, 50);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Scroll automático del carrusel
  useEffect(() => {
    let scrollInterval: NodeJS.Timeout;

    const startAutoScroll = () => {
      const el = carouselRef.current;
      if (!el) return;
      scrollInterval = setInterval(() => {
        if (!isPaused) {
          el.scrollLeft += 1.5; // velocidad del scroll
          // Reinicia cuando llega al final (efecto infinito)
          if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
            el.scrollLeft = 0;
          }
        }
      }, 20);
    };

    startAutoScroll();
    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  const projects = [
    {
      id: 1,
      title: 'Cafetería Nuevo Jago',
      category: 'Cafetería',
      location: 'Madrid',
      description: `${t('projects.services_applied')}: ${t('projects.web_development')}, ${t('projects.local_seo')}, ${t('projects.google_maps')}, ${t('projects.digital_marketing')}. ${t('projects.cafe_nuevo_jago.description')}`,
      image: '/cafefeterianuevojago.png',
      link: '/proyectos/cafe-nuevo-jago',
      technologies: [t('projects.web_development'), t('projects.local_seo'), t('projects.google_maps'), t('projects.digital_marketing')],
    },
    {
      id: 2,
      title: 'Antonio y Adama Jardinería',
      category: 'Jardinería',
      location: 'Lloret de Mar',
      description: `${t('projects.services_applied')}: ${t('projects.web_development')}, ${t('projects.seo')}, ${t('projects.google_maps')}, ${t('projects.professional_design')}. ${t('projects.antonio_yadama.description')}`,
      image: '/antonioyadamajardineria.png',
      link: '/proyectos/antonio-yadama',
      technologies: [t('projects.web_development'), t('projects.seo'), t('projects.google_maps'), t('projects.professional_design')],
    },
    {
      id: 3,
      title: 'Papelería Abril',
      category: 'Papelería',
      location: 'Tacuarembó',
      description: `${t('projects.services_applied')}: ${t('projects.web_development')}, ${t('projects.seo')}, ${t('projects.google_maps')}, ${t('projects.responsive_design')}. ${t('projects.papeleria_abril.description')}`,
      image: '/papeleriaaabril.png',
      link: '/proyectos/papeleria-abril',
      technologies: [t('projects.web_development'), t('projects.seo'), t('projects.google_maps'), t('projects.responsive_design')],
      showCaseStudy: true,
    },
    {
      id: 4,
      title: 'Lomito',
      category: 'Bar y Pizzería',
      location: 'Lloret de Mar',
      description: `${t('projects.services_applied')}: ${t('projects.web_development')}, ${t('projects.local_seo')}, ${t('projects.google_maps')}, ${t('projects.responsive_design')}. ${t('projects.lomito.description')}`,
      image: '/preview-lomito.png',
      link: '/proyectos/lomito',
      technologies: [t('projects.web_development'), t('projects.local_seo'), t('projects.google_maps'), t('projects.responsive_design')],
      externalLink: 'https://lomito.netlify.app',
    },
  ];

  return (
    <section
      id="proyectos"
      className="py-20 bg-gradient-to-b from-gray-950 to-indigo-950 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Fondo retro futurista */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cyan-600 opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-600 opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                'linear-gradient(0deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              backgroundPosition: 'center center',
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(75deg) translateZ(-100px) translateY(-20%)',
            }}
          ></div>
        </div>
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-cyan-400"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              boxShadow: '0 0 8px 2px rgba(34, 211, 238, 0.6)',
              animation: `float ${Math.random() * 10 + 15}s infinite alternate ${Math.random() * 5}s ease-in-out`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 project-animate project-title">
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-4 text-white">
            {t('projects.title')}
          </h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
        </div>

        {/* Carrusel horizontal con autoscroll */}
        <div
          className="relative overflow-x-auto overflow-y-hidden scrollbar-hide py-6"
          ref={carouselRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="flex space-x-6 px-4 snap-x snap-mandatory scroll-smooth">
            {/* Duplicamos la lista para crear efecto infinito sin salto */}
            {[...projects, ...projects].map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className={`project-animate project-card-${index % 3} snap-start flex-shrink-0 w-[300px] md:w-[380px]`}
                style={{ transitionDelay: `${index * 50}ms` }}
                data-scroll={scrollDirection}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estilos personalizados */}
      <style>{`
        .project-animate {
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: transform, opacity;
        }
        .project-title {
          transform: translateY(-30px);
        }
        .project-title.active {
          transform: translateY(0);
          opacity: 1;
        }
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
        .project-animate[data-scroll='up'].active {
          transition-delay: 0s;
        }
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

        /* Oculta scrollbars */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
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
      `}</style>
    </section>
  );
};

export default ProjectsSection;
