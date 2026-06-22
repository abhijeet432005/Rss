import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const volunteers = [
  {
    name: "Shri. Krrishna R. Dewassi",
    role: "National President",
    img: "https://rssnew.s3.ap-south-1.amazonaws.com/public/Asset+1+(1).png",
  },
  {
    name: "Shri. Anilkumar Thakur",
    role: "National General Secretary",
    img: "https://rssnew.s3.ap-south-1.amazonaws.com/public/Asset+3+(1).png",
  },
  {
    name: "Shri. Avinash Mishra",
    role: "National Treasurer",
    img: "https://rssnew.s3.ap-south-1.amazonaws.com/public/Asset+4+(1).png",
  },
];

const VolunteerCard = ({ person }) => {
  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.set(imgRef.current, { scale: 1 });
  }, []);

  const handleEnter = () => {
    gsap.to(imgRef.current, {
      scale: 1.08,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div className="volunteer-card">
      <div
        className="rounded-2xl overflow-hidden bg-gray-200 cursor-pointer"
        style={{ aspectRatio: "4/5" }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <img
          ref={imgRef}
          src={person.img}
          alt={person.name}
          className="w-full h-full object-cover block"
        />
      </div>
      <h3
        className="text-xl md:text-2xl mt-4 mb-1"
        style={{ color: "#3D1A1A" }}
      >
        {person.name}
      </h3>
      <p className="text-sm" style={{ color: "#5C4A3A" }}>
        {person.role}
      </p>
    </div>
  );
};

const OurVolunteers = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    const split = new SplitText(".volunteers-heading", { type: "lines" });
    split.lines.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    tl
      .fromTo(
        ".volunteers-eyebrow",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0
      )
      .fromTo(
        split.lines,
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1, stagger: 0.12 },
        0
      )
      .fromTo(
        ".volunteers-divider",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power2.inOut", transformOrigin: "left" },
        0.4
      )
      .fromTo(
        ".volunteers-sub",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.6
      )
      .fromTo(
        ".volunteer-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        0.8
      );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="px-4 md:px-10 py-20"
      style={{ backgroundColor: "#F9F6F2" }}
    >
      <p
        className="volunteers-eyebrow text-sm tracking-wider mb-2 mt-20"
        style={{ color: "#3D1A1A" }}
      >
        [ MEET OUR TEAM ]
      </p>
      <h1
        className="volunteers-heading leading-none overflow-hidden"
        style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#3D1A1A" }}
      >
        Our Volunteers
      </h1>

      <div
        className="volunteers-divider border-t mt-6 mb-5"
        style={{ borderColor: "#E3D9CF" }}
      />

      <p className="volunteers-sub text-base mb-10" style={{ color: "#5C4A3A" }}>
        Our dedicated team brings passion, purpose, and care to every cause we
        serve.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
        {volunteers.map((person, i) => (
          <VolunteerCard key={i} person={person} />
        ))}
      </div>
    </div>
  );
};

export default OurVolunteers;