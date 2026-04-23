import React from "react";
import { User, HeartPulse, FileText, ShieldCheck, Mail, Phone, MapPin, Activity, ArrowRight, Dna } from "lucide-react";

const PatientDetails = () => {
  const patient = {
    name: "Rahul Verma",
    age: 25,
    gender: "Male",
    bloodGroup: "B+",
    phone: "9876543210",
    email: "rahul@email.com",
    address: "Dehradun, India",
    conditions: ["Diabetes", "Hypertension"],
    allergies: ["Dust", "Peanuts"],
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 pb-20">
      
      <div className="p-10 max-w-7xl mx-auto space-y-10 animate-fadeIn overflow-y-auto">
        
        {/* Modern Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tight text-slate-800 uppercase">Medical Identity</h1>
              <p className="text-slate-500 font-medium flex items-center gap-2">
                Unified health profile <ArrowRight size={14} className="text-blue-500" />
              </p>
          </div>
          <div className="flex items-center gap-2 text-slate-400 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
             <ShieldCheck size={18} className="text-green-500" />
             <span className="text-[10px] font-black uppercase tracking-widest leading-none">Verified Record</span>
          </div>
        </header>

        {/* Profile Identity Card (Glassmorphism) */}
        <section className="relative overflow-hidden bg-[#0f172a] rounded-[2.5rem] p-10 text-white shadow-2xl group">
             <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <Dna size={180} />
             </div>
             
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl font-black shadow-2xl border-4 border-white/10 group-hover:scale-105 transition-transform duration-500">
                   {patient.name[0]}
                </div>
                <div className="text-center md:text-left space-y-2">
                   <h2 className="text-4xl font-black tracking-tighter">{patient.name}</h2>
                   <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                      <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">Age: {patient.age}</span>
                      <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">{patient.gender}</span>
                      <span className="bg-red-500/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/30 text-red-400 flex items-center gap-1.5">
                         <Activity size={12} /> Blood: {patient.bloodGroup}
                      </span>
                   </div>
                </div>
             </div>
        </section>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact Details (High-end Card) */}
          <div className="lg:col-span-1 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
             <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                   <Phone size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">Registry Details</h3>
             </div>

             <div className="space-y-6">
                <div className="group">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 group-hover:text-blue-500 transition-colors">Primary Phone</p>
                   <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Phone size={14} className="text-slate-300" /> {patient.phone}
                   </p>
                </div>
                <div className="group">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 group-hover:text-blue-500 transition-colors">Official Email</p>
                   <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Mail size={14} className="text-slate-300" /> {patient.email}
                   </p>
                </div>
                <div className="group">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 group-hover:text-blue-500 transition-colors">Residential Address</p>
                   <p className="text-sm font-bold text-slate-700 flex items-center gap-2 italic">
                      <MapPin size={14} className="text-slate-300" /> {patient.address}
                   </p>
                </div>
             </div>
          </div>

          {/* Clinical Status (Glassmorphism Cards) */}
          <div className="lg:col-span-2 space-y-10">
             
             {/* Conditions */}
             <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <HeartPulse size={100} />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase mb-8 flex items-center gap-3 relative z-10">
                   <Activity size={24} className="text-red-500" /> Chronic Conditions
                </h3>
                <div className="flex flex-wrap gap-4 relative z-10">
                   {patient.conditions.map((c, i) => (
                     <div key={i} className="flex items-center gap-3 bg-red-50 px-6 py-3 rounded-2xl border border-red-100 group hover:bg-red-500 hover:scale-105 transition-all duration-300 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-red-500 group-hover:bg-white animate-pulse" />
                        <span className="text-[10px] font-black text-red-700 uppercase tracking-widest group-hover:text-white leading-none">{c}</span>
                     </div>
                   ))}
                </div>
             </div>

             {/* Allergies */}
             <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute bottom-0 right-0 p-8 opacity-5">
                   <ShieldCheck size={100} />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase mb-8 flex items-center gap-3 relative z-10">
                   <ShieldCheck size={24} className="text-amber-500" /> Immunological Risks
                </h3>
                <div className="flex flex-wrap gap-4 relative z-10">
                   {patient.allergies.map((a, i) => (
                     <div key={i} className="flex items-center gap-3 bg-amber-50 px-6 py-3 rounded-2xl border border-amber-100 group hover:bg-amber-500 hover:scale-105 transition-all duration-300 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-amber-500 group-hover:bg-white" />
                        <span className="text-[10px] font-black text-amber-900 uppercase tracking-widest group-hover:text-white leading-none">{a}</span>
                     </div>
                   ))}
                </div>
             </div>

          </div>

        </div>

        {/* System Logs / History Placeholder */}
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-12 rounded-[3rem] text-center space-y-4">
           <div className="flex items-center justify-center gap-2 text-slate-300">
              <FileText size={24} />
              <p className="font-black text-xs uppercase tracking-[0.3em]">Encrypted Clinical History Vault</p>
           </div>
           <p className="text-slate-400 text-xs font-medium max-w-md mx-auto">Access restricted. Historical medical logs are currently being synced with regional healthcare servers.</p>
        </div>

      </div>
    </div>
  );
};

export default PatientDetails;
