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
  /* Prevent layout shifts - Enhanced CLS prevention */
  img {
    aspect-ratio: attr(width) / attr(height);
    display: block;
    max-width: 100%;
    height: auto;
  }
  
  /* Fallback for images with proper dimensions */
  img.error {
    background: linear-gradient(45deg, #2a3f5f, #5f8db9);
    object-fit: cover;
    aspect-ratio: 16/9;
  }
  
  /* Prevent CLS for dynamic content */
  .scroll-animate {
    min-height: 1px; /* Prevent collapse */
  }
  
  /* Reserve space for loading states */
  .loading-placeholder {
    aspect-ratio: 16/9;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading-shimmer 1.5s infinite;
  }
  
  @keyframes loading-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  /* Prevent CLS for text content */
  h1, h2, h3, h4, h5, h6 {
    min-height: 1.2em;
    line-height: 1.2;
  }
  
  /* Reserve space for buttons and interactive elements */
  button, .btn {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Loading spinner for lazy-loaded components */
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Font loading optimization to prevent CLS */
  @font-face {
    font-family: 'Inter';
    font-display: swap;
    font-weight: 400 600 700;
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
  }
  
  /* Prevent CLS during font loading */
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    font-display: swap;
  }
  
  /* Preload critical resources */
  .preload-critical {
    font-display: swap;
  }
  
  /* Reserve space for dynamic content containers */
  .dynamic-content {
    min-height: 200px;
  }
  
  /* Prevent CLS for cards and containers */
  .card, .project-card {
    min-height: 300px;
  }
  
  /* Optimize for mobile CLS prevention */
  @media (max-width: 768px) {
    .card, .project-card {
      min-height: 250px;
    }
    
    img {
      max-width: 100%;
      height: auto;
    }
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
  /* Fixed particles animation - Optimized for performance */
  .floating-particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: floatFixed 20s infinite linear;
    will-change: transform;
    transform: translateZ(0); /* Hardware acceleration */
    backface-visibility: hidden; /* Prevent flickering */
  }
  
  /* Optimized floating animation for fixed particles */
  @keyframes floatFixed {
    0% {
      transform: translate(0, 0) translateZ(0);
    }
    25% {
      transform: translate(20px, -30px) translateZ(0);
    }
    50% {
      transform: translate(-10px, -50px) translateZ(0);
    }
    75% {
      transform: translate(-30px, -20px) translateZ(0);
    }
    100% {
      transform: translate(0, 0) translateZ(0);
    }
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
  /* Optimizaciones para móviles - Reduced main thread work */
  @media (max-width: 768px) {
    .scroll-animate {
      transition: opacity 0.2s ease-out; /* Simplified transition */
    }
    .floating-particle {
      animation-duration: 15s;
      animation-timing-function: linear;
    }
    /* Reduced animation distances for better performance */
    .scroll-animate-slide-up {
      transform: translateY(10px);
    }
    .scroll-animate-slide-down {
      transform: translateY(-10px);
    }
    .scroll-animate-slide-right {
      transform: translateX(-10px);
    }
    .scroll-animate-slide-left {
      transform: translateX(10px);
    }
    
    /* Disable heavy animations on mobile */
    .scroll-animate-rotate,
    .scroll-animate-flip {
      animation: none;
      transition: opacity 0.2s ease-out;
    }
  }
  
  /* Reduce main thread work for low-end devices */
  @media (prefers-reduced-motion: reduce) {
    .scroll-animate,
    .floating-particle,
    .animate-pulse {
      animation: none;
      transition: opacity 0.2s ease-out;
    }
  }
  
  /* Optimizaciones adicionales para partículas fijas */
  @media (prefers-reduced-motion: reduce) {
    .floating-particle {
      animation: none; /* Desactivar animaciones si el usuario prefiere movimiento reducido */
    }
  }
  
  /* Optimización para pantallas de alta densidad */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .floating-particle {
      animation-duration: 18s; /* Ligeramente más lento en pantallas de alta resolución */
    }
  }
`;
document.head.appendChild(style);
// Optimized scroll animation observer - Reduced JavaScript execution
const scrollObserver = document.createElement('script');
scrollObserver.textContent = `
  // Defer non-critical JavaScript execution
  const initScrollAnimations = () => {
    let lastScrollTop = 0;
    let scrollDirection = 'down';
    let ticking = false;
    let isMobile = window.innerWidth < 768;
    
    // Optimized Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -40px 0px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.classList.remove('active-reverse');
          } else if (scrollDirection === 'up' && entry.boundingClientRect.y > 0) {
            entry.target.classList.remove('active');
            entry.target.classList.add('active-reverse');
          }
        });
        ticking = false;
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    // Batch DOM operations
    scrollElements.forEach(el => {
      observer.observe(el);
      el.setAttribute('data-scroll-direction', scrollDirection);
    });
    
    // Optimized scroll handler with better throttling
    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(st - lastScrollTop) > (isMobile ? 5 : 10)) {
          scrollDirection = st > lastScrollTop ? 'down' : 'up';
          lastScrollTop = st <= 0 ? 0 : st;
          document.documentElement.setAttribute('data-scroll-direction', scrollDirection);
          
          if (scrollDirection === 'up' && lastScrollTop < 300) {
            document.body.classList.add('scrolling-top');
          } else {
            document.body.classList.remove('scrolling-top');
          }
        }
        scrollTimeout = null;
      }, isMobile ? 100 : 50);
    };
    
    // Use passive event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Optimize interactive elements - Reduced event listeners
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(el => {
      el.classList.add('will-change-transform');
      
      const handleInteraction = () => {
        el.classList.add('hardware-accelerated');
        setTimeout(() => {
          if (!el.matches(':hover')) {
            el.classList.remove('hardware-accelerated');
          }
        }, 300);
      };
      
      if ('ontouchstart' in window) {
        el.addEventListener('touchstart', handleInteraction, { passive: true });
      } else {
        el.addEventListener('mouseover', handleInteraction);
      }
    });
    
    // Optimized image error handling
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('error', function() {
        this.classList.add('error');
        if (!this.src.includes('unsplash')) {
          this.src = 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000';
        }
      }, { once: true });
    });
  };
  
  // Defer initialization to improve initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
`;
document.head.appendChild(scrollObserver);
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}