"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, VIEWPORT, EASE_OUT } from "@/animations";

type Choice = { text: string; goto: string };
type Panel  = { id: string; body: string; choices?: Choice[]; end?: boolean };

const panels: Panel[] = [
  {
    id: "1.A",
    body: "You walk in. The aroma of freshly ground beans hits first — something earthy, something warm. The pastry case glows. Behind the counter, someone smiles. You could really go for something right now.",
    choices: [{ text: "Order coffee", goto: "4.C" }, { text: "Order tea", goto: "3.G" }],
  },
  {
    id: "4.C",
    body: "A flat white, obviously. Ahhh, that helps. You take a seat by the window — the sun streams through and the world slows a notch. Then you spot an old friend two tables over. The kind you actually still like.",
    choices: [{ text: "Go say hi", goto: "5.B" }, { text: "Keep your head down", goto: "2.F" }],
  },
  {
    id: "6.E",
    body: "Laptop open. The Kernel is built on the backs of focused people, and focused people don't chit-chat. Fifty minutes later — cup empty, brain firing. Time for a refill.",
    choices: [{ text: "Head back to the counter", goto: "1.A" }],
  },
  {
    id: "5.B",
    body: "They light up the moment they see you. You sink into the conversation, the pastries, a second cup. They mention the herbal tea is genuinely life-changing — but the to-do list still hums in the back of your mind.",
    choices: [{ text: "Get back to work", goto: "6.E" }, { text: "Try the tea", goto: "3.G" }],
  },
  {
    id: "2.F",
    body: "Too late. They've already spotted you, and they're heading over. Maybe this isn't a bad thing, after all. You've been grinding. Literally and figuratively. A break could be exactly the thing.",
    choices: [{ text: "Wave them off", goto: "6.E" }, { text: "Pull up a chair", goto: "5.B" }],
  },
  {
    id: "3.G",
    body: "The tea, somehow, hits different. When was the last time you actually slowed down? The shoulders drop. The day softens. And maybe — just for a little bit — the to-do list can absolutely wait.",
    end: true,
  },
];

const panelMap = Object.fromEntries(panels.map((p) => [p.id, p]));
const TOTAL = panels.length;

// ── Variants ────────────────────────────────────────────────────────────────

const headingChildVariants = {
  hidden:  { y: 40, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.9, ease: EASE_OUT } },
};

