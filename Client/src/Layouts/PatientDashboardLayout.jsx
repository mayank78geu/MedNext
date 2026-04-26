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
  HeartPulse,
  ChevronRight,
  Bell
} from "lucide-react";

const PatientDashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navLinks = [
    { name: "My Health Hub", path: "/patient-dashboard", icon: LayoutDashboard, exact: true },
    { name: "Find Care", path: "/patient-dashboard/find-doctors", icon: Search },
    { name: "Medications", path: "/patient-dashboard/prescriptions", icon: Pill },
    { name: "Appointments", path: "/patient-dashboard/appointments", icon: CalendarCheck },
    { name: "Medical Records", path: "/patient-dashboard/details", icon: FileText },
    { name: "My Profile", path: "/patient-dashboard/profile", icon: User },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-900 overflow-hidden">
      
      {/* PREMIUM PATIENT SIDEBAR */}
      <aside className="w-80 bg-[#0f172a] text-white flex flex-col p-8 border-r border-white/5 relative z-30 hidden lg:flex">
         {/* Brand Branding */}
         <div className="flex items-center gap-3 mb-16 px-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
               <HeartPulse size={24} className="text-white" />
            </div>
            <div className="flex flex-col">
               <span className="text-lg font-black tracking-tight leading-none uppercase">MEDNEXT</span>
               <span className="text-[10px] font-black text-indigo-400 tracking-[0.3em] uppercase">Patient Port</span>
            </div>
         </div>

         {/* Navigation Links */}
         <nav className="flex-1 space-y-2">
            <div className="mb-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Patient Panel</div>
            {navLinks.map((link) => (
               <NavLink
                 key={link.name}
                 to={link.path}
                 end={link.exact}
                 className={({ isActive }) =>
                   `flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group border ${
                     isActive 
                       ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 border-indigo-500/50" 
                       : "text-slate-400 border-transparent hover:bg-white/5 hover:text-white"
                   }`
                 }
               >
                 <div className="flex items-center gap-3">
                   <link.icon size={18} />
                   <span className="text-[10px] font-black uppercase tracking-widest">{link.name}</span>
                 </div>
                 <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0`} />
               </NavLink>
            ))}
         </nav>

         {/* Bottom Actions */}
         <div className="pt-8 border-t border-white/5">
            <button 
               onClick={handleLogout}
               className="flex items-center gap-3 text-slate-500 px-5 py-4 rounded-2xl hover:text-red-400 hover:bg-red-400/5 transition-all w-full group"
            >
               <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
               <span className="text-[10px] font-black uppercase tracking-widest">logout</span>
            </button>
         </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
         
         {/* Top Navigation Bar */}
         <header className="h-24 bg-white/70 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-10 relative z-20">
            <div className="flex flex-col">
               <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase leading-none mb-1">Health Dashboard</h1>
               <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Records Synchronized</span>
               </div>
            </div>

            <div className="flex items-center gap-8">
               <div className="relative group hidden xl:block">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                  <input
                     type="text"
                     placeholder="Search My Health Data..."
                     className="bg-slate-100 border-transparent p-3.5 pl-12 rounded-2xl text-[10px] font-black uppercase tracking-widest w-72 outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-100 transition-all placeholder:text-slate-400"
                  />
               </div>
               <div className="flex items-center gap-4">
                  <button className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-white border border-slate-100 transition-all relative group shadow-sm">
                     <Bell size={20} className="group-hover:rotate-12 transition-transform" />
                     <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
                  </button>
                  <div className="h-10 w-px bg-slate-100 mx-2" />
                  <div className="flex items-center gap-3 cursor-pointer group">
                     <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 group-hover:text-indigo-600 transition-colors">Patient Member</p>
                        <p className="text-xs font-black text-slate-800 tracking-tight">Verified Account</p>
                     </div>
                     <div className="w-12 h-12 bg-[#0f172a] rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-900/10 group-hover:bg-indigo-600 transition-all">
                        JD
                     </div>
                  </div>
               </div>
            </div>
         </header>

         {/* Dashboard Body / Page Outlet */}
         <div className="flex-1 overflow-y-auto scrollbar-hide animate-fadeIn relative">
            <Outlet />
         </div>
      </main>

    </div>
  );
};

export default PatientDashboardLayout;
