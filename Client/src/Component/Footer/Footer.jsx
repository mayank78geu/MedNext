import React from "react";
import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/*Brand*/}
          <div className="">
            <div className="flex items-center gap-3">
              <div className="flex ">
                <img
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg"
                  alt="logo"
                  className="h-8 "
                />
              </div>
              <span className="text-2xl font-bold text-sky-500">MedNext</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting patients with quality healthcare providers for a
              healthier tomorrow.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaInstagram className="size-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaFacebook className="size-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <CiTwitter className="size-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaLinkedinIn className="size-5" />
              </a>
            </div>
          </div>
          <div className=" items-center  text-gray-400 font-semibold  mb-4 list-none">
            <h3 className="space-y-2 text-lg text-gray-100 mb-4">
              Quick Links
            </h3>
            <li>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition-colors">
                For Hospital
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Careers
              </a>
            </li>
          </div>
          {/* For Users */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">For Users</h3>
            <ul className="space-y-2">
              <li>
                  <Link to="/find-doctors" className="hover:text-blue-400 transition-colors">
                    Find Doctors
                  </Link> 
              </li>
              <li>

                <Link to="/book-appointment" className="hover:text-blue-400 transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/patient-login" className="hover:text-blue-400 transition-colors">
                  Patient Login
                </Link>
              </li>
              <li>
                <Link to="/doctor-login" className="hover:text-blue-400 transition-colors">
                  Doctor Login
                </Link>
              </li>
              <li>
                  <Link to="/hospital-admin" className="hover:text-blue-400 transition-colors">
                    Hospital Admin
                  </Link>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CiMail />
                <span>support@mednext.com</span>
              </li>
              <li className="flex items-start gap-2">
                <FaPhone />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <IoLocationOutline />
                <span>123 Healthcare Ave, Medical District, CA 90210</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
