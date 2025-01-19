import { FC, ReactNode } from 'react';
import Navbar from '../components/navbar';

interface LayoutProps {
  children: ReactNode;
}

const ProtectedLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default ProtectedLayout;
