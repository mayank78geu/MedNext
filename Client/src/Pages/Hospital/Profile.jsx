import React, { useState, useEffect } from "react";
import { 
  Building2, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Award, 
  Users, 
  ArrowRight,
  Clock,
  Briefcase,
  Save,
  XCircle
} from "lucide-react";
import { toast } from "react-toastify";
import { GetUserByEmail } from "../../api/users.api.js";
import { GetHospitalByUserId, UpdateHospital } from "../../api/hospitals.api.js";

export default function Profile() {
  const [hospitalInfo, setHospitalInfo] = useState({
    name: "Loading...",
    address: "",
    city: ""
  });
  const [userEmail, setUserEmail] = useState("");
  const [hospitalId, setHospitalId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const email = payload.sub;
        setUserEmail(email);

        const userData = await GetUserByEmail(email);
        const userId = userData.data.id;

        const hospData = await GetHospitalByUserId(userId);
        if (hospData) {
            setHospitalId(hospData.id);
            setHospitalInfo({
                name: hospData.name || "",
                address: hospData.address || "",
                city: hospData.city || ""
            });
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
        toast.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setHospitalInfo({ ...hospitalInfo, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
        await UpdateHospital(hospitalId, hospitalInfo);
        setIsEditing(false);
        toast.success("Hospital credentials updated successfully.");
    } catch (err) {
        toast.error("Failed to update credentials.");
    }
  };

  if (loading) {
      return <div className="min-h-screen p-10 flex justify-center items-center font-black text-slate-400 uppercase tracking-widest">Loading Credentials...</div>;
  }

  return (
    <div className="p-10 space-y-10 animate-fadeIn">
      
      {/* Hero Banner Area */}
      <div className="relative h-96 rounded-[4rem] overflow-hidden group shadow-2xl shadow-indigo-900/10">
         <img 
            src="https://images.unsplash.com/photo-1587350859728-117699f4a7c3?auto=format&fit=crop&q=80&w=2000" 
            alt="Hospital Exterior" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
         
         <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 backdrop-blur-md rounded-full text-[9px] font-black text-blue-300 uppercase tracking-widest border border-blue-500/20">
                  Verified Institution
               </div>
               <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">{hospitalInfo.name}</h2>
               <p className="text-blue-400 font-black text-xs uppercase tracking-[0.2em]">{hospitalInfo.city ? `Located in ${hospitalInfo.city}` : "Location Pending"}</p>
            </div>
            
            {!isEditing && (
               <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-slate-900 px-8 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95 group"
               >
                  Update Credentials <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform inline ml-2" />
               </button>
            )}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         
         {/* Essential Data Panel */}
         <div className="lg:col-span-2 space-y-10">
            
            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-12">
               <div className="space-y-8">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] border-b border-slate-50 pb-6 flex items-center justify-between">
                     General Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                     
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institution Name</label>
                        <div className={`flex items-start gap-3 bg-[#f8fafc] border rounded-2xl px-5 py-4 transition-all ${isEditing ? 'border-blue-400 ring-4 ring-blue-500/5 bg-white' : 'border-slate-100 cursor-not-allowed opacity-70'}`}>
                           <Building2 className={`${isEditing ? 'text-blue-500' : 'text-indigo-600'} mt-0.5 flex-shrink-0`} size={18} />
                           <input type="text" name="name" value={hospitalInfo.name} onChange={handleChange} disabled={!isEditing} className="w-full bg-transparent outline-none font-bold text-slate-700" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Physical Address</label>
                        <div className={`flex items-start gap-3 bg-[#f8fafc] border rounded-2xl px-5 py-4 transition-all ${isEditing ? 'border-blue-400 ring-4 ring-blue-500/5 bg-white' : 'border-slate-100 cursor-not-allowed opacity-70'}`}>
                           <MapPin className={`${isEditing ? 'text-blue-500' : 'text-indigo-600'} mt-0.5 flex-shrink-0`} size={18} />
                           <input type="text" name="address" placeholder="Enter detailed address" value={hospitalInfo.address} onChange={handleChange} disabled={!isEditing} className="w-full bg-transparent outline-none font-bold text-slate-700" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">City</label>
                        <div className={`flex items-start gap-3 bg-[#f8fafc] border rounded-2xl px-5 py-4 transition-all ${isEditing ? 'border-blue-400 ring-4 ring-blue-500/5 bg-white' : 'border-slate-100 cursor-not-allowed opacity-70'}`}>
                           <Globe className={`${isEditing ? 'text-blue-500' : 'text-indigo-600'} mt-0.5 flex-shrink-0`} size={18} />
                           <input type="text" name="city" placeholder="e.g. Mumbai" value={hospitalInfo.city} onChange={handleChange} disabled={!isEditing} className="w-full bg-transparent outline-none font-bold text-slate-700" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registered Email</label>
                        <div className={`flex items-start gap-3 bg-[#f8fafc] border rounded-2xl px-5 py-4 transition-all border-slate-100 cursor-not-allowed opacity-70`}>
                           <Mail className={`text-indigo-600 mt-0.5 flex-shrink-0`} size={18} />
                           <input type="email" value={userEmail} disabled className="w-full bg-transparent outline-none font-bold text-slate-700" />
                        </div>
                     </div>

                  </div>

                  {isEditing && (
                     <div className="flex justify-end gap-4 pt-6 border-t border-slate-100 animate-fadeIn mt-8">
                       <button
                         onClick={() => setIsEditing(false)}
                         className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
                       >
                         <XCircle size={16} /> Discard Changes
                       </button>
                       <button
                         onClick={handleSave}
                         className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-500/20"
                       >
                         <Save size={16} /> Update Credentials
                       </button>
                     </div>
                  )}

               </div>
            </div>

         </div>

         {/* Admin Control Panel */}
         <div className="space-y-10">
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-10">
               <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                     <ShieldCheck size={16} />
                  </div>
                  System Security
               </h3>
               
               <div className="space-y-6">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin Credentials</p>
                     <div className="flex items-center justify-between">
                        <p className="text-xs font-black text-slate-800 tracking-tight">System Root</p>
                        <button className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Change</button>
                     </div>
                  </div>
                  
                  <div className="p-6 bg-rose-50/50 rounded-3xl border border-rose-100/50 space-y-4">
                     <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Critical Protocol</p>
                     <button className="w-full bg-rose-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-rose-700 transition-all shadow-lg shadow-rose-900/10">
                        Emergency Lockdown
                     </button>
                  </div>
               </div>

               <div className="pt-6 border-t border-slate-50">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic text-center leading-relaxed">
                     Secure medical profile management. <span className="text-indigo-600">Encrypted</span> end-to-end.
                  </p>
               </div>
            </div>
         </div>

      </div>

    </div>
  );
}
