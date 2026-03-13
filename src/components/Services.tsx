"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PenTool, BarChart3, Share2, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: PenTool,
    title: "Création de Contenus Narratifs",
    description:
      "Nous créons du contenu unique pour engager votre communauté : vidéos personnalisées, récits écrits, portraits d'athlètes et coulisses du quotidien de vos équipes sportives.",
    tags: ["Vidéos", "Portraits", "Coulisses", "Storytelling"],
  },
  {
    icon: BarChart3,
    title: "Stratégie de Communication Digitale",
    description:
      "Nous analysons votre secteur, votre audience cible et vos objectifs pour élaborer des stratégies digitales sur-mesure qui maximisent votre impact et votre visibilité.",
    tags: ["Analyse", "Audience", "Planification", "KPIs"],
  },
  {
    icon: Share2,
    title: "Gestion des Réseaux Sociaux",
    description:
      "Gestion professionnelle de vos plateformes avec un suivi constant, des interactions engageantes et une optimisation continue de votre visibilité en ligne.",
    tags: ["Instagram", "Facebook", "TikTok", "LinkedIn"],
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-32 overflow-hidden bg-gray-50">
      <div className="orb w-[500px] h-[500px] bg-brand/5 -bottom-40 left-1/2 -translate-x-1/2" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-brand mb-4">
            Nos services
          </span>
          <h2 className="font-[var(--font-display)] font-extrabold text-4xl sm:text-5xl text-gray-900 mb-6">
            Marketing sportif{" "}
            <span className="gradient-text">sur-mesure</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Photos, vidéos et stratégie digitale pour vos clubs et organisations
            sportives. Nous racontons vos histoires avec impact.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-brand/5 border border-gray-100 transition-all duration-700 overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500">
                  <service.icon size={28} />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-500 leading-relaxed mb-6 text-[15px]">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-gray-50 text-gray-400 border border-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-2 text-sm font-medium text-brand/50 group-hover:text-brand transition-colors duration-300">
                <span>En savoir plus</span>
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
