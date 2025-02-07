"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { NextIntlClientProvider } from "next-intl";
import { useEffect, useState } from "react";
import en from "../locales/en.json";
import es from "../locales/es.json";

// Localization messages for supported languages
const messages: Record<"en" | "es", any> = { en, es };

interface ReduxProviderProps {
  children: React.ReactNode;
}

/**
 * ReduxProvider Component
 * - Wraps the application with Redux store and internationalization support.
 * - Manages language preferences using `localStorage`.
 */
export function ReduxProvider({ children }: ReduxProviderProps) {
  // ✅ Get saved language preference from localStorage (default to "en")
  const [locale, setLocale] = useState<"en" | "es">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as "en" | "es") || "en";
    }
    return "en";
  });

  // ✅ Persist selected language to localStorage whenever `locale` changes
  useEffect(() => {
    localStorage.setItem("language", locale);
  }, [locale]);

  return (
    <NextIntlClientProvider messages={messages[locale]} locale={locale}>
      <Provider store={store}>{children}</Provider>
    </NextIntlClientProvider>
  );
}
