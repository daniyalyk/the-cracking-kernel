"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function createScrollTimeline(
  trigger: HTMLElement,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    anticipatePin?: number;
    onEnter?: () => void;
  } = {}
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: options.start || "top 80%",
      end: options.end || "bottom 20%",
      scrub: options.scrub ?? false,
      pin: options.pin || false,
      anticipatePin: options.anticipatePin || 0,
      ...( options.onEnter ? { onEnter: options.onEnter } : {} ),
    },
  });
  return tl;
}

export function fadeInUp(
  elements: gsap.TweenTarget,
  options: {
    y?: number;
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
  } = {}
) {
  return gsap.from(elements, {
    y: options.y || 60,
    opacity: 0,
    duration: options.duration || 1,
    stagger: options.stagger || 0,
    delay: options.delay || 0,
    ease: options.ease || "power3.out",
  });
}

export function scaleIn(
  elements: gsap.TweenTarget,
  options: {
    scale?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  } = {}
) {
  return gsap.from(elements, {
    scale: options.scale || 0.8,
    opacity: 0,
    duration: options.duration || 1,
    delay: options.delay || 0,
    ease: options.ease || "power3.out",
  });
}

export function horizontalScroll(
  container: HTMLElement,
  scrollContainer: HTMLElement
) {
  const totalWidth = scrollContainer.scrollWidth - container.offsetWidth;

  return gsap.to(scrollContainer, {
    x: -totalWidth,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${totalWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
}

export function maskReveal(
  element: gsap.TweenTarget,
  options: {
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
    delay?: number;
    ease?: string;
  } = {}
) {
  const { direction = "up", duration = 1.2, delay = 0, ease = "power3.inOut" } = options;

  const clipPaths: Record<string, { from: string; to: string }> = {
    up: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
    down: { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" },
    left: { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
    right: { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },
  };

  gsap.set(element, { clipPath: clipPaths[direction].from });

  return gsap.to(element, {
    clipPath: clipPaths[direction].to,
    duration,
    delay,
    ease,
  });
}

export { gsap, ScrollTrigger };
