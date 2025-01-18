import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Example from './components/navbar';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import PrivateRoute from './components/privateroute';
import { AuthProvider, useAuth } from './contexts/authcontext';
import Loading from './components/loading';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

const MainApp: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />; // Indicador de carga con componente reutilizable
  }

  return (
    <>
      <Example />
      <Router>
        <Routes>
          {/* Ruta pública: Login */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
