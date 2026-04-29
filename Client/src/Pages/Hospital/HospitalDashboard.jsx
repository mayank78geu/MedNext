import React, { useState, useEffect } from "react";
import {
  Users,
  Activity,
  Plus,
  TrendingUp,
  ArrowRight,
  Stethoscope,
  AlertTriangle,
  Trash2,
  CalendarCheck
} from "lucide-react";
import { GetUserByEmail } from "../../api/users.api.js";
import { GetHospitalByUserId } from "../../api/hospitals.api.js";
import { GetDoctorsByHospitalId } from "../../api/doctors.api.js";
import { GetAppointmentsByHospitalId } from "../../api/appointments.api.js";

export default function HospitalDashboard() {
  const [doctorsList, setDoctorsList] = useState([]);
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const email = payload.sub;

        const userData = await GetUserByEmail(email);
        const userId = userData.data.id;

        const hospitalData = await GetHospitalByUserId(userId);
        const hospitalId = hospitalData.data.id;

        const docsResponse = await GetDoctorsByHospitalId(hospitalId);
        setDoctorsList(docsResponse.data || []);

        const appsResponse = await GetAppointmentsByHospitalId(hospitalId);
        setAppointmentsList(appsResponse.data || []);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const uniquePatientsCount = new Set(appointmentsList.map(app => app.patientId)).size;

  if (loading) {
     return <div className="p-10 text-center font-black text-slate-400 uppercase tracking-widest">Synchronizing Database...</div>;
  }

  return (
    <div className="p-10 space-y-10">

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
        {[
          { label: "Active Clinicians", val: doctorsList.length.toString(), icon: <Stethoscope />, color: "indigo", trend: "Assigned" },
          { label: "Total Appointments", val: appointmentsList.length.toString(), icon: <CalendarCheck />, color: "emerald", trend: "Scheduled" },
          { label: "Unique Patients", val: uniquePatientsCount.toString(), icon: <Users />, color: "blue", trend: "Registered" },
          { label: "ICU Capacity", val: "88%", icon: <AlertTriangle />, color: "rose", trend: "High load" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] space-y-6 hover:border-indigo-200 transition-all group">
            <div className={`w-14 h-14 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center group-hover:bg-${stat.color}-600 group-hover:text-white transition-all duration-500 shadow-sm`}>
              {React.cloneElement(stat.icon, { size: 24 })}
            </div>
            <div>
              <p className={`text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-${stat.color}-500 transition-colors`}>{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{stat.val}</h3>
              <div className="flex items-center gap-1.5 mt-4">
                <TrendingUp size={12} className={`text-${stat.color}-500`} />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Physician Roster - Full Width */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col animate-slideUp">
        <div className="p-10 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest">
              Staff Database
            </div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
              Professional Roster
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Consultant</th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Specialization</th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Experience</th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {doctorsList.length === 0 ? (
                 <tr><td colSpan="4" className="p-8 text-center text-slate-400 font-bold">No Doctors Registered</td></tr>
              ) : doctorsList.map((doc) => (
                <tr key={doc.id} className="group hover:bg-slate-50/30 transition-all">
                  <td className="p-8">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-slate-100 rounded-[1rem] flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all font-black text-xs shadow-sm">
                        {doc.name ? doc.name[0] : "D"}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 uppercase tracking-tight text-sm">{doc.name}</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">MN-{doc.id}-PRO</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-4 py-1.5 rounded-full border border-indigo-100 uppercase tracking-widest shadow-sm">
                      {doc.specialization || "General"}
                    </span>
                  </td>
                  <td className="p-8">
                     <span className="font-bold text-slate-600">{doc.experience || 0} Years</span>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-100`} />
                      <span className={`text-[10px] font-black uppercase tracking-widest text-emerald-600`}>
                        Active
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}