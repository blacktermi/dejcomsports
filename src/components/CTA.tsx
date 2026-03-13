"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 overflow-hidden bg-white">
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-dark to-orange-700" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-8 sm:px-16 py-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-[var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight"
            >
              Prêt à donner de la visibilité
              <br />
              à votre club sportif ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/80 text-lg max-w-2xl mx-auto mb-10"
            >
              Du contenu narratif aux stratégies digitales, nous sommes là pour
              raconter l&apos;histoire de vos athlètes et engager votre communauté.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-brand-dark rounded-2xl font-bold text-lg hover:bg-gray-50 hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-black/10"
              >
                <MessageCircle
                  size={22}
                  className="group-hover:rotate-12 transition-transform duration-300"
                />
                Discutons de votre projet
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
