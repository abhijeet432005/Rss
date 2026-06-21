import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const volunteers = [
  {
    name: "Leslie Alexander",
    role: "Volunteer Manager",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80",
    desc: "She leads volunteer coordination and ensures every program runs smoothly with care and dedication.",
  },
  {
    name: "Jenny Wilson",
    role: "Media Coordinator",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
    desc: "She creates engaging and creative content, manages social channels, coordinates campaigns, monitors performance, and supports public relations efforts to expand awareness and engagement successfully.",
  },
  {
    name: "Esther Howards",
    role: "Program Manager",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80",
    desc: "He oversees all field programs, ensuring resources reach the right communities at the right time efficiently.",
  },
  {
    name: "Bessie Cooper",
    role: "Donor Relations",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
    desc: "She manages donor relationships and builds long-term partnerships that sustain our community programs.",
  },
];

const VolunteerCard = ({ person }) => {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    // Set initial state via GSAP, not inline style
    gsap.set(cardRef.current, { xPercent: 100 });

    const tl = gsap.timeline({ paused: true });
    tl.to(imgRef.current, { scale: 1.08, duration: 0.6, ease: "power2.out" }, 0);
    tl.to(cardRef.current, { xPercent: 0, duration: 0.5, ease: "power3.out" }, 0);

    const el = wrapRef.current;
    const enter = () => tl.play();
    const leave = () => tl.reverse();

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div className="flex flex-col flex-shrink-0" style={{ width: "380px" }}>
      <div
        ref={wrapRef}
        className="relative overflow-hidden cursor-pointer rounded-xl"
        style={{ width: "380px", height: "460px" }}
      >
        <img
          ref={imgRef}
          src={person.img}
          alt={person.name}
          className="w-full h-full object-cover block"
        />
        <div
          ref={cardRef}
          className="absolute top-0 left-0 w-full h-full flex flex-col justify-start p-10"
          style={{ backgroundColor: "#E9E2D8" }}
        >
          <p className="text-base leading-relaxed mb-6" style={{ color: "#5C4A3A" }}>
            {person.desc}
          </p>
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider" style={{ color: "#3D1A1A" }}>
            READ MORE
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="#3D1A1A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-baseline pt-4 px-2">
        <p className="text-xl" style={{ color: "#3D1A1A" }}>
          {person.name}
        </p>
        <p className="text-sm" style={{ color: "#5C4A3A" }}>
          {person.role}
        </p>
      </div>
    </div>
  );
};

const OurVolunteersMarquee = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText(".marquee-heading", { type: "lines" });
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
          scrollTrigger: { trigger: ".marquee-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".marquee-eyebrow",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".marquee-eyebrow", start: "top 88%" },
        }
      );

      // Infinite marquee scroll
      const track = document.querySelector(".marquee-track");
      const trackWidth = track.scrollWidth / 2;

      gsap.to(track, {
        x: -trackWidth,
        duration: 40,
        ease: "none",
        repeat: -1,
      });

    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="px-4 md:px-10 py-20 overflow-hidden"
      style={{ backgroundColor: "#F9F6F2" }}
    >
      <div className="text-center mb-12">
        <p
          className="marquee-eyebrow text-sm font-semibold tracking-wider mb-2"
          style={{ color: "#3D1A1A" }}
        >
          [ MEET OUR TEAM ]
        </p>
        <h2
          className="marquee-heading overflow-hidden"
          style={{ fontSize: "clamp(2.2rem, 6vw, 3.6rem)", color: "#3D1A1A" }}
        >
          Our Volunteers
        </h2>
      </div>

      <div className="marquee-track flex gap-5 w-max">
        {[...volunteers, ...volunteers].map((person, i) => (
          <VolunteerCard key={i} person={person} />
        ))}
      </div>
    </div>
  );
};

export default OurVolunteersMarquee;