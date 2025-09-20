import React, { useEffect, useState, useRef } from 'react';
interface ParticlesProps {
  count?: number;
  color?: string;
  speed?: number;
  opacity?: number;
  size?: {
    min: number;
    max: number;
  };
}
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}
const AnimatedParticles: React.FC<ParticlesProps> = ({
  count = 30,
  color = 'blue',
  speed = 1,
  opacity = 0.3,
  size = {
    min: 2,
    max: 6
  }
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const [particles, setParticles] = useState<Particle[]>([]);
  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newParticles: Particle[] = Array.from({
      length: count
    }, (_, i) => ({
      id: i,
      x: Math.random() * containerRect.width,
      y: Math.random() * containerRect.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * (size.max - size.min) + size.min,
      opacity: Math.random() * opacity
    }));
    setParticles(newParticles);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [count, speed, size.max, size.min, opacity]);
  // Animation loop
  useEffect(() => {
    if (!containerRef.current || particles.length === 0) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const animate = () => {
      setParticles(prevParticles => prevParticles.map(particle => {
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;
        // Boundary check
        if (newX < 0) newX = containerRect.width;
        if (newX > containerRect.width) newX = 0;
        if (newY < 0) newY = containerRect.height;
        if (newY > containerRect.height) newY = 0;
        return {
          ...particle,
          x: newX,
          y: newY
        };
      }));
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles.length]);
  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map(particle => <div key={particle.id} className="absolute rounded-full" style={{
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      backgroundColor: `var(--color-${color}-400, #60a5fa)`,
      opacity: particle.opacity,
      transform: `translate(${particle.x}px, ${particle.y}px)`,
      transition: 'transform 0.1s linear'
    }} />)}
    </div>;
};
export default AnimatedParticles;