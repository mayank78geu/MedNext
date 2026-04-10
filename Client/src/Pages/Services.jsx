import React from "react";
import { 
  Users, 
  Search, 
  Calendar, 
  UploadCloud, 
  FileText, 
  Stethoscope, 
  ClipboardList, 
  Building2 
} from "lucide-react"; // Using Lucide for consistency with Dashboards

const patientServices = [
  {
    icon: Search,
    title: "Find Doctors & Hospitals",
    description: "Search for healthcare providers based on specialties and proximity to your location.",
  },
  {
    icon: Calendar,
    title: "Easy Appointment Booking",
    description: "Book appointments with your preferred doctors at times that work best for you.",
  },
  {
    icon: UploadCloud,
    title: "Upload Medical Reports",
    description: "Securely share your medical reports and history with your healthcare providers.",
  },
  {
    icon: FileText,
    title: "Digital Prescriptions",
    description: "Receive prescriptions and test recommendations directly on the platform.",
  },
];

const doctorServices = [
  {
    icon: ClipboardList,
    title: "Daily Schedule Management",
    description: "View today's patient list and manage your schedule efficiently.",
  },
  {
    icon: Stethoscope,
    title: "Patient Medical History",
    description: "Access patient medical reports and history before consultations.",
  },
  {
    icon: FileText,
    title: "Digital Prescriptions",
    description: "Prescribe medicines and recommend tests digitally, visible to patients and hospitals.",
  },
];

const hospitalServices = [
  {
    icon: Users,
    title: "Walk-in Patient Management",
    description: "Book appointments for walk-in patients seamlessly.",
  },
  {
    icon: Building2,
    title: "Patient History Access",
    description: "View complete patient history and scheduled appointments.",
  },
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    description: "Manage and track all scheduled appointments in one place.",
  },
];

// Internal ServiceCard component for better consistency
const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
    <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
      <Icon className="text-blue-600 group-hover:text-white size-7" />
    </div>
    <h4 className="text-xl font-bold text-slate-900 mb-3">{title}</h4>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const Services = () => {
  return (
    <section id="services" className="py-24 bg-slate-50">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Our Services</h2>
        <h3 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
          Comprehensive Healthcare Solutions
        </h3>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Empowering patients, doctors, and hospitals with a unified digital healthcare ecosystem.
        </p>
      </div>

      {/* Patients Section */}
      <div className="max-w-7xl mx-auto px-4 mb-24">
        <div className="flex items-center gap-4 mb-10 border-l-4 border-blue-600 pl-6">
          <h3 className="text-3xl font-bold text-slate-900">For Patients</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {patientServices.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      {/* Feature Image - Simplified & Professional */}
      <div className="max-w-7xl mx-auto px-4 mb-24">
        <div className="relative rounded-3xl overflow-hidden h-[400px] shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=1400"
            alt="Medical Professional"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent flex items-center">
            <div className="ml-12 text-white max-w-md">
              <h4 className="text-3xl font-bold mb-4">Leading with Technology</h4>
              <p className="text-blue-50">Our platform bridges the gap between care providers and seekers using state-of-the-art infrastructure.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Section Grid: Doctors & Hospitals */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Doctors */}
        <div>
          <div className="flex items-center gap-4 mb-10 border-l-4 border-blue-600 pl-6">
            <h3 className="text-3xl font-bold text-slate-900">For Doctors</h3>
          </div>
          <div className="space-y-6">
            {doctorServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>

        {/* Hospitals */}
        <div>
          <div className="flex items-center gap-4 mb-10 border-l-4 border-blue-600 pl-6">
            <h3 className="text-3xl font-bold text-slate-900">For Hospitals</h3>
          </div>
          <div className="space-y-6">
            {hospitalServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;