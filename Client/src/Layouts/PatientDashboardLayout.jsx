import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Search, 
  Pill, 
  CalendarCheck, 
  FileText, 
  User, 
  LogOut,
  HeartPulse
} from "lucide-react";

const PatientDashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/");
  };

  const navLinks = [
    { name: "Dashboard", path: "/patient-dashboard", icon: LayoutDashboard, exact: true },
    { name: "Find Doctors", path: "/patient-dashboard/find-doctors", icon: Search },
    { name: "Prescriptions", path: "/patient-dashboard/prescriptions", icon: Pill },
    { name: "Appointments", path: "/patient-dashboard/appointments", icon: CalendarCheck },
    { name: "Patient Details", path: "/patient-dashboard/details", icon: FileText },
    { name: "Profile", path: "/patient-dashboard/profile", icon: User },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shadow-[2px_0_10px_rgba(0,0,0,0.02)] z-10 hidden md:flex">
        
        <div>
          {/* Logo Brand */}
          <div className="h-20 flex items-center px-8 border-b border-slate-100 mb-6 cursor-pointer" onClick={() => navigate("/")}>
            <HeartPulse className="h-8 w-8 text-blue-600 mr-2" />
            <span className="font-bold text-xl text-slate-900">MedNext</span>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`
                }
              >
                <link.icon size={20} />
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* BOTTOM: LOGOUT */}
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-all duration-300"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER (Fallback) */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-slate-200 flex items-center justify-between p-4 z-50">
         <div className="flex items-center">
            <HeartPulse className="h-6 w-6 text-blue-600 mr-2" />
            <span className="font-bold text-lg text-slate-900">MedNext</span>
         </div>
         <button onClick={handleLogout} className="text-red-600 font-semibold text-sm">Logout</button>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto mt-16 md:mt-0 relative">
        <div className="animate-fade-in-up">
           <Outlet />
        </div>
      </main>

    </div>
  );
};

export default PatientDashboardLayout;
