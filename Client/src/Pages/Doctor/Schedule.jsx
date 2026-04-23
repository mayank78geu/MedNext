import React, { useState } from "react";
import { CheckCircle, Clock } from "lucide-react";

export default function Schedule() {
  const [scheduleData, setScheduleData] = useState([
    { day: "Monday", active: true, start: "09:00", end: "17:00", perPatient: 30 },
    { day: "Tuesday", active: true, start: "09:00", end: "17:00", perPatient: 30 },
    { day: "Wednesday", active: true, start: "09:00", end: "17:00", perPatient: 30 },
    { day: "Thursday", active: false, start: "00:00", end: "00:00", perPatient: 0 },
    { day: "Friday", active: true, start: "10:00", end: "16:00", perPatient: 20 },
    { day: "Saturday", active: false, start: "00:00", end: "00:00", perPatient: 0 },
    { day: "Sunday", active: false, start: "00:00", end: "00:00", perPatient: 0 },
  ]);

  const toggleDay = (index) => {
    const updated = [...scheduleData];
    updated[index].active = !updated[index].active;
    if (updated[index].active && updated[index].start === "00:00") {
      updated[index].start = "09:00";
      updated[index].end = "17:00";
      updated[index].perPatient = 30;
    }
    setScheduleData(updated);
  };

  const handleTimeChange = (index, field, value) => {
    const updated = [...scheduleData];
    updated[index][field] = value;
    setScheduleData(updated);
  };

  const saveSettings = () => {
    alert("Schedule updated successfully!");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* HEADER SECTION */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">My Schedule</h1>
        <p className="text-slate-500 mt-2">Manage your availability, working days, and time slots.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Clock className="text-blue-600" size={20} /> Weekly Availability
          </h2>
          <button 
            onClick={saveSettings}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium shadow hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>

        <div className="p-6">
          {/* Legend */}
          <div className="grid grid-cols-12 gap-4 pb-4 border-b border-slate-100 text-sm font-semibold text-slate-500 mb-6 px-4">
            <div className="col-span-3">Day</div>
            <div className="col-span-4 text-center">Working Hours (Start / End)</div>
            <div className="col-span-3 text-center">Mins per Patient</div>
            <div className="col-span-2 text-center">Status</div>
          </div>

          <div className="space-y-4">
            {scheduleData.map((slot, idx) => (
              <div 
                key={slot.day} 
                className={`grid grid-cols-12 gap-4 items-center p-4 rounded-xl border transition-all ${
                  slot.active ? "border-blue-100 bg-blue-50/50" : "border-slate-100 bg-slate-50 opacity-60"
                }`}
              >
                {/* Day toggle */}
                <div className="col-span-3 flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={slot.active} 
                    onChange={() => toggleDay(idx)} 
                    className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className={`font-bold ${slot.active ? "text-slate-800" : "text-slate-400"}`}>{slot.day}</span>
                </div>

                {/* Time Selection */}
                <div className="col-span-4 flex items-center justify-center gap-2">
                  <input 
                    type="time" 
                    disabled={!slot.active}
                    value={slot.start}
                    onChange={(e) => handleTimeChange(idx, 'start', e.target.value)}
                    className="border border-slate-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-100"
                  />
                  <span className="text-slate-400 font-medium">to</span>
                  <input 
                    type="time" 
                    disabled={!slot.active}
                    value={slot.end}
                    onChange={(e) => handleTimeChange(idx, 'end', e.target.value)}
                    className="border border-slate-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-100"
                  />
                </div>

                {/* Mins per patient */}
                <div className="col-span-3 flex justify-center">
                   <select 
                     disabled={!slot.active}
                     value={slot.perPatient}
                     onChange={(e) => handleTimeChange(idx, 'perPatient', e.target.value)}
                     className="border border-slate-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-32 disabled:bg-slate-100"
                   >
                     <option value="15">15 mins</option>
                     <option value="20">20 mins</option>
                     <option value="30">30 mins</option>
                     <option value="45">45 mins</option>
                     <option value="60">60 mins</option>
                   </select>
                </div>

                {/* Status Badge */}
                <div className="col-span-2 flex justify-center">
                  {slot.active ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <CheckCircle size={14}/> Active
                    </span>
                  ) : (
                    <span className="bg-slate-200 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">
                      Off Day
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
