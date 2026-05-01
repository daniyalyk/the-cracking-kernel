"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Lock scroll while the intro plays
    document.body.style.overflow = "hidden";

    // Ensure muted is set as a property (iOS requires this)
    videoEl.muted = true;

    let navbarTriggered = false;
    const LOOP_START = 6;

    const triggerNavbar = () => {
      if (!navbarTriggered) {
        navbarTriggered = true;
        window.dispatchEvent(new CustomEvent("heroVideoReady"));
      }
    };

    // Skip the intro gracefully — unlock scroll, show navbar, show first frame
    const skipIntro = () => {
      document.body.style.overflow = "";
      triggerNavbar();
    };

    const onTimeUpdate = () => {
      if (!navbarTriggered && videoEl.currentTime >= 6) {
        triggerNavbar();
      }
    };

    // Yo-yo loop: chain seeks via the "seeked" event so each frame
    // actually decodes and renders before we move to the next one.
    const STEP = 1 / 30;
    let direction = -1;
    let yoyoTime = 0;
    let yoyoActive = false;

    const onSeeked = () => {
      if (!yoyoActive) return;
      yoyoTime += direction * STEP;
      if (yoyoTime <= LOOP_START) {
        yoyoTime = LOOP_START;
        direction = 1;
      } else if (yoyoTime >= videoEl.duration) {
        yoyoTime = videoEl.duration;
        direction = -1;
      }
      videoEl.currentTime = yoyoTime;
    };

    const onEnded = () => {
      document.body.style.overflow = "";

      videoEl.pause();
      yoyoActive = true;
      yoyoTime = videoEl.duration;
      direction = -1;
      videoEl.addEventListener("seeked", onSeeked);
      videoEl.currentTime = yoyoTime - STEP;
    };

    videoEl.addEventListener("timeupdate", onTimeUpdate);
    videoEl.addEventListener("ended", onEnded);

    // Attempt autoplay — if blocked, skip intro silently (no play button)
    const attemptPlay = () => {
      const p = videoEl.play();
      if (p !== undefined) {
        p.catch(() => {
          // Retry once after video data is ready
          const retry = () => {
            videoEl.removeEventListener("canplay", retry);
            const p2 = videoEl.play();
            if (p2 !== undefined) {
              p2.catch(() => {
                // Autoplay truly blocked — skip intro, no play icon
                skipIntro();
              });
            }
          };
          if (videoEl.readyState >= 3) {
            retry();
          } else {
            videoEl.addEventListener("canplay", retry);
          }
        });
      }
    };

    attemptPlay();

    return () => {
      yoyoActive = false;
      videoEl.removeEventListener("timeupdate", onTimeUpdate);
      videoEl.removeEventListener("ended", onEnded);
      videoEl.removeEventListener("seeked", onSeeked);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="/assets/videos/tck_bird_animation.mp4"
          type="video/mp4"
        />
      </video>
    </section>
  );
}
