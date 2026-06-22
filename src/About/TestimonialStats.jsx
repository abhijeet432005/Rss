import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "The party's local development initiatives helped improve roads and public facilities in our area. We've seen real progress and better access to essential services.",
    name: "Leslie Alexander",
    loc: "Delhi, India",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
  },
  {
    quote:
      "I joined as a volunteer during community outreach programs and was impressed by the team's dedication to addressing local concerns and supporting citizens.",
    name: "Robert Fox",
    loc: "Mumbai, India",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    quote:
      "The party's focus on youth engagement and employment opportunities has encouraged many young people in our region to participate in shaping a better future.",
    name: "Esther Howard",
    loc: "Bengaluru, India",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];

const stats = [
  {
    badge: "Active Volunteers",
    target: 12000,
    suffix: "+",
    label: "Citizens working together for positive change.",
    bg: "linear-gradient(135deg, #D8C2BD, #C3AFA8)",
  },
  {
    badge: "Districts Reached",
    target: 250,
    suffix: "+",
    label: "Strong grassroots presence across regions.",
    bg: "#B7BB9C",
  },
  {
    badge: "Public Support",
    target: 95,
    suffix: "%",
    label: "Driven by trust, participation, and engagement.",
    bg: "#EDE49B",
  },
];
const StatCard = ({ stat, className = "" }) => {
  const numRef = useRef(null);

  useGSAP(() => {
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: numRef.current,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: stat.target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            const v = Math.floor(obj.val);
            numRef.current.textContent =
              (stat.target >= 1000 ? v.toLocaleString() : v) + stat.suffix;
          },
        });
      },
    });
  }, []);

  return (
    <div
      className={`relative rounded-xl p-7 md:p-8 flex flex-col justify-end ${className}`}
      style={{ background: stat.bg }}
    >
      <span
        className="absolute top-6 right-6 bg-white rounded-full px-4 py-2 text-xs md:text-sm"
        style={{ color: "#3D1A1A" }}
      >
        {stat.badge}
      </span>
      <div
        ref={numRef}
        className="leading-none mb-2"
        style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", color: "#3D1A1A" }}
      >
        0
      </div>
      <p className="text-sm md:text-base" style={{ color: "#5C4A3A" }}>
        {stat.label}
      </p>
    </div>
  );
};

const TestimonialStats = () => {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const isAnimating = useRef(false);

  useGSAP(() => {
    // Position the track on index change
    gsap.to(trackRef.current, {
      xPercent: -index * 100,
      duration: 0.6,
      ease: "power3.inOut",
      onStart: () => (isAnimating.current = true),
      onComplete: () => (isAnimating.current = false),
    });
  }, [index]);

  const handleNext = () => {
    if (isAnimating.current) return;
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (isAnimating.current) return;
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="px-4 md:px-10 py-20" style={{ backgroundColor: "#F9F6F2" }}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8">
        {/* Testimonial card — outer frame fixed, track slides inside */}
        <div
          className="rounded-xl p-7 md:p-10 flex flex-col justify-between min-h-[420px] md:min-h-[660px] relative overflow-hidden"
          style={{ backgroundColor: "#B5BBC7" }}
        >
          {/* Viewport mask */}
          <div className="overflow-hidden flex-1">
            {/* Track — all slides laid side by side, shifted via xPercent */}
            <div ref={trackRef} className="flex h-full">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between h-full pr-2 flex-shrink-0"
                  style={{ width: "100%" }}
                >
                  <p
                    className="text-lg md:text-2xl leading-relaxed max-w-[90%]"
                    style={{ color: "#3D1A1A" }}
                  >
                    {t.quote}
                  </p>

                  <div className="flex items-center gap-3 md:gap-4 mt-8">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={t.img}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p
                        className="text-base md:text-lg font-semibold"
                        style={{ color: "#3D1A1A" }}
                      >
                        {t.name}
                      </p>
                      <p className="text-sm" style={{ color: "#5C4A3A" }}>
                        {t.loc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav buttons — fixed, outside the sliding track */}
          <div className="flex gap-2.5 absolute bottom-7 md:bottom-10 right-7 md:right-10">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M11 4l-6 5 6 5"
                  stroke="#3D1A1A"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M7 4l6 5-6 5"
                  stroke="#3D1A1A"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: stats grid */}
        <div className="grid grid-rows-[1fr_1fr] gap-6">
          <StatCard stat={stats[0]} className="min-h-[220px]" />
          <div className="grid grid-cols-2 gap-6">
            <StatCard stat={stats[1]} className="min-h-[180px]" />
            <StatCard stat={stats[2]} className="min-h-[180px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialStats;
