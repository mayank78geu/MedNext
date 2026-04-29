import React, { useState } from "react";
import Button from "../Button/Button";
import AppointmentForm from "../../Pages/AppointmentForm";

const Doctors = ({ title, disease, description, buttonText = "Book Appointment", doctorId, hospitalId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-blue-600 font-bold text-sm uppercase tracking-wide mb-4">{disease}</p>
        <p className="text-slate-500 leading-relaxed font-medium">
          {description || "Experienced specialist dedicated to providing top-quality healthcare through MedNext's verified network."}
        </p>
      </div>

      <Button
        onClick={openModal}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-6 rounded-xl transition-all duration-300 uppercase text-xs tracking-widest"
      >
        {buttonText}
      </Button>

      {isModalOpen && (
        <AppointmentForm doctorName={title} doctorId={doctorId} hospitalId={hospitalId} onClose={closeModal} />
      )}
    </div>
  );
};

export default Doctors;
