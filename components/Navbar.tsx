"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CartIcon from "./CartIcon";
import Cart from "./Cart";

const isOnlinePayment =
  process.env.NEXT_PUBLIC_ONLINE_PAYMENT === "true";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { y: -100, opacity: 0 });

    const handleHeroReady = () => {
      gsap.to(nav, {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
      });
    };

    window.addEventListener("heroVideoReady", handleHeroReady);

    const handleScroll = () => {
      if (window.scrollY > 80) {
        gsap.to(nav, {
          backgroundColor: "rgba(26, 49, 45, 0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          duration: 0.3,
        });
      } else {
        gsap.to(nav, {
          backgroundColor: "rgba(26, 49, 45, 0)",
          backdropFilter: "blur(0px)",
          borderBottom: "1px solid rgba(255,255,255,0)",
          duration: 0.3,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("heroVideoReady", handleHeroReady);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    if (tlRef.current) tlRef.current.kill();

    const links = menuRef.current.querySelectorAll("a");

    if (isOpen) {
      document.body.style.overflow = "hidden";
      tlRef.current = gsap.timeline();
      tlRef.current
        .to(menuRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.6,
          ease: "power4.inOut",
        })
        .from(
          links,
          { y: 50, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out" },
          "-=0.2"
        );
    } else {
      document.body.style.overflow = "";
      tlRef.current = gsap.timeline();
      tlRef.current.to(menuRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.5,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  const navLinks = [
    { label: "About", target: "about" },
    { label: "Menu", target: "menu" },
    { label: "Gallery", target: "gallery" },
    { label: "Visit Us", target: "visit" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between"
        style={{ backgroundColor: "rgba(26, 49, 45, 0)" }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="/assets/images/logo-white.webp"
            alt="The Cracking Kernel"
            className="h-10 md:h-12 w-auto"
          />
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              className="text-white/70 text-[13px] tracking-[0.15em] uppercase hover:text-white transition-colors duration-300 relative group cursor-pointer"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-warm group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Cart Icon and Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          {isOnlinePayment && (
            <CartIcon onClick={() => setIsCartOpen(true)} />
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-[5px] z-50 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[3.25px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[3.25px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-primary flex flex-col items-center justify-center gap-10 md:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => {
              setIsOpen(false);
              scrollTo(link.target);
            }}
            className="text-white text-3xl font-light tracking-[0.15em] uppercase hover:text-warm transition-colors duration-300 cursor-pointer"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Cart Drawer */}
      {isOnlinePayment && (
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </>
  );
}
