import React, { useState } from "react";
import { Search, ChevronRight, FileText, Activity, MessageSquare, Pill } from "lucide-react";

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const historyData = [
    {
      id: "C-1001",
      patientName: "Amit Kumar",
      date: "2026-03-20",
      time: "10:30 AM",
      disease: "Viral Fever",
      medicines: "Paracetamol 500mg, Vitamin C",
      tests: "Complete Blood Count (CBC)",
      comments: "Advised 3 days of strict rest and high fluid intake.",
    },
    {
      id: "C-1002",
      patientName: "Neha Gupta",
      date: "2026-03-18",
      time: "02:15 PM",
      disease: "Asthma Checkup",
      medicines: "Salbutamol Inhaler, Monteleukast",
      tests: "Spirometry",
      comments: "Continue current inhaler dosage. Review next month.",
    },
    {
      id: "C-1003",
      patientName: "Rakesh Verma",
      date: "2026-03-15",
      time: "09:00 AM",
      disease: "Hypertension",
      medicines: "Amlodipine 5mg",
      tests: "Lipid Profile, ECG",
      comments: "Blood pressure is slightly high but manageable. Reduce salt intake.",
    },
  ];

  const filteredHistory = historyData.filter((h) => 
    h.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.disease.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 flex flex-col lg:flex-row gap-8">
      
      {/* LEFT COL: HISTORY LIST */}
      <div className="lg:w-1/3 flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Consultation History</h1>
          <p className="text-slate-500 mt-2">Browse past patient records.</p>
        </div>

        {/* Search Box */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search patient or illness..." 
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* List */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex-1 overflow-y-auto max-h-[600px]">
          <div className="divide-y divide-slate-100">
            {filteredHistory.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedConsultation(item)}
                className={`p-4 cursor-pointer transition-colors flex justify-between items-center group ${
                  selectedConsultation?.id === item.id ? "bg-blue-50 border-l-4 border-blue-600" : "hover:bg-slate-50 border-l-4 border-transparent"
                }`}
              >
                <div>
                  <h3 className="font-bold text-slate-800">{item.patientName}</h3>
                  <p className="text-sm text-slate-500">{item.disease}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.date} • {item.time}</p>
                </div>
                <ChevronRight className={`text-slate-300 group-hover:text-blue-500 transition-colors ${selectedConsultation?.id === item.id ? "text-blue-600" : ""}`} size={20} />
              </div>
            ))}
            {filteredHistory.length === 0 && (
              <div className="p-8 text-center text-slate-500">No records found.</div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COL: DETAILS VIEW */}
      <div className="lg:w-2/3">
        {selectedConsultation ? (
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden animate-fade-in-up mt-[100px] lg:mt-[104px]">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative">
              <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
                Consultation ID: {selectedConsultation.id}
              </div>
              <h2 className="text-3xl font-bold">{selectedConsultation.patientName}</h2>
              <p className="text-blue-100 mt-2 text-lg">{selectedConsultation.disease}</p>
              <div className="flex gap-4 mt-6 text-sm text-blue-50 font-medium">
                <span className="flex items-center gap-1"><FileText size={16}/> {selectedConsultation.date}</span>
                <span className="flex items-center gap-1"><Clock size={16}/> {selectedConsultation.time}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              
              <div className="flex gap-4 items-start">
                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                  <Pill size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">Prescribed Medicines</h3>
                  <p className="text-slate-600">{selectedConsultation.medicines}</p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100"></div>

              <div className="flex gap-4 items-start">
                <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                  <Activity size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">Tests Advised</h3>
                  <p className="text-slate-600">{selectedConsultation.tests}</p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100"></div>

              <div className="flex gap-4 items-start">
                <div className="bg-green-100 p-3 rounded-xl text-green-600">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">Doctor's Comments</h3>
                  <p className="text-slate-600">{selectedConsultation.comments}</p>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 mt-[100px] lg:mt-[104px] border-2 border-dashed border-slate-200 rounded-2xl p-12">
            <FileText size={64} className="mb-4 text-slate-300" />
            <p className="text-xl font-medium">Select a patient record to view details</p>
          </div>
        )}
      </div>

    </div>
  );
}
