"use client";

import { motion } from "framer-motion";
import { fadeInUp, VIEWPORT } from "@/animations";

interface SectionLabelProps {
  text: string;
  className?: string;
  light?: boolean;
}

export default function SectionLabel({ text, className = "", light = false }: SectionLabelProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={`flex items-center gap-4 ${className}`}
    >
      <div className={`w-8 h-px ${light ? "bg-white/40" : "bg-primary/30"}`} />
      <span
        className={`text-xs tracking-[0.3em] uppercase ${
          light ? "text-white/60" : "text-text-secondary"
        }`}
      >
        {text}
      </span>
    </motion.div>
  );
}
