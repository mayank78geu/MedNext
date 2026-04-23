import React from "react";
import { Camera, Save, User as UserIcon, Mail, Phone, Award, Shield } from "lucide-react";

export default function Profile() {
  const saveProfile = () => {
    alert("Profile details updated successfully!");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>
        <p className="text-slate-500 mt-2">Manage your public information and credential details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT COL: PROFILE PICTURE & BASIC */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center">
            
            <div className="relative group mb-6">
              <div className="h-32 w-32 rounded-full border-4 border-slate-50 overflow-hidden bg-slate-100 flex items-center justify-center shadow-inner">
                 <UserIcon size={64} className="text-slate-400" />
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition group-hover:scale-110">
                <Camera size={18} />
              </button>
            </div>

            <h2 className="text-xl font-bold text-slate-800">Dr. Smith Doe</h2>
            <p className="text-slate-500 font-medium">Senior Cardiologist</p>
            
            <div className="mt-6 w-full space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <Mail size={16} className="text-blue-500"/> smith.doe@mednext.com
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <Phone size={16} className="text-blue-500"/> +91 98765 43210
              </div>
            </div>
            
          </div>
        </div>

        {/* RIGHT COL: DETAILS FORM */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">General Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Dr. Smith Doe"
                  className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Specialty</label>
                <input 
                  type="text" 
                  defaultValue="Cardiology"
                  className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Award size={16} className="text-orange-500"/> Experience (Years)
                </label>
                <input 
                  type="number" 
                  defaultValue="12"
                  className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Shield size={16} className="text-green-500"/> License Number
                </label>
                <input 
                  type="text" 
                  defaultValue="MED-123456-IN"
                  className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Consultation Fee (₹)</label>
                <input 
                  type="number" 
                  defaultValue="800"
                  className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Short Bio</label>
                <textarea 
                  rows="4"
                  defaultValue="Experienced Cardiologist with over 12 years of clinical excellence in treating cardiovascular diseases. Dedicated to exemplary patient outcomes and following all necessary medical procedures with the use of the latest industry equipment and technology."
                  className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
              <button 
                onClick={saveProfile}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <Save size={18} /> Save Details
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
