"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import { staggerContainer, EASE_OUT } from "@/animations";

const contentChildVariants = {
  hidden:  { y: 40, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

const bottomLinks = [
  {
    label: "Foodpanda",
    href: "https://www.foodpanda.pk/restaurant/zi7e/the-cracking-kernel-cafe-and-deli?utm_campaign=google_reserve_place_order_action_CH-SEO_",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/thecrackingkernel/",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/923000537635",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  // {
  //   label: "Google Maps",
  //   href: "https://maps.app.goo.gl/6fCHSTNum4hp2TGKA",
  //   icon: (
  //     <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
  //       <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  //     </svg>
  //   ),
  // },
];

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
      className="relative overflow-hidden"
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
      <div className="absolute inset-0 bg-primary/95" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-32 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — text */}
          <motion.div
            className="flex flex-col items-start"
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.span
              variants={contentChildVariants}
              className="text-xs tracking-[0.3em] uppercase text-warm mb-6"
              style={{ fontFamily: "Whyte, sans-serif" }}
            >
              Visit Us
            </motion.span>

            <motion.h2
              variants={contentChildVariants}
              className="text-3xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-6"
            >
              Come Say<br />
              <span className="text-warm italic font-normal">Hello</span>
            </motion.h2>

            <motion.p variants={contentChildVariants} className="text-white/45 text-[15px] leading-relaxed mb-2">
              1st Floor, 254, Sector G, Phase 5 D.H.A<br />
              Lahore, Pakistan
            </motion.p>
            <motion.p variants={contentChildVariants} className="text-white/25 text-sm mb-2">
              Above Ferozsons Bookshop
            </motion.p>

            <motion.p variants={contentChildVariants} className="text-white/35 text-sm mb-10">
              Open Daily &mdash; 12:00 PM to 12:00 AM
            </motion.p>

            <motion.div variants={contentChildVariants}>
              <MagneticButton
                href="https://maps.app.goo.gl/6fCHSTNum4hp2TGKA"
                className="bg-warm text-primary-dark px-12 py-4 text-[13px] tracking-[0.2em] uppercase font-medium hover:bg-warm-light transition-colors duration-500"
                strength={0.35}
              >
                Get Directions
              </MagneticButton>
            </motion.div>

            {/* Bottom links */}
            <motion.div variants={contentChildVariants} className="flex items-center gap-5 mt-12 flex-wrap">
              {bottomLinks.map((link, i) => (
                <span key={link.label} className="flex items-center gap-5">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white/30 text-xs tracking-[0.15em] uppercase hover:text-warm transition-colors duration-300"
                    style={{ fontFamily: "Whyte, sans-serif" }}
                  >
                    <span className="opacity-60">{link.icon}</span>
                    {link.label}
                  </a>
                  {i < bottomLinks.length - 1 && (
                    <span className="text-white/15 text-xs">|</span>
                  )}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.2 }}
            className="w-full h-[360px] md:h-[440px] overflow-hidden border border-white/10"
          >
            <iframe
              title="The Cracking Kernel location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13607.87!2d74.4035844!3d31.4698444!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190776c747937d%3A0x4e6dfa5328f28a58!2sThe%20Cracking%20Kernel%20-%20Caf%C3%A9%20%26%20Deli!5e0!3m2!1sen!2s!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(0.85) hue-rotate(180deg) saturate(0.6)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
