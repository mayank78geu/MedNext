import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pill, Activity, MessageSquare, CalendarClock, X, User,
  Calendar, Clock, ChevronRight, CheckCircle2, Loader2, FileText, Stethoscope
} from "lucide-react";
import api from "../../api/axios";
import { SavePrescription, GetPrescriptionByAppointment } from "../../api/prescriptions.api";

/* ── helpers ──────────────────────────────────────────────── */
const formatTime = (t) => {
  if (!t) return "TBD";
  const [h, m] = t.split(":");
  const hour = parseInt(h, 10);
  return `${hour > 12 ? hour - 12 : hour || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
};

const statusColor = (s) => {
  switch ((s || "").toLowerCase()) {
    case "booked":    return "bg-indigo-50 text-indigo-600 border-indigo-100";
    case "completed": return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "cancelled": return "bg-rose-50 text-rose-600 border-rose-100";
    default:          return "bg-slate-50 text-slate-500 border-slate-100";
  }
};

/* ── Consultation Modal ────────────────────────────────────── */
function ConsultationModal({ appointment, onClose }) {
  const [patient, setPatient]         = useState(null);
  const [prescription, setPrescription] = useState(null);
  const [form, setForm]               = useState({ medicines: "", tests: "", comments: "", nextVisitDate: "" });
  const [saving, setSaving]           = useState(false);
  const [saved, setSaved]             = useState(false);
  const [error, setError]             = useState("");
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Fetch patient details — patientId in appointments = users.id, so use /user/ lookup
        if (appointment.patientId) {
          try {
            const res = await api.get(`/api/patients/user/${appointment.patientId}`);
            setPatient(res.data);
          } catch { /* patient may not have a profile yet */ }
        }
        // Fetch existing prescription if any
        const existing = await GetPrescriptionByAppointment(appointment.id);
        if (existing) {
          setPrescription(existing);
          setForm({
            medicines:     existing.medicines     || "",
            tests:         existing.tests         || "",
            comments:      existing.comments      || "",
            nextVisitDate: existing.nextVisitDate || "",
          });
        }
      } catch (e) {
        console.error("Modal load error:", e);
      } finally {
        setLoadingData(false);
      }
    };
    load();
  }, [appointment.id, appointment.patientId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.medicines && !form.tests && !form.comments) {
      setError("Please fill at least one field before saving.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await SavePrescription({
        appointmentId: appointment.id,
        patientId:     appointment.patientId,
        medicines:     form.medicines,
        tests:         form.tests,
        comments:      form.comments,
        nextVisitDate: form.nextVisitDate || null,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err?.message || "Failed to save prescription.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 relative overflow-hidden flex-shrink-0">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Stethoscope size={140} />
          </div>
          <div className="relative z-10 flex justify-between items-start">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[9px] font-black text-indigo-200 uppercase tracking-widest border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Consultation — Appt #{appointment.id}
              </div>
              <h2 className="text-3xl font-black tracking-tight">
                {patient ? patient.name : `Patient #${appointment.patientId}`}
              </h2>
              <div className="flex items-center gap-4 text-slate-300 text-sm">
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {appointment.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} /> {formatTime(appointment.time)}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center bg-white/10 rounded-2xl hover:bg-rose-500 transition-all border border-white/10 group"
            >
              <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {loadingData ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={32} className="text-indigo-500 animate-spin" />
            </div>
          ) : (
            <div className="p-8 space-y-8">

              {/* Patient Info */}
              {patient && (
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {[
                    { label: "Name",          value: patient.name },
                    { label: "Age",           value: patient.age ? `${patient.age} yrs` : "—" },
                    { label: "City",          value: patient.city || "—" },
                    { label: "BP Issues",     value: patient.bpIssues === "y" ? "Yes" : patient.bpIssues === "n" ? "No" : "—" },
                    { label: "Sleep Quality", value: patient.sleepQuality || "—" },
                    { label: "Stress Level",  value: patient.stressLevel || "—" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                      <p className="text-sm font-black text-slate-800">{value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Prescription exists banner */}
              {prescription && (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-3.5">
                  <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                  <p className="text-[11px] font-black text-emerald-700 uppercase tracking-widest">
                    Prescription already saved — editing will update it.
                  </p>
                </div>
              )}

              {/* Prescription Form */}
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Medicines */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-widest">
                    <Pill size={14} className="text-indigo-500" /> Prescribed Medicines
                  </label>
                  <textarea
                    name="medicines"
                    rows={3}
                    value={form.medicines}
                    onChange={handleChange}
                    placeholder="e.g. Paracetamol 500mg — 1x morning + 1x night for 5 days"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 resize-none transition-all"
                  />
                </div>

                {/* Tests */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-widest">
                    <Activity size={14} className="text-orange-500" /> Prescribed Tests
                  </label>
                  <textarea
                    name="tests"
                    rows={2}
                    value={form.tests}
                    onChange={handleChange}
                    placeholder="e.g. Complete Blood Count (CBC), Lipid Profile, ECG"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300 resize-none transition-all"
                  />
                </div>

                {/* Comments */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-widest">
                    <MessageSquare size={14} className="text-emerald-500" /> Doctor Comments
                  </label>
                  <textarea
                    name="comments"
                    rows={2}
                    value={form.comments}
                    onChange={handleChange}
                    placeholder="Clinical notes, dietary advice, or follow-up instructions…"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 resize-none transition-all"
                  />
                </div>

                {/* Next Visit */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-widest">
                    <CalendarClock size={14} className="text-violet-500" /> Next Visit Date
                  </label>
                  <input
                    type="date"
                    name="nextVisitDate"
                    value={form.nextVisitDate}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300 transition-all"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-rose-50 border border-rose-100 rounded-2xl px-5 py-3 text-[11px] font-black text-rose-600 uppercase tracking-widest">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-4 bg-white border border-slate-200 text-slate-500 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 hover:border-slate-300 transition-all"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-[2] flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:bg-slate-300 disabled:shadow-none"
                  >
                    {saving ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : saved ? (
                      <><CheckCircle2 size={16} /> Saved!</>
                    ) : (
                      <><FileText size={16} /> {prescription ? "Update Prescription" : "Save Prescription"}</>
                    )}
                  </button>
                </div>
              </form>

            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main PatientView ─────────────────────────────────────── */
export default function PatientView() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [search, setSearch]             = useState("");

  useEffect(() => {
    api.get("/api/appointments/doctor")
      .then(res => setAppointments(Array.isArray(res.data) ? res.data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = appointments.filter(a =>
    String(a.patientId).includes(search) ||
    String(a.id).includes(search) ||
    (a.date || "").includes(search)
  );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Patient Management</h1>
        <p className="text-slate-500 font-medium mt-1">
          Click any appointment to open the consultation panel — prescribe medicines, order tests, and add notes.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by patient ID, appointment ID, or date…"
          className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-4 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all shadow-sm"
        />
      </div>

      {/* Appointment list */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={32} className="text-indigo-500 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
          <User size={48} className="mb-3 opacity-30" />
          <p className="font-black text-sm uppercase tracking-widest">No appointments found</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-4 px-8 py-4 bg-slate-50/70 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <span>Patient</span>
            <span>Date</span>
            <span>Time</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-slate-50">
            {filtered.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSelectedAppt(a)}
                className="grid grid-cols-4 items-center px-8 py-5 group hover:bg-indigo-50/50 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-500 flex items-center justify-center font-black text-sm transition-all">
                    {String(a.patientId || "?").charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">Patient #{a.patientId}</p>
                    <p className="text-[10px] text-slate-400 font-bold">Appt #{a.id}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-600">{a.date}</span>
                <span className="text-sm font-bold text-indigo-600">{formatTime(a.time)}</span>
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColor(a.status)}`}>
                    {a.status || "Booked"}
                  </span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedAppt && (
          <ConsultationModal
            appointment={selectedAppt}
            onClose={() => setSelectedAppt(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
