import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock, Calendar, AlertCircle, Activity,
  UserCheck, TrendingUp, Stethoscope
} from "lucide-react";
import api from "../../api/axios";

/* ── helpers ──────────────────────────────────────────────── */
const todayStr = () => new Date().toISOString().split("T")[0];

const formatTime = (t) => {
  if (!t) return "TBD";
  const [h, m] = t.split(":");
  const hour = parseInt(h, 10);
  return `${hour > 12 ? hour - 12 : hour || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
};

const getStatusBadge = (status) => {
  switch ((status || "").toLowerCase()) {
    case "booked":    return "bg-indigo-50 text-indigo-600 border border-indigo-100";
    case "completed": return "bg-emerald-50 text-emerald-600 border border-emerald-100";
    case "cancelled": return "bg-rose-50 text-rose-600 border border-rose-100";
    default:          return "bg-slate-50 text-slate-500 border border-slate-100";
  }
};


/* ── StatCard ─────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6 hover:border-indigo-300 hover:shadow-md transition-all group"
  >
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-3xl font-black text-slate-800 mt-1">{value}</p>
    </div>
  </motion.div>
);

/* ── Main Component ───────────────────────────────────────── */
export default function DoctorHome() {
  const [doctor, setDoctor]           = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]         = useState(true);

  const today = todayStr();
  const hour  = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  useEffect(() => {
    const init = async () => {
      try {
        // 1. Get the logged-in doctor profile (backend resolves from JWT email)
        const docRes = await api.get("/api/doctors/me");
        setDoctor(docRes.data);

        // 2. Get all appointments for this doctor
        const apptRes = await api.get("/api/appointments/doctor");
        setAppointments(Array.isArray(apptRes.data) ? apptRes.data : []);
      } catch (err) {
        console.error("DoctorHome init error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Split appointments
  const todayRoster   = appointments.filter(a => a.date === today);
  const incoming      = appointments.filter(a => a.date > today)
                          .sort((a, b) => new Date(a.date) - new Date(b.date));
  const completedCount = todayRoster.filter(a => (a.status || "").toLowerCase() === "completed").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">

      {/* ── WELCOME HEADER ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
          <Activity size={180} />
        </div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full text-[9px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Clinical System Active
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            {greeting},<br />
            <span className="text-indigo-600">Dr. {doctor?.name || "Doctor"}</span>
          </h1>
          <p className="text-slate-400 font-medium max-w-md">
            {doctor?.specialization || "Specialist"} · {todayRoster.length} appointment{todayRoster.length !== 1 ? "s" : ""} scheduled today.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-6 py-3 rounded-2xl text-indigo-600">
            <Stethoscope size={18} />
            <span className="font-black text-sm">{doctor?.specialization || "Specialist"}</span>
          </div>
        </div>
      </motion.div>

      {/* ── STATS ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Calendar}   label="Today's Load"  value={todayRoster.length}    color="bg-indigo-50 text-indigo-600"  delay={0}    />
        <StatCard icon={UserCheck}  label="Completed"     value={completedCount}         color="bg-emerald-50 text-emerald-600" delay={0.05} />
        <StatCard icon={AlertCircle} label="Upcoming"     value={incoming.length}        color="bg-rose-50 text-rose-600"     delay={0.1}  />
        <StatCard icon={TrendingUp} label="Total Booked"  value={appointments.length}    color="bg-blue-50 text-blue-600"     delay={0.15} />
      </div>

      {/* ── MAIN WORKSPACE ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT: ACTIVE ROSTER (today) */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Active Roster</h2>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Today's appointments · {today}</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-widest">
                <Clock size={14} className="text-indigo-500" /> Live
              </div>
            </div>

            <div className="divide-y divide-slate-50">
              {todayRoster.length === 0 ? (
                <div className="p-16 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30">
                  No appointments scheduled for today.
                </div>
              ) : (
                todayRoster.map((a, i) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.06 }}
                    className="p-8 flex items-center justify-between group hover:bg-slate-50/50 transition-all"
                  >
                    <div className="flex items-center gap-6">
                      <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-200 flex items-center justify-center font-black text-xl transition-all shadow-sm">
                        {String(a.patientId || "?").charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-base font-black uppercase tracking-tight text-slate-800">
                          Patient #{a.patientId}
                        </h3>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                            {formatTime(a.time)}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-200" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Appt #{a.id}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${getStatusBadge(a.status)}`}>
                      {a.status || "Booked"}
                    </span>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: INCOMING REQUESTS (future appointments) */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-8"
        >
          <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <div className="space-y-1">
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Incoming Requests</h2>
                <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Future bookings</p>
              </div>
              <span className="bg-indigo-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg shadow-indigo-200">
                {incoming.length}
              </span>
            </div>

            <div className="divide-y divide-slate-50 max-h-[420px] overflow-y-auto">
              {incoming.length === 0 ? (
                <p className="p-10 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  No upcoming requests.
                </p>
              ) : (
                incoming.map((a, i) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="p-6 space-y-3 group hover:bg-slate-50/50 transition-all"
                  >
                    <div>
                      <p className="text-sm font-black text-slate-800 uppercase tracking-tight">
                        Patient #{a.patientId}
                      </p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                        {a.date} · {formatTime(a.time)}
                      </p>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusBadge(a.status)}`}>
                      {a.status || "Booked"}
                    </span>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
