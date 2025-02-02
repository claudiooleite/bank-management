"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { NextIntlClientProvider } from "next-intl";
import { useEffect, useState } from "react";
import en from "../locales/en.json";
import es from "../locales/es.json";

const messages: Record<"en" | "es", any> = { en, es }; // ✅ Explicitly define message types

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<"en" | "es">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as "en" | "es") || "en";
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("language", locale);
  }, [locale]);

  return (
    <NextIntlClientProvider messages={messages[locale]} locale={locale}>
      <Provider store={store}>{children}</Provider>
    </NextIntlClientProvider>
  );
}
