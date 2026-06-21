import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const programs = [
  {
    title: "Purpose-Led Programs",
    desc: "We lead with vision, serve with purpose.",
    icon: "https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/69412b8a73fced90d9760530_ic-01.svg",
  },
  {
    title: "Hands-On Help",
    desc: "Helping communities through action, not words.",
    icon: "https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/69412b8a73fced90d976052f_ic-02.svg",
  },
  {
    title: "Sustainable Support",
    desc: "Support that grows with every step forward.",
    icon: "https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/69412b8a73fced90d9760531_ic-03.svg",
  },
];

const ChangeStartsHere = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Heading split reveal
        const split = new SplitText(".change-heading", { type: "lines" });
        split.lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.style.overflow = "hidden";
          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });

        gsap.fromTo(
          split.lines,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: ".change-heading", start: "top 85%" },
          },
        );

        // Subtext fade up
        gsap.fromTo(
          ".change-sub",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".change-sub", start: "top 88%" },
          },
        );

        // Cards fade up staggered
        gsap.fromTo(
          ".change-card",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: ".change-cards", start: "top 85%" },
          },
        );

        // Image: clip-path top-to-bottom + blur + zoom
        gsap.fromTo(
          ".change-img img",
          {
            clipPath: "inset(0% 0% 100% 0%)",
            scale: 1.15,
            filter: "blur(12px)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ".change-img", start: "top 80%" },
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
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">
        {/* Left column */}
        <div className="flex-1 min-w-0 flex flex-col">
          <h2
            className="change-heading leading-tight mb-4 overflow-hidden"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#3D1A1A" }}
          >
            Change starts here
          </h2>
          <p
            className="change-sub text-base md:text-lg leading-relaxed max-w-xl mb-10 md:mb-12"
            style={{ color: "#5C4A3A" }}
          >
            Giveza focuses on programs that drive deep, lasting change. We
            partner with people and communities to build brighter tomorrows.
          </p>

          <div className="change-cards flex-1 flex flex-col justify-end gap-4">
            {programs.map((p, i) => (
              <div
                key={i}
                className="change-card flex items-center justify-between gap-4 rounded-2xl p-2"
                style={{ backgroundColor: "#EAE2DA" }}
              >
                <div>
                  <p
                    className="text-lg md:text-[1.5rem] mb-1.5 px-5 capitalize"
                    style={{ color: "#3D1A1A" }}
                  >
                    {p.title}
                  </p>
                  <p className="text-sm px-5" style={{ color: "#5C4A3A" }}>
                    {p.desc}
                  </p>
                </div>

                <div className="w-16 h-16 md:w-25 md:h-25 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                  <img src={p.icon} alt="" className="w-7 h-7 md:w-14 md:h-14" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image */}
        <div className="change-img flex-[1.1] min-w-0 rounded-2xl overflow-hidden h-[360px] md:h-auto">
          <img
            src="https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/69412b8a73fced90d976052a_journey-img.webp"
            alt="Children sitting together"
            className="w-full h-full object-cover block"
          />
        </div>
      </div>
    </div>
  );
};

export default ChangeStartsHere;
