import React, { useState } from "react";
import { User, Phone, Calendar, Clock, CheckCircle2, XCircle, ShieldCheck, ArrowRight, Activity, X, CalendarPlus } from "lucide-react";
import { BookAppointment } from "../api/appointments.api";

/* ── 3-Stage Queue Animation Overlay ─────────────────────────── */
const stages = [
  { id: "queued",      label: "Joining queue…",              sub: "Your request is being placed in the booking queue" },
  { id: "processing", label: "Processing slot reservation…", sub: "Verifying slot availability with the server" },
  { id: "finalizing", label: "Finalizing your booking…",     sub: "Securing your appointment and updating records" },
];

const BookingOverlay = ({ stage }) => {
  const stageIndex = stages.findIndex(s => s.id === stage);
  const current = stages[stageIndex] || stages[0];
  const progress = ((stageIndex + 1) / stages.length) * 100;

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm animate-fadeIn rounded-b-[2.5rem]">
      {/* Queue bars animation */}
      <div className="flex items-end gap-1.5 mb-8 h-14">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-2.5 bg-blue-500 rounded-full"
            style={{
              height: `${30 + Math.sin((i * 0.8) + stageIndex) * 20}%`,
              animation: `queueBar 0.9s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
              opacity: 0.4 + i * 0.08,
            }}
          />
        ))}
      </div>

      {/* Stage label */}
      <p className="text-lg font-black text-slate-800 uppercase tracking-tight mb-1 text-center px-8">
        {current.label}
      </p>
      <p className="text-xs text-slate-400 font-medium text-center px-12 mb-8">
        {current.sub}
      </p>

      {/* Progress bar */}
      <div className="w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Stage dots */}
      <div className="flex items-center gap-3">
        {stages.map((s, i) => (
          <div key={s.id} className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i < stageIndex  ? "bg-emerald-400 scale-100" :
              i === stageIndex ? "bg-blue-500 scale-125 animate-pulse" :
              "bg-slate-200"
            }`} />
            {i < stages.length - 1 && (
              <div className={`w-8 h-0.5 rounded-full transition-all duration-700 ${i < stageIndex ? "bg-emerald-400" : "bg-slate-200"}`} />
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes queueBar {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
        }
      `}</style>
    </div>
  );
};

const AppointmentForm = ({ doctorName, doctorId, hospitalId, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingStage, setBookingStage] = useState(null); // null | 'queued' | 'processing' | 'finalizing'

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setMessage("Incomplete Registry. Please verify all clinical sections.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      // Stage 1 — queue entry (brief simulated delay for UX)
      setBookingStage("queued");
      await new Promise(r => setTimeout(r, 800));

      // Stage 2 — actual API call
      setBookingStage("processing");

      const timeParts = formData.time.split(" ");
      let [hours, minutes] = timeParts[0].split(":");
      if (timeParts[1] === "PM" && hours !== "12") {
          hours = String(Number(hours) + 12);
      } else if (timeParts[1] === "AM" && hours === "12") {
          hours = "00";
      }
      const formattedTime = `${hours.padStart(2, '0')}:${minutes}:00`;

      const payload = {
        doctorId: doctorId,
        hospitalId: hospitalId,
        date: formData.date,
        time: formattedTime
      };

      const response = await BookAppointment(payload);

      if (response && response.success === false) {
          throw new Error(response.message || "Failed to book appointment");
      }

      // Stage 3 — finalizing
      setBookingStage("finalizing");
      await new Promise(r => setTimeout(r, 600));

      setIsSuccess(true);
    } catch (err) {
      setMessage(err.message || "Failed to synchronize record");
    } finally {
      setBookingStage(null);
      setIsSubmitting(false);
    }
  };

  const handleAddToCalendar = () => {
    const timeParts = formData.time.split(" ");
    let [hours, minutes] = timeParts[0].split(":");
    if (timeParts[1] === "PM" && hours !== "12") {
        hours = String(Number(hours) + 12);
    } else if (timeParts[1] === "AM" && hours === "12") {
        hours = "00";
    }
    
    // Format for Google Calendar: YYYYMMDDTHHMMSSZ (UTC). 
    // Since we don't know the local timezone simply, we'll format as local time without Z to let Google Calendar use the user's timezone.
    const cleanDate = formData.date.replace(/-/g, '');
    const startTimeStr = `${cleanDate}T${hours.padStart(2, '0')}${minutes}00`;
    
    // Assume 1 hour duration
    let endHours = String(Number(hours) + 1).padStart(2, '0');
    let endDays = cleanDate;
    // Handle midnight wrap roughly (not perfect for end of month, but standard approach)
    if (endHours === "24") {
      endHours = "00";
    }
    const endTimeStr = `${endDays}T${endHours}${minutes}00`;

    const title = encodeURIComponent(`Consultation with ${doctorName}`);
    const details = encodeURIComponent(`Patient: ${formData.name}\nPhone: ${formData.phone}\nBooked via MedNext.`);
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTimeStr}/${endTimeStr}&details=${details}`;
    
    window.open(url, "_blank");
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
        {/* Queue booking animation overlay — renders over the form while processing */}
        {bookingStage && <BookingOverlay stage={bookingStage} />}

        {/* Header - Clinical Command Strip */}
        <div className="bg-[#0f172a] text-white p-8 relative overflow-hidden flex-shrink-0">
           <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none rotate-12">
              <Calendar size={140} />
           </div>
           
           <div className="relative z-10 flex justify-between items-center">
              <div className="space-y-1.5">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full text-[9px] font-black text-blue-400 uppercase tracking-widest border border-blue-500/10">
                    <ShieldCheck size={10} /> {isSuccess ? "Record Synchronized" : "Clinical ID Verified"}
                 </div>
                 <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">
                   {isSuccess ? "Booking Confirmed" : "Booking Registry"}
                 </h2>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
                   {isSuccess ? "Your session is secured." : "Session Slot Reservation Protocol"}
                 </p>
              </div>
              
              <button
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl hover:bg-rose-500 hover:text-white transition-all active:scale-90 border border-white/10 group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
           </div>
        </div>

        {isSuccess ? (
          /* SUCCESS VIEW */
          <div className="p-8 sm:p-12 overflow-y-auto space-y-8 flex-1 animate-fadeIn flex flex-col items-center">
            
            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center border border-emerald-100 shadow-2xl shadow-emerald-500/20 mb-4 animate-slideUp">
               <CheckCircle2 size={48} />
            </div>
            
            <div className="text-center space-y-2 animate-slideUp delay-100">
               <h3 className="text-2xl font-black text-slate-800 tracking-tight">Appointment Scheduled</h3>
               <p className="text-sm font-medium text-slate-500">Your clinical visit has been successfully registered in the system.</p>
            </div>

            <div className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-8 space-y-6 animate-slideUp delay-200">
               <div className="flex items-center gap-4 pb-6 border-b border-slate-200/60">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100">
                     <User size={24} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Assigned Specialist</p>
                     <p className="text-lg font-black text-slate-800 uppercase tracking-tight">{doctorName}</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-6">
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><Calendar size={12}/> Date</p>
                     <p className="font-black text-slate-800">{formData.date}</p>
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><Clock size={12}/> Time</p>
                     <p className="font-black text-slate-800">{formData.time}</p>
                  </div>
                  <div className="col-span-2 pt-4 border-t border-slate-200/60">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><ShieldCheck size={12}/> Patient Identity</p>
                     <p className="font-black text-slate-800">{formData.name} <span className="text-slate-400 font-medium">({formData.phone})</span></p>
                  </div>
               </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 animate-slideUp delay-300">
               <button
                 onClick={handleAddToCalendar}
                 className="flex items-center justify-center gap-3 px-8 py-5 bg-blue-50 text-blue-600 border border-blue-100 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-sm group"
               >
                 <CalendarPlus size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                 Add to Calendar
               </button>
               <button
                 onClick={onClose}
                 className="flex items-center justify-center gap-3 px-8 py-5 bg-[#0f172a] text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/10"
               >
                 Return to Hub
               </button>
            </div>

          </div>
        ) : (
          /* BOOKING FORM VIEW */
          <>
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

              {message && (
                <div className="p-5 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 shadow-sm flex items-center gap-3 animate-fadeIn">
                   <XCircle size={20} className="flex-shrink-0" />
                   <p className="text-xs font-black uppercase tracking-widest">{message}</p>
                </div>
              )}

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
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;
