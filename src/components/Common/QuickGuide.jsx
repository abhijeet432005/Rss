import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const faqs = [
  {
    question: "How can I become a member of the party?",
    answer:
      "You can join the party by filling out the membership form on our website. Our team will review your application and contact you with the next steps.",
  },
  {
    question: "How can I volunteer for party activities?",
    answer:
      "We welcome volunteers for outreach programs, community events, campaigns, and awareness drives. Register through our volunteer section to get involved.",
  },
  {
    question: "Where can I learn about the party's vision and policies?",
    answer:
      "Our vision, mission, and policy priorities are available in the manifesto section of the website, where you can learn about our goals and commitments.",
  },
  {
    question: "How can I participate in local events and meetings?",
    answer:
      "Upcoming events, rallies, and community meetings are regularly updated on our website. You can register online to participate.",
  },
  {
    question: "How can I contact party representatives?",
    answer:
      "You can reach our representatives through the contact page, email, or by visiting your nearest party office listed on the website.",
  },
  {
    question: "Does the party accept donations?",
    answer:
      "Yes, eligible contributions can be made through the official donation channels in accordance with applicable laws and regulations.",
  },
];

const FaqItem = ({ faq, isOpen, onClick }) => {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const iconRef = useRef(null);

  useGSAP(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;

    if (isOpen) {
      gsap.to(wrap, {
        height: inner.offsetHeight,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(iconRef.current, {
        rotate: 45,
        duration: 0.4,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(wrap, {
        height: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(iconRef.current, {
        rotate: 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div
      className="faq-item border rounded-2xl mb-4 overflow-hidden"
      style={{ borderColor: "#E3D9CF" }}
    >
      <div
        className="flex items-center justify-between px-4 md:px-6 py-4 md:py-5 cursor-pointer"
        onClick={onClick}
      >
        <p
          className="text-base md:text-lg font-semibold"
          style={{ color: "#3D1A1A" }}
        >
          {faq.question}
        </p>
        <div
          className="w-9 h-9 md:w-11 md:h-11 rounded-full border flex items-center justify-center flex-shrink-0 ml-3 md:ml-4"
          style={{ borderColor: "#E3D9CF" }}
        >
          <svg
            ref={iconRef}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 2v12M2 8h12"
              stroke="#3D1A1A"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div ref={wrapRef} style={{ height: 0, overflow: "hidden" }}>
        <div
          ref={innerRef}
          className="px-4 md:px-6 pb-5 text-sm leading-relaxed"
          style={{ color: "#5C4A3A" }}
        >
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

const QuickGuide = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

  const handleToggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  useGSAP(() => {
    const ctx = gsap.context(() => {

      // Eyebrow fade up
      gsap.fromTo(
        ".faq-eyebrow",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-eyebrow", start: "top 88%" },
        }
      );

      // Heading split reveal
      const split = new SplitText(".faq-heading", { type: "lines" });
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
          scrollTrigger: { trigger: ".faq-heading", start: "top 88%" },
        }
      );

      // FAQ items fade up staggered
      gsap.fromTo(
        ".faq-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-list", start: "top 85%" },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="px-6 md:px-10 py-14 md:py-20"
      style={{ backgroundColor: "#F9F6F2" }}
    >
      <div className="max-w-4xl mx-auto">
        <p
          className="faq-eyebrow text-center text-sm font-semibold tracking-wider mb-2"
          style={{ color: "#3D1A1A" }}
        >
          [ FREQUENTLY ASKED QUESTIONS ]
        </p>
        <h2
          className="faq-heading text-center mb-12"
          style={{
            fontSize: "clamp(2.2rem, 6vw, 3.6rem)",
            color: "#3D1A1A",
          }}
        >
          Quick Guide
        </h2>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onClick={() => handleToggle(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickGuide;