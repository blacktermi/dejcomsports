"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Facebook, Instagram, ArrowUp } from "lucide-react";

const footerLinks = [
  { label: "Accueil", href: "#hero" },
  { label: "À propos", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=61559298282940",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/djecomsports/",
    label: "Instagram",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gray-950 text-white">
      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-8">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Image
                src="/images/logo.png"
                alt="Djecom Sports"
                width={120}
                height={34}
                className="h-8 w-auto brightness-0 invert"
              />
              <span className="font-[var(--font-display)] font-extrabold text-lg text-white tracking-tight">
                Sports
              </span>
            </div>
            <p className="text-white/40 leading-relaxed max-w-sm">
              Agence de marketing sportif basée à Québec. Du sport. Des histoires.
              De l&apos;impact. Nous transformons votre vision en une présence
              digitale percutante.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-brand transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
              Suivez-nous
            </h4>
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-brand hover:bg-brand/10 hover:border-brand/20 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <address className="space-y-2 text-sm text-white/40 not-italic">
              <p><a href="tel:+14184901053" className="hover:text-brand transition-colors">+1 418 490 1053</a></p>
              <p><a href="mailto:djecom97@gmail.com" className="hover:text-brand transition-colors">djecom97@gmail.com</a></p>
              <p>Québec, QC, Canada</p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/25 text-center sm:text-left">
            <p>
              &copy; {currentYear} Djecom Sports Inc. Tous droits réservés.
            </p>
            <p className="mt-1">
              Constituée en vertu des lois de la province de Québec, Canada.
            </p>
          </div>

          {/* Back to top */}
          <motion.a
            href="#hero"
            whileHover={{ y: -2 }}
            className="shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-brand hover:border-brand/30 transition-all duration-300"
          >
            <ArrowUp size={18} />
          </motion.a>
        </div>

        {/* Credit */}
        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-white/20">
            Conçu et développé par{" "}
            <a
              href="https://tribalagency.africa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/35 hover:text-brand transition-colors duration-300"
            >
              Tribal Agency Africa
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
