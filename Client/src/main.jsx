import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Pages/Home.jsx";
import HospitalSection from "./Pages/HospitalSection.jsx";
import Services from "./Pages/Services.jsx";
import ContectUs from "./Pages/ContectUs.jsx";
import Login from "./Pages/Login.jsx";
import PatientRegistrationForm from "./Pages/PatientRegistrationForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "for-hospital",
        element: <HospitalSection />,
      },
      {
        path: "contact",
        element: <ContectUs />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <PatientRegistrationForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
