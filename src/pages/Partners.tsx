import React, { useState, useEffect, useMemo } from "react";
import {
  Check,
  Calculator,
  FileSignature,
  ArrowUpRight,
  ArrowRight,
  Layers,
  Printer,
  Video,
  Megaphone,
} from "lucide-react";

type PartnerTab = "earnings" | "catalog" | "videos" | "swipes" | "onboard";

interface VideoAsset {
  id: string;
  badge: string;
  title: string;
  duration: string;
  summary: string;
  videoUrl: string;
  posterUrl: string;
  appUrl: string;
}

const VIDEO_VAULT: VideoAsset[] = [
  {
    id: "vsl-master-studio",
    badge: "Master Studio Tour",
    title: "1. Novelty Web Solutions Studio & AI Ecosystem Overview",
    duration: "Full Tour",
    summary:
      "Executive walkthrough of our websites, searchable online stores, 24/7 AI receptionists, and multi-industry operating systems.",
    videoUrl:
      "https://assets.cdn.filesafe.space/PiPGhGQUHooNH7p8no1p/media/68a885647dc6b06ae373b7fb.mp4#t=0.5",
    posterUrl: "https://noveltywebsolutions.com/images/showcase/showcase-web-ecommerce.jpg",
    appUrl: "https://noveltywebsolutions.com",
  },
  {
    id: "vsl-dispatch-master",
    badge: "Service Dispatch OS",
    title: "2. Master Service Dispatch OS & Command Radar Tour",
    duration: "2:10",
    summary:
      "Complete tour of the dispatch command center, live GPS fleet radar, driver mobile workflow, and linked Business OS back-office.",
    videoUrl: "https://servicedispatch.app/videos/service-dispatch-master-walkthrough.mp4",
    posterUrl: "https://servicedispatch.app/videos/vsl-poster.svg",
    appUrl: "https://servicedispatch.app",
  },
  {
    id: "vsl-auto-rescue",
    badge: "Standalone App 01",
    title: "3. Auto Rescue, Roadside & Towing App VSL",
    duration: "1:15",
    summary:
      "1-tap stranded driver GPS pin drop, live radar map, pre-tow walk-around photos, glass signature, and instant invoice.",
    videoUrl: "https://servicedispatch.app/videos/vsl-auto-rescue.mp4",
    posterUrl: "https://servicedispatch.app/videos/vsl-poster.svg",
    appUrl: "https://servicedispatch.app/niche/auto-rescue",
  },
  {
    id: "vsl-food-delivery",
    badge: "Standalone App 02",
    title: "4. Food, Restaurant & Courier Delivery App VSL",
    duration: "1:15",
    summary:
      "Direct restaurant and pharmacy ordering with 0% marketplace commission, live rider GPS tracking, and doorstep photo proof.",
    videoUrl: "https://servicedispatch.app/videos/vsl-food-delivery.mp4",
    posterUrl: "https://servicedispatch.app/videos/vsl-poster.svg",
    appUrl: "https://servicedispatch.app/niche/food-delivery",
  },
  {
    id: "vsl-hvac-trades",
    badge: "Standalone App 03",
    title: "5. HVAC, Plumbing & Electrical Trades App VSL",
    duration: "1:15",
    summary:
      "Service van scheduling, technician repair checklists, before-and-after job photos, and on-site quote & invoice sign-off.",
    videoUrl: "https://servicedispatch.app/videos/vsl-hvac-trades.mp4",
    posterUrl: "https://servicedispatch.app/videos/vsl-poster.svg",
    appUrl: "https://servicedispatch.app/niche/hvac-trades",
  },
  {
    id: "vsl-security-patrol",
    badge: "Standalone App 04",
    title: "6. Mobile Security Patrol & Alarm Response VSL",
    duration: "1:15",
    summary:
      "Rapid alarm response dispatch, guard patrol checkpoints, and timestamped perimeter verification for commercial clients.",
    videoUrl: "https://servicedispatch.app/videos/vsl-security-patrol.mp4",
    posterUrl: "https://servicedispatch.app/videos/vsl-poster.svg",
    appUrl: "https://servicedispatch.app/niche/security-patrol",
  },
  {
    id: "vsl-mobile-detailing",
    badge: "Standalone App 05",
    title: "7. Mobile Auto Detailing, Fleet Wash & Marine VSL",
    duration: "1:15",
    summary:
      "Mobile wash booking packages, route grouping, before-and-after photo galleries, and recurring commercial fleet invoicing.",
    videoUrl: "https://servicedispatch.app/videos/vsl-mobile-detailing.mp4",
    posterUrl: "https://servicedispatch.app/videos/vsl-poster.svg",
    appUrl: "https://servicedispatch.app/niche/mobile-detailing",
  },
  {
    id: "vsl-commercial-logistics",
    badge: "Standalone App 06",
    title: "8. Commercial Freight, Delivery & Cold-Chain VSL",
    duration: "1:15",
    summary:
      "Port and warehouse load manifests, pallet condition photos, and digital proof-of-delivery signatures for same-day invoicing.",
    videoUrl: "https://servicedispatch.app/videos/vsl-commercial-logistics.mp4",
    posterUrl: "https://servicedispatch.app/videos/vsl-poster.svg",
    appUrl: "https://servicedispatch.app/niche/commercial-logistics",
  },
];

function encodeStealthTag(code: string, currency: string = "USD"): string {
  const cleanCode =
    (code || "your-id")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "") || "your-id";
  const cleanCurr = (currency || "USD").trim().toUpperCase();
  const raw = `nws|${cleanCode}|${cleanCurr}`;
  let hex = "";
  for (let i = 0; i < raw.length; i++) {
    hex += raw.charCodeAt(i).toString(16).padStart(2, "0");
  }
  return `nx_${hex}`;
}

