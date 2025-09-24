import React from 'react';

interface FixedParticlesProps {
  count?: number;
  color?: string;
  opacity?: number;
  size?: {
    min: number;
    max: number;
  };
}

const FixedParticles: React.FC<FixedParticlesProps> = ({
  count = 30,
  color = 'blue',
  opacity = 0.3,
  size = {
    min: 2,
    max: 6
  }
}) => {
  // Generar partículas estáticas con posiciones y animaciones CSS
  const particles = Array.from({ length: count }, (_, i) => {
    const particleSize = Math.random() * (size.max - size.min) + size.min;
    const animationDelay = Math.random() * 20; // Delay aleatorio hasta 20s
    const animationDuration = 15 + Math.random() * 10; // Duración entre 15-25s
    const startX = Math.random() * 100; // Porcentaje de posición X
    const startY = Math.random() * 100; // Porcentaje de posición Y
    
    return {
      id: i,
      size: particleSize,
      delay: animationDelay,
      duration: animationDuration,
      startX,
      startY,
      opacity: Math.random() * opacity
    };
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full floating-particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: `var(--color-${color}-400, #60a5fa)`,
            opacity: particle.opacity,
            left: `${particle.startX}%`,
            top: `${particle.startY}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            willChange: 'transform',
            transform: 'translateZ(0)', // Hardware acceleration
          }}
        />
      ))}
    </div>
  );
};

export default FixedParticles;
