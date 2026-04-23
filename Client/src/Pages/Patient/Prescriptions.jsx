import React, { useState, useEffect } from "react";
import { FileText, ArrowRight, ShieldCheck, Activity, Search, Filter } from "lucide-react";
import PrescriptionCard from "../../Component/PatientPrescription/PrescriptionCard";
import PrescriptionModal from "../../Component/PatientPrescription/PrescriptionModal";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API fetch with premium transition
    const timer = setTimeout(() => {
      const data = [
        {
          id: 1,
          doctor: "Dr. Sharma",
          patient: "Rahul Verma",
          date: "2026-04-10",
          medicines: [
            { name: "Paracetamol", dosage: "500mg", time: "Twice a day" },
            { name: "Azithromycin", dosage: "250mg", time: "Once a day" },
          ],
          notes: "Take medicines after food",
          fileUrl: "/sample-prescription.pdf"
        },
      ];
      setPrescriptions(data);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 pb-20">
      <div className="p-10 max-w-7xl mx-auto space-y-10 animate-fadeIn overflow-y-auto">
        
        {/* Modern Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tight text-slate-800 uppercase">Medical Prescriptions</h1>
              <p className="text-slate-500 font-medium flex items-center gap-2">
                Digital health records vault <ArrowRight size={14} className="text-blue-500" />
              </p>
          </div>
          <div className="flex items-center gap-2 text-slate-400 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
             <ShieldCheck size={18} className="text-green-500" />
             <span className="text-[10px] font-black uppercase tracking-widest leading-none">Encrypted Access</span>
          </div>
        </header>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4">
           <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search prescription by doctor or medication..." 
                className="w-full bg-white border border-slate-100 p-4 pl-12 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-sm"
              />
           </div>
           <button className="flex items-center gap-2 bg-white border border-slate-100 px-6 py-4 rounded-2xl shadow-sm hover:bg-slate-50 transition-colors text-sm font-black uppercase tracking-widest text-slate-600">
              <Filter size={16} /> Filter
           </button>
        </div>

        {/* Prescription Inventory Container */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <FileText size={120} />
           </div>

           {loading ? (
             <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Decrypting records...</p>
             </div>
           ) : prescriptions.length === 0 ? (
             <div className="text-center py-20 space-y-4 opacity-50 relative z-10">
                <div className="w-20 h-20 bg-slate-50 rounded-full mx-auto flex items-center justify-center text-slate-300">
                   <FileText size={40} />
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No verified prescriptions found</p>
             </div>
           ) : (
             <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 gap-6">
                   {prescriptions.map((item, index) => (
                      <PrescriptionCard
                        key={item.id}
                        item={item}
                        onView={setSelectedPrescription}
                      />
                   ))}
                </div>
             </div>
           )}
        </div>

        {/* Informational Footer */}
        <div className="flex items-center justify-center gap-4 py-6 border-t border-slate-100">
           <Activity size={18} className="text-blue-500" />
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">MedNext Digital Records System v2.0</p>
        </div>
      </div>

      {/* Revitalized Modal */}
      <PrescriptionModal
        data={selectedPrescription}
        onClose={() => setSelectedPrescription(null)}
      />
    </div>
  );
};

export default Prescriptions;
