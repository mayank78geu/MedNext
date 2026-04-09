
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
import RegisterForm from "../Pages/RegisterForm";
import FindDoctors from "../Pages/FindDoctors";
import ProtectedRoute from "../Pages/ProtectedRoute";
import DoctorDashboard from "../Pages/DoctorDashboard";

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
      { path: "register", element: <RegisterForm /> },
      { path: "find-doctors", element: <FindDoctors /> },
      { path: "about", element: <About /> },
      {
        path: "doctor-dashboard",
        element: (
          <ProtectedRoute>
            <DoctorDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
