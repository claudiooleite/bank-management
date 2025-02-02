"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { NextIntlClientProvider } from "next-intl";
import { useState } from "react";
import en from "../locales/en.json";
import es from "../locales/es.json";

const messages = { en, es };

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState("en");

  return (
    <NextIntlClientProvider messages={messages[locale]} locale={locale}>
      <Provider store={store}>{children}</Provider>
    </NextIntlClientProvider>
  );
}
