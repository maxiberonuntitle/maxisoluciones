import React, { createElement } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './i18n';
// Add custom styles for animations
const style = document.createElement('style');
style.textContent = `
  /* Optimización de rendimiento */
  .will-change-transform {
    will-change: transform;
  }
  .will-change-opacity {
    will-change: opacity;
  }
  .hardware-accelerated {
    transform: translateZ(0);
  }
  /* Prevent layout shifts */
  img {
    aspect-ratio: attr(width) / attr(height);
  }
  /* Fallback for images */
  img.error {
    background: linear-gradient(45deg, #2a3f5f, #5f8db9);
    object-fit: cover;
  }
  /* Parallax effect */
  .parallax-effect {
    will-change: transform;
    transform: translateZ(0);
  }
  /* Custom animations - Optimizadas */
  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0);
    }
    25% {
      transform: translateY(-10px) translateX(5px);
    }
    50% {
      transform: translateY(-5px) translateX(10px);
    }
    75% {
      transform: translateY(-15px) translateX(-5px);
    }
  }
  @keyframes expand {
    0% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }
  /* Smooth scroll behavior - OPTIMIZED */
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px; /* Add padding to account for fixed header */
  }
  /* Improved transitions with cubic bezier for more natural movement */
  * {
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    transition-duration: 150ms;
  }
  /* Optimización de animaciones */
  .animate-gpu {
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
  /* Advanced scroll animations - OPTIMIZADAS Y MÁS CORTAS */
  @keyframes rotateIn {
    from { transform: rotate(-3deg) scale(0.95); opacity: 0; }
    to { transform: rotate(0) scale(1); opacity: 1; }
  }
  @keyframes rotateOut {
    from { transform: rotate(0) scale(1); opacity: 1; }
    to { transform: rotate(3deg) scale(0.95); opacity: 0; }
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideDown {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideRight {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideLeft {
    from { transform: translateX(20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes scaleUp {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  @keyframes scaleDown {
    from { transform: scale(1.05); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes popOut {
    0% { transform: scale(0); opacity: 0; }
    60% { transform: scale(1.02); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes popIn {
    0% { transform: scale(1.02); opacity: 0; }
    60% { transform: scale(0.98); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  /* Reverse animations for scroll up - OPTIMIZADAS */
  @keyframes slideUpReverse {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-20px); opacity: 0; }
  }
  @keyframes slideDownReverse {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(20px); opacity: 0; }
  }
  @keyframes slideRightReverse {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(20px); opacity: 0; }
  }
  @keyframes slideLeftReverse {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(-20px); opacity: 0; }
  }
  @keyframes scaleUpReverse {
    from { transform: scale(1); opacity: 1; }
    to { transform: scale(0.95); opacity: 0; }
  }
  @keyframes scaleDownReverse {
    from { transform: scale(1); opacity: 1; }
    to { transform: scale(1.05); opacity: 0; }
  }
  /* Optimized scroll animations - SMOOTHER TRANSITIONS */
  .scroll-animate {
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
    will-change: transform, opacity;
  }
  .scroll-animate-fade-in {
    opacity: 0;
  }
  .scroll-animate-fade-in.active {
    opacity: 1;
  }
  .scroll-animate-fade-in-reverse.active-reverse {
    animation: fadeIn 0.4s reverse forwards;
  }
  .scroll-animate-slide-up {
    transform: translateY(20px);
    opacity: 0;
  }
  .scroll-animate-slide-up.active {
    transform: translateY(0);
    opacity: 1;
  }
  .scroll-animate-slide-up-reverse.active-reverse {
    animation: slideUpReverse 0.4s forwards;
  }
  .scroll-animate-slide-down {
    transform: translateY(-20px);
    opacity: 0;
  }
  .scroll-animate-slide-down.active {
    transform: translateY(0);
    opacity: 1;
  }
  .scroll-animate-slide-down-reverse.active-reverse {
    animation: slideDownReverse 0.4s forwards;
  }
  .scroll-animate-slide-right {
    transform: translateX(-20px);
    opacity: 0;
  }
  .scroll-animate-slide-right.active {
    transform: translateX(0);
    opacity: 1;
  }
  .scroll-animate-slide-right-reverse.active-reverse {
    animation: slideRightReverse 0.4s forwards;
  }
  .scroll-animate-slide-left {
    transform: translateX(20px);
    opacity: 0;
  }
  .scroll-animate-slide-left.active {
    transform: translateX(0);
    opacity: 1;
  }
  .scroll-animate-slide-left-reverse.active-reverse {
    animation: slideLeftReverse 0.4s forwards;
  }
  .scroll-animate-scale {
    transform: scale(0.95);
    opacity: 0;
  }
  .scroll-animate-scale.active {
    transform: scale(1);
    opacity: 1;
  }
  .scroll-animate-scale-reverse.active-reverse {
    animation: scaleUpReverse 0.4s forwards;
  }
  .scroll-animate-scale-down {
    transform: scale(1.05);
    opacity: 0;
  }
  .scroll-animate-scale-down.active {
    transform: scale(1);
    opacity: 1;
  }
  .scroll-animate-scale-down-reverse.active-reverse {
    animation: scaleDownReverse 0.4s forwards;
  }
  .scroll-animate-rotate {
    transform: rotate(-3deg) scale(0.95);
    opacity: 0;
  }
  .scroll-animate-rotate.active {
    transform: rotate(0) scale(1);
    opacity: 1;
  }
  .scroll-animate-rotate-reverse.active-reverse {
    animation: rotateOut 0.4s forwards;
  }
  .scroll-animate-flip {
    transform: perspective(800px) rotateY(20deg);
    opacity: 0;
  }
  .scroll-animate-flip.active {
    transform: perspective(800px) rotateY(0);
    opacity: 1;
  }
  .scroll-animate-flip-reverse.active-reverse {
    animation: flipOut 0.4s forwards;
  }
  .scroll-animate-pop {
    transform: scale(0);
    opacity: 0;
  }
  .scroll-animate-pop.active {
    animation: popOut 0.4s forwards;
  }
  .scroll-animate-pop-reverse.active-reverse {
    animation: popIn 0.4s reverse forwards;
  }
  /* Scroll to top animation effects */
  .scrolling-to-top .scroll-animate.active {
    transition: all 0.3s ease-out;
    animation: quickPop 0.3s forwards;
  }
  @keyframes quickPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
  /* Floating particles animation */
  .floating-particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: float 25s infinite ease-in-out;
    will-change: transform;
  }
  /* New section reveal animation */
  @keyframes sectionReveal {
    0% { clip-path: inset(0 100% 0 0); }
    100% { clip-path: inset(0 0 0 0); }
  }
  .section-reveal {
    animation: sectionReveal 0.6s ease-out forwards;
    will-change: clip-path;
  }
  /* Optimizaciones para móviles */
  @media (max-width: 768px) {
    .scroll-animate {
      transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
    .floating-particle {
      animation-duration: 20s;
    }
    /* Reducir distancias de animación en móviles */
    .scroll-animate-slide-up {
      transform: translateY(15px);
    }
    .scroll-animate-slide-down {
      transform: translateY(-15px);
    }
    .scroll-animate-slide-right {
      transform: translateX(-15px);
    }
    .scroll-animate-slide-left {
      transform: translateX(15px);
    }
  }
`;
document.head.appendChild(style);
// Add optimized scroll animation observer with better performance
const scrollObserver = document.createElement('script');
scrollObserver.textContent = `
  document.addEventListener('DOMContentLoaded', () => {
    let lastScrollTop = 0;
    let scrollDirection = 'down';
    let ticking = false;
    let isMobile = window.innerWidth < 768;
    const scrollElements = document.querySelectorAll('.scroll-animate');
    // Detectar dispositivo móvil para optimizaciones
    const checkDevice = () => {
      isMobile = window.innerWidth < 768;
    };
    // Use Intersection Observer for better performance
    const observerOptions = {
      root: null,
      rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -40px 0px',
      threshold: 0.1
    };
    const handleIntersect = (entries, observer) => {
      if (ticking) return;
      ticking = true;
      // Usar requestAnimationFrame para mejor rendimiento
      requestAnimationFrame(() => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Element is visible - add active class
            entry.target.classList.add('active');
            entry.target.classList.remove('active-reverse');
          } else if (scrollDirection === 'up' && entry.boundingClientRect.y > 0) {
            // When scrolling up and element is above viewport
            entry.target.classList.remove('active');
            entry.target.classList.add('active-reverse');
          }
        });
        ticking = false;
      });
    };
    // Crear observer con opciones optimizadas
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    // Observe all scroll elements
    scrollElements.forEach(el => {
      observer.observe(el);
      el.setAttribute('data-scroll-direction', scrollDirection);
    });
    // Handle scroll direction with better throttling
    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        // Detectar dirección de scroll
        if (Math.abs(st - lastScrollTop) > (isMobile ? 5 : 10)) {
          scrollDirection = st > lastScrollTop ? 'down' : 'up';
          lastScrollTop = st <= 0 ? 0 : st;
          // Update scroll direction attribute
          document.documentElement.setAttribute('data-scroll-direction', scrollDirection);
          // Add special effects when scrolling to top
          if (scrollDirection === 'up' && lastScrollTop < 300) {
            document.body.classList.add('scrolling-top');
          } else {
            document.body.classList.remove('scrolling-top');
          }
        }
        scrollTimeout = null;
      }, isMobile ? 100 : 50); // Mayor throttling en móviles para mejor rendimiento
    };
    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkDevice, { passive: true });
    // Optimize transitions on interactive elements
    document.querySelectorAll('a, button, .interactive').forEach(el => {
      el.classList.add('will-change-transform');
      const addHardwareAcceleration = () => {
        el.classList.add('hardware-accelerated');
      };
      const removeHardwareAcceleration = () => {
        setTimeout(() => {
          if (!el.matches(':hover')) {
            el.classList.remove('hardware-accelerated');
          }
        }, 300);
      };
      // Usar eventos táctiles para dispositivos móviles
      if ('ontouchstart' in window) {
        el.addEventListener('touchstart', addHardwareAcceleration, { passive: true });
        el.addEventListener('touchend', removeHardwareAcceleration, { passive: true });
      } else {
        el.addEventListener('mouseover', addHardwareAcceleration);
        el.addEventListener('mouseout', removeHardwareAcceleration);
      }
    });
    // Handle image loading errors
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function() {
        this.classList.add('error');
        if (!this.src.includes('unsplash')) {
          this.src = 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000';
        }
      });
    });
    // Inicializar
    checkDevice();
  });
`;
document.head.appendChild(scrollObserver);
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}