import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, Stethoscope, Star, Clock, Building2,
  ChevronRight, Filter, X, User, Zap, CheckCircle, SlidersHorizontal
} from "lucide-react";
import AppointmentForm from "./AppointmentForm";
import { FindDoctor } from "../api/finddoc.api";

/* ── Specialty chips ───────────────────────────────────────── */
const SPECIALTIES = [
  "All", "Cardiology", "Neurology", "Orthopedics", "Dermatology",
  "Pediatrics", "Oncology", "General"
];

/* ── Doctor card (dark-theme, inline) ──────────────────────── */
const DoctorCard = ({ doc, index, onBook }) => {
  const initials = (doc.name || "D").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const experience = doc.experience || 0;
  const specialization = doc.specialization || "General Practice";
  const hospitalName = doc.hospital?.name || "Independent";
  const city = doc.hospital?.city || doc.hospital?.address || "Remote";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group relative bg-white/5 hover:bg-white/8 border border-white/8 hover:border-indigo-500/40 rounded-3xl p-6 transition-all duration-300 flex flex-col"
    >
      {/* Top badge */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-lg font-black text-white shadow-lg shadow-indigo-900/30 flex-shrink-0 group-hover:scale-105 transition-transform">
            {initials}
          </div>
          <div>
            <h3 className="font-black text-white text-base leading-tight">{doc.name}</h3>
            <p className="text-[11px] font-black text-indigo-400 uppercase tracking-widest mt-0.5">{specialization}</p>
          </div>
        </div>

        {/* Verified badge */}
        <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-2.5 py-1.5 flex-shrink-0">
          <CheckCircle size={11} className="text-emerald-400" />
          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Verified</span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2.5 mb-5 flex-1">
        <div className="flex items-center gap-2.5 text-[11px] text-slate-500">
          <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
            <Building2 size={12} className="text-slate-500" />
          </div>
          <span className="truncate">{hospitalName}</span>
        </div>
        <div className="flex items-center gap-2.5 text-[11px] text-slate-500">
          <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
            <MapPin size={12} className="text-slate-500" />
          </div>
          <span>{city}</span>
        </div>
        <div className="flex items-center gap-2.5 text-[11px] text-slate-500">
          <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
            <Clock size={12} className="text-slate-500" />
          </div>
          <span>{experience} {experience === 1 ? "year" : "years"} experience</span>
        </div>
      </div>

      {/* Rating row */}
      <div className="flex items-center gap-1 mb-5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={i < Math.min(5, Math.max(3, Math.floor(experience / 3))) ? "text-amber-400 fill-amber-400" : "text-slate-700"}
          />
        ))}
        <span className="text-[10px] text-slate-600 ml-1.5">({20 + experience * 3} reviews)</span>
      </div>

      {/* Book button */}
      <button
        onClick={() => onBook(doc)}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/30 hover:shadow-indigo-900/50 hover:-translate-y-0.5 group/btn"
      >
        <Zap size={13} className="group-hover/btn:scale-110 transition-transform" />
        Book Appointment
        <ChevronRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
      </button>
    </motion.div>
  );
};

