import React from "react";
import Img from "../Component/Photos/Img";
import { FaArrowRight } from "react-icons/fa";
import Button from "../Component/Button/Button";
import { FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const benefits = [
  "Streamlined patient appointment management",
  "Digital prescription and report management",
  "Real-time patient data access",
  "Reduced administrative workload",
  "Enhanced patient satisfaction",
  "Integrated billing and records system",
];

const HospitalSection = () => {
  return (
    <section
      id="for-hospitals"
      className="py-20 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className=" order-2 lg:order-1 flex items-stretch">
            <div className="w-full h-[80vh] rounded-2xl overflow-hidden shadow-2xl flex self-stretch group">
              <Img
                src="https://images.unsplash.com/photo-1769147555720-71fc71bfc216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3NDA3ODY4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern hospital building"
                className="w-full h-full object-cover flex self-stretch transition-transform duration-700 ease-in-out group-hover:scale-110"           
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Partner with MEDNEXT
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Transform your hospital operations with our comprehensive digital
              healthcare platform. Enhance efficiency, improve patient care, and
              streamline your administrative processes.
            </p>

            <div className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <FiCheckCircle className="size-6 text-green-600 mt-0.5 flex-shrink-0" />
                  {/* <CheckCircle  /> */}
                  <span className="text-lg text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <Link to="/contact">
              <Button
                size="lg"
                className="text-lg px-6 py-4 flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white hover:text-white rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Reach Out to Partner
                <FaArrowRight className="mr-2  size-5 " />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalSection;
