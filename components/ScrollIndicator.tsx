"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/animations";

export default function ScrollIndicator() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: hidden ? 0 : 1, y: 0 }}
      transition={{ duration: hidden ? 0.3 : 1, delay: hidden ? 0 : 2.5, ease: EASE_OUT }}
    >
      <span className="text-white/50 text-xs tracking-[0.3em] uppercase">Scroll</span>
      <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden rounded-full">
        <motion.div
          className="w-[3px] h-[3px] bg-warm rounded-full absolute -left-[1px] top-0"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
