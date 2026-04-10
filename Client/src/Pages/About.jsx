import React from "react";
import { CheckCircle, ShieldCheck, Zap, HeartPulse, Code, Layout, Database } from "lucide-react";

const teamMembers = [
  {
    name: "Mayank Kumar",
    role: "Team Leader & Backend Operations",
    description: "Architecting the Spring Boot core, managing API security, and overseeing end-to-end system operations.",
    icon: Code,
    isLeader: true,
  },
  {
    name: "Dev Sharma",
    role: "Frontend Engineer",
    description: "Designing responsive, user-centric interfaces using React and Tailwind CSS for a seamless UX.",
    icon: Layout,
    isLeader: false,
  },
  {
    name: "Ishu Kumar",
    role: "Database Engineer",
    description: "Designing scalable MySQL schemas and optimizing data flow for complex hospital management systems.",
    icon: Database,
    isLeader: false,
  },
];

const About = () => {
  return (
    <section className="bg-white py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADING SECTION */}
        <div className="text-center mb-20">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Our Journey</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-6">
            Making Healthcare <span className="text-blue-600">Simple</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            MedNext is a mission-driven platform born at Graphic Era University. We are dedicated to bridging 
            the gap between patients and providers through modern digital infrastructure.
          </p>
        </div>

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Left Side: Mission/Story */}
          <div className="space-y-8">
            <div className="border-l-4 border-blue-600 pl-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Who We Are</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                We are a team of passionate developers building a digital healthcare ecosystem that helps 
                patients find the best doctors, book appointments, and manage medical records in one click.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-600 pl-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                To eliminate the traditional friction in hospital visits by providing a transparent, 
                secure, and user-friendly platform for patients and healthcare providers alike.
              </p>
            </div>
          </div>

          {/* Right Side: Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Verified Doctors", icon: HeartPulse },
              { title: "Easy Booking", icon: Zap },
              { title: "Trusted Partners", icon: ShieldCheck },
              { title: "Secure Records", icon: CheckCircle },
            ].map((feature, i) => (
              <div key={i} className="bg-blue-50 p-6 rounded-2xl flex flex-col items-center text-center group hover:bg-blue-600 transition-all duration-300">
                <feature.icon className="text-blue-600 group-hover:text-white mb-3" size={32} />
                <h3 className="font-bold text-slate-900 group-hover:text-white">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* TEAM SECTION */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">Meet the Developers</h2>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <div key={i} className={`relative bg-white shadow-xl rounded-2xl p-8 text-center border-t-8 transition-transform hover:-translate-y-2 ${member.isLeader ? 'border-blue-600' : 'border-slate-200'}`}>
                <div className={`w-20 h-20 mx-auto rounded-full mb-6 flex items-center justify-center ${member.isLeader ? 'bg-blue-100' : 'bg-slate-100'}`}>
                   <member.icon className={member.isLeader ? 'text-blue-600' : 'text-slate-600'} size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-4 uppercase tracking-wide">{member.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 text-center bg-slate-900 rounded-3xl p-12 shadow-2xl">
          <div>
            <h2 className="text-4xl font-extrabold text-white">500+</h2>
            <p className="text-blue-400 font-medium mt-1">Verified Doctors</p>
          </div>
          <div className="border-y md:border-y-0 md:border-x border-slate-700 py-6 md:py-0">
            <h2 className="text-4xl font-extrabold text-white">100+</h2>
            <p className="text-blue-400 font-medium mt-1">Partner Hospitals</p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-white">50K+</h2>
            <p className="text-blue-400 font-medium mt-1">Happy Patients</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;