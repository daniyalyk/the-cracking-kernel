"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, lineReveal, VIEWPORT, EASE_OUT } from "@/animations";

const colVariants = {
  hidden:  { y: 30, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

export default function Footer() {
  return (
    <footer className="bg-primary-dark py-16 md:py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* Columns */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-14"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {/* Brand */}
          <motion.div variants={colVariants} className="md:col-span-1">
            <img src="/assets/images/logo-white.webp" alt="The Cracking Kernel" className="h-14 w-auto mb-4 opacity-70" />
            <p className="text-white/30 text-sm leading-relaxed">
              Simply good food,<br />good people & good vibes.
            </p>
          </motion.div>

          {/* Location */}
          <motion.div variants={colVariants}>
            <h4 className="text-white/50 text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Location</h4>
            <div className="space-y-1.5">
              <p className="text-white/30 text-sm">1st Floor, 254</p>
              <p className="text-white/30 text-sm">Sector G, Phase 5 D.H.A</p>
              <p className="text-white/30 text-sm">Lahore, Pakistan</p>
              <p className="text-white/20 text-xs mt-2">Above Ferozsons Bookshop</p>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div variants={colVariants}>
            <h4 className="text-white/50 text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Hours</h4>
            <div className="space-y-1.5">
              <p className="text-white/30 text-sm">Open Daily</p>
              <p className="text-white/30 text-sm">12:00 PM &ndash; 12:00 AM</p>
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div variants={colVariants}>
            <h4 className="text-white/50 text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Connect</h4>
            <div className="space-y-1.5">
              <a href="https://www.instagram.com/thecrackingkernel/" target="_blank" rel="noopener noreferrer" className="block text-white/30 text-sm hover:text-warm transition-colors duration-300">Instagram</a>
              <a href="https://www.foodpanda.pk/restaurant/zi7e/the-cracking-kernel-cafe-and-deli" target="_blank" rel="noopener noreferrer" className="block text-white/30 text-sm hover:text-warm transition-colors duration-300">Foodpanda</a>
              <a href="https://www.thecrackingkernel.com/contact-us" target="_blank" rel="noopener noreferrer" className="block text-white/30 text-sm hover:text-warm transition-colors duration-300">Contact Us</a>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider line */}
        <motion.div
          className="w-full h-px bg-white/8 mb-8 origin-left"
          variants={lineReveal}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        />

        {/* Bottom */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <p className="text-white/20 text-xs tracking-wider">&copy; 2026 The Cracking Kernel. All rights reserved.</p>
          <p className="text-white/20 text-xs tracking-wider">Cafe & Deli &mdash; DHA Phase 5, Lahore</p>
        </motion.div>

      </div>
    </footer>
  );
}
