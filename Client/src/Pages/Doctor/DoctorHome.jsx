import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const initialToday = [
  { id: 1, name: "Rajiv Kumar", time: "9:00 AM", type: "Follow-up", disease: "Hypertension", status: "confirmed" },
  { id: 2, name: "Priya Sharma", time: "9:30 AM", type: "Consultation", disease: "Chest Pain", status: "urgent" },
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
      case "confirmed": return "bg-blue-100 text-blue-700 border border-blue-200";
      case "urgent": return "bg-red-100 text-red-700 border border-red-200";
      case "done": return "bg-gray-100 text-gray-600 border border-gray-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const doneCount = todayList.filter((a) => a.status === "done").length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Welcome back, Dr. Smith 👋</h1>
        <p className="text-slate-500 mt-2">Here is what's happening with your clinic today.</p>
      </div>

      {/* STATS WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <p className="text-sm font-semibold text-slate-500 uppercase">Total Scheduled</p>
          <p className="text-4xl font-bold text-slate-800 mt-2">{todayList.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <p className="text-sm font-semibold text-slate-500 uppercase">Done Today</p>
          <p className="text-4xl font-bold text-green-600 mt-2">{doneCount}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <p className="text-sm font-semibold text-slate-500 uppercase">Pending Requests</p>
          <p className="text-4xl font-bold text-orange-500 mt-2">{pendingList.length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-md text-white flex flex-col justify-center">
          <p className="text-sm font-medium opacity-80">Next Appointment</p>
          <p className="text-2xl font-bold mt-1">Priya Sharma</p>
          <p className="text-sm opacity-90">9:30 AM • Chest Pain</p>
        </div>
      </div>

      {/* MAIN GRIDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* TODAY'S APPOINTMENTS */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800">Today's Appointments</h2>
          </div>
          <div className="divide-y divide-slate-100 flex-1">
            {todayList.map((a) => (
              <div key={a.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                    {a.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${a.status === "done" ? "line-through text-slate-400" : "text-slate-800"}`}>
                      {a.name}
                    </h3>
                    <p className="text-sm text-slate-500">{a.disease} • {a.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(a.status)}`}>
                    {a.status}
                  </span>
                  {a.status !== "done" && (
                    <button
                      onClick={() => markDone(a.id)}
                      className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors tooltip"
                      title="Mark as Done"
                    >
                      <CheckCircle size={24} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {todayList.length === 0 && (
              <div className="p-8 text-center text-slate-500">No appointments for today.</div>
            )}
          </div>
        </div>

        {/* SIDEBAR CONTENT: Pending & Last Met */}
        <div className="space-y-8 flex flex-col">
          
          {/* PENDING APPROVALS */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">Pending Requests</h2>
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">{pendingList.length}</span>
            </div>
            <div className="divide-y divide-slate-100">
              {pendingList.length === 0 ? (
                <p className="p-6 text-center text-slate-500">No pending requests</p>
              ) : (
                pendingList.map((a) => (
                  <div key={a.id} className="p-6">
                    <p className="font-semibold text-slate-800">{a.name}</p>
                    <p className="text-sm text-slate-500 mb-4">{a.disease} • {a.time}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => acceptPending(a.id)}
                        className="flex-1 bg-green-50 text-green-600 font-medium px-4 py-2 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={18} /> Accept
                      </button>
                      <button
                        onClick={() => rejectPending(a.id)}
                        className="flex-1 bg-slate-50 text-slate-600 font-medium px-4 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <XCircle size={18} /> Decline
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RECENTLY MET */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex-1">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800">Recently Met</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {lastPatients.map((p) => (
                <div key={p.id} className="p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer">
                   <div className="h-10 w-10 text-slate-500 bg-slate-100 rounded-full flex justify-center items-center font-bold text-sm">
                      {p.name.charAt(0)}
                   </div>
                   <div>
                      <p className="font-semibold text-slate-800 text-sm">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.disease} • {p.time}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
