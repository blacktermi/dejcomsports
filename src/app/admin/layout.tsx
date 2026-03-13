"use client";

import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((data) => setAuthenticated(data.authenticated))
      .catch(() => setAuthenticated(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setAuthenticated(true);
    } else {
      setError("Identifiants incorrects.");
      setPassword("");
    }
    setLoading(false);
  };

  // Loading state
  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
        <Loader2 size={24} className="text-brand animate-spin" />
      </div>
    );
  }

  // Authenticated — render admin
  if (authenticated) {
    return <>{children}</>;
  }

  // Login screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 flex items-center justify-center px-6">
      {/* Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-brand/8 -top-40 -right-40 fixed" />
      <div className="orb w-[400px] h-[400px] bg-orange-300/8 bottom-0 -left-40 fixed" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <Image
              src="/images/logo.png"
              alt="Djecom Sports"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
            <span className="font-[var(--font-display)] font-extrabold text-xl text-gray-900 tracking-tight">
              Sports
            </span>
          </div>
          <p className="text-sm text-gray-400 font-medium">
            Espace administration
          </p>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8">
          <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6">
            <Lock size={22} className="text-brand" />
          </div>

          <h1 className="text-xl font-bold text-gray-900 text-center mb-1">
            Connexion
          </h1>
          <p className="text-sm text-gray-400 text-center mb-8">
            Entrez vos identifiants administrateur
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Adresse e-mail"
              autoFocus
              className={`w-full px-5 py-3.5 rounded-xl bg-gray-50 border text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-4 transition-all ${
                error
                  ? "border-red-300 focus:border-red-400 focus:ring-red-500/10"
                  : "border-gray-200 focus:border-brand focus:ring-brand/5"
              }`}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Mot de passe"
                className={`w-full px-5 py-3.5 pr-12 rounded-xl bg-gray-50 border text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-4 transition-all ${
                  error
                    ? "border-red-300 focus:border-red-400 focus:ring-red-500/10"
                    : "border-gray-200 focus:border-brand focus:ring-brand/5"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand text-white rounded-xl font-bold hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Se connecter
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-300 mt-8">
          Conçu par{" "}
          <a
            href="https://tribalagency.africa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-brand transition-colors"
          >
            Tribal Agency Africa
          </a>
        </p>
      </div>
    </div>
  );
}
