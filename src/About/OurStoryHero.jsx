import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const OurStoryHero = () => {
  const containerRef = useRef(null);


  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      const split = new SplitText(".hero-heading", { type: "lines" });
      split.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      tl.fromTo(
        ".hero-eyebrow",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0,
      )
        .fromTo(
          split.lines,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 1, stagger: 0.12 },
          0,
        )
        .fromTo(
          ".hero-sub",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.3,
        )
        .fromTo(
          ".hero-img-main img",
          {
            clipPath: "inset(0% 0% 100% 0%)",
            scale: 1.15,
            filter: "blur(12px)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            filter: "blur(0px)",
            duration: 1.3,
            ease: "power2.inOut",
          },
          0.4,
        )
        .fromTo(
          ".hero-img-left",
          { x: -80, opacity: 0, filter: "blur(10px)" },
          { x: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
          0.9,
        )
        .fromTo(
          ".hero-img-right",
          { x: 80, opacity: 0, filter: "blur(10px)" },
          { x: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
          0.9,
        )
        .fromTo(
          ".hero-bottom-text",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          1.3,
        )
        .fromTo(
          ".hero-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          1.5,
        );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="px-4 md:px-10 py-20 relative overflow-hidden"
      style={{ backgroundColor: "#F9F6F2" }}
    >
      <p
        className="hero-eyebrow text-sm font-semibold tracking-wider mb-2"
        style={{ color: "#3D1A1A" }}
      >
        [ ABOUT US ]
      </p>
      <h1
        className="hero-heading leading-none overflow-hidden"
        style={{ fontSize: "clamp(2.2rem, 7vw, 5.5rem)", color: "#3D1A1A" }}
      >
        Our Story
      </h1>

      <div className="border-t mt-7 mb-5" style={{ borderColor: "#E3D9CF" }} />

      <p
        className="hero-sub text-base md:text-lg mb-10 md:mb-16"
        style={{ color: "#5C4A3A" }}
      >
        We deliver long-term change through focused programs in health,
        education &amp; child welfare.
      </p>

      {/* Image grid — 3 columns on desktop, single column on mobile */}
      <div className="grid grid-cols-1 min-[751px]:grid-cols-[1fr_2fr_1fr] gap-4 md:gap-0 items-center mb-8">
        {/* Left image — pulled left and down to overlap/offset from center */}
        <div
          className="hero-img-left hidden min-[751px]:block rounded-xl overflow-hidden relative"
          style={{
            aspectRatio: "320/260",
            width: "85%",
            marginLeft: "30%",
            marginTop: "40%",
            zIndex: 1,
          }}
        >
          <img
            src="https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/6941301c9571c208f03ad108_about-01.webp"
            alt="Smiling girl with soccer ball"
            className="w-full h-full object-cover block"
          />
        </div>

        {/* Main image — always visible, center column, on top */}
        <div
          className="hero-img-main rounded-xl overflow-hidden w-full relative"
          style={{ aspectRatio: "720/520", zIndex: 2 }}
        >
          <img
            src="https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/6941301c9571c208f03ad10e_7256d9fd119adf1038717316306001f9_about-main.webp"
            alt="Group of children"
            className="w-full h-full object-cover block"
          />
        </div>

        {/* Right image — pulled right and up */}
        <div
          className="hero-img-right hidden min-[751px]:block rounded-r-xl overflow-hidden relative"
          style={{
            aspectRatio: "320/260",
            width: "85%",
            marginLeft: "-15%", // pulls it left/inward toward center, mirrors left image's marginLeft
            marginTop: "-40%", // pushes it up, mirrors left image's marginTop
            zIndex: 1,
          }}
        >
          <img
            src="https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/6941301c9571c208f03ad104_about-02.webp"
            alt="Food distribution"
            className="w-full h-full object-cover block"
          />
        </div>
      </div>

      <p
        className="hero-bottom-text max-w-2xl text-base md:text-lg leading-relaxed mb-6 mx-auto"
        style={{ color: "#5C4A3A" }}
      >
        Giveza is a purpose-driven foundation &amp; NGO committed to creating
        meaningful impact in the lives of those who need it most. We believe
        that real change starts with empathy.
      </p>

      <button
        className="hero-cta flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wider mx-auto"
        style={{
          border: "1px solid #3D1A1A",
          color: "#3D1A1A",
          backgroundColor: "transparent",
        }}
      >
        JOIN WITH US
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 13L13 3M13 3H6M13 3V10"
            stroke="#3D1A1A"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default OurStoryHero;
