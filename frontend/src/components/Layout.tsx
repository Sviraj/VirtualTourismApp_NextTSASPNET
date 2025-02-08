// components/Layout.tsx
import React, { ReactNode, useRef } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import style from '../styles/Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className={style["container"]}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
