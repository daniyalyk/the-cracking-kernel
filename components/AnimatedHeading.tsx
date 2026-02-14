"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedHeadingProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  delay?: number;
  scrollTrigger?: boolean;
  splitBy?: "words" | "chars";
}

export default function AnimatedHeading({
  text,
  tag: Tag = "h2",
  className = "",
  delay = 0,
  scrollTrigger = true,
  splitBy = "words",
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const units =
      splitBy === "words" ? text.split(" ") : text.split("");

    el.innerHTML = units
      .map((unit) => {
        const display = unit === " " ? "&nbsp;" : unit;
        return `<span style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:6px"><span class="anim-unit" style="display:inline-block;transform:translateY(110%)">${display}</span></span>`;
      })
      .join(
        splitBy === "words"
          ? '<span style="display:inline-block;width:0.3em"></span>'
          : ""
      );

    const animUnits = el.querySelectorAll(".anim-unit");

    if (scrollTrigger) {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => {
          gsap.to(animUnits, {
            y: "0%",
            duration: 1,
            stagger: splitBy === "chars" ? 0.02 : 0.06,
            delay,
            ease: "power4.out",
          });
        },
        once: true,
      });
    } else {
      gsap.to(animUnits, {
        y: "0%",
        duration: 1,
        stagger: splitBy === "chars" ? 0.02 : 0.06,
        delay,
        ease: "power4.out",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [text, delay, scrollTrigger, splitBy]);

  return <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>{text}</Tag>;
}
