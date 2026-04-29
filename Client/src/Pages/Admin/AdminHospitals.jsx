import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Plus, Trash2, X, Loader2, RefreshCw, MapPin, Search,
} from "lucide-react";
import {
  AdminGetAllHospitals,
  AdminCreateHospital,
  AdminDeleteHospital,
} from "../../api/admin.api";
import { toast } from "react-toastify";

/* ── small reusable modal ───────────────────────────────────── */
const Modal = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="bg-[#0d1526] border border-white/10 rounded-2xl p-8 w-full max-w-lg shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-black text-white uppercase tracking-tight">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={16} />
              </button>
            </div>
            {children}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

/* ── field helper ───────────────────────────────────────────── */
const Field = ({ label, ...props }) => (
  <div>
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
      {label}
    </label>
    <input
      {...props}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
    />
  </div>
);

/* ══════════════════════════════════════════════════════════════ */
const AdminHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "", email: "", password: "", address: "", city: "",
  });

  const load = async () => {
    setLoading(true);
    try {
      const res = await AdminGetAllHospitals();
      setHospitals(res?.data ?? []);
    } catch {
      toast.error("Failed to fetch hospitals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Name, email and password are required");
      return;
    }
    setCreating(true);
    try {
      await AdminCreateHospital(form);
      toast.success("Hospital account created!");
      setShowModal(false);
      setForm({ name: "", email: "", password: "", address: "", city: "" });
      load();
    } catch (err) {
      toast.error(err?.message || "Failed to create hospital");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hospital? This cannot be undone.")) return;
    try {
      await AdminDeleteHospital(id);
      toast.success("Hospital deleted");
      setHospitals((prev) => prev.filter((h) => h.id !== id));
    } catch {
      toast.error("Failed to delete hospital");
    }
  };

  const filtered = hospitals.filter(
    (h) =>
      h.name?.toLowerCase().includes(search.toLowerCase()) ||
      h.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Building2 size={20} className="text-violet-400" />
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-tight">
              Hospitals
            </h2>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {hospitals.length} registered hospital{hospitals.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={load}
            className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <RefreshCw size={16} />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-black uppercase tracking-widest px-5 py-3 rounded-xl transition-all shadow-lg shadow-violet-900/30"
          >
            <Plus size={15} />
            Add Hospital
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
        <input
          type="text"
          placeholder="Search by name or city…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0d1526] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-[#0d1526] border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 size={28} className="text-violet-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-600">
            <Building2 size={36} className="mb-3 opacity-30" />
            <p className="text-sm font-bold">No hospitals found</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-[9px] font-black text-slate-500 uppercase tracking-widest px-6 py-4">
                  ID
                </th>
                <th className="text-left text-[9px] font-black text-slate-500 uppercase tracking-widest px-6 py-4">
                  Name
                </th>
                <th className="text-left text-[9px] font-black text-slate-500 uppercase tracking-widest px-6 py-4">
                  Address
                </th>
                <th className="text-left text-[9px] font-black text-slate-500 uppercase tracking-widest px-6 py-4">
                  City
                </th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((h, i) => (
                <motion.tr
                  key={h.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
                >
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">#{h.id}</td>
                  <td className="px-6 py-4 text-white font-bold">{h.name}</td>
                  <td className="px-6 py-4 text-slate-400 flex items-center gap-1.5">
                    {h.address ? (
                      <>
                        <MapPin size={12} className="text-slate-600" />
                        {h.address}
                      </>
                    ) : (
                      <span className="text-slate-600 italic">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-400">{h.city || <span className="text-slate-600 italic">—</span>}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(h.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all ml-auto"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create Hospital Account">
        <form onSubmit={handleCreate} className="space-y-4">
          <Field
            label="Hospital Name *"
            type="text"
            placeholder="City General Hospital"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Field
            label="Login Email *"
            type="email"
            placeholder="admin@hospital.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Field
            label="Password *"
            type="password"
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Address"
              type="text"
              placeholder="123 Main St"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <Field
              label="City"
              type="text"
              placeholder="Dehradun"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
          <button
            type="submit"
            disabled={creating}
            className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[11px] font-black uppercase tracking-widest py-3.5 rounded-xl transition-all mt-2"
          >
            {creating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            {creating ? "Creating…" : "Create Hospital"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminHospitals;
