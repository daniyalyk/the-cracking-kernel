"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#1A312D",
          color: "#FFFFFF",
          borderRadius: "8px",
          padding: "16px",
          fontSize: "14px",
        },
        success: {
          duration: 3000,
          style: {
            background: "#10b981",
          },
        },
        error: {
          duration: 4000,
          style: {
            background: "#ef4444",
          },
        },
      }}
    />
  );
}
