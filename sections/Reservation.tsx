"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import { staggerContainer, EASE_OUT } from "@/animations";

const contentChildVariants = {
  hidden:  { y: 40, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

export default function Reservation() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={sectionRef}
      id="visit"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 -top-20"
        style={{
          y: bgY,
          backgroundImage: "url('/assets/images/app-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-primary/88" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          className="flex flex-col items-center"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.span
            variants={contentChildVariants}
            className="text-xs tracking-[0.3em] uppercase text-warm mb-6"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Visit Us
          </motion.span>

          <motion.h2
            variants={contentChildVariants}
            className="text-3xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-6"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
          >
            Come Say<br />
            <span className="text-warm italic font-normal">Hello</span>
          </motion.h2>

          <motion.p variants={contentChildVariants} className="text-white/45 text-[15px] leading-relaxed mb-4 max-w-md">
            1st Floor, 254, Sector G, Phase 5 D.H.A<br />
            Lahore, Pakistan<br />
            <span className="text-white/30">(Above Ferozsons Bookshop)</span>
          </motion.p>

          <motion.p variants={contentChildVariants} className="text-white/35 text-sm mb-10">
            Open Daily &mdash; 12:00 PM to 12:00 AM
          </motion.p>

          <motion.div variants={contentChildVariants}>
            <MagneticButton
              href="https://www.thecrackingkernel.com/contact-us"
              className="bg-warm text-primary-dark px-12 py-4 text-[13px] tracking-[0.2em] uppercase font-medium hover:bg-warm-light transition-colors duration-500"
              strength={0.35}
            >
              Get Directions
            </MagneticButton>
          </motion.div>

          <motion.div variants={contentChildVariants} className="flex items-center gap-8 mt-12">
            <a href="https://www.instagram.com/thecrackingkernel/" target="_blank" rel="noopener noreferrer"
              className="text-white/30 text-xs tracking-[0.15em] uppercase hover:text-warm transition-colors duration-300"
              style={{ fontFamily: "Syne, sans-serif" }}
            >Instagram</a>
            <span className="text-white/15">|</span>
            <a href="https://www.thecrackingkernel.com/" target="_blank" rel="noopener noreferrer"
              className="text-white/30 text-xs tracking-[0.15em] uppercase hover:text-warm transition-colors duration-300"
              style={{ fontFamily: "Syne, sans-serif" }}
            >Website</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
