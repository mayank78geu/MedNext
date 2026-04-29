import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Search, Pill, CalendarCheck, FileText,
  User, LogOut, HeartPulse, ChevronRight, Bell, Activity,
  Shield, Stethoscope
} from "lucide-react";

const navLinks = [
  { name: "Health Hub",       path: "/patient-dashboard",              icon: LayoutDashboard, exact: true },
  { name: "Find Care",        path: "/patient-dashboard/find-doctors", icon: Stethoscope },
  { name: "Medications",      path: "/patient-dashboard/prescriptions",icon: Pill },
  { name: "Appointments",     path: "/patient-dashboard/appointments", icon: CalendarCheck },
  // { name: "Medical Records",  path: "/patient-dashboard/details",      icon: FileText },
  { name: "My Profile",       path: "/patient-dashboard/profile",      icon: User },
];

const PatientDashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [patientName, setPatientName] = useState("Patient");
  const [initials, setInitials] = useState("P");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const name = payload.sub ? payload.sub.split("@")[0] : "Patient";
        const formatted = name.charAt(0).toUpperCase() + name.slice(1);
        setPatientName(formatted);
        setInitials(formatted.slice(0, 2).toUpperCase());
      } catch {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#060d1f] font-sans text-white overflow-hidden">

      {/* ── SIDEBAR ─────────────────────────────────────────── */}
      <aside className="w-72 flex-shrink-0 bg-[#080f24] border-r border-white/5 flex flex-col relative z-30 hidden lg:flex">
        {/* Ambient glow */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand */}
        <div
          className="flex items-center gap-3 p-8 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-900/40 group-hover:scale-110 transition-transform">
            <HeartPulse size={20} className="text-white" />
          </div>
          <div>
            <span className="text-base font-black tracking-tight uppercase leading-none text-white">MedNext</span>
            <div className="text-[9px] font-black text-indigo-400 tracking-[0.25em] uppercase mt-0.5">Patient Portal</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1">
          <div className="mb-4 px-3 text-[9px] font-black text-slate-600 uppercase tracking-[0.25em]">Navigation</div>
          {navLinks.map((link, i) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.exact}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                  isActive
                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-lg shadow-indigo-900/20"
                    : "text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                      isActive ? "bg-indigo-500/20 text-indigo-400" : "text-slate-600 group-hover:text-slate-300"
                    }`}>
                      <link.icon size={16} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest">{link.name}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Patient card */}
        <div className="p-4 m-4 bg-white/3 rounded-2xl border border-white/5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[11px] font-black text-white flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-black text-white truncate">{patientName}</p>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest">Verified Patient</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
            title="Logout"
          >
            <LogOut size={14} />
          </button>
        </div>
      </aside>

      {/* ── MAIN ─────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Top bar */}
        <header className="h-16 bg-[#080f24]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 flex-shrink-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Systems Operational</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all relative">
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-1.5 border border-white/5">
              <Shield size={12} className="text-indigo-400" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">{patientName}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboardLayout;
