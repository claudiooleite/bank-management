"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { NextIntlClientProvider } from "next-intl";
import { useEffect, useState } from "react";
import en from "../locales/en.json";
import es from "../locales/es.json";

// Localization messages for supported languages
const messages: Record<"en" | "es", any> = { en, es };

/**
 * ReduxProvider Component
 * - Wraps the application with Redux store and internationalization support.
 * - Manages language preferences using `localStorage`.
 */
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<"en" | "es">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as "en" | "es") || "en";
    }
    return "en";
  });

  // ✅ Avoid Hydration Error by Ensuring Client-Only Rendering
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    localStorage.setItem("language", locale);
  }, [locale]);

  if (!isClient) return null; // Don't render until client is ready

  return (
    <NextIntlClientProvider messages={messages[locale]} locale={locale}>
      <Provider store={store}>{children}</Provider>
    </NextIntlClientProvider>
  );
}
