"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import CoffeeShowcase from "@/sections/CoffeeShowcase";
import Menu from "@/sections/Menu";
import Gallery from "@/sections/Gallery";
import Testimonials from "@/sections/Testimonials";
import Reservation from "@/sections/Reservation";
import Footer from "@/sections/Footer";

gsap.registerPlugin(ScrollTrigger);

// Disable browser scroll restoration as early as possible so the browser
// doesn't re-scroll to the previous position after hydration.
if (typeof window !== "undefined") {
  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
}

export default function Home() {
  useEffect(() => {
    // Strip any leftover hash and ensure we're at the top
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);

    // Refresh ScrollTrigger after all content is loaded
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

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
