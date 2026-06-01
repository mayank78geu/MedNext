import React, { useState, useEffect } from "react";
import {
  Building2,
  MapPin,
  Globe,
  Mail,
  Phone,
  ShieldCheck,
  ArrowRight,
  Save,
  XCircle
} from "lucide-react";
import { toast } from "react-toastify";
import { GetUserByEmail } from "../../api/users.api.js";
import { GetHospitalByUserId, UpdateHospital } from "../../api/hospitals.api.js";

export default function Profile() {
  const [hospitalInfo, setHospitalInfo] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    specialties: "",
  });
  const [userEmail, setUserEmail] = useState("");
  const [hospitalId, setHospitalId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const payload = JSON.parse(atob(token.split(".")[1]));
        const email = payload.sub;
        setUserEmail(email);

        // GetUserByEmail returns ApiResponse wrapper: { success, data: { id, ... } }
        const userData = await GetUserByEmail(email);
        const userId = userData.data.id;

        // GetHospitalByUserId also returns ApiResponse wrapper: { success, data: { id, name, ... } }
        const hospResponse = await GetHospitalByUserId(userId);
        const hosp = hospResponse.data; // unwrap the ApiResponse
        if (hosp) {
          setHospitalId(hosp.id);
          setHospitalInfo({
            name: hosp.name || "",
            address: hosp.address || "",
            city: hosp.city || "",
            phone: hosp.phone || "",
            specialties: hosp.specialties || "",
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
    setHospitalInfo({ ...hospitalInfo, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await UpdateHospital(hospitalId, hospitalInfo);
      setIsEditing(false);
      toast.success("Hospital profile updated successfully.");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update hospital profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    setIsEditing(false);
    // re-fetch to reset unsaved changes
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen p-10 flex justify-center items-center font-black text-slate-400 uppercase tracking-widest">
        Loading Credentials...
      </div>
    );
  }

  const fieldStyle = (editable) =>
    `flex items-center gap-3 bg-[#f8fafc] border rounded-2xl px-5 py-4 transition-all ${
      editable
        ? "border-blue-400 ring-4 ring-blue-500/5 bg-white"
        : "border-slate-100 cursor-not-allowed opacity-70"
    }`;

  const iconStyle = (editable) =>
    `${editable ? "text-blue-500" : "text-indigo-600"} flex-shrink-0`;

  return (
    <div className="p-10 space-y-10 animate-fadeIn">

      {/* Hero Banner */}
      <div className="relative h-72 rounded-[4rem] overflow-hidden group shadow-2xl shadow-indigo-900/10">
        <img
          src="https://images.unsplash.com/photo-1587350859728-117699f4a7c3?auto=format&fit=crop&q=80&w=2000"
          alt="Hospital Exterior"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />

        <div className="absolute bottom-10 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 backdrop-blur-md rounded-full text-[9px] font-black text-blue-300 uppercase tracking-widest border border-blue-500/20">
              Verified Institution
            </div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
              {hospitalInfo.name || "Your Hospital"}
            </h2>
            <p className="text-blue-400 font-black text-xs uppercase tracking-[0.2em]">
              {hospitalInfo.city ? `Located in ${hospitalInfo.city}` : "Location Pending"}
            </p>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white text-slate-900 px-8 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95 group flex items-center gap-2"
            >
              Update Profile <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Main Form Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-10">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] border-b border-slate-100 pb-6">
              General Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">

              {/* Institution Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institution Name</label>
                <div className={fieldStyle(isEditing)}>
                  <Building2 className={iconStyle(isEditing)} size={18} />
                  <input
                    type="text"
                    name="name"
                    value={hospitalInfo.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Hospital name"
                    className="w-full bg-transparent outline-none font-bold text-slate-700"
                  />
                </div>
              </div>

              {/* City */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">City</label>
                <div className={fieldStyle(isEditing)}>
                  <Globe className={iconStyle(isEditing)} size={18} />
                  <input
                    type="text"
                    name="city"
                    value={hospitalInfo.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="e.g. Mumbai"
                    className="w-full bg-transparent outline-none font-bold text-slate-700"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Physical Address</label>
                <div className={fieldStyle(isEditing)}>
                  <MapPin className={iconStyle(isEditing)} size={18} />
                  <input
                    type="text"
                    name="address"
                    value={hospitalInfo.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Full street address"
                    className="w-full bg-transparent outline-none font-bold text-slate-700"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Phone</label>
                <div className={fieldStyle(isEditing)}>
                  <Phone className={iconStyle(isEditing)} size={18} />
                  <input
                    type="text"
                    name="phone"
                    value={hospitalInfo.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-transparent outline-none font-bold text-slate-700"
                  />
                </div>
              </div>

              {/* Specialties */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Specialties</label>
                <div className={fieldStyle(isEditing)}>
                  <ShieldCheck className={iconStyle(isEditing)} size={18} />
                  <input
                    type="text"
                    name="specialties"
                    value={hospitalInfo.specialties}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="e.g. Cardiology, Orthopedics"
                    className="w-full bg-transparent outline-none font-bold text-slate-700"
                  />
                </div>
              </div>

              {/* Registered Email (readonly) */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registered Email</label>
                <div className="flex items-center gap-3 bg-[#f8fafc] border border-slate-100 rounded-2xl px-5 py-4 opacity-60 cursor-not-allowed">
                  <Mail className="text-indigo-600 flex-shrink-0" size={18} />
                  <input
                    type="email"
                    value={userEmail}
                    disabled
                    className="w-full bg-transparent outline-none font-bold text-slate-700"
                  />
                </div>
              </div>

            </div>

            {/* Save / Discard Buttons */}
            {isEditing && (
              <div className="flex justify-end gap-4 pt-8 border-t border-slate-100 animate-fadeIn">
                <button
                  onClick={handleDiscard}
                  className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
                >
                  <XCircle size={16} /> Discard
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-500/20 disabled:opacity-50"
                >
                  <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Side Info Panel */}
        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                <ShieldCheck size={16} />
              </div>
              System Info
            </h3>

            <div className="space-y-5">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hospital ID</p>
                <p className="text-sm font-black text-slate-800">#{hospitalId || "—"}</p>
              </div>
              <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-100/60 space-y-2">
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-sm font-black text-emerald-700">Active & Verified</p>
                </div>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin Account</p>
                <p className="text-xs font-bold text-slate-700 break-all">{userEmail}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic text-center leading-relaxed">
                Secure medical profile management.{" "}
                <span className="text-indigo-600">Encrypted</span> end-to-end.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
