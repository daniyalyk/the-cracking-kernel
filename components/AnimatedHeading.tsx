"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/animations";

interface AnimatedHeadingProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  delay?: number;
  scrollTrigger?: boolean;
  splitBy?: "words" | "chars";
}

const containerVariants = (stagger: number) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

const unitVariants = (delay: number) => ({
  hidden:  { y: "110%" as const },
  visible: { y: "0%"  as const, transition: { duration: 1, ease: EASE_OUT, delay } },
});

export default function AnimatedHeading({
  text,
  tag: Tag = "h2",
  className = "",
  delay = 0,
  scrollTrigger = true,
  splitBy = "words",
}: AnimatedHeadingProps) {
  const units  = splitBy === "words" ? text.split(" ") : text.split("");
  const stagger = splitBy === "chars" ? 0.02 : 0.06;

  const triggerProps = scrollTrigger
    ? { whileInView: "visible" as const, viewport: { once: true, amount: 0.5 } }
    : { animate: "visible" as const };

  return (
    <Tag className={className}>
      <motion.span
        variants={containerVariants(stagger)}
        initial="hidden"
        {...triggerProps}
        style={{ display: "inline" }}
      >
        {units.map((unit, i) => (
          <span key={i} style={{ display: "inline-block" }}>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "top",
                paddingBottom: "6px",
              }}
            >
              <motion.span
                variants={unitVariants(delay)}
                style={{ display: "inline-block" }}
              >
                {unit === " " ? "\u00A0" : unit}
              </motion.span>
            </span>
            {splitBy === "words" && i < units.length - 1 && (
              <span style={{ display: "inline-block", width: "0.3em" }} />
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
