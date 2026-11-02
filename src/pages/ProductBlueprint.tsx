import React, { useState, useEffect } from "react";
import {
  Layers,
  LayoutGrid,
  Table2,
  PackageCheck,
  PlusCircle,
  PackagePlus,
  RotateCcw,
  Cpu,
  DollarSign,
  Boxes,
  Sparkles,
  Search,
  X,
  GripHorizontal,
  GripVertical,
  Plus,
  Bot,
  Megaphone,
  MessageSquareHeart,
  Globe,
  Building2,
  ListChecks,
  MousePointerClick,
  CheckSquare,
  BookmarkCheck,
  Package,
  Pencil,
  Trash2,
  Check,
  Sliders,
  PlusSquare,
  Cloud,
} from "lucide-react";

export type BlueprintCategoryKey =
  | "AI_CREDITS"
  | "AI_SUITE"
  | "MARKETING_SOCIAL"
  | "COMMUNICATION"
  | "WEB_INFRA"
  | "ENTERPRISE_SW";

export interface BlueprintProductItem {
  id: string;
  name: string;
  category: BlueprintCategoryKey;
  price: number;
  unit: string;
  description: string;
}

export interface BlueprintBundleItem {
  id: string;
  name: string;
  description: string;
  productIds: string[];
  discountPercent: number;
  finalPrice: number;
}

const INITIAL_BLUEPRINT_PRODUCTS: BlueprintProductItem[] = [
  {
    id: "prod-credits-payg",
    name: '"Pay-as-you-go" Credits',
    category: "AI_CREDITS",
    price: 29,
    unit: "/mo base",
    description:
      "Flexible metered AI credit consumption for light automation, on-demand agent queries, and variable workloads.",
  },
  {
    id: "prod-credits-growth",
    name: '"Growth Bundle" Credits',
    category: "AI_CREDITS",
    price: 99,
    unit: "/mo",
    description:
      "Includes 5,000 monthly AI execution credits powering Managed Agents, Ask AI, and automated replies with rollover.",
  },
  {
    id: "prod-credits-pro",
    name: '"Pro Bundle" Credits',
    category: "AI_CREDITS",
    price: 249,
    unit: "/mo",
    description:
      "High-volume 20,000 monthly AI credits with priority low-latency LLM routing and high-concurrency agent workflows.",
  },
  {
    id: "prod-managed-agents",
    name: "Managed Agents",
    category: "AI_SUITE",
    price: 149,
    unit: "/mo",
    description:
      "Autonomous 24/7 AI voice and chat agents trained to qualify leads, handle customer support, and book appointments.",
  },
  {
    id: "prod-ask-ai",
    name: "Ask AI Assistant",
    category: "AI_SUITE",
    price: 49,
    unit: "/mo",
    description:
      "Embedded workspace AI copilot for instant copywriting, campaign drafting, CRM summarization, and data Q&A.",
  },
  {
    id: "prod-industry-snapshots",
    name: "Industry Snapshots",
    category: "AI_SUITE",
    price: 79,
    unit: "/mo",
    description:
      "Pre-built vertical automation blueprints, niche prompt libraries, and turnkey workflows ready for instant deployment.",
  },
  {
    id: "prod-social-suite",
    name: "Social Suite",
    category: "MARKETING_SOCIAL",
    price: 59,
    unit: "/mo",
    description:
      "Unified social planner, AI caption generator, multi-platform auto-publishing, and engagement analytics.",
  },
  {
    id: "prod-ad-manager",
    name: "Ad Manager",
    category: "MARKETING_SOCIAL",
    price: 89,
    unit: "/mo",
    description:
      "Cross-channel paid media launcher for Meta, Google, and TikTok with automated budget optimization and ROI tracking.",
  },
  {
    id: "prod-reputation-mgmt",
    name: "Reputation Management",
    category: "MARKETING_SOCIAL",
    price: 49,
    unit: "/mo",
    description:
      "Automated WhatsApp/email review requests, real-time sentiment alerts, and AI-crafted Google & Facebook review responses.",
  },
  {
    id: "prod-unified-inbox",
    name: "Message Unified Inbox",
    category: "COMMUNICATION",
    price: 69,
    unit: "/mo",
    description:
      "Centralized omnichannel inbox combining WhatsApp, Email, Web Chat, Instagram DMs, and Facebook Messenger.",
  },
  {
    id: "prod-whatsapp",
    name: "WhatsApp Integration",
    category: "COMMUNICATION",
    price: 39,
    unit: "/mo",
    description:
      "Official WhatsApp Business API sync with template broadcasts, interactive buttons, and automated drip sequences.",
  },
  {
    id: "prod-meeting-rooms",
    name: "Meeting Rooms",
    category: "COMMUNICATION",
    price: 29,
    unit: "/mo",
    description:
      "Branded HD video meeting rooms with integrated booking calendars, AI call recording, and action-item summaries.",
  },
  {
    id: "prod-smart-website",
    name: "Smart Website (Hosting)",
    category: "WEB_INFRA",
    price: 49,
    unit: "/mo",
    description:
      "High-converting drag-and-drop site & funnel builder with managed cloud hosting, global CDN, and dynamic AI personalization.",
  },
  {
    id: "prod-custom-apps",
    name: "Custom Apps",
    category: "WEB_INFRA",
    price: 199,
    unit: "/mo",
    description:
      "Extensible custom objects, webhook pipelines, white-label client portals, and tailored micro-applications.",
  },
  {
    id: "prod-listings",
    name: "Listings",
    category: "WEB_INFRA",
    price: 39,
    unit: "/mo",
    description:
      "Real-time local SEO business citation sync across 70+ directories including CARICOM Business, Google Business, and Apple Maps.",
  },
  {
    id: "prod-project-mgmt",
    name: "Project Management Software",
    category: "ENTERPRISE_SW",
    price: 89,
    unit: "/mo",
    description:
      "Enterprise Kanban boards, Gantt timelines, client deliverables tracking, team utilization, and automated SLA alerts.",
  },
  {
    id: "prod-events-mgmt",
    name: "Events Management Software",
    category: "ENTERPRISE_SW",
    price: 119,
    unit: "/mo",
    description:
      "End-to-end event registration, tiered ticketing, QR check-in flows, speaker schedules, and post-event registrant nurture.",
  },
];

const INITIAL_BLUEPRINT_BUNDLES: BlueprintBundleItem[] = [
  {
    id: "bundle-growth-blueprint",
    name: "Growth Bundle (Blueprint Standard)",
    description:
      "Core growth stack combining Growth AI Credits, Marketing & Social essentials, Unified Inbox, and Smart Website.",
    productIds: [
      "prod-credits-growth",
      "prod-ask-ai",
      "prod-social-suite",
      "prod-reputation-mgmt",
      "prod-unified-inbox",
      "prod-smart-website",
    ],
    discountPercent: 20,
    finalPrice: 299,
  },
  {
    id: "bundle-pro-blueprint",
    name: "Pro Bundle (Autonomous AI + Omnichannel)",
    description:
      "High-velocity automation package with Pro Credits, Managed Agents, Ad Manager, WhatsApp, and Listings.",
    productIds: [
      "prod-credits-pro",
      "prod-managed-agents",
      "prod-ask-ai",
      "prod-industry-snapshots",
      "prod-social-suite",
      "prod-ad-manager",
      "prod-unified-inbox",
      "prod-whatsapp",
      "prod-smart-website",
      "prod-listings",
    ],
    discountPercent: 25,
    finalPrice: 668,
  },
  {
    id: "bundle-enterprise-suite",
    name: "Enterprise Full Ecosystem Suite",
    description:
      "Complete turn-key deployment including Custom Apps, Project Management, and Events Management Software.",
    productIds: [
      "prod-credits-pro",
      "prod-managed-agents",
      "prod-industry-snapshots",
      "prod-ad-manager",
      "prod-unified-inbox",
      "prod-meeting-rooms",
      "prod-custom-apps",
      "prod-project-mgmt",
      "prod-events-mgmt",
    ],
    discountPercent: 28,
    finalPrice: 785,
  },
];

