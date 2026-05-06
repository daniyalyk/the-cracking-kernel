"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  strength?: number;
  onClick?: () => void;
}

const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
const innerSpringConfig = { stiffness: 200, damping: 20, mass: 0.5 };

export default function MagneticButton({
  children,
  className = "",
  href,
  strength = 0.3,
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  const outerX = useMotionValue(0);
  const outerY = useMotionValue(0);
  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);

  const springOuterX = useSpring(outerX, springConfig);
  const springOuterY = useSpring(outerY, springConfig);
  const springInnerX = useSpring(innerX, innerSpringConfig);
  const springInnerY = useSpring(innerY, innerSpringConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    outerX.set(dx * strength);
    outerY.set(dy * strength);
    innerX.set(dx * strength * 0.5);
    innerY.set(dy * strength * 0.5);
  };

  const handleMouseLeave = () => {
    outerX.set(0);
    outerY.set(0);
    innerX.set(0);
    innerY.set(0);
  };

  const inner = (
    <motion.div
      style={{ x: springInnerX, y: springInnerY }}
      className={`glow-effect inline-flex items-center justify-center cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );

  return (
    <motion.div
      ref={buttonRef}
      className="magnetic-wrap"
      style={{ x: springOuterX, y: springOuterY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {href ? <a href={href} onClick={onClick}>{inner}</a> : <div onClick={onClick}>{inner}</div>}
    </motion.div>
  );
}
