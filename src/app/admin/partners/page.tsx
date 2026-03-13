"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  ArrowLeft,
  Loader2,
  Pencil,
  X,
  Handshake,
  Globe,
  Save,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Partner {
  id: string;
  name: string;
  description: string;
  website: string;
  logoUrl: string;
  order: number;
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formWebsite, setFormWebsite] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchPartners = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/partners");
      const data = await res.json();
      setPartners(Array.isArray(data) ? data : []);
    } catch {
      setPartners([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const resetForm = () => {
    setFormName("");
    setFormDesc("");
    setFormWebsite("");
    setSelectedFile(null);
    setPreviewUrl(null);
    setEditingPartner(null);
  };

  const openAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (p: Partner) => {
    setEditingPartner(p);
    setFormName(p.name);
    setFormDesc(p.description || "");
    setFormWebsite(p.website || "");
    setPreviewUrl(p.logoUrl);
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!formName.trim()) return;
    if (!editingPartner && !selectedFile) return;
    setSaving(true);

    let logoUrl = editingPartner?.logoUrl || "";

    // Upload new file if selected
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      logoUrl = uploadData.url;
    }

    if (editingPartner) {
      // Update
      await fetch(`/api/partners/${editingPartner.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName.trim(),
          description: formDesc.trim(),
          website: formWebsite.trim(),
          ...(selectedFile ? { logoUrl } : {}),
        }),
      });
    } else {
      // Create
      await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName.trim(),
          description: formDesc.trim(),
          website: formWebsite.trim(),
          logoUrl,
          order: partners.length,
        }),
      });
    }

    resetForm();
    setShowModal(false);
    setSaving(false);
    fetchPartners();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/partners/${id}`, { method: "DELETE" });
    fetchPartners();
  };

  const movePartner = async (id: string, direction: "up" | "down") => {
    const idx = partners.findIndex((p) => p.id === id);
    if (
      (direction === "up" && idx === 0) ||
      (direction === "down" && idx === partners.length - 1)
    )
      return;

    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    const a = partners[idx];
    const b = partners[swapIdx];

    await Promise.all([
      fetch(`/api/partners/${a.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: b.order }),
      }),
      fetch(`/api/partners/${b.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: a.order }),
      }),
    ]);

    fetchPartners();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 font-[var(--font-display)]">
                Partenaires
              </h1>
              <p className="text-sm text-gray-400">
                Gérez les logos et informations affichés sur le site
              </p>
            </div>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-white text-sm font-bold hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/20 transition-all"
          >
            <Plus size={16} />
            Ajouter
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Modal add/edit */}
        {showModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl w-full max-w-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                  {editingPartner
                    ? "Modifier le partenaire"
                    : "Nouveau partenaire"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ex: RSEQ Québec"
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Ex: Réseau du sport étudiant du Québec"
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all resize-none"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Site web
                  </label>
                  <div className="relative">
                    <Globe
                      size={15}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                    />
                    <input
                      type="url"
                      value={formWebsite}
                      onChange={(e) => setFormWebsite(e.target.value)}
                      placeholder="https://www.exemple.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all"
                    />
                  </div>
                </div>

                {/* Logo upload */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Logo {!editingPartner && "*"}
                  </label>
                  {previewUrl ? (
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-white border border-gray-100 shrink-0">
                        <Image
                          src={previewUrl}
                          alt="Aperçu"
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        {selectedFile ? (
                          <>
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {(selectedFile.size / 1024).toFixed(0)} Ko
                            </p>
                          </>
                        ) : (
                          <p className="text-sm font-medium text-gray-500">
                            Logo actuel
                          </p>
                        )}
                      </div>
                      <label className="text-xs font-bold text-brand hover:text-brand-dark cursor-pointer transition-colors">
                        Changer
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center gap-2 p-8 rounded-xl border-2 border-dashed border-gray-200 hover:border-brand/40 bg-gray-50/50 cursor-pointer transition-all group">
                      <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload size={20} className="text-brand" />
                      </div>
                      <span className="text-sm font-medium text-gray-500">
                        Cliquez pour uploader le logo
                      </span>
                      <span className="text-xs text-gray-300">
                        PNG, JPG, SVG, WEBP
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Submit */}
                <button
                  onClick={handleSave}
                  disabled={
                    !formName.trim() ||
                    (!editingPartner && !selectedFile) ||
                    saving
                  }
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand text-white rounded-xl font-bold hover:bg-brand-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : editingPartner ? (
                    <>
                      <Save size={16} />
                      Enregistrer les modifications
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Ajouter le partenaire
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Partners list */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="text-brand animate-spin" />
          </div>
        ) : partners.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Handshake size={28} className="text-gray-300" />
            </div>
            <p className="text-gray-900 font-semibold mb-1">
              Aucun partenaire
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Ajoutez vos premiers partenaires pour les afficher sur le site.
            </p>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand text-white text-sm font-bold hover:bg-brand-dark transition-all"
            >
              <Plus size={16} />
              Ajouter un partenaire
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {partners.map((partner, idx) => (
              <div
                key={partner.id}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
              >
                {/* Order arrows */}
                <div className="flex flex-col gap-1 pt-1">
                  <button
                    onClick={() => movePartner(partner.id, "up")}
                    disabled={idx === 0}
                    className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-all"
                    title="Monter"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    onClick={() => movePartner(partner.id, "down")}
                    disabled={idx === partners.length - 1}
                    className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-all"
                    title="Descendre"
                  >
                    <ArrowDown size={13} />
                  </button>
                </div>

                {/* Logo preview */}
                <div className="relative w-20 h-14 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                  <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 text-sm truncate">
                      {partner.name}
                    </p>
                    <span className="text-[10px] font-bold text-gray-300 bg-gray-50 px-2 py-0.5 rounded-md shrink-0">
                      #{idx + 1}
                    </span>
                  </div>
                  {partner.description && (
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                      {partner.description}
                    </p>
                  )}
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-brand hover:underline mt-1"
                    >
                      <Globe size={11} />
                      {partner.website.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                  <button
                    onClick={() => openEdit(partner)}
                    className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                    title="Modifier"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(partner.id)}
                    className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-400 hover:text-red-600 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
