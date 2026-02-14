"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const footer = footerRef.current;
      if (!footer) return;

      const cols = footer.querySelectorAll(".footer-col");
      const line = footer.querySelector(".footer-line");
      const bottom = footer.querySelector(".footer-bottom");

      gsap.set(cols, { y: 30, opacity: 0 });

      ScrollTrigger.create({
        trigger: footer,
        start: "top 90%",
        onEnter: () => {
          gsap.to(cols, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
          });

          if (line) {
            gsap.from(line, {
              scaleX: 0,
              transformOrigin: "left",
              duration: 1.2,
              delay: 0.3,
              ease: "power3.inOut",
            });
          }

          if (bottom) {
            gsap.from(bottom, {
              y: 20,
              opacity: 0,
              duration: 0.6,
              delay: 0.5,
              ease: "power3.out",
            });
          }
        },
        once: true,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-primary-dark py-16 md:py-20 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-14">
          {/* Brand */}
          <div className="footer-col md:col-span-1">
            <img
              src="/assets/images/logo.png"
              alt="The Cracking Kernel"
              className="h-14 w-auto mb-4 opacity-70"
            />
            <p className="text-white/30 text-sm leading-relaxed">
              Simply good food,
              <br />
              good people & good vibes.
            </p>
          </div>

          {/* Location */}
          <div className="footer-col">
            <h4
              className="text-white/50 text-xs tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Location
            </h4>
            <div className="space-y-1.5">
              <p className="text-white/30 text-sm">1st Floor, 254</p>
              <p className="text-white/30 text-sm">Sector G, Phase 5 D.H.A</p>
              <p className="text-white/30 text-sm">Lahore, Pakistan</p>
              <p className="text-white/20 text-xs mt-2">
                Above Ferozsons Bookshop
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="footer-col">
            <h4
              className="text-white/50 text-xs tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Hours
            </h4>
            <div className="space-y-1.5">
              <p className="text-white/30 text-sm">Open Daily</p>
              <p className="text-white/30 text-sm">12:00 PM &ndash; 12:00 AM</p>
            </div>
          </div>

          {/* Follow */}
          <div className="footer-col">
            <h4
              className="text-white/50 text-xs tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Connect
            </h4>
            <div className="space-y-1.5">
              <a
                href="https://www.instagram.com/thecrackingkernel/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/30 text-sm hover:text-warm transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href="https://www.foodpanda.pk/restaurant/zi7e/the-cracking-kernel-cafe-and-deli"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/30 text-sm hover:text-warm transition-colors duration-300"
              >
                Foodpanda
              </a>
              <a
                href="https://www.thecrackingkernel.com/contact-us"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/30 text-sm hover:text-warm transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="footer-line w-full h-px bg-white/8 mb-8" />

        <div className="footer-bottom flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs tracking-wider">
            &copy; 2026 The Cracking Kernel. All rights reserved.
          </p>
          <p className="text-white/20 text-xs tracking-wider">
            Cafe & Deli &mdash; DHA Phase 5, Lahore
          </p>
        </div>
      </div>
    </footer>
  );
}
