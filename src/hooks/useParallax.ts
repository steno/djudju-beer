import { useCallback } from 'react';

export const useParallax = () => {
  const handleScroll = useCallback(() => {
    const elements = document.querySelectorAll('[data-parallax]');
    
    elements.forEach((element) => {
      const speed = Number(element.getAttribute('data-parallax-speed')) || 0.5;
      const rect = element.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const offset = rect.top + scrollPosition;
      const parallaxOffset = (scrollPosition - offset) * speed;

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        (element as HTMLElement).style.transform = `translateY(${parallaxOffset}px)`;
      }
    });
  }, []);

  return { handleScroll };
};