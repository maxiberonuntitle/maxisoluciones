import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import ServicesSection from './components/home/ServicesSection';
import WhyChooseUsSection from './components/home/WhyChooseUsSection';
import TechnologiesSection from './components/home/TechnologiesSection';
import ProjectsSection from './components/home/ProjectsSection';
import ContactSection from './components/home/ContactSection';
import WebDevelopmentPage from './pages/WebDevelopmentPage';
import DigitalMarketingPage from './pages/DigitalMarketingPage';
import BusinessConsultingPage from './pages/BusinessConsultingPage';
import PapeleriaAbrilPage from './pages/PapeleriaAbrilPage';
import AntonioYadamaPage from './pages/AntonioYadamaPage';
import CafeNuevoJagoPage from './pages/CafeNuevoJagoPage';
import WhatsAppButton from './components/ui/WhatsAppButton';
import ScrollToTopButton from './components/ui/ScrollToTopButton';
import AnimatedParticles from './components/ui/AnimatedParticles';
import CursorFollower from './components/ui/CursorFollower';
import { LanguageProvider } from './components/context/LanguageContext';
import ScrollToTop from './components/utils/ScrollToTop';
const HomePage = () => {
  return <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TechnologiesSection />
      <ProjectsSection />
      <ContactSection />
    </>;
};
export function App() {
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    // Optimize performance by adding will-change properties
    document.querySelectorAll('.transition-all, .animate-pulse, .transform').forEach(el => {
      el.classList.add('will-change-transform');
    });
    document.querySelectorAll('.transition-opacity, .opacity-0, .opacity-100').forEach(el => {
      el.classList.add('will-change-opacity');
    });
    // Detect scroll direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  // Pass scroll direction to the context
  useEffect(() => {
    document.documentElement.setAttribute('data-scroll-direction', scrollDirection);
  }, [scrollDirection]);
  return <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white overflow-hidden">
          <Navbar />
          <main className="flex-grow relative">
            {/* Global animated particles that appear in all sections */}
            <div className="fixed inset-0 pointer-events-none z-0">
              <AnimatedParticles count={40} color="blue" opacity={0.2} speed={0.5} />
            </div>
            {/* Cursor follower dots */}
            <CursorFollower />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/servicios/desarrollo-web" element={<WebDevelopmentPage />} />
              <Route path="/servicios/marketing-digital" element={<DigitalMarketingPage />} />
              <Route path="/servicios/consultoria-comercial" element={<BusinessConsultingPage />} />
              <Route path="/proyectos/papeleria-abril" element={<PapeleriaAbrilPage />} />
              <Route path="/proyectos/antonio-yadama" element={<AntonioYadamaPage />} />
              <Route path="/proyectos/cafe-nuevo-jago" element={<CafeNuevoJagoPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <ScrollToTopButton />
        </div>
      </Router>
    </LanguageProvider>;
}