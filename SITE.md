# NWS Site Roadmap — Stitch Build Loop
## Version: 1.0 | Started: 2026-06-24

---

## Sitemap

| Route | Page | Status | Stitch Screen ID |
|---|---|---|---|
| `/` | Homepage (updated — 3 pillar blocks + combo CTA) | 🔲 Not Started | — |
| `/business-os` | Business OS — AI Platform | 🔲 Not Started | — |
| `/core-services` | Core Services by Industry | 🔲 Not Started | — |
| `/smart-website` | Smart Website (**BLOCKED — B2 pending**) | ⛔ Blocked | — |
| `/about` | About | ✅ Existing | — |
| `/services` | Services (Legacy) | ✅ Existing | — |
| `/pricing` | Pricing (Legacy) | ✅ Existing | — |
| `/contact` | Contact | ✅ Existing | — |

---

## Build Order

1. `/business-os` — First. Dark hero, bento features, tabs, no B2/B3 dependency.
2. `/core-services` — Second. Industry selector, pricing tiers.
3. Homepage pillar blocks — Third. Requires screens 1 & 2 to link to.
4. Combo CTA section — Fourth. Added to homepage after pillar blocks.
5. `/smart-website` — Fifth. **BLOCKED pending B2 answer from Ronald.**

---

## Stitch Project

- **Project ID:** TBD (checking via list_projects)
- **Project Name:** NWS Nova Site

---

## Pages Completed

*(Updated after each Stitch generation + integration pass)*

---

## Navigation Links

All pages share the same Navbar and Footer from the live nws-nova-site.
New pages to add to Navbar: "Business OS" → `/business-os` | "Services" → `/core-services`

---

## Open Blockers

| ID | Question | Impact |
|---|---|---|
| B2 | GHL Vibe Coder — is the Smart Website built inside GHL sub-account? | Smart Website page copy + tech description |
| B3 | Is GHL-native WhatsApp (Meta API) active in RonSuite sub-accounts? | WhatsApp features on every page |
