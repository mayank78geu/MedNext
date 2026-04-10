import { ChevronDownIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react"; // Matching our dashboard icon style
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill out all fields before sending.");
      return;
    }
    
    toast.success("Thanks for contacting! Our team will reach out soon.");
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <div className="relative isolate bg-slate-50 px-6 py-24 sm:py-32 lg:px-8 min-h-screen font-sans">
      {/* Background Decorative Element - Styled with MedNext Blue */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2563EB] to-[#93C5FD] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Contact Our Team
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Have questions about MedNext? We're here to help patients, doctors, and hospital admins 24/7.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left Side: Contact Information */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-blue-100/50 transition-colors duration-300 cursor-pointer group">
            <div className="bg-blue-600 p-3 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Call Us</h3>
              <p className="text-slate-600">+91 123-456-7890</p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-blue-100/50 transition-colors duration-300 cursor-pointer group">
            <div className="bg-blue-600 p-3 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Email Us</h3>
              <p className="text-slate-600">support@mednext.com</p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-blue-100/50 transition-colors duration-300 cursor-pointer group">
            <div className="bg-blue-600 p-3 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Visit Us</h3>
              <p className="text-slate-600">Graphic Era University, Dehradun, Uttarakhand</p>
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl"
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold text-slate-700">
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-slate-200 px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition-all duration-300"
                />
              </div>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold text-slate-700">
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-slate-200 px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition-all duration-300"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-slate-200 px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition-all duration-300"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold text-slate-700">
                Message
              </label>
              <div className="mt-2">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-slate-200 px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition-all duration-300"
                />
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="block w-full rounded-lg bg-blue-600 px-3.5 py-3 text-center text-sm font-bold text-white shadow-sm hover:bg-blue-700 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;