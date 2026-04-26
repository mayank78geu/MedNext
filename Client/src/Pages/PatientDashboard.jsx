import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetPatientAppointments } from '../api/appointments.api';
import {
    CalendarCheck,
    UploadCloud,
    History,
    Pill,
    Search,
    LogOut,
    FileText,
    Activity,
    Plus,
    Bell,
    Settings,
    User,
    ArrowUpRight,
    Download,
    Trash2,
    Calendar,
    Clock,
    UserCircle
} from 'lucide-react';

// --- MOCK DATA ---
const medicalDocuments = [
    { id: 1, name: 'MRI_Scan_Report.pdf', type: 'Imaging', date: 'Jun 10, 2024' },
    { id: 2, name: 'Blood_Test_Results.pdf', type: 'Lab', date: 'May 05, 2024' },
];

const prescriptions = [
    { id: 1, medication: 'Amoxicillin', dose: '500mg, Daily', doctor: 'Dr. Sarah Johnson', date: 'Jun 11, 2024' },
    { id: 2, medication: 'Ibuprofen', dose: '200mg, as needed', doctor: 'Dr. Michael Chen', date: 'May 06, 2024' },
];

function PatientDashboard() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [patientName, setPatientName] = useState('Patient');
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payloadStr = atob(token.split('.')[1]);
                const payload = JSON.parse(payloadStr);
                const username = payload.sub ? payload.sub.split('@')[0] : 'Patient';
                setPatientName(username.charAt(0).toUpperCase() + username.slice(1));
            } catch (err) {
                console.error("Token decode error:", err);
            }
        }

        const fetchAppointments = async () => {
            try {
                const data = await GetPatientAppointments();
                setAppointments(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("API error fetching appointments", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-20 pt-24">
            <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
                
                {/* 1. WELCOME BANNER */}
                <section className="relative overflow-hidden bg-indigo-600 rounded-[2.5rem] p-10 sm:p-14 text-white shadow-2xl shadow-indigo-200 group">
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <Activity size={240} />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md border border-white/10">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Patient Identity Verified
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Good Morning, <br /> {patientName}</h1>
                            <p className="text-indigo-100 text-lg max-w-md font-medium">Your health journey is in safe hands. Here is a summary of your clinical records.</p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate("/patient-dashboard/find-doctors")}
                                className="flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all active:scale-95 shadow-xl shadow-indigo-900/10"
                            >
                                <Search size={18} />
                                Find Doctors
                            </button>
                            <button className="flex items-center gap-3 bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-400 transition-all active:scale-95 border border-indigo-400 shadow-xl shadow-indigo-900/10">
                                <Plus size={18} />
                                New Request
                            </button>
                        </div>
                    </div>
                </section>

                {/* 2. STATS & QUICK ACTIONS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {/* Document Upload Card */}
                    <div
                        onClick={() => fileInputRef.current.click()}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center space-y-6 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 transition-all duration-500 cursor-pointer group"
                    >
                        <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                            <UploadCloud size={40} className="group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2">Vault Storage</h3>
                            <p className="text-sm text-slate-500 font-medium">Securely upload and share your clinical reports.</p>
                        </div>
                        <input type="file" ref={fileInputRef} className="hidden" />
                        <div className="pt-2">
                           <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest group-hover:translate-x-2 transition-transform inline-block">Execute Upload →</span>
                        </div>
                    </div>

                    {/* Prescriptions Summary */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] space-y-6">
                        <div className="flex items-center justify-between">
                            <div className='flex items-center gap-3'>
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">
                                    <Pill size={20} />
                                </div>
                                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Active Meds</h3>
                            </div>
                            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:translate-x-1 transition-transform">Detailed Logs →</button>
                        </div>
                        <div className="space-y-4">
                            {prescriptions.map(p => (
                                <div key={p.id} className="bg-slate-50 p-4 rounded-2xl flex items-start gap-4 border border-slate-100 group hover:bg-white hover:border-blue-200 transition-all">
                                    <div className="bg-white p-2.5 rounded-lg shadow-sm">
                                        <FileText className="text-slate-400 group-hover:text-blue-500 transition-colors" size={18} />
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-800 uppercase tracking-tight text-xs">{p.medication}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{p.doctor}</p>
                                        <p className="text-[9px] font-bold text-blue-500 mt-2 bg-blue-50 inline-block px-2 py-0.5 rounded-full">{p.dose}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline Summary */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] space-y-6">
                        <div className="flex items-center justify-between">
                            <div className='flex items-center gap-3'>
                                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                                    <History size={20} />
                                </div>
                                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Case History</h3>
                            </div>
                            <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:translate-x-1 transition-transform">Timeline →</button>
                        </div>
                        <div className="space-y-4 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                            {[
                                { title: 'Cardiology Review', date: 'Jun 10', status: 'Finalized' },
                                { title: 'Lab Assessment', date: 'May 05', status: 'Finalized' }
                            ].map((item, i) => (
                                <div key={i} className="relative pl-10">
                                    <div className="absolute left-[17px] top-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 ring-4 ring-white" />
                                    <div>
                                        <p className="font-black text-slate-800 uppercase tracking-tight text-xs">{item.title}</p>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.date} · {item.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* 3. MAIN RECORDS GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* UPCOMING SESSIONS */}
                    <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                        <div className="flex items-center justify-between">
                            <div className='flex items-center gap-4'>
                                <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100">
                                    <CalendarCheck size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Scheduled Sessions</h2>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5 italic">Synchronized with local time</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => navigate("/find-doctors")}
                                className="bg-slate-900 text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
                            >
                                Book New
                            </button>
                        </div>

                        {loading ? (
                            <div className="py-20 text-center space-y-4">
                                <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto" />
                                <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Accessing Secure Network...</p>
                            </div>
                        ) : appointments.length === 0 ? (
                            <div className="py-20 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                                <p className='text-sm font-bold text-slate-500'>No active appointments found.</p>
                                <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-4">Browse Directory</button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {appointments.map(app => (
                                    <div key={app.id} className="group bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-500 cursor-pointer">
                                        <div className='flex items-center gap-5'>
                                            <div className='w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all'>
                                                <UserCircle size={24} />
                                            </div>
                                            <div>
                                                <p className="text-base font-black text-slate-800 uppercase tracking-tight">
                                                    {app.doctorName || `Specialist ID #${app.doctorId}`}
                                                </p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                        <Calendar size={12} className="text-indigo-500" /> {app.date}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-l border-slate-200 pl-3">
                                                        <Clock size={12} className="text-blue-500" /> {app.time || 'TBD'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <button className='p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all'>
                                                <Trash2 size={18} />
                                            </button>
                                            <button className='p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all'>
                                                <ArrowUpRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* MEDICAL VAULT */}
                    <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                        <div className="flex items-center justify-between">
                            <div className='flex items-center gap-4'>
                                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-100">
                                    <FileText size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Medical Vault</h2>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5 italic">End-to-end encrypted</p>
                                </div>
                            </div>
                            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest border-b-2 border-blue-100 hover:border-blue-600 transition-all">Export All</button>
                        </div>

                        <div className="space-y-4">
                            {medicalDocuments.map(doc => (
                                <div key={doc.id} className="group bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between hover:bg-white hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-50 transition-all duration-500">
                                    <div className='flex items-center gap-5'>
                                        <div className='w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm'>
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{doc.name}</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{doc.type} · {doc.date}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity'>
                                        <button className='p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all'>
                                            <Download size={18} />
                                        </button>
                                        <button className='p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all'>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

            </main>
        </div>
    );
}

export default PatientDashboard;