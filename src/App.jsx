import React from "react";
import Hero from "./Home/Hero";
import PurposeWithImpact from "./Home/PurposeWithImpact";
import UpcomingEvents from "./Home/UpcomingEvents";
import ConnectSection from "./Home/ConnectSection";

const App = () => {
  return (
    <div>
      <Hero />
      <PurposeWithImpact />
      <UpcomingEvents />
      <ConnectSection />
    </div>
  );
};

export default App;
