import { useState } from "react";
import {
  Package,
  Plus,
  Pencil,
  Copy,
  Trash2,
  ArrowLeft,
  Check,
  X,
  Settings2,
  TrendingUp,
  BrainCircuit,
  Zap,
  GraduationCap,
  Save,
  Upload,
  LayoutGrid,
  Tag,
  Crown,
  Globe,
  MessageSquare,
  Mic,
  Star,
  CreditCard,
  Calendar,
  Mail,
  Smartphone,
  Share2,
  ClipboardList,
} from "lucide-react";
import { FEATURE_MARKETING_COPY, INTEGRATION_MARKETING_COPY } from "../../lib/marketing-copy";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type PlanTier = "growth" | "pro" | "elite" | "custom";

interface SnapshotMeta {
  name: string;
  tier: PlanTier;
  industry: string;
  ghlSnapshotId: string;
  notes: string;
}

interface Snapshot extends SnapshotMeta {
  id: string;
  features: Record<string, boolean>;
  integrations: Record<string, boolean>;
  templateId: string;
  updatedAt: string;
}

type View = "gallery" | "builder" | "matrix" | "marketing";

/* ------------------------------------------------------------------ */
/*  Feature catalogue                                                  */
/* ------------------------------------------------------------------ */

interface FeatureCategory {
  label: string;
  icon: React.ElementType;
  keys: string[];
}

const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    label: "OPERATIONS",
    icon: Settings2,
    keys: ["pipeline_management", "contact_crm", "advanced_analytics"],
  },
  {
    label: "GROWTH",
    icon: TrendingUp,
    keys: ["review_automation", "social_scheduler", "email_campaigns"],
  },
  {
    label: "AI STUDIO",
    icon: BrainCircuit,
    keys: [
      "universal_chat_ai",
      "pro_chat_ai",
      "voice_ai_agent",
      "router_agent",
      "ai_knowledge_base",
    ],
  },
  {
    label: "AUTOMATIONS",
    icon: Zap,
    keys: [
      "lead_capture_workflow",
      "followup_workflow",
      "booking_confirmation",
      "upgrade_nudge",
    ],
  },
  {
    label: "TRAINING",
    icon: GraduationCap,
    keys: ["onboarding_videos", "advanced_playbooks"],
  },
  {
    label: "PROMOTIONS",
    icon: Tag,
    keys: [
      "holiday_promo_banner",
      "bogo_offer_widget",
      "seasonal_landing_page",
      "referral_program",
      "flash_sale_timer",
    ],
  },
  {
    label: "PREMIUM",
    icon: Crown,
    keys: ["vibe_coder_access", "white_label_branding", "api_access"],
  },
];

const ALL_FEATURE_KEYS = FEATURE_CATEGORIES.flatMap((c) => c.keys);

/* helpers */
const featureLabel = (key: string) =>
  key
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const enabledCount = (f: Record<string, boolean>) =>
  Object.values(f).filter(Boolean).length;

const blankFeatures = (): Record<string, boolean> =>
  Object.fromEntries(ALL_FEATURE_KEYS.map((k) => [k, false]));

/* ------------------------------------------------------------------ */
/*  Tier colours                                                       */
/* ------------------------------------------------------------------ */

const TIER_STYLES: Record<PlanTier, { bg: string; text: string; ring: string }> = {
  growth: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
  },
  pro: { bg: "bg-sky-50", text: "text-sky-700", ring: "ring-sky-200" },
  elite: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    ring: "ring-violet-200",
  },
  custom: {
    bg: "bg-slate-50",
    text: "text-slate-700",
    ring: "ring-slate-200",
  },
};

/* ------------------------------------------------------------------ */
/*  Plan-tier feature map (for the matrix view)                        */
/* ------------------------------------------------------------------ */

const PLAN_FEATURES: Record<"growth" | "pro" | "elite", Set<string>> = {
  growth: new Set([
    "pipeline_management",
    "contact_crm",
    "review_automation",
    "email_campaigns",
    "lead_capture_workflow",
    "followup_workflow",
    "onboarding_videos",
  ]),
  pro: new Set([
    "pipeline_management",
    "contact_crm",
    "advanced_analytics",
    "review_automation",
    "social_scheduler",
    "email_campaigns",
    "universal_chat_ai",
    "pro_chat_ai",
    "ai_knowledge_base",
    "lead_capture_workflow",
    "followup_workflow",
    "booking_confirmation",
    "upgrade_nudge",
    "onboarding_videos",
    "advanced_playbooks",
    "referral_program",
  ]),
  elite: new Set(ALL_FEATURE_KEYS),
};

