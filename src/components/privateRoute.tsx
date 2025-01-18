import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  return user ? children : <Navigate to="/login" />; // Redirige a /login si no hay usuario
};

export default PrivateRoute;
