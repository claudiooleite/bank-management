import type { Metadata } from "next";
import { ReduxProvider } from "@/redux/Provider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Banking App",
  description: "Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable}antialiased max-w-screen-xl min-h-screen m-auto`}>
        <ReduxProvider>
          <LanguageSwitcher />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
