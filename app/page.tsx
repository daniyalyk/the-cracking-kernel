"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import CoffeeShowcase from "@/sections/CoffeeShowcase";
import Menu from "@/sections/Menu";
import Gallery from "@/sections/Gallery";
import Testimonials from "@/sections/Testimonials";
import Reservation from "@/sections/Reservation";
import Footer from "@/sections/Footer";

// Disable browser scroll restoration so the browser doesn't re-scroll
// to a previous position after hydration.
if (typeof window !== "undefined") {
  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
}

export default function Home() {
  return (
    <main className="grain-overlay">
      <Navbar />
      <Hero />
      <About />
      {/* <CoffeeShowcase /> */}
      <Menu />
      <Gallery />
      <Testimonials />
      <Reservation />
      <Footer />
    </main>
  );
}