interface CategoryMeta {
  id: BlueprintCategoryKey;
  name: string;
  badgeClass: string;
  cardBorder: string;
  accentColor: string;
}

const CATEGORY_META: Record<BlueprintCategoryKey, CategoryMeta> = {
  AI_CREDITS: {
    id: "AI_CREDITS",
    name: "AI Credits Engine",
    badgeClass: "bg-indigo-50/80 text-black ring-1 ring-inset ring-indigo-600/20",
    cardBorder: "surface-card",
    accentColor: "indigo",
  },
  AI_SUITE: {
    id: "AI_SUITE",
    name: "AI Suite",
    badgeClass: "bg-violet-50/80 text-black ring-1 ring-inset ring-violet-600/20",
    cardBorder: "surface-card",
    accentColor: "violet",
  },
  MARKETING_SOCIAL: {
    id: "MARKETING_SOCIAL",
    name: "Marketing & Social",
    badgeClass: "bg-rose-50/80 text-black ring-1 ring-inset ring-rose-600/20",
    cardBorder: "surface-card",
    accentColor: "rose",
  },
  COMMUNICATION: {
    id: "COMMUNICATION",
    name: "Communication",
    badgeClass: "bg-emerald-50/80 text-black ring-1 ring-inset ring-emerald-600/20",
    cardBorder: "surface-card",
    accentColor: "emerald",
  },
  WEB_INFRA: {
    id: "WEB_INFRA",
    name: "Web & Custom Infrastructure",
    badgeClass: "bg-amber-50/80 text-black ring-1 ring-inset ring-amber-600/20",
    cardBorder: "surface-card",
    accentColor: "amber",
  },
  ENTERPRISE_SW: {
    id: "ENTERPRISE_SW",
    name: "Enterprise Management Software",
    badgeClass: "bg-cyan-50/80 text-black ring-1 ring-inset ring-cyan-600/20",
    cardBorder: "surface-card",
    accentColor: "cyan",
  },
};

const BLUEPRINT_API_URL = "https://businessesos.com/api/v1/product-blueprint";

