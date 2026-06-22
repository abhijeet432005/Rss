import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  {
    title: "Our Vision",
    content:
      "We envision a nation where every citizen has access to opportunities, quality education, affordable healthcare, and a secure future. Our vision is built on inclusive growth, social justice, and sustainable development that benefits every community.",
  },
  {
    title: "Our Approach",
    content:
      "We believe in transparent governance, citizen participation, and evidence-based policymaking. By working closely with local communities, experts, and public representatives, we strive to address challenges effectively and deliver meaningful, long-term solutions.",
  },
  {
    title: "Our Impact",
    content:
      "Through community engagement, public service initiatives, and development-focused programs, we continue to strengthen local communities, improve public welfare, and create opportunities that contribute to lasting progress.",
  },
];

const TabItem = ({ tab, isActive, onClick }) => {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  useGSAP(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;

    gsap.to(wrap, {
      height: isActive ? inner.offsetHeight : 0,
      duration: 0.4,
      ease: "power3.inOut",
    });
  }, [isActive]);

  return (
    <div
      className="border-t cursor-pointer py-7"
      style={{ borderColor: "#E3D9CF" }}
      onClick={onClick}
    >
      <p
        className="transition-opacity duration-200"
        style={{
          fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
          color: "#3D1A1A",
          opacity: isActive ? 1 : 0.45,
        }}
      >
        {tab.title}
      </p>
      <div ref={wrapRef} style={{ height: 0, overflow: "hidden" }}>
        <div ref={innerRef} className="pt-5">
          <p
            className="text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: "#5C4A3A" }}
          >
            {tab.content}
          </p>
        </div>
      </div>
    </div>
  );
};

const VisionApproachImpact = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Image: reveal right-to-left with clip-path + blur + zoom
        gsap.fromTo(
          ".vision-img img",
          {
            clipPath: "inset(0% 0% 0% 100%)",
            scale: 1.15,
            filter: "blur(12px)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            filter: "blur(0px)",
            duration: 1.3,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ".vision-img", start: "top 80%" },
          },
        );

        // Tabs fade up staggered
        gsap.fromTo(
          ".tab-item-wrap",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".tabs-list", start: "top 85%" },
          },
        );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="px-4 md:px-10 py-20"
      style={{ backgroundColor: "#F9F6F2" }}
    >
      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-stretch">
        {/* Left: tabs */}
        <div className="flex-1 min-w-0 tabs-list">
          {tabs.map((tab, i) => (
            <div
              key={i}
              className={`tab-item-wrap ${
                i === tabs.length - 1 ? "border-b" : ""
              }`}
              style={{ borderColor: "#E3D9CF" }}
            >
              <TabItem
                tab={tab}
                isActive={activeIdx === i}
                onClick={() => setActiveIdx(i)}
              />
            </div>
          ))}
        </div>

        {/* Right: image */}
        <div className="vision-img flex-1 min-w-0 rounded-2xl overflow-hidden h-[360px] md:h-auto">
          <img
            src="https://rssnew.s3.ap-south-1.amazonaws.com/public/media-gallery/pic17.JPG"
            alt="Medical volunteers helping elderly woman"
            className="w-full h-full object-cover block"
          />
        </div>
      </div>
    </div>
  );
};

export default VisionApproachImpact;
