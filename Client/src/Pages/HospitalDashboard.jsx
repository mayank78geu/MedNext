import React, { useState } from 'react';
import {
    Users,
    Calendar,
    Settings,
    PlusCircle,
    Activity,
    UserPlus,
    TrendingUp,
    LogOut,
    MoreVertical
} from 'lucide-react';

// --- MOCK DATA FOR HOSPITAL ADMIN ---
const doctorRoster = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', status: 'On Duty', appointments: 8 },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'General Physician', status: 'On Leave', appointments: 0 },
    { id: 3, name: 'Dr. Emily Blunt', specialty: 'Neurology', status: 'On Duty', appointments: 5 },
];

const hospitalStats = [
    { label: 'Total Patients', value: '1,284', icon: Users, color: 'text-blue-600' },
    { label: 'Today\'s Appointments', value: '42', icon: Calendar, color: 'text-green-600' },
    { label: 'Available Doctors', value: '14/18', icon: Activity, color: 'text-purple-600' },
    { label: 'Monthly Growth', value: '+12.5%', icon: TrendingUp, color: 'text-orange-600' },
];

function HospitalDashboard() {
    const hospitalName = "City General Hospital";

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">

            {/* HEADER */}
            {/* <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <Activity size={20} className="text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900">MedNext <span className="text-blue-600 font-medium">Admin</span></span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <span className="text-blue-600 border-b-2 border-blue-600 pb-1">Overview</span>
                        <span className="cursor-pointer hover:text-blue-600">Manage Doctors</span>
                        <span className="cursor-pointer hover:text-blue-600">Schedule</span>
                        <span className="cursor-pointer hover:text-blue-600">Analytics</span>
                    </div>
                    <button className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors">
                        <LogOut size={18} />
                        <span className="text-sm font-semibold">Exit</span>
                    </button>
                </nav>
            </header> */}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* WELCOME & QUICK ACTION */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Hospital Management System</h1>
                        <p className="text-slate-500">{hospitalName} — Main Branch</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50">
                            <Settings size={18} />
                            Hospital Settings
                        </button>
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm shadow-blue-200">
                            <UserPlus size={18} />
                            Add New Doctor
                        </button>
                    </div>
                </div>

                {/* STATS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {hospitalStats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <stat.icon size={20} className={stat.color} />
                                <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded">Live</span>
                            </div>
                            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* DOCTOR MANAGEMENT LIST (Larger) */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                            <h2 className="text-lg font-bold">Doctor Roster & Availability</h2>
                            <button className="text-blue-600 text-sm font-semibold hover:underline">View All Personnel</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                                    <tr>
                                        <th className="px-6 py-4">Doctor Name</th>
                                        <th className="px-6 py-4">Specialty</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Today's Load</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-sm">
                                    {doctorRoster.map((doc) => (
                                        <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-slate-900">{doc.name}</td>
                                            <td className="px-6 py-4 text-slate-600">{doc.specialty}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${doc.status === 'On Duty' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                                                    }`}>
                                                    {doc.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{doc.appointments} Patients</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-400 hover:text-slate-600">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* HOSPITAL OPERATIONS / QUICK BOOKING VIEW */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-4">Operations Center</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-blue-200 hover:bg-white transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <Calendar size={18} />
                                        </div>
                                        <span className="font-semibold text-sm">Central Schedule</span>
                                    </div>
                                    <PlusCircle size={16} className="text-slate-300" />
                                </button>

                                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-blue-200 hover:bg-white transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-100 p-2 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                            <Users size={18} />
                                        </div>
                                        <span className="font-semibold text-sm">Patient Registry</span>
                                    </div>
                                    <PlusCircle size={16} className="text-slate-300" />
                                </button>
                            </div>
                        </div>

                        {/* QUICK NOTIFICATIONS */}
                        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Urgent Alerts</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3 items-start border-l-2 border-orange-500 pl-3">
                                    <div>
                                        <p className="text-xs font-bold text-orange-400">Emergency Redirection</p>
                                        <p className="text-sm">ICU capacity at 95%. Redirecting trauma cases.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start border-l-2 border-blue-400 pl-3">
                                    <div>
                                        <p className="text-xs font-bold text-blue-400">Staff Update</p>
                                        <p className="text-sm">Shift change in 15 mins for Cardiology dept.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-xs text-slate-400">
                MedNext Administration Portal • Enterprise Version 1.0
            </footer>
        </div>
    );
}

export default HospitalDashboard;