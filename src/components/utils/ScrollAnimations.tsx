import React, { useEffect, useState, useRef } from 'react';
interface ScrollAnimationProps {
  children: React.ReactNode;
  animationClass: string;
  threshold?: number;
  delay?: number;
  reverseOnUp?: boolean;
}
export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animationClass,
  threshold = 0.2,
  delay = 0,
  reverseOnUp = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Detect scroll direction
    const handleScrollDirection = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScrollDirection, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', handleScrollDirection);
    };
  }, [lastScrollY]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          setIsVisible(true);
        }, delay);
      } else if (reverseOnUp && scrollDirection === 'up') {
        // Reset visibility when scrolling up and element is out of view
        setIsVisible(false);
      }
    }, {
      threshold,
      rootMargin: '0px 0px -100px 0px'
    });
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay, reverseOnUp, scrollDirection]);
  // Generate animation class based on visibility and scroll direction
  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    // Apply different animation based on scroll direction
    if (scrollDirection === 'up' && reverseOnUp) {
      // For scroll up, reverse the animation
      return `${animationClass}-reverse active-reverse`;
    }
    return `${animationClass} active`;
  };
  return <div ref={ref} className={`scroll-animate transition-all duration-1000 ease-out ${getAnimationClass()}`} style={{
    transitionDelay: `${delay}ms`
  }} data-scroll-direction={scrollDirection}>
      {children}
    </div>;
};