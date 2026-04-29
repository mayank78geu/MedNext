import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Stethoscope,
  Users,
  CalendarCheck,
  TrendingUp,
  Activity,
  ShieldCheck,
} from "lucide-react";
import {
  AdminGetAllHospitals,
  AdminGetAllDoctors,
  AdminGetAllPatients,
  AdminGetAllAppointments,
  AdminGetAllUsers,
} from "../../api/admin.api";

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-[#0d1526] border border-white/5 rounded-2xl p-6 flex items-center gap-5 hover:border-white/10 transition-all group"
  >
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}
    >
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-3xl font-black text-white">{value ?? "—"}</p>
    </div>
  </motion.div>
);

const AdminOverview = () => {
  const [stats, setStats] = useState({
    hospitals: null,
    doctors: null,
    patients: null,
    appointments: null,
    users: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [h, d, p, a, u] = await Promise.allSettled([
          AdminGetAllHospitals(),
          AdminGetAllDoctors(),
          AdminGetAllPatients(),
          AdminGetAllAppointments(),
          AdminGetAllUsers(),
        ]);

        setStats({
          hospitals: h.status === "fulfilled" ? (h.value?.data?.length ?? 0) : "?",
          doctors: d.status === "fulfilled" ? (Array.isArray(d.value) ? d.value.length : d.value?.data?.length ?? 0) : "?",
          patients: p.status === "fulfilled" ? (Array.isArray(p.value) ? p.value.length : p.value?.data?.length ?? 0) : "?",
          appointments: a.status === "fulfilled" ? (Array.isArray(a.value) ? a.value.length : a.value?.data?.length ?? 0) : "?",
          users: u.status === "fulfilled" ? (u.value?.data?.length ?? 0) : "?",
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const statCards = [
    { icon: Building2, label: "Total Hospitals", value: stats.hospitals, color: "bg-gradient-to-br from-violet-600 to-indigo-700", delay: 0 },
    { icon: Stethoscope, label: "Total Doctors", value: stats.doctors, color: "bg-gradient-to-br from-sky-500 to-blue-700", delay: 0.05 },
    { icon: Users, label: "Total Patients", value: stats.patients, color: "bg-gradient-to-br from-emerald-500 to-teal-700", delay: 0.1 },
    { icon: CalendarCheck, label: "Appointments", value: stats.appointments, color: "bg-gradient-to-br from-amber-500 to-orange-600", delay: 0.15 },
    { icon: ShieldCheck, label: "Registered Users", value: stats.users, color: "bg-gradient-to-br from-rose-500 to-pink-700", delay: 0.2 },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-1">
          <Activity size={20} className="text-violet-400" />
          <h2 className="text-xl font-black text-white uppercase tracking-tight">
            System Overview
          </h2>
        </div>
        <p className="text-sm text-slate-500">
          Real-time snapshot of all MedNext entities.
        </p>
      </motion.div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-[#0d1526] border border-white/5 rounded-2xl p-6 h-28 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {statCards.map((c) => (
            <StatCard key={c.label} {...c} />
          ))}
        </div>
      )}

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-violet-600/10 border border-violet-500/20 rounded-2xl p-6 flex items-center gap-4"
      >
        <TrendingUp size={28} className="text-violet-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-black text-white mb-0.5">
            Admin Panel Active
          </p>
          <p className="text-xs text-slate-400">
            Use the sidebar to create hospital accounts, register doctors, and
            view all system records. All operations are reflected immediately in
            the database.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOverview;
