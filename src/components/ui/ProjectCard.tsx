import React, { useState, useRef } from 'react';
import { RocketIcon, ArrowRightIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  showCaseStudy?: boolean;
}
interface ProjectCardProps {
  project: Project;
}
const ProjectCard = ({
  project
}: ProjectCardProps) => {
  const {
    t
  } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const cardRect = card.getBoundingClientRect();
    // Calculate mouse position relative to card center
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;
    // Calculate rotation values (limited to small angles)
    const rotateY = mouseX * 0.01; // Max ~10 degrees
    const rotateX = -mouseY * 0.01; // Max ~10 degrees
    // Apply the transform with smoother transition
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  // Reset transform on mouse leave
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    setIsHovered(false);
  };
  return <>
      <Link to={project.link || '#proyectos'} className="block">
        <div ref={cardRef} className="overflow-hidden rounded-xl shadow-lg group cursor-pointer transition-all duration-500 ease-out transform-gpu bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/30 will-change-transform relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
        {/* Card image with enhanced effects */}
        <div className="relative h-64 overflow-hidden">
          {/* Loading placeholder to prevent CLS */}
          <div className="absolute inset-0 bg-gray-800 loading-placeholder" style={{ aspectRatio: '400/256' }}></div>
          {/* Animated gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-cyan-600/20 via-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10`}></div>
          {/* Image with enhanced animation and fallback */}
          <div className="w-full h-full bg-gray-800">
            <img 
              src={project.image} 
              alt={project.title} 
              className={`w-full h-full object-cover transition-all duration-700 ease-out ${isHovered ? 'scale-110 filter brightness-90' : 'scale-100'}`} 
              width="400"
              height="256"
              loading="lazy"
              style={{ aspectRatio: '400/256' }}
              onError={e => {
            // Fallback for image loading errors
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000';
          }} />
          </div>
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent transition-all duration-500 ease-in-out ${isHovered ? 'opacity-80' : 'opacity-60'}`}></div>
          {/* Category badge with enhanced animation */}
          <span className={`absolute top-4 left-4 text-xs font-semibold bg-cyan-600 text-white py-1.5 px-4 rounded-full shadow-lg transition-all duration-500 ease-out z-20 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            {project.category}
          </span>
        </div>
        {/* Card content with improved styling */}
        <div className="p-6 relative z-10">
          <h3 className={`text-xl font-bold mb-2 transition-all duration-300 ${isHovered ? 'text-cyan-400' : 'text-white'}`}>
            {project.title}
          </h3>
          <p className={`text-sm mb-3 transition-all duration-300 ${isHovered ? 'text-cyan-300' : 'text-gray-400'}`}>
            {project.location}
          </p>
          <p className={`transition-all duration-300 line-clamp-3 ${isHovered ? 'text-blue-100' : 'text-gray-300'}`}>
            {project.description}
          </p>
          {/* Removed visible link - card is now completely clickeable */}
        </div>
        {/* New overlay content with space theme - WITHOUT the duplicate button */}
        <div className={`absolute inset-0 bg-gradient-to-br from-gray-900/95 to-indigo-900/95 flex items-center justify-center p-6 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="text-center text-white">
            {/* Space-themed decorative elements with retro-futuristic style */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              {[...Array(20)].map((_, i) => <div key={`star-${i}`} className="absolute rounded-full bg-cyan-400" style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              boxShadow: '0 0 5px 2px rgba(34, 211, 238, 0.4)',
              animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
              animationDelay: `${Math.random() * 2}s`
            }} />)}
              {/* Retro grid lines */}
              <div className="absolute inset-0 opacity-30">
                <div className="h-full w-full" style={{
                backgroundImage: 'linear-gradient(0deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                backgroundPosition: 'center center',
                transform: 'perspective(500px) rotateX(60deg)'
              }}></div>
              </div>
            </div>
            {/* Rocket icon with animation - keep this visual element */}
            <div className={`mb-5 transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{
            transitionDelay: isHovered ? '100ms' : '0ms'
          }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-600/30 mb-4">
                <RocketIcon className="w-8 h-8 text-cyan-300" style={{
                transform: 'rotate(45deg)',
                animation: isHovered ? 'rocketHover 2s infinite alternate' : 'none'
              }} />
              </div>
            </div>
            {/* Space-themed decorative element instead of button */}
            <div className={`w-24 h-1 bg-cyan-400/50 mx-auto rounded-full transition-all duration-500 ${isHovered ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{
            transitionDelay: isHovered ? '200ms' : '0ms'
          }}></div>
          </div>
        </div>
        {/* Animated corner accents */}
        <div className={`absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
        <div className={`absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-cyan-400 rounded-br-lg transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
      </div>
      {/* Add animation for rocket hover effect */}
      <style>{`
        @keyframes twinkle {
          0% {
            opacity: 0.2;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes rocketHover {
          0% {
            transform: rotate(45deg) translateY(0);
          }
          50% {
            transform: rotate(45deg) translateY(-4px);
          }
          100% {
            transform: rotate(45deg) translateY(0);
          }
        }
      `}</style>
      </Link>
    </>;
};
export default ProjectCard;