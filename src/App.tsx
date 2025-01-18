import {FC} from 'react';
import { AuthProvider } from './contexts/authContext';
import ThemeContainer from './components/themeContainer';
import AppRouter from './router/appRouter';

const App: FC = () => {
  return (
    <AuthProvider>
      <ThemeContainer>
        <AppRouter />
      </ThemeContainer>
    </AuthProvider>
  );
};

export default App;
