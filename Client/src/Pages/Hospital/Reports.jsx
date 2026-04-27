import React from "react";
import { 
  PieChart, 
  TrendingUp, 
  Users, 
  Activity, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Filter,
  BarChart3,
  MousePointer2
} from "lucide-react";

const metrics = [
  { label: "Total Admissions", val: "2,840", trend: "+14.2%", positive: true, icon: <Users /> },
  { label: "Surgery Success", val: "99.2%", trend: "+0.4%", positive: true, icon: <Activity /> },
  { label: "Avg. Wait Time", val: "14m", trend: "-2.1%", positive: true, icon: <MousePointer2 /> },
  { label: "Emergency Cases", val: "482", trend: "+8.5%", positive: false, icon: <Activity /> },
];

export default function Reports() {
  return (
    <div className="p-10 space-y-10 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest">
             Data Intelligence
          </div>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Analytics Hub</h2>
          <p className="text-slate-400 text-xs font-medium italic">High-fidelity clinical data visualization</p>
        </div>
        
        <div className="flex items-center gap-4">
           <button className="bg-white border border-slate-100 p-4 rounded-2xl text-slate-400 hover:text-indigo-600 shadow-sm transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <Filter size={16} /> Filters
           </button>
           <button className="bg-[#0f172a] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/10 active:scale-95 group">
              <Download size={18} className="group-hover:translate-y-1 transition-transform" /> Export Report
           </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] space-y-6 group hover:border-indigo-200 transition-all">
             <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                   {React.cloneElement(m.icon, { size: 20 })}
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${m.positive ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'}`}>
                   {m.positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                   {m.trend}
                </div>
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-500 transition-colors">{m.label}</p>
                <h3 className="text-3xl font-black text-slate-800 mt-1">{m.val}</h3>
             </div>
          </div>
        ))}
      </div>

      {/* Main Charts Simulation */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
         
         {/* Patient Volume Trend */}
         <div className="xl:col-span-2 bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-10">
            <div className="flex items-center justify-between">
               <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                    <TrendingUp size={20} />
                  </div>
                  Patient Inflow Trends
               </h3>
               <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" /> Current Year
                  <span className="w-2 h-2 rounded-full bg-slate-200 ml-4" /> Previous Year
               </div>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-4 px-4 pt-10">
               {[65, 45, 75, 55, 90, 70, 85, 60, 95, 80, 100, 85].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end gap-2 group cursor-pointer h-full">
                     <div className="relative h-full flex items-end justify-center">
                        <div className="absolute -top-10 bg-slate-900 text-white text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                           {h}%
                        </div>
                        <div 
                           className="w-full bg-slate-50 rounded-t-xl group-hover:bg-indigo-100 transition-all duration-700" 
                           style={{ height: '100%' }}
                        />
                        <div 
                           className="absolute bottom-0 w-full bg-indigo-600 rounded-t-xl group-hover:bg-indigo-400 transition-all duration-1000" 
                           style={{ height: `${h}%` }}
                        />
                     </div>
                     <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest text-center">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                     </span>
                  </div>
               ))}
            </div>
         </div>

         {/* Department Performance */}
         <div className="bg-[#0f172a] p-12 rounded-[4rem] text-white space-y-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-6 transition-transform duration-1000">
               <PieChart size={180} />
            </div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4 relative z-10">
               <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white shadow-sm border border-white/10">
                 <BarChart3 size={20} />
               </div>
               Department IQ
            </h3>
            
            <div className="space-y-8 relative z-10">
               {[
                  { label: "Cardiology", val: 88, color: "bg-indigo-500" },
                  { label: "Neurology", val: 72, color: "bg-blue-400" },
                  { label: "Pediatrics", val: 95, color: "bg-emerald-400" },
                  { label: "Emergency", val: 64, color: "bg-rose-500" }
               ].map((dept, i) => (
                  <div key={i} className="space-y-3">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-white/60">{dept.label}</span>
                        <span>{dept.val}% Performance</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${dept.color} rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(255,255,255,0.1)]`} style={{ width: `${dept.val}%` }} />
                     </div>
                  </div>
               ))}
            </div>

            <button className="w-full bg-white text-slate-900 py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all shadow-2xl mt-4 relative z-10">
               Generate Predictive Model
            </button>
         </div>
      </div>

    </div>
  );
}
