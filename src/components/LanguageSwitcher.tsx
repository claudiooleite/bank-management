"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState("en");
  const t = useTranslations();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    window.location.reload(); // Refresh to apply language change
  };

  return (
    <div>
      <button onClick={() => handleLanguageChange("en")}>English</button>
      <button onClick={() => handleLanguageChange("es")}>Español</button>
    </div>
  );
}
