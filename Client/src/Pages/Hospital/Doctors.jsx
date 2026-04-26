import React, { useState } from "react";
import { 
  Stethoscope, 
  Plus, 
  Search, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin,
  Trash2,
  Edit2,
  ExternalLink
} from "lucide-react";

const initialDoctors = [
  { id: "DOC-001", name: "Dr. Arvind Swami", specialty: "Cardiology", experience: "12 Years", email: "arvind@mednext.com", status: "Active" },
  { id: "DOC-002", name: "Dr. Sarah Jenkins", specialty: "Neurology", experience: "8 Years", email: "sarah@mednext.com", status: "On Leave" },
  { id: "DOC-003", name: "Dr. Rajesh Koothrappali", specialty: "Pediatrics", experience: "15 Years", email: "rajesh@mednext.com", status: "Active" },
  { id: "DOC-004", name: "Dr. Priya Sharma", specialty: "Orthopedics", experience: "10 Years", email: "priya@mednext.com", status: "Busy" },
];

export default function Doctors() {
  const [doctors] = useState(initialDoctors);

  return (
    <div className="p-10 space-y-10 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest">
             Staff Management
          </div>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Clinical Personnel</h2>
          <p className="text-slate-400 text-xs font-medium italic">Manage and onboard medical specialists</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
              <input
                placeholder="Find Consultant..."
                className="bg-white border border-slate-100 p-4 pl-12 rounded-2xl text-[10px] font-black uppercase tracking-widest w-64 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all shadow-sm"
              />
           </div>
           <button className="bg-[#0f172a] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/10 active:scale-95 group">
              <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add Specialist
           </button>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {doctors.map((doc) => (
          <div key={doc.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)] hover:border-indigo-200 transition-all group relative overflow-hidden">
             
             {/* Status Badge */}
             <div className="absolute top-6 right-6">
                <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${
                  doc.status === 'Active' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 
                  doc.status === 'On Leave' ? 'bg-amber-50 text-amber-500 border-amber-100' : 'bg-rose-50 text-rose-500 border-rose-100'
                }`}>
                   {doc.status}
                </span>
             </div>

             <div className="space-y-6">
                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-400 font-black text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100">
                   {doc.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="space-y-1">
                   <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{doc.name}</h3>
                   <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{doc.specialty}</p>
                </div>

                <div className="pt-4 border-t border-slate-50 space-y-4">
                   <div className="flex items-center gap-3 text-slate-400">
                      <Mail size={14} className="group-hover:text-indigo-600 transition-colors" />
                      <span className="text-[10px] font-bold text-slate-600 lowercase">{doc.email}</span>
                   </div>
                   <div className="flex items-center gap-3 text-slate-400">
                      <MapPin size={14} className="group-hover:text-indigo-600 transition-colors" />
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{doc.experience} EXP</span>
                   </div>
                </div>

                <div className="flex items-center gap-3 pt-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                   <button className="flex-1 bg-slate-50 text-slate-600 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2">
                      <Edit2 size={12} /> Edit
                   </button>
                   <button className="bg-rose-50 text-rose-500 p-3 rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                      <Trash2 size={14} />
                   </button>
                </div>
             </div>
          </div>
        ))}

        {/* Add Doctor Placeholder */}
        <button className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group">
           <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
              <Plus size={32} />
           </div>
           <span className="text-[10px] font-black uppercase tracking-widest">Enroll New Consultant</span>
        </button>
      </div>

      {/* Quick Insights Banner */}
      <div className="bg-[#0f172a] p-12 rounded-[3.5rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Stethoscope size={240} />
         </div>
         <div className="space-y-6 relative z-10">
            <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">Global Network<br/>Synchronization</h2>
            <p className="text-slate-400 text-sm font-medium max-w-lg">
               Your medical staff data is synchronized across all MedNext nodes. Ensure credentials are up to date for credentialing audit compliance.
            </p>
         </div>
         <button className="bg-indigo-600 text-white px-10 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all shadow-2xl active:scale-95 flex items-center gap-4">
            <ExternalLink size={20} /> View Public Registry
         </button>
      </div>

    </div>
  );
}
