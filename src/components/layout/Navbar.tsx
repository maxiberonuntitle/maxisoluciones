import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation, Link } from 'react-router-dom';
import type { Locale } from '../utils/translations';
const Navbar = () => {
  const {
    language,
    setLanguage,
    t
  } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('inicio');
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isPapeleriaPage = location.pathname === '/proyectos/papeleria-abril';
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Detect scroll direction
      if (currentScrollY < lastScrollY) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }
      setLastScrollY(currentScrollY);
      // Handle navbar background
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      // Only update active section based on scroll if we're on the home page
      if (isHomePage) {
        // Update active section based on scroll position
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id') || '';
          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            setActiveLink(sectionId);
          }
        });
      } else if (isPapeleriaPage) {
        // On Papeleria page, set active link to proyectos
        setActiveLink('proyectos');
      } else {
        // On service pages, set active link based on the current path
        const currentPath = location.pathname;
        if (currentPath.includes('desarrollo-web')) {
          setActiveLink('servicios');
        } else if (currentPath.includes('marketing-digital')) {
          setActiveLink('servicios');
        } else if (currentPath.includes('consultoria-comercial')) {
          setActiveLink('servicios');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHomePage, location.pathname, isPapeleriaPage]);
  // Set active link when location changes
  useEffect(() => {
    if (isHomePage) {
      setActiveLink('inicio');
    } else if (isPapeleriaPage) {
      setActiveLink('proyectos');
    } else {
      // On service pages, set active link to servicios
      setActiveLink('servicios');
    }
  }, [location.pathname, isHomePage, isPapeleriaPage]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close language menu if open
    if (isLanguageMenuOpen) setIsLanguageMenuOpen(false);
  };
  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };
  const changeLanguage = (lang: Locale) => {
    setLanguage(lang);
    setIsLanguageMenuOpen(false);
  };
  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      // If on home page, scroll to section
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    } else {
      // If on another page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  const navItems = [{
    id: 'inicio',
    translationKey: 'inicio' as const
  }, {
    id: 'servicios',
    translationKey: 'servicios' as const
  }, {
    id: 'por-qué-elegirnos',
    translationKey: 'por_que_elegirnos' as const
  }, {
    id: 'tecnologias',
    translationKey: 'tecnologias' as const
  }, {
    id: 'proyectos',
    translationKey: 'proyectos' as const
  }, {
    id: 'contacto',
    translationKey: 'contacto' as const
  }];
  const languages = [{
    code: 'es' as Locale,
    name: 'Español'
  }, {
    code: 'en' as Locale,
    name: 'English'
  }, {
    code: 'fr' as Locale,
    name: 'Français'
  }, {
    code: 'ca' as Locale,
    name: 'Català'
  }];
  const getLanguageLabel = () => {
    const lang = languages.find(l => l.code === language);
    return lang ? lang.name : 'Español';
  };
  return <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg py-3' : 'bg-transparent py-5'} ${isScrollingUp && isScrolled ? 'translate-y-0' : isScrolled && !isScrollingUp ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <span className={`text-xl font-bold transition-colors duration-300 ${isScrolled ? 'text-blue-600' : 'text-white'}`}>
              Maxi <span className="text-blue-500">Soluciones</span>
              <span className="text-blue-500 relative">
                <span className="text-blue-500">&gt;</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </span>
            </span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-8">
              {navItems.map(item => <a key={item.id} href={`#${item.id}`} onClick={e => {
              e.preventDefault();
              scrollToSection(item.id);
            }} className={`font-medium transition-all duration-300 relative group ${isScrolled ? activeLink === item.id ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500' : activeLink === item.id ? 'text-blue-300' : 'text-white hover:text-blue-300'}`}>
                  {t(item.translationKey)}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300 ease-in-out ${activeLink === item.id ? 'w-full' : 'w-0'}`}></span>
                </a>)}
            </nav>
            {/* Language Selector - Desktop */}
            <div className="relative">
              <button onClick={toggleLanguageMenu} className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition-colors ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {getLanguageLabel()}
                </span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${isLanguageMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Language Dropdown */}
              {isLanguageMenuOpen && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {languages.map(lang => <button key={lang.code} onClick={() => changeLanguage(lang.code)} className={`block w-full text-left px-4 py-2 text-sm ${language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                      {lang.name}
                    </button>)}
                </div>}
            </div>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Language Selector - Mobile */}
            <button onClick={toggleLanguageMenu} className={`flex items-center p-1.5 rounded-full ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
              <Globe className="w-5 h-5" />
            </button>
            <button className="group" onClick={toggleMenu} aria-label="Toggle menu">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span className={`absolute block w-6 h-0.5 transition-all duration-300 ease-in-out transform ${isScrolled ? 'bg-gray-700' : 'bg-white'} ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
                <span className={`absolute block w-6 h-0.5 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-gray-700' : 'bg-white'} ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute block w-6 h-0.5 transition-all duration-300 ease-in-out transform ${isScrolled ? 'bg-gray-700' : 'bg-white'} ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
              </div>
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg">
            <nav className="flex flex-col space-y-3 px-4 py-4">
              {navItems.map(item => <a key={item.id} href={`#${item.id}`} onClick={e => {
              e.preventDefault();
              scrollToSection(item.id);
            }} className={`font-medium py-2 px-3 rounded-md transition-all duration-300 ${activeLink === item.id ? 'text-white bg-blue-500' : 'text-gray-700 hover:text-blue-500 hover:bg-blue-50'}`}>
                  {t(item.translationKey)}
                </a>)}
              {/* Language options in mobile menu */}
              <div className="border-t border-gray-100 pt-2 mt-2">
                <p className="text-sm text-gray-500 px-3 py-1">Idioma</p>
                {languages.map(lang => <button key={lang.code} onClick={() => changeLanguage(lang.code)} className={`w-full text-left py-2 px-3 rounded-md transition-all duration-300 ${language === lang.code ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-500 hover:bg-blue-50'}`}>
                    {lang.name}
                  </button>)}
              </div>
            </nav>
          </div>
        </div>
        {/* Mobile Language Dropdown */}
        {isLanguageMenuOpen && !isMenuOpen && <div className="md:hidden absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
            {languages.map(lang => <button key={lang.code} onClick={() => changeLanguage(lang.code)} className={`block w-full text-left px-4 py-2 text-sm ${language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                {lang.name}
              </button>)}
          </div>}
      </div>
    </header>;
};
export default Navbar;