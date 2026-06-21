import React from "react";
import Hero from "../Home/Hero";
import PurposeWithImpact from "../Home/PurposeWithImpact";
import UpcomingEvents from "../Home/UpcomingEvents";
import ConnectSection from "../components/Common/ConnectSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <PurposeWithImpact />
      <UpcomingEvents />
      <ConnectSection />
    </div>
  );
};

export default Home;
