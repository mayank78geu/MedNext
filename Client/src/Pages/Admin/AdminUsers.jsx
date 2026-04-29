import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserCircle, Trash2, Loader2, RefreshCw, Search, ShieldCheck } from "lucide-react";
import { AdminGetAllUsers, AdminDeleteUser } from "../../api/admin.api";
import { toast } from "react-toastify";

const roleBadge = (role) => {
  const map = {
    ADMIN: "bg-violet-500/15 text-violet-300 border border-violet-500/20",
    HOSPITAL: "bg-sky-500/15 text-sky-300 border border-sky-500/20",
    DOCTOR: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20",
    PATIENT: "bg-slate-500/15 text-slate-300 border border-slate-500/20",
  };
  return map[role?.toUpperCase()] || "bg-slate-500/15 text-slate-300";
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await AdminGetAllUsers();
      setUsers(res?.data ?? []);
    } catch {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user account? All linked records may be affected.")) return;
    try {
      await AdminDeleteUser(id);
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck size={20} className="text-rose-400" />
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-tight">All Users</h2>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {users.length} registered account{users.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <button onClick={load} className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
        <input type="text" placeholder="Search by name, email, or role…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0d1526] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
        />
      </div>

      <div className="bg-[#0d1526] border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48"><Loader2 size={28} className="text-rose-500 animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-600">
            <UserCircle size={36} className="mb-3 opacity-30" />
            <p className="text-sm font-bold">No users found</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["ID", "Name", "Email", "Role", ""].map((h) => (
                  <th key={h} className="text-left text-[9px] font-black text-slate-500 uppercase tracking-widest px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                  className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">#{u.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white text-[10px] font-black flex-shrink-0">
                        {u.name?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <span className="text-white font-bold">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${roleBadge(u.role)}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(u.id)} className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all ml-auto">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
