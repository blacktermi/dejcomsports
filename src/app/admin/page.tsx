"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Trash2,
  Mail,
  Clock,
  User,
  MessageSquare,
  RefreshCw,
  LayoutDashboard,
  Users,
  UserCheck,
  UserPlus,
  TrendingUp,
  ChevronRight,
  StickyNote,
  ExternalLink,
  X,
  Inbox,
  LogOut,
  Handshake,
  Phone,
} from "lucide-react";
import Image from "next/image";

type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "LOST";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: LeadStatus;
  notes: string | null;
  createdAt: string;
}

type View = "dashboard" | "leads";

const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; color: string; bg: string; dot: string }
> = {
  NEW: {
    label: "Nouveau",
    color: "text-blue-600",
    bg: "bg-blue-500/10",
    dot: "bg-blue-500",
  },
  CONTACTED: {
    label: "Contacté",
    color: "text-amber-600",
    bg: "bg-amber-500/10",
    dot: "bg-amber-500",
  },
  QUALIFIED: {
    label: "Qualifié",
    color: "text-purple-600",
    bg: "bg-purple-500/10",
    dot: "bg-purple-500",
  },
  CONVERTED: {
    label: "Converti",
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    dot: "bg-emerald-500",
  },
  LOST: {
    label: "Perdu",
    color: "text-gray-500",
    bg: "bg-gray-500/10",
    dot: "bg-gray-400",
  },
};

const ALL_STATUSES: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "CONVERTED",
  "LOST",
];

