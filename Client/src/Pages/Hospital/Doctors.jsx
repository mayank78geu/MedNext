import React, { useState, useEffect } from "react";
import { 
  Stethoscope, 
  Plus, 
  Search, 
  Mail, 
  MapPin,
  Trash2,
  ExternalLink,
  X
} from "lucide-react";
import { GetUserByEmail } from "../../api/users.api.js";
import { GetHospitalByUserId } from "../../api/hospitals.api.js";
import { GetDoctorsByHospitalId, DeleteDoctor } from "../../api/doctors.api.js";
import { RegisterDoctorForHospital } from "../../api/hospitals.api.js";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [hospitalId, setHospitalId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', specialization: '', experience: 0 });
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

      const docsResponse = await GetDoctorsByHospitalId(hospitalData.data.id);
      setDoctors(docsResponse.data || []);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    if (!hospitalId) return;
    try {
      setSubmitting(true);
      await RegisterDoctorForHospital(hospitalId, formData);
      setShowAddModal(false);
      setFormData({ name: '', email: '', password: '', specialization: '', experience: 0 });
      fetchData(); // Refresh list
    } catch (err) {
      console.error("Failed to add doctor", err);
      alert(err.message || "Failed to add doctor");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this doctor?")) {
      try {
        await DeleteDoctor(id);
        fetchData();
      } catch (err) {
        console.error("Failed to delete doctor", err);
      }
    }
  };

  if (loading) {
    return <div className="p-10 text-center font-black text-slate-400 uppercase tracking-widest">Synchronizing Staff Database...</div>;
  }

  return (
    <div className="p-10 space-y-10 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest">
             Staff Management
          </div>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Clinical Personnel</h2>
          <p className="text-slate-400 text-xs font-medium italic">Manage and onboard medical specialists</p>
        </div>
        
        <div className="flex items-center gap-4">
           <button 
              onClick={() => setShowAddModal(true)}
              className="bg-[#0f172a] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/10 active:scale-95 group">
              <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add Specialist
           </button>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {doctors.map((doc) => (
          <div key={doc.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)] hover:border-indigo-200 transition-all group relative overflow-hidden flex flex-col">
             
             <div className="absolute top-6 right-6">
                <span className="text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest border bg-emerald-50 text-emerald-500 border-emerald-100">
                   Active
                </span>
             </div>

             <div className="space-y-6 flex-1">
                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-400 font-black text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100">
                   {doc.name ? doc.name[0] : "D"}
                </div>

                <div className="space-y-1">
                   <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{doc.name}</h3>
                   <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{doc.specialization || "General"}</p>
                </div>

                <div className="pt-4 border-t border-slate-50 space-y-4">
                   <div className="flex items-center gap-3 text-slate-400">
                      <Mail size={14} className="group-hover:text-indigo-600 transition-colors" />
                      <span className="text-[10px] font-bold text-slate-600 lowercase">{doc.userId ? "Registered User" : "Pending Activation"}</span>
                   </div>
                   <div className="flex items-center gap-3 text-slate-400">
                      <MapPin size={14} className="group-hover:text-indigo-600 transition-colors" />
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{doc.experience || 0} Years EXP</span>
                   </div>
                </div>
             </div>
             
             <div className="flex items-center gap-3 pt-6 mt-auto">
                <button 
                  onClick={() => handleDelete(doc.id)}
                  className="w-full bg-rose-50 text-rose-500 py-3 rounded-xl hover:bg-rose-500 hover:text-white font-black text-[9px] uppercase tracking-widest transition-all flex justify-center items-center gap-2">
                   <Trash2 size={14} /> Remove Specialist
                </button>
             </div>
          </div>
        ))}

        {/* Add Doctor Placeholder */}
        <button 
           onClick={() => setShowAddModal(true)}
           className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group min-h-[300px]">
           <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
              <Plus size={32} />
           </div>
           <span className="text-[10px] font-black uppercase tracking-widest">Enroll New Consultant</span>
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl animate-slideUp">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Add New Doctor</h3>
               <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-rose-500">
                 <X size={20} />
               </button>
            </div>
            <form onSubmit={handleAddDoctor} className="p-8 space-y-6">
               <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Full Name</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Login Email</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Temporary Password</label>
                    <input required type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Specialization</label>
                      <input required type="text" value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Experience (Yrs)</label>
                      <input required type="number" min="0" value={formData.experience} onChange={(e) => setFormData({...formData, experience: parseInt(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
                    </div>
                  </div>
               </div>
               <button disabled={submitting} type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50">
                  {submitting ? 'Registering...' : 'Confirm Registration'}
               </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
