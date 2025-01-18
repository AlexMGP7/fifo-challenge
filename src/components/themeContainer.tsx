import {FC, ReactNode} from 'react';
import useTheme from '../hooks/useTheme';

const LocalThemeContainer: FC<{ children: ReactNode }> = ({ children }) => {
    const { theme, toggleTheme } = useTheme();
  
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath === '/login';
  
    return (
      <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        {isLoginPage && (
          <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 px-4 py-2 bg-indigo-600 text-white rounded shadow-md hover:bg-indigo-500"
          >
            {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        )}
        {children}
      </div>
    );
  };
  

export default LocalThemeContainer;
