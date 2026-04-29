import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GetPatientAppointments } from "../../api/appointments.api";
import { GetDoctorById } from "../../api/doctors.api";
import {
  CalendarCheck, Search, Pill, FileText, Activity, Plus,
  Calendar, Clock, UserCircle, ArrowRight, Zap, Heart,
  TrendingUp, UploadCloud, Trash2, Download, ChevronRight,
  Stethoscope, Shield
} from "lucide-react";

const medicalDocuments = [
  { id: 1, name: "MRI_Scan_Report.pdf",    type: "Imaging", date: "Jun 10, 2024", size: "4.2 MB" },
  { id: 2, name: "Blood_Test_Results.pdf", type: "Lab",     date: "May 05, 2024", size: "1.1 MB" },
];

const prescriptions = [
  { id: 1, medication: "Amoxicillin", dose: "500mg · Daily",    doctor: "Dr. Sarah Johnson", date: "Jun 11" },
  { id: 2, medication: "Ibuprofen",   dose: "200mg · As needed", doctor: "Dr. Michael Chen", date: "May 06" },
];

const StatCard = ({ icon: Icon, label, value, sub, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white/5 border border-white/8 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/8 hover:border-white/15 transition-all group"
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black text-white leading-none mt-0.5">{value}</p>
      {sub && <p className="text-[10px] text-slate-600 mt-0.5">{sub}</p>}
    </div>
  </motion.div>
);

function PatientDashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [patientName, setPatientName] = useState("Patient");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const raw = payload.sub ? payload.sub.split("@")[0] : "Patient";
        setPatientName(raw.charAt(0).toUpperCase() + raw.slice(1));
      } catch {}
    }

    const fetchAppointments = async () => {
      try {
        const data = await GetPatientAppointments();
        let list = Array.isArray(data) ? data : [];
        list = await Promise.all(list.map(async (app) => {
          if (app.doctorId && !app.doctorName) {
            try {
              const doc = await GetDoctorById(app.doctorId);
              return { ...app, doctorName: doc.name || `Specialist #${app.doctorId}` };
            } catch { return app; }
          }
          return app;
        }));
        setAppointments(list);
      } catch {}
      finally { setLoading(false); }
    };
    fetchAppointments();
  }, []);

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const upcoming = appointments
    .filter(a => new Date(a.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="min-h-full bg-[#060d1f] text-white font-sans">

      {/* ── HERO BANNER ─────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-violet-900/20 to-transparent" />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-8 pb-0">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-400/70 uppercase tracking-widest">Health System Online</span>
              </div>
              <h1 className="text-4xl font-black tracking-tight leading-none">
                {greeting},<br />
                <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-white bg-clip-text text-transparent">
                  {patientName}
                </span>
              </h1>
              <p className="text-slate-400 text-sm font-medium max-w-sm">
                Your health journey is continuously monitored. Here's your clinical overview.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/patient-dashboard/find-doctors")}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/40 hover:-translate-y-0.5"
              >
                <Stethoscope size={15} /> Find Doctors
              </button>
              <button className="flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/10 text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all">
                <Plus size={15} /> Book Appointment
              </button>
            </div>
          </motion.div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pb-8 border-b border-white/5">
            <StatCard icon={CalendarCheck} label="Upcoming" value={upcoming.length} sub="appointments"
              color="bg-gradient-to-br from-indigo-500 to-violet-600" delay={0} />
            <StatCard icon={Pill} label="Active Meds" value={prescriptions.length} sub="prescriptions"
              color="bg-gradient-to-br from-emerald-500 to-teal-600" delay={0.05} />
            <StatCard icon={FileText} label="Documents" value={medicalDocuments.length} sub="in vault"
              color="bg-gradient-to-br from-sky-500 to-blue-600" delay={0.1} />
            <StatCard icon={Heart} label="Health Score" value="94%" sub="excellent"
              color="bg-gradient-to-br from-rose-500 to-pink-600" delay={0.15} />
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────── */}
      <div className="p-8 space-y-8">

        {/* UPCOMING APPOINTMENTS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white/5 border border-white/8 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400">
                <CalendarCheck size={20} />
              </div>
              <div>
                <h2 className="text-base font-black text-white uppercase tracking-tight">Upcoming Sessions</h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Live sync</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/patient-dashboard/appointments")}
              className="flex items-center gap-1.5 text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors"
            >
              View all <ChevronRight size={12} />
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-28">
              <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            </div>
          ) : upcoming.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-28 text-slate-600">
              <CalendarCheck size={32} className="mb-2 opacity-30" />
              <p className="text-xs font-bold">No upcoming appointments</p>
              <button
                onClick={() => navigate("/patient-dashboard/find-doctors")}
                className="mt-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest"
              >
                Book one now →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {upcoming.map((app, i) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="group flex items-center gap-4 bg-white/3 hover:bg-white/8 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-4 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 group-hover:bg-indigo-600/30 flex items-center justify-center text-indigo-400 text-sm font-black transition-all flex-shrink-0">
                    {(app.doctorName || "D").charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-white truncate">
                      {app.doctorName || `Specialist #${app.doctorId}`}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                        <Calendar size={10} className="text-indigo-400" /> {app.date}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                        <Clock size={10} className="text-violet-400" /> {app.time || "TBD"}
                      </span>
                    </div>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* 2-col: Active Meds + Medical Vault */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ACTIVE MEDICATIONS */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white/5 border border-white/8 rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-400">
                  <Pill size={20} />
                </div>
                <div>
                  <h2 className="text-base font-black text-white uppercase tracking-tight">Active Medications</h2>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">{prescriptions.length} current</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/patient-dashboard/prescriptions")}
                className="text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                All <ChevronRight size={12} />
              </button>
            </div>
            <div className="space-y-3">
              {prescriptions.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="group flex items-center gap-4 bg-white/3 hover:bg-emerald-500/5 border border-white/5 hover:border-emerald-500/20 rounded-2xl p-4 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <Pill size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-white">{p.medication}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{p.doctor}</p>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-black px-2.5 py-1 rounded-full border border-emerald-500/20 whitespace-nowrap">
                    {p.dose}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* MEDICAL VAULT */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="bg-white/5 border border-white/8 rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-600/20 rounded-2xl flex items-center justify-center text-sky-400">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="text-base font-black text-white uppercase tracking-tight">Medical Vault</h2>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">End-to-end encrypted</p>
                </div>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 text-[10px] font-black text-sky-400 uppercase tracking-widest hover:text-sky-300 transition-colors"
              >
                <UploadCloud size={12} /> Upload
              </button>
            </div>
            <input type="file" ref={fileInputRef} className="hidden" />
            <div className="space-y-3">
              {medicalDocuments.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="group flex items-center gap-4 bg-white/3 hover:bg-sky-500/5 border border-white/5 hover:border-sky-500/20 rounded-2xl p-4 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-600/20 flex items-center justify-center text-sky-400 flex-shrink-0">
                    <FileText size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-white truncate">{doc.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{doc.type} · {doc.date} · {doc.size}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-sky-400 hover:bg-sky-500/10 transition-all">
                      <Download size={13} />
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Upload drop zone */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full mt-4 border border-dashed border-white/10 hover:border-sky-500/40 rounded-2xl py-5 flex flex-col items-center gap-2 text-slate-600 hover:text-sky-400 transition-all group"
            >
              <UploadCloud size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Drop files to upload</span>
            </button>
          </motion.section>
        </div>

        {/* HEALTH TIPS BANNER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative overflow-hidden bg-gradient-to-r from-indigo-600/20 via-violet-600/10 to-transparent border border-indigo-500/20 rounded-3xl p-6 flex items-center gap-5"
        >
          <div className="w-12 h-12 bg-indigo-600/30 rounded-2xl flex items-center justify-center text-indigo-400 flex-shrink-0">
            <Zap size={22} />
          </div>
          <div>
            <p className="text-sm font-black text-white mb-0.5">Stay on top of your health</p>
            <p className="text-xs text-slate-400">Your next appointment is scheduled. Keep your medical records updated for faster consultations.</p>
          </div>
          <button
            onClick={() => navigate("/patient-dashboard/find-doctors")}
            className="ml-auto flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex-shrink-0 shadow-lg shadow-indigo-900/30"
          >
            Book Now <ArrowRight size={12} />
          </button>
        </motion.div>

      </div>
    </div>
  );
}

export default PatientDashboard;