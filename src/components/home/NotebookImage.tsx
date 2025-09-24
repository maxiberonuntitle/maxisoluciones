import React, { useEffect, useState, useRef, useCallback } from 'react';

interface NotebookImageProps {
  scrollY: number;
}

const NotebookImage: React.FC<NotebookImageProps> = ({
  scrollY
}) => {
  const [rotation, setRotation] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  
  // Throttled rotation update for better performance
  const updateRotation = useCallback(() => {
    const now = performance.now();
    // Throttle updates to 60fps max (16.67ms between frames)
    if (now - lastUpdateRef.current < 16.67) {
      return;
    }
    
    // Calculate rotation with reduced sensitivity for smoother performance
    const newRotation = scrollY / 20; // Reduced from /15 to /20 for less aggressive rotation
    
    // Only update if the change is significant enough to avoid micro-updates
    if (Math.abs(newRotation - rotation) > 0.1) {
      setRotation(newRotation);
      lastUpdateRef.current = now;
    }
  }, [scrollY, rotation]);

  // Optimized rotation update with requestAnimationFrame
  useEffect(() => {
    const animate = () => {
      updateRotation();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateRotation]);
  return <div ref={imageRef} className="relative w-full h-full min-h-[300px] flex items-center justify-center">
      {/* Loading placeholder to prevent CLS */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 rounded-lg loading-placeholder" style={{
          aspectRatio: '1170/780',
          maxWidth: '600px',
          width: '100%'
        }}></div>
      )}
      <div className={`relative w-full max-w-[600px] transition-all duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{
      transform: `rotate(${rotation}deg) translateZ(0)`, // Hardware acceleration
      transition: 'transform 0.1s ease-out', // Faster transition for better performance
      perspective: '1000px',
      willChange: 'transform', // Optimize for transform changes
      backfaceVisibility: 'hidden' // Prevent flickering
    }}>
        {/* Generic laptop image without Apple logo or any visible branding */}
        <picture>
          <source 
            srcSet="https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80&fm=webp" 
            type="image/webp" 
          />
          <img 
            src="https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Generic laptop with dark tech aesthetic" 
            className="w-full h-auto rounded-lg shadow-2xl" 
            width="1170"
            height="780"
            loading="eager"
            decoding="async"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.3)) brightness(0.8) contrast(1.1)', // Reduced filter complexity
              transform: 'translateZ(0)', // Hardware acceleration
              willChange: 'transform', // Optimize for transforms
              aspectRatio: '1170/780' // Prevent layout shift
            }} 
            onLoad={() => setIsLoaded(true)} 
            onError={() => {
        // Fallback image if the main one fails to load - also without branding
        const imgElement = imageRef.current?.querySelector('img');
        if (imgElement) {
          imgElement.src = 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
        }
        setIsLoaded(true);
      }} />
        </picture>
        {/* Simplified tech overlay effects for better performance */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-indigo-800/5 rounded-lg mix-blend-overlay"></div>
        
        {/* Simplified glowing elements - reduced complexity */}
        <div className="absolute bottom-[20%] inset-x-[10%] h-[8%] bg-cyan-500/20 blur-sm rounded-lg"></div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-400/20 rounded-full blur-sm"></div>
        
        {/* Simplified grid overlay - static for better performance */}
        <div className="absolute inset-0 opacity-10 rounded-lg overflow-hidden">
          <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(0deg, rgba(34, 211, 238, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.15) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          backgroundPosition: 'center center'
        }}></div>
        </div>
      </div>
    </div>;
};
export default NotebookImage;