import React from "react";
import Nav from "./Component/Navbar/Nav";
import Footer from "./Component/Footer/Footer";
import { Outlet } from 'react-router-dom'


const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
