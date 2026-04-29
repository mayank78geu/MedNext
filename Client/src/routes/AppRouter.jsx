
import { createBrowserRouter } from "react-router-dom";

// Layouts
import Layout from "../Layout";
import DoctorDashboardLayout from "../Layouts/DoctorDashboardLayout";
import PatientDashboardLayout from "../Layouts/PatientDashboardLayout";
import HospitalDashboardLayout from "../Layouts/HospitalDashboardLayout";
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout";


// Core Pages
import Home from "../Pages/Home";
import Services from "../Pages/Services";
import HospitalSection from "../Pages/Hospital/HospitalSection";
import About from "../Pages/About";
import ContactUs from "../Pages/ContactUs";
import Login from "../Pages/Login";
import RegisterForm from "../Pages/RegisterForm";
import FindDoctors from "../Pages/FindDoctors";
import ProtectedRoute from "../Pages/ProtectedRoute";

// Doctor Dashboard Pages
import DoctorHome from "../Pages/Doctor/DoctorHome";
import PatientView from "../Pages/Doctor/PatientView";
import Schedule from "../Pages/Doctor/Schedule";
import History from "../Pages/Doctor/History";
import DoctorProfile from "../Pages/Doctor/Profile";

// Patient Dashboard Pages
import PatientDashboard from "../Pages/Patient/PatientDashboard";
import Prescriptions from "../Pages/Patient/Prescriptions";
import Appointments from "../Pages/Patient/Appointments";
// import PatientDetails from "../Pages/Patient/PatientDetails";
import Profile from "../Pages/Patient/Profile";

// Hospital Dashboard Pages
import HospitalDashboard from "../Pages/Hospital/HospitalDashboard";
import HospitalAppointments from "../Pages/Hospital/Appointments";
import HospitalPatients from "../Pages/Hospital/Patients";
import HospitalProfile from "../Pages/Hospital/Profile";
import HospitalDoctors from "../Pages/Hospital/Doctors";
import HospitalStaff from "../Pages/Hospital/Staff";
import HospitalReports from "../Pages/Hospital/Reports";

// Admin Pages
import AdminOverview from "../Pages/Admin/AdminOverview";
import AdminHospitals from "../Pages/Admin/AdminHospitals";
import AdminDoctors from "../Pages/Admin/AdminDoctors";
import AdminPatients from "../Pages/Admin/AdminPatients";
import AdminAppointments from "../Pages/Admin/AdminAppointments";
import AdminUsers from "../Pages/Admin/AdminUsers";

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
      // { path: "details", element: <PatientDetails /> },
      { path: "profile", element: <Profile /> },
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
  },
  {
    path: "/hospital-dashboard",
    element: <ProtectedRoute><HospitalDashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <HospitalDashboard /> },
      { path: "appointments", element: <HospitalAppointments /> },
      { path: "patients", element: <HospitalPatients /> },
      { path: "doctors", element: <HospitalDoctors /> },
      { path: "staff", element: <HospitalStaff /> },
      { path: "reports", element: <HospitalReports /> },
      { path: "profile", element: <HospitalProfile /> },
    ]
  },
  {
    path: "/admin",
    element: <AdminDashboardLayout />,
    children: [
      { index: true, element: <AdminOverview /> },
      { path: "hospitals", element: <AdminHospitals /> },
      { path: "doctors", element: <AdminDoctors /> },
      { path: "patients", element: <AdminPatients /> },
      { path: "appointments", element: <AdminAppointments /> },
      { path: "users", element: <AdminUsers /> },
    ]
  }
]);

export default router;
