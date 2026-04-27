
import React from "react";
import { IoSearchOutline, IoArrowForward } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Heart, Star } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05)_0%,rgba(255,255,255,1)_100%)]">
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-[100px]"></div>
        
        {/* Floating shapes */}
        <div className="absolute top-1/4 left-10 w-12 h-12 bg-indigo-500/10 rounded-2xl rotate-12 animate-float shadow-xl backdrop-blur-sm border border-white/20 hidden lg:block"></div>
        <div className="absolute bottom-1/4 right-20 w-16 h-16 bg-blue-500/10 rounded-full animate-float delay-500 shadow-xl backdrop-blur-sm border border-white/20 hidden lg:block"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-[11px] font-black tracking-[0.2em] text-indigo-600 uppercase bg-indigo-50/50 rounded-full border border-indigo-100/50 animate-fadeIn backdrop-blur-sm">
            <ShieldCheck size={14} className="animate-pulse" />
            Healthcare Intelligence Platform
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight animate-slideUp">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Care is Here</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 mb-14 max-w-2xl mx-auto leading-relaxed animate-slideUp delay-100 text-balance">
            Connect with verified medical specialists and world-class hospitals. 
            Manage your health data with military-grade security.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24 animate-slideUp delay-200">
            <button
              onClick={() => navigate("/find-doctors")}
              className="group relative px-10 py-5 bg-indigo-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <IoSearchOutline size={20} className="group-hover:rotate-12 transition-transform" />
              Locate Specialists
            </button>

            <button 
              className="px-10 py-5 bg-white border border-slate-200 text-slate-700 font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-600 shadow-sm hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center gap-3"
            >
              <CiCalendar size={22} className="font-black" />
              Instant Booking
            </button>
          </div>

          {/* Premium Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 animate-fadeIn delay-300">
            {[
              { val: "500+", label: "Verified Specialists", icon: <Star className="text-amber-400" size={16} /> },
              { val: "120+", label: "Elite Hospitals", icon: <Heart className="text-rose-500" size={16} /> },
              { val: "98%", label: "Satisfaction Rate", icon: <ShieldCheck className="text-emerald-500" size={16} /> }
            ].map((stat, i) => (
              <div key={i} className="group bg-white/40 backdrop-blur-md rounded-[2.5rem] p-10 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 transition-all duration-500">
                <div className="flex justify-center mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  {stat.icon}
                </div>
                <div className="text-4xl font-black text-slate-900 mb-2">{stat.val}</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
