"use client";

import React from "react";

interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function Card({ title, description, children }: CardProps) {
  return (
    <div
      aria-labelledby={`card-title-${title}`}
      className="border rounded-lg p-4 shadow-md bg-white max-w-md">
      {children}
    </div>
  );
}
