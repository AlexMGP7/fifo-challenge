import { FC } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedLayout from "../layouts/protectedLayout";
import Tutorial from "../components/tutorial";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import AddProduct from "../pages/addProduct";
import History from "../pages/history";
import CatalogMenFranelasPage from "../pages/hombres-franelas";
import CatalogMenZapatosPage from "../pages/hombres-zapatos";
import CatalogMenPantalonesPage from "../pages/hombres-pantalones";
import { CartProvider } from "../context/cartContext"; // Importar el CartProvider

const AppRouter: FC = () => {
  // Si ya no necesitas el contexto de autenticación, puedes eliminar esta línea.
  // const { loading } = useAuth();

  // Si ya no necesitas el estado de carga, puedes eliminar este bloque.
  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <>
                <Tutorial />
                <Dashboard />
              </>
            </ProtectedLayout>
          }
        />
        <Route
          path="/franelas-hombre"
          element={
            <ProtectedLayout>
              <>
                <Tutorial />
                <CatalogMenFranelasPage />
              </>
            </ProtectedLayout>
          }
        />
        <Route
          path="/zapatos-hombre"
          element={
            <ProtectedLayout>
              <>
                <Tutorial />
                <CatalogMenZapatosPage />
              </>
            </ProtectedLayout>
          }
        />
        <Route
          path="/pantalones-hombre"
          element={
            <ProtectedLayout>
              <>
                  <Tutorial />
                  <CatalogMenPantalonesPage />
              </>
            </ProtectedLayout>
          }
        />
        <Route
          path="/add-product"
          element={
            <ProtectedLayout>
              <>
                <Tutorial />
                <AddProduct />
              </>
            </ProtectedLayout>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedLayout>
              <>
                <Tutorial />
                <History />
              </>
            </ProtectedLayout>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
