import React from "react";
import { languages, ORANGE } from "./navData";

const LanguageDropdown = ({ langOpen, setLangOpen, activeLang, setActiveLang }) => {
  return (
    <div className="relative">
      <div
        className="flex items-center gap-1 px-4 py-1.5 rounded-full text-sm cursor-pointer"
        style={{ backgroundColor: "#FBEAF0", color: "#111" }}
        onClick={() => setLangOpen((prev) => !prev)}
      >
        {activeLang}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{
            transform: langOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          <path d="M3 4.5l3 3 3-3" stroke="#111" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {langOpen && (
        <div
          className="absolute right-0 top-full mt-2 rounded-lg overflow-hidden shadow-md"
          style={{ backgroundColor: "#fff", border: "1px solid #eee", minWidth: "120px" }}
        >
          {languages.map((lang) => (
            <div
              key={lang.code}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-50"
              style={{
                color: activeLang === lang.label ? ORANGE : "#111",
                fontWeight: activeLang === lang.label ? 700 : 400,
              }}
              onClick={() => {
                setActiveLang(lang.label);
                setLangOpen(false);
              }}
            >
              {lang.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;