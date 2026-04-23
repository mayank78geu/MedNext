import React, { useState } from "react";
import { User, Mail, Phone, ShieldCheck, ArrowRight, Activity, Save, XCircle, UserCircle } from "lucide-react";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Rahul Verma",
    email: "rahul@email.com",
    phone: "9876543210",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Identity profile updated and synchronized.");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 pb-20">
      
      <div className="p-10 max-w-7xl mx-auto space-y-10 animate-fadeIn overflow-y-auto">
        
        {/* Modern Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tight text-slate-800 uppercase">Account Management</h1>
              <p className="text-slate-500 font-medium flex items-center gap-2">
                Secure your medical identity <ArrowRight size={14} className="text-blue-500" />
              </p>
          </div>
          <div className="flex items-center gap-2 text-slate-400 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
             <ShieldCheck size={18} className="text-green-500" />
             <span className="text-[10px] font-black uppercase tracking-widest leading-none">Security Protocol Active</span>
          </div>
        </header>

        {/* Profile Card / Banner */}
        <section className="relative overflow-hidden bg-[#0f172a] rounded-[2.5rem] p-10 text-white shadow-2xl group">
             <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <UserCircle size={180} />
             </div>
             
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl font-black shadow-2xl border-4 border-white/10 group-hover:rotate-3 transition-transform duration-500">
                   {user.name[0]}
                </div>
                <div className="text-center md:text-left space-y-2">
                   <h2 className="text-4xl font-black tracking-tighter">{user.name}</h2>
                   <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                      <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-2">
                        <Mail size={12} className="text-blue-400" /> {user.email}
                      </span>
                      <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 text-green-400">
                        Primary Account Linked
                      </span>
                   </div>
                </div>
             </div>
        </section>

        {/* Edit Form */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <ShieldCheck size={120} />
          </div>

          <div className="relative z-10 space-y-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
               <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                     <Activity size={20} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">Identity Details</h3>
               </div>
               {!isEditing && (
                 <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-[#0f172a] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-900/10"
                 >
                    Modify Credentials
                 </button>
               )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Verified Full Name</label>
                <div className={`flex items-center gap-3 bg-[#f8fafc] border rounded-2xl px-5 py-4 transition-all ${isEditing ? 'border-blue-400 ring-4 ring-blue-500/5 bg-white' : 'border-slate-100 cursor-not-allowed opacity-70'}`}>
                  <User size={18} className={`${isEditing ? 'text-blue-500' : 'text-slate-300'}`} />
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full bg-transparent outline-none font-bold text-slate-700"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Encrypted Email Address</label>
                <div className={`flex items-center gap-3 bg-[#f8fafc] border rounded-2xl px-5 py-4 transition-all ${isEditing ? 'border-blue-400 ring-4 ring-blue-500/5 bg-white' : 'border-slate-100 cursor-not-allowed opacity-70'}`}>
                  <Mail size={18} className={`${isEditing ? 'text-blue-500' : 'text-slate-300'}`} />
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full bg-transparent outline-none font-bold text-slate-700"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Registered Contact Number</label>
                <div className={`flex items-center gap-3 bg-[#f8fafc] border rounded-2xl px-5 py-4 transition-all ${isEditing ? 'border-blue-400 ring-4 ring-blue-500/5 bg-white' : 'border-slate-100 cursor-not-allowed opacity-70'}`}>
                  <Phone size={18} className={`${isEditing ? 'text-blue-500' : 'text-slate-300'}`} />
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full bg-transparent outline-none font-bold text-slate-700"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-4 pt-6 border-t border-slate-100 animate-fadeIn">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
                >
                  <XCircle size={16} /> Discard Changes
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-500/20"
                >
                  <Save size={16} /> Update Identity
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Security / System Footer */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                 <ShieldCheck size={24} />
              </div>
              <div className="space-y-0.5">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Level</p>
                 <p className="text-sm font-black text-green-600 uppercase tracking-tighter italic">End-to-End Encrypted Registry</p>
              </div>
           </div>
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] max-w-sm text-center md:text-right">
             Changes to medical registry items may require multi-factor verification from your primary healthcare provider.
           </p>
        </div>

      </div>
    </div>
  );
};

export default Profile;
