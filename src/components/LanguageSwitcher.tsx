"use client";

import { useState } from "react";

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "en";
    }
    return "en";
  });

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    window.location.reload(); 
  };

  return (
    <div className="p-2 flex gap-2">
      <button
        className={`border rounded-lg p-2 bg-white m-1 ${
          language === "en" ? " border-slate-500" : ""
        }`}
        onClick={() => handleLanguageChange("en")}
      >
        English
      </button>

      <button
        className={`border rounded-lg p-2 bg-white m-1 ${
          language === "es" ? " border-slate-500" : ""
        }`}
        onClick={() => handleLanguageChange("es")}
      >
        Español
      </button>
    </div>
  );
}
