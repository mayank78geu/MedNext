import React, { useState } from "react";
import { CheckCircle, XCircle, Clock, Calendar, AlertCircle, ChevronRight, Activity, Users, UserCheck, TrendingUp, Search, Bell, ShieldCheck } from "lucide-react";

const initialToday = [
  { id: 1, name: "Rajiv Kumar", time: "09:00 AM", type: "Follow-up", disease: "Hypertension", status: "confirmed" },
  { id: 2, name: "Priya Sharma", time: "09:30 AM", type: "Consultation", disease: "Chest Pain", status: "urgent" },
];

const initialPending = [
  { id: 3, name: "Meena Verma", type: "Checkup", disease: "General Checkup", time: "11:30 AM" },
  { id: 4, name: "Ravi Sharma", type: "Consultation", disease: "Heart Problem", time: "12:15 PM" },
];

const lastPatients = [
  { id: 101, name: "Arjun Singh", time: "Yesterday, 4:00 PM", disease: "Diabetes" },
  { id: 102, name: "Sunita Yadav", time: "Yesterday, 5:30 PM", disease: "Thyroid" },
];

export default function DoctorHome() {
  const [todayList, setTodayList] = useState(initialToday);
  const [pendingList, setPendingList] = useState(initialPending);

  const markDone = (id) => {
    setTodayList((prev) => prev.map((a) => (a.id === id ? { ...a, status: "done" } : a)));
  };

  const acceptPending = (id) => {
    const appt = pendingList.find((a) => a.id === id);
    if (!appt) return;
    setPendingList((prev) => prev.filter((a) => a.id !== id));
    setTodayList((prev) => [...prev, { ...appt, status: "confirmed" }]);
  };

  const rejectPending = (id) => {
    setPendingList((prev) => prev.filter((a) => a.id !== id));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed": return "bg-blue-50 text-blue-600 border border-blue-100";
      case "urgent": return "bg-rose-50 text-rose-600 border border-rose-100 animate-pulse";
      case "done": return "bg-emerald-50 text-emerald-600 border border-emerald-100";
      default: return "bg-slate-50 text-slate-500 border border-slate-100";
    }
  };

  const doneCount = todayList.filter((a) => a.status === "done").length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 animate-fadeIn">
      
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
           <Activity size={180} />
        </div>
        <div className="relative z-10 space-y-2">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full text-[9px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Specialist Authority Verified
           </div>
           <h1 className="text-4xl font-black text-slate-800 tracking-tight">Good Morning, <br /> Dr. Smith</h1>
           <p className="text-slate-400 font-medium max-w-md">Your clinical command center is active. 8 appointments scheduled for the current session.</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-slate-900 text-white px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all active:scale-95 shadow-2xl shadow-slate-900/10">
              Launch Session
           </button>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
           { label: "Total Load", val: todayList.length, icon: <Calendar />, color: "indigo" },
           { label: "Completed", val: doneCount, icon: <UserCheck />, color: "emerald" },
           { label: "Incoming", val: pendingList.length, icon: <AlertCircle />, color: "rose" },
           { label: "Satisfaction", val: "98%", icon: <TrendingUp />, color: "blue" }
        ].map((stat, i) => (
           <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6 hover:border-indigo-400 transition-all group">
              <div className={`w-12 h-12 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl flex items-center justify-center group-hover:bg-${stat.color}-600 group-hover:text-white transition-all`}>
                 {React.cloneElement(stat.icon, { size: 20 })}
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-3xl font-black text-slate-800 mt-1">{stat.val}</p>
              </div>
           </div>
        ))}
      </div>

      {/* 3. MAIN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* CENTER COLUMN: LIVE SCHEDULE */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col">
             <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div className="space-y-1">
                   <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Active Roster</h2>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Today's clinical flow</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-widest">
                   <Clock size={14} className="text-indigo-500" /> Real-time Sync
                </div>
             </div>
             <div className="divide-y divide-slate-50">
               {todayList.map((a) => (
                 <div key={a.id} className="p-8 flex items-center justify-between group hover:bg-slate-50/50 transition-all">
                   <div className="flex items-center gap-6">
                     <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-white group-hover:text-indigo-600 group-hover:border-indigo-200 flex items-center justify-center font-black text-xl transition-all shadow-sm">
                       {a.name.charAt(0)}
                     </div>
                     <div>
                       <h3 className={`text-base font-black uppercase tracking-tight ${a.status === "done" ? "line-through text-slate-300" : "text-slate-800"}`}>
                         {a.name}
                       </h3>
                       <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{a.disease}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-200" />
                          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{a.time}</span>
                       </div>
                     </div>
                   </div>
                   <div className="flex items-center gap-4">
                     <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${getStatusBadge(a.status)}`}>
                       {a.status}
                     </span>
                     {a.status !== "done" && (
                       <button
                         onClick={() => markDone(a.id)}
                         className="p-3 text-slate-300 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all active:scale-90"
                         title="Verify Completion"
                       >
                         <CheckCircle size={22} />
                       </button>
                     )}
                   </div>
                 </div>
               ))}
               {todayList.length === 0 && (
                 <div className="p-20 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">Session Log Empty.</div>
               )}
             </div>
           </div>
        </div>

        {/* RIGHT COLUMN: REQUESTS & HISTORY */}
        <div className="space-y-8">
           
           {/* PENDING APPROVALS */}
           <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
             <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <div className="space-y-1">
                   <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Incoming Requests</h2>
                   <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Awaiting Verification</p>
                </div>
                <span className="bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg shadow-rose-200">{pendingList.length}</span>
             </div>
             <div className="divide-y divide-slate-50">
               {pendingList.length === 0 ? (
                 <p className="p-10 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Network idle.</p>
               ) : (
                 pendingList.map((a) => (
                   <div key={a.id} className="p-8 space-y-6 group hover:bg-slate-50/50 transition-all">
                     <div>
                        <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{a.name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{a.disease} · {a.time}</p>
                     </div>
                     <div className="flex gap-3">
                       <button
                         onClick={() => acceptPending(a.id)}
                         className="flex-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest py-3 rounded-xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
                       >
                         Authorize
                       </button>
                       <button
                         onClick={() => rejectPending(a.id)}
                         className="px-4 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 py-3 rounded-xl transition-all"
                       >
                         <XCircle size={18} />
                       </button>
                     </div>
                   </div>
                 ))
               )}
             </div>
           </div>

           {/* RECENT CASE HISTORY */}
           <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
             <div className="p-8 border-b border-slate-50">
               <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Case Archive</h2>
             </div>
             <div className="divide-y divide-slate-50">
               {lastPatients.map((p) => (
                 <div key={p.id} className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 text-slate-400 bg-slate-100 rounded-xl flex justify-center items-center font-black text-xs group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                          {p.name.charAt(0)}
                       </div>
                       <div>
                          <p className="font-black text-slate-800 uppercase tracking-tight text-xs">{p.name}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{p.time}</p>
                       </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                 </div>
               ))}
             </div>
           </div>

        </div>
      </div>
    </div>
  );
}

