import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
// import ServiceCard from "../Component/Card/ServiceCard";
import Doctors from "../Component/Card/Doctors";

// Dummy doctor data
const doctors = [
  {
    name: "Dr. Sharma",
    disease: "fever",
    location: "delhi",
    specialization: "General Physician",
  },
  {
    name: "Dr. Verma",
    disease: "heart",
    location: "mumbai",
    specialization: "Cardiologist",
  },
  {
    name: "Dr. Khan",
    disease: "skin",
    location: "delhi",
    specialization: "Dermatologist",
  },
  {
    name: "Dr. Singh",
    disease: "diabetes",
    location: "dehradun",
    specialization: "Endocrinologist",
  },
];

const FindDoctors = () => {
  const [disease, setDisease] = useState("");
  const [location, setLocation] = useState("");

  // Filter logic
  const filteredDoctors = doctors.filter((doc) => {
    return (
      doc.disease.toLowerCase().includes(disease.toLowerCase()) &&
      doc.location.toLowerCase().includes(location.toLowerCase())
    );
  });

  return (
    <section className="py-20 bg-white">
      
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Find Doctors</h1>
      </div>

      {/* Search Box */}
      <div className="bg-gray-100 p-6 rounded-2xl max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4">

          {/* Disease */}
          <div className="flex items-center bg-white rounded-lg px-3 py-2">
            <FaSearch className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Enter disease..."
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* Location */}
          <div className="flex items-center bg-white rounded-lg px-3 py-2">
            <FaMapMarkerAlt className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Enter location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full outline-none"
            />
          </div>

        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto mt-10 grid md:grid-cols-3 gap-6">
        
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc, index) => (
            <Doctors
              key={index}
              icon={FaSearch}
              title={doc.name}
              disease={doc.disease}
              description={`${doc.specialization} - ${doc.location}`}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No doctors found
          </p>
        )}

      </div>
    </section>
  );
};

export default FindDoctors;