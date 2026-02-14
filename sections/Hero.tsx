"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollIndicator from "@/components/ScrollIndicator";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set(logoRef.current, { y: 80, opacity: 0, scale: 0.9 });
      gsap.set(headingRef.current, { y: 60, opacity: 0 });
      gsap.set(taglineRef.current, { y: 30, opacity: 0 });
      gsap.set(ctaRef.current, { y: 30, opacity: 0, scale: 0.95 });
      gsap.set(overlayRef.current, { opacity: 1 });

      // Background overlay fade
      tl.to(overlayRef.current, {
        opacity: 0.6,
        duration: 1.5,
        ease: "power2.out",
      });

      // Logo reveal
      tl.to(
        logoRef.current,
        { y: 0, opacity: 1, scale: 1, duration: 1.2 },
        0.3
      );

      // Heading
      tl.to(
        headingRef.current,
        { y: 0, opacity: 1, duration: 1.2 },
        0.6
      );

      // Tagline
      tl.to(
        taglineRef.current,
        { y: 0, opacity: 1, duration: 1 },
        0.9
      );

      // CTA
      tl.to(
        ctaRef.current,
        { y: 0, opacity: 1, scale: 1, duration: 0.8 },
        1.1
      );

      // Parallax on scroll
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: 200,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/assets/images/door-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scale(1.05)",
        }}
      />

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-primary-dark/70"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="overflow-hidden mb-4" ref={logoRef}>
          <img
            src="/assets/images/logo.png"
            alt="The Cracking Kernel"
            className="w-48 md:w-64 lg:w-72 h-auto mx-auto"
          />
        </div>

        {/* Heading */}
        <div className="overflow-hidden mb-6" ref={headingRef}>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[0.02em] leading-[1.1]"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Cafe & Deli
          </h1>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-white/50 text-sm md:text-base tracking-[0.25em] uppercase mb-10"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Simply Good Food, Good People & Good Vibes
        </p>

        {/* CTA */}
        <div ref={ctaRef}>
          <MagneticButton
            href="#menu"
            className="border border-warm/50 text-warm px-10 py-4 text-[13px] tracking-[0.2em] uppercase hover:bg-warm hover:text-primary-dark transition-colors duration-500"
            strength={0.35}
          >
            Explore Our Menu
          </MagneticButton>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
