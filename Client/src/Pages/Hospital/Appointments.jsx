import React, { useState, useEffect } from "react";
import { 
  CalendarCheck, 
  Clock, 
  User, 
  MoreVertical, 
  Search, 
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  X
} from "lucide-react";
import { GetUserByEmail, GetUserById } from "../../api/users.api.js";
import { GetHospitalByUserId } from "../../api/hospitals.api.js";
import { GetAppointmentsByHospitalId, BookAppointment } from "../../api/appointments.api.js";
import { GetDoctorsByHospitalId } from "../../api/doctors.api.js";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitalId, setHospitalId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ date: '', time: '', doctorId: '' });
  const [patientEmail, setPatientEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;
      const payload = JSON.parse(atob(token.split('.')[1]));
      const email = payload.sub;

      const userData = await GetUserByEmail(email);
      const hospitalData = await GetHospitalByUserId(userData.data.id);
      setHospitalId(hospitalData.data.id);

      const appsResponse = await GetAppointmentsByHospitalId(hospitalData.data.id);
      
      // We need to fetch patient and doctor names
      const enrichedApps = await Promise.all(
         (appsResponse.data || []).map(async (app) => {
             try {
                // Fetch user to get patient name (patientId is userId for patients)
                const patientUser = await GetUserById(app.patientId);
                // Doctor is already available in our doctors list or we can fetch
                return {
                    ...app,
                    patientName: patientUser.data.name,
                };
             } catch(e) {
                return { ...app, patientName: "Unknown" };
             }
         })
      );
      setAppointments(enrichedApps);

      const docsResponse = await GetDoctorsByHospitalId(hospitalData.data.id);
      setDoctors(docsResponse.data || []);
      
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      
      // 1. Find the patient user by email
      const patientRes = await GetUserByEmail(patientEmail);
      if(!patientRes || !patientRes.data) throw new Error("Patient not found with this email");
      
      const payload = {
         date: formData.date,
         time: formData.time + ":00", // Format correctly
         doctorId: parseInt(formData.doctorId),
         hospitalId: hospitalId,
         patientId: patientRes.data.id,
         status: 'BOOKED'
      };

      await BookAppointment(payload);
      setShowAddModal(false);
      setFormData({ date: '', time: '', doctorId: '' });
      setPatientEmail('');
      fetchData();
    } catch (err) {
      console.error("Failed to book", err);
      alert(err.message || "Failed to book appointment");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    if(!status) return "text-slate-600 bg-slate-50 border-slate-100";
    const s = status.toUpperCase();
    if (s === "BOOKED" || s === "CONFIRMED") return "text-emerald-600 bg-emerald-50 border-emerald-100";
    if (s === "PENDING") return "text-amber-600 bg-amber-50 border-amber-100";
    if (s === "CANCELLED") return "text-rose-600 bg-rose-50 border-rose-100";
    return "text-slate-600 bg-slate-50 border-slate-100";
  };

  if (loading) {
    return <div className="p-10 text-center font-black text-slate-400 uppercase tracking-widest">Synchronizing Database...</div>;
  }

  return (
    <div className="p-10 space-y-10 animate-fadeIn">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest">
            Logistics Hub
          </div>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Appointment Management</h2>
          <p className="text-slate-400 text-xs font-medium tracking-wide italic">Real-time clinical session orchestration</p>
        </div>
        
        <div className="flex items-center gap-4">
           <button 
              onClick={() => setShowAddModal(true)}
              className="bg-[#0f172a] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/10 active:scale-95 group">
              <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Book Session
           </button>
        </div>
      </div>

      {/* Appointment Grid */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Registry ID</th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient / Subject</th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Clinical Lead</th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Timeline</th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {appointments.length === 0 ? (
                 <tr><td colSpan="5" className="p-8 text-center text-slate-400 font-bold">No Appointments Found</td></tr>
              ) : appointments.map((apt) => {
                const doc = doctors.find(d => d.id === apt.doctorId);
                return (
                <tr key={apt.id} className="group hover:bg-slate-50/50 transition-all">
                  <td className="p-8">
                    <span className="text-[11px] font-black text-indigo-600 bg-indigo-50/50 px-3 py-1.5 rounded-lg border border-indigo-100/50 uppercase tracking-widest">
                      APT-{apt.id}
                    </span>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-black text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          {apt.patientName ? apt.patientName[0] : "P"}
                       </div>
                       <p className="font-black text-slate-800 uppercase tracking-tight text-sm">{apt.patientName}</p>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-3">
                       <User size={14} className="text-slate-300" />
                       <p className="text-xs font-bold text-slate-600">{doc ? doc.name : "Unknown"}</p>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="space-y-1">
                       <p className="text-[11px] font-black text-slate-800 flex items-center gap-2">
                          <Clock size={12} className="text-indigo-500" /> {apt.time}
                       </p>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{apt.date}</p>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${getStatusColor(apt.status)} shadow-sm`}>
                       {apt.status}
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl animate-slideUp">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Book New Session</h3>
               <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-rose-500">
                 <X size={20} />
               </button>
            </div>
            <form onSubmit={handleBook} className="p-8 space-y-6">
               <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Patient Registered Email</label>
                    <input required type="email" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} placeholder="patient@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Select Doctor</label>
                    <select required value={formData.doctorId} onChange={(e) => setFormData({...formData, doctorId: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all">
                        <option value="">-- Choose --</option>
                        {doctors.map(doc => (
                           <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialization || "General"})</option>
                        ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Date</label>
                      <input required type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Time</label>
                      <input required type="time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
                    </div>
                  </div>
               </div>
               <button disabled={submitting} type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50">
                  {submitting ? 'Booking...' : 'Confirm Session'}
               </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