/* ------------------------------------------------------------------ */
/*  Integrations catalogue                                             */
/* ------------------------------------------------------------------ */

interface IntegrationDef {
  key: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

const INTEGRATIONS: IntegrationDef[] = [
  { key: "samantha_chat", label: "AI Web Chat", description: "GHL-connected website chat widget", icon: MessageSquare },
  { key: "vapi_voice", label: "Vapi Voice Agent", description: "AI phone receptionist", icon: Mic },
  { key: "google_business", label: "Google Business Profile", description: "Review automation", icon: Star },
  { key: "stripe_payments", label: "Stripe Payments", description: "Payment processing", icon: CreditCard },
  { key: "calendar_booking", label: "Calendar & Booking", description: "Appointment scheduling", icon: Calendar },
  { key: "email_engine", label: "Email Campaigns", description: "Automated email sequences", icon: Mail },
  { key: "sms_marketing", label: "SMS Marketing", description: "Text message campaigns", icon: Smartphone },
  { key: "social_connector", label: "Social Media", description: "Facebook/Instagram", icon: Share2 },
];

const ALL_INTEGRATION_KEYS = INTEGRATIONS.map(i => i.key);
const blankIntegrations = (): Record<string, boolean> =>
  Object.fromEntries(ALL_INTEGRATION_KEYS.map((k) => [k, false]));

/* ------------------------------------------------------------------ */
/*  Website Templates catalogue                                        */
/* ------------------------------------------------------------------ */

interface TemplateDef {
  id: string;
  name: string;
  industry: string;
  description: string;
  gradient: string;
}

const TEMPLATES: TemplateDef[] = [
  { id: "tpl-auto", name: "Automotive Premium", industry: "Automotive", description: "Dynamic inventory, service booking, testimonials", gradient: "from-sky-400 to-blue-600" },
  { id: "tpl-realestate", name: "Real Estate Pro", industry: "Real Estate", description: "Property listings, virtual tours, agent profiles", gradient: "from-emerald-400 to-teal-600" },
  { id: "tpl-restaurant", name: "Restaurant Elite", industry: "Restaurant", description: "Menu showcase, online ordering, reservations", gradient: "from-orange-400 to-red-500" },
  { id: "tpl-medspa", name: "MedSpa Luxe", industry: "MedSpa", description: "Service catalog, before/after gallery, booking", gradient: "from-pink-400 to-rose-600" },
  { id: "tpl-general", name: "Business Universal", industry: "General", description: "Multi-purpose, lead generation, service pages", gradient: "from-violet-400 to-purple-600" },
  { id: "tpl-plumber", name: "Home Services Pro", industry: "Home Services", description: "Emergency booking, service areas, reviews", gradient: "from-amber-400 to-yellow-600" },
];

/* ------------------------------------------------------------------ */
/*  Seed data                                                          */
/* ------------------------------------------------------------------ */

const now = new Date().toISOString();

const SEED_SNAPSHOTS: Snapshot[] = [
  {
    id: "snap-1",
    name: "CB Growth — Universal",
    tier: "growth",
    industry: "General",
    ghlSnapshotId: "",
    notes: "",
    features: Object.fromEntries(
      ALL_FEATURE_KEYS.map((k) => [k, PLAN_FEATURES.growth.has(k)])
    ),
    integrations: { samantha_chat: true, stripe_payments: true, email_engine: true, calendar_booking: false, vapi_voice: false, google_business: false, sms_marketing: false, social_connector: false },
    templateId: "tpl-general",
    updatedAt: now,
  },
  {
    id: "snap-2",
    name: "CB Pro — Automotive",
    tier: "pro",
    industry: "Automotive",
    ghlSnapshotId: "",
    notes: "",
    features: Object.fromEntries(
      ALL_FEATURE_KEYS.map((k) => [
        k,
        PLAN_FEATURES.pro.has(k),
      ])
    ),
    integrations: { samantha_chat: true, stripe_payments: true, email_engine: true, calendar_booking: true, vapi_voice: false, google_business: true, sms_marketing: true, social_connector: true },
    templateId: "tpl-auto",
    updatedAt: now,
  },
  {
    id: "snap-3",
    name: "CB Elite — Full Suite",
    tier: "elite",
    industry: "General",
    ghlSnapshotId: "",
    notes: "",
    features: Object.fromEntries(
      ALL_FEATURE_KEYS.map((k) => [k, true])
    ),
    integrations: Object.fromEntries(ALL_INTEGRATION_KEYS.map(k => [k, true])),
    templateId: "tpl-general",
    updatedAt: now,
  },
];

/* ------------------------------------------------------------------ */
/*  Small reusable pieces                                              */
/* ------------------------------------------------------------------ */

function TierBadge({ tier }: { tier: PlanTier }) {
  const s = TIER_STYLES[tier];
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest ring-1 ${s.bg} ${s.text} ${s.ring}`}
    >
      {tier}
    </span>
  );
}

function IndustryPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-500">
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DashboardSnapshots() {
  const [view, setView] = useState<View>("gallery");
  const [snapshots, setSnapshots] = useState<Snapshot[]>(SEED_SNAPSHOTS);
  const [editingId, setEditingId] = useState<string | null>(null);

  /* Draft state for the builder */
  const [draft, setDraft] = useState<Snapshot>(makeBlankSnapshot());

  function makeBlankSnapshot(): Snapshot {
    return {
      id: `snap-${Date.now()}`,
      name: "",
      tier: "growth",
      industry: "",
      ghlSnapshotId: "",
      notes: "",
      features: blankFeatures(),
      integrations: blankIntegrations(),
      templateId: "",
      updatedAt: new Date().toISOString(),
    };
  }

  /* Actions */
  function openCreate() {
    setEditingId(null);
    setDraft(makeBlankSnapshot());
    setView("builder");
  }

  function openEdit(snap: Snapshot) {
    setEditingId(snap.id);
    setDraft({ ...snap, features: { ...snap.features }, integrations: { ...snap.integrations } });
    setView("builder");
  }

  function cloneSnapshot(snap: Snapshot) {
    const cloned: Snapshot = {
      ...snap,
      id: `snap-${Date.now()}`,
      name: `${snap.name} (Copy)`,
      features: { ...snap.features },
      integrations: { ...snap.integrations },
      updatedAt: new Date().toISOString(),
    };
    setSnapshots((prev) => [...prev, cloned]);
  }

  function deleteSnapshot(id: string) {
    setSnapshots((prev) => prev.filter((s) => s.id !== id));
  }

  function saveDraft() {
    const updated: Snapshot = {
      ...draft,
      updatedAt: new Date().toISOString(),
    };
    if (editingId) {
      setSnapshots((prev) => prev.map((s) => (s.id === editingId ? updated : s)));
    } else {
      setSnapshots((prev) => [...prev, updated]);
    }
    setView("gallery");
  }

  function toggleFeature(key: string) {
    setDraft((prev) => ({
      ...prev,
      features: { ...prev.features, [key]: !prev.features[key] },
    }));
  }

  function toggleIntegration(key: string) {
    setDraft((prev) => ({
      ...prev,
      integrations: { ...prev.integrations, [key]: !prev.integrations[key] },
    }));
  }

  function selectTemplate(id: string) {
    setDraft((prev) => ({ ...prev, templateId: prev.templateId === id ? "" : id }));
  }

  function updateMeta<K extends keyof SnapshotMeta>(field: K, value: SnapshotMeta[K]) {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }

  /* -------------------------------------------------------------- */
  /*  VIEW 1 — Gallery                                               */
  /* -------------------------------------------------------------- */

  if (view === "gallery") {
    return (
      <section className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="h-7 w-7 text-sky-600" />
            <h2 className="text-2xl text-slate-900 font-black">
              Snapshot Manager
            </h2>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] hover:from-[#0c2a4a] hover:to-[#0369a1] text-white rounded-xl py-3 px-6 text-[12px] font-bold uppercase tracking-[0.18em] transition-all shadow-sm hover:shadow-md"
          >
            <Plus className="h-4 w-4" />
            Create Snapshot
          </button>
        </div>

        {/* Card grid */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {snapshots.map((snap) => {
            const total = ALL_FEATURE_KEYS.length;
            const enabled = enabledCount(snap.features);
            return (
              <div
                key={snap.id}
                className="bg-white/95 backdrop-blur-sm border-2 border-slate-100 rounded-[24px] shadow-sm hover:shadow-md transition-all p-6 flex flex-col gap-4"
              >
                {/* Name + badges */}
                <div className="space-y-2">
                  <h3 className="text-xl text-slate-900 font-black leading-tight">
                    {snap.name || "Untitled Snapshot"}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <TierBadge tier={snap.tier} />
                    <IndustryPill label={snap.industry || "—"} />
                  </div>
                </div>

                {/* Feature count */}
                <p className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">{enabled}</span>{" "}
                  of {total} features enabled
                </p>

                {/* Timestamp */}
                <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
                  Updated{" "}
                  {new Date(snap.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => openEdit(snap)}
                    className="inline-flex items-center gap-1.5 border-2 border-slate-300 bg-transparent text-slate-600 rounded-xl py-2 px-4 text-[12px] font-bold uppercase tracking-[0.18em] hover:border-sky-400 hover:text-sky-600 transition-all"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => cloneSnapshot(snap)}
                    className="inline-flex items-center gap-1.5 border-2 border-slate-300 bg-transparent text-slate-600 rounded-xl py-2 px-4 text-[12px] font-bold uppercase tracking-[0.18em] hover:border-sky-400 hover:text-sky-600 transition-all"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Clone
                  </button>
                  <button
                    onClick={() => deleteSnapshot(snap.id)}
                    className="inline-flex items-center gap-1.5 border-2 border-red-200 bg-transparent text-red-400 rounded-xl py-2 px-4 text-[12px] font-bold uppercase tracking-[0.18em] hover:border-red-400 hover:text-red-600 transition-all ml-auto"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  /* -------------------------------------------------------------- */
  /*  VIEW 2 — Builder                                               */
  /* -------------------------------------------------------------- */

  if (view === "builder") {
    return (
      <section className="space-y-8">
        {/* Back + title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView("gallery")}
            className="inline-flex items-center justify-center h-10 w-10 rounded-xl border-2 border-slate-200 text-slate-500 hover:border-sky-400 hover:text-sky-600 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-2xl text-slate-900 font-black">
            {editingId ? "Edit Snapshot" : "Create Snapshot"}
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left — Feature Matrix */}
          <div className="lg:col-span-8 bg-white/95 backdrop-blur-sm border-2 border-slate-100 rounded-[24px] shadow-sm p-6 space-y-6">
            <h3 className="text-lg text-slate-900 font-black">Feature Matrix</h3>

            {FEATURE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.label} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-sky-600" />
                    <span className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                      {cat.label}
                    </span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {cat.keys.map((key) => {
                      const checked = draft.features[key] ?? false;
                      return (
                        <label
                          key={key}
                          className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 cursor-pointer transition-all select-none ${
                            checked
                              ? "border-sky-300 bg-sky-50/60"
                              : "border-slate-100 hover:border-slate-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleFeature(key)}
                            className="sr-only"
                          />
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                              checked
                                ? "border-sky-500 bg-sky-500 text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {checked && <Check className="h-3 w-3" />}
                          </span>
                          <span className="text-sm font-medium text-slate-700">
                            {featureLabel(key)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right — Metadata */}
          <div className="lg:col-span-4 bg-white/95 backdrop-blur-sm border-2 border-slate-100 rounded-[24px] shadow-sm p-6 space-y-5 h-fit">
            <h3 className="text-lg text-slate-900 font-black">Details</h3>

            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Snapshot Name
              </label>
              <input
                type="text"
                value={draft.name}
                onChange={(e) => updateMeta("name", e.target.value)}
                placeholder="e.g. CB Growth — Universal"
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:ring-0 focus:outline-none transition-colors"
              />
            </div>

            {/* Tier */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Plan Tier
              </label>
              <select
                value={draft.tier}
                onChange={(e) => updateMeta("tier", e.target.value as PlanTier)}
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-sky-400 focus:ring-0 focus:outline-none transition-colors"
              >
                <option value="growth">Growth</option>
                <option value="pro">Pro</option>
                <option value="elite">Elite</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Industry */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Industry
              </label>
              <input
                type="text"
                value={draft.industry}
                onChange={(e) => updateMeta("industry", e.target.value)}
                placeholder="e.g. Automotive"
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:ring-0 focus:outline-none transition-colors"
              />
            </div>

            {/* GHL Snapshot ID */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                GHL Snapshot ID
              </label>
              <input
                type="text"
                value={draft.ghlSnapshotId}
                onChange={(e) => updateMeta("ghlSnapshotId", e.target.value)}
                placeholder="snapshot_abc123"
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-mono text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:ring-0 focus:outline-none transition-colors"
              />
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Notes
              </label>
              <textarea
                value={draft.notes}
                onChange={(e) => updateMeta("notes", e.target.value)}
                rows={4}
                placeholder="Internal notes..."
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:ring-0 focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Website Template Selector */}
        <div className="bg-white/95 backdrop-blur-sm border-2 border-slate-100 rounded-[24px] shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-sky-600" />
              <h3 className="text-lg text-slate-900 font-black">Website Template</h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              {draft.templateId ? TEMPLATES.find(t => t.id === draft.templateId)?.name : 'None selected'}
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((tpl) => {
              const selected = draft.templateId === tpl.id;
              return (
                <button
                  key={tpl.id}
                  onClick={() => selectTemplate(tpl.id)}
                  className={`text-left rounded-xl border-2 overflow-hidden transition-all ${
                    selected
                      ? "border-sky-400 ring-4 ring-sky-50 shadow-md"
                      : "border-slate-100 hover:border-slate-200 hover:shadow-sm"
                  }`}
                >
                  <div className={`h-24 bg-gradient-to-br ${tpl.gradient} flex items-center justify-center`}>
                    <Globe className="h-8 w-8 text-white/60" />
                  </div>
                  <div className="p-3 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{tpl.name}</span>
                      {selected && <Check className="h-4 w-4 text-sky-500" />}
                    </div>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                      {tpl.industry}
                    </span>
                    <p className="text-xs text-slate-500">{tpl.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Integrations Panel */}
        <div className="bg-white/95 backdrop-blur-sm border-2 border-slate-100 rounded-[24px] shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-sky-600" />
              <h3 className="text-lg text-slate-900 font-black">Integrations</h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              {Object.values(draft.integrations).filter(Boolean).length} of {INTEGRATIONS.length} active
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {INTEGRATIONS.map((intg) => {
              const Icon = intg.icon;
              const active = draft.integrations[intg.key] ?? false;
              return (
                <button
                  key={intg.key}
                  onClick={() => toggleIntegration(intg.key)}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                    active
                      ? "border-sky-300 bg-sky-50/60"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    active ? "bg-sky-100 text-sky-600" : "bg-slate-50 text-slate-400"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{intg.label}</p>
                    <p className="text-[11px] text-slate-500 truncate">{intg.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={saveDraft}
            className="inline-flex items-center gap-2 border-2 border-slate-300 bg-transparent text-slate-600 rounded-xl py-3 px-6 text-[12px] font-bold uppercase tracking-[0.18em] hover:border-sky-400 hover:text-sky-600 transition-all"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </button>
          <button
            onClick={saveDraft}
            className="inline-flex items-center gap-2 bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] hover:from-[#0c2a4a] hover:to-[#0369a1] text-white rounded-xl py-3 px-6 text-[12px] font-bold uppercase tracking-[0.18em] transition-all shadow-sm hover:shadow-md"
          >
            <Upload className="h-4 w-4" />
            Push to GHL
          </button>
          <button
            onClick={() => setView("marketing")}
            className="inline-flex items-center gap-2 border-2 border-slate-300 bg-transparent text-slate-600 rounded-xl py-3 px-6 text-[12px] font-bold uppercase tracking-[0.18em] hover:border-emerald-400 hover:text-emerald-600 transition-all ml-auto"
          >
            <ClipboardList className="h-4 w-4" />
            Marketing Asset
          </button>
          <button
            onClick={() => setView("matrix")}
            className="inline-flex items-center gap-2 border-2 border-slate-300 bg-transparent text-slate-600 rounded-xl py-3 px-6 text-[12px] font-bold uppercase tracking-[0.18em] hover:border-violet-400 hover:text-violet-600 transition-all"
          >
            <LayoutGrid className="h-4 w-4" />
            Plan Matrix
          </button>
        </div>
      </section>
    );
  }

  /* -------------------------------------------------------------- */
  /*  VIEW 3 — Plan Comparison Matrix                                */
  /* -------------------------------------------------------------- */

  if (view === "matrix") {
    return (
      <section className="space-y-8">
      {/* Back + title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setView("gallery")}
          className="inline-flex items-center justify-center h-10 w-10 rounded-xl border-2 border-slate-200 text-slate-500 hover:border-sky-400 hover:text-sky-600 transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-2xl text-slate-900 font-black">
          Plan Comparison Matrix
        </h2>
      </div>

      <div className="bg-white/95 backdrop-blur-sm border-2 border-slate-100 rounded-[24px] shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-slate-100">
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Feature
              </th>
              {(["growth", "pro", "elite"] as const).map((tier) => {
                const s = TIER_STYLES[tier];
                return (
                  <th
                    key={tier}
                    className="px-6 py-4 text-center text-[12px] font-bold uppercase tracking-widest"
                  >
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-0.5 ring-1 ${s.bg} ${s.text} ${s.ring}`}
                    >
                      {tier}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          {FEATURE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <tbody key={cat.label}>
                  {/* Category header row */}
                  <tr className="bg-slate-50/70">
                    <td
                      colSpan={4}
                      className="px-6 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-sky-600" />
                        <span className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                          {cat.label}
                        </span>
                      </div>
                    </td>
                  </tr>
                  {cat.keys.map((key) => (
                    <tr
                      key={key}
                      className="border-b border-slate-50 hover:bg-slate-50/40 transition-colors"
                    >
                      <td className="px-6 py-3 text-sm font-medium text-slate-700">
                        {featureLabel(key)}
                      </td>
                      {(["growth", "pro", "elite"] as const).map((tier) => (
                        <td key={tier} className="px-6 py-3 text-center">
                          {PLAN_FEATURES[tier].has(key) ? (
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-100 text-emerald-600">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-50 text-red-400">
                              <X className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              );
            })}
        </table>
      </div>
    </section>
    );
  }

  /* -------------------------------------------------------------- */
  /*  VIEW 4 — Marketing Copy Generator                              */
  /* -------------------------------------------------------------- */

  if (view === "marketing" && draft) {
    let markdown = `# ${draft.name}\n\n`;
    markdown += `**Tier:** ${draft.tier.toUpperCase()} | **Industry:** ${draft.industry || 'General'}\n\n`;
    
    FEATURE_CATEGORIES.forEach(cat => {
      const activeKeys = cat.keys.filter(k => draft.features[k]);
      if (activeKeys.length > 0) {
        markdown += `### ${cat.label}\n`;
        activeKeys.forEach(k => {
          const copy = FEATURE_MARKETING_COPY[k];
          if (copy) {
            markdown += `**${copy.title}**: ${copy.description}\n\n`;
          }
        });
      }
    });

    const activeIntegrations = ALL_INTEGRATION_KEYS.filter(k => draft.integrations[k]);
    if (activeIntegrations.length > 0) {
      markdown += `### INTEGRATIONS\n`;
      activeIntegrations.forEach(k => {
        const copy = INTEGRATION_MARKETING_COPY[k];
        if (copy) {
          markdown += `**${copy.title}**: ${copy.description}\n\n`;
        }
      });
    }

    return (
      <section className="space-y-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setView("builder")}
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl border-2 border-slate-200 text-slate-500 hover:border-sky-400 hover:text-sky-600 transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-2xl text-slate-900 font-black">
              Marketing Asset: {draft.name}
            </h2>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(markdown);
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] hover:from-[#0c2a4a] hover:to-[#0369a1] text-white rounded-xl py-3 px-6 text-[12px] font-bold uppercase tracking-[0.18em] transition-all shadow-sm hover:shadow-md"
          >
            <Copy className="h-4 w-4" />
            Copy to Clipboard
          </button>
        </div>

        {/* Content Preview */}
        <div className="bg-white/95 backdrop-blur-sm border-2 border-slate-100 rounded-[24px] shadow-sm overflow-hidden flex-1 p-8">
          <div className="prose prose-slate max-w-none">
            <pre className="bg-slate-50 border border-slate-200 rounded-xl p-6 whitespace-pre-wrap font-sans text-sm text-slate-700 custom-scrollbar max-h-[60vh] overflow-y-auto">
              {markdown}
            </pre>
          </div>
        </div>
      </section>
    );
  }

  return null;
}

