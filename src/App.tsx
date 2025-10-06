import { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import ServicesSection from './components/home/ServicesSection';
import TechnologiesSection from './components/home/TechnologiesSection';
import ProjectsSection from './components/home/ProjectsSection';
import ContactSection from './components/home/ContactSection';
import WhatsAppButton from './components/ui/WhatsAppButton';
import ScrollToTopButton from './components/ui/ScrollToTopButton';
import FixedParticles from './components/ui/FixedParticles';
import CursorFollower from './components/ui/CursorFollower';
import { LanguageProvider } from './components/context/LanguageContext';
import ScrollToTop from './components/utils/ScrollToTop';

// Lazy load heavy components for better performance
const WebDevelopmentPage = lazy(() => import('./pages/WebDevelopmentPage'));
const DigitalMarketingPage = lazy(() => import('./pages/DigitalMarketingPage'));
const BusinessConsultingPage = lazy(() => import('./pages/BusinessConsultingPage'));
const AbrilPapeleriaPage = lazy(() => import('./pages/AbrilPapeleriaPage'));
const AntonioYadamaPage = lazy(() => import('./pages/AntonioYadamaPage'));
const CafeNuevoYagoPage = lazy(() => import('./pages/CafeteriaNuevoYagoPage'));
const LomitoPage = lazy(() => import('./pages/LomitoPage'));
const HomePage = () => {
  return <>
      <HeroSection />
      <ServicesSection />
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
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white overflow-hidden">
          <Navbar />
          <main className="flex-grow relative">
            {/* Global fixed particles that appear in all sections - Optimized for performance */}
            <FixedParticles count={40} color="blue" opacity={0.2} />
            {/* Cursor follower dots */}
            <CursorFollower />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/servicios/desarrollo-web" element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="loading-spinner"></div></div>}>
                  <WebDevelopmentPage />
                </Suspense>
              } />
              <Route path="/servicios/marketing-digital" element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="loading-spinner"></div></div>}>
                  <DigitalMarketingPage />
                </Suspense>
              } />
              <Route path="/servicios/consultoria-comercial" element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="loading-spinner"></div></div>}>
                  <BusinessConsultingPage />
                </Suspense>
              } />
              <Route path="/proyectos/papeleria-abril" element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="loading-spinner"></div></div>}>
                  <AbrilPapeleriaPage />
                </Suspense>
              } />
              <Route path="/proyectos/antonio-yadama" element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="loading-spinner"></div></div>}>
                  <AntonioYadamaPage />
                </Suspense>
              } />
              <Route path="/proyectos/cafe-nuevo-jago" element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="loading-spinner"></div></div>}>
                  <CafeNuevoYagoPage />
                </Suspense>
              } />
              <Route path="/proyectos/lomito" element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="loading-spinner"></div></div>}>
                  <LomitoPage />
                </Suspense>
              } />
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