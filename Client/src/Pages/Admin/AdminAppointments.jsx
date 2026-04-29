import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Loader2, RefreshCw, Search } from "lucide-react";
import { AdminGetAllAppointments } from "../../api/admin.api";
import { toast } from "react-toastify";

const statusBadge = (status) => {
  const map = {
    PENDING: "bg-amber-500/10 text-amber-300",
    CONFIRMED: "bg-emerald-500/10 text-emerald-300",
    CANCELLED: "bg-red-500/10 text-red-300",
    COMPLETED: "bg-sky-500/10 text-sky-300",
  };
  return map[status?.toUpperCase()] || "bg-slate-500/10 text-slate-300";
};

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await AdminGetAllAppointments();
      setAppointments(Array.isArray(res) ? res : res?.data ?? []);
    } catch {
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = appointments.filter(
    (a) =>
      String(a.id).includes(search) ||
      String(a.patientId).includes(search) ||
      String(a.doctorId).includes(search) ||
      a.status?.toLowerCase().includes(search.toLowerCase()) ||
      a.date?.includes(search)
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CalendarCheck size={20} className="text-amber-400" />
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-tight">Appointments</h2>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {appointments.length} total appointment{appointments.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <button onClick={load} className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
        <input type="text" placeholder="Search by ID, date, status…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0d1526] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
        />
      </div>

      <div className="bg-[#0d1526] border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48"><Loader2 size={28} className="text-amber-500 animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-600">
            <CalendarCheck size={36} className="mb-3 opacity-30" />
            <p className="text-sm font-bold">No appointments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["ID", "Patient ID", "Doctor ID", "Hospital ID", "Date", "Time", "Status", "Reason"].map((h) => (
                    <th key={h} className="text-left text-[9px] font-black text-slate-500 uppercase tracking-widest px-6 py-4 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, i) => (
                  <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.025 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">#{a.id}</td>
                    <td className="px-6 py-4 text-slate-400">P-{a.patientId}</td>
                    <td className="px-6 py-4 text-slate-400">D-{a.doctorId}</td>
                    <td className="px-6 py-4 text-slate-400">H-{a.hospitalId || "—"}</td>
                    <td className="px-6 py-4 text-white font-bold whitespace-nowrap">{a.date || "—"}</td>
                    <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{a.time || a.appointmentTime || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${statusBadge(a.status)}`}>
                        {a.status || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 max-w-[160px] truncate">{a.reason || "—"}</td>
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

export default AdminAppointments;
