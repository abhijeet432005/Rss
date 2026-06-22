import React, { useRef, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { navItems, ORANGE } from "./navData";
import MegaMenu from "./MegaMenu";
import LanguageDropdown from "./LanguageDropdown";

const isItemActive = (item, pathname) => {
  if (pathname === item.path || pathname.startsWith(item.path + "/"))
    return true;

  if (item.submenu) {
    if (item.type === "mega") {
      return Object.values(item.submenu)
        .flat()
        .some((l) => pathname === l.path || pathname.startsWith(l.path + "/"));
    }
    if (item.type === "simple") {
      return item.submenu.some(
        (l) => pathname === l.path || pathname.startsWith(l.path + "/"),
      );
    }
  }
  return false;
};

const DesktopNav = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hoverIdx, setHoverIdx] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("English");

  const navRef = useRef(null);
  const bgRef = useRef(null);
  const megaRef = useRef(null);
  const closeTimer = useRef(null);

  const handleEnter = (idx) => {
    clearTimeout(closeTimer.current);
    setHoverIdx(idx);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setHoverIdx(null), 150);
  };

  // Naya function — link click hone par immediately panel close karega
  const handleLinkClick = () => {
    clearTimeout(closeTimer.current);
    setHoverIdx(null);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isWhite = scrolled || hovering;

  useGSAP(() => {
    if (isWhite) {
      gsap.fromTo(
        bgRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.4,
          ease: "power3.out",
          transformOrigin: "top",
        },
      );
    } else {
      gsap.to(bgRef.current, {
        scaleY: 0,
        duration: 0.3,
        ease: "power3.in",
        transformOrigin: "top",
      });
    }
  }, [isWhite]);

  useGSAP(() => {
    if (hoverIdx !== null && navItems[hoverIdx]?.submenu) {
      gsap.fromTo(
        megaRef.current,
        { autoAlpha: 0, y: -10 },
        { autoAlpha: 1, y: 0, duration: 0.3, ease: "power3.out" },
      );
    }
  }, [hoverIdx]);

  // const handleEnter = (idx) => {
  //   clearTimeout(closeTimer.current);
  //   setHoverIdx(idx);
  // };
  // const handleLeave = () => {
  //   closeTimer.current = setTimeout(() => setHoverIdx(null), 150);
  // };

  const activeItem = hoverIdx !== null ? navItems[hoverIdx] : null;

  return (
    <div
      ref={navRef}
      className="hidden lg:block fixed top-0 left-0 w-full z-50"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        handleLeave();
      }}
    >
      <div
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundColor: "#ffffff",
          transform: "scaleY(0)",
          transformOrigin: "top",
          zIndex: -1,
        }}
      />

      <div className="relative flex items-center justify-between px-10 py-4">
        <NavLink
          to="/"
          className="font-bold text-lg leading-tight"
          style={{ color: "#111" }}
        >
          Rashtriya Swabhiman
          <br />
          Sangh Party
        </NavLink>

        <div className="flex items-center gap-8">
          {navItems.map((item, i) => {
            const active = isItemActive(item, location.pathname);
            return (
              <div
                key={item.label}
                className="relative py-2"
                onMouseEnter={() => handleEnter(i)}
              >
                <NavLink
                  to={item.path}
                  className="text-sm font-bold tracking-wide relative"
                  style={{ color: active ? ORANGE : "#111" }}
                >
                  {item.label}
                  <span
                    className="absolute left-0 -bottom-2 h-[2px] w-full origin-left transition-transform duration-300"
                    style={{
                      backgroundColor: ORANGE,
                      transform:
                        active || hoverIdx === i ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </NavLink>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-6">
          <NavLink to="/login" className="text-base" style={{ color: "#111" }}>
            Login
          </NavLink>
          <LanguageDropdown
            langOpen={langOpen}
            setLangOpen={setLangOpen}
            activeLang={activeLang}
            setActiveLang={setActiveLang}
          />
        </div>
      </div>

      <MegaMenu
        activeItem={activeItem}
        megaRef={megaRef}
        onMouseEnter={() => handleEnter(hoverIdx)}
        onLinkClick={handleLinkClick}
      />
    </div>
  );
};

export default DesktopNav;
