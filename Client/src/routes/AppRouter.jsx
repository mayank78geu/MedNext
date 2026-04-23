
import { createBrowserRouter } from "react-router-dom";

// Layout
import Layout from "../Layout";
// Pages
import Home from "../Pages/Home";
import Services from "../Pages/Services";
import HospitalSection from "../Pages/HospitalSection";
import About from "../Pages/About";
import ContactUs from "../Pages/ContactUs";
import Login from "../Pages/Login";
import RegisterForm from "../Pages/RegisterForm";
import FindDoctors from "../Pages/FindDoctors";
import ProtectedRoute from "../Pages/ProtectedRoute";
// Doctor Dashboard Pages
import DoctorDashboardLayout from "../Layouts/DoctorDashboardLayout";
import DoctorHome from "../Pages/Doctor/DoctorHome";
import PatientView from "../Pages/Doctor/PatientView";
import Schedule from "../Pages/Doctor/Schedule";
import History from "../Pages/Doctor/History";
import DoctorProfile from "../Pages/Doctor/Profile";
import PatientDashboard from "../Pages/PatientDashboard";
import HospitalDashboard from "../Pages/HospitalDashboard";
import PatientDashboardLayout from "../Layouts/PatientDashboardLayout";
import Prescriptions from "../Pages/Patient/Prescriptions";
import Appointments from "../Pages/Patient/Appointments";
import PatientDetails from "../Pages/Patient/PatientDetails";
import Profile from "../Pages/Patient/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "for-hospital", element: <HospitalSection /> },
      { path: "contact", element: <ContactUs /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <RegisterForm /> },
      { path: "find-doctors", element: <FindDoctors /> },
      { path: "about", element: <About /> },
      { path: "hospital-dashboard", element: <HospitalDashboard /> },
    ],
  },
  {
    path: "/patient-dashboard",
    element: <ProtectedRoute><PatientDashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <PatientDashboard /> },
      { path: "find-doctors", element: <FindDoctors /> },
      { path: "prescriptions", element: <Prescriptions /> },
      { path: "appointments", element: <Appointments /> },
      { path: "details", element: <PatientDetails /> },
      { path: "profile", element: <Profile /> },
      { path: "hospital-dashboard", element: <HospitalDashboard /> },
    ]
  },
  {
    path: "/doctor-dashboard",
    element: <ProtectedRoute><DoctorDashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <DoctorHome /> },
      { path: "patient-view", element: <PatientView /> },
      { path: "schedule", element: <Schedule /> },
      { path: "history", element: <History /> },
      { path: "profile", element: <DoctorProfile /> },
    ]
  }
]);

export default router;
