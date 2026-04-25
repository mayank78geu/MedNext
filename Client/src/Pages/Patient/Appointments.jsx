import React, { useState, useEffect } from "react";
import { CalendarCheck, ChevronLeft, ChevronRight, Clock, UserRound, ArrowRight, ShieldCheck, Activity } from "lucide-react";
import { GetPatientAppointments } from "../../api/appointments.api";

export default function Appointments() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const data = await GetPatientAppointments();
        setAppointments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed fetching appointments for calendar:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const normalizeDateStr = (dateString) => {
    const d = new Date(dateString);
    if (isNaN(d)) return "";
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const getAppointmentsForDay = (day) => {
    const checkDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return appointments.filter(app => normalizeDateStr(app.date) === checkDateStr);
  };

  const upcomingAppointments = appointments
    .filter(app => {
      const appDate = new Date(app.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return appDate >= today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 pb-20">
      
      {/* Header - Consistent with Dashboards */}
      <div className="p-10 max-w-7xl mx-auto space-y-10 animate-fadeIn overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tight text-slate-800 uppercase">Consultation Schedule</h1>
              <p className="text-slate-500 font-medium flex items-center gap-2">
                Manage your clinical timeline <ArrowRight size={14} className="text-blue-500" />
              </p>
          </div>
          <div className="flex items-center gap-2 text-slate-400 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
             <ShieldCheck size={18} className="text-green-500" />
             <span className="text-[10px] font-black uppercase tracking-widest leading-none">Identity Linked</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* --- CALENDAR UI (Premium Glassmorphism Style) --- */}
          <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
               <CalendarCheck size={120} />
            </div>

            <div className="flex justify-between items-center mb-10 relative z-10">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                  {monthNames[month]} {year}
                </h2>
                <p className="text-[10px] items-center flex gap-1 font-black text-blue-500 uppercase tracking-widest italic">
                  Clinical Calendar Hub
                </p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={prevMonth} 
                  className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-slate-100 active:scale-95"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextMonth} 
                  className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-slate-100 active:scale-95"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-4 relative z-10">
              {/* Weekdays */}
              {daysOfWeek.map(d => (
                <div key={d} className="font-black text-slate-300 text-[10px] uppercase tracking-[0.2em] mb-4 text-center">{d}</div>
              ))}

              {/* Offset Days */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="p-2" />
              ))}

              {/* Actual Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const appsForDay = getAppointmentsForDay(day);

                const isToday =
                  new Date().getDate() === day &&
                  new Date().getMonth() === month &&
                  new Date().getFullYear() === year;

                return (
                  <div
                    key={day}
                    className={`relative p-4 flex flex-col items-center justify-center min-h-[90px] rounded-3xl border transition-all duration-300 cursor-default group/day
                      ${isToday ? 'border-blue-400 bg-blue-50/50 ring-4 ring-blue-500/5' : 'border-slate-50 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5'}
                      ${appsForDay.length > 0 ? 'bg-white' : ''}
                    `}
                  >
                    <span className={`text-lg font-black tracking-tighter ${isToday ? 'text-blue-700' : 'text-slate-800'} group-hover/day:scale-110 transition-transform`}>
                      {day}
                    </span>

                    {/* Indicators */}
                    {appsForDay.length > 0 && (
                      <div className="flex gap-1 mt-3 flex-wrap justify-center">
                        {appsForDay.map((a, idx) => (
                           <div key={idx} className="status-dot dot-live w-1.5 h-1.5" />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- UPCOMING LIST (Timeline Style) --- */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between mb-10">
               <div className="space-y-1">
                 <h2 className="text-xl font-black text-slate-800 tracking-tight leading-none uppercase">Upcoming</h2>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Sync Timeline</p>
               </div>
               <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                  <Activity size={24} />
               </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-hide">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                   <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                   <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Restoring timeline...</p>
                </div>
              ) : upcomingAppointments.length === 0 ? (
                <div className="text-center py-20 space-y-4 opacity-50">
                   <div className="w-16 h-16 bg-slate-50 rounded-full mx-auto flex items-center justify-center">
                      <Clock size={32} />
                   </div>
                   <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Quiet schedule detected</p>
                </div>
              ) : (
                upcomingAppointments.map((app) => (
                  <div
                    key={app.id}
                    className="p-6 rounded-3xl bg-[#f8fafc] border border-slate-100 hover:bg-white hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer group/item relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <ArrowRight size={14} className="text-blue-500" />
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-slate-400 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300 shadow-sm border border-slate-50">
                          {(app.doctorName || 'D').charAt(0)}
                       </div>
                       <div className="space-y-0.5">
                          <h3 className="font-black text-slate-800 leading-tight">
                            {app.doctorName || `Doctor #${app.doctorId}`}
                          </h3>
                          <span className="text-[9px] font-black text-blue-500 uppercase tracking-tighter italic">
                             {app.specialty || "Verified Specialist"}
                          </span>
                       </div>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b border-slate-200/50">
                        <span className="flex items-center gap-1.5"><CalendarCheck size={12} className="text-blue-500" /> {app.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} className="text-amber-500" /> {app.time || "TBD"}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="py-3 bg-white border border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all">
                        Postpone
                      </button>
                      <button className="py-3 bg-white border border-slate-100 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-50 hover:border-red-100 transition-all">
                        Cancel
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="mt-8">
               <button className="w-full bg-[#0f172a] text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-slate-900/10 hover:bg-blue-600 hover:-translate-y-1 active:translate-y-0 transition-all">
                  Sync with Calendar
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
