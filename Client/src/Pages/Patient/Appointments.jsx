import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, ChevronLeft, ChevronRight, Clock, Activity, ArrowUpRight, X } from "lucide-react";
import { GetPatientAppointments } from "../../api/appointments.api";

const statusColors = {
  BOOKED:    "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  CONFIRMED: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  CANCELLED: "bg-red-500/20 text-red-300 border-red-500/30",
  COMPLETED: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  PENDING:   "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export default function Appointments() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    GetPatientAppointments()
      .then(d => setAppointments(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const daysOfWeek = ["S","M","T","W","T","F","S"];

  const normDate = (ds) => {
    const d = new Date(ds);
    return isNaN(d) ? "" : `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  };

  const appsForDay = (day) => {
    const key = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    return appointments.filter(a => normDate(a.date) === key);
  };

  const today = new Date();
  const upcoming = appointments
    .filter(a => { const d = new Date(a.date); const t = new Date(); t.setHours(0,0,0,0); return d >= t; })
    .sort((a,b) => new Date(a.date) - new Date(b.date));

  const selectedApps = selectedDay ? appsForDay(selectedDay) : [];

  return (
    <div className="min-h-full bg-[#060d1f] text-white font-sans">
      <div className="p-8 space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">
              Consultation <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">Schedule</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Your clinical timeline — synchronized in real time</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live Feed</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* CALENDAR */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white/5 border border-white/8 rounded-3xl p-6"
          >
            {/* Month nav */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-black text-white">{monthNames[month]} {year}</h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">Clinical Calendar</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                  className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-indigo-600/30 rounded-xl text-slate-400 hover:text-indigo-300 transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                  className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-indigo-600/30 rounded-xl text-slate-400 hover:text-indigo-300 transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {daysOfWeek.map((d, i) => (
                <div key={i} className="text-center text-[10px] font-black text-slate-600 uppercase tracking-widest pb-2">{d}</div>
              ))}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`e-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const apps = appsForDay(day);
                const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
                const isSelected = selectedDay === day;

                return (
                  <motion.button
                    key={day}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDay(isSelected ? null : day)}
                    className={`relative flex flex-col items-center justify-center rounded-2xl p-2 min-h-[56px] transition-all border ${
                      isSelected
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/40"
                        : isToday
                          ? "bg-violet-600/20 border-violet-500/40 text-violet-300"
                          : apps.length > 0
                            ? "bg-indigo-500/10 border-indigo-500/20 text-slate-200 hover:bg-indigo-500/20"
                            : "bg-white/3 border-white/5 text-slate-500 hover:bg-white/8 hover:text-slate-300"
                    }`}
                  >
                    <span className="text-sm font-black">{day}</span>
                    {apps.length > 0 && (
                      <div className="flex gap-0.5 mt-1">
                        {apps.slice(0, 3).map((_, idx) => (
                          <span key={idx} className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-indigo-400"}`} />
                        ))}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Day detail popup */}
            {selectedDay && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-black text-indigo-300 uppercase tracking-widest">
                    {monthNames[month]} {selectedDay}
                  </p>
                  <button onClick={() => setSelectedDay(null)} className="text-slate-500 hover:text-white transition-colors">
                    <X size={14} />
                  </button>
                </div>
                {selectedApps.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No appointments on this day</p>
                ) : (
                  <div className="space-y-2">
                    {selectedApps.map(a => (
                      <div key={a.id} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                        <div className="w-7 h-7 rounded-lg bg-indigo-600/20 flex items-center justify-center text-indigo-400 text-xs font-black">
                          {(a.doctorName || "D").charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-black text-white">{a.doctorName || `Doctor #${a.doctorId}`}</p>
                          <p className="text-[10px] text-slate-500">{a.time || "TBD"}</p>
                        </div>
                        <span className={`ml-auto text-[9px] font-black px-2 py-0.5 rounded-full border ${statusColors[a.status] || statusColors.BOOKED}`}>
                          {a.status || "BOOKED"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* UPCOMING LIST */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white/5 border border-white/8 rounded-3xl p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-400">
                <Activity size={17} />
              </div>
              <div>
                <h2 className="text-sm font-black text-white uppercase tracking-tight">Upcoming</h2>
                <p className="text-[10px] text-slate-500">{upcoming.length} sessions</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-0.5 scrollbar-hide">
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="w-7 h-7 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                </div>
              ) : upcoming.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-slate-600">
                  <Clock size={28} className="mb-2 opacity-30" />
                  <p className="text-xs font-bold text-center">Your schedule is clear</p>
                </div>
              ) : (
                upcoming.map((app, i) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                    className="group bg-white/3 hover:bg-white/8 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-4 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-600/20 group-hover:bg-indigo-600/30 flex items-center justify-center text-indigo-300 font-black text-sm transition-all flex-shrink-0">
                        {(app.doctorName || "D").charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-white truncate">
                          {app.doctorName || `Doctor #${app.doctorId}`}
                        </p>
                        <p className="text-[10px] text-indigo-400/70 italic">Verified Specialist</p>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 text-slate-500 hover:text-indigo-400 transition-all">
                        <ArrowUpRight size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 border-t border-white/5 pt-3">
                      <span className="flex items-center gap-1.5"><CalendarCheck size={10} className="text-indigo-400" /> {app.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={10} className="text-violet-400" /> {app.time || "TBD"}</span>
                      <span className={`ml-auto text-[9px] font-black px-2 py-0.5 rounded-full border ${statusColors[app.status] || statusColors.BOOKED}`}>
                        {app.status || "BOOKED"}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
