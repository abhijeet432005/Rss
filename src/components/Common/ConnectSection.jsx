import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const images = [
  {
    cls: "top-[80px] left-[40px] w-[200px] h-[220px]",
    src: "https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/693a57385b8a83528dcbfba4_cta-02.webp",
    alt: "Child smiling",
  },
  {
    cls: "top-[40px] right-[40px] w-[220px] h-[240px]",
    src: "https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/693a5738b7f10ad34d65ba49_cta-03.webp",
    alt: "Kids on bikes",
  },
  {
    cls: "bottom-[60px] left-[200px] w-[210px] h-[220px]",
    src: "https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/693a57379a14ed89001132ca_cta-04.webp",
    alt: "Elder man",
  },
  {
    cls: "bottom-[80px] right-[80px] w-[200px] h-[200px]",
    src: "https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/693a57373a75419dd8d64ae2_cta-01.webp",
    alt: "Volunteers",
  },
];

const ConnectSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {

      // Eyebrow fade up
      gsap.fromTo(
        ".connect-eyebrow",
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".connect-eyebrow", start: "top 88%" },
        }
      );

      // Heading split reveal
      const split = new SplitText(".connect-heading", { type: "lines" });
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
          y: "0%", opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".connect-heading", start: "top 88%" },
        }
      );

      // Input bar fade up
      gsap.fromTo(
        ".connect-input",
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".connect-input", start: "top 90%" },
        }
      );

      // Floating images — each from different direction
      const directions = [
        { x: -40, y: -30 }, // top-left: from top-left
        { x: 40, y: -30 },  // top-right: from top-right
        { x: -30, y: 40 },  // bottom-left: from bottom-left
        { x: 40, y: 40 },   // bottom-right: from bottom-right
      ];

      document.querySelectorAll(".float-img").forEach((el, i) => {
        gsap.fromTo(
          el,
          {
            x: directions[i].x,
            y: directions[i].y,
            opacity: 0,
            scale: 1.08,
            filter: "blur(8px)",
          },
          {
            x: 0, y: 0, opacity: 1, scale: 1, filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
            delay: i * 0.12,
          }
        );
      });

      // Mobile image clip-path reveal
      gsap.fromTo(
        ".mobile-img",
        { clipPath: "inset(0% 0% 100% 0%)", scale: 1.1, filter: "blur(8px)" },
        {
          clipPath: "inset(0% 0% 0% 0%)", scale: 1, filter: "blur(0px)",
          duration: 1.2, ease: "power2.inOut",
          scrollTrigger: { trigger: ".mobile-img", start: "top 88%" },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden min-h-[700px] md:min-h-[700px] flex flex-col items-center px-5 md:px-10 pt-16 pb-0 md:py-20"
      style={{ backgroundColor: "#F9F6F2" }}
    >

      {/* Floating images — desktop only */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`float-img absolute rounded-2xl overflow-hidden hidden md:block ${img.cls}`}
        >
          <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Center content */}
      <div className="relative z-10 text-center max-w-xl w-full md:mt-20">
        <p
          className="connect-eyebrow text-[11px] font-medium tracking-widest mb-4"
          style={{ color: "#6B5B50" }}
        >
          [ CONNECT WITH OUR MISSION ]
        </p>
        <h2
          className="connect-heading font-normal leading-snug mb-8"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.3rem)", color: "#3D1A1A" }}
        >
          Your support helps us reach more lives, one step at a time.
        </h2>

        {/* Email input */}
        <div
          className="connect-input flex items-center gap-3 rounded-full px-1 w-full max-w-[500px] h-13 mx-auto ring-1 ring-[#C9B8B0] ring-offset-3 ring-offset-[#F9F6F2]"
          style={{ backgroundColor: "#E9E0DE" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 ml-4">
            <rect x="2" y="4" width="14" height="10" rx="2" stroke="#9B8B80" strokeWidth="1.4" />
            <path d="M2 6.5l7 4.5 7-4.5" stroke="#9B8B80" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="flex-1 bg-transparent border-none outline-none text-xs font-medium tracking-widest uppercase"
            style={{ color: "#3D1A1A" }}
          />
          <button
            aria-label="Subscribe"
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#3D1A1A" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M10 4l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile: single image below center content */}
      <div className="mobile-img block md:hidden w-full rounded-2xl overflow-hidden mt-12" style={{ height: "260px" }}>
        <img
          src="https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/693a57373a75419dd8d64ae2_cta-01.webp"
          alt="Child smiling"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ConnectSection;