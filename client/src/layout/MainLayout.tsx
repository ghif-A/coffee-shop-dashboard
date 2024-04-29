import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '4rem' }}> 
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;