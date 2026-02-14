"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 20 });

    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 2.5,
      ease: "power3.out",
    });

    // Bounce animation
    gsap.to(el.querySelector(".scroll-dot"), {
      y: 8,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Hide on scroll
    const handleScroll = () => {
      if (window.scrollY > 200) {
        gsap.to(el, { opacity: 0, duration: 0.3 });
      } else {
        gsap.to(el, { opacity: 1, duration: 0.3 });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
      <span className="text-white/50 text-xs tracking-[0.3em] uppercase">
        Scroll
      </span>
      <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden rounded-full">
        <div className="scroll-dot w-[3px] h-[3px] bg-warm rounded-full absolute -left-[1px] top-0" />
      </div>
    </div>
  );
}
