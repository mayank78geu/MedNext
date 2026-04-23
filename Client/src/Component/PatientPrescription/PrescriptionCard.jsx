import React from "react";
import { Eye, FileText, Calendar, User, ArrowUpRight } from "lucide-react";

const PrescriptionCard = ({ item, onView }) => {
  return (
    <div className="group relative bg-[#f8fafc] border border-slate-100 rounded-3xl p-6 hover:bg-white hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer overflow-hidden">
      
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-[4rem] group-hover:from-blue-500/10 transition-colors pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        
        <div className="flex items-center gap-5">
           <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <FileText size={24} />
           </div>
           
           <div className="space-y-1">
              <div className="flex items-center gap-2">
                 <h2 className="font-black text-slate-800 tracking-tight leading-none uppercase group-hover:text-blue-600 transition-colors">
                    {item.doctor}
                 </h2>
                 <span className="bg-blue-50 text-blue-600 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-blue-100">Verified</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 italic">
                 <User size={12} className="text-slate-300" /> Issued for {item.patient}
              </p>
           </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
           <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-blue-500" /> {item.date}</span>
           </div>

           <button
             onClick={() => onView(item)}
             className="flex items-center justify-center gap-2 bg-white border border-slate-100 text-slate-700 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-[#0f172a] hover:text-white hover:border-[#0f172a] transition-all group/btn active:scale-95"
           >
             <Eye size={14} className="group-hover/btn:scale-110 transition-transform" /> 
             View Digital Copy
             <ArrowUpRight size={14} className="opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
           </button>
        </div>

      </div>
    </div>
  );
};

export default PrescriptionCard;