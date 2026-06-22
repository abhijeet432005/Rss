import React from "react";
import { NavLink } from "react-router-dom";

const MegaMenu = ({ activeItem, megaRef, onMouseEnter }) => {
  if (!activeItem?.submenu) return null;

  return (
    <div
      ref={megaRef}
      className="absolute top-full left-0 w-full border-t overflow-hidden"
      style={{ backgroundColor: "white", borderColor: "#E5E3DD" }}
      onMouseEnter={onMouseEnter}
    >
      <div className="px-10 py-10">
        {activeItem.type === "mega" ? (
          <div className="grid grid-cols-4 gap-12 max-w-5xl ml-auto">
            {Object.entries(activeItem.submenu).map(([groupLabel, links]) => (
              <div key={groupLabel}>
                <p className="text-sm font-bold mb-4" style={{ color: "#111" }}>
                  {groupLabel}
                </p>
                <div className="flex flex-col gap-3">
                  {links.map((l) => (
                    <NavLink key={l.label} to={l.path} className="text-sm" style={{ color: "#8B8B85" }}>
                      {l.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-5xl mx-auto flex justify-center">
            <div>
              <p className="text-sm font-bold mb-3" style={{ color: "#111" }}>
                {activeItem.label}
              </p>
              <div className="flex flex-col gap-2">
                {activeItem.submenu.map((l) => (
                  <NavLink key={l.label} to={l.path} className="text-sm uppercase" style={{ color: "#8B8B85" }}>
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MegaMenu;