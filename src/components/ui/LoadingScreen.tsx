import React, { useEffect, useState } from 'react';
const LoadingScreen = ({
  onLoadingComplete
}: {
  onLoadingComplete: () => void;
}) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);
    // Complete loading after progress reaches 100%
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsComplete(true);
      // Transition out the loading screen
      setTimeout(() => {
        onLoadingComplete();
      }, 1000);
    }, 2500);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onLoadingComplete]);
  return <div className={`fixed inset-0 z-[9999] bg-gray-900 flex flex-col items-center justify-center transition-opacity duration-1000 ${isComplete ? 'opacity-0' : 'opacity-100'}`}>
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => <div key={`h-line-${i}`} className="absolute h-px w-full bg-blue-500" style={{
          top: `${i * 5}%`,
          left: 0,
          opacity: 0.3,
          animation: `loadingPulse 3s infinite alternate ${i * 0.1}s ease-in-out`
        }}></div>)}
          {[...Array(20)].map((_, i) => <div key={`v-line-${i}`} className="absolute w-px h-full bg-blue-500" style={{
          left: `${i * 5}%`,
          top: 0,
          opacity: 0.3,
          animation: `loadingPulse 3s infinite alternate ${i * 0.1}s ease-in-out`
        }}></div>)}
        </div>
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => <div key={`particle-${i}`} className="absolute rounded-full bg-blue-400" style={{
        width: `${Math.random() * 4 + 2}px`,
        height: `${Math.random() * 4 + 2}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.5 + 0.2,
        animation: `float ${Math.random() * 10 + 10}s linear infinite`,
        animationDelay: `${Math.random() * 5}s`
      }}></div>)}
        {/* Animated gradient blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600 opacity-10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-indigo-600 opacity-10 rounded-full filter blur-3xl animate-pulse" style={{
        animationDuration: '7s',
        animationDelay: '1s'
      }}></div>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo or Brand */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-wider flex items-center justify-center">
            Maxi <span className="text-blue-400">Soluciones</span><span className="text-blue-400 ml-1">&gt;</span>
          </h1>
          <div className="w-16 h-0.5 bg-blue-500 mx-auto"></div>
        </div>
        {/* Loading bar */}
        <div className="w-64 md:w-80 h-1.5 bg-gray-800 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300 ease-out" style={{
          width: `${progress}%`
        }}></div>
        </div>
        {/* Loading text with typing effect */}
        <div className="h-6 text-blue-300 text-sm">
          {progress < 100 ? <div className="flex items-center">
              <span>Cargando</span>
              <span className="ml-1 flex space-x-1">
                <span className="animate-bounce" style={{
              animationDelay: '0ms'
            }}>
                  .
                </span>
                <span className="animate-bounce" style={{
              animationDelay: '200ms'
            }}>
                  .
                </span>
                <span className="animate-bounce" style={{
              animationDelay: '400ms'
            }}>
                  .
                </span>
              </span>
              <span className="ml-2">{Math.round(progress)}%</span>
            </div> : <span className="text-green-400">¡Listo!</span>}
        </div>
      </div>
      {/* Custom animations */}
      <style jsx>{`
        @keyframes loadingPulse {
          0% {
            opacity: 0.1;
          }
          100% {
            opacity: 0.4;
          }
        }
      `}</style>
    </div>;
};
export default LoadingScreen;