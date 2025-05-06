import { ReactNode, useLayoutEffect } from 'react';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  useLayoutEffect(() => {
    // Для избежания мерцания при загрузке (SSR-friendly)
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  return <>{children}</>;
};