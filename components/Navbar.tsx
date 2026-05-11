"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import CartIcon from "./CartIcon";
import Cart from "./Cart";
import { EASE_OUT, EASE_INOUT } from "@/animations";

const isOnlinePayment = process.env.NEXT_PUBLIC_ONLINE_PAYMENT === "true";

const linkVariants = {
  closed: { y: 50, opacity: 0 },
  open:   { y: 0,  opacity: 1 },
};

export default function Navbar() {
  const [visible,    setVisible]    = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [isOpen,     setIsOpen]     = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { scrollY } = useScroll();

  // Desktop only: reveal after hero animation
  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener("heroVideoReady", handler);
    return () => window.removeEventListener("heroVideoReady", handler);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { label: "About",    target: "about"   },
    { label: "Menu",     target: "menu"    },
    { label: "Gallery",  target: "gallery" },
    { label: "Visit Us", target: "visit"   },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navInner = (
    <>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img
          src="/assets/images/logo-white.webp"
          alt="The Cracking Kernel"
          className="h-10 md:h-12 w-auto"
        />
      </button>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => scrollTo(link.target)}
            className="text-white/70 text-[13px] tracking-[0.15em] uppercase hover:text-white transition-colors duration-300 relative group cursor-pointer"
            style={{ fontFamily: "Whyte, sans-serif" }}
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-warm group-hover:w-full transition-all duration-300" />
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {isOnlinePayment && <CartIcon onClick={() => setIsCartOpen(true)} />}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-[5px] z-50 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-6 h-[1.5px] bg-white"
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 3.25 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-[1.5px] bg-white"
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -3.25 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile — static, in normal document flow, always green */}
      <nav className="md:hidden w-full bg-primary px-6 py-4 flex items-center justify-between">
        {navInner}
      </nav>

      {/* Desktop — fixed, animated slide-in */}
      <motion.nav
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 px-12 lg:px-16 py-4 items-center justify-between border-b transition-[backdrop-filter] duration-300 ${
          scrolled ? "backdrop-blur-xl" : ""
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={
          visible
            ? {
                y: 0,
                opacity: 1,
                backgroundColor: scrolled ? "rgba(26, 49, 45, 0.97)" : "rgba(26, 49, 45, 0)",
                borderColor:     scrolled ? "rgba(255,255,255,0.06)"  : "rgba(255,255,255,0)",
              }
            : { y: -100, opacity: 0 }
        }
        transition={{
          y:               { duration: visible ? 2 : 0.3, ease: EASE_OUT },
          opacity:         { duration: visible ? 2 : 0.3, ease: EASE_OUT },
          backgroundColor: { duration: 0.3 },
          borderColor:     { duration: 0.3 },
        }}
      >
        {navInner}
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-primary flex flex-col items-center justify-center gap-10 md:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{    clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.5, ease: EASE_INOUT }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                variants={linkVariants}
                initial="closed"
                animate="open"
                transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: EASE_OUT }}
                onClick={() => { setIsOpen(false); scrollTo(link.target); }}
                className="text-white text-3xl font-light tracking-[0.15em] uppercase hover:text-warm transition-colors duration-300 cursor-pointer"
                style={{ fontFamily: "Whyte, sans-serif" }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isOnlinePayment && (
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </>
  );
}
