import React, { useState } from "react";

/* ---------- INITIAL DATA ---------- */

const initialToday = [
  {
    id: 1,
    name: "Rajiv Kumar",
    time: "9:00 AM",
    type: "Follow-up",
    disease: "Hypertension",
    status: "confirmed",
  },
  {
    id: 2,
    name: "Priya Sharma",
    time: "9:30 AM",
    type: "Consultation",
    disease: "Chest Pain",
    status: "urgent",
  },
];

const initialPending = [
  {
    id: 3,
    name: "Meena Verma",
    type: "Checkup",
    disease: "General Checkup",
    time: "11:30 AM",
  },
  {
    id: 4,
    name: "Ravi Sharma",
    type: "Consultation",
    disease: "Heart Problem",
    time: "12:15 PM",
  },
];

/* ---------- COMPONENT ---------- */

export default function DoctorDashboard() {
  const [todayList, setTodayList] = useState(initialToday);
  const [pendingList, setPendingList] = useState(initialPending);

  /* ---------- ACTIONS ---------- */

  const addAppointment = () => {
    const newAppt = {
      id: Date.now(),
      name: "New Patient",
      time: "TBD",
      type: "General",
      disease: "General Checkup",
      status: "confirmed",
    };
    setTodayList((prev) => [...prev, newAppt]);
  };

  const markDone = (id) => {
    setTodayList((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "done" } : a
      )
    );
  };

  const acceptPending = (id) => {
    const appt = pendingList.find((a) => a.id === id);
    if (!appt) return;

    setPendingList((prev) => prev.filter((a) => a.id !== id));

    setTodayList((prev) => [
      ...prev,
      {
        ...appt,
        status: "confirmed",
      },
    ]);
  };

  const rejectPending = (id) => {
    setPendingList((prev) => prev.filter((a) => a.id !== id));
  };

  /* ---------- HELPERS ---------- */

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-600";
      case "urgent":
        return "bg-red-100 text-red-600";
      case "done":
        return "bg-gray-200 text-gray-500";
      default:
        return "bg-gray-100";
    }
  };

  const doneCount = todayList.filter((a) => a.status === "done").length;

  /* ---------- UI ---------- */

  return (
    <div className="flex h-screen bg-[#F4F7FB] text-[#0d1b2a]">

     
      <div className="w-56 bg-[#0d1b2a] text-white flex flex-col">
        

        <div className="p-4 space-y-2">
          <div className="bg-blue-500/20 text-blue-400 px-3 py-2 rounded">
            Dashboard
          </div>
          <div className="px-3 py-2 hover:bg-white/10 rounded cursor-pointer">
            Appointments
          </div>
        </div>
      </div>

     
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">

        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Good morning 👋</h2>
            <p className="text-sm text-gray-400">Dashboard overview</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded border hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer">
            <p className="text-sm text-gray-400">Today's appointments</p>
            <h2 className="text-2xl font-bold">{todayList.length}</h2>
          </div>

          <div className="bg-white p-4 rounded border hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer">
            <p className="text-sm text-gray-400">Completed</p>
            <h2 className="text-2xl font-bold">{doneCount}</h2>
          </div>

          <div className="bg-white p-4 rounded border hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer">
            <p className="text-sm text-gray-400">Pending</p>
            <h2 className="text-2xl font-bold">{pendingList.length}</h2>
          </div>
        </div>

        
        <div className="grid grid-cols-2 gap-4">

         
          <div className="bg-white border rounded">
            <div className="p-4 border-b font-semibold">
              Today's Appointments
            </div>

            {todayList.map((a) => (
              <div key={a.id} className="flex justify-between items-center p-4 border-b group hover:bg-slate-50 transition-colors duration-200">

                <div>
                  <p className={`font-medium ${a.status === "done" ? "line-through text-gray-400" : ""}`}>
                    {a.name}
                  </p>

                  <p className="text-sm text-gray-400">
                    {a.disease} · {a.time}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(a.status)}`}>
                    {a.status}
                  </span>

                  {a.status !== "done" && (
                    <button
                      onClick={() => markDone(a.id)}
                      className="text-green-600 border px-2 py-1 rounded hover:bg-green-50 active:scale-95 transition-all"
                    >
                      ✓
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

       
          <div className="bg-white border rounded">
            <div className="p-4 border-b font-semibold">
              Pending Requests
            </div>

            {pendingList.length === 0 ? (
              <p className="p-4 text-gray-400">No pending requests</p>
            ) : (
              pendingList.map((a) => (
                <div key={a.id} className="p-4 border-b group hover:bg-slate-50 transition-colors duration-200">

                  <p className="font-medium">{a.name}</p>

                  <p className="text-sm text-gray-400 mb-2">
                    {a.disease} · {a.time}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => acceptPending(a.id)}
                      className="bg-green-100 text-green-600 px-3 py-1 rounded hover:bg-green-200 hover:shadow-md active:scale-95 transition-all"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => rejectPending(a.id)}
                      className="border px-3 py-1 rounded text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 active:scale-95 transition-all"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}