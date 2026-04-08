import React from "react";

const About = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are dedicated to making healthcare simple, accessible, and
            efficient for everyone. Our platform connects patients with trusted
            doctors and hospitals.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Side */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 mb-6">
              We are a digital healthcare platform that helps patients find the
              best doctors, book appointments, and manage their medical journey
              easily.
            </p>

            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              Our mission is to simplify healthcare access by providing a
              seamless and user-friendly experience for patients and healthcare
              providers.
            </p>
          </div>

          {/* Right Side */}
          <div className="bg-blue-50 p-8 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Why Choose Us?
            </h3>

            <ul className="space-y-4 text-gray-600">
              <li>✔ Verified Doctors</li>
              <li>✔ Easy Appointment Booking</li>
              <li>✔ Trusted Hospitals</li>
              <li>✔ Secure Medical Records</li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 text-center">
          <div className="bg-gray-100 p-6 rounded-xl">
            <h2 className="text-3xl font-bold text-blue-600">500+</h2>
            <p className="text-gray-600">Doctors</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl">
            <h2 className="text-3xl font-bold text-blue-600">100+</h2>
            <p className="text-gray-600">Hospitals</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl">
            <h2 className="text-3xl font-bold text-blue-600">50K+</h2>
            <p className="text-gray-600">Patients</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Our Team
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Leader */}
            <div className="bg-white shadow-lg rounded-2xl p-6 text-center border-t-4 border-blue-600">
              <img
                src="https://via.placeholder.com/100"
                alt="leader"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Dev Sharma</h3>
              <p className="text-blue-600 font-medium">Team Leader</p>
              <p className="text-gray-600 mt-2 text-sm">
                Handles project architecture, routing, and overall system
                design.
              </p>
            </div>

            {/* Member 1 */}
            <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Aman Verma</h3>
              <p className="text-blue-600 font-medium">Frontend Developer</p>
              <p className="text-gray-600 mt-2 text-sm">
                Works on UI design, components, and user experience using React
                & Tailwind.
              </p>
            </div>

            {/* Member 2 */}
            <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Sara Khan</h3>
              <p className="text-blue-600 font-medium">Backend Developer</p>
              <p className="text-gray-600 mt-2 text-sm">
                Manages database, APIs, and server-side logic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
