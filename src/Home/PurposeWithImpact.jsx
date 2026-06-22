import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const PurposeWithImpact = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {

      // --- Heading split reveal ---
      const headingSplit = new SplitText("h2", { type: "lines" });
      headingSplit.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.fromTo(
        headingSplit.lines,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "h2",
            start: "top 85%",
          },
        }
      );

      // --- Body paragraph split reveal ---
      const paraSplit = new SplitText(".body-para", { type: "lines" });
      paraSplit.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.fromTo(
        paraSplit.lines,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".body-para",
            start: "top 88%",
          },
        }
      );

      // --- Small image: blur + fade up ---
      gsap.fromTo(
        ".small-img",
        { y: 40, opacity: 0, filter: "blur(14px)", scale: 1.05 },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".small-img",
            start: "top 88%",
          },
        }
      );

      // --- Quote text split reveal ---
      const quoteSplit = new SplitText(".quote-text", { type: "lines" });
      quoteSplit.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.fromTo(
        quoteSplit.lines,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".quote-text",
            start: "top 90%",
          },
        }
      );

      // --- Large image: clip-path top→bottom + blur + zoom ---
      gsap.fromTo(
        ".large-img img",
        {
          clipPath: "inset(0% 0% 100% 0%)",
          scale: 1.15,
          filter: "blur(10px)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".large-img",
            start: "top 80%",
          },
        }
      );

      // --- Stats count up animation ---
      const statNums = [25000, 100, 8];
      const statSuffixes = ["+", "+", " States"];
      const statPrefixes = ["", "", ""];

      document.querySelectorAll(".stat-num").forEach((el, i) => {
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: statNums[i],
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                const formatted =
                  statNums[i] >= 1000
                    ? Math.floor(obj.val).toLocaleString()
                    : Math.floor(obj.val);
                el.textContent =
                  statPrefixes[i] + formatted + statSuffixes[i];
              },
            });
          },
        });
      });

      // --- Stat items fade + slide up staggered ---
      gsap.fromTo(
        ".stat-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 88%",
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: "#F9F6F2" }}
      className="px-4 md:px-10 py-20"
    >
      {/* Top: heading + big image */}
      <div className="flex flex-col md:flex-row gap-8 items-start">

        {/* Left col */}
        <div className="flex flex-col md:justify-between flex-1 min-w-0 md:h-[420px]">
          <div>
            <h2
              className="leading-tight mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: "#3D1A1A" }}
            >
              Purpose with impact
            </h2>
            <p
              className="body-para text-sm md:text-base leading-relaxed max-w-2xl"
              style={{ color: "#6B5B50" }}
            >
              Founded on empathy and purpose, Giveza exists to uplift lives
              through education, health, and humanitarian support. Every project
              we lead is powered by kindness and a shared belief in human
              dignity.
            </p>
          </div>

          {/* Mid row: small image + quote */}
          <div className="flex flex-col md:flex-row md:justify-between gap-8 items-end mt-16 md:mt-32">
            <div className="flex-shrink-0">
              <img
                src="https://rssnew.s3.ap-south-1.amazonaws.com/public/media-gallery/pic9.jpg"
                alt="Volunteers sorting food boxes"
                className="small-img rounded-xl object-cover"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
            <p
              className="quote-text text-sm md:text-base leading-relaxed max-w-110"
              style={{ color: "#6B5B50" }}
            >
              Whether it's medical aid or food distribution, we believe in
              showing up, stepping in &amp; making it personal.
            </p>
          </div>
        </div>

        {/* Right: big image */}
        <div
          className="large-img w-full md:w-4/12 rounded-2xl overflow-hidden flex-shrink-0"
          style={{ height: "480px" }}
        >
          <img
            src="https://rssnew.s3.ap-south-1.amazonaws.com/public/media-gallery/pic18.JPG"
            alt="Smiling African children"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Stats row */}
      <div
        className="stats-grid grid grid-cols-1 md:grid-cols-3 mt-12"
        style={{ borderTop: "1px solid #D9CBBF" }}
      >
        {[
          {
            num: "0+",
            label: "Dedicated Karyakartas",
            desc: "A growing network of committed individuals working towards the party’s vision.",
          },
          {
            num: "0+",
            label: "Public Initiatives",
            desc: "Community-driven efforts focused on awareness, support, and development.",
          },
          {
            num: "0",
            label: "states reached",
            desc: "We are actively making a difference in 8 states, driving progress and development.",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`stat-item py-8 pr-8 ${i > 0 ? "md:pl-8" : ""} ${i < 2 ? "md:border-r border-r-0" : ""} ${i === 0 || i === 1 ? "border-b md:border-b-0" : ""}`}
            style={{ borderColor: "#D9CBBF" }}
          >
            <div
              className="stat-num font-sans mb-4"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3rem)", color: "#3D1A1A", lineHeight: 1.1 }}
            >
              {stat.num}
            </div>
            <div
              className="font-semibold text-sm mb-2"
              style={{ color: "#3D1A1A", fontSize: "clamp(1rem, 3vw, 1rem)" }}
            >
              {stat.label}
            </div>
            <div
              className="text-sm leading-relaxed"
              style={{ color: "#6B5B50", fontSize: "clamp(1rem, 3vw, 1.1rem)" }}
            >
              {stat.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurposeWithImpact;