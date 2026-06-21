import React from "react";
import OurStoryHero from "../About/OurStoryHero";
import ChangeStartsHere from "../About/ChangeStartsHere";
import TestimonialStats from "../About/TestimonialStats";
import OurVolunteersMarquee from "../About/OurVolunteersMarquee";
import VisionApproachImpact from "../About/VisionApproachImpact";
import QuickGuide from "../components/Common/QuickGuide";

const About = () => {
  return (
    <div>
      <OurStoryHero />
      <ChangeStartsHere />
      <TestimonialStats />
      <OurVolunteersMarquee />
      <VisionApproachImpact />
      <QuickGuide />
    </div>
  );
};

export default About;
