
import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Layout
import Layout from "../Layout";
// Pages
import Home from "../Pages/Home";
import Services from "../Pages/Services";
import HospitalSection from "../Pages/HospitalSection";
import About from "../Pages/About";
import ContectUs from "../Pages/ContectUs";
import Login from "../Pages/Login";
import PatientRegistrationForm from "../Pages/PatientRegistrationForm";
import FindDoctors from "../Pages/FindDoctors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "for-hospital", element: <HospitalSection /> },
      { path: "contact", element: <ContectUs /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <PatientRegistrationForm /> },
      { path: "find-doctors", element: <FindDoctors /> }, 
      { path: "about", element: <About /> },
    ],
  },
]);

export default router;