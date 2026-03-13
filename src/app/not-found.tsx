import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <h1 className="font-[var(--font-display)] font-extrabold text-7xl text-brand mb-4">
        404
      </h1>
      <p className="text-xl font-semibold text-gray-900 mb-2">
        Page introuvable
      </p>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="px-8 py-4 bg-brand text-white rounded-2xl font-semibold hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/25 transition-all"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
