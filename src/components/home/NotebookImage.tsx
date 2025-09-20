import React, { useEffect, useState, useRef } from 'react';
interface NotebookImageProps {
  scrollY: number;
}
const NotebookImage: React.FC<NotebookImageProps> = ({
  scrollY
}) => {
  const [rotation, setRotation] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  // Update rotation based on scroll position
  useEffect(() => {
    // Calculate rotation based on scroll position
    // The division factor controls how fast it rotates
    setRotation(scrollY / 15);
  }, [scrollY]);
  return <div ref={imageRef} className="relative w-full h-full min-h-[300px] flex items-center justify-center">
      <div className={`relative w-full max-w-[600px] transition-all duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{
      transform: `rotate(${rotation}deg)`,
      transition: 'transform 0.3s ease-out',
      perspective: '1000px'
    }}>
        {/* Generic laptop image without Apple logo or any visible branding */}
        <img src="https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Generic laptop with dark tech aesthetic" className="w-full h-auto rounded-lg shadow-2xl" style={{
        filter: 'drop-shadow(0 0 25px rgba(59, 130, 246, 0.5)) brightness(0.75) contrast(1.2)'
      }} onLoad={() => setIsLoaded(true)} onError={() => {
        // Fallback image if the main one fails to load - also without branding
        const imgElement = imageRef.current?.querySelector('img');
        if (imgElement) {
          imgElement.src = 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
        }
        setIsLoaded(true);
      }} />
        {/* Retro tech overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-800/10 rounded-lg mix-blend-overlay"></div>
        {/* VHS tracking lines effect */}
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <div className="w-full h-full opacity-20 mix-blend-overlay vhs-effect"></div>
        </div>
        {/* Cassette-inspired elements */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-overlay">
          <div className="relative w-1/2 h-1/3 border-2 border-cyan-400/50 rounded-md">
            <div className="absolute inset-x-0 top-1/3 h-1/3 border-y border-cyan-400/50"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 rounded-full border-2 border-cyan-400/70"></div>
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-1/6 h-1/6 rounded-full border-2 border-cyan-400/70"></div>
            <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-1/6 h-1/6 rounded-full border-2 border-cyan-400/70"></div>
          </div>
        </div>
        {/* Additional overlay to obscure any potential branding */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
        {/* Glowing elements */}
        <div className="absolute bottom-[20%] inset-x-[10%] h-[10%] bg-cyan-500/30 blur-md rounded-lg animate-pulse"></div>
        <div className="absolute -top-3 -right-3 w-12 h-12 bg-cyan-400/30 rounded-full blur-md animate-pulse"></div>
        <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-indigo-400/30 rounded-full blur-md animate-pulse" style={{
        animationDelay: '1s'
      }}></div>
        {/* Retro grid overlay */}
        <div className="absolute inset-0 opacity-20 rounded-lg overflow-hidden">
          <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(0deg, rgba(34, 211, 238, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.2) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          backgroundPosition: 'center center'
        }}></div>
        </div>
        {/* Digital code overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 overflow-hidden">
          <div className="text-[8px] text-cyan-400 font-mono tracking-tighter leading-tight">
            {Array(20).fill(0).map((_, i) => <div key={i} className="whitespace-nowrap">
                  {Array(30).fill(0).map((_, j) => <span key={j}>{Math.random() > 0.5 ? '1' : '0'}</span>)}
                </div>)}
          </div>
        </div>
      </div>
      {/* Custom CSS for VHS effect */}
      <style>{`
        .vhs-effect {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          animation: vhs-scan 8s linear infinite;
        }
        @keyframes vhs-scan {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }
      `}</style>
    </div>;
};
export default NotebookImage;