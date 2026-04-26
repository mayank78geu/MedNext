import React, { useState } from "react";
import { 
  CalendarCheck, 
  Clock, 
  User, 
  MoreVertical, 
  Search, 
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";

const initialAppointments = [
  { id: "APT-882", patient: "Rahul Mehta", doctor: "Dr. A. Sharma", time: "10:30 AM", date: "2024-04-28", status: "Confirmed" },
  { id: "APT-883", patient: "Sneha Kapoor", doctor: "Dr. S. Verma", time: "11:15 AM", date: "2024-04-28", status: "Pending" },
  { id: "APT-884", patient: "Amit Roy", doctor: "Dr. R. Singh", time: "01:00 PM", date: "2024-04-29", status: "Confirmed" },
  { id: "APT-885", patient: "Priya Das", doctor: "Dr. A. Sharma", time: "02:30 PM", date: "2024-04-29", status: "Cancelled" },
];

export default function Appointments() {
  const [appointments, setAppointments] = useState(initialAppointments);

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "Pending": return "text-amber-600 bg-amber-50 border-amber-100";
      case "Cancelled": return "text-rose-600 bg-rose-50 border-rose-100";
      default: return "text-slate-600 bg-slate-50 border-slate-100";
    }
  };

  return (
    <div className="p-10 space-y-10 animate-fadeIn">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest">
            Logistics Hub
          </div>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Appointment Management</h2>
          <p className="text-slate-400 text-xs font-medium tracking-wide italic">Real-time clinical session orchestration</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
              <input
                placeholder="Find Appointment ID..."
                className="bg-white border border-slate-100 p-4 pl-12 rounded-2xl text-[10px] font-black uppercase tracking-widest w-64 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all shadow-sm"
              />
           </div>
           <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm group">
              <Filter size={18} className="group-hover:rotate-180 transition-transform duration-500" />
           </button>
        </div>
      </div>

      {/* Appointment Grid */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Registry ID</th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient / Subject</th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Clinical Lead</th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Timeline</th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational Status</th>
                <th className="p-8 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {appointments.map((apt) => (
                <tr key={apt.id} className="group hover:bg-slate-50/50 transition-all">
                  <td className="p-8">
                    <span className="text-[11px] font-black text-indigo-600 bg-indigo-50/50 px-3 py-1.5 rounded-lg border border-indigo-100/50 uppercase tracking-widest">
                      {apt.id}
                    </span>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-black text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          {apt.patient.split(' ').map(n => n[0]).join('')}
                       </div>
                       <p className="font-black text-slate-800 uppercase tracking-tight text-sm">{apt.patient}</p>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-3">
                       <User size={14} className="text-slate-300" />
                       <p className="text-xs font-bold text-slate-600">{apt.doctor}</p>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="space-y-1">
                       <p className="text-[11px] font-black text-slate-800 flex items-center gap-2">
                          <Clock size={12} className="text-indigo-500" /> {apt.time}
                       </p>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{apt.date}</p>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${getStatusColor(apt.status)} shadow-sm`}>
                       {apt.status === "Confirmed" && <CheckCircle2 size={10} />}
                       {apt.status === "Pending" && <AlertCircle size={10} />}
                       {apt.status === "Cancelled" && <XCircle size={10} />}
                       {apt.status}
                    </div>
                  </td>
                  <td className="p-8 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-slate-50 transition-all">
                       <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Pending Sync", val: "12 Cases", color: "amber" },
           { label: "Confirmed Today", val: "48 Sessions", color: "emerald" },
           { label: "Resource Conflict", val: "0 Alerts", color: "indigo" }
         ].map((box, i) => (
           <div key={i} className={`p-8 rounded-[2rem] border border-${box.color}-100 bg-${box.color}-50/30 flex items-center justify-between group hover:shadow-xl hover:shadow-${box.color}-500/5 transition-all`}>
              <div>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{box.label}</p>
                 <h4 className={`text-xl font-black text-${box.color}-600 uppercase tracking-tight`}>{box.val}</h4>
              </div>
              <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-${box.color}-500 shadow-sm border border-${box.color}-100 group-hover:scale-110 transition-transform`}>
                 <CalendarCheck size={20} />
              </div>
           </div>
         ))}
      </div>

    </div>
  );
}
