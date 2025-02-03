"use client";

import React from "react";

interface CardProps {
  children?: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white w-full">
      {children}
    </div>
  );
}
