import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ChevronRight, FileText, Activity,
  MessageSquare, Pill, Calendar, Clock, CalendarClock, Loader2, User
} from "lucide-react";
import { GetDoctorPrescriptions } from "../../api/prescriptions.api";
import api from "../../api/axios";

/* ── helpers ──────────────────────────────────────────────── */
const formatTime = (t) => {
  if (!t) return "TBD";
  const [h, m] = t.split(":");
  const hour = parseInt(h, 10);
  return `${hour > 12 ? hour - 12 : hour || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
};

/* ── Detail panel ─────────────────────────────────────────── */
function DetailPanel({ record }) {
  if (!record) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-16 min-h-[400px]">
        <FileText size={64} className="mb-4" />
        <p className="text-sm font-black uppercase tracking-widest text-slate-400">
          Select a record to view details
        </p>
      </div>
    );
  }

  const { prescription, patient, appointment } = record;

  const Detail = ({ icon: Icon, color, title, value }) => (
    <div className="flex gap-5 items-start">
      <div className={`w-11 h-11 ${color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</h3>
        <p className="text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap">
          {value || <span className="text-slate-300 italic">Not recorded</span>}
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      key={prescription.id}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <FileText size={120} />
        </div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[9px] font-black text-indigo-200 uppercase tracking-widest border border-white/10">
            Prescription #{prescription.id}
          </div>
          <h2 className="text-3xl font-black tracking-tight">
            {patient?.name || `Patient #${prescription.patientId}`}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm mt-2">
            {appointment && (
              <>
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {appointment.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} /> {formatTime(appointment.time)}</span>
              </>
            )}
            {prescription.nextVisitDate && (
              <span className="flex items-center gap-1.5 text-emerald-300">
                <CalendarClock size={14} /> Next: {prescription.nextVisitDate}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Patient snapshot */}
      {patient && (
        <div className="grid grid-cols-3 gap-4 bg-slate-50/70 border-b border-slate-100 px-8 py-5">
          {[
            { label: "Age",    value: patient.age ? `${patient.age} yrs` : "—" },
            { label: "City",   value: patient.city || "—" },
            { label: "BP",     value: patient.bpIssues === "y" ? "Issues" : "Normal" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
              <p className="text-sm font-black text-slate-800 mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-8 space-y-7">
        <div className="w-full h-px bg-slate-100" />
        <Detail
          icon={Pill}
          color="bg-indigo-50 text-indigo-600"
          title="Prescribed Medicines"
          value={prescription.medicines}
        />
        <div className="w-full h-px bg-slate-100" />
        <Detail
          icon={Activity}
          color="bg-orange-50 text-orange-500"
          title="Tests Advised"
          value={prescription.tests}
        />
        <div className="w-full h-px bg-slate-100" />
        <Detail
          icon={MessageSquare}
          color="bg-emerald-50 text-emerald-600"
          title="Doctor's Comments"
          value={prescription.comments}
        />
      </div>
    </motion.div>
  );
}

/* ── Main History Page ────────────────────────────────────── */
export default function History() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments]   = useState([]);
  const [patients, setPatients]           = useState({});   // patientId → patient object
  const [loading, setLoading]             = useState(true);
  const [selected, setSelected]           = useState(null);
  const [search, setSearch]               = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        // Fetch prescriptions + appointments in parallel
        const [rxList, apptList] = await Promise.all([
          GetDoctorPrescriptions(),
          api.get("/api/appointments/doctor").then(r => Array.isArray(r.data) ? r.data : []),
        ]);
        setPrescriptions(rxList);
        setAppointments(apptList);

        // Fetch patient details — patientId = users.id, so use /user/ lookup
        const uniquePatientIds = [...new Set(rxList.map(p => p.patientId).filter(Boolean))];
        const patientMap = {};
        await Promise.all(uniquePatientIds.map(async (pid) => {
          try {
            const res = await api.get(`/api/patients/user/${pid}`);
            patientMap[pid] = res.data;
          } catch { /* patient may not have a profile yet */ }
        }));
        setPatients(patientMap);
      } catch (err) {
        console.error("History load error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Build enriched records: prescription + patient + appointment
  const records = prescriptions
    .map(rx => ({
      prescription: rx,
      patient:      patients[rx.patientId] || null,
      appointment:  appointments.find(a => a.id === rx.appointmentId) || null,
    }))
    // Sort newest first by appointment date
    .sort((a, b) => {
      const da = a.appointment?.date || "";
      const db = b.appointment?.date || "";
      return db.localeCompare(da);
    });

  const filtered = records.filter(r => {
    const name  = (r.patient?.name || `Patient #${r.prescription.patientId}`).toLowerCase();
    const date  = r.appointment?.date || "";
    const rx    = (r.prescription.medicines + r.prescription.tests + r.prescription.comments).toLowerCase();
    const q     = search.toLowerCase();
    return name.includes(q) || date.includes(q) || rx.includes(q);
  });

  const selectedRecord = selected
    ? filtered.find(r => r.prescription.id === selected)
    : null;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* ── LEFT: HISTORY LIST ─────────────────────────── */}
        <div className="lg:w-2/5 flex flex-col gap-6">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Clinical History</h1>
            <p className="text-slate-500 font-medium mt-1">Past consultations with prescriptions.</p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search patient, date, or medication…"
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-4 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all shadow-sm"
            />
          </div>

          {/* List */}
          <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 size={28} className="text-indigo-500 animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-10 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {search ? "No records match your search." : "No consultation records yet."}
              </div>
            ) : (
              <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto">
                {filtered.map(({ prescription: rx, patient, appointment }, i) => {
                  const isSelected = selected === rx.id;
                  const name = patient?.name || `Patient #${rx.patientId}`;
                  const date = appointment?.date || "—";

                  return (
                    <motion.div
                      key={rx.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => setSelected(isSelected ? null : rx.id)}
                      className={`p-6 cursor-pointer flex justify-between items-center group transition-all border-l-4 ${
                        isSelected
                          ? "bg-indigo-50/70 border-indigo-500"
                          : "border-transparent hover:bg-slate-50/70 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all ${
                          isSelected
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                        }`}>
                          {name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-sm">{name}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                            {date}
                            {appointment?.time ? ` · ${formatTime(appointment.time)}` : ""}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        size={16}
                        className={`transition-all ${
                          isSelected
                            ? "text-indigo-500 rotate-90"
                            : "text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-0.5"
                        }`}
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: DETAIL VIEW ──────────────────────────── */}
        <div className="lg:flex-1">
          <AnimatePresence mode="wait">
            <DetailPanel key={selected || "empty"} record={selectedRecord} />
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
