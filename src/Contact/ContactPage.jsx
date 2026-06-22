import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const ContactPage = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Heading split reveal
    const split = new SplitText(".contact-heading", { type: "lines" });
    split.lines.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    tl
      // Eyebrow fade up
      .fromTo(
        ".contact-eyebrow",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0
      )
      // Heading lines slide up
      .fromTo(
        split.lines,
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1, stagger: 0.12 },
        0
      )
      // Avatar: scale + blur in
      .fromTo(
        ".contact-avatar",
        { scale: 0.6, opacity: 0, filter: "blur(8px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8 },
        0.3
      )
      // Divider line draw
      .fromTo(
        ".contact-divider",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power2.inOut", transformOrigin: "left" },
        0.4
      )
      // Subtext fade up
      .fromTo(
        ".contact-sub",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.6
      )
      // Left column heading + paragraph
      .fromTo(
        ".contact-left-heading",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.8
      )
      .fromTo(
        ".contact-left-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.9
      )
      // Left divider
      .fromTo(
        ".contact-left-divider",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power2.inOut", transformOrigin: "left" },
        1.0
      )
      // Contact info row
      .fromTo(
        ".contact-info-row",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        1.1
      )
      // Form card: clip-path reveal + blur + zoom
      .fromTo(
        ".contact-form-card",
        {
          clipPath: "inset(0% 0% 100% 0%)",
          scale: 1.04,
          filter: "blur(10px)",
          opacity: 0,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          filter: "blur(0px)",
          opacity: 1,
          duration: 1.1,
          ease: "power2.inOut",
        },
        0.7
      )
      // Form fields stagger fade up (inside the card, after card reveal starts)
      .fromTo(
        ".contact-field",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
        1.1
      )
      // Submit button last
      .fromTo(
        ".contact-submit",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        1.5
      );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="px-4 md:px-10 py-20 w-full"
      style={{ backgroundColor: "#F9F6F2" }}
    >
      <div className="mx-auto mt-20">
        {/* Top row: heading + avatar */}
        <div className="flex justify-between items-center md:items-end gap-6 w-full">
          <div>
            <p
              className="contact-eyebrow text-sm font-semibold tracking-wider mb-2"
              style={{ color: "#3D1A1A" }}
            >
              [ GET IN TOUCH ]
            </p>
            <h1
              className="contact-heading leading-none overflow-hidden"
              style={{
                fontSize: "clamp(2.2rem, 7vw, 5.5rem)",
                color: "#3D1A1A",
              }}
            >
              Contact us
            </h1>
          </div>
          <div className="contact-avatar w-16 h-16 rounded-full overflow-hidden flex-shrink-0 mt-2">
            <img
              src="https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/69395d2bf357c9cfa13ed6ce_contact-title.webp"
              alt="contact person"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div
          className="contact-divider border-t mt-7 mb-6"
          style={{ borderColor: "#E3D9CF" }}
        />

        <p
          className="contact-sub text-base md:text-lg max-w-2xl"
          style={{ color: "#5C4A3A" }}
        >
          Whether you want to volunteer, donate, partner, or simply connect we'd
          love to hear from you.
        </p>

        {/* Grid */}
        <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-10 mt-16 items-start">
          {/* Left column */}
          <div className="flex-1 min-w-0 max-w-xl md:pt-24">
            <h2
              className="contact-left-heading font-bold mb-3"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                color: "#3D1A1A",
              }}
            >
              We're Here to Help
            </h2>
            <p
              className="contact-left-desc text-base leading-relaxed mb-10 max-w-md"
              style={{ color: "#5C4A3A" }}
            >
              Giveza welcomes your thoughts, questions, and feedback with open
              arms. Let us know how we can help or collaborate.
            </p>

            <div
              className="contact-left-divider border-t mb-6 max-w-md"
              style={{ borderColor: "#E3D9CF" }}
            />

            <div className="contact-info-row flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#EDE8E3" }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M3 6l8 5 8-5M3 6v10a1 1 0 001 1h14a1 1 0 001-1V6"
                    stroke="#3D1A1A"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: "#3D1A1A" }}>
                  +(123) 456-7890
                </p>
                <p className="text-sm" style={{ color: "#5C4A3A" }}>
                  info@example.com
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form card */}
          <div
            className="contact-form-card flex-1 bg-white rounded-3xl p-6 md:p-10 w-full max-w-2xl overflow-hidden"
          >
            <div className="flex flex-col md:flex-row gap-4 md:gap-5 mb-4 md:mb-5">
              <div
                className="contact-field flex-1 flex items-center gap-3 rounded-xl px-4 py-4"
                style={{ backgroundColor: "#F3EEE9" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="flex-shrink-0"
                  style={{ color: "#8B7B70" }}
                >
                  <circle cx="9" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.4" />
                  <path
                    d="M3 16c0-3 2.5-5 6-5s6 2 6 5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="First Name*"
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                  style={{ color: "#3D1A1A" }}
                />
              </div>
              <div
                className="contact-field flex-1 flex items-center gap-3 rounded-xl px-4 py-4"
                style={{ backgroundColor: "#F3EEE9" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="flex-shrink-0"
                  style={{ color: "#8B7B70" }}
                >
                  <circle cx="9" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.4" />
                  <path
                    d="M3 16c0-3 2.5-5 6-5s6 2 6 5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                  style={{ color: "#3D1A1A" }}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-5 mb-4 md:mb-5">
              <div
                className="contact-field flex-1 flex items-center gap-3 rounded-xl px-4 py-4"
                style={{ backgroundColor: "#F3EEE9" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="flex-shrink-0"
                  style={{ color: "#8B7B70" }}
                >
                  <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M2 6l7 4.5L16 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <input
                  type="email"
                  placeholder="Email*"
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                  style={{ color: "#3D1A1A" }}
                />
              </div>
              <div
                className="contact-field flex-1 flex items-center gap-3 rounded-xl px-4 py-4"
                style={{ backgroundColor: "#F3EEE9" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="flex-shrink-0"
                  style={{ color: "#8B7B70" }}
                >
                  <path
                    d="M4 3h3l1.5 4-2 1.5a10 10 0 004.5 4.5l1.5-2 4 1.5v3a1 1 0 01-1 1A13 13 0 013 4a1 1 0 011-1z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="tel"
                  placeholder="Phone"
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                  style={{ color: "#3D1A1A" }}
                />
              </div>
            </div>

            <div
              className="contact-field flex items-start gap-3 rounded-xl p-4 mb-6"
              style={{ backgroundColor: "#F3EEE9" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="mt-0.5 flex-shrink-0"
              >
                <path
                  d="M2 3h14a1 1 0 011 1v8a1 1 0 01-1 1H7l-3 3v-3H2a1 1 0 01-1-1V4a1 1 0 011-1z"
                  stroke="#8B7B70"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
              <textarea
                placeholder="Message*"
                rows={5}
                className="flex-1 bg-transparent border-none outline-none text-sm resize-y"
                style={{ color: "#3D1A1A", minHeight: "140px" }}
              />
            </div>

            <button
              className="contact-submit w-full text-white rounded-xl py-4 text-sm font-bold tracking-wider transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#3D1A1A" }}
            >
              SUBMIT NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;