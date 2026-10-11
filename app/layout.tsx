import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ToasterProvider from "@/components/ToasterProvider";

// ============================================
// WEBSITE CONFIGURATION
// ============================================

const SITE_URL = "https://www.thecrackingkernel.com";
const SITE_NAME = "The Cracking Kernel";

const SITE_DESCRIPTION =
  "Discover The Cracking Kernel, a family-owned café & deli in DHA Phase 5, Lahore. Enjoy specialty coffee, comforting meals, brunch, and delicious desserts in a warm, welcoming atmosphere.";

// ============================================
// SEO METADATA
// ============================================

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // Page Titles
  title: {
    default: "The Cracking Kernel | Café & Deli in DHA Phase 5, Lahore",
    template: "%s | The Cracking Kernel",
  },

  // Meta Description
  description: SITE_DESCRIPTION,

  // Application Information
  applicationName: SITE_NAME,

  // Search Engine Crawling
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "The Cracking Kernel | Your Friendly Neighbourhood Café",
    description:
      "Simply good food, good people & good vibes. Discover specialty coffee, delicious comfort food, brunch, and desserts at The Cracking Kernel in DHA Phase 5, Lahore.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Cracking Kernel - Café & Deli in DHA Phase 5, Lahore",
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    title: "The Cracking Kernel | Café & Deli Lahore",
    description: SITE_DESCRIPTION,

    images: ["/og-image.jpg"],
  },

  // Other Metadata
  category: "food and drink",
};

// ============================================
// RESTAURANT STRUCTURED DATA (JSON-LD)
// ============================================

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",

  "@id": `${SITE_URL}/#restaurant`,

  name: "The Cracking Kernel",

  alternateName: "TCK",

  description: SITE_DESCRIPTION,

  url: SITE_URL,

  address: {
    "@type": "PostalAddress",
    streetAddress:
      "1st Floor, 254, Sector G, DHA Phase 5, Above Ferozsons Bookshop",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },

  servesCuisine: [
    "Cafe",
    "Comfort Food",
    "Coffee",
    "Brunch",
    "Desserts",
    "Continental",
  ],

  acceptsReservations: true,

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",

      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],

      opens: "12:00",
      closes: "00:00",
    },
  ],

  hasMenu: {
    "@type": "Menu",
    name: "The Cracking Kernel Menu",
    url: SITE_URL,
  },

  sameAs: [
    "https://www.instagram.com/thecrackingkernel/",
  ],

  currenciesAccepted: "PKR",

  areaServed: {
    "@type": "Place",
    name: "DHA Lahore",
  },
};

// ============================================
// ROOT LAYOUT
// ============================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        {/* Restaurant Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantSchema).replace(/</g, "\\u003c"),
          }}
        />

        {/* Google Analytics */}
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
                __html: `
                  window.dataLayer = window.dataLayer || [];

                  function gtag(){
                    dataLayer.push(arguments);
                  }

                  gtag('js', new Date());

                  gtag('config', '${GA_ID}');
                `,
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