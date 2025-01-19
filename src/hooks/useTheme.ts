import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Lee el tema inicial desde localStorage o establece 'dark' como predeterminado
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? (savedTheme as 'light' | 'dark') : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme, setTheme };
};

export default useTheme;