const cardVariants = {
  hidden:  { y: 40, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

const panelContentVariants = {
  hidden:  { y: 16,  opacity: 0 },
  visible: { y: 0,   opacity: 1, transition: { duration: 0.4, ease: EASE_OUT } },
  exit:    { y: -12, opacity: 0, transition: { duration: 0.25, ease: EASE_OUT } },
};

const choiceItemVariants = {
  hidden:  { x: -16, opacity: 0 },
  visible: { x: 0,   opacity: 1, transition: { duration: 0.4, ease: EASE_OUT } },
};

// ── Component ────────────────────────────────────────────────────────────────

export default function About() {
  const [currentId, setCurrentId] = useState("1.A");
  const [history,   setHistory]   = useState<string[]>(["1.A"]);
  const [busy,      setBusy]      = useState(false);

  const current      = panelMap[currentId];
  const visitedSet   = new Set(history);
  const visitedCount = visitedSet.size;

  function navigate(goto: string) {
    if (busy) return;
    setBusy(true);
    setCurrentId(goto);
    setHistory((h) => [...h, goto]);
    setTimeout(() => setBusy(false), 500);
  }

  function restart() {
    setCurrentId("1.A");
    setHistory(["1.A"]);
    setBusy(false);
  }

  return (
    <section id="about" className="relative overflow-hidden">

      {/* ── Marquee strip ── */}
      <motion.div
        className="py-5 border-y border-primary/6 overflow-hidden bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex whitespace-nowrap gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "loop" }}
        >
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-12 text-primary text-sm tracking-[0.3em] uppercase shrink-0"
              style={{ fontFamily: "Whyte, sans-serif" }}
            >
              <span>Comfort Food</span><span className="text-warm/40">✦</span>
              <span>Coffee</span><span className="text-warm/40">✦</span>
              <span>Patisserie</span><span className="text-warm/40">✦</span>
              <span>Fresh Ingredients</span><span className="text-warm/40">✦</span>
              <span>Love</span><span className="text-warm/40">✦</span>
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Story section ── */}
      <div className="relative py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-warm">
        <div className="max-w-3xl mx-auto">

          {/* Heading */}
          <motion.div
            className="mb-16 text-center"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
<motion.h2
              variants={headingChildVariants}
              className="text-4xl md:text-5xl lg:text-[3.25rem] text-primary leading-[1.1]"
            >
              Let’s Visualise Your Visit to{" "}
              <span className="italic font-normal text-cream">TCK</span>
            </motion.h2>
          </motion.div>

          {/* Story card wrapper */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >

            {/* Journey thread — shown after first choice */}
            <AnimatePresence>
              {history.length > 1 && (
                <motion.div
                  key="thread"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="flex items-center gap-2 flex-wrap mb-4 px-1"
                >
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase text-primary/50"
                    style={{ fontFamily: "Whyte, sans-serif" }}
                  >
                    Journey
                  </span>
                  <span className="text-primary/30 text-[10px]">·</span>
                  {history.map((id, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      <span
                        className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold tracking-[0.05em]"
                        style={{ fontFamily: "Whyte, sans-serif" }}
                      >
                        {id}
                      </span>
                      {i < history.length - 1 && (
                        <span className="text-primary/30 text-[10px]">→</span>
                      )}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Card */}
            <div className="bg-primary rounded-2xl overflow-hidden">

              {/* Card header */}
              <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-white/8">
                <div className="flex items-center gap-3">
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase text-cream/40"
                    style={{ fontFamily: "Whyte, sans-serif" }}
                  >
                    Panel
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentId}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }}
                      className="text-xs px-3 py-1 rounded-full bg-white/10 text-cream font-semibold tracking-[0.15em]"
                      style={{ fontFamily: "Whyte, sans-serif" }}
                    >
                      {currentId}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-4">
                  {/* Explored dots */}
                  <div className="flex items-center gap-1.5" title="Panels explored">
                    {panels.map((p) => (
                      <motion.span
                        key={p.id}
                        className="block w-2 h-2 rounded-full"
                        animate={{
                          backgroundColor: visitedSet.has(p.id)
                            ? "#D4A574"
                            : "rgba(255,255,255,0.12)",
                        }}
                        transition={{ duration: 0.35 }}
                        title={p.id}
                      />
                    ))}
                  </div>

                  <button
                    onClick={restart}
                    className="text-[11px] tracking-[0.2em] uppercase text-cream/40 hover:text-cream/80 transition-colors cursor-pointer"
                    style={{ fontFamily: "Whyte, sans-serif" }}
                  >
                    Restart
                  </button>
                </div>
              </div>

              {/* Card body */}
              <div className="relative px-7 py-9 min-h-[280px]">

                {/* Watermark */}
                <span
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[6.5rem] leading-none font-bold pointer-events-none select-none"
                  style={{
                    fontFamily: "Whyte, sans-serif",
                    color: "rgba(255,255,255,0.04)",
                  }}
                  aria-hidden
                >
                  {currentId}
                </span>

                {/* Animated panel content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentId}
                    variants={panelContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {/* Body text */}
                    <p className="text-cream/85 text-[15px] leading-[1.9] relative z-10">
                      {current.body}
                    </p>

                    {/* Choice buttons */}
                    {current.choices && (
                      <motion.div
                        className="mt-7 space-y-2"
                        variants={staggerContainer(0.1, 0.1)}
                        initial="hidden"
                        animate="visible"
                      >
                        {current.choices.map((choice, idx) => (
                          <motion.button
                            key={idx}
                            variants={choiceItemVariants}
                            onClick={() => navigate(choice.goto)}
                            disabled={busy}
                            className="group w-full flex items-center justify-between px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer text-left disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className="w-5 h-5 flex items-center justify-center rounded-full border border-white/15 text-[10px] text-cream/40 group-hover:border-warm/40 group-hover:text-warm/70 transition-colors shrink-0"
                                style={{ fontFamily: "Whyte, sans-serif" }}
                              >
                                {idx + 1}
                              </span>
                              <span
                                className="text-cream/75 text-[14px] group-hover:text-cream transition-colors"
                                style={{ fontFamily: "Whyte, sans-serif" }}
                              >
                                {choice.text}
                              </span>
                            </span>
                            <span className="flex items-center gap-2 text-cream/25 group-hover:text-warm/60 transition-colors shrink-0 ml-4">
                              <span
                                className="text-[11px] tracking-[0.1em]"
                                style={{ fontFamily: "Whyte, sans-serif" }}
                              >
                                {choice.goto}
                              </span>
                              <span className="text-xs">→</span>
                            </span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}

                    {/* End state */}
                    {current.end && (
                      <motion.div
                        className="mt-8"
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.2 }}
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex-1 h-px bg-white/15" />
                          <span
                            className="text-[11px] tracking-[0.4em] uppercase text-cream/40"
                            style={{ fontFamily: "Whyte, sans-serif" }}
                          >
                            The End
                          </span>
                          <div className="flex-1 h-px bg-white/15" />
                        </div>
                        <div className="flex items-center gap-4 flex-wrap">
                          <button
                            onClick={restart}
                            className="px-5 py-2.5 rounded-xl bg-warm text-primary text-[13px] font-semibold tracking-[0.08em] hover:bg-warm/90 transition-colors cursor-pointer"
                            style={{ fontFamily: "Whyte, sans-serif" }}
                          >
                            Play Again
                          </button>
                          <span
                            className="text-cream/40 text-[13px]"
                            style={{ fontFamily: "Whyte, sans-serif" }}
                          >
                            You discovered {visitedCount} of {TOTAL}.
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
