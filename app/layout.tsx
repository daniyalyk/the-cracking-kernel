import type { Metadata } from "next";
import Script from "next/script";
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
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en">
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="antialiased">
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
