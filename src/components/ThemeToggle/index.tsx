import { useTheme } from '@/hooks/useTheme';
import './index.scss';

export const ThemeToggle = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <button className='toggle-theme-btn' onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};