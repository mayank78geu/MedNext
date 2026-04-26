import React from "react";
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
  Briefcase
} from "lucide-react";

export default function Profile() {
  const hospitalInfo = {
    name: "MedNext Central Hospital",
    type: "Multi-Speciality Tertiary Care",
    location: "Bandra West, Mumbai, Maharashtra 400050",
    email: "ops@mednext-central.com",
    contact: "+91 22 4567 8900",
    website: "www.mednext-central.com",
    founded: "2012",
    staffCount: "450+",
    beds: "250",
    certifications: ["NABH Accredited", "ISO 9001:2015", "JCI Gold Seal"]
  };

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
               <p className="text-blue-400 font-black text-xs uppercase tracking-[0.2em]">{hospitalInfo.type}</p>
            </div>
            
            <button className="bg-white text-slate-900 px-8 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95 group">
               Update Credentials <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform inline ml-2" />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         
         {/* Essential Data Panel */}
         <div className="lg:col-span-2 space-y-10">
            
            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-12">
               <div className="space-y-8">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] border-b border-slate-50 pb-6">General Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Physical Location</p>
                        <div className="flex items-start gap-3">
                           <MapPin className="text-indigo-600 mt-0.5 flex-shrink-0" size={18} />
                           <p className="text-sm font-bold text-slate-700">{hospitalInfo.location}</p>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Gateway</p>
                        <div className="flex items-center gap-3">
                           <Phone className="text-indigo-600 flex-shrink-0" size={18} />
                           <p className="text-sm font-bold text-slate-700">{hospitalInfo.contact}</p>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Official Email</p>
                        <div className="flex items-center gap-3">
                           <Mail className="text-indigo-600 flex-shrink-0" size={18} />
                           <p className="text-sm font-bold text-slate-700">{hospitalInfo.email}</p>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Presence</p>
                        <div className="flex items-center gap-3">
                           <Globe className="text-indigo-600 flex-shrink-0" size={18} />
                           <p className="text-sm font-bold text-slate-700">{hospitalInfo.website}</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-8">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] border-b border-slate-50 pb-6">Clinical Capacity</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                     {[
                        { label: "Founded", val: hospitalInfo.founded, icon: <Clock /> },
                        { label: "Personnel", val: hospitalInfo.staffCount, icon: <Users /> },
                        { label: "Bed Count", val: hospitalInfo.beds, icon: <Briefcase /> },
                        { label: "Status", val: "Operational", icon: <ShieldCheck /> }
                     ].map((item, i) => (
                        <div key={i} className="text-center space-y-3 group">
                           <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mx-auto group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                              {React.cloneElement(item.icon, { size: 20 })}
                           </div>
                           <div>
                              <p className="text-[14px] font-black text-slate-800 leading-none">{item.val}</p>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">{item.label}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Accreditation Banner */}
            <div className="bg-indigo-600 p-12 rounded-[3.5rem] shadow-2xl shadow-indigo-900/20 text-white flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <Award size={180} />
               </div>
               <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[1.5rem] flex items-center justify-center border border-white/20 shrink-0">
                  <Award size={40} className="text-blue-300" />
               </div>
               <div className="space-y-4 text-center md:text-left">
                  <h4 className="text-2xl font-black uppercase tracking-tight">Accreditation Excellence</h4>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                     {hospitalInfo.certifications.map((cert, i) => (
                        <span key={i} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest">{cert}</span>
                     ))}
                  </div>
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
                        <p className="text-xs font-black text-slate-800 tracking-tight">MN-ADMIN-7729</p>
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
                     Last profile update: <span className="text-indigo-600">Apr 24, 2024 at 09:12 PM</span> by Head Operations.
                  </p>
               </div>
            </div>

            <div className="bg-[#0f172a] p-10 rounded-[3.5rem] shadow-2xl shadow-slate-900/10 text-white text-center space-y-6">
               <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Technical Support</p>
               <h4 className="text-xl font-black uppercase tracking-tight">Need Assistance?</h4>
               <p className="text-xs text-slate-400 font-medium">Connect with MedNext enterprise support for clinical integration help.</p>
               <button className="w-full bg-white text-slate-900 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all shadow-xl">
                  Contact Enterprise
               </button>
            </div>
         </div>

      </div>

    </div>
  );
}
