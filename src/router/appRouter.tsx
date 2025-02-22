import { FC } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedLayout from "../layouts/protectedLayout";
import Dashboard from "../pages/dashboard";
import CatalogMenFranelasPage from "../pages/hombres-franelas";
import CatalogMenZapatosPage from "../pages/hombres-zapatos";
import CatalogMenPantalonesPage from "../pages/hombres-pantalones";
import CatalogWomenFranelasPage from "../pages/mujeres-franelas";
import CatalogWomenZapatosPage from "../pages/mujeres-zapatos";
import CatalogWomenPantalonesPage from "../pages/mujeres-pantalones";

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
        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <>
                <Dashboard />
              </>
            </ProtectedLayout>
          }
        />
        <Route
          path="/pantalones-mujeres"
          element={
            <ProtectedLayout>
              <>
                <CatalogWomenPantalonesPage />
              </>
            </ProtectedLayout>
          }
        />
        <Route
          path="/zapatos-mujeres"
          element={
            <ProtectedLayout>
              <>
                <CatalogWomenZapatosPage />
              </>
            </ProtectedLayout>
          }
        />
        <Route
          path="/franelas-mujeres"
          element={
            <ProtectedLayout>
              <>
                <CatalogWomenFranelasPage />
              </>
            </ProtectedLayout>
          }
        />
        <Route
          path="/franelas-hombre"
          element={
            <ProtectedLayout>
              <>
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
                  <CatalogMenPantalonesPage />
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
