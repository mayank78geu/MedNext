import React, { useState } from "react";

const AppointmentForm = ({ doctorName, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setMessage("Please fill all fields");
      return;
    }

    console.log("Appointment Booked:", {
      ...formData,
      doctor: doctorName,
    });

    setMessage("Appointment Booked Successfully ");

    setFormData({
      name: "",
      phone: "",
      date: "",
      time: "",
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose} // click outside close
    >
      
      {/* Modal Box */}
      <div
        className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()} // prevent close
      >
        
        <h2 className="text-xl font-bold mb-4 text-center">
          Book Appointment
        </h2>

        <p className="text-center text-blue-600 mb-4">
          Doctor: {doctorName}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:outline-blue-500"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:outline-blue-500"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />

          {message && (
            <p className="text-sm text-center text-green-600">{message}</p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white cursor-pointer py-2 rounded-lg hover:bg-blue-700"
            >
              Book Now
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-300 py-2 cursor-pointer rounded-lg"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;