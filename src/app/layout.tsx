import type { Metadata } from "next";
import { ReduxProvider } from "@/redux/Provider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Inter } from "next/font/google";
import "./globals.css";

/**
 * Load the Inter font from Google Fonts
 * - Uses CSS variable "--font-inter" for styling consistency
 * - Supports Latin character subsets
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/**
 * Metadata configuration for the application
 * - Sets the title and description for SEO and accessibility
 */
export const metadata: Metadata = {
  title: "Banking App",
  description: "A secure and modern banking application",
  icons: {
    icon: "/bank.png", // ✅ Set the path to your PNG icon
  },
};

/**
 * Root layout component
 * - Provides a consistent structure for all pages
 * - Wraps the application with global providers
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased max-w-screen-xl min-h-screen m-auto`}>
        {/* Redux Provider to manage global state */}
        <ReduxProvider>
          {/* Language switcher for localization */}
          <LanguageSwitcher />
          {/* Main content of the application */}
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
