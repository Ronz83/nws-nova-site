# NWS Design System — Complete Ground Truth
## Source: live codebase `src/index.css` + Navbar.tsx + all components (2026-06-24)
## ⚠️ Stitch prompts and all new pages MUST be variations of this system

---

## Aesthetic Summary

**Caribbean Dawn — Premium Light-Mode SaaS**
- Single theme, light-first. No dark mode body. Editorial magazine meets Caribbean horizon.
- **White is the canvas.** `#ffffff` base, `#f0f9ff` (sky-50) alternating section tint.
- **Electric blue carries interactive weight.** `#0ea5e9` sky-500 and `#0369a1` sky-700.
- **Amber is the energy accent.** `#f59e0b` for warm CTAs and the "Most Popular" badge.
- **Hero is LIGHT**, not dark. Gentle sky→white→amber-50 gradient with ambient radial glows.
- **Ocean gradient** (`#0c1a2e → #0369a1`) = final CTA dark PANEL only (not page background).
- Dot grid texture runs the whole site at 35% opacity.
- Instrument Serif italic = display/poetic moments only. Inter = everything else.

---

## Color Tokens

| CSS Variable | Hex | Tailwind Equivalent | Usage |
|---|---|---|---|
| `--bg-base` | `#ffffff` | white | Page base |
| `--bg-tint` | `#f0f9ff` | sky-50 | Alternating section bg |
| `--text-base` | `#0c1a2e` | — | Primary text (near-black) |
| `--text-muted` | `#475569` | slate-600 | Secondary text |
| `--border-base` | `#e2e8f0` | slate-200 | Borders, dividers |
| `--accent-primary` | `#0ea5e9` | sky-500 | Highlights, icons |
| `--accent-deep` | `#0369a1` | sky-700 | Buttons, active states |
| `--accent-amber` | `#f59e0b` | amber-400 | Warm accent, energy CTA |
| `--accent-glow` | `rgba(14,165,233,0.08)` | — | Soft sky glow bg |
| `--card-bg` | `#ffffff` | white | Card bg |
| `--card-hover` | `#f8fafc` | slate-50 | Card hover |
| `--glass-bg` | `rgba(255,255,255,0.92)` | — | Navbar glassmorphism |

### Additional Semantic Colors
| Role | Value |
|---|---|
| Footer bg | `#1e293b` (slate-900) |
| Footer text | `#cbd5e1` (slate-300) |
| Pricing featured card border | sky-300 |
| Pricing featured card bg | gradient sky-50 → white |
| Check icon (featured) | bg `#e0f2fe`, text `#0369a1` |
| Check icon (default) | bg `#f1f5f9`, text `#64748b` |

---

## Gradients

| Name | Value | Usage |
|---|---|---|
| Hero bg | `linear-gradient(160deg, #f0f9ff 0%, #ffffff 40%, #fffbeb 100%)` | **Homepage hero — LIGHT** |
| Hero ambient left | `radial-gradient(circle, rgba(14,165,233,0.18), transparent 70%)` 700×700px | Sky glow top-left |
| Hero ambient right | `radial-gradient(circle, rgba(245,158,11,0.14), transparent 70%)` 600×600px | Amber glow bottom-right |
| Hero headline text | `linear-gradient(135deg, #0ea5e9, #38bdf8, #06b6d4)` | Gradient clip on italic headline |
| Primary CTA button | `linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)` | Hero primary button only |
| `.bg-ocean-gradient` | `linear-gradient(135deg, #0c1a2e 0%, #0c2a4a 50%, #0369a1 100%)` | **Final CTA dark panel only** |
| `.bg-sunrise-gradient` | `linear-gradient(135deg, #0369a1 0%, #0ea5e9 60%, #38bdf8 100%)` | "Most Popular" badge |
| `.mesh-gradient-premium` | Dual radial: sky/12% + amber/10% | Premium CTA sections |

---

## Typography

| Role | Font | Weight | Size (desktop) | Notes |
|---|---|---|---|---|
| Display / H1 hero | Instrument Serif | 400 italic | 64–80px | Only for poetic/display moments |
| H2 section headers | Inter | font-black (900) | 40–48px | Standard section titles |
| H3 | Inter | font-black | 24–28px | |
| Body | Inter | 400–500 | 16–18px | |
| Nav links | Inter | font-bold | 12px, UPPERCASE, tracking-[0.12em] | |
| Badges/labels | Inter | font-bold | 11px, UPPERCASE, tracking-[0.18em] | |
| Micro-copy | Inter | font-bold | 10px, UPPERCASE, tracking-[0.20em] | Below CTAs |
| Price numerals | Inter / mono | font-black | 36–48px | |

---

## Section Alternation Pattern

```
Hero          → light gradient (sky-50 → white → amber-50) + ambient radial glows
Section 1     → bg-white + .grid-overlay dot pattern
Section 2     → bg-bg-tint (#f0f9ff sky-50)
Section 3     → bg-white
Section 4     → bg-bg-tint
Final CTA     → .bg-ocean-gradient dark panel (INSIDE white section)
Footer        → #1e293b slate-900
```

---

## Component Specs

### Buttons — Primary (hero)
```
bg: linear-gradient(135deg, #0369a1, #0ea5e9)
text: white, Inter font-bold UPPERCASE 12px tracking-[0.18em]
padding: px-7 py-3.5 (hero) | px-8 py-4 (CTA sections)
border-radius: rounded-xl (12px)
hover: scale(1.02), bg-sky-800, shadow-xl
shadow: shadow-lg → shadow-xl on hover
```

