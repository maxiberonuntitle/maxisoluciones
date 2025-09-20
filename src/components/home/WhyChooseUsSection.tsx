import React, { useEffect, useState, useRef } from 'react';
import { Clock, Users, Award, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
const WhyChooseUsSection = () => {
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
      const elements = sectionRef.current.querySelectorAll('.why-animate');
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
  const reasons = [{
    icon: <Clock className="w-10 h-10 text-blue-500" />,
    title: t('reason_punctual_title'),
    description: t('reason_punctual_desc')
  }, {
    icon: <Users className="w-10 h-10 text-blue-500" />,
    title: t('reason_team_title'),
    description: t('reason_team_desc')
  }, {
    icon: <Award className="w-10 h-10 text-blue-500" />,
    title: t('reason_quality_title'),
    description: t('reason_quality_desc')
  }, {
    icon: <Zap className="w-10 h-10 text-blue-500" />,
    title: t('reason_support_title'),
    description: t('reason_support_desc')
  }];
  return <section id="por-qué-elegirnos" className="py-20 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden" ref={sectionRef}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
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
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-700 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-700 rounded-full opacity-10 blur-3xl"></div>
        {/* Digital particles */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => <div key={`particle-${i}`} className="absolute rounded-full bg-cyan-400" style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.7 + 0.3,
          boxShadow: '0 0 5px 2px rgba(34, 211, 238, 0.3)',
          animation: `float ${Math.random() * 10 + 15}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`
        }}></div>)}
        </div>
        {/* Digital scanlines */}
        <div className="absolute inset-0 bg-scanlines opacity-5"></div>
        {/* Animated lines */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(5)].map((_, i) => <div key={`line-${i}`} className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" style={{
          top: `${i * 20 + 10}%`,
          animation: `slideRight 15s infinite linear ${i * 2}s`
        }}></div>)}
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 why-animate why-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t('why_choose_us_title')}
          </h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
          <p className="text-xl text-blue-200">{t('why_choose_us_subtitle')}</p>
        </div>
        {/* 3D rotating element */}
        <div className="mb-16 max-w-4xl mx-auto why-animate why-scale">
          <div className="bg-gradient-to-r from-blue-800 to-indigo-800 p-6 rounded-xl text-white text-center shadow-xl border border-blue-700/30">
            <h3 className="text-2xl font-bold mb-2">
              {t('why_choose_us_innovation')}
            </h3>
            <p className="text-blue-200">
              Combino tecnología de vanguardia con estrategias creativas para
              ofrecer soluciones que destacan en el mercado digital.
            </p>
          </div>
        </div>
        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {reasons.map((reason, index) => <div key={index} className={`why-animate ${index % 2 === 0 ? 'why-flip-left' : 'why-flip-right'} group`} style={{
          transitionDelay: `${index * 50}ms`
        }}>
              <div className="bg-blue-900/30 backdrop-blur-sm p-6 rounded-lg text-center transition-all duration-500 hover:shadow-xl hover:bg-blue-800/40 hover:-translate-y-2 h-full border border-blue-800/30 relative overflow-hidden">
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-800/50 to-indigo-800/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto bg-blue-800/50 rounded-full flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-700/50 group-hover:shadow-lg">
                    <div className="transition-transform duration-500 group-hover:scale-110 group-hover:text-blue-300">
                      {reason.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white transition-colors duration-300 group-hover:text-blue-300">
                    {reason.title}
                  </h3>
                  <p className="text-blue-200 transition-colors duration-300 group-hover:text-blue-100">
                    {reason.description}
                  </p>
                </div>
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-blue-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
            </div>)}
        </div>
      </div>
      {/* Custom animations */}
      <style jsx>{`
        /* Base styles for why choose us animations */
        .why-animate {
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: transform, opacity;
        }
        /* Fade in animation */
        .why-fade-in {
          opacity: 0;
        }
        .why-fade-in.active {
          opacity: 1;
        }
        /* Scale animation */
        .why-scale {
          transform: scale(0.8);
        }
        .why-scale.active {
          transform: scale(1);
          opacity: 1;
        }
        /* Flip animations */
        .why-flip-left {
          transform: perspective(1000px) rotateY(-20deg) translateX(-50px);
        }
        .why-flip-left.active {
          transform: perspective(1000px) rotateY(0) translateX(0);
          opacity: 1;
        }
        .why-flip-right {
          transform: perspective(1000px) rotateY(20deg) translateX(50px);
        }
        .why-flip-right.active {
          transform: perspective(1000px) rotateY(0) translateX(0);
          opacity: 1;
        }
        /* Slide animations */
        .why-slide-right {
          transform: translateX(-50px);
        }
        .why-slide-right.active {
          transform: translateX(0);
          opacity: 1;
        }
        .why-slide-left {
          transform: translateX(50px);
        }
        .why-slide-left.active {
          transform: translateX(0);
          opacity: 1;
        }
        /* Bounce animation */
        .why-bounce {
          transform: scale(0.95);
        }
        .why-bounce.active {
          animation: whyBounce 0.8s forwards;
          opacity: 1;
        }
        @keyframes whyBounce {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          50% {
            transform: scale(1.02);
            opacity: 1;
          }
          75% {
            transform: scale(0.98);
          }
          100% {
            transform: scale(1);
          }
        }
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .why-animate {
            transition-duration: 0.5s;
          }
          .why-flip-left,
          .why-flip-right {
            transform: translateY(30px);
          }
          .why-flip-left.active,
          .why-flip-right.active {
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.5);
          }
        }
        @keyframes slideRight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
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
export default WhyChooseUsSection;