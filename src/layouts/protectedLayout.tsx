import { FC } from 'react';
import Example from '../components/navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Example /> {/* Navbar común */}
      <main className="mt-16">{children}</main> {/* Contenido dinámico */}
    </div>
  );
};

export default ProtectedLayout;
