import { FC } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "../contexts/authContext";
import PrivateRoute from "../components/privateRoute";
import Loading from "../components/loading";
import ProtectedLayout from "../layouts/protectedLayout";
import Tutorial from "../components/tutorial";

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
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <ProtectedLayout>
                <>
                  <Tutorial />
                  <Dashboard />
                </>
              </ProtectedLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <ProtectedLayout>
                <>
                  <Tutorial />
                  <AddProduct />
                </>
              </ProtectedLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <ProtectedLayout>
                <>
                  <Tutorial />
                  <History />
                </>
              </ProtectedLayout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
