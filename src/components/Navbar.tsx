"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Accueil", href: "#hero" },
  { label: "À propos", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="#hero" className="relative z-10 flex items-center gap-2.5">
            <Image
              src="/images/logo.png"
              alt="Djecom Sports"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <span className="font-[var(--font-display)] font-extrabold text-lg text-gray-900 tracking-tight">
              Sports
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                    link.label === "Contact"
                      ? "px-5 py-2.5 rounded-full bg-brand text-white hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/20"
                      : "text-gray-500 hover:text-brand"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden relative z-10 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            aria-label="Ouvrir le menu"
          >
            <Menu size={20} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu — Fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] md:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-white" />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4">
                <a
                  href="#hero"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2"
                >
                  <Image
                    src="/images/logo.png"
                    alt="Djecom Sports"
                    width={120}
                    height={34}
                    className="h-8 w-auto"
                  />
                  <span className="font-[var(--font-display)] font-extrabold text-lg text-gray-900 tracking-tight">
                    Sports
                  </span>
                </a>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                  aria-label="Fermer le menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Separator */}
              <div className="mx-6 h-px bg-gray-100" />

              {/* Nav links */}
              <nav className="flex-1 flex flex-col justify-center px-8">
                <ul className="space-y-2">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-4 text-3xl font-[var(--font-display)] font-extrabold text-gray-900 hover:text-brand transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Bottom — CTA + social */}
              <div className="px-8 pb-10">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full py-4 bg-brand rounded-2xl font-bold text-white text-center text-lg hover:bg-brand-dark transition-colors duration-300"
                >
                  Discutons de votre projet
                </a>
                <div className="flex items-center justify-center gap-6 mt-6">
                  <a
                    href="tel:+14184901053"
                    className="text-sm text-gray-400 hover:text-brand transition-colors"
                  >
                    +1 418 490 1053
                  </a>
                  <span className="w-1 h-1 rounded-full bg-gray-200" />
                  <a
                    href="mailto:djecom97@gmail.com"
                    className="text-sm text-gray-400 hover:text-brand transition-colors"
                  >
                    djecom97@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
