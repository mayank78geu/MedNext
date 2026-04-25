import React, { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import Doctors from "../Component/Card/Doctors";
import { FindDoctor } from "../api/finddoc.api";

const FindDoctors = () => {
  const [disease, setDisease] = useState("");
  const [location, setLocation] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        const data = await FindDoctor();
        if (Array.isArray(data)) {
          setDoctors(data);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorsData();
  }, []);

  const filteredDoctors = doctors.filter((doc) => {
    const docDisease = doc.specialization || "";
    const docLocation = doc.hospital?.city || doc.hospital?.address || "";
    return (
      docDisease.toLowerCase().includes(disease.toLowerCase()) &&
      docLocation.toLowerCase().includes(location.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      
      {/* Simple Clean Header */}
      <div className="pt-24 pb-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-10">Find Doctors</h1>
        
        {/* The requested Gray Search Bar */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-[#eff1f5] p-6 rounded-[2rem] flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Enter disease..."
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                className="w-full bg-white p-4 pl-14 rounded-2xl outline-none text-slate-600 font-medium"
              />
            </div>
            <div className="flex-1 w-full relative">
              <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white p-4 pl-14 rounded-2xl outline-none text-slate-600 font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full py-20 text-center opacity-50 italic">Synchronizing with registry...</div>
          ) : filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc, index) => (
              <Doctors
                key={index}
                title={doc.name}
                disease={doc.specialization || "General"}
                description={`${doc.experience || 0} years exp - ${doc.hospital?.name || "Independent"} (${doc.hospital?.city || "Remote"})`}
                buttonText="Book Appointment"
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-slate-400 font-medium">
              No matching specialists found.
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default FindDoctors;