import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useAuth } from '../contexts/authContext';
import PrivateRoute from '../components/privateRoute';
import Loading from '../components/loading';
import ProtectedLayout from '../layouts/protectedLayout';

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
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas con Layout */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <ProtectedLayout>
                <AddProduct />
              </ProtectedLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
