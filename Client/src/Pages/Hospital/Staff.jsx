import React, { useState } from "react";
import { 
  Users, 
  Activity, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  LayoutGrid, 
  List,
  Filter,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const staffCategories = [
  { id: "all", name: "Full Roster", count: 48 },
  { id: "nursing", name: "Nursing Staff", count: 24 },
  { id: "ops", name: "Operations", count: 12 },
  { id: "tech", name: "Technical", count: 10 },
];

const initialStaff = [
  { id: "ST-201", name: "Sarah Connor", role: "Head Nurse", wing: "ICU-A", status: "Active", workload: 82 },
  { id: "ST-202", name: "James Bond", role: "Security Chief", wing: "Entrance", status: "Active", workload: 45 },
  { id: "ST-203", name: "Ellen Ripley", role: "Biohazard Specialist", wing: "Lab-7", status: "Busy", workload: 96 },
  { id: "ST-204", name: "Tony Stark", role: "IT Infrastructure", wing: "Server Room", status: "Active", workload: 30 },
];

export default function Staff() {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("table");

  return (
    <div className="p-10 space-y-10 animate-fadeIn">
      
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-8">
           <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest">
                 Resource Orchestration
              </div>
              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Institutional Roster</h2>
           </div>
           
           <div className="flex items-center gap-2 bg-slate-100/50 p-1.5 rounded-[1.5rem] w-fit">
              {staffCategories.map((cat) => (
                 <button 
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                       activeTab === cat.id 
                       ? "bg-white text-indigo-600 shadow-xl shadow-indigo-900/5" 
                       : "text-slate-400 hover:text-slate-600"
                    }`}
                 >
                    {cat.name} <span className="opacity-40 ml-1">({cat.count})</span>
                 </button>
              ))}
           </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="bg-white border border-slate-100 p-1.5 rounded-2xl flex items-center shadow-sm">
              <button 
                 onClick={() => setViewMode("table")}
                 className={`p-3 rounded-xl transition-all ${viewMode === "table" ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:bg-slate-50"}`}
              >
                 <List size={18} />
              </button>
              <button 
                 onClick={() => setViewMode("grid")}
                 className={`p-3 rounded-xl transition-all ${viewMode === "grid" ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:bg-slate-50"}`}
              >
                 <LayoutGrid size={18} />
              </button>
           </div>
           <button className="bg-white border border-slate-100 p-4.5 rounded-2xl text-slate-400 hover:text-indigo-600 shadow-sm transition-all group">
              <Filter size={18} className="group-hover:rotate-180 transition-transform duration-500" />
           </button>
        </div>
      </div>

      {/* Roster Display */}
      <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)] overflow-hidden">
        <table className="w-full text-left border-collapse">
           <thead>
              <tr className="bg-slate-50/50">
                 <th className="p-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Personnel</th>
                 <th className="p-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Departmental Role</th>
                 <th className="p-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Wing / Zone</th>
                 <th className="p-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Shift Status</th>
                 <th className="p-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Capacity Load</th>
                 <th className="p-10 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Protocol</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-50">
              {initialStaff.map((person) => (
                 <tr key={person.id} className="group hover:bg-slate-50/50 transition-all">
                    <td className="p-10">
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all font-black text-xs shadow-sm">
                             {person.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                             <p className="font-black text-slate-800 uppercase tracking-tight text-sm leading-none">{person.name}</p>
                             <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-2">{person.id}</p>
                          </div>
                       </div>
                    </td>
                    <td className="p-10">
                       <p className="text-xs font-bold text-slate-600">{person.role}</p>
                    </td>
                    <td className="p-10">
                       <div className="flex items-center gap-2 text-indigo-500">
                          <Activity size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{person.wing}</span>
                       </div>
                    </td>
                    <td className="p-10">
                       <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${
                          person.status === 'Active' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-amber-600 bg-amber-50 border-amber-100'
                       }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${person.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          {person.status}
                       </div>
                    </td>
                    <td className="p-10">
                       <div className="flex flex-col gap-2 w-40">
                          <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                             <span>Load</span>
                             <span className="text-slate-800">{person.workload}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                             <div 
                                className={`h-full rounded-full transition-all duration-1000 ${person.workload > 90 ? 'bg-rose-500' : 'bg-indigo-500'}`} 
                                style={{ width: `${person.workload}%` }} 
                             />
                          </div>
                       </div>
                    </td>
                    <td className="p-10 text-right">
                       <button className="text-slate-300 hover:text-indigo-600 transition-colors p-2">
                          <ChevronRight size={20} />
                       </button>
                    </td>
                 </tr>
              ))}
           </tbody>
        </table>
      </div>

      {/* Operational Efficiency Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="bg-indigo-600 p-12 rounded-[4rem] text-white space-y-8 relative overflow-hidden group">
            <div className="absolute -right-12 -top-12 p-12 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
               <ShieldCheck size={200} />
            </div>
            <div className="space-y-4">
               <h3 className="text-2xl font-black uppercase tracking-tight">Wing Allocation Index</h3>
               <p className="text-indigo-200 text-xs font-medium max-w-sm">Current institutional load is optimized across all 4 major wings. No critical bottlenecks detected.</p>
            </div>
            <div className="flex gap-4">
               <div className="px-6 py-4 bg-white/10 rounded-3xl border border-white/20">
                  <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">ICU Staffing</p>
                  <p className="text-xl font-black">94% Capacity</p>
               </div>
               <div className="px-6 py-4 bg-white/10 rounded-3xl border border-white/20">
                  <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">Security</p>
                  <p className="text-xl font-black">100% Secure</p>
               </div>
            </div>
         </div>

         <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shift Sync Status</p>
                  <p className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                     <CheckCircle2 className="text-emerald-500" size={24} /> Optimal Synchronization
                  </p>
               </div>
               <Clock className="text-slate-100" size={60} />
            </div>
            <button className="w-full bg-[#0f172a] text-white py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all active:scale-95 shadow-2xl shadow-slate-900/10 mt-10">
               Audit Current Shift Pattern
            </button>
         </div>
      </div>

    </div>
  );
}
