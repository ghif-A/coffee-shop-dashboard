import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
