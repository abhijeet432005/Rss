import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const events = [
  {
    title: "Help renovate village school rooms",
    location: "Toronto, US",
    img: "https://cdn.prod.website-files.com/693a8987cdf1d85bb639bab7/693d11b97f72c7bac7b49a35_event-thumb-02.webp",
  },
  {
    title: "Women's wellness and health camp",
    location: "Georgia, USA",
    img: "https://cdn.prod.website-files.com/693a8987cdf1d85bb639bab7/693cfe84db735f60e5f52700_event-thumb-01.webp",
  },
  {
    title: "Free meals for homeless families",
    location: "Georgia, USA",
    img: "https://cdn.prod.website-files.com/693a8987cdf1d85bb639bab7/693d1219de3d48108251b6b4_event-thumb-05.webp",
  },
];

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 13L13 3M13 3H6M13 3V10"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UpcomingEvents = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {

      // --- Eyebrow text fade up ---
      gsap.fromTo(
        ".eyebrow",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".eyebrow",
            start: "top 88%",
          },
        }
      );

      // --- Heading split reveal ---
      const headingSplit = new SplitText(".events-heading", { type: "lines" });
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
            trigger: ".events-heading",
            start: "top 88%",
          },
        }
      );

      // --- Cards: clip-path reveal + blur + zoom staggered ---
      gsap.fromTo(
        ".event-img",
        {
          clipPath: "inset(0% 0% 100% 0%)",
          filter: "blur(10px)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".events-grid",
            start: "top 82%",
          },
        }
      );

      // --- Card title + meta fade up staggered ---
      gsap.fromTo(
        ".card-content",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".events-grid",
            start: "top 82%",
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="px-4 md:px-10 py-20"
      style={{ backgroundColor: "#F9F6F2" }}
    >
      {/* Header */}
      <p
        className="eyebrow text-center text-xs font-medium tracking-widest mb-3"
        style={{ color: "#6B5B50" }}
      >
        [ EVENTS &amp; FUNDRAISERS ]
      </p>
      <h2
        className="events-heading text-center font-semibold mb-10"
        style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#3D1A1A" }}
      >
        Upcoming Events
      </h2>

      {/* Grid */}
      <div className="events-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event, i) => (
          <div key={i} className="group cursor-pointer">

            {/* Image wrapper — overflow:hidden needed for clip-path */}
            <div
              className="event-img relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={event.img}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.07]"
              />
              {/* Arrow on hover */}
              <div
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center
                  opacity-0 translate-y-2 transition-all duration-300
                  group-hover:opacity-100 group-hover:translate-y-0"
                style={{ backgroundColor: "#3D1A1A" }}
                aria-hidden="true"
              >
                <ArrowIcon />
              </div>
            </div>

            {/* Title + meta */}
            <div className="card-content">
              <div className="flex items-center gap-2 mt-4 mb-3">
                <h3 className="text-base font-medium" style={{ color: "#3D1A1A" }}>
                  {event.title}
                </h3>
              </div>
              <div
                className="flex flex-col justify-between text-xs gap-2"
                style={{ color: "#8B7B70" }}
              >
                <div className="w-full border-t border-[#D9CBBF]" />
                <div className="flex justify-between">
                  <span>Location</span>
                  <span>{event.location}</span>
                </div>
                <div className="w-full border-t border-[#D9CBBF]" />
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;