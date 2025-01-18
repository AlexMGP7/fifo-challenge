import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Leer el tema inicial desde localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  // Aplicar el tema al cargar el componente o cuando cambie
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Guardar el tema en localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Alternar entre los temas
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
};

export default useTheme;