const FLAGSHIP_NICHE_FUNNELS = [
  {
    id: "funnel-business-os",
    badge: "Flagship Funnel 01",
    title: "1. Business OS Flagship Hub",
    funnelUrl: "https://go.businessesos.com/business-os",
    pricingSummary: "$0 Stage 0 • $97 / $197 / $297/mo Tier 1",
    desc: "3-button POS, 24/7 online booking, automated WhatsApp reminders, and Cari Biz Pay (CBPay) checkout in one workspace.",
    whatsappPitch:
      "Take a look at Business OS — 3-button POS, 24/7 online booking, automated WhatsApp reminders, and CBPay checkout in one workspace:",
  },
  {
    id: "funnel-dispatch",
    badge: "Flagship Funnel 02",
    title: "2. Service Dispatch OS (Towing, Roadside, Courier & Fleet)",
    funnelUrl: "https://go.businessesos.com/dispatch",
    pricingSummary: "$197 / $297 / $497/mo App • $1,497/mo Full Suite",
    desc: "1-tap customer GPS pin drop, live dispatcher map, driver job checklist, photo proof, and automated WhatsApp tracking.",
    whatsappPitch:
      "Check out Service Dispatch OS — customers drop a 1-tap GPS pin from their phone browser, your dispatcher assigns the nearest truck, and the customer gets a live WhatsApp tracking map:",
  },
  {
    id: "funnel-ticketflows",
    badge: "Flagship Funnel 03",
    title: "3. TicketFlows (Quarries, Haulage & Aggregates)",
    funnelUrl: "https://go.businessesos.com/ticketflows",
    pricingSummary: "$497/mo App • $1,497/mo Full Haulage Suite",
    desc: "Digital quarry & haulage load tickets, offline-resilient scale house sign-off, and automated subcontractor tonnage settlement.",
    whatsappPitch:
      "Here is TicketFlows — digital quarry & haulage load tickets, offline-resilient scale house sign-off, and automated subcontractor tonnage settlement:",
  },
  {
    id: "funnel-barbers",
    badge: "Flagship Funnel 04",
    title: "4. Barber, Salon & Spa OS (CariSplit Edition)",
    funnelUrl: "https://go.businessesos.com/barbers",
    pricingSummary: "$97 / $197 / $297/mo Tier 1",
    desc: "1-tap between-cuts checkout, automatic 60/40 booth-renter chair split payouts, and CariProof verified income certificates.",
    whatsappPitch:
      "See the Barber, Salon & Spa OS with CariSplit — 1-tap between-cuts checkout, automatic 60/40 chair split payouts, and CariProof income certificates:",
  },
  {
    id: "funnel-automotive",
    badge: "Flagship Funnel 05",
    title: "5. Automotive Service, Tyre & Detailing OS",
    funnelUrl: "https://go.businessesos.com/automotive",
    pricingSummary: "$197 / $297 / $997 / $1,497/mo",
    desc: "Service bay scheduling, vehicle inspection photos, automated WhatsApp ready-for-pickup alerts, and digital customer loyalty.",
    whatsappPitch:
      "Check out Automotive Service, Tyre & Detailing OS — service bay scheduling, vehicle inspection photos, automated WhatsApp ready-for-pickup alerts, and digital loyalty:",
  },
  {
    id: "funnel-field-services",
    badge: "Flagship Funnel 06",
    title: "6. Home & Commercial Field Services OS (AC/HVAC, Solar, Plumbing, Pest)",
    funnelUrl: "https://go.businessesos.com/field-services",
    pricingSummary: "$197 / $297 / $997 / $1,497/mo",
    desc: "Quote-to-job dispatch, technician GPS routing, before/after photo sign-off, and recurring maintenance reminders.",
    whatsappPitch:
      "Take a look at Field Services OS for AC, Solar, Plumbing & Pest — quote-to-job dispatch, technician GPS routing, photo sign-off, and recurring maintenance reminders:",
  },
  {
    id: "funnel-tourism",
    badge: "Flagship Funnel 07",
    title: "7. Tourism, Catamaran Charter & Villa Booking OS",
    funnelUrl: "https://go.businessesos.com/tourism",
    pricingSummary: "$197 / $297 / $997 / $1,497/mo",
    desc: "Direct guest reservations, digital passenger waivers, instant deposit checkout, and 24/7 WhatsApp & Voice AI concierge.",
    whatsappPitch:
      "See Tourism, Catamaran Charter & Villa Booking OS — instant guest reservations, digital waivers, deposit checkout, and 24/7 WhatsApp concierge:",
  },
  {
    id: "funnel-clinics",
    badge: "Flagship Funnel 08",
    title: "8. Clinics, Dental, Chiro & Veterinary OS",
    funnelUrl: "https://go.businessesos.com/clinics",
    pricingSummary: "$197 / $297 / $997 / $1,497/mo",
    desc: "Digital patient intake forms, automated WhatsApp appointment confirmations, recall reminders, and front-desk checkout.",
    whatsappPitch:
      "Check out Clinics, Dental, Chiro & Veterinary OS — patient intake forms, automated WhatsApp appointment confirmations, recall reminders, and front-desk checkout:",
  },
  {
    id: "funnel-enterprise",
    badge: "Enterprise & MSB Funnel",
    title: "9. Enterprise & Regional Transformation (Tier 2 Commercial Suite)",
    funnelUrl: "https://go.noveltywebsolutions.com/enterprise",
    pricingSummary: "$997 / $1,497 / $2,997–$5,000+/mo",
    desc: "Turn-key commercial websites, multi-branch operations, dedicated 24/7 Voice & WhatsApp AI workforce, and custom studio engineering.",
    whatsappPitch:
      "Explore the Novelty Web Solutions Enterprise & Commercial Growth Suite — turn-key commercial websites, multi-branch operations, and 24/7 AI workforce:",
  },
];

