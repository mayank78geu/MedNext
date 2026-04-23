import React, { useState } from "react";
import { FileText, Download, Upload, Activity, Pill, CalendarClock, MessageSquare } from "lucide-react";

export default function PatientView() {
  const [patientId, setPatientId] = useState("");
  const [patientData, setPatientData] = useState(null);

  const mockPatientSearch = () => {
    // Mocking finding a patient
    setPatientData({
      name: "Ravi Sharma",
      age: 45,
      gender: "Male",
      lastVisit: "2026-03-15",
      bloodGroup: "O+",
      documents: [
        { id: 1, name: "Blood_Test_Report.pdf", date: "2026-03-16" },
        { id: 2, name: "XRay_Chest.png", date: "2026-02-10" }
      ]
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* HEADER SECTION */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Patient Management</h1>
        <p className="text-slate-500 mt-2">View details, prescribe medicines, and update schedules.</p>
      </div>

      {/* SEARCH OR SELECT PATIENT */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
        <input 
          type="text" 
          placeholder="Enter Patient ID or Name to load details..." 
          className="flex-1 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <button 
          onClick={mockPatientSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Load Patient
        </button>
      </div>

      {patientData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
          {/* LEFT COL: PATIENT DETAILS & DOCS */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-4">Patient Profile</h2>
              <div className="space-y-3">
                <p><span className="text-slate-500 font-medium">Name:</span> {patientData.name}</p>
                <p><span className="text-slate-500 font-medium">Age/Gender:</span> {patientData.age} Yrs, {patientData.gender}</p>
                <p><span className="text-slate-500 font-medium">Blood Group:</span> <span className="text-red-500 font-bold">{patientData.bloodGroup}</span></p>
                <p><span className="text-slate-500 font-medium">Last Visit:</span> {patientData.lastVisit}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-4 flex items-center gap-2">
                <FileText size={20}/> Medical Documents
              </h2>
              <div className="space-y-3">
                {patientData.documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{doc.name}</p>
                      <p className="text-xs text-slate-500">{doc.date}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 bg-blue-50 p-2 rounded-lg">
                      <Download size={16}/>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COL: PRESCRIPTIONS & COMMENTS */}
          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800">Consultation Form</h2>
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold">Active Session</span>
              </div>

              {/* Medicines Form */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                  <Pill size={16} className="text-blue-500"/> Prescribe Medicines
                </label>
                <textarea 
                  rows="3" 
                  className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  placeholder="e.g. Paracetamol 500mg, 1x morning, 1x night for 5 days..."
                />
              </div>

              {/* Tests Form */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                  <Activity size={16} className="text-orange-500"/> Prescribe Tests
                </label>
                <textarea 
                  rows="2" 
                  className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  placeholder="e.g. Complete Blood Count (CBC), Lipid Profile..."
                />
              </div>

              {/* Next Visit & Comments */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <CalendarClock size={16} className="text-purple-500"/> Schedule Next Visit
                  </label>
                  <input 
                    type="date"
                    className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <MessageSquare size={16} className="text-green-500"/> Doctor Comments
                  </label>
                  <input 
                    type="text"
                    className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="General advice or notes for the patient..."
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2">
                  <Upload size={18} /> Submit Consultation
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
