import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, ShieldCheck, Activity, Save, XCircle, UserCircle,
  MapPin, Hash, Ruler, Weight, Heart, Moon, HeartPulse, Edit3, CheckCircle
} from "lucide-react";
import { toast } from "react-toastify";
import { GetUserByEmail } from "../../api/users.api.js";
import { GetPatientByUserId, UpdatePatientByUserId } from "../../api/patients.api.js";

const Field = ({ icon: Icon, label, name, type = "text", value, onChange, disabled, placeholder, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
    <div className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 border transition-all ${
      disabled
        ? "bg-white/3 border-white/5 opacity-60 cursor-not-allowed"
        : "bg-white/5 border-indigo-500/30 ring-2 ring-indigo-500/10"
    }`}>
      <Icon size={16} className={disabled ? "text-slate-600" : "text-indigo-400"} />
      {children ?? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm font-bold text-white placeholder:text-slate-600 disabled:cursor-not-allowed"
        />
      )}
    </div>
  </div>
);

const Profile = () => {
  const [patient, setPatient] = useState({
    name: "", city: "", pincode: "", age: "",
    height: "", weight: "", stressLevel: "moderate",
    averageSleepTime: "", sleepQuality: "moderate", bpIssues: "n"
  });
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showCompleteProfileModal, setShowCompleteProfileModal] = useState(false);

  const isProfileIncomplete = (d) => !d.city || !d.pincode || !d.age || !d.height || !d.weight;

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const payload = JSON.parse(atob(token.split(".")[1]));
        const email = payload.sub;
        setUserEmail(email);
        const userData = await GetUserByEmail(email);
        const uid = userData.data.id;
        setUserId(uid);
        const pd = await GetPatientByUserId(uid);
        if (pd) {
          setPatient({
            name: pd.name || "",  city: pd.city || "",  pincode: pd.pincode || "",
            age: pd.age || "",  height: pd.height || "",  weight: pd.weight || "",
            stressLevel: pd.stressLevel || "moderate",
            averageSleepTime: pd.averageSleepTime || "",
            sleepQuality: pd.sleepQuality || "moderate",
            bpIssues: pd.bpIssues || "n"
          });
          if (isProfileIncomplete(pd)) setShowCompleteProfileModal(true);
        }
      } catch { toast.error("Failed to load profile."); }
      finally { setLoading(false); }
    })();
  }, []);

  const handleChange = (e) => setPatient({ ...patient, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    try {
      if (!userId) throw new Error("Missing user ID");
      await UpdatePatientByUserId(userId, patient);
      setIsEditing(false);
      toast.success("Medical profile synchronized.");
    } catch { toast.error("Failed to update profile."); }
    finally { setSaving(false); }
  };

  if (loading) {
    return (
      <div className="min-h-full bg-[#060d1f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-[10px] text-slate-600 uppercase tracking-widest font-black">Synchronizing Identity…</p>
        </div>
      </div>
    );
  }

  const initials = patient.name ? patient.name.slice(0, 2).toUpperCase() : "P";

  return (
    <div className="min-h-full bg-[#060d1f] text-white font-sans">
      <div className="p-8 space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">
              Account <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">Profile</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Secure medical identity management</p>
          </div>
          <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-3 py-2">
            <ShieldCheck size={14} className="text-indigo-400" />
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Security Active</span>
          </div>
        </motion.div>

        {/* Identity Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#0f1e3d] to-[#0a1128] border border-indigo-500/20 rounded-3xl p-8"
        >
          <div className="absolute top-0 right-0 w-80 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <UserCircle size={160} />
          </div>
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl font-black shadow-2xl shadow-indigo-900/50 border-2 border-indigo-400/20 flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-black text-white tracking-tight">{patient.name || "Patient"}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="flex items-center gap-1.5 bg-white/8 border border-white/10 px-3 py-1 rounded-full text-[10px] font-black text-slate-400">
                  <Mail size={10} /> {userEmail}
                </span>
                <span className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black text-emerald-400">
                  Verified Patient
                </span>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/30"
              >
                <Edit3 size={13} /> Edit Profile
              </button>
            )}
          </div>
        </motion.div>

        {/* Edit form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/8 rounded-3xl p-6"
        >
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/5">
            <div className="w-9 h-9 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
              <Activity size={16} />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-tight">Medical & Location Demographics</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">{isEditing ? "Edit mode active — changes will be saved on submit" : "Click Edit Profile to modify your details"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Field icon={User}      label="Full Name"          name="name"             value={patient.name}             onChange={handleChange} disabled={!isEditing} placeholder="Legal full name" />
            <Field icon={MapPin}    label="City"               name="city"             value={patient.city}             onChange={handleChange} disabled={!isEditing} placeholder="e.g. Mumbai" />
            <Field icon={Hash}      label="Pincode"            name="pincode"          value={patient.pincode}          onChange={handleChange} disabled={!isEditing} placeholder="e.g. 400001" />
            <Field icon={UserCircle} label="Age"               name="age"   type="number" value={patient.age}          onChange={handleChange} disabled={!isEditing} placeholder="e.g. 25" />
            <Field icon={Ruler}     label="Height (cm)"        name="height" type="number" value={patient.height}      onChange={handleChange} disabled={!isEditing} placeholder="e.g. 175" />
            <Field icon={Weight}    label="Weight (kg)"        name="weight" type="number" value={patient.weight}      onChange={handleChange} disabled={!isEditing} placeholder="e.g. 70" />

            <Field icon={Heart}     label="Stress Level"       name="stressLevel"      value={patient.stressLevel}      onChange={handleChange} disabled={!isEditing}>
              <select name="stressLevel" value={patient.stressLevel} onChange={handleChange} disabled={!isEditing}
                className="w-full bg-transparent outline-none text-sm font-bold text-white disabled:cursor-not-allowed">
                <option value="low" className="bg-[#0f172a]">Low</option>
                <option value="moderate" className="bg-[#0f172a]">Moderate</option>
                <option value="high" className="bg-[#0f172a]">High</option>
              </select>
            </Field>

            <Field icon={Moon}      label="Avg Sleep (Hrs)"   name="averageSleepTime" type="number" value={patient.averageSleepTime} onChange={handleChange} disabled={!isEditing} placeholder="e.g. 8" />

            <Field icon={Moon}      label="Sleep Quality"     name="sleepQuality"     value={patient.sleepQuality}     onChange={handleChange} disabled={!isEditing}>
              <select name="sleepQuality" value={patient.sleepQuality} onChange={handleChange} disabled={!isEditing}
                className="w-full bg-transparent outline-none text-sm font-bold text-white disabled:cursor-not-allowed">
                <option value="excellent" className="bg-[#0f172a]">Excellent</option>
                <option value="moderate" className="bg-[#0f172a]">Moderate</option>
                <option value="poor" className="bg-[#0f172a]">Poor</option>
              </select>
            </Field>

            <Field icon={HeartPulse} label="BP Issues"        name="bpIssues"         value={patient.bpIssues}         onChange={handleChange} disabled={!isEditing}>
              <select name="bpIssues" value={patient.bpIssues} onChange={handleChange} disabled={!isEditing}
                className="w-full bg-transparent outline-none text-sm font-bold text-white disabled:cursor-not-allowed">
                <option value="y" className="bg-[#0f172a]">Yes</option>
                <option value="n" className="bg-[#0f172a]">No</option>
              </select>
            </Field>
          </div>

          <AnimatePresence>
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex justify-end gap-3 pt-6 mt-4 border-t border-white/5"
              >
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-slate-400 hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
                >
                  <XCircle size={14} /> Discard
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/30"
                >
                  {saving ? (
                    <div className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Complete Profile Modal */}
      <AnimatePresence>
        {showCompleteProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0d1a35] border border-indigo-500/20 rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400">
                <CheckCircle size={30} />
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight mb-2">Complete Your Profile</h2>
              <p className="text-sm text-slate-400 font-medium mb-6">
                Your medical profile is incomplete. Filling in your details ensures better healthcare recommendations.
              </p>
              <button
                onClick={() => { setShowCompleteProfileModal(false); setIsEditing(true); }}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/30 mb-3"
              >
                Complete Profile Now
              </button>
              <button
                onClick={() => setShowCompleteProfileModal(false)}
                className="w-full py-2.5 text-slate-600 hover:text-slate-400 font-black text-[10px] uppercase tracking-widest transition-colors"
              >
                I'll do it later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
