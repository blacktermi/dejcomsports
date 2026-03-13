"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Target, Zap } from "lucide-react";

const highlights = [
  {
    icon: Sparkles,
    label: "Contenus narratifs",
    description: "Des histoires uniques pour engager la communauté",
  },
  {
    icon: Target,
    label: "Stratégie sur-mesure",
    description: "Analyse de votre audience et de vos objectifs",
  },
  {
    icon: Zap,
    label: "Gestion professionnelle",
    description: "Suivi constant et optimisation de la visibilité",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden bg-white">
      <div className="orb w-[400px] h-[400px] bg-brand/5 top-0 right-0" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-brand mb-4">
            Qui sommes-nous
          </span>
          <h2 className="font-[var(--font-display)] font-extrabold text-4xl sm:text-5xl text-gray-900 mb-6">
            Une agence de marketing sportif{" "}
            <span className="gradient-text">engagée et créative</span>
          </h2>
          <div className="w-16 h-1 bg-brand/40 mx-auto rounded-full" />
        </motion.div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg text-gray-500 leading-relaxed mb-6">
              Basée à{" "}
              <span className="text-gray-900 font-semibold">Québec, Canada</span>,{" "}
              <span className="text-gray-900 font-semibold">Djecom Sports</span>{" "}
              est spécialisée dans la gestion des réseaux sociaux et la création
              de contenus narratifs pour les clubs et organisations sportives.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Nous mettons en lumière les parcours des athlètes et le quotidien
              des organisations sportives. En combinant créativité et expertise,
              nous racontons l&apos;histoire de vos équipes et de vos joueurs pour
              créer un lien authentique avec votre communauté.
            </p>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { value: "100+", label: "Contenus créés" },
                { value: "50+", label: "Clubs accompagnés" },
                { value: "3+", label: "Années d'expertise" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  <div className="text-3xl font-extrabold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                className="group glass rounded-2xl p-6 hover:shadow-lg hover:shadow-brand/5 transition-all duration-500 cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {item.label}
                    </h3>
                    <p className="text-gray-500">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
