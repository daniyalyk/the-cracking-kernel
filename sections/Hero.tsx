"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/animations";

export default function Hero() {
  // Dispatch heroVideoReady so Navbar slides in once the main elements are visible
  useEffect(() => {
    const id = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("heroVideoReady"));
    }, 1400);
    return () => clearTimeout(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-primary flex items-center"
    >
      {/* ── Background illustration ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.img
          src="/assets/images/hero-illustration.png"
          alt=""
          aria-hidden
          className="h-[105%] w-auto max-w-none select-none pointer-events-none"
          style={{
            filter:
              "drop-shadow(0 32px 80px rgba(200,169,126,0.18)) drop-shadow(0 8px 24px rgba(0,0,0,0.55))",
          }}
          draggable={false}
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [0, -14, 0] }}
          transition={{
            scale:   { duration: 1.8, delay: 0.2, ease: EASE_OUT },
            opacity: { duration: 1.8, delay: 0.2, ease: EASE_OUT },
            y:       { duration: 4.2, delay: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
          }}
        />
      </div>

      {/* Left-to-right readability gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #1A312D 28%, rgba(26,49,45,0.82) 46%, rgba(26,49,45,0.35) 65%, transparent 82%)",
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, #1A312D, transparent)" }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Text content ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-xl">

          {/* Headline — each word in an overflow-hidden clip row */}
          <div className="space-y-0 mb-8 md:mb-10">
            {(["The", "Cracking", "Kernel"] as const).map((word, i) => (
              <div key={word} className="w-full">
                <motion.h1
                  className={`block leading-[0.92] ${
                    i === 2 ? "text-warm italic font-light" : "text-white font-extrabold"
                  }`}
                  style={{ fontSize: "clamp(3.2rem, 7.5vw, 6.5rem)" }}
                  initial={{ y: 90, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.0, delay: 0.8 + i * 0.1, ease: EASE_OUT }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            className="text-white/50 text-[13.5px] leading-[1.85] max-w-[320px] mb-6"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE_OUT }}
          >
            Your Friendly Neighbourhood Café & Deli
          </motion.p>

          {/* Our Story label + paragraph */}
          <motion.div
            className="mb-10 md:mb-12"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.28, ease: EASE_OUT }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-white/30" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-white/40" style={{ fontFamily: "Whyte, sans-serif" }}>
                Our Story
              </span>
              <div className="w-10 h-px bg-white/30" />
            </div>
            <p className="text-white/40 text-[13px] leading-[1.9] max-w-[340px]">
              Our <span className="text-warm/80">journey</span> began with a simple <span className="text-warm/80">dream</span> — to create a <span className="text-warm/80">space</span> where <span className="text-warm/80">warmth</span>, <span className="text-warm/80">community</span>, and exceptional <span className="text-warm/80">flavours</span> intertwine. This is more than just a business — it&apos;s a <span className="text-warm/80">labor of love</span>, a testament to the <span className="text-warm/80">power of family</span>, and a <span className="text-warm/80">beacon of warmth</span> for all who enter.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex items-center gap-7"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.35, ease: EASE_OUT }}
          >
            <button
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3.5 bg-warm text-primary text-[11px] tracking-[0.22em] uppercase font-bold hover:bg-warm-light transition-colors duration-300 cursor-pointer"
              style={{ fontFamily: "Whyte, sans-serif" }}
            >
              View Menu
            </button>
            <button
              onClick={() => document.getElementById("visit")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2.5 text-white/55 text-[11px] tracking-[0.22em] uppercase hover:text-white transition-colors duration-300 cursor-pointer"
              style={{ fontFamily: "Whyte, sans-serif" }}
            >
              Visit Us
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="text-warm">
                <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Left vertical decoration */}
      <motion.div
        className="hidden lg:flex absolute left-6 xl:left-10 bottom-10 flex-col items-center gap-3 pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.5 }}
      >
        <div className="w-px h-14 bg-gradient-to-b from-white/20 to-transparent" />
        <span
          className="text-white/20 text-[9px] tracking-[0.45em] uppercase"
          style={{ fontFamily: "Whyte, sans-serif", writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Est. 2024
        </span>
      </motion.div>

      {/* Bottom scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.6 }}
      >
        <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase" style={{ fontFamily: "Whyte, sans-serif" }}>
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
