import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import Button from "../Component/Button/Button";
import { useNavigate } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Healthcare Made
            <span className="text-blue-600"> Simple</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Connect with the best doctors and hospitals near you. Book
            appointments, share medical reports, and manage your healthcare
            journey seamlessly.
          </p>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              onClick={() => navigate("/find-doctors")}
              className="text-lg px-6 py-4 flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white hover:text-white rounded-sm"
            >
              <IoSearchOutline className="text-xl size-5" />
              Find a Doctor
            </Button>

            <Button className="text-lg px-8 py-4 flex items-center border-2 border-blue-600 text-blue-600 hover:text-black rounded-sm">
              <CiCalendar className="mr-2 size-5" />
              Book Appointment
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Verified Doctors</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Partner Hospitals</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Happy Patients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
