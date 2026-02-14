"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal<T extends HTMLElement>(
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    start?: string;
  } = {}
) {
  const ref = useRef<T>(null);
  const {
    y = 60,
    opacity = 0,
    duration = 1,
    delay = 0,
    ease = "power3.out",
    start = "top 85%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { y, opacity });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => {
        gsap.to(el, { y: 0, opacity: 1, duration, delay, ease });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [y, opacity, duration, delay, ease, start]);

  return ref;
}

export function useStaggerReveal<T extends HTMLElement>(
  options: {
    y?: number;
    stagger?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    start?: string;
    childSelector?: string;
  } = {}
) {
  const ref = useRef<T>(null);
  const {
    y = 50,
    stagger = 0.1,
    duration = 0.8,
    delay = 0,
    ease = "power3.out",
    start = "top 85%",
    childSelector = ":scope > *",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll(childSelector);
    gsap.set(children, { y, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => {
        gsap.to(children, {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease,
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [y, stagger, duration, delay, ease, start, childSelector]);

  return ref;
}

export function useParallax<T extends HTMLElement>(
  speed: number = 0.5,
  direction: "y" | "x" = "y"
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const movement = speed * 100;

    gsap.to(el, {
      [direction]: -movement,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [speed, direction]);

  return ref;
}

export function useMagneticHover<T extends HTMLElement>(strength: number = 0.3) {
  const ref = useRef<T>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}

export function useSplitTextReveal<T extends HTMLElement>(
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
    start?: string;
    y?: number;
  } = {}
) {
  const ref = useRef<T>(null);
  const {
    duration = 1,
    stagger = 0.05,
    delay = 0,
    ease = "power4.out",
    start = "top 85%",
    y = 100,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent || "";
    const words = text.split(" ");

    el.innerHTML = words
      .map(
        (word) =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:4px"><span class="split-word" style="display:inline-block;transform:translateY(${y}px)">${word}</span></span>`
      )
      .join(
        '<span style="display:inline-block;width:0.3em"></span>'
      );

    const wordSpans = el.querySelectorAll(".split-word");

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => {
        gsap.to(wordSpans, {
          y: 0,
          duration,
          stagger,
          delay,
          ease,
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
      el.textContent = text;
    };
  }, [duration, stagger, delay, ease, start, y]);

  return ref;
}

export function useLineReveal<T extends HTMLElement>(
  options: {
    duration?: number;
    delay?: number;
    ease?: string;
    start?: string;
  } = {}
) {
  const ref = useRef<T>(null);
  const {
    duration = 1.2,
    delay = 0,
    ease = "power3.inOut",
    start = "top 85%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { scaleX: 0, transformOrigin: "left" });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => {
        gsap.to(el, { scaleX: 1, duration, delay, ease });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [duration, delay, ease, start]);

  return ref;
}

export function useImageReveal<T extends HTMLElement>(
  options: {
    duration?: number;
    delay?: number;
    scale?: number;
    ease?: string;
    start?: string;
  } = {}
) {
  const ref = useRef<T>(null);
  const {
    duration = 1.4,
    delay = 0,
    scale = 1.3,
    ease = "power3.out",
    start = "top 80%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const img = el.querySelector("img") || el;

    gsap.set(el, { clipPath: "inset(100% 0 0 0)" });
    gsap.set(img, { scale });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(el, {
          clipPath: "inset(0% 0 0 0)",
          duration,
          delay,
          ease,
        }).to(
          img,
          {
            scale: 1,
            duration: duration * 1.2,
            ease: "power2.out",
          },
          "<"
        );
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [duration, delay, scale, ease, start]);

  return ref;
}

export { gsap, ScrollTrigger };
