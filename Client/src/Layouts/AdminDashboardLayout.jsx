import React from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Stethoscope,
  Users,
  CalendarCheck,
  UserCircle,
  LogOut,
  Bell,
  ShieldCheck,
  ChevronRight,
  Settings,
} from "lucide-react";

const AdminDashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navLinks = [
    { name: "Overview", path: "/admin", icon: LayoutDashboard, exact: true },
    { name: "Hospitals", path: "/admin/hospitals", icon: Building2 },
    { name: "Doctors", path: "/admin/doctors", icon: Stethoscope },
    { name: "Patients", path: "/admin/patients", icon: Users },
    { name: "Appointments", path: "/admin/appointments", icon: CalendarCheck },
    { name: "All Users", path: "/admin/users", icon: UserCircle },
  ];

  return (
    <div className="flex h-screen bg-[#050d1a] font-sans text-white overflow-hidden">
      {/* ── SIDEBAR ────────────────────────────────────────────────── */}
      <aside className="w-72 bg-[#080f1e] border-r border-white/5 flex flex-col p-6 z-30 flex-shrink-0">
        {/* Brand */}
        <div
          className="flex items-center gap-3 mb-10 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-600/30">
            <ShieldCheck size={22} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tight leading-none uppercase">
              MedNext
            </span>
            <span className="text-[9px] font-black text-violet-400 tracking-[0.35em] uppercase">
              Super Admin
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          <div className="mb-3 px-3 text-[9px] font-black text-slate-600 uppercase tracking-[0.25em]">
            Control Panel
          </div>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.exact}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group border ${
                  isActive
                    ? "bg-violet-600/20 text-violet-300 border-violet-500/30 shadow-lg shadow-violet-900/20"
                    : "text-slate-500 border-transparent hover:bg-white/5 hover:text-slate-300"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <link.icon size={17} />
                <span className="text-[11px] font-bold tracking-widest uppercase">
                  {link.name}
                </span>
              </div>
              <ChevronRight
                size={13}
                className="opacity-0 group-hover:opacity-60 transition-all -translate-x-1 group-hover:translate-x-0"
              />
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="pt-6 border-t border-white/5 space-y-1">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-slate-600 px-4 py-3.5 rounded-xl hover:text-red-400 hover:bg-red-400/5 transition-all w-full group"
          >
            <LogOut size={17} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-[11px] font-bold tracking-widest uppercase">
              Log Out
            </span>
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ───────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-20 bg-[#080f1e]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 flex-shrink-0">
          <div>
            <h1 className="text-sm font-black text-white tracking-tight uppercase">
              Admin Control Center
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                System Operational
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all relative">
              <Bell size={18} />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                  Logged in as
                </p>
                <p className="text-xs font-black text-white">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-violet-900/30">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Outlet */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
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

export default AdminDashboardLayout;
