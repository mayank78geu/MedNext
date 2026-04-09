import React from "react";
import HeroSection from "./HeroSection";
import HospitalSection from "./HospitalSection";
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
