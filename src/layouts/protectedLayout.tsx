import { FC, ReactNode } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

interface LayoutProps {
  children: ReactNode;
}

const ProtectedLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
