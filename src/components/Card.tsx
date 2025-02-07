"use client";

import React from "react";

/**
 * Card Component
 * - A reusable card wrapper with consistent styling.
 * - Provides padding, shadow, and rounded corners.
 * - Used to wrap various content blocks throughout the application.
 *
 * @param {React.ReactNode} children - The content to be wrapped inside the card.
 */
export default function Card({ children }: { children?: React.ReactNode }) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white w-full">
      {children}
    </div>
  );
}
