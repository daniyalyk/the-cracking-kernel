import type { Variants } from "framer-motion";

// ── Shared easing curves ────────────────────────────────────────────────────
export const EASE_OUT   = [0.16, 1, 0.3, 1]    as const; // power3.out equivalent
export const EASE_INOUT = [0.76, 0, 0.24, 1]   as const; // power3.inOut equivalent
export const EASE_BACK  = [0.34, 1.56, 0.64, 1] as const; // back.out(1.4) equivalent

// ── Shared viewport config ───────────────────────────────────────────────────
export const VIEWPORT = { once: true, amount: 0.15 } as const;

// ── Reusable variants ────────────────────────────────────────────────────────

export const fadeInUp: Variants = {
  hidden:  { y: 40, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden:  { scale: 0.85, opacity: 0 },
  visible: { scale: 1,    opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

/** Word/line slide-up from overflow-hidden container */
export const slideUpReveal: Variants = {
  hidden:  { y: "110%" },
  visible: { y: "0%",   transition: { duration: 1, ease: EASE_OUT } },
};

/** Clip-path reveal from bottom */
export const maskReveal: Variants = {
  hidden:  { clipPath: "inset(0 0 100% 0)", scale: 1.1 },
  visible: { clipPath: "inset(0 0 0% 0)",   scale: 1,
    transition: { duration: 0.8, ease: EASE_INOUT } },
};

/** Horizontal line draw from left */
export const lineReveal: Variants = {
  hidden:  { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: EASE_INOUT } },
};

/** Stagger container — call as a function so children share timing */
export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren   = 0,
): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren, delayChildren } },
});
