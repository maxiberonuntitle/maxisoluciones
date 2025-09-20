import React, { useEffect, useState, useRef, forwardRef } from 'react';
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}
const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(({
  children,
  className,
  id
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const combinedRef = ref || sectionRef;
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once visible, no need to observe anymore
        if (combinedRef && 'current' in combinedRef && combinedRef.current) {
          observer.unobserve(combinedRef.current);
        }
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px' // Slightly before the element enters the viewport
    });
    if (combinedRef && 'current' in combinedRef && combinedRef.current) {
      observer.observe(combinedRef.current);
    }
    return () => {
      if (combinedRef && 'current' in combinedRef && combinedRef.current) {
        observer.unobserve(combinedRef.current);
      }
    };
  }, []);
  return <section ref={combinedRef} id={id} className={`${className} transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </section>;
});

AnimatedSection.displayName = 'AnimatedSection';
export default AnimatedSection;