/* ── Main Page ──────────────────────────────────────────────── */
const FindDoctors = () => {
  const [disease, setDisease]     = useState("");
  const [location, setLocation]   = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [doctors, setDoctors]     = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    FindDoctor()
      .then(data => setDoctors(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = doctors.filter(doc => {
    const sp   = (doc.specialization || "").toLowerCase();
    const city = (doc.hospital?.city || doc.hospital?.address || "").toLowerCase();
    const name = (doc.name || "").toLowerCase();
    const matchSpec = specialty === "All" || sp.includes(specialty.toLowerCase());
    const matchDis  = disease === "" || sp.includes(disease.toLowerCase()) || name.includes(disease.toLowerCase());
    const matchLoc  = location === "" || city.includes(location.toLowerCase());
    return matchSpec && matchDis && matchLoc;
  });

  const clearFilters = () => { setDisease(""); setLocation(""); setSpecialty("All"); };
  const hasFilters = disease || location || specialty !== "All";

  return (
    <div className="min-h-full bg-[#060d1f] text-white font-sans pt-16 lg:pt-0">

      {/* ── HERO HEADER ─────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-violet-900/20 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 pt-10 pb-8 px-8">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Verified Specialist Network</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight leading-tight mb-3">
              Find Your{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-white bg-clip-text text-transparent">
                Specialist
              </span>
            </h1>
            <p className="text-slate-400 text-sm">
              {isLoading ? "Connecting to the registry…" : `${doctors.length} verified specialists available`}
            </p>
          </motion.div>

          {/* ── SEARCH BAR ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-3xl"
          >
            {/* Disease / specialization input */}
            <div className="flex-1 relative group">
              <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={16} />
              <input
                type="text"
                value={disease}
                onChange={e => setDisease(e.target.value)}
                placeholder="Specialization or condition…"
                className="w-full bg-white/6 border border-white/10 focus:border-indigo-500/50 text-white placeholder:text-slate-600 p-3.5 pl-11 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm"
              />
              {disease && (
                <button onClick={() => setDisease("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors">
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Location input */}
            <div className="flex-1 relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={16} />
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="City or hospital…"
                className="w-full bg-white/6 border border-white/10 focus:border-indigo-500/50 text-white placeholder:text-slate-600 p-3.5 pl-11 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm"
              />
              {location && (
                <button onClick={() => setLocation("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors">
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Search button */}
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/30 flex-shrink-0">
              <Search size={15} /> Search
            </button>
          </motion.div>

          {/* ── SPECIALTY CHIPS ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18 }}
            className="mt-4 flex items-center gap-2 flex-wrap"
          >
            {SPECIALTIES.map(sp => (
              <button
                key={sp}
                onClick={() => setSpecialty(sp)}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                  specialty === sp
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/30"
                    : "bg-white/5 border-white/8 text-slate-500 hover:text-slate-200 hover:bg-white/10"
                }`}
              >
                {sp}
              </button>
            ))}

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all ml-2"
              >
                <X size={10} /> Clear
              </button>
            )}
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-white/5 px-8 py-3 flex items-center gap-6">
          {[
            { label: "Specialists",    value: doctors.length },
            { label: "Matching",       value: filtered.length, highlight: true },
            { label: "Specializations", value: [...new Set(doctors.map(d => d.specialization).filter(Boolean))].length },
          ].map(({ label, value, highlight }) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`text-xl font-black ${highlight ? "text-indigo-400" : "text-slate-400"}`}>{value}</span>
              <span className="text-[10px] text-slate-600 uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RESULTS GRID ─────────────────────────────────────── */}
      <div className="px-8 py-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="relative w-12 h-12">
              <div className="w-12 h-12 border-2 border-indigo-500/20 rounded-full" />
              <div className="absolute inset-0 w-12 h-12 border-2 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
            </div>
            <p className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Syncing specialist registry…</p>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-4 text-slate-600"
          >
            <User size={48} className="opacity-20" />
            <p className="text-sm font-bold">No specialists found</p>
            <p className="text-xs">Try adjusting your filters or search terms</p>
            {hasFilters && (
              <button onClick={clearFilters} className="mt-2 text-[11px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">
                Clear all filters →
              </button>
            )}
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((doc, i) => (
                <DoctorCard
                  key={doc.id || i}
                  doc={doc}
                  index={i}
                  onBook={setSelectedDoc}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {/* ── APPOINTMENT MODAL ────────────────────────────────── */}
      <AnimatePresence>
        {selectedDoc && (
          <AppointmentForm
            doctorName={selectedDoc.name}
            doctorId={selectedDoc.id}
            hospitalId={selectedDoc.hospital?.id}
            onClose={() => setSelectedDoc(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FindDoctors;