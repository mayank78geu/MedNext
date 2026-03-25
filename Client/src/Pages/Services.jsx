import React from "react";
import ServiceCard from "../Component/Card/ServiceCard";
import { FaUserFriends } from "react-icons/fa";
import Img from "../Component/Photos/Img";
import { LuFileCheck } from "react-icons/lu";
import { LiaFileUploadSolid } from "react-icons/lia";
import { CiCalendarDate } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { LuStethoscope } from "react-icons/lu";
import { CiHospital1 } from "react-icons/ci";

const patientServices = [
  {
    icon: CiSearch,
    title: "Find Doctors & Hospitals",
    description:
      "Search for healthcare providers based on specialties and proximity to your location.",
  },
  {
    icon: FaUserFriends, // 👈 yaha add karo
    title: "Easy Appointment Booking",
    description:
      "Book appointments with your preferred doctors at times that work best for you.",
  },
  {
    icon: LiaFileUploadSolid,
    title: "Upload Medical Reports",
    description:
      "Securely share your medical reports and history with your healthcare providers.",
  },
  {
    icon: LuFileCheck,
    title: "Digital Prescriptions",
    description:
      "Receive prescriptions and test recommendations directly on the platform.",
  },
];
const doctorServices = [
  {
    icon: LuClipboardList,
    title: "Daily Schedule Management",
    description:
      "View today's patient list and manage your schedule efficiently.",
  },
  {
    icon: LuStethoscope,
    title: "Patient Medical History",
    description:
      "Access patient medical reports and history before consultations.",
  },
  {
    icon: LuFileCheck,
    title: "Digital Prescriptions",
    description:
      "Prescribe medicines and recommend tests digitally, visible to patients and hospitals.",
  },
];

const hospitalServices = [
  {
    icon: FaUserFriends,
    title: "Walk-in Patient Management",
    description: "Book appointments for walk-in patients seamlessly.",
  },
  {
    icon: CiHospital1,
    title: "Patient History Access",
    description: "View complete patient history and scheduled appointments.",
  },
  {
    icon: CiCalendarDate ,
    title: "Appointment Scheduling",
    description: "Manage and track all scheduled appointments in one place.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Comprehensive Healthcare Solutions
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering patients, doctors, and hospitals with digital healthcare
          services
        </p>
      </div>

      {/* Patients Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-100 rounded-lg p-3">
            <FaUserFriends className="text-blue-500 size-6" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">For Patients</h3>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {patientServices.map(({ icon: Icon, title, description }, index) => (
            <ServiceCard
              key={index}
              icon={Icon}
              title={title}
              description={description}
            />
          ))}
        </div>
      </div>

      {/* Image */}
      <div className="mt-20 rounded-2xl overflow-hidden shadow-2xl max-w-7xl mx-auto h-[500px]">
        <Img
          id="doctor-image"
          src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc3NDA4NTI3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Doctor"
          className="w-full h-full object-cover "
        />
      </div>

      {/* Doctors Section */}
      <div className="mt-25 max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-green-100 rounded-lg p-3">
            {/* <Stethoscope className="size-6 text-green-600" /> */}
            <FaUserDoctor className="size-6 text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">For Doctors</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctorServices.map(({ icon: Icon, title, description }, index) => (
            <ServiceCard
              key={index}
              icon={Icon}
              title={title}
              description={description}
            />
          ))}
        </div>
      </div>

      {/* For Hospitals */}
      <div className="mt-25 max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-purple-100 rounded-lg p-3">
            <CiHospital1  className="size-6 text-purple-600"/>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            For Hospital Admins
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hospitalServices.map(({ icon: Icon, title, description }, index) => (
            <ServiceCard
              key={index}
              icon={Icon}
              title={title}
              description={description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
