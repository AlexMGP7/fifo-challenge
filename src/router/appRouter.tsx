import {FC} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useAuth } from '../contexts/authContext';
import PrivateRoute from '../components/privateRoute';
import Example from '../components/navbar';
import Loading from '../components/loading';

import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import AddProduct from '../pages/addProduct';

const AppRouter: FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        
        {/* 
          Rutas protegidas: envueltas en <PrivateRoute> 
          para requerir autenticación 
        */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {/* 
                Navbar + Contenido 
                Puedes renderizar el Navbar aquí dentro 
                o en cada página que lo requiera 
              */}
              <>
                <Example />
                <Dashboard />
              </>
            </PrivateRoute>
          }
        />

        {/* Ejemplo de otras rutas protegidas */}
         
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <>
                <Example />
                <AddProduct />
              </>
            </PrivateRoute>
          }
        />
        {/*
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <>
                <Example />
                <History />
              </>
            </PrivateRoute>
          }
        />
        */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
