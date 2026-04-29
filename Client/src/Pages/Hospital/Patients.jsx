import React, { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  UserPlus, 
  ArrowUpRight, 
  Activity, 
  FileText, 
  TrendingUp,
  MapPin,
  X
} from "lucide-react";
import { GetUserByEmail, GetUserById } from "../../api/users.api.js";
import { GetHospitalByUserId, RegisterPatientFromHospital } from "../../api/hospitals.api.js";
import { GetAppointmentsByHospitalId } from "../../api/appointments.api.js";
import { GetPatientByUserId } from "../../api/patients.api.js";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [hospitalId, setHospitalId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
      
      // Extract unique patient IDs from appointments
      const uniquePatientIds = [...new Set((appsResponse.data || []).map(app => app.patientId))];
      
      // Fetch details for these unique patients
      const enrichedPatients = await Promise.all(
         uniquePatientIds.map(async (pId) => {
             try {
                // pId is userId. Let's fetch the actual Patient profile
                const patientProfile = await GetPatientByUserId(pId);
                return patientProfile.data;
             } catch(e) {
                return null;
             }
         })
      );
      
      setPatients(enrichedPatients.filter(p => p !== null));
    } catch (err) {
      console.error("Failed to fetch patients", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterPatient = async (e) => {
    e.preventDefault();
    if (!hospitalId) return;
    try {
      setSubmitting(true);
      await RegisterPatientFromHospital(hospitalId, formData);
      setShowAddModal(false);
      setFormData({ name: '', email: '', password: '' });
      // Note: Registration creates the user, but they won't appear here until an appointment is booked!
      alert("Patient registered successfully. They will appear here once an appointment is booked for them.");
    } catch (err) {
      console.error("Failed to register patient", err);
      alert(err.message || "Failed to register patient");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center font-black text-slate-400 uppercase tracking-widest">Synchronizing Registry...</div>;
  }

  return (
    <div className="p-10 space-y-10 animate-fadeIn">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest">
             Patient Hub
          </div>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Patient Registry</h2>
          <p className="text-slate-400 text-xs font-medium italic">Unified clinical history database (Derived from Appointments)</p>
        </div>
        
        <div className="flex items-center gap-4">
           <button 
              onClick={() => setShowAddModal(true)}
              className="bg-[#0f172a] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/10 active:scale-95 group">
              <UserPlus size={18} className="group-hover:scale-110 transition-transform" /> Register New
           </button>
        </div>
      </div>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {patients.length === 0 ? (
           <div className="col-span-1 xl:col-span-2 p-10 text-center font-bold text-slate-400">No Patients Found (Book an appointment to see patients here)</div>
        ) : patients.map((patient) => (
          <div key={patient.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)] hover:border-indigo-200 transition-all group flex flex-col sm:flex-row gap-8 relative overflow-hidden">
             
             {/* Left: Identity Info */}
             <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-400 font-black text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100">
                      {patient.name ? patient.name.charAt(0) : "P"}
                   </div>
                   <div>
                      <div className="flex items-center gap-2 mb-1">
                         <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{patient.name}</h3>
                         <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border bg-emerald-50 text-emerald-500 border-emerald-100`}>
                           Stable
                         </span>
                      </div>
                      <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none">Identity Linked: MN-{patient.id}</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-slate-50 py-6">
                   <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Age</p>
                      <p className="text-sm font-black text-slate-700 leading-none">{patient.age || 0} Yrs</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Zone</p>
                      <p className="text-sm font-black text-slate-700 leading-none flex items-center gap-1">
                        <MapPin size={12} className="text-slate-300" /> {patient.city || "Not Provided"}
                      </p>
                   </div>
                </div>
             </div>

             {/* Right: Health Metrics Snapshot */}
             <div className="w-full sm:w-48 bg-slate-50 rounded-[2rem] p-6 space-y-6 flex flex-col justify-center">
                <div className="space-y-1 text-center">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Health Index</p>
                   <div className="flex items-center justify-center gap-2">
                      <TrendingUp size={16} className="text-emerald-500" />
                      <span className="text-2xl font-black text-slate-800">92%</span>
                   </div>
                </div>
                <div className="space-y-3">
                   <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-emerald-500 rounded-full" />
                   </div>
                   <p className="text-[8px] font-black text-slate-400 text-center uppercase tracking-widest">Clinical Protocol Compliant</p>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl animate-slideUp">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Register New Patient</h3>
               <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-rose-500">
                 <X size={20} />
               </button>
            </div>
            <form onSubmit={handleRegisterPatient} className="p-8 space-y-6">
               <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Full Name</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Email</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Temporary Password</label>
                    <input required type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
                  </div>
               </div>
               <button disabled={submitting} type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50">
                  {submitting ? 'Registering...' : 'Register Patient'}
               </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
