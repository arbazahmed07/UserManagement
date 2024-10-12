import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';

function RootLayout() {
  return (
    <>
      <NavBar />
      <div style={{ minHeight: '80vh', padding: '20px' }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default RootLayout;
