import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Search, X, Pill, Calendar, User,
  Activity, MessageSquare, CalendarClock, ChevronRight,
  Loader2, Stethoscope, Clock
} from "lucide-react";
import { GetMyPrescriptions } from "../../api/prescriptions.api";
import api from "../../api/axios";

/* ── helpers ──────────────────────────────────────────────── */
const formatTime = (t) => {
  if (!t) return "";
  const [h, m] = t.split(":");
  const hour = parseInt(h, 10);
  return `${hour > 12 ? hour - 12 : hour || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
};

/* ── Detail Side-panel ─────────────────────────────────────── */
function DetailPanel({ record, onClose }) {
  const { prescription, doctor, appointment } = record;

  const Row = ({ icon: Icon, color, title, value }) => {
    if (!value) return null;
    return (
      <div className="flex gap-4 items-start">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{title}</p>
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{value}</p>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 32 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-[9999] flex items-center justify-end"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="relative z-10 w-full max-w-md h-full bg-[#0d1627] border-l border-white/10 flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-900/60 to-teal-900/40 border-b border-white/10 p-8 relative overflow-hidden flex-shrink-0">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Stethoscope size={100} />
          </div>
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full text-[9px] font-black text-emerald-300 uppercase tracking-widest border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Prescription #{prescription.id}
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 border border-white/10 rounded-xl text-slate-400 transition-all group"
              >
                <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {doctor ? `Dr. ${doctor.name}` : `Prescription #${prescription.id}`}
            </h2>
            {doctor?.specialization && (
              <p className="text-emerald-300/70 text-sm font-medium">{doctor.specialization}</p>
            )}
            <div className="flex flex-wrap gap-3 text-slate-400 text-[11px] font-bold pt-1">
              {appointment?.date && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} /> {appointment.date}
                </span>
              )}
              {appointment?.time && (
                <span className="flex items-center gap-1.5">
                  <Clock size={12} /> {formatTime(appointment.time)}
                </span>
              )}
              {prescription.nextVisitDate && (
                <span className="flex items-center gap-1.5 text-teal-400">
                  <CalendarClock size={12} /> Follow-up: {prescription.nextVisitDate}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-7">
          <Row
            icon={Pill}
            color="bg-indigo-500/15 text-indigo-400"
            title="Prescribed Medicines"
            value={prescription.medicines}
          />
          {prescription.medicines && prescription.tests && <div className="h-px bg-white/5" />}
          <Row
            icon={Activity}
            color="bg-orange-500/15 text-orange-400"
            title="Tests Ordered"
            value={prescription.tests}
          />
          {prescription.tests && prescription.comments && <div className="h-px bg-white/5" />}
          <Row
            icon={MessageSquare}
            color="bg-emerald-500/15 text-emerald-400"
            title="Doctor's Comments"
            value={prescription.comments}
          />

          {!prescription.medicines && !prescription.tests && !prescription.comments && (
            <div className="text-center py-12 text-slate-600">
              <FileText size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-bold">No details recorded</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Page ─────────────────────────────────────────────── */
const Prescriptions = () => {
  const [records, setRecords]     = useState([]);   // enriched: { prescription, doctor, appointment }
  const [selected, setSelected]   = useState(null);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        // 1. Get all prescriptions for the logged-in patient
        const rxList = await GetMyPrescriptions();
        if (!rxList.length) { setLoading(false); return; }

        // 2. Get patient's appointments (to match appointment dates/times)
        let apptList = [];
        try {
          const res = await api.get("/api/appointments/patient");
          apptList = Array.isArray(res.data) ? res.data : [];
        } catch { /* ignore */ }

        // 3. Get doctor details for each unique doctorId
        const uniqueDoctorIds = [...new Set(rxList.map(r => r.doctorId).filter(Boolean))];
        const doctorMap = {};
        await Promise.all(uniqueDoctorIds.map(async (did) => {
          try {
            const res = await api.get(`/api/doctors/${did}`);
            doctorMap[did] = res.data;
          } catch { /* ignore */ }
        }));

        // 4. Enrich each prescription
        const enriched = rxList.map(rx => ({
          prescription: rx,
          doctor:       doctorMap[rx.doctorId] || null,
          appointment:  apptList.find(a => a.id === rx.appointmentId) || null,
        })).sort((a, b) => {
          // Newest appointment first
          const da = a.appointment?.date || "";
          const db = b.appointment?.date || "";
          return db.localeCompare(da);
        });

        setRecords(enriched);
      } catch (err) {
        console.error("Prescriptions load error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = records.filter(({ prescription: rx, doctor }) => {
    const q = search.toLowerCase();
    return (
      (doctor?.name || "").toLowerCase().includes(q) ||
      (rx.medicines || "").toLowerCase().includes(q) ||
      (rx.tests || "").toLowerCase().includes(q) ||
      (rx.comments || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-full bg-[#060d1f] text-white font-sans">
      <div className="p-8 space-y-8">

        {/* ── HEADER ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">
              My{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Prescriptions
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {loading ? "Loading your records…" : `${records.length} completed consultation${records.length !== 1 ? "s" : ""} with prescriptions`}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live Records</span>
          </div>
        </motion.div>

        {/* ── STATS ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            {
              label: "Prescriptions",
              value: records.length,
              icon: FileText,
              color: "text-emerald-400 bg-emerald-500/10",
            },
            {
              label: "Medicines",
              value: records.filter(r => r.prescription.medicines).length,
              icon: Pill,
              color: "text-indigo-400 bg-indigo-500/10",
            },
            {
              label: "Doctors",
              value: [...new Set(records.map(r => r.prescription.doctorId))].length,
              icon: User,
              color: "text-violet-400 bg-violet-500/10",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white/5 border border-white/8 rounded-2xl p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={16} />
              </div>
              <div>
                <p className="text-xl font-black text-white">{value}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── SEARCH ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-400 transition-colors" size={16} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by doctor, medicine, or test…"
              className="w-full bg-white/5 border border-white/8 focus:border-emerald-500/40 text-white placeholder:text-slate-600 p-4 pl-11 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </motion.div>

        {/* ── LIST ────────────────────────────────────────── */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-3">
              <Loader2 size={28} className="text-emerald-500 animate-spin" />
              <p className="text-[10px] text-slate-600 uppercase tracking-widest font-black">
                Loading records…
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 bg-white/3 border border-white/8 rounded-3xl text-slate-600 space-y-3"
            >
              <FileText size={40} className="opacity-20" />
              <p className="text-sm font-bold">
                {search ? "No prescriptions match your search" : "No prescriptions yet — appointments with prescriptions will appear here"}
              </p>
              {search && (
                <button onClick={() => setSearch("")} className="text-[10px] text-emerald-500 hover:underline font-black uppercase tracking-widest">
                  Clear search
                </button>
              )}
            </motion.div>
          ) : (
            <AnimatePresence>
              {filtered.map(({ prescription: rx, doctor, appointment }, i) => (
                <motion.div
                  key={rx.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected({ prescription: rx, doctor, appointment })}
                  className="group bg-white/5 hover:bg-white/8 border border-white/8 hover:border-emerald-500/30 rounded-2xl p-6 cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:bg-emerald-600/30 transition-colors">
                        <Stethoscope size={20} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <p className="font-black text-white text-sm">
                          {doctor ? `Dr. ${doctor.name}` : `Prescription #${rx.id}`}
                        </p>
                        {doctor?.specialization && (
                          <p className="text-[10px] font-bold text-emerald-400/70 uppercase tracking-widest">
                            {doctor.specialization}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 font-bold">
                          {appointment?.date && (
                            <span className="flex items-center gap-1">
                              <Calendar size={10} /> {appointment.date}
                            </span>
                          )}
                          {appointment?.time && (
                            <span className="flex items-center gap-1">
                              <Clock size={10} /> {formatTime(appointment.time)}
                            </span>
                          )}
                          {rx.nextVisitDate && (
                            <span className="flex items-center gap-1 text-teal-400/80">
                              <CalendarClock size={10} /> Follow-up: {rx.nextVisitDate}
                            </span>
                          )}
                        </div>

                        {/* Medicine tags */}
                        {rx.medicines && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {rx.medicines.split(",").slice(0, 3).map((med, mi) => (
                              <span
                                key={mi}
                                className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-black px-2.5 py-1 rounded-full"
                              >
                                <Pill size={9} /> {med.trim().split(" ")[0]}
                              </span>
                            ))}
                            {rx.medicines.split(",").length > 3 && (
                              <span className="text-[10px] font-black text-slate-600 px-2 py-1">
                                +{rx.medicines.split(",").length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        {/* Comment snippet */}
                        {rx.comments && (
                          <p className="text-[11px] text-slate-500 italic truncate">
                            📋 {rx.comments}
                          </p>
                        )}
                      </div>
                    </div>

                    <ChevronRight
                      size={16}
                      className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* ── DETAIL PANEL ────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <DetailPanel
            record={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Prescriptions;
