import type { Metadata } from "next";
import "./globals.css";
import ToasterProvider from "@/components/ToasterProvider";

export const metadata: Metadata = {
  title: "The Cracking Kernel | Cafe & Deli | DHA Phase 5 Lahore",
  description:
    "A family-owned Cafe & Deli in DHA Phase 5 Lahore. Simply good food, good people & good vibes. Comfort food championing fresh and high-quality ingredients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
