import React, { useState } from "react";
import {
  Users,
  Activity,
  Plus,
  TrendingUp,
  ArrowRight,
  Stethoscope,
  AlertTriangle,
  Trash2
} from "lucide-react";

/* ---------- INITIAL DATA ---------- */
const initialDoctors = [
  { id: 101, name: "Dr. A. K. Sharma", specialty: "Cardiology", status: "Active", workload: "85%" },
  { id: 102, name: "Dr. S. Verma", specialty: "Neurology", status: "Busy", workload: "98%" },
  { id: 103, name: "Dr. R. Singh", specialty: "General Medicine", status: "Active", workload: "60%" },
];

export default function HospitalDashboard() {
  const [doctorsList, setDoctorsList] = useState(initialDoctors);

  const removeDoctor = (id) => {
    setDoctorsList((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div className="p-10 space-y-10">

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
        {[
          { label: "Active Clinicians", val: "48", icon: <Stethoscope />, color: "indigo", trend: "+4 this month" },
          { label: "Patient Volume", val: "1,240", icon: <Users />, color: "blue", trend: "+12% growth" },
          { label: "Operational Index", val: "94%", icon: <Activity />, color: "emerald", trend: "Optimal state" },
          { label: "ICU Capacity", val: "88%", icon: <AlertTriangle />, color: "rose", trend: "High load" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] space-y-6 hover:border-indigo-200 transition-all group">
            <div className={`w-14 h-14 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center group-hover:bg-${stat.color}-600 group-hover:text-white transition-all duration-500 shadow-sm`}>
              {React.cloneElement(stat.icon, { size: 24 })}
            </div>
            <div>
              <p className={`text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-${stat.color}-500 transition-colors`}>{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{stat.val}</h3>
              <div className="flex items-center gap-1.5 mt-4">
                <TrendingUp size={12} className={`text-${stat.color}-500`} />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Physician Roster - Full Width */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col animate-slideUp">
        <div className="p-10 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest">
              Staff Database
            </div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
              Professional Roster
            </h2>
          </div>
          <button className="bg-[#0f172a] text-white px-8 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/10 active:scale-95 group">
            <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Deploy Specialist
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Consultant</th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Specialization</th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Workload</th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="p-8 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {doctorsList.map((doc) => (
                <tr key={doc.id} className="group hover:bg-slate-50/30 transition-all">
                  <td className="p-8">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-slate-100 rounded-[1rem] flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all font-black text-xs shadow-sm">
                        {doc.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 uppercase tracking-tight text-sm">{doc.name}</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">MN-{doc.id}-PRO</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-4 py-1.5 rounded-full border border-indigo-100 uppercase tracking-widest shadow-sm">
                      {doc.specialty}
                    </span>
                  </td>
                  <td className="p-8">
                    <div className="flex flex-col gap-2 w-32">
                      <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        <span>Load</span>
                        <span className="text-slate-800">{doc.workload}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${parseInt(doc.workload) > 90 ? 'bg-rose-500' : 'bg-indigo-500'}`}
                          style={{ width: doc.workload }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${doc.status === 'Active' ? 'bg-emerald-500 animate-pulse ring-4 ring-emerald-100' : 'bg-amber-500'}`} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${doc.status === 'Active' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {doc.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-8 text-right">
                    <button
                      onClick={() => removeDoctor(doc.id)}
                      className="bg-white text-slate-400 p-3 rounded-xl hover:text-rose-500 hover:bg-rose-50 transition-all active:scale-90 border border-slate-100 hover:border-rose-100 shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Secondary Modules Grid - Operations & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-slideUp" style={{ animationDelay: '0.1s' }}>
        
        {/* Operations Feed */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
              <Activity size={16} />
            </div>
            Operations Feed
          </h3>
          <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-slate-50">
            {[
              { type: "STAFF", title: "Shift rotation finalized", time: "4m ago", color: "indigo" },
              { type: "MAINTENANCE", title: "Cloud sync scheduled", time: "12m ago", color: "amber" },
              { type: "EMERGENCY", title: "ICU Threshold Reached", time: "1h ago", color: "rose" }
            ].map((event, i) => (
              <div key={i} className="relative pl-10 group">
                <div className={`absolute left-[13px] top-1.5 w-1.5 h-1.5 rounded-full bg-${event.color}-500 ring-4 ring-white shadow-sm`} />
                <p className={`text-[9px] font-black text-${event.color}-500 uppercase tracking-widest mb-1`}>{event.type}</p>
                <p className="text-xs font-bold text-slate-700 leading-tight group-hover:text-indigo-600 transition-colors">{event.title}</p>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1 italic">{event.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Protocol */}
        <div className="bg-[#0f172a] p-10 rounded-[3rem] shadow-2xl space-y-8 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-all duration-1000">
            <AlertTriangle size={150} />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-500/20 text-rose-500 rounded-2xl flex items-center justify-center border border-rose-500/30">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400 mb-1 leading-none">Emergency Protocol</h3>
              <p className="text-xs font-black uppercase tracking-widest text-white/50">Level Red Activated</p>
            </div>
          </div>
          <p className="relative z-10 text-sm font-medium text-slate-400 leading-relaxed text-balance">
            ICU Capacity has exceeded <span className="text-rose-400 font-black">92%</span>. Rerouting all secondary trauma cases to North Campus.
          </p>
          <button className="relative z-10 w-full bg-rose-600 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-rose-700 transition-all active:scale-95 shadow-xl shadow-rose-900/20 flex items-center justify-center gap-3 group">
            Acknowledge Protocol <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}