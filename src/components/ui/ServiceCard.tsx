import React, { useState } from 'react';
import { CheckIcon, ArrowRightIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
interface ServiceFeature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  animationClass?: string;
  link?: string;
}
interface ServiceCardProps {
  service: ServiceFeature;
}
const ServiceCard = ({
  service
}: ServiceCardProps) => {
  const {
    t
  } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  return <div className="group bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 relative will-change-transform" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Animated gradient border on hover */}
      <div className={`absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl -z-10 blur-sm`}></div>
      <div className="p-8 relative z-10">
        <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-cyan-900/50 relative">
          {/* Animated pulse effect */}
          <div className={`absolute inset-0 rounded-full bg-cyan-400/20 animate-ping ${isHovered ? 'opacity-100' : 'opacity-0'}`} style={{
          animationDuration: '2s'
        }}></div>
          <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:text-cyan-100">
            {service.icon}
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white transition-colors duration-300 group-hover:text-cyan-300">
          {service.title}
        </h3>
        <p className="text-blue-200 mb-6 transition-all duration-300 group-hover:text-blue-100">
          {service.description}
        </p>
        <ul className="space-y-3">
          {service.features.map((feature, index) => <li key={index} className="flex items-start transition-all duration-300 feature-item" style={{
          transitionDelay: `${index * 50}ms`,
          transform: isHovered ? 'translateX(8px)' : 'translateX(0)'
        }}>
              <div className="mr-2 mt-0.5 flex-shrink-0 transition-all duration-300 group-hover:text-green-400">
                <CheckIcon className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-blue-100 transition-colors duration-300 group-hover:text-white">
                {feature}
              </span>
            </li>)}
        </ul>
      </div>
      <div className="px-8 py-4 bg-gray-800/50 border-t border-gray-700/30 transition-all duration-300 group-hover:bg-gray-800/80 group-hover:border-cyan-800/30 relative overflow-hidden">
        <Link to={service.link || '#contacto'} className="text-cyan-300 font-medium hover:text-cyan-200 transition-all duration-300 flex items-center relative z-10 group-hover:translate-x-2">
          Ver más detalles
          <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        {/* Animated background on hover */}
        <div className={`absolute bottom-0 left-0 h-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 transition-all duration-500 ease-in-out ${isHovered ? 'w-full' : 'w-0'}`}></div>
      </div>
      <style jsx>{`
        .feature-item {
          opacity: 0.9;
          transform: translateX(0);
          transition: all 0.3s ease-out;
        }
        .group:hover .feature-item {
          opacity: 1;
          animation: featureAppear 0.4s forwards;
        }
        @keyframes featureAppear {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(12px);
          }
          100% {
            transform: translateX(8px);
          }
        }
        .feature-item:nth-child(odd) {
          transition-delay: 100ms;
        }
        .feature-item:nth-child(even) {
          transition-delay: 200ms;
        }
      `}</style>
    </div>;
};
export default ServiceCard;