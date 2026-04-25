import React from "react";
import { X, Download, FileText, User, Calendar, Pill, Notebook, ShieldCheck } from "lucide-react";

const PrescriptionModal = ({ data, onClose }) => {
  if (!data) return null;

  const handleDownload = async () => {
    if (!data.fileUrl) return;

    try {
      const response = await fetch(data.fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.patient || "prescription"}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Security protocol failed to export document.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0f172a]/60 backdrop-blur-md animate-fadeIn p-4">

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-scaleIn border border-slate-100 flex flex-col">
        
        {/* Header - Modern Gradient */}
        <div className="bg-[#0f172a] text-white p-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <FileText size={80} />
           </div>
           
           <div className="relative z-10 flex justify-between items-start">
              <div className="space-y-1">
                 <h2 className="text-2xl font-black tracking-tight uppercase">Prescription Details</h2>
                 <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2 italic">
                    <ShieldCheck size={12} /> Encrypted Digital Record
                 </p>
              </div>
              
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90"
              >
                <X size={18} />
              </button>
           </div>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-8 overflow-y-auto flex-1 scrollbar-hide">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-500">Consulting Physician</p>
              <p className="text-sm font-black text-slate-800 flex items-center gap-2 italic">
                 <User size={14} className="text-slate-300" /> {data.doctor}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-500">Scheduled Patient</p>
              <p className="text-sm font-black text-slate-800 flex items-center gap-2 italic">
                 <User size={14} className="text-slate-300" /> {data.patient}
              </p>
            </div>

            <div className="md:col-span-2 bg-slate-50 p-5 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-500">Issuance Timestamp</p>
              <p className="text-sm font-black text-slate-800 flex items-center justify-center gap-2 italic">
                 <Calendar size={14} className="text-blue-500" /> {data.date}
              </p>
            </div>
          </div>

          {/* Medications Section */}
          <section className="space-y-4">
             <div className="flex items-center gap-2 px-1">
                <Pill size={18} className="text-blue-600" />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">Prescribed Medications</h3>
             </div>

             <div className="space-y-3">
               {data.medicines?.map((med, i) => (
                 <div
                   key={i}
                   className="flex justify-between items-center bg-white border border-slate-100 p-5 rounded-2xl hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                 >
                   <div className="space-y-1">
                     <p className="text-sm font-black text-slate-800">{med.name}</p>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:animate-pulse" />
                        {med.dosage}
                     </p>
                   </div>

                   <span className="bg-[#0f172a] text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/10">
                     {med.time}
                   </span>
                 </div>
               ))}
             </div>
          </section>

          {/* Clinical Notes Section */}
          <section className="space-y-3">
             <div className="flex items-center gap-2 px-1">
                <Notebook size={18} className="text-amber-600" />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">Clinical Guidelines</h3>
             </div>
             <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] text-sm text-amber-900 font-bold leading-relaxed italic">
               "{data.notes || "No supplementary clinical guidelines provided."}"
             </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-8 border-t border-slate-100 flex flex-col md:flex-row justify-end gap-3 bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-8 py-4 rounded-2xl border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95"
          >
            Close Session
          </button>

          {data.fileUrl ? (
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
            >
              <Download size={16} />
              Export PDF Copy
            </button>
          ) : (
            <button
              disabled
              className="bg-slate-200 text-slate-400 px-8 py-4 rounded-2xl cursor-not-allowed text-[10px] font-black uppercase tracking-widest"
            >
              Digital File Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;