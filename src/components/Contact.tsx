"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle, Loader2 } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Localisation",
    value: "Québec, Canada",
    href: "#",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+1 418 490 1053",
    href: "tel:+14184901053",
  },
  {
    icon: Mail,
    label: "Courriel",
    value: "djecom97@gmail.com",
    href: "mailto:djecom97@gmail.com",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-gray-50">
      <div className="orb w-[500px] h-[500px] bg-brand/5 -bottom-40 -right-40" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-brand mb-4">
            Contact
          </span>
          <h2 className="font-[var(--font-display)] font-extrabold text-4xl sm:text-5xl text-gray-900 mb-6">
            Parlons de votre{" "}
            <span className="gradient-text">projet</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Une idée, un projet, une question ? N&apos;hésitez pas à nous contacter.
            Nous vous répondrons dans les plus brefs délais.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info cards */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex items-center gap-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:shadow-brand/5 transition-all duration-500"
              >
                <div className="p-3 rounded-xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500">
                  <item.icon size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-gray-900 font-semibold">{item.value}</div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Message envoyé !
                </h3>
                <p className="text-gray-500 max-w-sm mb-8">
                  Merci pour votre message. Notre équipe vous contactera dans les
                  plus brefs délais.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-brand font-semibold hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-5"
                onSubmit={handleSubmit}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Votre nom"
                      className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/10 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Courriel
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="votre@courriel.com"
                      className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/10 transition-all duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 418 000 0000"
                    className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/10 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="De quoi souhaitez-vous discuter ?"
                    className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/10 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Décrivez votre projet..."
                    className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/10 transition-all duration-300 resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm">
                    Une erreur est survenue. Veuillez réessayer.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group w-full py-4 bg-brand rounded-xl font-bold text-white hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {status === "loading" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <Send
                          size={18}
                          className="group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
