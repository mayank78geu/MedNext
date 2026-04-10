import React from "react";
import { Pill } from "lucide-react";

export default function Prescriptions() {
  return (
    <div className="p-10 max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 p-3 rounded-2xl">
          <Pill className="text-blue-600 size-8" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Prescriptions</h1>
          <p className="text-slate-500 mt-1">View and download your digital prescriptions.</p>
        </div>
      </div>
      
      <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm text-center">
        <p className="text-lg text-slate-500">Coming Soon: Your prescription history will be listed here.</p>
      </div>
    </div>
  );
}
