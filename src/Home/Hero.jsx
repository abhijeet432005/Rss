import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Split heading into lines
    const split = new SplitText("h1", { type: "lines" });

    // Wrap each line in a overflow:hidden div to mask the reveal
    split.lines.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    tl
      // Heading lines slide up from bottom
      .fromTo(
        split.lines,
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1, stagger: 0.15 }
      )
      // Left image: blur + slide up
      .fromTo(
        ".left-img",
        { y: 60, opacity: 0, filter: "blur(12px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
        "-=0.6"
      )
      // Right text block: slide up
      .fromTo(
        ".right-text",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=0.8"
      )
      // Center image: clip-path top to bottom reveal + blur + zoom
      .fromTo(
        ".center-img img",
        {
          clipPath: "inset(0% 0% 100% 0%)",
          scale: 1.15,
          filter: "blur(10px)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=0.7"
      )
      // Caption row fade up
      .fromTo(
        ".caption-row",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="min-h-screen p-4 md:p-10 relative overflow-hidden"
      style={{ backgroundColor: "#F9F6F2" }}
    >
      {/* Headline */}
      <div className="text-center mb-8 md:mb-10 overflow-hidden">
        <h1
          className="font-bold uppercase md:leading-[8rem] leading-[3rem] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "#512731" }}
        >
          SUPPORT
          <br />
          CHANGES LIVES
        </h1>
      </div>

      {/* Content grid */}
      <div className="w-full flex gap-8 flex-col md:flex-row justify-center md:justify-between items-center md:items-start">

        {/* Left: video thumbnail */}
        <div className="left-img flex justify-center md:justify-start">
          <div
            className="relative rounded-2xl overflow-hidden w-full"
            style={{ maxWidth: "320px", aspectRatio: "3/2", minHeight: "350px" }}
          >
            <img
              src="https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/69427a8c64b9dc4e3222189a_c0c4ffbdcdfb68902cf036062283a239_video-image.webp"
              alt="Children in classroom"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <button
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow"
                aria-label="Play video"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <polygon points="5,3 13,8 5,13" fill="#3D1A1A" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Center: main image + caption */}
        <div className="flex flex-col justify-center items-center">
          <div
            className="center-img rounded-2xl overflow-hidden w-full"
            style={{ aspectRatio: "2/2.2", maxWidth: "700px" }}
          >
            <img
              src="https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/69427a8c64b9dc4e32221894_img.webp"
              alt="African school children smiling"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="caption-row hidden md:flex gap-12 mt-4 justify-between w-full items-center">
            <p className="text-base md:text-2xl" style={{ color: "#3D1A1A", minWidth: "160px" }}>
              Together, We Create Change
            </p>
            <p className="text-sm md:text-base max-w-xs" style={{ color: "#7A6A5A" }}>
              From small acts of kindness to global impact it all starts here.
            </p>
          </div>
        </div>

        {/* Right: text + donate button */}
        <div className="right-text flex justify-start md:justify-center md:w-[40vw] ml-10 items-center md:mt-30 mr-auto md:mr-0">
          <div className="flex flex-col gap-6">
            <p className="text-sm md:text-base leading-relaxed md:max-w-lg" style={{ color: "#5C4A3A" }}>
              Giveza is a purpose-driven foundation &amp; NGO committed to
              creating meaningful impact in the lives of those who need it most.
            </p>

            <div className="flex items-center">
              <div className="bg-red-950 w-12 h-12 flex justify-center items-center rounded-[8px]">
                <img
                  src="https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/69427a8c64b9dc4e32221898_ic.svg"
                  alt=""
                />
              </div>
              <button
                className="flex items-center gap-3 justify-center h-12 w-40 rounded-[8px]"
                style={{ border: "1px solid #3D1A1A", cursor: "pointer" }}
              >
                <p className="md:text-base">Donate Now</p>
                <img
                  src="https://cdn.prod.website-files.com/6887734e6643e3b9bf041596/693912a128e9f87bf5ae2730_93405098fb41a22b9ad5e40831cc067a_arrow.svg"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;