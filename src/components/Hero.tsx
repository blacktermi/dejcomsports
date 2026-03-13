"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";

const slides = [
  {
    title: "L'agence de marketing sportif engagée et créative",
    subtitle: "Du sport. Des histoires. De l'impact.",
  },
  {
    title: "Racontez l'histoire de vos athlètes et de vos clubs",
    subtitle: "Contenu. Narration. Émotion.",
  },
  {
    title: "Boostez la visibilité de votre organisation sportive",
    subtitle: "Stratégie. Réseaux sociaux. Résultats.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50"
    >
      {/* Soft gradient orbs */}
      <div className="orb w-[600px] h-[600px] bg-brand/10 -top-60 -right-60" />
      <div
        className="orb w-[500px] h-[500px] bg-orange-300/10 bottom-0 -left-60"
        style={{ animationDelay: "5s" }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-brand">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="text-sm font-medium text-brand-dark">
              Agence de Marketing Sportif — Québec, Canada
            </span>
          </span>
        </motion.div>

        {/* Title — fixed height container, NO absolute positioning */}
        <div className="relative h-[220px] sm:h-[180px] md:h-[160px] mb-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="font-[var(--font-display)] font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.15] tracking-tight text-gray-900"
            >
              {slides[current].title}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <div className="h-[32px] mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-lg sm:text-xl text-gray-400 font-medium tracking-widest uppercase"
            >
              {slides[current].subtitle}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mb-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current
                  ? "w-8 bg-brand"
                  : "w-4 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#services"
            className="group relative px-8 py-4 bg-brand rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-brand/25 hover:scale-[1.02]"
          >
            <span className="relative z-10">Nos services</span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-2xl glass font-semibold text-gray-600 hover:text-brand transition-all duration-300"
          >
            Nous contacter
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={20} className="text-gray-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
