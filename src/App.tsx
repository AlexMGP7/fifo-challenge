import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Example from './components/navbar';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import PrivateRoute from './components/privateroute';
import { AuthProvider, useAuth } from './contexts/authcontext';
import Loading from './components/loading';
import ThemeContainer from './components/ThemeContainer';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeContainer>
        <MainApp />
      </ThemeContainer>
    </AuthProvider>
  );
};

const MainApp: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        {/* Ruta pública: Login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <>
                <Example />
                <div>
                  <h1 className="text-2xl">Modo Oscuro con Tailwind</h1>
                  <p>¡Todo el texto cambia con el modo oscuro gracias al contenedor padre!</p>
                </div>
                <Dashboard />
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
