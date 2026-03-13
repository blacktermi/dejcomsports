"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface Partner {
  id: string;
  name: string;
  description: string;
  website: string;
  logoUrl: string;
  order: number;
}

const FALLBACK: Partner[] = [
  { id: "1", name: "Télé-Mag", description: "", website: "", logoUrl: "/images/P1.png", order: 0 },
  { id: "2", name: "RSEQ", description: "", website: "", logoUrl: "/images/P2.png", order: 1 },
  { id: "3", name: "RCA Group", description: "", website: "", logoUrl: "/images/P3.png", order: 2 },
];

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [partners, setPartners] = useState<Partner[]>(FALLBACK);

  useEffect(() => {
    fetch("/api/partners")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setPartners(data);
      })
      .catch(() => {});
  }, []);

  if (partners.length === 0) return null;

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden bg-white">
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-brand mb-4">
            Nos partenaires
          </span>
          <h2 className="font-[var(--font-display)] font-extrabold text-4xl sm:text-5xl text-gray-900 mb-6">
            Ils nous font{" "}
            <span className="gradient-text">confiance</span>
          </h2>
        </motion.div>

        {/* Logos — elegant horizontal strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50/80 to-white p-10 sm:p-14"
        >
          {/* Subtle top accent line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-b-full bg-gradient-to-r from-brand/40 via-brand to-brand/40" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20 flex-wrap">
            {partners.map((partner, i) => {
              const content = (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="group flex flex-col items-center gap-4"
                >
                  <div className="relative w-40 h-24 sm:w-48 sm:h-28 group-hover:scale-105 transition-all duration-500">
                    <Image
                      src={partner.logoUrl}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 group-hover:text-brand transition-colors duration-500">
                      {partner.name}
                    </span>
                    {partner.description && (
                      <p className="text-[11px] text-gray-400 mt-1 max-w-[180px]">
                        {partner.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              );

              if (partner.website) {
                return (
                  <a
                    key={partner.id}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                );
              }
              return content;
            })}
          </div>
        </motion.div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-gray-400 text-sm mt-8"
        >
          Clubs, organisations et médias sportifs au Québec
        </motion.p>
      </div>
    </section>
  );
}
