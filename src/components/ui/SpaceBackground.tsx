import React, { useEffect, useState } from 'react';
interface SpaceBackgroundProps {
  starsCount?: number;
  hasPlanet?: boolean;
  planetColor?: string;
}
const SpaceBackground: React.FC<SpaceBackgroundProps> = ({
  starsCount = 100,
  hasPlanet = true,
  planetColor = 'blue'
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  return <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Planeta estático */}
      {hasPlanet && <div className={`absolute rounded-full blur-sm transition-opacity duration-1000 ${mounted ? 'opacity-20' : 'opacity-0'}`} style={{
      width: '70px',
      height: '70px',
      background: planetColor === 'blue' ? 'radial-gradient(circle, rgba(56,182,255,0.8) 0%, rgba(28,91,175,0.6) 50%, rgba(14,36,89,0.4) 100%)' : planetColor === 'red' ? 'radial-gradient(circle, rgba(255,82,82,0.8) 0%, rgba(175,28,28,0.6) 50%, rgba(89,14,14,0.4) 100%)' : 'radial-gradient(circle, rgba(145,255,82,0.8) 0%, rgba(28,175,87,0.6) 50%, rgba(14,89,54,0.4) 100%)',
      top: '30%',
      right: '20%',
      boxShadow: '0 0 20px rgba(255,255,255,0.2)'
    }} />}
      {/* Nebulosas - mejoradas para compensar la ausencia de estrellas */}
      <div className="absolute opacity-15 blur-3xl" style={{
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(76,0,255,0.4) 0%, rgba(0,0,0,0) 70%)',
      top: '20%',
      right: '10%'
    }} />
      <div className="absolute opacity-15 blur-3xl" style={{
      width: '250px',
      height: '250px',
      background: 'radial-gradient(circle, rgba(0,255,170,0.4) 0%, rgba(0,0,0,0) 70%)',
      bottom: '15%',
      left: '5%'
    }} />
      {/* Nebulosa adicional para compensar la ausencia de estrellas */}
      <div className="absolute opacity-10 blur-3xl" style={{
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, rgba(111,66,193,0.3) 0%, rgba(0,0,0,0) 70%)',
      top: '50%',
      left: '30%'
    }} />
    </div>;
};
export default SpaceBackground;