import React, { useState } from "react";
import { 
  Users, 
  Search, 
  UserPlus, 
  ArrowUpRight, 
  Activity, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  MapPin
} from "lucide-react";

const initialPatients = [
  { id: "PX-1029", name: "Ananya Iyer", age: 28, gender: "Female", city: "Mumbai", lastVisit: "2d ago", status: "Critical" },
  { id: "PX-1030", name: "Vikram Malhotra", age: 45, gender: "Male", city: "Delhi", lastVisit: "5d ago", status: "Stable" },
  { id: "PX-1031", name: "Sita Reddy", age: 62, gender: "Female", city: "Bangalore", lastVisit: "12h ago", status: "Stable" },
  { id: "PX-1032", name: "Kabir Khan", age: 34, gender: "Male", city: "Hyderabad", lastVisit: "3w ago", status: "Discharged" },
];

export default function Patients() {
  const [patients] = useState(initialPatients);

  return (
    <div className="p-10 space-y-10 animate-fadeIn">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest">
             Patient Hub
          </div>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Patient Registry</h2>
          <p className="text-slate-400 text-xs font-medium italic">Unified clinical history database</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
              <input
                placeholder="Search Identity..."
                className="bg-white border border-slate-100 p-4 pl-12 rounded-2xl text-[10px] font-black uppercase tracking-widest w-72 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all shadow-sm"
              />
           </div>
           <button className="bg-[#0f172a] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/10 active:scale-95 group">
              <UserPlus size={18} className="group-hover:scale-110 transition-transform" /> Register New
           </button>
        </div>
      </div>

      {/* Patient Cards / Table Alternative */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {patients.map((patient) => (
          <div key={patient.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)] hover:border-indigo-200 transition-all group flex flex-col sm:flex-row gap-8 relative overflow-hidden">
             
             {/* Left: Identity Info */}
             <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-400 font-black text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100">
                      {patient.name.charAt(0)}
                   </div>
                   <div>
                      <div className="flex items-center gap-2 mb-1">
                         <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{patient.name}</h3>
                         <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border ${
                           patient.status === 'Critical' ? 'bg-rose-50 text-rose-500 border-rose-100' : 'bg-emerald-50 text-emerald-500 border-emerald-100'
                         }`}>
                           {patient.status}
                         </span>
                      </div>
                      <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none">Identity Linked: {patient.id}</p>
                   </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-y border-slate-50 py-6">
                   <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Age / Bio</p>
                      <p className="text-sm font-black text-slate-700 leading-none">{patient.age}Y • {patient.gender}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Zone</p>
                      <p className="text-sm font-black text-slate-700 leading-none flex items-center gap-1">
                        <MapPin size={12} className="text-slate-300" /> {patient.city}
                      </p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Synced</p>
                      <p className="text-sm font-black text-slate-700 leading-none">{patient.lastVisit}</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                   <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-indigo-600 bg-indigo-50/50 px-5 py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                      <FileText size={14} /> Open Records
                   </button>
                   <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 hover:text-indigo-600 transition-colors">
                      Edit Profile <ArrowUpRight size={14} />
                   </button>
                </div>
             </div>

             {/* Right: Health Metrics Snapshot */}
             <div className="w-full sm:w-48 bg-slate-50 rounded-[2rem] p-6 space-y-6 flex flex-col justify-center">
                <div className="space-y-1 text-center">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Health Index</p>
                   <div className="flex items-center justify-center gap-2">
                      <TrendingUp size={16} className="text-emerald-500" />
                      <span className="text-2xl font-black text-slate-800">92%</span>
                   </div>
                </div>
                <div className="space-y-3">
                   <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-emerald-500 rounded-full" />
                   </div>
                   <p className="text-[8px] font-black text-slate-400 text-center uppercase tracking-widest">Clinical Protocol Compliant</p>
                </div>
             </div>

             {/* Background Decoration */}
             <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none -rotate-12 translate-x-4 -translate-y-4">
                <Activity size={180} />
             </div>
          </div>
        ))}
      </div>

      {/* Performance Card */}
      <div className="bg-[#0f172a] rounded-[3.5rem] p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:rotate-6 transition-transform duration-1000">
            <ShieldCheck size={200} />
         </div>
         
         <div className="space-y-6 relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] border border-indigo-500/10">
               <ShieldCheck size={14} /> Biometric Security Active
            </div>
            <h2 className="text-4xl font-black tracking-tighter uppercase leading-[0.9]">Authorized Data<br/>Access Center</h2>
            <p className="text-slate-400 text-sm font-medium max-w-lg mx-auto lg:mx-0">
               Accessing patient records requires double-factor authentication. All interactions are logged in the MedNext clinical audit trail.
            </p>
         </div>

         <div className="flex flex-col sm:flex-row gap-6 relative z-10 w-full lg:w-auto">
            <button className="flex-1 bg-white text-slate-900 px-10 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all shadow-2xl active:scale-95">
               Request Export
            </button>
            <button className="flex-1 bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 px-10 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all active:scale-95">
               Audit History
            </button>
         </div>
      </div>

    </div>
  );
}
