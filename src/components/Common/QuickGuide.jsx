import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const faqs = [
  {
    question: "Is there a minimum donation amount?",
    answer:
      "No, you can donate any amount you're comfortable with — every contribution helps us reach more lives.",
  },
  {
    question: "Are corporate donations accepted?",
    answer:
      "Yes, we welcome corporate partnerships and donations. Reach out to our team to set up a giving plan that fits your company.",
  },
  {
    question: "Can schools or colleges partner with Giveza?",
    answer:
      "Absolutely. We collaborate with educational institutions on awareness drives, volunteering programs, and fundraising events.",
  },
  {
    question: "What types of programs do you run?",
    answer:
      "We run education support, healthcare camps, food distribution drives, and emergency relief programs across multiple regions.",
  },
  {
    question: "Can I dedicate my donation to someone?",
    answer:
      "Yes, you can dedicate your donation in memory or honor of someone special during the checkout process.",
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