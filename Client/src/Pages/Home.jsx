import React from "react";
import HeroSection from "./HeroSection";
import HospitalSection from "./Hospital/HospitalSection";
import Services from "./Services";



const Home = () => {
  return (
    <>
      <HeroSection />
      <Services />
      <HospitalSection /> 
      {/* <ContectUs /> */}
    </>
  );
};

export default Home;