export default function Partners() {
  const [activeTab, setActiveTab] = useState<PartnerTab>("earnings");
  const [partnerId, setPartnerId] = useState<string>("");
  const [amId, setAmId] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(null);

  // Prospect Custom Branded Link Builder State
  const [prospectBrand, setProspectBrand] = useState<string>("");
  const [prospectOffer, setProspectOffer] = useState<string>("");
  const [prospectTargetApp, setProspectTargetApp] = useState<string>(
    "https://servicedispatch.app/niche/auto-rescue"
  );

  // Interactive 2-Tier Commission Calculator State (10% Standard -> 15% Automatic Volume Upgrade at 36+ Paid Signups)
  const [calcTier1Clients, setCalcTier1Clients] = useState<number>(20);
  const [calcTier1PlanUsd, setCalcTier1PlanUsd] = useState<number>(197);
  const [calcTier2ProClients, setCalcTier2ProClients] = useState<number>(5);

  // Onboarding Form State
  const [partnerTrack] = useState<string>(
    "Customer & Business Owner Affiliate (Offset & Exceed Your Monthly Bill - 10% to 15%)"
  );
  const [fullName, setFullName] = useState<string>("");
  const [whatsappPhone, setWhatsappPhone] = useState<string>("");
  const [personalEmail, setPersonalEmail] = useState<string>("");
  const [payoutMethod] = useState<string>(
    "Local Bank Deposit (Barbados / CARICOM Direct Transfer)"
  );
  const [signatureName, setSignatureName] = useState<string>("");
  const [agreedTerms, setAgreedTerms] = useState<boolean>(true);
  const [activatedPack, setActivatedPack] = useState<{
    name: string;
    handle: string;
    email: string;
    track: string;
    payout: string;
    signedAt: string;
  } | null>(null);

  const sanitizeSlug = (raw: string) => {
    return (raw || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, "");
  };

  const effectiveRef = partnerId.trim() || "your-id";
  const cleanId = (amId.trim() || effectiveRef).replace(/[^a-zA-Z0-9_-]/g, "") || "your-id";
  const stealthToken = useMemo(() => encodeStealthTag(effectiveRef, "USD"), [effectiveRef]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get("ref") || params.get("partner") || params.get("am_id");
    if (refParam) {
      const clean = sanitizeSlug(refParam);
      if (clean) {
        setPartnerId(clean);
        window.localStorage.setItem("nws_partner_ref_v3", clean);
      }
    } else {
      const saved = window.localStorage.getItem("nws_partner_ref_v3");
      if (saved) {
        setPartnerId(sanitizeSlug(saved));
      }
    }
    const amIdParam = params.get("am_id");
    if (amIdParam && amIdParam.trim()) {
      const cleanAm = amIdParam.trim().replace(/[^a-zA-Z0-9_-]/g, "");
      setAmId(cleanAm);
      window.localStorage.setItem("nws_partner_am_id_v3", cleanAm);
    } else {
      const savedAm = window.localStorage.getItem("nws_partner_am_id_v3");
      if (savedAm) setAmId(savedAm);
    }
    const savedPack = window.localStorage.getItem("nws_partner_activated_pack_v3");
    if (savedPack) {
      try {
        const parsed = JSON.parse(savedPack);
        if (parsed?.handle) {
          setActivatedPack(parsed);
          setPartnerId(parsed.handle);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const triggerToast = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.title === title ? null : prev));
    }, 3200);
  };

  const copyToClipboard = (id: string, text: string, toastTitle = "Copied to Clipboard!") => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    triggerToast(toastTitle, text.length > 90 ? text.slice(0, 90) + "..." : text);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const buildTrackedUrl = (baseUrl: string, extraParams: Record<string, string | undefined> = {}) => {
    try {
      const url = new URL(baseUrl);
      url.searchParams.set("am_id", cleanId);
      url.searchParams.set("s", stealthToken);
      Object.entries(extraParams).forEach(([k, v]) => {
        if (v && v.trim()) url.searchParams.set(k, v.trim());
      });
      return url.toString();
    } catch {
      const sep = baseUrl.includes("?") ? "&" : "?";
      return `${baseUrl}${sep}am_id=${encodeURIComponent(cleanId)}&s=${stealthToken}`;
    }
  };

  const customProspectUrl = useMemo(() => {
    return buildTrackedUrl(prospectTargetApp, {
      brand: prospectBrand.trim() || undefined,
      offer: prospectOffer || undefined,
    });
  }, [prospectTargetApp, prospectBrand, prospectOffer, cleanId, stealthToken]);

  const calcResults = useMemo(() => {
    const totalClients = calcTier1Clients + calcTier2ProClients;
    const ratePct = totalClients >= 36 ? 15 : 10;
    const rateMultiplier = ratePct / 100;
    const tier1CommPerClient = calcTier1PlanUsd * rateMultiplier;
    const tier1MonthlyUsd = calcTier1Clients * tier1CommPerClient;
    const tier2MonthlyUsd = calcTier2ProClients * (997 * rateMultiplier);
    const totalMonthlyUsd = Math.round(tier1MonthlyUsd + tier2MonthlyUsd);
    const totalYearlyUsd = totalMonthlyUsd * 12;
    return {
      totalClients,
      ratePct,
      tier1CommPerClient,
      tier1MonthlyUsd: Math.round(tier1MonthlyUsd),
      tier2MonthlyUsd: Math.round(tier2MonthlyUsd),
      totalMonthlyUsd,
      totalYearlyUsd,
    };
  }, [calcTier1Clients, calcTier1PlanUsd, calcTier2ProClients]);

  const applyCalcPreset = (t1Clients: number, planUsd: number, t2Clients: number) => {
    setCalcTier1Clients(t1Clients);
    setCalcTier1PlanUsd(planUsd);
    setCalcTier2ProClients(t2Clients);
  };

  const swipesList = useMemo(() => {
    const mainStudioLink = buildTrackedUrl("https://noveltywebsolutions.com");
    const bosLink = buildTrackedUrl("https://businessesos.com");
    const autoRescueLink = buildTrackedUrl("https://servicedispatch.app/niche/auto-rescue");
    const foodDeliveryLink = buildTrackedUrl("https://servicedispatch.app/niche/food-delivery");
    const sovereignLink = buildTrackedUrl("https://noveltywebsolutions.com/demos/sovereign-sands");
    return [
      {
        id: "swipe-1",
        badge: "Message 01 • Two-Tier Overview",
        channel: "WhatsApp / Email",
        title: "1. Business Owner Intro (Tier 1 Standard & Tier 2 Pro Full-Service)",
        body: `Hey [Name]! Hope business is going great.\n\nI partnered with Novelty Web Solutions (${mainStudioLink}), and we have a simple two-tier setup depending on your business size:\n\n• Tier 1 - Standard (Business OS for Barbers, Salons, Sole Traders & Small Local Shops): $97, $197, or $297/mo USD.\n• Tier 2 - Pro Full-Service Setup (Novelty Web Solutions for Larger & High-Earning Companies): Turn-key commercial websites, searchable online stores, 24/7 AI systems, and multi-branch setups at $997, $1,497, $2,997/mo USD, or Custom starting at $5,000+ USD.\n\nTake a 60-second look here:\n• Tier 1 Standard (Business OS): ${bosLink}\n• Tier 2 Pro Full-Service (Main Studio): ${mainStudioLink}\n\nWant me to set up a quick 10-minute walkthrough for you this week?`,
      },
      {
        id: "swipe-2",
        badge: "Message 02 • Barber, Salon & Local Shop",
        channel: "WhatsApp / DM",
        title: "2. Barber, Salon & Local Shop Pitch ($97 / $197 / $297 USD)",
        body: `Hey [Name]! Thought of your shop when I saw this.\n\nOur Tier 1 Standard platform (Business OS) lets clients book 24/7 online, runs your live walk-in queue and Counter POS (BiMPay, 1stPay, WiPay, Cash & Card), handles Owner Chairs + Independent Booth Renters + Commission Staff, and tracks your True Net Profit in one place.\n\nPlans are super straightforward:\n• Starter Plan: $97/mo USD\n• Growth Plan: $197/mo USD\n• Scale Plan: $297/mo USD\n\nTest the live interactive demo here:\n-> ${bosLink}`,
      },
      {
        id: "swipe-3",
        badge: "Message 03 • Fleet & Field Service",
        channel: "WhatsApp / Email",
        title: "3. Field & Fleet Pitch (Service Dispatch OS - $197 / $297 / $497 USD)",
        body: `Hey [Name]! Quick question for your fleet & field team.\n\nHave you seen Service Dispatch OS and the standalone Auto Rescue & Towing App? Stranded drivers or clients tap 1 link to drop their exact GPS pin, your driver sees them on live radar, snaps walk-around photos, captures a signature on glass, and bills on the spot.\n\nPlans scale cleanly with 1.5x complimentary slots:\n• Basic: $197/mo USD (4 vehicles/drivers, 2 dispatchers, up to 300 dispatches/mo)\n• Growth (1.5x Slots): $297/mo USD (6 vehicles/drivers, 3 dispatchers, up to 450 dispatches/mo)\n• Pro (1.5x Growth + 24/7 AI): $497/mo USD (9 vehicles/drivers, 5 dispatchers, 2 branches, 675 dispatches + 300 AI voice calls)\n\nWatch the 75-sec video: https://servicedispatch.app/videos/vsl-auto-rescue.mp4\nTest the live App here: ${autoRescueLink}`,
      },
      {
        id: "swipe-4",
        badge: "Message 04 • Restaurant & Courier Delivery",
        channel: "WhatsApp / Email",
        title: "4. Restaurant & Pharmacy Pitch (0%-Commission Delivery App - $197 / $297 / $497 USD)",
        body: `Hey [Name]! Tired of giving up 20%-30% commission on third-party delivery orders?\n\nWe just launched our standalone, 0%-Commission Food, Restaurant & Pharmacy Delivery App on Service Dispatch OS ($197, $297, or $497/mo USD), complete with live rider GPS tracking, doorstep photo proof, and your own branded ordering link.\n\nWatch the 1-min video: https://servicedispatch.app/videos/vsl-food-delivery.mp4\nTry the live app here: ${foodDeliveryLink}\n\nReply with your business name and I'll send back a live preview link customized with your brand!`,
      },
      {
        id: "swipe-5",
        badge: "Message 05 • Hospitality, Resort & Villa AI",
        channel: "WhatsApp / Email",
        title: "5. Hotel, Resort & Villa Pitch (Sovereign Sands 24/7 AI Concierge Demo)",
        body: `Hey [Name]! Quick one for your front-desk and reservations team.\n\nWe built a live Barbados resort & hospitality showcase called Sovereign Sands that demonstrates how a 24/7 Voice & Web Chat AI Concierge handles routine guest calls, WhatsApp questions, spa/dining inquiries, and direct bookings around the clock, handing hundreds of hours back to your front desk.\n\nTest the live Sovereign Sands Resort & AI Concierge + Operational Savings Calculator here:\n-> ${sovereignLink}\n\nWant me to show you how this looks customized for your property?`,
      },
    ];
  }, [cleanId, stealthToken]);

  const handleActivatePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsappPhone.trim() || !personalEmail.trim() || !signatureName.trim()) {
      return;
    }
    const cleanHandle = sanitizeSlug(partnerId || fullName.split(/\s+/)[0]) || "partner";
    setPartnerId(cleanHandle);
    const signedAt = new Date().toISOString();

    try {
      await fetch("https://businessesos.com/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "join_team_onboard",
          fullName: fullName.trim(),
          personalEmail: personalEmail.trim(),
          whatsappPhone: whatsappPhone.trim(),
          preferredCurrency: "USD",
          track: partnerTrack,
          payoutMethod,
          signatureName: signatureName.trim(),
          signedAt,
        }),
      });
    } catch {
      // Non-blocking fallback
    }

    const pack = {
      name: fullName.trim(),
      handle: cleanHandle,
      email: `${cleanHandle}@noveltywebsolutions.com`,
      track: partnerTrack,
      payout: payoutMethod,
      signedAt,
    };
    setActivatedPack(pack);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("nws_partner_activated_pack_v3", JSON.stringify(pack));
      window.localStorage.setItem("nws_partner_ref_v3", cleanHandle);
    }
    triggerToast(
      "Affiliate Account Activated!",
      `Your ?am_id=${cleanHandle}&s=${stealthToken} links and 10%-15% affiliate agreement are now live.`
    );
  };

  const handlePrintContract = () => {
    if (typeof window === "undefined") return;
    const printWin = window.open("", "_blank", "width=900,height=800");
    if (!printWin) return;
    const signedDate = new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Signed 10%-15% Affiliate Agreement - ${fullName || effectiveRef}</title>
        <style>
          body { font-family: 'Inter', 'Intel', -apple-system, BlinkMacSystemFont, sans-serif; color: #000000; padding: 36px; line-height: 1.6; }
          .box { border: 1px solid #000000; border-radius: 12px; padding: 28px; }
          h1 { font-size: 22px; margin-bottom: 4px; }
          h2 { font-size: 16px; margin-top: 18px; }
          .sig { background: #F8FAFC; padding: 16px; border-radius: 8px; margin-top: 20px; border: 1px solid #CBD5E1; }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>NOVELTY WEB SOLUTIONS LTD.</h1>
          <p><strong>Official 10%&ndash;15% Recurring Affiliate Referral Agreement</strong></p>
          <hr/>
          <h2>1. Affiliate Identity &amp; Tracking</h2>
          <p><strong>Affiliate Legal Name:</strong> ${signatureName || fullName}</p>
          <p><strong>Official NWS Handle:</strong> ${effectiveRef}@noveltywebsolutions.com</p>
          <p><strong>Active Tracking Query:</strong> <code>?am_id=${encodeURIComponent(cleanId)}&amp;s=${stealthToken}</code></p>
          <p><strong>Selected Track:</strong> ${partnerTrack}</p>
          <h2>2. Commission Structure (Starts at 10% &bull; Auto-Upgrades to 15% at 36+ Paid Signups)</h2>
          <p>Affiliate starts at a <strong>10% recurring commission</strong> on referred active paid monthly or yearly subscriptions, and automatically upgrades to <strong>15% recurring commission</strong> upon reaching more than 35 (36+) active paid signups. Affiliates who are also Business OS customers operate across two separate flows (Customer Workspace &amp; Affiliate Referral Portal) and can use monthly affiliate payouts to offset or exceed their own software bill. <strong>Self-referrals on the Affiliate's own business subscription are strictly prohibited.</strong></p>
          <ul>
            <li><strong>Tier 1 - Standard (Business OS Core Plans):</strong> $97/mo, $197/mo, and $297/mo USD (0% commission on $50/$97 pass-through AI usage add-ons).</li>
            <li><strong>Tier 2 - Pro Full-Service Setup (Novelty Web Solutions):</strong> $997/mo, $1,497/mo, $2,997/mo USD, and Custom Full-Service Setups ($5,000+ USD).</li>
            <li><strong>Standalone Vertical Apps:</strong> Service Dispatch OS ($197 / $297 / $497/mo USD), TicketFlows, and CARICOM Business Hub.</li>
          </ul>
          <div class="sig">
            <p><strong>Digitally Signed By:</strong> ${signatureName || fullName}</p>
            <p><strong>Contact:</strong> ${personalEmail} | ${whatsappPhone}</p>
            <p><strong>Payout Method:</strong> ${payoutMethod}</p>
            <p><strong>Date:</strong> ${signedDate}</p>
          </div>
        </div>
        <script>window.onload = function() { window.print(); };</script>
      </body>
      </html>
    `);
    printWin.document.close();
  };

  return (
    <div className="min-h-screen bg-[#0b0c0e] selection:bg-[#D92635] selection:text-white overflow-x-hidden font-sans">
      {/* FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-white rounded-2xl px-6 py-4 flex items-center gap-4 border border-[#E2E8F0] shadow-2xl">
          <div className="w-10 h-10 rounded-xl bg-[#D92635] flex items-center justify-center text-white shrink-0">
            <Check size={20} />
          </div>
          <div>
            <p className="text-sm font-sans font-bold uppercase tracking-wider text-black">
              {toastMessage.title}
            </p>
            <p className="text-sm font-medium text-black break-all mt-0.5">{toastMessage.desc}</p>
          </div>
        </div>
      )}

      {/* CARBON STUDIO HERO SECTION */}
      <section className="pt-28 sm:pt-32 pb-14 px-4 sm:px-8 relative border-b border-white/10 bg-[#0b0c0e]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#E2E8F0]">
                <div className="w-2 h-2 bg-[#D92635] rounded-full animate-pulse shrink-0" />
                <span className="text-xs font-sans font-bold tracking-wider uppercase text-black">
                  Official Affiliate Referral Program • 10%&ndash;15% Recurring Commission
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-sans font-extrabold tracking-tight text-white leading-[1.12]">
                Refer Businesses, Offset Your Own Bill &amp; Earn{" "}
                <span className="text-[#D92635]">10%&ndash;15% Recurring Commission.</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-white leading-relaxed max-w-3xl">
                Every affiliate starts at{" "}
                <strong className="font-bold text-white">10% recurring commission</strong> and automatically upgrades to{" "}
                <strong className="font-bold text-white">15% recurring commission</strong> once you cross{" "}
                <strong className="font-bold text-white">35+ paid monthly or yearly signups (36+)</strong>. Refer businesses to our{" "}
                <strong className="font-bold text-white">
                  Tier 1 Standard plans ($97, $197, or $297/mo USD)
                </strong>
                , our{" "}
                <strong className="font-bold text-white">
                  Service Dispatch OS apps ($197, $297, or $497/mo USD)
                </strong>
                , or our{" "}
                <strong className="font-bold text-white">
                  Tier 2 Pro Full-Service setups ($997 to $5,000+/mo USD)
                </strong>
                . Pass-through AI usage upgrades ($50/$97/mo) carry 0% commission.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("catalog")}
                  className="px-7 py-4 text-sm font-sans font-bold tracking-wider uppercase bg-[#D92635] text-white hover:bg-[#b81d2a] transition-colors rounded-xl shadow-lg inline-flex items-center gap-2.5 cursor-pointer"
                >
                  <span>Explore Plans &amp; Referral Links</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("onboard")}
                  className="px-7 py-4 text-sm font-sans font-bold tracking-wider uppercase bg-white text-black hover:bg-[#F1F5F9] transition-colors rounded-xl inline-flex items-center gap-2.5 cursor-pointer"
                >
                  <FileSignature size={18} className="text-[#D92635]" />
                  <span>Join in 2 Minutes (E-Sign Agreement)</span>
                </button>
              </div>
            </div>

            {/* Right 5 Columns: Crisp White Marble Slate Partner ID Generator */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E2E8F0]">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div>
                  <span className="text-xs font-sans font-bold tracking-wider text-[#D92635] uppercase block">
                    Instant Link Generator
                  </span>
                  <h2 className="text-xl sm:text-2xl font-sans font-bold text-black mt-0.5">
                    Your Tracked Partner ID
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#D92635]/10 text-[#D92635] text-xs font-sans font-bold uppercase tracking-wider">
                  90-Day Cookie
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-sans font-bold text-black mb-2">
                    Enter Your Partner Handle (Updates All Links Below):
                  </label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <div className="flex-1 flex items-center bg-[#F8FAFC] border border-[#CBD5E1] focus-within:border-black rounded-xl px-4 py-3">
                      <span className="text-sm font-sans font-bold text-[#D92635] select-none mr-1">
                        ?am_id=
                      </span>
                      <input
                        type="text"
                        value={partnerId}
                        onChange={(e) => setPartnerId(sanitizeSlug(e.target.value))}
                        placeholder="your-name"
                        className="bg-transparent text-base font-sans font-bold text-black placeholder:text-black/40 w-full focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          "hero-hub",
                          `https://noveltywebsolutions.com/partners?am_id=${encodeURIComponent(cleanId)}&s=${stealthToken}`,
                          "Partner Portal Link Copied!"
                        )
                      }
                      className="px-5 py-3.5 rounded-xl bg-[#D92635] hover:bg-[#b81d2a] text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                    >
                      Copy Hub Link
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-black mb-1.5">
                    Optional Funnel Affiliate Manager ID (<code className="text-[#D92635]">am_id</code> Override):
                  </label>
                  <input
                    type="text"
                    value={amId}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^a-zA-Z0-9_-]/g, "");
                      setAmId(val);
                      if (typeof window !== "undefined") {
                        window.localStorage.setItem("nws_partner_am_id_v3", val);
                      }
                    }}
                    placeholder="Defaults to your Partner Handle above"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-sm font-sans font-bold text-black placeholder:text-black/40 focus:outline-none"
                  />
                </div>
              </div>

              {/* 3 Instant Primary Referral Links */}
              <div className="space-y-2.5 pt-1">
                <div className="text-xs font-sans font-bold uppercase tracking-wider text-black">
                  1-Click Copy Core Destination Links (?am_id= &amp; ?s= Stealth Tracked):
                </div>
                {[
                  {
                    id: "quick-t1",
                    label: "Tier 1 Standard: Business OS ($97 / $197 / $297)",
                    url: buildTrackedUrl("https://businessesos.com"),
                  },
                  {
                    id: "quick-t2",
                    label: "Tier 2 Pro Full-Service: Novelty Studio ($997+)",
                    url: buildTrackedUrl("https://noveltywebsolutions.com"),
                  },
                  {
                    id: "quick-sd",
                    label: "Standalone: Service Dispatch OS ($197 / $297 / $497)",
                    url: buildTrackedUrl("https://servicedispatch.app"),
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-sans font-bold text-black truncate">
                        {item.label}
                      </div>
                      <div className="text-xs font-sans text-black truncate mt-0.5">
                        {item.url}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.id, item.url, "Tracked Link Copied!")}
                      className="px-4 py-2 rounded-lg bg-black hover:bg-[#D92635] text-white text-xs font-sans font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                    >
                      {copiedId === item.id ? "Copied" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL-BLEED WHITE MARBLE SLATE WORKSPACE BAND */}
      <section className="w-full bg-[#F8FAFC] border-b border-[#E2E8F0]">
        {/* Full-Width 5-Tab Bar */}
        <div className="border-b border-[#E2E8F0] bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                {
                  id: "earnings" as PartnerTab,
                  step: "Step 1",
                  label: "10%-15% Earnings & Calculator",
                  icon: Calculator,
                },
                {
                  id: "catalog" as PartnerTab,
                  step: "Step 2",
                  label: "2-Tier Plans & Live Demos",
                  icon: Layers,
                },
                {
                  id: "videos" as PartnerTab,
                  step: "Step 3",
                  label: "Video & Live Demo Vault",
                  icon: Video,
                },
                {
                  id: "swipes" as PartnerTab,
                  step: "Step 4",
                  label: "Ad Flyers & Swipes",
                  icon: Megaphone,
                },
                {
                  id: "onboard" as PartnerTab,
                  step: "Step 5",
                  label: "E-Sign 10%-15% Agreement",
                  icon: FileSignature,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full px-4 py-3.5 rounded-xl text-left transition-all flex items-center gap-3 cursor-pointer ${
                      isActive
                        ? "bg-[#D92635] text-white shadow-md"
                        : "bg-white text-black hover:bg-[#F1F5F9] border border-[#E2E8F0]"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-black"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <div
                        className={`text-xs font-sans font-bold uppercase tracking-wider ${
                          isActive ? "text-white" : "text-[#D92635]"
                        }`}
                      >
                        {tab.step}
                      </div>
                      <div className="text-sm font-sans font-bold leading-snug truncate">
                        {tab.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MAIN WORKSPACE CONTENT */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14 space-y-16">
          {/* WHITE MARBLE SLATE CARD: INDUSTRY SALES FUNNELS & DIRECT PRODUCT LINKS (?am_id= ENABLED) */}
          <div className="bg-white rounded-2xl p-7 sm:p-10 space-y-8 border border-[#E2E8F0] shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#E2E8F0] pb-6">
              <div className="space-y-2 max-w-3xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D92635] text-white text-xs font-sans font-bold uppercase tracking-wider">
                  Dual-Attribution Tracking • Funnel Affiliate Manager (?am_id=) + Stealth Token (?s=)
                </span>
                <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-black">
                  Industry Sales Funnels &amp; Direct Product Links (<code className="text-[#D92635] font-bold">?am_id=</code> Enabled)
                </h2>
                <p className="text-base text-black leading-relaxed">
                  Every link below automatically stamps both your Funnel Affiliate Manager ID (<code className="text-[#D92635] font-bold">?am_id={cleanId}</code>) and your Business OS stealth attribution token (<code className="text-[#D92635] font-bold">&amp;s={stealthToken}</code>). Earn 10%&ndash;15% recurring commission on paid SaaS plans (0% on $50/$97 pass-through AI usage upgrades).
                </p>
              </div>
              <div className="px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm font-sans font-bold text-black shrink-0">
                Active Tracking Query:{" "}
                <code className="text-[#D92635] font-bold">
                  ?am_id={encodeURIComponent(cleanId)}&amp;s={stealthToken}
                </code>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FLAGSHIP_NICHE_FUNNELS.map((funnel) => {
                const trackedFunnelUrl = buildTrackedUrl(funnel.funnelUrl);
                const whatsappShareHref = `https://wa.me/?text=${encodeURIComponent(
                  `${funnel.whatsappPitch}\n${trackedFunnelUrl}`
                )}`;
                return (
                  <div
                    key={funnel.id}
                    className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-black text-white text-xs font-sans font-bold uppercase tracking-wider">
                          {funnel.badge}
                        </span>
                        <span className="text-xs font-sans font-bold text-[#D92635] uppercase">
                          10%&ndash;15% Recurring
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-sans font-bold text-black">
                        {funnel.title}
                      </h3>
                      <div className="text-xs font-sans font-bold text-[#D92635]">
                        {funnel.pricingSummary}
                      </div>
                      <p className="text-sm text-black leading-relaxed">{funnel.desc}</p>
                      <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] text-xs font-sans font-bold text-black break-all">
                        {trackedFunnelUrl}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            funnel.id,
                            trackedFunnelUrl,
                            `${funnel.title} Funnel Link Copied!`
                          )
                        }
                        className="py-3 px-4 rounded-xl bg-[#D92635] hover:bg-[#b81d2a] text-white text-xs font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        {copiedId === funnel.id ? "✓ Copied" : "Copy Link"}
                      </button>
                      <a
                        href={whatsappShareHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-4 rounded-xl bg-black hover:bg-black/85 text-white text-xs font-sans font-bold uppercase tracking-wider text-center transition-colors inline-flex items-center justify-center gap-1.5"
                      >
                        <span>WhatsApp Share</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TAB 1: EARNINGS & CALCULATOR */}
          {activeTab === "earnings" && (
            <div className="space-y-12">
              <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E2E8F0] shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#D92635]">
                        Interactive Commission Simulator (Auto-Switches 10% &rarr; 15% at 36+ Signups)
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-black mt-1">
                        Calculate Your Monthly Affiliate Income ({calcResults.ratePct}% Active Tier)
                      </h3>
                      <p className="text-base text-black mt-1">
                        Starts at 10% for 1&ndash;35 total active paid clients and automatically jumps to 15% when your total active referrals reach 36+. Zero commission on $50/$97 pass-through AI usage add-ons.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-sans font-bold uppercase text-black mr-1">
                        Presets:
                      </span>
                      {[
                        { label: "10 Tier 1 @ 10% ($197/mo - Offset Bill)", t1: 10, plan: 197, t2: 0 },
                        { label: "25 Blended @ 10% ($693/mo)", t1: 20, plan: 197, t2: 5 },
                        { label: "36 Tier 1 @ 15% ($1,064/mo)", t1: 36, plan: 197, t2: 0 },
                        { label: "50 Blended @ 15% ($2,580/mo)", t1: 40, plan: 197, t2: 10 },
                        { label: "100 Blended @ 15% ($5,955/mo)", t1: 75, plan: 197, t2: 25 },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => applyCalcPreset(preset.t1, preset.plan, preset.t2)}
                          className="px-3.5 py-2 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] hover:bg-[#D92635] hover:text-white hover:border-[#D92635] text-xs font-sans font-bold text-black transition-colors cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5">
                        <div className="flex justify-between text-sm font-sans font-bold text-black">
                          <span>1. Tier 1 Standard / Standalone Dispatch Clients:</span>
                          <span className="text-[#D92635] font-bold">{calcTier1Clients} Clients</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={150}
                          value={calcTier1Clients}
                          onChange={(e) => setCalcTier1Clients(Number(e.target.value))}
                          className="w-full accent-[#D92635] cursor-pointer"
                        />
                      </div>

                      <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5">
                        <div className="flex justify-between text-sm font-sans font-bold text-black">
                          <span>2. Select Core Tier 1 / Standalone Monthly Plan:</span>
                          <span className="text-[#D92635] font-bold">${calcTier1PlanUsd}/mo USD</span>
                        </div>
                        <select
                          value={calcTier1PlanUsd}
                          onChange={(e) => setCalcTier1PlanUsd(Number(e.target.value))}
                          className="w-full p-3.5 rounded-xl bg-white border border-[#CBD5E1] text-sm font-sans font-bold text-black focus:outline-none"
                        >
                          <option value={97}>
                            Tier 1 Starter Plan - $97/mo USD &rarr; $9.70/mo (10%) or $14.55/mo (15%)
                          </option>
                          <option value={197}>
                            Tier 1 Growth / Dispatch Basic - $197/mo USD &rarr; $19.70/mo (10%) or $29.55/mo (15%)
                          </option>
                          <option value={297}>
                            Tier 1 Scale / Dispatch Growth - $297/mo USD &rarr; $29.70/mo (10%) or $44.55/mo (15%)
                          </option>
                          <option value={497}>
                            Standalone Dispatch OS Pro - $497/mo USD &rarr; $49.70/mo (10%) or $74.55/mo (15%)
                          </option>
                        </select>
                      </div>

                      <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5">
                        <div className="flex justify-between text-sm font-sans font-bold text-black">
                          <span>
                            3. Tier 2 Pro Full-Service Clients ($997/mo USD &rarr; ${(997 * (calcResults.ratePct / 100)).toFixed(2)}/mo comm.):
                          </span>
                          <span className="text-[#D92635] font-bold">
                            {calcTier2ProClients} Pro Clients
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={50}
                          value={calcTier2ProClients}
                          onChange={(e) => setCalcTier2ProClients(Number(e.target.value))}
                          className="w-full accent-[#D92635] cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-[#F8FAFC] rounded-2xl p-7 space-y-5 border border-[#E2E8F0]">
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                      <span className="text-xs font-sans font-bold uppercase tracking-wider text-black">
                        Your {calcResults.ratePct}% Recurring Projection
                      </span>
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-sans font-bold ${calcResults.ratePct === 15 ? "bg-[#D92635]" : "bg-black"}`}>
                        {calcResults.totalClients} Clients &bull; {calcResults.ratePct}% Tier
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white border border-[#E2E8F0]">
                        <div className="text-xs font-sans font-bold text-black">
                          Tier 1 / Dispatch ({calcResults.ratePct}%)
                        </div>
                        <div className="text-2xl font-sans font-bold text-black mt-1">
                          ${calcResults.tier1MonthlyUsd.toLocaleString()}/mo
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-white border border-[#E2E8F0]">
                        <div className="text-xs font-sans font-bold text-black">
                          Tier 2 Pro ({calcResults.ratePct}%)
                        </div>
                        <div className="text-2xl font-sans font-bold text-[#D92635] mt-1">
                          +${calcResults.tier2MonthlyUsd.toLocaleString()}/mo
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between">
                      <span className="text-xs font-sans font-bold uppercase text-black">
                        Total Monthly Recurring:
                      </span>
                      <span className="text-2xl font-sans font-bold text-black">
                        ${calcResults.totalMonthlyUsd.toLocaleString()}/mo USD
                      </span>
                    </div>

                    <div className="p-6 rounded-xl bg-[#D92635] text-white space-y-1">
                      <div className="text-xs font-sans font-bold uppercase tracking-wider text-white">
                        Total Annual Recurring Income ({calcResults.ratePct}% Tier)
                      </div>
                      <div className="text-3xl sm:text-4xl font-sans font-extrabold text-white">
                        ${calcResults.totalYearlyUsd.toLocaleString()}/yr USD
                      </div>
                      <div className="text-xs text-white pt-1">
                        {calcResults.totalClients >= 36
                          ? "15% Volume Rate unlocked (36+ paid signups)."
                          : `${36 - calcResults.totalClients} more paid signups to auto-unlock the 15% Volume Rate!`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CATALOG & CUSTOM PROSPECT BUILDER */}
          {activeTab === "catalog" && (
            <div className="space-y-12">
              <div className="bg-white rounded-2xl p-7 sm:p-9 border border-[#E2E8F0] shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                  <div className="lg:col-span-5 space-y-2">
                    <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#D92635]">
                      1-Click Prospect Link Customizer
                    </span>
                    <h3 className="text-2xl font-sans font-bold text-black">
                      Pre-Brand Any App With Your Prospect&apos;s Business Name
                    </h3>
                    <p className="text-base text-black leading-relaxed">
                      Type a prospect&apos;s company name and choose an optional promo offer to generate a custom-branded live app link with your{" "}
                      <code className="text-[#D92635] font-bold">?am_id={cleanId}&amp;s={stealthToken}</code> tracking attached.
                    </p>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-sans font-bold uppercase text-black mb-1.5">
                        Prospect Business Name
                      </label>
                      <input
                        type="text"
                        value={prospectBrand}
                        onChange={(e) => setProspectBrand(e.target.value)}
                        placeholder="e.g. Island Tow & Rescue"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-sm font-sans font-bold text-black placeholder:text-black/40 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-bold uppercase text-black mb-1.5">
                        Partner Promo Offer
                      </label>
                      <select
                        value={prospectOffer}
                        onChange={(e) => setProspectOffer(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-sm font-sans font-bold text-black focus:outline-none"
                      >
                        <option value="">Standard Retail Pricing</option>
                        <option value="special-50">50% Charter Deal (?offer=special-50)</option>
                        <option value="vip-free">VIP Complimentary Trial (?offer=vip-free)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-bold uppercase text-black mb-1.5">
                        Target Platform / App
                      </label>
                      <select
                        value={prospectTargetApp}
                        onChange={(e) => setProspectTargetApp(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-sm font-sans font-bold text-black focus:outline-none"
                      >
                        <option value="https://servicedispatch.app/niche/auto-rescue">
                          Auto Rescue &amp; Towing
                        </option>
                        <option value="https://servicedispatch.app/niche/food-delivery">
                          Food &amp; Courier Delivery
                        </option>
                        <option value="https://servicedispatch.app/niche/hvac-trades">
                          HVAC, Plumbing &amp; Trades
                        </option>
                        <option value="https://servicedispatch.app">
                          Master Service Dispatch OS
                        </option>
                        <option value="https://businessesos.com">Tier 1: Business OS</option>
                        <option value="https://noveltywebsolutions.com">
                          Tier 2: Pro Full-Service Setup
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
                  <div className="text-sm font-sans font-bold bg-[#F8FAFC] px-4 py-3 rounded-xl border border-[#E2E8F0] text-black break-all">
                    {customProspectUrl}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          "custom-brand-link",
                          customProspectUrl,
                          "Custom-Branded Prospect Link Copied!"
                        )
                      }
                      className="px-5 py-3 rounded-xl bg-[#D92635] hover:bg-[#b81d2a] text-white font-sans font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Copy Pre-Branded Prospect Link
                    </button>
                    <a
                      href={customProspectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-black hover:bg-black/85 text-white font-sans font-bold text-sm uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                    >
                      <span>Open Live App</span>
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VIDEOS & DEMOS */}
          {activeTab === "videos" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {VIDEO_VAULT.map((v) => (
                <div
                  key={v.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-video w-full bg-black relative border-b border-[#E2E8F0]">
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        poster={v.posterUrl}
                        className="w-full h-full object-cover"
                      >
                        <source src={v.videoUrl} type="video/mp4" />
                      </video>
                    </div>
                    <div className="p-6 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#D92635]">
                          {v.badge}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-[#F1F5F9] text-xs font-sans font-bold text-black">
                          {v.duration}
                        </span>
                      </div>
                      <h3 className="text-xl font-sans font-bold text-black">{v.title}</h3>
                      <p className="text-sm text-black leading-relaxed">{v.summary}</p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(v.id, v.videoUrl, `${v.title} Video Link Copied!`)
                      }
                      className="flex-1 py-3 px-4 rounded-xl bg-[#D92635] hover:bg-[#b81d2a] text-white text-xs font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Copy Video Link
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          `${v.id}-app`,
                          buildTrackedUrl(v.appUrl),
                          "Tracked App Link Copied!"
                        )
                      }
                      className="py-3 px-4 rounded-xl bg-black hover:bg-black/85 text-white text-xs font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      App Link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: SWIPES */}
          {activeTab === "swipes" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {swipesList.map((sw) => (
                <div
                  key={sw.id}
                  className="bg-white rounded-2xl p-7 border border-[#E2E8F0] shadow-sm flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-md bg-[#F1F5F9] text-black text-xs font-sans font-bold uppercase tracking-wider">
                        {sw.badge}
                      </span>
                      <span className="text-xs font-sans font-bold text-[#D92635] uppercase">
                        {sw.channel}
                      </span>
                    </div>
                    <h3 className="text-xl font-sans font-bold text-black">{sw.title}</h3>
                    <pre className="whitespace-pre-wrap font-sans text-sm text-black bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0] leading-relaxed">
                      {sw.body}
                    </pre>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(sw.id, sw.body, `${sw.title} Copied!`)}
                    className="w-full py-3.5 px-5 rounded-xl bg-[#D92635] hover:bg-[#b81d2a] text-white text-sm font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {copiedId === sw.id ? "✓ Copied to Clipboard" : `Copy ${sw.title}`}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: ONBOARD */}
          {activeTab === "onboard" && (
            <div className="bg-white rounded-2xl p-8 sm:p-12 space-y-8 border border-[#E2E8F0] shadow-sm">
              <div className="max-w-3xl space-y-2 border-b border-[#E2E8F0] pb-6">
                <span className="text-xs font-sans font-bold tracking-wider text-[#D92635] uppercase">
                  Affiliate Onboarding • 2-Minute Agreement &amp; Setup
                </span>
                <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-black">
                  Become an Affiliate in 2 Minutes (E-Sign 10%&ndash;15% Agreement &amp; Instant Setup)
                </h2>
                <p className="text-base text-black">
                  Complete the quick onboarding form below to lock in your{" "}
                  <strong className="font-bold text-black">10%&ndash;15% Recurring Affiliate Agreement</strong>, generate your personalized Affiliate Command Card, and start earning monthly payouts.
                </p>
              </div>

              <form onSubmit={handleActivatePartner} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-black mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (!signatureName) setSignatureName(e.target.value);
                        const firstToken = e.target.value.trim().split(/\s+/)[0];
                        if (firstToken) setPartnerId(sanitizeSlug(firstToken));
                      }}
                      placeholder="Enter Your Full Name"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-base font-sans font-bold text-black placeholder:text-black/40 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-black mb-2">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={whatsappPhone}
                      onChange={(e) => setWhatsappPhone(e.target.value)}
                      placeholder="e.g. +1 (246) 555-0199"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-base font-sans font-bold text-black placeholder:text-black/40 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-black mb-2">
                      Personal Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={personalEmail}
                      onChange={(e) => setPersonalEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-base font-sans font-bold text-black placeholder:text-black/40 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-black mb-2">
                      Digital E-Signature (Type Your Full Legal Name to Sign) *
                    </label>
                    <input
                      type="text"
                      required
                      value={signatureName}
                      onChange={(e) => setSignatureName(e.target.value)}
                      placeholder="Type Full Legal Name as E-Signature"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-base font-sans font-bold italic text-black placeholder:text-black/40 focus:outline-none"
                    />
                  </div>
                  <label className="cursor-pointer flex items-start gap-3 text-sm font-sans font-bold text-black pt-4">
                    <input
                      type="checkbox"
                      required
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#D92635]"
                    />
                    <span>
                      I agree to the Novelty Web Solutions 10%&ndash;15% Affiliate Agreement (0% on $50/$97 pass-through AI usage upgrades; zero self-referrals) and authorize instant generation of my tracked referral links.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-[#D92635] hover:bg-[#b81d2a] text-white font-sans font-bold text-base uppercase tracking-wider shadow-lg transition-colors cursor-pointer"
                >
                  Activate My Affiliate Account &amp; Generate Tracked Links &rarr;
                </button>
              </form>

              {activatedPack && (
                <div className="p-8 rounded-2xl bg-[#F8FAFC] border-2 border-[#D92635] space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-5">
                    <div>
                      <span className="px-3.5 py-1 rounded-md bg-[#D92635] text-white text-xs font-sans font-bold uppercase tracking-wider">
                        ✓ Affiliate Account Activated
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-sans font-bold text-black mt-2">
                        Welcome Aboard, <span className="text-[#D92635]">{activatedPack.name}</span>!
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={handlePrintContract}
                      className="px-5 py-3 rounded-xl bg-black hover:bg-black/85 text-white text-xs font-sans font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Printer size={16} />
                      <span>Print Signed Contract</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
