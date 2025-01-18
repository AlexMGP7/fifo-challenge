import React from 'react';
import { AuthProvider } from './contexts/authContext';
import ThemeContainer from './components/themeContainer';
import AppRouter from './router/appRouter';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeContainer>
        <AppRouter />
      </ThemeContainer>
    </AuthProvider>
  );
};

export default App;
