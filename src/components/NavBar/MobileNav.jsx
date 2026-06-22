import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { navItems, languages, ORANGE } from "./navData";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const drawerRef = useRef(null);

  useGSAP(() => {
    if (open) {
      gsap.fromTo(drawerRef.current, { xPercent: -100 }, { xPercent: 0, duration: 0.4, ease: "power3.out" });
    }
  }, [open]);

  const closeDrawer = () => {
    gsap.to(drawerRef.current, {
      xPercent: -100,
      duration: 0.35,
      ease: "power3.in",
      onComplete: () => setOpen(false),
    });
  };

  const toggleItem = (label) => {
    setExpandedItem((prev) => (prev === label ? null : label));
  };

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 w-full z-50 bg-white">
        <div className="flex items-center justify-between px-5 py-4">
          <button onClick={() => setOpen(true)} aria-label="Open menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <p className="font-bold text-base" style={{ color: "#111" }}>Rashtriya Swabhiman Sangh Party</p>
          <NavLink to="/login" aria-label="Login">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="7" r="3.2" stroke="#111" strokeWidth="1.5" />
              <path d="M4 18c0-3.5 3-6 7-6s7 2.5 7 6" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </NavLink>
        </div>
      </div>

      {open && (
        <div ref={drawerRef} className="lg:hidden fixed top-0 left-0 w-full h-full z-50 overflow-y-auto" style={{ backgroundColor: ORANGE }}>
          <div className="flex items-center justify-between px-5 py-4 bg-white">
            <button onClick={closeDrawer} aria-label="Close menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 5l14 14M19 5L5 19" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <p className="font-bold text-base" style={{ color: "#111" }}>Rashtriya Swabhiman Sangh Party</p>
            <NavLink to="/login" onClick={closeDrawer} aria-label="Login">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="7" r="3.2" stroke="#111" strokeWidth="1.5" />
                <path d="M4 18c0-3.5 3-6 7-6s7 2.5 7 6" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </NavLink>
          </div>

          <div className="px-5 py-6 flex flex-col gap-5 text-white">
            {navItems.map((item) => (
              <div key={item.label}>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => {
                    if (item.submenu) {
                      toggleItem(item.label);
                    } else {
                      closeDrawer();
                    }
                  }}
                >
                  {item.submenu ? (
                    <span className="text-base font-bold tracking-wide">{item.label}</span>
                  ) : (
                    <NavLink
                      to={item.path}
                      onClick={closeDrawer}
                      className="text-base font-bold tracking-wide"
                    >
                      {item.label}
                    </NavLink>
                  )}
                  {item.submenu && (
                    <svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      style={{ transform: expandedItem === item.label ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
                    >
                      <path d="M6 4l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>

                {item.submenu && expandedItem === item.label && (
                  <div className="mt-4 pl-2 flex flex-col gap-4">
                    {item.type === "mega"
                      ? Object.entries(item.submenu).map(([groupLabel, links]) => (
                          <div key={groupLabel}>
                            <p className="text-sm font-semibold tracking-wide opacity-90 mb-2">• {groupLabel}</p>
                            <div className="flex flex-col gap-3 pl-4">
                              {links.map((l) => (
                                <NavLink
                                  key={l.label}
                                  to={l.path}
                                  onClick={closeDrawer}
                                  className="text-sm font-semibold"
                                >
                                  {l.label}
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        ))
                      : item.submenu.map((l) => (
                          <NavLink
                            key={l.label}
                            to={l.path}
                            onClick={closeDrawer}
                            className="text-sm font-semibold pl-2"
                          >
                            {l.label}
                          </NavLink>
                        ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-2">
              <p className="text-sm font-semibold tracking-wide opacity-90 mb-2">LANGUAGE</p>
              <div className="flex gap-4 pl-2">
                {languages.map((lang) => (
                  <span key={lang.code} className="text-sm font-semibold">
                    {lang.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;