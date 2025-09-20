import React, { useEffect, useState, useRef } from 'react';
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}
const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  id
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once visible, no need to observe anymore
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px' // Slightly before the element enters the viewport
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return <section ref={sectionRef} id={id} className={`${className} transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </section>;
};
export default AnimatedSection;