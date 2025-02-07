"use client";

import { useState, useEffect } from "react";

/**
 * LanguageSwitcher Component
 * - Allows users to switch between different languages.
 * - Saves the selected language in `localStorage` for persistence.
 * - Reloads the page upon language change to apply translations.
 * - Disables the button of the currently active language.
 */
export default function LanguageSwitcher() {
  // Initialize state with language from localStorage (if available)
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language") || "en";
      setLanguage(storedLanguage);
    }
  }, []);

  /**
   * Handles language change
   * - Updates the language state
   * - Stores the selected language in `localStorage`
   * - Reloads the page to apply language changes
   *
   * @param {string} lang - Selected language code
   */
  const handleLanguageChange = (lang: string) => {
    if (lang !== language) {
      setLanguage(lang);
      localStorage.setItem("language", lang);
      window.location.reload(); // Reload to apply language change
    }
  };

  return (
    <div className="p-2 flex gap-2">
      {/* English Language Button (Disabled if Active) */}
      <button
        className={`border rounded-lg p-2 bg-white m-1 ${
          language === "en"
            ? "border-slate-500 opacity-50 cursor-not-allowed"
            : ""
        }`}
        onClick={() => handleLanguageChange("en")}
        disabled={language === "en"}>
        English
      </button>

      {/* Spanish Language Button (Disabled if Active) */}
      <button
        className={`border rounded-lg p-2 bg-white m-1 ${
          language === "es"
            ? "border-slate-500 opacity-50 cursor-not-allowed"
            : ""
        }`}
        onClick={() => handleLanguageChange("es")}
        disabled={language === "es"}>
        Español
      </button>
    </div>
  );
}
