import { FC } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "../contexts/authContext";
import PrivateRoute from "../components/privateRoute";
import Loading from "../components/loading";
import ProtectedLayout from "../layouts/protectedLayout";

import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import AddProduct from "../pages/addProduct";
import History from "../pages/history";

const AppRouter: FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        {/* Redirección desde la raíz */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

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
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <ProtectedLayout>
                <History />
              </ProtectedLayout>
            </PrivateRoute>
          }
        />

        {/* Ruta por defecto en caso de 404 */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
