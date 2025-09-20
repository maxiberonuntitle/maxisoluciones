import { useNavigate } from 'react-router-dom';

/**
 * Hook personalizado para manejar la navegación con scroll automático
 */
export const useNavigationWithScroll = () => {
  const navigate = useNavigate();

  /**
   * Navega a la página de inicio y hace scroll automático a una sección específica
   * @param sectionId - ID de la sección a la que hacer scroll (ej: 'contacto', 'servicios')
   * @param delay - Delay en ms antes de hacer scroll (por defecto 100ms)
   */
  const navigateToHomeWithScroll = (sectionId: string, delay: number = 100) => {
    // Si ya estamos en la página de inicio, solo hacer scroll
    if (window.location.pathname === '/') {
      scrollToSection(sectionId, delay);
    } else {
      // Navegar a inicio y luego hacer scroll
      navigate('/');
      // Usar setTimeout para asegurar que la navegación se complete antes del scroll
      setTimeout(() => {
        scrollToSection(sectionId, delay);
      }, 300);
    }
  };

  /**
   * Hace scroll suave a una sección específica
   * @param sectionId - ID de la sección
   * @param delay - Delay en ms antes de hacer scroll
   */
  const scrollToSection = (sectionId: string, delay: number = 100) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, delay);
  };

  return {
    navigateToHomeWithScroll,
    scrollToSection,
  };
};

/**
 * Función utilitaria para crear enlaces que navegan a inicio con scroll
 * @param sectionId - ID de la sección a la que hacer scroll
 * @param className - Clases CSS para el enlace
 * @param children - Contenido del enlace
 */
export const createScrollLink = (
  sectionId: string,
  className: string,
  children: React.ReactNode
) => {
  const { navigateToHomeWithScroll } = useNavigationWithScroll();
  
  return (
    <button
      onClick={() => navigateToHomeWithScroll(sectionId)}
      className={className}
    >
      {children}
    </button>
  );
};
