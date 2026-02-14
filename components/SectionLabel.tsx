"use client";

import { useScrollReveal } from "@/hooks/useGSAP";

interface SectionLabelProps {
  text: string;
  className?: string;
  light?: boolean;
}

export default function SectionLabel({ text, className = "", light = false }: SectionLabelProps) {
  const ref = useScrollReveal<HTMLDivElement>({ y: 20, duration: 0.8 });

  return (
    <div ref={ref} className={`flex items-center gap-4 ${className}`}>
      <div className={`w-8 h-px ${light ? "bg-white/40" : "bg-primary/30"}`} />
      <span
        className={`text-xs tracking-[0.3em] uppercase ${
          light ? "text-white/60" : "text-text-secondary"
        }`}
      >
        {text}
      </span>
    </div>
  );
}