### Buttons — Primary (standard sections)
```
bg: #0369a1 (accent-deep solid)
text: white, same typography as above
hover: bg-sky-800
```

### Buttons — Secondary / Ghost
```
bg: transparent
border: 2px solid #e2e8f0 (slate-200)
hover border: sky-300 (#93c5fd)
text: #475569 muted → #0369a1 on hover
hover bg: #f0f9ff (sky-50)
border-radius: 12px
```

### Buttons — Dark CTA (on ocean gradient panels)
```
bg: #ffffff
text: #0369a1 (sky-700 area)
hover bg: #fffbeb (amber-50)
border-radius: 12px
```

### Cards (Feature / Bento)
```
bg: #ffffff
border: 2px solid #f1f5f9 (slate-100)
hover border: sky-200 (#bae6fd)
border-radius: 24px (rounded-[24px])
padding: p-8 lg:p-9
shadow: shadow-sm → shadow-lg hover
hover bg overlay: linear-gradient(to br, rgba(240,249,255,0.6), transparent)
mouse-follow glow: radial 500px circle rgba(14,165,233,0.06) via .bento-glow-container
```

### Pricing Cards
```
Standard:    border-2 border-slate-100, bg-white, rounded-[24px], p-6 lg:p-8
Featured:    border-2 border-sky-300, bg-gradient-to-b from-sky-50 to-white
             margin: -16px top and bottom (visual lift above siblings)
"Most Popular" badge: .bg-sunrise-gradient text-white, -top-4, rounded-full
```

### Badges / Pills
```
bg: rgba(14,165,233,0.1) = bg-sky-50
border: 1px solid rgba(14,165,233,0.3) = border-sky-200
text: sky-500 or sky-700, UPPERCASE 11px tracking-[0.18em]
border-radius: 9999px (rounded-full)
padding: px-4 py-2.5
```

### Navbar
```
height: h-24 (96px), sticky top-0, z-50
bg: rgba(255,255,255,0.92) backdrop-blur-lg
border-b: 1px solid #e2e8f0
max-width: 1280px centered
Nav links: Inter font-bold UPPERCASE 12px tracking-[0.12em]
  Default: text-muted → hover: text-base + bg-slate-50, rounded-xl
  Active: text-sky-700 + bg-sky-50
CTA: bg-accent-deep #0369a1, text-white, px-6 py-3.5, rounded-xl, shadow-md hover:shadow-lg hover:scale-[1.02]
```

### Footer
```
bg: #1e293b (slate-900)
text: #cbd5e1 (slate-300)
labels: slate-500 UPPERCASE tracking-[0.20em] 9px
link hover: white
divider: slate-800
NWS accent: #0ea5e9
padding: pt-14 pb-8
```

---

## Motion / Animation

| Element | Behavior |
|---|---|
| Page entrance | framer-motion, opacity 0→1, y 20→0, delay 0.2s, duration 0.6s |
| Float | `@keyframes float` 0 → -10px → 0, 6s ease-in-out infinite |
| Button hover | `hover:scale-[1.02]` `transition-all duration-200` |
| Card hover | `hover:shadow-lg hover:border-sky-200` `transition-all duration-300` |
| Bento glow | JS mouse-follow radial gradient, opacity 0→1 `transition 0.4s` |

---

## Layout Grid
```
max-width:      1280px (max-w-7xl)
page x-padding: px-6 (24px)
section y-pad:  py-24 (96px) desktop, py-16 (64px) mobile
gap:            gap-6 (24px) standard, gap-12 (48px) major columns
```

---

## Tech Stack
- Vite 5 + React 19 + TypeScript 6
- Tailwind CSS v4 (`@theme {}` in index.css, no config file)
- Lucide React (icons), Framer Motion 12, React Router DOM v7
- Radix UI (Accordion, Tooltip), Sonner (toast)
- Google Fonts: Inter 300–900 + Instrument Serif 0;1

---

## Stitch Prompt Recipe (copy-paste this into every NWS screen prompt)

```
NWS DESIGN SYSTEM — Caribbean Dawn (light mode, must match noveltywebsolutions.com):
Base: white (#ffffff). Alternating tint: sky-50 (#f0f9ff).
Hero bg: light gradient 160deg sky-50 → white → amber-50 (#fffbeb). Ambient radial glows: sky blue top-left, amber bottom-right.
Dark panel (CTA only): ocean gradient 135deg #0c1a2e → #0c2a4a → #0369a1.
Accent: sky-500 #0ea5e9. Buttons: sky-700 #0369a1, text white, rounded-xl, uppercase 12px bold wide-tracking, gradient on hero button.
Headlines H1: Instrument Serif 400 italic, gradient clip sky-500→cyan. H2+: Inter font-black 900 #0c1a2e.
Body: Inter 400 16–18px, muted #475569.
Dot grid overlay: radial #e2e8f0 1.5px dots on 24px grid, 35% opacity.
Cards: white, rounded-[24px], border-2 slate-100, shadow-sm, hover border sky-200 shadow-lg.
Pricing featured: border sky-300, bg gradient sky-50→white, -16px lift, sunrise gradient "Most Popular" badge.
Badges: sky-50 bg, sky-200 border, sky-700 text, uppercase 11px, rounded-full.
Nav: glass rgba(255,255,255,0.92) blur, border-b slate-200, h-24, uppercase bold 12px links, sky-700 active, sky-700 CTA button.
Footer: slate-900 bg.
```
