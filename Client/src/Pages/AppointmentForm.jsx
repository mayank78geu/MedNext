import React, { useState, useEffect } from "react";
import { User, Phone, Calendar, Clock, CheckCircle2, XCircle, ShieldCheck, ArrowRight, Activity } from "lucide-react";

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
      setMessage("Please complete all sections of the clinical registry.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API delay for premium feel
    setTimeout(() => {
      console.log("Appointment Synchronized:", {
        ...formData,
        doctor: doctorName,
      });

      setMessage("Appointment Synchronized Successfully");
      setIsSubmitting(false);

      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0f172a]/60 backdrop-blur-md animate-fadeIn p-4 overflow-y-auto">
      
      {/* Modal Box */}
      <div 
        className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-scaleIn border border-slate-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header - V2 Premium */}
        <div className="bg-[#0f172a] text-white p-8 relative overflow-hidden flex-shrink-0">
           <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Calendar size={120} />
           </div>
           
           <div className="relative z-10 flex justify-between items-start">
              <div className="space-y-1">
                 <h2 className="text-2xl font-black tracking-tight uppercase">Booking Registry</h2>
                 <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2 italic">
                    <ShieldCheck size={12} /> Secure Clinical Reservation
                 </p>
              </div>
              
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90"
              >
                <XCircle size={18} />
              </button>
           </div>
        </div>

        {/* Modal Body - Scrollable */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto max-h-[60vh]">
          
          {/* Doctor Info Banner */}
          <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex items-center justify-between group">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                   <User size={20} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Consulting Specialist</p>
                   <p className="text-sm font-black text-slate-800">{doctorName}</p>
                </div>
             </div>
             <Activity size={20} className="text-blue-200 group-hover:text-blue-400 transition-colors" />
          </div>

          {/* Personal Data */}
          <div className="space-y-4">
             <div className="flex items-center gap-2 px-1">
                <ShieldCheck size={16} className="text-slate-400" />
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Identity Verification</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group space-y-1">
                   <div className="flex items-center gap-3 bg-[#f8fafc] border border-slate-100 rounded-2xl px-5 py-4 transition-all focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/5 group">
                      <User size={18} className="text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Patient Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent outline-none font-bold text-slate-700 text-sm placeholder:text-slate-300"
                      />
                   </div>
                </div>

                <div className="group space-y-1">
                   <div className="flex items-center gap-3 bg-[#f8fafc] border border-slate-100 rounded-2xl px-5 py-4 transition-all focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/5 group">
                      <Phone size={18} className="text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="text"
                        name="phone"
                        placeholder="Contact Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent outline-none font-bold text-slate-700 text-sm placeholder:text-slate-300"
                      />
                   </div>
                </div>
             </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-4">
             <div className="flex items-center gap-2 px-1">
                <Calendar size={16} className="text-slate-400" />
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Preferred Timeline</h3>
             </div>
             <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-[#f8fafc] border border-slate-100 p-5 rounded-2xl outline-none font-black text-sm text-slate-700 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 transition-all text-center uppercase tracking-widest"
             />
          </div>

          {/* Time Slot Picker (Vacant Slots) */}
          <div className="space-y-6">
             <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                   <Clock size={16} className="text-blue-600" />
                   <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest leading-none">Vacant Time Slots</h3>
                </div>
                <span className="text-[8px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest border border-green-100 animate-pulse">Live availability</span>
             </div>

             <div className="space-y-4">
                {/* Morning Slots */}
                <div className="space-y-3">
                   <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-1">Morning Session</p>
                   <div className="grid grid-cols-3 gap-3">
                      {morningSlots.map(slot => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => selectSlot(slot)}
                          className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border ${
                            formData.time === slot 
                            ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-xl' 
                            : 'bg-white text-slate-500 border-slate-100 hover:border-blue-400 hover:text-blue-600'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Evening Slots */}
                <div className="space-y-3">
                   <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-1">Evening Session</p>
                   <div className="grid grid-cols-4 gap-3">
                      {eveningSlots.map(slot => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => selectSlot(slot)}
                          className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border ${
                            formData.time === slot 
                            ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-xl' 
                            : 'bg-white text-slate-500 border-slate-100 hover:border-blue-400 hover:text-blue-600'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          {message && (
            <div className={`p-4 rounded-2xl flex items-center justify-center gap-2 border animate-fadeIn ${
              message.includes("Synchronized") ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"
            }`}>
               {message.includes("Synchronized") ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
               <p className="text-[10px] font-black uppercase tracking-widest">{message}</p>
            </div>
          )}
        </form>

        {/* Modal Footer */}
        <div className="p-8 border-t border-slate-100 flex gap-4 bg-slate-50/50">
           <button
             type="button"
             onClick={onClose}
             className="flex-1 px-6 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95"
           >
              Discard Request
           </button>
           <button
             onClick={handleSubmit}
             disabled={isSubmitting}
             className="flex-2 flex items-center justify-center gap-2 px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:bg-slate-300 disabled:shadow-none transition-all group"
           >
              {isSubmitting ? "Processing..." : "Finalize Booking"}
              {!isSubmitting && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
           </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