export default function ProductBlueprint() {
  const [products, setProducts] = useState<BlueprintProductItem[]>(
    INITIAL_BLUEPRINT_PRODUCTS
  );
  const [savedBundles, setSavedBundles] = useState<BlueprintBundleItem[]>(
    INITIAL_BLUEPRINT_BUNDLES
  );

  const [currentMainView, setCurrentMainView] = useState<
    "architecture" | "table" | "bundles"
  >("architecture");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const [editingBundleId, setEditingBundleId] = useState<string | null>(null);
  const [bundleName, setBundleName] = useState<string>("Custom Growth Bundle");
  const [bundleDesc, setBundleDesc] = useState<string>(
    "Curated combination of AI, marketing, and communication tools."
  );
  const [draftProductIds, setDraftProductIds] = useState<string[]>([
    "prod-credits-growth",
    "prod-managed-agents",
    "prod-social-suite",
    "prod-unified-inbox",
    "prod-smart-website",
  ]);
  const [discountPercent, setDiscountPercent] = useState<number>(20);
  const [customPrice, setCustomPrice] = useState<number | null>(null);

  const [draggedProductId, setDraggedProductId] = useState<string | null>(null);
  const [isDropzoneActive, setIsDropzoneActive] = useState<boolean>(false);

  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [modalProductId, setModalProductId] = useState<string>("");
  const [modalProductName, setModalProductName] = useState<string>("");
  const [modalProductCategory, setModalProductCategory] =
    useState<BlueprintCategoryKey>("AI_SUITE");
  const [modalProductPrice, setModalProductPrice] = useState<string>("");
  const [modalProductUnit, setModalProductUnit] = useState<string>("/mo");
  const [modalProductDesc, setModalProductDesc] = useState<string>("");

  const [isManualModalOpen, setIsManualModalOpen] = useState<boolean>(false);

  const [syncStatus, setSyncStatus] = useState<"synced" | "saving" | "local">("synced");
  const [toasts, setToasts] = useState<Array<{ id: number; message: string }>>([]);

  const showToast = (message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  useEffect(() => {
    let mounted = true;
    async function hydrateBlueprint() {
      try {
        const storedProds = localStorage.getItem("ecosystem_products_v2");
        const storedBundles = localStorage.getItem("ecosystem_bundles_v2");
        if (storedProds && mounted) {
          const parsedProds = JSON.parse(storedProds);
          if (Array.isArray(parsedProds) && parsedProds.length > 0) {
            setProducts(parsedProds);
          }
        }
        if (storedBundles && mounted) {
          const parsedBundles = JSON.parse(storedBundles);
          if (Array.isArray(parsedBundles) && parsedBundles.length > 0) {
            setSavedBundles(parsedBundles);
          }
        }
      } catch {
        // Ignore
      }

      try {
        const res = await fetch(`${BLUEPRINT_API_URL}?key=master_v2_4`);
        if (res.ok) {
          const data = await res.json();
          if (data?.ok && mounted) {
            if (data.source === "d1") {
              if (Array.isArray(data.products) && data.products.length > 0) {
                setProducts(data.products);
                localStorage.setItem(
                  "ecosystem_products_v2",
                  JSON.stringify(data.products)
                );
              }
              if (Array.isArray(data.savedBundles)) {
                setSavedBundles(data.savedBundles);
                localStorage.setItem(
                  "ecosystem_bundles_v2",
                  JSON.stringify(data.savedBundles)
                );
              }
            }
            setSyncStatus("synced");
          }
        }
      } catch {
        if (mounted) setSyncStatus("local");
      }
    }
    hydrateBlueprint();
    return () => {
      mounted = false;
    };
  }, []);

  const persistCatalogAndBundles = async (
    nextProducts: BlueprintProductItem[],
    nextBundles: BlueprintBundleItem[]
  ) => {
    setProducts(nextProducts);
    setSavedBundles(nextBundles);
    try {
      localStorage.setItem("ecosystem_products_v2", JSON.stringify(nextProducts));
      localStorage.setItem("ecosystem_bundles_v2", JSON.stringify(nextBundles));
    } catch {
      // Ignore
    }

    setSyncStatus("saving");
    try {
      const res = await fetch(BLUEPRINT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save",
          blueprintKey: "master_v2_4",
          products: nextProducts,
          savedBundles: nextBundles,
        }),
      });
      if (res.ok) {
        setSyncStatus("synced");
      } else {
        setSyncStatus("local");
      }
    } catch {
      setSyncStatus("local");
    }
  };

  const resetToBlueprintDefaults = async () => {
    const defaultProds = JSON.parse(JSON.stringify(INITIAL_BLUEPRINT_PRODUCTS));
    const defaultBundles = JSON.parse(JSON.stringify(INITIAL_BLUEPRINT_BUNDLES));
    setEditingBundleId(null);
    setDraftProductIds([
      "prod-credits-growth",
      "prod-managed-agents",
      "prod-social-suite",
      "prod-unified-inbox",
      "prod-smart-website",
    ]);
    setDiscountPercent(20);
    setCustomPrice(null);
    setBundleName("Custom Growth Bundle");
    setBundleDesc("Curated combination of AI, marketing, and communication tools.");
    await persistCatalogAndBundles(defaultProds, defaultBundles);
    showToast("Restored original Product Ecosystem Blueprint defaults");
  };

  const validDraftProductIds = draftProductIds.filter((id) =>
    products.some((p) => p.id === id)
  );
  const selectedDraftProducts = validDraftProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is BlueprintProductItem => Boolean(p));

  const calculateDraftRetailTotal = () => {
    return selectedDraftProducts.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
  };

  const calculateDraftFinalPrice = () => {
    const retail = calculateDraftRetailTotal();
    if (retail === 0) return 0;
    if (customPrice !== null && customPrice >= 0) {
      return Math.round(customPrice);
    }
    const discount = Math.min(100, Math.max(0, Number(discountPercent) || 0));
    return Math.round(retail * (1 - discount / 100));
  };

  const totalProducts = products.length;
  const totalCatalogValue = products.reduce(
    (sum, p) => sum + (Number(p.price) || 0),
    0
  );
  const draftRetail = calculateDraftRetailTotal();
  const draftFinal = calculateDraftFinalPrice();
  const draftSavings = Math.max(0, draftRetail - draftFinal);
  const effectiveDiscountPct =
    draftRetail > 0 ? Math.round((draftSavings / draftRetail) * 100) : 0;

  const filteredProducts = products.filter((p) => {
    const matchesCat = categoryFilter === "ALL" || p.category === categoryFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const toggleProductInBundle = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    setCustomPrice(null);
    if (draftProductIds.includes(productId)) {
      setDraftProductIds((prev) => prev.filter((id) => id !== productId));
      if (prod) showToast(`Removed "${prod.name}" from bundle`);
    } else {
      setDraftProductIds((prev) => [...prev, productId]);
      if (prod) showToast(`Added "${prod.name}" to bundle`);
    }
  };

  const removeProductFromBundle = (productId: string) => {
    setCustomPrice(null);
    setDraftProductIds((prev) => prev.filter((id) => id !== productId));
  };

  const clearBundleDraft = () => {
    setEditingBundleId(null);
    setDraftProductIds([]);
    setDiscountPercent(20);
    setCustomPrice(null);
    setBundleName("New Custom Package");
    setBundleDesc("");
    showToast("Cleared bundle studio draft");
  };

  const loadBlueprintPreset = (type: "payg" | "growth" | "pro") => {
    setEditingBundleId(null);
    setCustomPrice(null);
    if (type === "payg") {
      setBundleName("Pay-as-you-go Starter Package");
      setBundleDesc(
        "Essential entry-level stack with metered AI credits, Unified Inbox, and Smart Website."
      );
      setDraftProductIds([
        "prod-credits-payg",
        "prod-ask-ai",
        "prod-unified-inbox",
        "prod-smart-website",
      ]);
      setDiscountPercent(15);
      showToast('Loaded "Pay-as-you-go Starter Package" preset');
    } else if (type === "growth") {
      setBundleName("Growth Bundle Package");
      setBundleDesc(
        "Complete growth marketing & AI automation stack for scaling teams."
      );
      setDraftProductIds([
        "prod-credits-growth",
        "prod-ask-ai",
        "prod-social-suite",
        "prod-reputation-mgmt",
        "prod-unified-inbox",
        "prod-smart-website",
      ]);
      setDiscountPercent(20);
      showToast('Loaded "Growth Bundle Package" preset');
    } else if (type === "pro") {
      setBundleName("Pro Bundle Autonomous Suite");
      setBundleDesc(
        "Full-scale autonomous agents, paid ads, WhatsApp, and enterprise capabilities."
      );
      setDraftProductIds([
        "prod-credits-pro",
        "prod-managed-agents",
        "prod-ask-ai",
        "prod-industry-snapshots",
        "prod-social-suite",
        "prod-ad-manager",
        "prod-unified-inbox",
        "prod-whatsapp",
        "prod-smart-website",
        "prod-listings",
      ]);
      setDiscountPercent(25);
      showToast('Loaded "Pro Bundle Autonomous Suite" preset');
    }
  };

  const saveCurrentBundle = async () => {
    if (validDraftProductIds.length === 0) {
      showToast("Please add at least 1 product to your bundle before saving");
      return;
    }

    const cleanName = bundleName.trim() || "Untitled Bundle Package";
    const cleanDesc =
      bundleDesc.trim() || "Custom product ecosystem bundle.";

    if (editingBundleId) {
      const existingIdx = savedBundles.findIndex((b) => b.id === editingBundleId);
      if (existingIdx !== -1) {
        const nextBundles = [...savedBundles];
        nextBundles[existingIdx] = {
          ...nextBundles[existingIdx],
          name: cleanName,
          description: cleanDesc,
          productIds: [...validDraftProductIds],
          discountPercent: effectiveDiscountPct,
          finalPrice: draftFinal,
        };
        setEditingBundleId(null);
        await persistCatalogAndBundles(products, nextBundles);
        showToast(`Updated bundle "${cleanName}"`);
        return;
      }
    }

    const newBundle: BlueprintBundleItem = {
      id: "bundle-" + Date.now(),
      name: cleanName,
      description: cleanDesc,
      productIds: [...validDraftProductIds],
      discountPercent: effectiveDiscountPct,
      finalPrice: draftFinal,
    };

    const nextBundles = [newBundle, ...savedBundles];
    await persistCatalogAndBundles(products, nextBundles);
    showToast(`Saved new bundle "${cleanName}" ($${draftFinal}/mo)`);
  };

  const loadSavedBundleIntoStudio = (bundleId: string) => {
    const bundle = savedBundles.find((b) => b.id === bundleId);
    if (!bundle) return;
    setEditingBundleId(bundle.id);
    setDraftProductIds([...bundle.productIds]);
    setDiscountPercent(bundle.discountPercent);
    setCustomPrice(bundle.finalPrice);
    setBundleName(bundle.name);
    setBundleDesc(bundle.description);
    setCurrentMainView("architecture");
    showToast(`Loaded "${bundle.name}" into Bundle Studio for editing`);
  };

  const duplicateSavedBundle = async (bundleId: string) => {
    const bundle = savedBundles.find((b) => b.id === bundleId);
    if (!bundle) return;
    const copy: BlueprintBundleItem = {
      ...bundle,
      id: "bundle-" + Date.now(),
      name: bundle.name + " (Copy)",
    };
    const nextBundles = [copy, ...savedBundles];
    await persistCatalogAndBundles(products, nextBundles);
    showToast(`Cloned "${bundle.name}"`);
  };

  const deleteSavedBundle = async (bundleId: string) => {
    const target = savedBundles.find((b) => b.id === bundleId);
    if (!target) return;
    const nextBundles = savedBundles.filter((b) => b.id !== bundleId);
    if (editingBundleId === bundleId) {
      setEditingBundleId(null);
    }
    await persistCatalogAndBundles(products, nextBundles);
    showToast(`Deleted bundle "${target.name}"`);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    productId: string
  ) => {
    setDraggedProductId(productId);
    e.dataTransfer.setData("text/plain", productId);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragEnd = () => {
    setDraggedProductId(null);
    setIsDropzoneActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    if (!isDropzoneActive) setIsDropzoneActive(true);
  };

  const handleDragLeave = () => {
    setIsDropzoneActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDropzoneActive(false);
    const productId = e.dataTransfer.getData("text/plain") || draggedProductId;
    if (!productId) return;
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    if (!draftProductIds.includes(productId)) {
      setDraftProductIds((prev) => [...prev, productId]);
      setCustomPrice(null);
      showToast(`Added "${prod.name}" to Bundle Studio`);
    } else {
      showToast(`"${prod.name}" is already in the bundle`);
    }
    setDraggedProductId(null);
  };

  const updateProductField = async (
    productId: string,
    field: keyof BlueprintProductItem,
    value: string | number
  ) => {
    const nextProducts = products.map((p) =>
      p.id === productId ? { ...p, [field]: value } : p
    );
    const target = products.find((p) => p.id === productId);
    await persistCatalogAndBundles(nextProducts, savedBundles);
    if (target) showToast(`Updated ${target.name}`);
  };

  const openProductModal = (
    productId: string | null = null,
    defaultCategory: BlueprintCategoryKey = "AI_SUITE"
  ) => {
    if (productId) {
      const prod = products.find((p) => p.id === productId);
      if (!prod) return;
      setModalProductId(prod.id);
      setModalProductName(prod.name);
      setModalProductCategory(prod.category);
      setModalProductPrice(String(prod.price));
      setModalProductUnit(prod.unit || "/mo");
      setModalProductDesc(prod.description);
    } else {
      setModalProductId("");
      setModalProductName("");
      setModalProductCategory(defaultCategory);
      setModalProductPrice("");
      setModalProductUnit("/mo");
      setModalProductDesc("");
    }
    setIsProductModalOpen(true);
  };

  const saveProductFromModal = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = modalProductName.trim();
    if (!cleanName) return;
    const numPrice = Number(modalProductPrice) || 0;
    const cleanUnit = modalProductUnit.trim() || "/mo";
    const cleanDesc = modalProductDesc.trim();

    if (modalProductId) {
      const nextProducts = products.map((p) =>
        p.id === modalProductId
          ? {
              ...p,
              name: cleanName,
              category: modalProductCategory,
              price: numPrice,
              unit: cleanUnit,
              description: cleanDesc,
            }
          : p
      );
      setIsProductModalOpen(false);
      await persistCatalogAndBundles(nextProducts, savedBundles);
      showToast(`Updated "${cleanName}" ($${numPrice}${cleanUnit})`);
    } else {
      const newProd: BlueprintProductItem = {
        id: "prod-" + Date.now(),
        name: cleanName,
        category: modalProductCategory,
        price: numPrice,
        unit: cleanUnit,
        description: cleanDesc,
      };
      const nextProducts = [...products, newProd];
      setIsProductModalOpen(false);
      await persistCatalogAndBundles(nextProducts, savedBundles);
      showToast(
        `Added "${cleanName}" to ${
          CATEGORY_META[modalProductCategory]?.name || "Catalog"
        }`
      );
    }
  };

  const deleteProduct = async (productId: string) => {
    const target = products.find((p) => p.id === productId);
    if (!target) return;
    const nextProducts = products.filter((p) => p.id !== productId);
    setDraftProductIds((prev) => prev.filter((id) => id !== productId));
    await persistCatalogAndBundles(nextProducts, savedBundles);
    showToast(`Removed "${target.name}" from catalog`);
  };

  const renderPillarProductCards = (catKey: BlueprintCategoryKey) => {
    const catProducts = filteredProducts.filter((p) => p.category === catKey);
    if (catProducts.length === 0) {
      return (
        <div className="col-span-full py-6 px-4 text-center rounded-xl border border-dashed border-black/15 bg-white">
          <p className="text-xs text-black font-medium">
            No products in this pillar match your filter.
          </p>
          <button
            type="button"
            onClick={() => openProductModal(null, catKey)}
            className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-black hover:underline cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-indigo-600" /> Add Product Here
          </button>
        </div>
      );
    }

    return catProducts.map((prod) => {
      const inBundle = validDraftProductIds.includes(prod.id);
      const isDragging = draggedProductId === prod.id;

      return (
        <div
          key={prod.id}
          draggable
          onDragStart={(e) => handleDragStart(e, prod.id)}
          onDragEnd={handleDragEnd}
          data-product-id={prod.id}
          className={`draggable-card group relative bg-white rounded-xl p-4 transition-all flex flex-col justify-between ${
            inBundle
              ? "ring-2 ring-indigo-600 border border-transparent shadow-sm"
              : "surface-card"
          } ${isDragging ? "opacity-45 scale-[0.98] border-dashed" : ""}`}
        >
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 min-w-0">
                <div
                  className="mt-0.5 text-black/40 group-hover:text-black transition-colors shrink-0"
                  title="Drag to Bundle Studio"
                >
                  <GripVertical className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4
                    onClick={() => openProductModal(prod.id)}
                    className="text-xs sm:text-sm font-bold text-black hover:underline transition-colors cursor-pointer truncate"
                    title={`Click to edit ${prod.name}`}
                  >
                    {prod.name}
                  </h4>
                </div>
              </div>

              <div className="shrink-0 flex items-baseline gap-0.5 bg-indigo-50/50 px-2.5 py-0.5 rounded-lg ring-1 ring-inset ring-black/[0.07]">
                <span className="text-xs font-mono font-bold text-black">
                  ${Number(prod.price).toLocaleString()}
                </span>
                <span className="text-[10px] text-black font-mono font-medium">
                  {prod.unit || "/mo"}
                </span>
              </div>
            </div>

            <p
              onClick={() => openProductModal(prod.id)}
              className="text-xs text-black mt-2 pl-6 line-clamp-2 leading-relaxed cursor-pointer"
              title="Click to edit description"
            >
              {prod.description}
            </p>
          </div>

          <div className="mt-3.5 pt-2.5 pl-6 border-t border-black/[0.06] flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => openProductModal(prod.id)}
                className="p-1.5 rounded-lg text-black hover:bg-indigo-50/70 transition-colors cursor-pointer"
                title="Edit Description & Price"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => deleteProduct(prod.id)}
                className="p-1.5 rounded-lg text-black hover:bg-rose-50/70 transition-colors cursor-pointer"
                title="Remove Product"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => toggleProductInBundle(prod.id)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                inBundle
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xs"
                  : "bg-white border border-black/[0.1] hover:border-indigo-600/40 hover:bg-indigo-50/40 text-black"
              }`}
            >
              {inBundle ? (
                <Check className="w-3 h-3" />
              ) : (
                <Plus className="w-3 h-3" />
              )}
              <span>{inBundle ? "In Bundle" : "Bundle"}</span>
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className="min-h-screen bg-white text-black antialiased selection:bg-indigo-600 selection:text-white flex flex-col"
      style={{
        fontFamily: "'Inter', 'Intel Clear', 'Intel', sans-serif",
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
    >
      <style>{`
        .surface-panel {
          background-color: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03),
            0 6px 16px -4px rgba(0, 0, 0, 0.04);
        }
        .surface-card {
          background-color: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
        }
        .surface-card:hover {
          border-color: rgba(79, 70, 229, 0.35);
          box-shadow: 0 4px 14px -2px rgba(0, 0, 0, 0.07);
        }
        .surface-input {
          background-color: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.12);
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .surface-input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
        }
        .draggable-card {
          cursor: grab;
        }
        .draggable-card:active {
          cursor: grabbing;
        }
        .dropzone-active {
          background-color: #ffffff !important;
          border-color: #4f46e5 !important;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
        }
      `}</style>

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-black/[0.07]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-600/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-black">
                  Product Ecosystem Architecture
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-50/70 text-black ring-1 ring-inset ring-indigo-600/20">
                  v2.4 BLUEPRINT
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-emerald-50/80 text-black ring-1 ring-inset ring-emerald-600/20">
                  <Cloud className="w-3 h-3 text-emerald-600" />
                  {syncStatus === "saving"
                    ? "Saving to D1..."
                    : syncStatus === "synced"
                    ? "D1 Cloud Synced"
                    : "Local Saved"}
                </span>
              </div>
              <p className="text-xs text-black">
                Interactive Product Catalog, Pricing Editor &amp; Drag-and-Drop
                Bundle Studio
              </p>
            </div>
          </div>

          <div className="flex items-center bg-white p-1 rounded-xl border border-black/[0.08] shadow-2xs">
            <button
              type="button"
              onClick={() => setCurrentMainView("architecture")}
              className={`view-tab flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                currentMainView === "architecture"
                  ? "font-bold bg-indigo-50/80 text-black shadow-2xs"
                  : "font-semibold text-black hover:bg-indigo-50/40"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-black" />
              <span>Blueprint &amp; Builder</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentMainView("table")}
              className={`view-tab flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                currentMainView === "table"
                  ? "font-bold bg-indigo-50/80 text-black shadow-2xs"
                  : "font-semibold text-black hover:bg-indigo-50/40"
              }`}
            >
              <Table2 className="w-3.5 h-3.5 text-black" />
              <span>Price Book Table</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentMainView("bundles")}
              className={`view-tab flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                currentMainView === "bundles"
                  ? "font-bold bg-indigo-50/80 text-black shadow-2xs"
                  : "font-semibold text-black hover:bg-indigo-50/40"
              }`}
            >
              <PackageCheck className="w-3.5 h-3.5 text-black" />
              <span>Saved Bundles</span>
              <span className="ml-1 px-1.5 py-0.2 bg-indigo-100/80 text-black rounded-full text-[10px] font-mono font-bold">
                {savedBundles.length}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openProductModal()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Product</span>
            </button>
            <button
              type="button"
              onClick={() => setIsManualModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-indigo-50/50 text-black border border-black/[0.1] shadow-2xs transition-all cursor-pointer"
            >
              <PackagePlus className="w-4 h-4 text-indigo-600" />
              <span>Manual Bundle Picker</span>
            </button>
            <button
              type="button"
              onClick={resetToBlueprintDefaults}
              title="Reset to original diagram defaults"
              className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-semibold text-black hover:bg-indigo-50/50 border border-black/[0.08] transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-black" />
              <span className="hidden md:inline">Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* KPI SUMMARY BAR */}
      <section className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
          <div className="surface-panel rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-black">
                Ecosystem Products
              </p>
              <p className="text-xl sm:text-2xl font-bold text-black mt-0.5">
                {totalProducts}
              </p>
              <p className="text-[11px] text-black mt-0.5">
                Across 6 architecture layers
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50/70 text-indigo-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
          </div>

          <div className="surface-panel rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-black">
                Full Stack Value
              </p>
              <p className="text-xl sm:text-2xl font-bold text-black font-mono mt-0.5">
                ${totalCatalogValue.toLocaleString()}
                <span className="text-xs font-normal text-black">/mo</span>
              </p>
              <p className="text-[11px] text-black mt-0.5">
                Combined standalone MRR
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50/70 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="surface-panel rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-black">
                Active Builder Draft
              </p>
              <p className="text-xl sm:text-2xl font-bold text-black font-mono mt-0.5">
                {validDraftProductIds.length}{" "}
                {validDraftProductIds.length === 1 ? "item" : "items"}
              </p>
              <p className="text-[11px] text-black mt-0.5">
                {validDraftProductIds.length > 0
                  ? `Final: $${draftFinal.toLocaleString()}/mo (Retail $${draftRetail})`
                  : "Drag or click '+' to bundle"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-violet-50/70 text-violet-600 flex items-center justify-center">
              <Boxes className="w-5 h-5" />
            </div>
          </div>

          <div className="surface-panel rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-black">
                Saved Packages
              </p>
              <p className="text-xl sm:text-2xl font-bold text-black mt-0.5">
                {savedBundles.length}
              </p>
              <p className="text-[11px] text-black font-medium mt-0.5">
                Ready for quoting &amp; export
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50/70 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN WORKSPACE */}
      <main className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1 bg-white">
        {currentMainView !== "bundles" && (
          <div className="surface-panel rounded-2xl p-3.5 mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[260px]">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, descriptions, or tiers..."
                  className="surface-input w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-white text-slate-500 placeholder:text-slate-400 rounded-xl focus:outline-none transition-all"
                />
                {searchQuery.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="surface-input text-xs sm:text-sm bg-white rounded-xl px-3 py-1.5 text-black font-medium focus:outline-none"
              >
                <option value="ALL">All Ecosystem Pillars (6)</option>
                <option value="AI_CREDITS">AI Credits Engine</option>
                <option value="AI_SUITE">AI Suite</option>
                <option value="MARKETING_SOCIAL">Marketing &amp; Social</option>
                <option value="COMMUNICATION">Communication</option>
                <option value="WEB_INFRA">Web &amp; Custom Infrastructure</option>
                <option value="ENTERPRISE_SW">
                  Enterprise Management Software
                </option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs text-black">
              <span className="hidden lg:inline-flex items-center gap-1.5 bg-white text-black px-3 py-1.5 rounded-xl border border-black/[0.07] font-medium">
                <GripHorizontal className="w-3.5 h-3.5 text-indigo-600" />
                <span>
                  Drag any product card into the Bundle Studio on the right, or
                  click <strong>+ Bundle</strong>
                </span>
              </span>
            </div>
          </div>
        )}

        {/* VIEW 1: ARCHITECTURE BLUEPRINT + BUNDLE BUILDER SPLIT */}
        {currentMainView === "architecture" && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            <div className="xl:col-span-8 space-y-5">
              {(categoryFilter === "ALL" || categoryFilter === "AI_CREDITS") && (
                <div className="surface-panel rounded-2xl border-t-4 border-t-indigo-600 overflow-hidden">
                  <div className="bg-white border-b border-black/[0.06] px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 text-black">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <h2 className="text-sm font-bold tracking-wider uppercase font-mono text-black">
                        AI Credits Engine
                      </h2>
                      <span className="text-[11px] bg-indigo-50/70 text-black px-2 py-0.5 rounded-md font-mono font-semibold">
                        Core Usage Layer
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openProductModal(null, "AI_CREDITS")}
                      className="text-xs bg-white hover:bg-indigo-50/60 text-black border border-black/[0.09] font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Add Credit Tier</span>
                    </button>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      {renderPillarProductCards("AI_CREDITS")}
                    </div>
                  </div>
                </div>
              )}

              {categoryFilter === "ALL" && (
                <div className="hidden md:flex flex-col items-center -my-2 pointer-events-none select-none">
                  <div className="w-px h-4 bg-black/15" />
                  <div className="w-3/4 h-px bg-black/15 relative">
                    <div className="absolute left-0 top-0 w-px h-3 bg-black/15" />
                    <div className="absolute left-1/3 top-0 w-px h-3 bg-black/15" />
                    <div className="absolute left-2/3 top-0 w-px h-3 bg-black/15" />
                    <div className="absolute right-0 top-0 w-px h-3 bg-black/15" />
                  </div>
                  <div className="h-2" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {(categoryFilter === "ALL" || categoryFilter === "AI_SUITE") && (
                  <div className="surface-panel rounded-2xl border-t-4 border-t-violet-600 flex flex-col overflow-hidden">
                    <div className="px-5 py-3.5 bg-white border-b border-black/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                            AI Suite
                          </h3>
                          <p className="text-[11px] text-black">
                            Autonomous Agents &amp; Intelligence
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => openProductModal(null, "AI_SUITE")}
                        className="p-1.5 rounded-xl text-black border border-black/[0.08] hover:bg-violet-50/60 transition-colors cursor-pointer"
                        title="Add Product to AI Suite"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4 space-y-3 flex-1 bg-white">
                      {renderPillarProductCards("AI_SUITE")}
                    </div>
                  </div>
                )}

                {(categoryFilter === "ALL" ||
                  categoryFilter === "MARKETING_SOCIAL") && (
                  <div className="surface-panel rounded-2xl border-t-4 border-t-rose-500 flex flex-col overflow-hidden">
                    <div className="px-5 py-3.5 bg-white border-b border-black/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                          <Megaphone className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                            Marketing &amp; Social
                          </h3>
                          <p className="text-[11px] text-black">
                            Acquisition, Ads &amp; Brand Trust
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => openProductModal(null, "MARKETING_SOCIAL")}
                        className="p-1.5 rounded-xl text-black border border-black/[0.08] hover:bg-rose-50/60 transition-colors cursor-pointer"
                        title="Add Product to Marketing & Social"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4 space-y-3 flex-1 bg-white">
                      {renderPillarProductCards("MARKETING_SOCIAL")}
                    </div>
                  </div>
                )}

                {(categoryFilter === "ALL" ||
                  categoryFilter === "COMMUNICATION") && (
                  <div className="surface-panel rounded-2xl border-t-4 border-t-emerald-600 flex flex-col overflow-hidden">
                    <div className="px-5 py-3.5 bg-white border-b border-black/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <MessageSquareHeart className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                            Communication
                          </h3>
                          <p className="text-[11px] text-black">
                            Omnichannel Messaging &amp; Video
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => openProductModal(null, "COMMUNICATION")}
                        className="p-1.5 rounded-xl text-black border border-black/[0.08] hover:bg-emerald-50/60 transition-colors cursor-pointer"
                        title="Add Product to Communication"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4 space-y-3 flex-1 bg-white">
                      {renderPillarProductCards("COMMUNICATION")}
                    </div>
                  </div>
                )}

                {(categoryFilter === "ALL" || categoryFilter === "WEB_INFRA") && (
                  <div className="surface-panel rounded-2xl border-t-4 border-t-amber-500 flex flex-col overflow-hidden">
                    <div className="px-5 py-3.5 bg-white border-b border-black/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                            Web &amp; Custom Infrastructure
                          </h3>
                          <p className="text-[11px] text-black">
                            Hosting, Custom Apps &amp; Directories
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => openProductModal(null, "WEB_INFRA")}
                        className="p-1.5 rounded-xl text-black border border-black/[0.08] hover:bg-amber-50/60 transition-colors cursor-pointer"
                        title="Add Product to Web & Infrastructure"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4 space-y-3 flex-1 bg-white">
                      {renderPillarProductCards("WEB_INFRA")}
                    </div>
                  </div>
                )}
              </div>

              {(categoryFilter === "ALL" ||
                categoryFilter === "ENTERPRISE_SW") && (
                <div className="surface-panel rounded-2xl border-t-4 border-t-cyan-600 overflow-hidden">
                  <div className="bg-white border-b border-black/[0.06] px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 text-black">
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-cyan-600" />
                      <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase font-mono text-black">
                        Enterprise Management Software
                      </h2>
                      <span className="text-[11px] bg-cyan-50/70 text-black px-2 py-0.5 rounded-md font-mono font-semibold">
                        Operations Foundation
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openProductModal(null, "ENTERPRISE_SW")}
                      className="text-xs bg-white hover:bg-cyan-50/60 text-black border border-black/[0.09] font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Add Enterprise Module</span>
                    </button>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {renderPillarProductCards("ENTERPRISE_SW")}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="xl:col-span-4 xl:sticky xl:top-20 space-y-4">
              <div className="surface-panel rounded-2xl overflow-hidden flex flex-col">
                <div className="bg-white border-b border-black/[0.07] px-5 py-4 text-black">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <PackagePlus className="w-4 h-4" />
                      </div>
                      <h2 className="font-bold text-base tracking-tight text-black">
                        Bundle Package Studio
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={clearBundleDraft}
                      className="text-[11px] font-semibold bg-white hover:bg-indigo-50/50 text-black border border-black/[0.09] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      Clear Draft
                    </button>
                  </div>
                  <p className="text-xs text-black mt-1">
                    Drag products here or click <strong>+ Bundle</strong> on any
                    item
                  </p>
                </div>

                <div className="p-4 space-y-3 border-b border-black/[0.06] bg-white">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1">
                      Package Name
                    </label>
                    <input
                      type="text"
                      value={bundleName}
                      onChange={(e) => setBundleName(e.target.value)}
                      placeholder="e.g., Growth Agency Full-Stack Bundle"
                      className="surface-input w-full px-3 py-2 text-sm font-medium bg-white text-black placeholder:text-black rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1">
                      Package Description
                    </label>
                    <input
                      type="text"
                      value={bundleDesc}
                      onChange={(e) => setBundleDesc(e.target.value)}
                      placeholder="Describe who this bundle is designed for..."
                      className="surface-input w-full px-3 py-1.5 text-xs bg-white text-black placeholder:text-black rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="pt-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-black">
                        Blueprint Presets:
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsManualModalOpen(true)}
                        className="text-[11px] font-bold text-black hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <ListChecks className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Checklist Picker</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => loadBlueprintPreset("payg")}
                        className="text-[11px] px-2.5 py-1 rounded-lg border border-black/[0.09] bg-white hover:bg-indigo-50/50 text-black font-medium transition-all cursor-pointer"
                      >
                        &quot;Pay-as-you-go&quot; Starter
                      </button>
                      <button
                        type="button"
                        onClick={() => loadBlueprintPreset("growth")}
                        className="text-[11px] px-2.5 py-1 rounded-lg border border-black/[0.09] bg-white hover:bg-indigo-50/50 text-black font-medium transition-all cursor-pointer"
                      >
                        &quot;Growth Bundle&quot;
                      </button>
                      <button
                        type="button"
                        onClick={() => loadBlueprintPreset("pro")}
                        className="text-[11px] px-2.5 py-1 rounded-lg border border-black/[0.09] bg-white hover:bg-indigo-50/50 text-black font-medium transition-all cursor-pointer"
                      >
                        &quot;Pro Bundle&quot;
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`p-3.5 min-h-[220px] max-h-[340px] overflow-y-auto transition-all border border-dashed border-indigo-300 m-3.5 rounded-xl bg-white flex flex-col ${
                    isDropzoneActive ? "dropzone-active" : ""
                  }`}
                >
                  {selectedDraftProducts.length === 0 ? (
                    <div className="m-auto text-center py-8 px-4">
                      <div className="w-11 h-11 rounded-2xl bg-indigo-50/70 text-indigo-600 flex items-center justify-center mx-auto mb-2.5">
                        <MousePointerClick className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-black">
                        Drag &amp; Drop Products Here
                      </p>
                      <p className="text-[11px] text-black mt-1 max-w-[220px] mx-auto">
                        Drag any product card from the diagram or click{" "}
                        <strong>+ Bundle</strong> to build a custom package.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsManualModalOpen(true)}
                        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-black/[0.1] text-black hover:bg-indigo-50/50 shadow-2xs transition-all cursor-pointer"
                      >
                        <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Select Products Manually</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedDraftProducts.map((prod) => {
                        const meta =
                          CATEGORY_META[prod.category] || CATEGORY_META.AI_SUITE;
                        return (
                          <div
                            key={prod.id}
                            className="flex items-center justify-between gap-2 bg-white px-3 py-2.5 rounded-xl border border-black/[0.08] shadow-2xs group"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-md ${meta.badgeClass}`}
                                >
                                  {meta.name.split(" ")[0]}
                                </span>
                                <p className="text-xs font-bold text-black truncate">
                                  {prod.name}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs font-mono font-bold text-black">
                                ${Number(prod.price)}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeProductFromBundle(prod.id)}
                                className="text-black hover:bg-rose-50 p-1 rounded-lg transition-colors cursor-pointer"
                                title="Remove from bundle"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-white border-t border-black/[0.07] text-black space-y-3">
                  <div className="flex items-center justify-between text-xs text-black font-medium">
                    <span>Standalone Retail Total:</span>
                    <span className="font-mono font-bold text-black">
                      ${draftRetail.toLocaleString()}/mo
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-black mb-1">
                        Bundle Discount (%)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={
                            customPrice !== null
                              ? effectiveDiscountPct
                              : discountPercent
                          }
                          onChange={(e) => {
                            const pct = Math.min(
                              100,
                              Math.max(0, Number(e.target.value) || 0)
                            );
                            setDiscountPercent(pct);
                            setCustomPrice(null);
                          }}
                          className="surface-input w-full bg-white rounded-xl px-3 py-1.5 text-sm font-mono font-bold text-black focus:outline-none"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-black">
                          %
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-black mb-1">
                        Custom Final ($/mo)
                      </label>
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-black">
                          $
                        </span>
                        <input
                          type="number"
                          min={0}
                          step={1}
                          value={draftFinal}
                          onChange={(e) => {
                            const custom = Math.max(
                              0,
                              Number(e.target.value) || 0
                            );
                            setCustomPrice(custom);
                          }}
                          className="surface-input w-full bg-white rounded-xl pl-6 pr-2 py-1.5 text-sm font-mono text-black font-bold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/[0.07] flex items-baseline justify-between">
                    <div>
                      <span className="text-xs font-bold text-black block">
                        Final Package Price
                      </span>
                      <span className="text-[11px] text-black font-semibold">
                        {draftSavings > 0
                          ? `Save $${draftSavings.toLocaleString()}/mo (${effectiveDiscountPct}% off)`
                          : "Standard retail pricing"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold font-mono text-black">
                        ${draftFinal.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-black">/mo</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={saveCurrentBundle}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-indigo-600/15 transition-all cursor-pointer"
                  >
                    <BookmarkCheck className="w-4 h-4" />
                    <span>
                      {editingBundleId
                        ? "Update Bundled Package"
                        : "Save Bundled Package"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="surface-panel rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-indigo-600" />
                    <span>Saved Bundled Packages</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCurrentMainView("bundles")}
                    className="text-xs text-black hover:underline font-bold cursor-pointer"
                  >
                    View All &rarr;
                  </button>
                </div>
                <div className="space-y-2">
                  {savedBundles.slice(0, 4).map((bundle) => {
                    const validProds = bundle.productIds
                      .map((id) => products.find((p) => p.id === id))
                      .filter(Boolean);
                    return (
                      <div
                        key={bundle.id}
                        className="p-3 rounded-xl border border-black/[0.07] hover:border-indigo-600/30 bg-white transition-all flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-black truncate">
                            {bundle.name}
                          </h4>
                          <p className="text-[11px] text-black">
                            {validProds.length} modules &bull;{" "}
                            <span className="text-black font-bold">
                              {bundle.discountPercent}% off
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-mono font-bold text-black">
                            ${Number(bundle.finalPrice).toLocaleString()}/mo
                          </span>
                          <button
                            type="button"
                            onClick={() => loadSavedBundleIntoStudio(bundle.id)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-50/70 text-black hover:bg-indigo-100/80 transition-colors cursor-pointer"
                            title="Load into studio to edit"
                          >
                            Load
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PRICE BOOK TABLE VIEW */}
        {currentMainView === "table" && (
          <div className="space-y-4">
            <div className="surface-panel rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-black/[0.07] flex flex-wrap items-center justify-between gap-4 bg-white">
                <div>
                  <h2 className="text-base font-bold text-black">
                    Master Product Price Book &amp; Inline Editor
                  </h2>
                  <p className="text-xs text-black">
                    Click any product name, description, or price below to update
                    it immediately across the blueprint and bundles.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openProductModal()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Row</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto bg-white">
                <table className="w-full text-left border-collapse bg-white">
                  <thead>
                    <tr className="border-b border-black/[0.08] text-[11px] font-bold uppercase tracking-wider text-black bg-white">
                      <th className="py-3.5 px-4">Product Name</th>
                      <th className="py-3.5 px-4">Architecture Pillar</th>
                      <th className="py-3.5 px-4 min-w-[280px]">
                        Description (Click to edit)
                      </th>
                      <th className="py-3.5 px-4 w-36">Price ($/mo)</th>
                      <th className="py-3.5 px-4 text-center">
                        In Active Draft
                      </th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.06] text-sm text-black bg-white">
                    {filteredProducts.map((prod) => {
                      const inBundle = validDraftProductIds.includes(prod.id);
                      return (
                        <tr
                          key={prod.id}
                          className="bg-white hover:bg-indigo-50/20 transition-colors"
                        >
                          <td className="py-3 px-4 font-semibold text-black">
                            <input
                              type="text"
                              defaultValue={prod.name}
                              onBlur={(e) => {
                                if (e.target.value !== prod.name) {
                                  updateProductField(
                                    prod.id,
                                    "name",
                                    e.target.value
                                  );
                                }
                              }}
                              className="w-full bg-white text-black border border-transparent hover:border-black/15 focus:border-indigo-600 rounded-lg px-2 py-1 text-xs sm:text-sm font-semibold focus:outline-none"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={prod.category}
                              onChange={(e) =>
                                updateProductField(
                                  prod.id,
                                  "category",
                                  e.target.value as BlueprintCategoryKey
                                )
                              }
                              className="surface-input text-xs font-semibold rounded-lg px-2.5 py-1 bg-white text-black focus:outline-none cursor-pointer"
                            >
                              {Object.values(CATEGORY_META).map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                  {cat.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <input
                              type="text"
                              defaultValue={prod.description}
                              onBlur={(e) => {
                                if (e.target.value !== prod.description) {
                                  updateProductField(
                                    prod.id,
                                    "description",
                                    e.target.value
                                  );
                                }
                              }}
                              className="w-full bg-white text-black border border-transparent hover:border-black/15 focus:border-indigo-600 rounded-lg px-2 py-1 text-xs focus:outline-none"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="relative flex items-center">
                              <span className="text-xs font-mono font-bold text-black mr-1">
                                $
                              </span>
                              <input
                                type="number"
                                min={0}
                                step={1}
                                defaultValue={Number(prod.price)}
                                onBlur={(e) => {
                                  const nextPrice = Number(e.target.value) || 0;
                                  if (nextPrice !== Number(prod.price)) {
                                    updateProductField(
                                      prod.id,
                                      "price",
                                      nextPrice
                                    );
                                  }
                                }}
                                className="surface-input w-24 bg-white rounded-lg px-2 py-1 text-xs font-mono font-bold text-black focus:outline-none"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => toggleProductInBundle(prod.id)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                                inBundle
                                  ? "bg-indigo-600 text-white"
                                  : "bg-white border border-black/[0.1] text-black hover:bg-indigo-50/50"
                              }`}
                            >
                              {inBundle ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                <Plus className="w-3.5 h-3.5" />
                              )}
                              <span>{inBundle ? "Bundled" : "Add"}</span>
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => deleteProduct(prod.id)}
                              className="p-1.5 rounded-lg text-black hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: SAVED BUNDLED PACKAGES GALLERY */}
        {currentMainView === "bundles" && (
          <div className="space-y-5">
            <div className="surface-panel rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-black">
                  Bundled Ecosystem Packages
                </h2>
                <p className="text-xs text-black">
                  Manage your pre-packaged offerings, load them back into the
                  studio to edit, or add a new bundle manually.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                >
                  <PlusSquare className="w-4 h-4" />
                  <span>Create Bundle Manually</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentMainView("architecture")}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-black/[0.1] hover:bg-indigo-50/50 text-black cursor-pointer"
                >
                  <LayoutGrid className="w-4 h-4 text-black" />
                  <span>Open Drag &amp; Drop Studio</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {savedBundles.map((bundle) => {
                const validProds = bundle.productIds
                  .map((id) => products.find((p) => p.id === id))
                  .filter((p): p is BlueprintProductItem => Boolean(p));
                const retailSum = validProds.reduce(
                  (s, p) => s + Number(p.price),
                  0
                );
                const savings = Math.max(0, retailSum - bundle.finalPrice);

                return (
                  <div
                    key={bundle.id}
                    className="surface-panel rounded-2xl border-t-4 border-t-indigo-600 transition-all flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      <div className="p-5 border-b border-black/[0.06] bg-white text-black">
                        <div className="flex items-start justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-50/80 text-black ring-1 ring-inset ring-indigo-600/20">
                            {validProds.length} Ecosystem Products
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-emerald-50/80 text-black ring-1 ring-inset ring-emerald-600/20">
                            Save ${savings}/mo ({bundle.discountPercent}%)
                          </span>
                        </div>
                        <h3 className="text-base font-bold mt-2.5 text-black">
                          {bundle.name}
                        </h3>
                        <p className="text-xs text-black mt-1 line-clamp-2">
                          {bundle.description}
                        </p>

                        <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-baseline justify-between">
                          <span className="text-xs text-black line-through font-mono">
                            Retail: ${retailSum}/mo
                          </span>
                          <div>
                            <span className="text-2xl font-extrabold font-mono text-black">
                              ${Number(bundle.finalPrice).toLocaleString()}
                            </span>
                            <span className="text-xs font-bold text-black">
                              /mo
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 space-y-2 max-h-60 overflow-y-auto bg-white">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-black mb-2">
                          Included Architecture Modules:
                        </p>
                        {validProds.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center justify-between text-xs py-1.5 border-b border-black/[0.05] last:border-0"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                              <span className="font-medium text-black truncate">
                                {p.name}
                              </span>
                            </div>
                            <span className="font-mono font-bold text-black text-[11px] shrink-0">
                              ${p.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-white border-t border-black/[0.06] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => deleteSavedBundle(bundle.id)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-black border border-black/[0.09] hover:bg-rose-50 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-black" />
                        <span>Delete</span>
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => duplicateSavedBundle(bundle.id)}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-black bg-white border border-black/[0.09] hover:bg-indigo-50/50 transition-colors cursor-pointer"
                        >
                          Clone
                        </button>
                        <button
                          type="button"
                          onClick={() => loadSavedBundleIntoStudio(bundle.id)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Edit in Studio</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: ADD / EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-black/[0.08] shadow-2xl overflow-hidden">
            <div className="px-6 py-4 bg-white border-b border-black/[0.07] text-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Boxes className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-black">
                  {modalProductId
                    ? "Edit Ecosystem Product"
                    : "Add New Ecosystem Product"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="text-black hover:opacity-75 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={saveProductFromModal}
              className="p-6 space-y-4 bg-white text-black"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">
                    Product / Module Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={modalProductName}
                    onChange={(e) => setModalProductName(e.target.value)}
                    placeholder="e.g., AI Voice Receptionist"
                    className="surface-input w-full px-3.5 py-2 text-sm bg-white text-black placeholder:text-black rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">
                    Architecture Pillar *
                  </label>
                  <select
                    required
                    value={modalProductCategory}
                    onChange={(e) =>
                      setModalProductCategory(
                        e.target.value as BlueprintCategoryKey
                      )
                    }
                    className="surface-input w-full px-3 py-2 text-sm text-black rounded-xl focus:outline-none bg-white"
                  >
                    <option value="AI_CREDITS">AI Credits Engine</option>
                    <option value="AI_SUITE">AI Suite</option>
                    <option value="MARKETING_SOCIAL">
                      Marketing &amp; Social
                    </option>
                    <option value="COMMUNICATION">Communication</option>
                    <option value="WEB_INFRA">
                      Web &amp; Custom Infrastructure
                    </option>
                    <option value="ENTERPRISE_SW">
                      Enterprise Management Software
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">
                    Monthly Price ($ USD) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black font-mono font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      required
                      min={0}
                      step="0.01"
                      value={modalProductPrice}
                      onChange={(e) => setModalProductPrice(e.target.value)}
                      placeholder="79"
                      className="surface-input w-full pl-7 pr-3 py-2 text-sm font-mono bg-white text-black placeholder:text-black rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">
                  Billing / Unit Label
                </label>
                <input
                  type="text"
                  value={modalProductUnit}
                  onChange={(e) => setModalProductUnit(e.target.value)}
                  placeholder="e.g., /mo, /credit, /seat"
                  className="surface-input w-full px-3.5 py-2 text-sm bg-white text-black placeholder:text-black rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">
                  Product Description &amp; Capabilities *
                </label>
                <textarea
                  rows={3}
                  required
                  value={modalProductDesc}
                  onChange={(e) => setModalProductDesc(e.target.value)}
                  placeholder="Describe what this module delivers, key features, or usage limits..."
                  className="surface-input w-full px-3.5 py-2 text-sm bg-white text-black placeholder:text-black rounded-xl focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-black/[0.07] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-black border border-black/[0.1] hover:bg-indigo-50/50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: MANUAL BUNDLE CHECKLIST PICKER */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-black/[0.08] shadow-2xl overflow-hidden">
            <div className="px-6 py-4 bg-white border-b border-black/[0.07] text-black flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ListChecks className="w-5 h-5 text-indigo-600" />
                <div>
                  <h3 className="font-bold text-base text-black">
                    Manual Bundle Package Builder
                  </h3>
                  <p className="text-xs text-black">
                    Check or uncheck products across the ecosystem to include in
                    your current bundle
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsManualModalOpen(false)}
                className="text-black hover:opacity-75 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-white text-black">
              {Object.values(CATEGORY_META).map((cat) => {
                const catProducts = products.filter(
                  (p) => p.category === cat.id
                );
                if (catProducts.length === 0) return null;
                return (
                  <div key={cat.id} className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-md ${cat.badgeClass}`}
                      >
                        {cat.name}
                      </span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {catProducts.map((prod) => {
                        const checked = validDraftProductIds.includes(prod.id);
                        return (
                          <label
                            key={prod.id}
                            className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                              checked
                                ? "ring-2 ring-indigo-600 border-transparent bg-indigo-50/20"
                                : "border-black/[0.08] hover:border-black/20 bg-white"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleProductInBundle(prod.id)}
                              className="mt-1 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-bold text-black truncate">
                                  {prod.name}
                                </span>
                                <span className="text-xs font-mono font-bold text-black shrink-0">
                                  ${prod.price}
                                </span>
                              </div>
                              <p className="text-[11px] text-black line-clamp-1 mt-0.5">
                                {prod.description}
                              </p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-6 py-4 bg-white border-t border-black/[0.07] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-xs text-black font-medium block">
                    Selected Products
                  </span>
                  <span className="text-sm font-bold text-black">
                    {validDraftProductIds.length}{" "}
                    {validDraftProductIds.length === 1 ? "product" : "products"}
                  </span>
                </div>
                <div className="h-6 w-px bg-black/10" />
                <div>
                  <span className="text-xs text-black font-medium block">
                    Combined Retail Value
                  </span>
                  <span className="text-sm font-bold font-mono text-black">
                    ${draftRetail.toLocaleString()}/mo
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCustomPrice(null);
                    setDraftProductIds([]);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-black border border-black/[0.1] hover:bg-indigo-50/50 cursor-pointer"
                >
                  Deselect All
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCustomPrice(null);
                    setDraftProductIds(products.map((p) => p.id));
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-black border border-black/[0.1] hover:bg-indigo-50/50 cursor-pointer"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm cursor-pointer"
                >
                  Apply to Bundle Studio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATIONS */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-black/[0.08] bg-white text-black shadow-lg text-xs font-bold transition-all duration-200"
          >
            <span>{t.message}</span>
            <button
              type="button"
              onClick={() =>
                setToasts((prev) => prev.filter((item) => item.id !== t.id))
              }
              className="text-black hover:opacity-70"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
