import React, { useState, useEffect } from "react";
import AppointmentForm from "../../Pages/AppointmentForm";

const Doctors = ({ icon: Icon, title, description, disease }) => {
  const [showForm, setShowForm] = useState(false);

  // Scroll lock + scrollbar fix

  useEffect(() => {
    if (showForm) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [showForm]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full hover:shadow-lg ">
      {/* Icon */}
      <div className="bg-blue-100 rounded-xl w-12 h-12 flex items-center justify-center mb-5">
        {Icon && <Icon className="text-blue-600 size-6" />}
      </div>

      {/* Name */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>

      {/* Disease */}
      <p className="text-sm text-blue-600 mb-2 capitalize">Treats: {disease}</p>

      {/* Description */}
      <p className="text-gray-500 leading-relaxed">{description}</p>

      {/* Button */}
      <div className="mt-4">
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition"
        >
          Book Appointment
        </button>
      </div>

      {/* Popup */}
      {showForm && (
        <AppointmentForm
          doctorName={title}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Doctors;
