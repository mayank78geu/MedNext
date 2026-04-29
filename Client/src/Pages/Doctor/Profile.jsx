import React, { useState, useEffect } from "react";
import { Camera, Save, User as UserIcon, Mail, Phone, Award, Shield } from "lucide-react";
import { toast } from "react-toastify";
import { GetUserByEmail } from "../../api/users.api.js";
import { GetDoctorByUserId, UpdateDoctor } from "../../api/doctors.api.js";

export default function Profile() {
  const [doctor, setDoctor] = useState({
    name: "Loading...",
    specialization: "",
    experience: ""
  });
  const [userEmail, setUserEmail] = useState("");
  const [doctorId, setDoctorId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const email = payload.sub;
        setUserEmail(email);

        const userData = await GetUserByEmail(email);
        const userId = userData.data.id;

        const docData = await GetDoctorByUserId(userId);
        if (docData) {
            setDoctorId(docData.id);
            setDoctor({
                name: docData.name || "",
                specialization: docData.specialization || "",
                experience: docData.experience || ""
            });
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
        toast.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
        await UpdateDoctor(doctorId, {
            name: doctor.name,
            specialization: doctor.specialization,
            experience: parseInt(doctor.experience) || 0
        });
        toast.success("Profile details updated successfully!");
    } catch (err) {
        toast.error("Failed to update profile.");
    }
  };

  if (loading) {
      return <div className="p-8 text-center text-slate-500 font-bold uppercase tracking-widest">Loading Profile...</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>
        <p className="text-slate-500 mt-2">Manage your public information and credential details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
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

            <h2 className="text-xl font-bold text-slate-800">{doctor.name}</h2>
            <p className="text-slate-500 font-medium">{doctor.specialization || "Specialization pending"}</p>
            
            <div className="mt-6 w-full space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <Mail size={16} className="text-blue-500"/> {userEmail}
              </div>
            </div>
            
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">General Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={doctor.name}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Specialization</label>
                <input 
                  type="text" 
                  name="specialization"
                  value={doctor.specialization}
                  onChange={handleChange}
                  placeholder="e.g. Cardiology"
                  className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Award size={16} className="text-orange-500"/> Experience (Years)
                </label>
                <input 
                  type="number" 
                  name="experience"
                  value={doctor.experience}
                  onChange={handleChange}
                  placeholder="e.g. 12"
                  className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
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
