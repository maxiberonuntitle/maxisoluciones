import React, { useEffect, useState } from 'react';
import { ArrowUpIcon } from 'lucide-react';
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  const scrollToTop = () => {
    setIsScrolling(true);
    // Add a class to the body for additional effects during scroll to top
    document.body.classList.add('scrolling-to-top');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Remove the class after animation completes
    setTimeout(() => {
      setIsScrolling(false);
      document.body.classList.remove('scrolling-to-top');
    }, 700);
  };
  return <button onClick={scrollToTop} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`fixed right-6 bottom-24 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'} ${isScrolling ? 'animate-bounce' : ''}`} aria-label="Scroll to top">
      {/* Ripple effect on hover */}
      <span className={`absolute inset-0 rounded-full bg-blue-400 transition-transform duration-300 ${isHovered ? 'scale-110 opacity-30' : 'scale-0 opacity-0'}`}></span>
      {/* Button icon */}
      <ArrowUpIcon className={`relative z-10 w-6 h-6 transition-transform duration-200 ${isHovered ? 'scale-110' : 'scale-100'}`} />
      {/* Background glow */}
      <span className={`absolute inset-0 rounded-full bg-blue-500 filter blur-md transition-opacity duration-200 ${isHovered ? 'opacity-70' : 'opacity-0'}`}></span>
    </button>;
};
export default ScrollToTopButton;