export default function AdminPage() {
  const [view, setView] = useState<View>("dashboard");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | LeadStatus>("ALL");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingNotes, setEditingNotes] = useState("");
  const [showDetail, setShowDetail] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterStatus !== "ALL") params.set("status", filterStatus);
    if (search) params.set("search", search);

    try {
      const res = await fetch(`/api/leads?${params}`);
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch {
      setLeads([]);
    }
    setLoading(false);
  }, [filterStatus, search]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateLeadStatus = async (id: string, status: LeadStatus) => {
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchLeads();
    if (selectedLead?.id === id) {
      setSelectedLead({ ...selectedLead, status });
    }
  };

  const updateLeadNotes = async (id: string) => {
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: editingNotes }),
    });
    fetchLeads();
    if (selectedLead?.id === id) {
      setSelectedLead({ ...selectedLead, notes: editingNotes });
    }
  };

  const deleteLead = async (id: string) => {
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    if (selectedLead?.id === id) {
      setSelectedLead(null);
      setShowDetail(false);
    }
    fetchLeads();
  };

  const openDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setEditingNotes(lead.notes || "");
    setShowDetail(true);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("fr-CA", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const timeAgo = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `il y a ${mins}m`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `il y a ${hours}h`;
    const days = Math.floor(hours / 24);
    return `il y a ${days}j`;
  };

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "NEW").length,
    contacted: leads.filter((l) => l.status === "CONTACTED").length,
    converted: leads.filter((l) => l.status === "CONVERTED").length,
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-white border-r border-gray-100 z-40 hidden lg:flex flex-col">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Djecom Sports"
              width={90}
              height={26}
              className="h-6 w-auto"
            />
            <span className="font-[var(--font-display)] font-extrabold text-sm text-gray-900">
              Sports
            </span>
          </div>
          <p className="text-[10px] text-gray-400 font-medium mt-1.5 uppercase tracking-wider">
            Administration
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4">
          <div className="space-y-1">
            <button
              onClick={() => setView("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                view === "dashboard"
                  ? "bg-brand/5 text-brand font-semibold"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50 font-medium"
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>
            <button
              onClick={() => setView("leads")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                view === "leads"
                  ? "bg-brand/5 text-brand font-semibold"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50 font-medium"
              }`}
            >
              <Inbox size={18} />
              Leads
              {stats.new > 0 && (
                <span className="ml-auto text-[11px] font-bold bg-brand text-white px-2 py-0.5 rounded-full">
                  {stats.new}
                </span>
              )}
            </button>
            <a
              href="/admin/partners"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors"
            >
              <Handshake size={18} />
              Partenaires
            </a>
          </div>
        </nav>

        {/* Bottom */}
        <div className="px-4 py-4 border-t border-gray-100 space-y-3">
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand transition-colors font-medium"
          >
            <ExternalLink size={15} />
            Voir le site
          </a>
          <button
            onClick={async () => {
              await fetch("/api/auth", { method: "DELETE" });
              window.location.reload();
            }}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors font-medium w-full"
          >
            <LogOut size={15} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-[260px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#f8f9fb]/80 backdrop-blur-xl border-b border-gray-100/50">
          <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 font-[var(--font-display)]">
                {view === "dashboard" ? "Dashboard" : "Leads"}
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">
                {view === "dashboard"
                  ? "Vue d'ensemble de votre activité"
                  : "Gérez vos leads et prospects"}
              </p>
            </div>
            <button
              onClick={fetchLeads}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-500 hover:text-brand hover:border-brand/30 shadow-sm hover:shadow transition-all"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Actualiser
            </button>
          </div>
        </header>

        <div className="px-6 lg:px-8 py-8">
          {/* Stats cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Total leads",
                value: stats.total,
                icon: Users,
                gradient: "from-gray-900 to-gray-700",
                iconBg: "bg-white/20",
              },
              {
                label: "Nouveaux",
                value: stats.new,
                icon: UserPlus,
                gradient: "from-blue-600 to-blue-500",
                iconBg: "bg-white/20",
              },
              {
                label: "Contactés",
                value: stats.contacted,
                icon: MessageSquare,
                gradient: "from-amber-500 to-orange-500",
                iconBg: "bg-white/20",
              },
              {
                label: "Convertis",
                value: stats.converted,
                icon: TrendingUp,
                gradient: "from-emerald-600 to-emerald-500",
                iconBg: "bg-white/20",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`relative rounded-2xl bg-gradient-to-br ${stat.gradient} p-5 overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
                <div
                  className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mb-4`}
                >
                  <stat.icon size={20} className="text-white" />
                </div>
                <p className="text-3xl font-extrabold text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-white/60 font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Dashboard: recent leads + quick links */}
          {view === "dashboard" && (
            <div className="space-y-6 mb-8">
              {/* Quick actions */}
              <div className="grid sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setView("leads")}
                  className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand/20 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Inbox size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Voir les leads</p>
                    <p className="text-xs text-gray-400">Gérer les prospects</p>
                  </div>
                </button>
                <a
                  href="/admin/partners"
                  className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Handshake size={20} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Partenaires</p>
                    <p className="text-xs text-gray-400">Gérer les logos</p>
                  </div>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                    <ExternalLink size={20} className="text-brand" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Voir le site</p>
                    <p className="text-xs text-gray-400">Ouvrir dans un nouvel onglet</p>
                  </div>
                </a>
              </div>

              {/* Recent leads */}
              {leads.filter((l) => l.status === "NEW").length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 text-sm">Nouveaux leads</h3>
                    <button
                      onClick={() => setView("leads")}
                      className="text-xs font-semibold text-brand hover:underline"
                    >
                      Voir tout
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {leads
                      .filter((l) => l.status === "NEW")
                      .slice(0, 5)
                      .map((lead) => (
                        <button
                          key={lead.id}
                          onClick={() => {
                            setView("leads");
                            openDetail(lead);
                          }}
                          className="w-full text-left px-6 py-3.5 hover:bg-gray-50/60 transition-all flex items-center gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-brand">
                              {lead.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm truncate">
                              {lead.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {lead.subject}
                            </p>
                          </div>
                          <p className="text-xs text-gray-300 shrink-0">
                            {timeAgo(lead.createdAt)}
                          </p>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Leads view: Filters + list */}
          {view === "leads" && <>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un lead..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all shadow-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setFilterStatus("ALL")}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                  filterStatus === "ALL"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
                }`}
              >
                Tous
              </button>
              {ALL_STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                    filterStatus === s
                      ? `${STATUS_CONFIG[s].bg} ${STATUS_CONFIG[s].color} ring-2 ring-current/10`
                      : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${STATUS_CONFIG[s].dot}`}
                  />
                  {STATUS_CONFIG[s].label}
                </button>
              ))}
            </div>
          </div>

          {/* Lead list */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Table header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/80 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <div className="col-span-4">Contact</div>
              <div className="col-span-3">Sujet</div>
              <div className="col-span-2">Statut</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-1" />
            </div>

            {loading ? (
              <div className="p-16 text-center">
                <RefreshCw
                  size={24}
                  className="mx-auto text-gray-300 animate-spin mb-3"
                />
                <p className="text-sm text-gray-400">Chargement...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="p-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                  <Inbox size={28} className="text-gray-300" />
                </div>
                <p className="text-gray-900 font-semibold mb-1">
                  Aucun lead
                </p>
                <p className="text-sm text-gray-400">
                  Les soumissions du formulaire de contact apparaîtront ici.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {leads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => openDetail(lead)}
                    className={`w-full text-left px-6 py-4 hover:bg-gray-50/60 transition-all group ${
                      selectedLead?.id === lead.id && showDetail
                        ? "bg-brand/[0.03]"
                        : ""
                    }`}
                  >
                    <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                      {/* Contact */}
                      <div className="md:col-span-4 flex items-center gap-3 mb-2 md:mb-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-brand">
                            {lead.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {lead.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {lead.email}
                          </p>
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="md:col-span-3 mb-2 md:mb-0">
                        <p className="text-sm text-gray-600 truncate">
                          {lead.subject}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="md:col-span-2 mb-2 md:mb-0">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${STATUS_CONFIG[lead.status].bg} ${STATUS_CONFIG[lead.status].color}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[lead.status].dot}`}
                          />
                          {STATUS_CONFIG[lead.status].label}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="md:col-span-2">
                        <p className="text-xs text-gray-400">
                          {timeAgo(lead.createdAt)}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="hidden md:flex md:col-span-1 justify-end">
                        <ChevronRight
                          size={16}
                          className="text-gray-300 group-hover:text-brand group-hover:translate-x-0.5 transition-all"
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          </>}
        </div>
      </main>

      {/* Detail slide-over */}
      {showDetail && selectedLead && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:bg-transparent lg:backdrop-blur-none"
            onClick={() => setShowDetail(false)}
          />

          {/* Panel */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-gray-100 z-50 shadow-2xl shadow-black/10 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="font-bold text-gray-900">Détails du lead</h2>
              <button
                onClick={() => setShowDetail(false)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact card */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-white">
                    {selectedLead.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-gray-900">
                    {selectedLead.name}
                  </h3>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="text-sm text-brand hover:underline flex items-center gap-1"
                  >
                    <Mail size={13} />
                    {selectedLead.email}
                  </a>
                  {selectedLead.phone && (
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="text-sm text-gray-500 hover:text-brand hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <Phone size={13} />
                      {selectedLead.phone}
                    </a>
                  )}
                </div>
              </div>

              {/* Status pipeline */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Pipeline
                </label>
                <div className="flex gap-1.5">
                  {ALL_STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() =>
                        updateLeadStatus(selectedLead.id, s)
                      }
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                        selectedLead.status === s
                          ? `${STATUS_CONFIG[s].bg} ${STATUS_CONFIG[s].color} ring-2 ring-current/20`
                          : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                      }`}
                    >
                      {STATUS_CONFIG[s].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Sujet
                </label>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedLead.subject}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Message
                </label>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {selectedLead.message}
                  </p>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  <StickyNote size={13} />
                  Notes internes
                </label>
                <textarea
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  rows={3}
                  placeholder="Ajouter des notes..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all resize-none"
                />
                {editingNotes !== (selectedLead.notes || "") && (
                  <button
                    onClick={() => updateLeadNotes(selectedLead.id)}
                    className="mt-2 px-4 py-2 bg-brand text-white text-xs font-bold rounded-lg hover:bg-brand-dark transition-colors"
                  >
                    Sauvegarder
                  </button>
                )}
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-gray-100">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {formatDate(selectedLead.createdAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <User size={12} />
                  ID: {selectedLead.id.slice(0, 8)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand text-white rounded-xl text-sm font-bold hover:bg-brand-dark transition-colors"
                >
                  <Mail size={16} />
                  Envoyer un courriel
                </a>
                <button
                  onClick={() => deleteLead(selectedLead.id)}
                  className="px-4 py-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile header for small screens */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Djecom Sports"
            width={80}
            height={22}
            className="h-6 w-auto"
          />
          <span className="font-[var(--font-display)] font-extrabold text-sm text-gray-900">
            Sports
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="text-xs text-gray-400 font-medium">
            Site
          </a>
          <button
            onClick={async () => {
              await fetch("/api/auth", { method: "DELETE" });
              window.location.reload();
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
      <div className="lg:hidden h-[52px]" />
    </div>
  );
}
