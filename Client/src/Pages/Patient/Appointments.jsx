import React, { useState, useEffect } from "react";
import { CalendarCheck, ChevronLeft, ChevronRight, Clock, UserRound, FileText } from "lucide-react";
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

  // --- Date Math ---
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

  // --- Data Binders ---
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
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 transition-all duration-300">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 p-3 rounded-2xl">
          <CalendarCheck className="text-blue-600 size-8" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Appointments</h1>
          <p className="text-slate-500 mt-1">Manage and track your schedule actively.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* --- CALENDAR UI --- */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm leading-relaxed">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              {monthNames[month]} {year}
            </h2>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                <ChevronLeft size={20} className="text-slate-600" />
              </button>
              <button onClick={nextMonth} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                <ChevronRight size={20} className="text-slate-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 md:gap-3 text-center">
            {/* Weekdays */}
            {daysOfWeek.map(d => (
              <div key={d} className="font-semibold text-slate-400 text-sm mb-2">{d}</div>
            ))}

            {/* Empty Offset Layout */}
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
                  className={`relative p-2 flex flex-col items-center justify-start min-h-[60px] md:min-h-[80px] rounded-xl border transition-all duration-300 cursor-default
                    ${isToday ? 'border-blue-400 bg-blue-50/50' : 'border-slate-100 bg-white hover:border-blue-300'}
                    ${appsForDay.length > 0 ? 'shadow-sm' : ''}
                  `}
                >
                  <span className={`text-sm md:text-base font-semibold ${isToday ? 'text-blue-700' : 'text-slate-700'}`}>
                    {day}
                  </span>

                  {/* Appointment Dots */}
                  <div className="flex gap-1 mt-1.5 flex-wrap justify-center">
                    {appsForDay.map((a, idx) => {
                      // Color logic: if past date, gray. Else blue.
                      const isPast = new Date(a.date) < new Date(new Date().setHours(0, 0, 0, 0));
                      return (
                        <span
                          key={idx}
                          className={`w-2 h-2 rounded-full ${isPast ? 'bg-slate-400' : 'bg-blue-600'}`}
                          title={`${a.doctorName || 'Doctor'} - ${a.time || ''}`}
                        />
                      )
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- UPCOMING LIST --- */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-full">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Clock className="text-blue-600" size={24} />
            Upcoming
          </h2>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {loading ? (
              <p className="text-slate-500 text-center py-10">Fetching schedule...</p>
            ) : upcomingAppointments.length === 0 ? (
              <p className="text-slate-500 text-center py-10">No upcoming appointments scheduled.</p>
            ) : (
              upcomingAppointments.map((app) => (
                <div
                  key={app.id}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-900 group flex items-center gap-2">
                      <UserRound size={16} className="text-slate-400" />
                      {app.doctorName || `Doctor #${app.doctorId}`}
                    </h3>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md">
                      {app.status || "Scheduled"}
                    </span>
                  </div>

                  {app.specialty && <p className="text-sm text-slate-600 mb-2">{app.specialty}</p>}

                  <div className="flex flex-col gap-1 text-sm text-slate-500 mt-3 pt-3 border-t border-slate-200/60">
                    <span className="flex items-center gap-2">
                      <CalendarCheck size={14} className="text-slate-400" />
                      {app.date}
                    </span>
                    {app.time && (
                      <span className="flex items-center gap-2">
                        <Clock size={14} className="text-slate-400" />
                        {app.time}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons Placeholder */}
                  <div className="flex gap-2 mt-4 pt-2">
                    <button className="flex-1 text-center py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors">
                      Reschedule
                    </button>
                    <button className="flex-1 text-center py-2 bg-white border border-slate-200 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
