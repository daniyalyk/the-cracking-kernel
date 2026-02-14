"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Reservation() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Content reveal
      if (contentRef.current) {
        const children = contentRef.current.querySelectorAll(":scope > *");
        gsap.set(children, { y: 40, opacity: 0 });

        ScrollTrigger.create({
          trigger: contentRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(children, {
              y: 0,
              opacity: 1,
              stagger: 0.12,
              duration: 0.8,
              ease: "power3.out",
            });
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="visit"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-20"
        style={{
          backgroundImage:
            "url('/assets/images/app-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-primary/88" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div ref={contentRef} className="flex flex-col items-center">
          <span
            className="text-xs tracking-[0.3em] uppercase text-warm mb-6"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Visit Us
          </span>

          <h2
            className="text-3xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-6"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
          >
            Come Say
            <br />
            <span className="text-warm italic font-normal">Hello</span>
          </h2>

          <p className="text-white/45 text-[15px] leading-relaxed mb-4 max-w-md">
            1st Floor, 254, Sector G, Phase 5 D.H.A
            <br />
            Lahore, Pakistan
            <br />
            <span className="text-white/30">(Above Ferozsons Bookshop)</span>
          </p>

          <p className="text-white/35 text-sm mb-10">
            Open Daily &mdash; 12:00 PM to 12:00 AM
          </p>

          <MagneticButton
            href="https://www.thecrackingkernel.com/contact-us"
            className="bg-warm text-primary-dark px-12 py-4 text-[13px] tracking-[0.2em] uppercase font-medium hover:bg-warm-light transition-colors duration-500"
            strength={0.35}
          >
            Get Directions
          </MagneticButton>

          <div className="flex items-center gap-8 mt-12">
            <a
              href="https://www.instagram.com/thecrackingkernel/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 text-xs tracking-[0.15em] uppercase hover:text-warm transition-colors duration-300"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Instagram
            </a>
            <span className="text-white/15">|</span>
            <a
              href="https://www.thecrackingkernel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 text-xs tracking-[0.15em] uppercase hover:text-warm transition-colors duration-300"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Website
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
