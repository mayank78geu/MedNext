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
    FileText
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

const previousAppointments = [
    { id: 1, doctor: 'Dr. Sarah Johnson', date: 'Jun 10, 2024', status: 'Completed' },
    { id: 2, doctor: 'Dr. Michael Chen', date: 'May 05, 2024', status: 'Completed' },
];


function PatientDashboard() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [patientName, setPatientName] = useState('Patient');
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Decode JWT token to extract username (sub claim)
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payloadStr = atob(token.split('.')[1]);
                const payload = JSON.parse(payloadStr);
                const username = payload.sub ? payload.sub.split('@')[0] : 'Patient';
                // Capitalize first letter
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
        <div className="text-slate-900 font-sans pb-10">

            {/* 1. HEADER (Styled similarly to landing page)
            <header className="bg-white border-b border-slate-200">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg width="25" height="25" viewBox="0 0 137 137" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M68.5 0C30.6667 0 0 30.6667 0 68.5C0 106.333 30.6667 137 68.5 137C106.333 137 137 106.333 137 68.5C137 30.6667 106.333 0 68.5 0ZM68.5 124.5C37.5 124.5 12.5 99.5 12.5 68.5C12.5 37.5 37.5 12.5 68.5 12.5C99.5 12.5 124.5 37.5 124.5 68.5C124.5 99.5 99.5 124.5 68.5 124.5Z" fill="#1C1B1F" />
                            <path d="M102.5 61.5H34.5C32.8 61.5 31.5 62.8 31.5 64.5V72.5C31.5 74.2 32.8 75.5 34.5 75.5H102.5C104.2 75.5 105.5 74.2 105.5 72.5V64.5C105.5 62.8 104.2 61.5 102.5 61.5Z" fill="#2563EB" />
                            <path d="M72.5 102.5V34.5C72.5 32.8 71.2 31.5 69.5 31.5H61.5C59.8 31.5 58.5 32.8 58.5 34.5V102.5C58.5 104.2 59.8 105.5 61.5 105.5H69.5C71.2 105.5 72.5 104.2 72.5 102.5Z" fill="#2563EB" />
                        </svg>
                        <span className="text-xl font-bold text-slate-900">MedNext</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
                        <span>Dashboard</span>
                        <span className="cursor-pointer hover:text-blue-600">Reports</span>
                        <span className="cursor-pointer hover:text-blue-600">Profile</span>
                    </div>
                    <button className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50">
                        <LogOut size={16} />
                        Logout
                    </button>
                </nav>
            </header> */}

            {/* 2. MAIN CONTENT AREA */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

                {/* WELCOME & QUICK ACTIONS */}
                <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, {patientName}!</h1>
                        <p className="text-slate-600 mt-2">Manage your health journey simply and seamlessly.</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate("/patient-dashboard/find-doctors")}
                            className="flex items-center gap-2.5 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                            <Search size={20} />
                            Find a Doctor
                        </button>
                        <button className="flex items-center gap-2.5 bg-blue-50 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100">
                            <CalendarCheck size={20} />
                            Book Appointment
                        </button>
                    </div>
                </section>

                {/* DASHBOARD GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* UPLOAD DOCUMENTS QUICK LINK */}
                    <div
                        onClick={() => fileInputRef.current.click()}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-4 hover:border-blue-300 hover:shadow-[0_10px_20px_rgba(37,99,235,0.1)] hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                        <UploadCloud className="text-blue-600 group-hover:scale-110 transition-transform duration-300" size={48} />
                        <h3 className="text-lg font-bold">Upload Medical Documents</h3>
                        <p className="text-sm text-slate-600">Easily share reports, scans, and previous health records with your doctors.</p>
                        <input type="file" ref={fileInputRef} className="hidden" />
                    </div>

                    {/* PRESCRIPTIONS (Icon: Pill) */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <div className='flex items-center gap-3'>
                                <Pill className="text-blue-600" size={24} />
                                <h3 className="text-xl font-bold">Recent Prescriptions</h3>
                            </div>
                            <a href="#" className="text-blue-600 text-sm font-medium hover:underline">View All</a>
                        </div>
                        {prescriptions.length === 0 ? (
                            <p className='text-sm text-slate-500 text-center py-6'>No prescriptions found.</p>
                        ) : (
                            <div className="space-y-3">
                                {prescriptions.map(p => (
                                    <div key={p.id} className="bg-slate-50 p-3 rounded-xl flex items-start gap-3 border border-slate-100">
                                        <FileText className="text-slate-400 mt-0.5" size={18} />
                                        <div>
                                            <p className="font-semibold text-slate-900">{p.medication} ({p.dose})</p>
                                            <p className="text-xs text-slate-500">Prescribed by {p.doctor} · {p.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* PREVIOUS APPOINTMENTS (Icon: History) */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <div className='flex items-center gap-3'>
                                <History className="text-blue-600" size={24} />
                                <h3 className="text-xl font-bold">Previous Appointments</h3>
                            </div>
                            <a href="#" className="text-blue-600 text-sm font-medium hover:underline">View All</a>
                        </div>
                        {previousAppointments.length === 0 ? (
                            <p className='text-sm text-slate-500 text-center py-6'>No past appointments.</p>
                        ) : (
                            <div className="space-y-3">
                                {previousAppointments.map(app => (
                                    <div key={app.id} className="bg-slate-50 p-3 rounded-xl flex items-center justify-between border border-slate-100">
                                        <div>
                                            <p className="font-semibold text-slate-900">{app.doctor}</p>
                                            <p className="text-xs text-slate-500">{app.date}</p>
                                        </div>
                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">{app.status}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                {/* UPCOMING APPOINTMENTS & DOCUMENTS SECTIONS (Full Width) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* UPCOMING APPOINTMENTS */}
                    <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <div className='flex items-center gap-3'>
                                <CalendarCheck className="text-blue-600" size={28} />
                                <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">Book New</button>
                        </div>

                        {loading ? (
                            <p className='text-sm text-slate-500 text-center py-10'>Loading your appointments...</p>
                        ) : appointments.length === 0 ? (
                            <p className='text-sm text-slate-500 text-center py-10'>You have no upcoming appointments.</p>
                        ) : (
                            <div className="space-y-4">
                                {appointments.map(app => (
                                    <div key={app.id} className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-white hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                        <div className='flex items-center gap-4'>
                                            <div className='bg-blue-100 p-3 rounded-full'>
                                                <CalendarCheck className="text-blue-600" size={24} />
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-slate-950">
                                                    {app.doctorName || `Doctor #${app.doctorId}`}
                                                </p>
                                                {app.specialty && <p className="text-sm text-slate-600">{app.specialty}</p>}
                                                <p className="text-xs text-slate-500 mt-1">{app.date} {app.time ? `at ${app.time}` : ''}</p>
                                            </div>
                                        </div>
                                        <div className='flex gap-2'>
                                            <button className='text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200'>Cancel</button>
                                            <button className='text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200'>Reschedule</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* MEDICAL DOCUMENTS */}
                    <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <div className='flex items-center gap-3'>
                                <UploadCloud className="text-blue-600" size={28} />
                                <h2 className="text-2xl font-bold">My Documents</h2>
                            </div>
                            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50">View All</button>
                        </div>

                        {medicalDocuments.length === 0 ? (
                            <p className='text-sm text-slate-500 text-center py-10'>No documents uploaded.</p>
                        ) : (
                            <div className="space-y-4">
                                {medicalDocuments.map(doc => (
                                    <div key={doc.id} className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex items-center justify-between hover:border-blue-100">
                                        <div className='flex items-center gap-4'>
                                            <div className='bg-blue-100 p-3 rounded-full'>
                                                <FileText className="text-blue-600" size={24} />
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-slate-950">{doc.name}</p>
                                                <p className="text-sm text-slate-600">{doc.type}</p>
                                                <p className="text-xs text-slate-500 mt-1">Uploaded: {doc.date}</p>
                                            </div>
                                        </div>
                                        <div className='flex gap-2'>
                                            <button className='text-sm font-medium text-blue-600 hover:text-blue-700'>Download</button>
                                            <button className='text-sm font-medium text-slate-700 hover:text-red-600'>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                </div>

            </main>
        </div>
    );
}

export default PatientDashboard;