import React, { useState } from "react";
import { User, Phone, Calendar, Clock, CheckCircle2, XCircle, ShieldCheck, ArrowRight, Activity, X } from "lucide-react";

const AppointmentForm = ({ doctorName, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock Vacant Slots
  const morningSlots = ["09:00 AM", "10:00 AM", "11:00 AM"];
  const eveningSlots = ["02:00 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const selectSlot = (slot) => {
    setFormData({ ...formData, time: slot });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setMessage("Incomplete Registry. Please verify all clinical sections.");
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setMessage("Clinical Record Synchronized Successfully");
      setIsSubmitting(false);

      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-md animate-fadeIn" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden animate-scaleIn border border-slate-200 flex flex-col max-h-[95vh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header - Clinical Command Strip */}
        <div className="bg-[#0f172a] text-white p-8 relative overflow-hidden flex-shrink-0">
           <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none rotate-12">
              <Calendar size={140} />
           </div>
           
           <div className="relative z-10 flex justify-between items-center">
              <div className="space-y-1.5">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full text-[9px] font-black text-blue-400 uppercase tracking-widest border border-blue-500/10">
                    <ShieldCheck size={10} /> Clinical ID Verified
                 </div>
                 <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">Booking Registry</h2>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Session Slot Reservation Protocol</p>
              </div>
              
              <button
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl hover:bg-rose-500 hover:text-white transition-all active:scale-90 border border-white/10 group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
           </div>
        </div>

        {/* Scrollable Clinical Workspace */}
        <form onSubmit={handleSubmit} className="p-8 sm:p-12 overflow-y-auto space-y-10 scrollbar-hide flex-1">
          
          {/* Doctor Info Context */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl flex items-center justify-between group hover:border-blue-200 transition-colors">
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                   <User size={24} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Assigned Specialist</p>
                   <p className="text-lg font-black text-slate-800 uppercase tracking-tight">{doctorName}</p>
                </div>
             </div>
             <Activity size={24} className="text-slate-200 group-hover:text-blue-500 group-hover:animate-pulse transition-all" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Personal Identity */}
             <div className="space-y-4 md:col-span-2">
                <div className="flex items-center gap-3 px-1">
                   <ShieldCheck size={16} className="text-blue-600" />
                   <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Identity Verification</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                      <input
                        type="text"
                        name="name"
                        placeholder="Legal Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-200 focus:bg-white outline-none transition-all duration-300 text-sm font-bold placeholder:text-slate-300"
                      />
                   </div>
                   <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                      <input
                        type="text"
                        name="phone"
                        placeholder="Active Contact Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-200 focus:bg-white outline-none transition-all duration-300 text-sm font-bold placeholder:text-slate-300"
                      />
                   </div>
                </div>
             </div>

             {/* Preferred Timeline */}
             <div className="space-y-4 md:col-span-2">
                <div className="flex items-center gap-3 px-1">
                   <Calendar size={16} className="text-blue-600" />
                   <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Clinical Session Date</h3>
                </div>
                <input
                   type="date"
                   name="date"
                   value={formData.date}
                   onChange={handleChange}
                   className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl outline-none font-black text-sm text-slate-800 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 transition-all text-center uppercase tracking-[0.2em]"
                />
             </div>

             {/* Slot Selection */}
             <div className="space-y-6 md:col-span-2">
                <div className="flex items-center justify-between px-1">
                   <div className="flex items-center gap-3">
                      <Clock size={16} className="text-blue-600" />
                      <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Available Slots</h3>
                   </div>
                   <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100 animate-pulse">Live Feed</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Morning Roster</p>
                      <div className="grid grid-cols-3 gap-2">
                         {morningSlots.map(slot => (
                           <button
                             key={slot}
                             type="button"
                             onClick={() => selectSlot(slot)}
                             className={`py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all border ${
                               formData.time === slot 
                               ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-xl shadow-slate-200 scale-105' 
                               : 'bg-white text-slate-500 border-slate-100 hover:border-blue-400 hover:text-blue-600'
                             }`}
                           >
                             {slot.split(' ')[0]}
                           </button>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-4">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Evening Roster</p>
                      <div className="grid grid-cols-4 gap-2">
                         {eveningSlots.map(slot => (
                           <button
                             key={slot}
                             type="button"
                             onClick={() => selectSlot(slot)}
                             className={`py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all border ${
                               formData.time === slot 
                               ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-xl shadow-slate-200 scale-105' 
                               : 'bg-white text-slate-500 border-slate-100 hover:border-blue-400 hover:text-blue-600'
                             }`}
                           >
                             {slot.split(' ')[0]}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {message && (
            <div className={`p-6 rounded-[2rem] flex items-center justify-center gap-3 border animate-scaleIn ${
              message.includes("Synchronized") ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-xl shadow-emerald-500/5" : "bg-rose-50 text-rose-600 border-rose-100 shadow-xl shadow-rose-500/5"
            }`}>
               {message.includes("Synchronized") ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
               <p className="text-xs font-black uppercase tracking-widest text-center">{message}</p>
            </div>
          )}
        </form>

        {/* Modal Controller */}
        <div className="p-8 sm:p-10 border-t border-slate-100 flex flex-col sm:flex-row gap-4 bg-slate-50/50 flex-shrink-0">
           <button
             type="button"
             onClick={onClose}
             className="flex-1 px-8 py-5 bg-white border border-slate-200 text-slate-500 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all active:scale-95 shadow-sm"
           >
              Discard Request
           </button>
           <button
             onClick={handleSubmit}
             disabled={isSubmitting}
             className="flex-[2] flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.25em] hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-1 active:translate-y-0 transition-all disabled:bg-slate-300 disabled:shadow-none group"
           >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Authorize Reservation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
              )}
           </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
