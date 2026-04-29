import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Trash2, Loader2, RefreshCw, Search } from "lucide-react";
import { AdminGetAllPatients, AdminDeletePatient } from "../../api/admin.api";
import { toast } from "react-toastify";

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await AdminGetAllPatients();
      setPatients(Array.isArray(res) ? res : res?.data ?? []);
    } catch {
      toast.error("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this patient record?")) return;
    try {
      await AdminDeletePatient(id);
      toast.success("Patient deleted");
      setPatients((prev) => prev.filter((p) => p.id !== id));
    } catch {
      toast.error("Failed to delete patient");
    }
  };

  const filtered = patients.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.bloodGroup?.toLowerCase().includes(search.toLowerCase()) ||
      p.gender?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Users size={20} className="text-emerald-400" />
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-tight">Patients</h2>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {patients.length} registered patient{patients.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <button onClick={load} className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
        <input type="text" placeholder="Search by name, blood group, gender…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0d1526] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-[#0d1526] border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48"><Loader2 size={28} className="text-emerald-500 animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-600">
            <Users size={36} className="mb-3 opacity-30" />
            <p className="text-sm font-bold">No patients found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["ID", "Name", "DOB", "Gender", "Blood Group", "Phone", ""].map((h) => (
                    <th key={h} className="text-left text-[9px] font-black text-slate-500 uppercase tracking-widest px-6 py-4 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.025 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">#{p.id}</td>
                    <td className="px-6 py-4 text-white font-bold whitespace-nowrap">{p.name || "—"}</td>
                    <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{p.dateOfBirth || "—"}</td>
                    <td className="px-6 py-4">
                      {p.gender ? (
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${p.gender === "Male" ? "bg-blue-500/10 text-blue-300" : p.gender === "Female" ? "bg-pink-500/10 text-pink-300" : "bg-slate-500/10 text-slate-300"}`}>
                          {p.gender}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-6 py-4">
                      {p.bloodGroup ? (
                        <span className="bg-red-500/10 text-red-300 text-[10px] font-bold px-3 py-1 rounded-full">{p.bloodGroup}</span>
                      ) : "—"}
                    </td>
                    <td className="px-6 py-4 text-slate-400">{p.phone || "—"}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(p.id)} className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all ml-auto">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPatients;
