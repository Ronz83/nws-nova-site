// @ts-nocheck
import React, { useEffect } from 'react';

const styleContent = `
/* ── Reset & Base ───────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; scroll-behavior: smooth; }
body {
  font-family: 'Inter', system-ui, sans-serif;
  background: #F4F6F9;
  color: #1E2A3A;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* ── Typography ─────────────────────────────────────── */
h1, h2, h3, h4 { font-family: 'Space Grotesk', sans-serif; line-height: 1.25; }
.mono { font-family: 'JetBrains Mono', monospace; }

/* ── Layout ─────────────────────────────────────────── */
.page-wrap {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

/* ── Colors ─────────────────────────────────────────── */
:root {
  --coral: #FF6B4D;
  --teal: #2BD9C2;
  --gold: #F2B705;
  --dark: #0A0F1C;
  --surface: #FFFFFF;
  --surface-alt: #F4F6F9;
  --border: #E2E8F0;
  --text: #1E2A3A;
  --text-muted: #64748B;
  --red: #EF4444;
  --yellow: #F59E0B;
  --green: #22C55E;
}

/* ── Header ─────────────────────────────────────────── */
.audit-header {
  background: var(--dark);
  border-radius: 16px;
  padding: 2.5rem 2.5rem 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}
.audit-header::before {
  content: '';
  position: absolute;
  top: -60%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(43,217,194,0.12) 0%, transparent 70%);
  pointer-events: none;
}
.audit-header::after {
  content: '';
  position: absolute;
  bottom: -40%;
  left: -5%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255,107,77,0.1) 0%, transparent 70%);
  pointer-events: none;
}
.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}
.nws-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.nws-logo-mark {
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, var(--coral), var(--teal));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  color: #fff;
  letter-spacing: 1px;
}
.nws-logo-text {
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  opacity: 0.85;
}
.header-date {
  color: rgba(255,255,255,0.5);
  font-size: 0.8rem;
}
.header-title {
  position: relative;
  z-index: 1;
}
.header-title h1 {
  color: #fff;
  font-size: 1.85rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
}
.header-title p {
  color: rgba(255,255,255,0.55);
  font-size: 0.95rem;
}
.confidential-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 6px;
  padding: 0.3rem 0.7rem;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.45);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
  margin-top: 1rem;
}

/* ── Business Name ──────────────────────────────────── */
.business-input-section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.business-input-section label {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
}
.business-input-section input {
  flex: 1;
  border: none;
  border-bottom: 2px solid var(--border);
  background: transparent;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text);
  padding: 0.35rem 0;
  outline: none;
  transition: border-color 0.2s;
}
.business-input-section input::placeholder {
  color: #CBD5E1;
  font-weight: 500;
}
.business-input-section input:focus {
  border-bottom-color: var(--coral);
}

/* ── Overall Score Gauge ────────────────────────────── */
.overall-score-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  margin-bottom: 2rem;
  text-align: center;
}
.overall-score-card h2 {
  font-size: 1rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 1.5rem;
  font-weight: 600;
}
.gauge-container {
  position: relative;
  width: 220px;
  height: 130px;
  margin: 0 auto 1rem;
}
.gauge-bg, .gauge-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 220px;
  height: 220px;
}
.gauge-bg circle, .gauge-fill circle {
  fill: none;
  stroke-width: 18;
  stroke-linecap: round;
}
.gauge-bg circle {
  stroke: #E8ECF1;
}
.gauge-fill circle {
  stroke: var(--green);
  transition: stroke-dashoffset 0.6s ease, stroke 0.4s ease;
  transform: rotate(180deg);
  transform-origin: center center;
}
.gauge-score {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.gauge-score .score-number {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1;
  transition: color 0.3s;
}
.gauge-score .score-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}
.overall-grade {
  margin-top: 0.75rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  transition: color 0.3s;
}

/* ── Category Cards ─────────────────────────────────── */
.categories-section h2 {
  font-size: 1.15rem;
  margin-bottom: 1.25rem;
  color: var(--text);
}
.category-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem 2rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.2s;
}
.category-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.category-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}
.category-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}
.category-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  flex-shrink: 0;
}
.category-icon.website   { background: #FFF1EE; color: var(--coral); }
.category-icon.google    { background: #E8FBF8; color: #0D9488; }
.category-icon.social    { background: #EEF2FF; color: #6366F1; }
.category-icon.reputation{ background: #FEF9E7; color: #D97706; }
.category-icon.leads     { background: #F0FDF4; color: #16A34A; }
.category-icon.followup  { background: #FDF2F8; color: #DB2777; }
.category-name {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 1.05rem;
}
.category-desc {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.1rem;
}
.category-score-display {
  display: flex;
  align-items: baseline;
  gap: 0.15rem;
  flex-shrink: 0;
}
.category-score-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  transition: color 0.3s;
}
.category-score-den {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* ── Slider ─────────────────────────────────────────── */
.slider-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}
.slider-track {
  flex: 1;
  position: relative;
  height: 8px;
}
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #E8ECF1;
  outline: none;
  cursor: pointer;
  position: relative;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid var(--coral);
  box-shadow: 0 1px 6px rgba(0,0,0,0.12);
  cursor: grab;
  transition: border-color 0.2s, transform 0.15s;
}
input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}
input[type="range"]::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid var(--coral);
  box-shadow: 0 1px 6px rgba(0,0,0,0.12);
  cursor: grab;
}
.slider-min, .slider-max {
  font-size: 0.7rem;
  color: #94A3B8;
  font-weight: 600;
  width: 1rem;
  text-align: center;
}

/* ── Score Bar (visual meter under slider) ──────────── */
.score-bar-container {
  height: 6px;
  background: #E8ECF1;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 1rem;
}
.score-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease, background 0.4s ease;
}

/* ── Notes ──────────────────────────────────────────── */
.notes-area {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: var(--text);
  resize: vertical;
  min-height: 56px;
  outline: none;
  transition: border-color 0.2s;
  background: var(--surface-alt);
}
.notes-area::placeholder { color: #94A3B8; }
.notes-area:focus { border-color: var(--teal); background: #fff; }
.notes-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
  margin-bottom: 0.35rem;
  display: block;
}

/* ── Recommendations ────────────────────────────────── */
.recommendations-section {
  margin-top: 2.5rem;
}
.recommendations-section > h2 {
  font-size: 1.15rem;
  margin-bottom: 0.35rem;
}
.recommendations-section > p {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
}
.rec-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 4px solid var(--coral);
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 0.75rem;
  display: none;
  animation: recSlide 0.35s ease;
}
.rec-card.visible { display: block; }
@keyframes recSlide {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.rec-card.website    { border-left-color: var(--coral); }
.rec-card.leads      { border-left-color: var(--green); }
.rec-card.followup   { border-left-color: #DB2777; }
.rec-card.visibility { border-left-color: var(--teal); }
.rec-card.bundle     { border-left-color: var(--gold); background: #FFFBEB; }
.rec-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.rec-title {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 1rem;
}
.rec-price {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--coral);
  background: #FFF1EE;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
}
.rec-card.bundle .rec-price {
  color: #92400E;
  background: #FEF3C7;
}
.rec-body {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.55;
}
.rec-features {
  margin-top: 0.5rem;
  padding-left: 1.1rem;
}
.rec-features li {
  font-size: 0.82rem;
  color: var(--text);
  margin-bottom: 0.25rem;
}
.no-recs-msg {
  display: none;
  text-align: center;
  padding: 2rem;
  color: var(--green);
  font-weight: 600;
  font-size: 1rem;
  background: #F0FDF4;
  border-radius: 12px;
  border: 1px solid #BBF7D0;
}
.no-recs-msg.visible { display: block; }

/* ── CTA Section ────────────────────────────────────── */
.cta-section {
  margin-top: 2.5rem;
  background: var(--dark);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cta-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255,107,77,0.08) 0%, transparent 70%);
  pointer-events: none;
}
.cta-section h2 {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  position: relative;
}
.cta-section p {
  color: rgba(255,255,255,0.6);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--coral), #FF8A6B);
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 1.05rem;
  padding: 0.9rem 2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.15s, box-shadow 0.15s;
  position: relative;
}
.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255,107,77,0.3);
}
.cta-secondary {
  display: block;
  margin-top: 0.75rem;
  color: rgba(255,255,255,0.4);
  font-size: 0.8rem;
  position: relative;
}

/* ── Action Bar (Print) ─────────────────────────────── */
.action-bar {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.55rem 1.1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text);
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.action-btn:hover {
  background: var(--surface-alt);
  border-color: #CBD5E1;
}
.action-btn svg {
  width: 16px;
  height: 16px;
}

/* ── Footer ─────────────────────────────────────────── */
.audit-footer {
  text-align: center;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.78rem;
}
.audit-footer a {
  color: var(--coral);
  text-decoration: none;
  font-weight: 500;
}

/* ── Score Summary Row ──────────────────────────────── */
.score-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 1.25rem;
}
.score-summary-item {
  text-align: center;
  padding: 0.6rem 0.5rem;
  background: var(--surface-alt);
  border-radius: 8px;
}
.score-summary-item .ssi-label {
  font-size: 0.65rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}
.score-summary-item .ssi-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 0.15rem;
}

/* ── Print Styles ───────────────────────────────────── */
@media print {
  body { background: #fff !important; font-size: 14px; }
  .page-wrap { max-width: 100%; padding: 0; }
  .action-bar { display: none !important; }
  .audit-header {
    border-radius: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .category-card, .rec-card, .overall-score-card, .business-input-section {
    break-inside: avoid;
    box-shadow: none;
  }
  .cta-section {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    break-inside: avoid;
  }
  input[type="range"] { display: none; }
  .slider-row { display: none; }
  .slider-min, .slider-max { display: none; }
  .score-bar-container { margin-bottom: 0.5rem; }
  .notes-area {
    border: none;
    background: transparent;
    padding: 0;
    resize: none;
    min-height: auto;
  }
  .notes-area:empty { display: none; }
  .notes-area::placeholder { color: transparent; }
  .business-input-section input {
    border-bottom: none;
  }
  .rec-card { break-inside: avoid; }
  .gauge-fill circle, .gauge-bg circle, .score-bar-fill, .category-icon,
  .rec-price, .no-recs-msg, .confidential-badge, .nws-logo-mark {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  a { color: var(--coral) !important; }
}

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 640px) {
  .page-wrap { padding: 1rem; }
  .audit-header { padding: 1.5rem; }
  .header-title h1 { font-size: 1.35rem; }
  .business-input-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .business-input-section input { font-size: 1.1rem; }
  .category-card { padding: 1.25rem 1.25rem; }
  .category-top { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
  .rec-header { flex-direction: column; align-items: flex-start; gap: 0.4rem; }
  .score-summary { grid-template-columns: repeat(2, 1fr); }
  .gauge-container { width: 180px; height: 106px; }
  .gauge-bg, .gauge-fill { width: 180px; height: 180px; }
}
`;

const htmlContent = `

<div class="page-wrap">

  <!-- Action Bar -->
  <div class="action-bar">
    <button class="action-btn" onclick="window.print()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
      Print / Save as PDF
    </button>
  </div>

  <!-- Header -->
  <header class="audit-header">
    <div class="header-top">
      <div class="nws-logo">
        <div class="nws-logo-mark">NWS</div>
        <span class="nws-logo-text">Novelty Web Solutions</span>
      </div>
      <span class="header-date" id="reportDate"></span>
    </div>
    <div class="header-title">
      <h1>Business Visibility Audit Report</h1>
      <p>A data-driven snapshot of your online presence, ranked across 6 key performance areas.</p>
      <div class="confidential-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Confidential — Prepared exclusively for client
      </div>
    </div>
  </header>

  <!-- Business Name -->
  <div class="business-input-section">
    <label for="businessName">Prepared for</label>
    <input type="text" id="businessName" placeholder="Enter business name…" autocomplete="off">
  </div>

  <!-- Overall Score -->
  <section class="overall-score-card">
    <h2>Overall Visibility Score</h2>
    <div class="gauge-container">
      <svg class="gauge-bg" viewBox="0 0 220 220">
        <circle cx="110" cy="110" r="90" stroke-dasharray="283" stroke-dashoffset="-141.5"/>
      </svg>
      <svg class="gauge-fill" viewBox="0 0 220 220">
        <circle id="gaugeFill" cx="110" cy="110" r="90" stroke-dasharray="283" stroke-dashoffset="283"/>
      </svg>
      <div class="gauge-score">
        <div class="score-number" id="overallScore">5.0</div>
        <div class="score-label">out of 10</div>
      </div>
    </div>
    <div class="overall-grade" id="overallGrade">Average</div>

    <div class="score-summary">
      <div class="score-summary-item">
        <div class="ssi-label">Strongest</div>
        <div class="ssi-value" id="strongestCat">—</div>
      </div>
      <div class="score-summary-item">
        <div class="ssi-label">Weakest</div>
        <div class="ssi-value" id="weakestCat">—</div>
      </div>
      <div class="score-summary-item">
        <div class="ssi-label">Action Items</div>
        <div class="ssi-value" id="actionCount">0</div>
      </div>
    </div>
  </section>

  <!-- Categories -->
  <section class="categories-section">
    <h2>Category Breakdown</h2>

    <!-- 1. Website Quality -->
    <div class="category-card" data-category="website">
      <div class="category-top">
        <div class="category-label">
          <div class="category-icon website">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <div>
            <div class="category-name">Website Quality</div>
            <div class="category-desc">Speed, mobile-friendliness, SSL, SEO basics</div>
          </div>
        </div>
        <div class="category-score-display">
          <span class="category-score-num" id="score-website">5</span>
          <span class="category-score-den">/10</span>
        </div>
      </div>
      <div class="slider-row">
        <span class="slider-min">1</span>
        <input type="range" min="1" max="10" value="5" data-target="website">
        <span class="slider-max">10</span>
      </div>
      <div class="score-bar-container">
        <div class="score-bar-fill" id="bar-website" style="width:50%;background:var(--yellow);"></div>
      </div>
      <label class="notes-label">Notes</label>
      <textarea class="notes-area" placeholder="Add observations about their website…" rows="2"></textarea>
    </div>

    <!-- 2. Google Presence -->
    <div class="category-card" data-category="google">
      <div class="category-top">
        <div class="category-label">
          <div class="category-icon google">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div>
            <div class="category-name">Google Presence</div>
            <div class="category-desc">Google Business Profile, reviews, map ranking</div>
          </div>
        </div>
        <div class="category-score-display">
          <span class="category-score-num" id="score-google">5</span>
          <span class="category-score-den">/10</span>
        </div>
      </div>
      <div class="slider-row">
        <span class="slider-min">1</span>
        <input type="range" min="1" max="10" value="5" data-target="google">
        <span class="slider-max">10</span>
      </div>
      <div class="score-bar-container">
        <div class="score-bar-fill" id="bar-google" style="width:50%;background:var(--yellow);"></div>
      </div>
      <label class="notes-label">Notes</label>
      <textarea class="notes-area" placeholder="Add observations about their Google presence…" rows="2"></textarea>
    </div>

    <!-- 3. Social Media -->
    <div class="category-card" data-category="social">
      <div class="category-top">
        <div class="category-label">
          <div class="category-icon social">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </div>
          <div>
            <div class="category-name">Social Media</div>
            <div class="category-desc">Active accounts, engagement, consistency</div>
          </div>
        </div>
        <div class="category-score-display">
          <span class="category-score-num" id="score-social">5</span>
          <span class="category-score-den">/10</span>
        </div>
      </div>
      <div class="slider-row">
        <span class="slider-min">1</span>
        <input type="range" min="1" max="10" value="5" data-target="social">
        <span class="slider-max">10</span>
      </div>
      <div class="score-bar-container">
        <div class="score-bar-fill" id="bar-social" style="width:50%;background:var(--yellow);"></div>
      </div>
      <label class="notes-label">Notes</label>
      <textarea class="notes-area" placeholder="Add observations about their social media…" rows="2"></textarea>
    </div>

    <!-- 4. Online Reputation -->
    <div class="category-card" data-category="reputation">
      <div class="category-top">
        <div class="category-label">
          <div class="category-icon reputation">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div>
            <div class="category-name">Online Reputation</div>
            <div class="category-desc">Review scores, response rate, sentiment</div>
          </div>
        </div>
        <div class="category-score-display">
          <span class="category-score-num" id="score-reputation">5</span>
          <span class="category-score-den">/10</span>
        </div>
      </div>
      <div class="slider-row">
        <span class="slider-min">1</span>
        <input type="range" min="1" max="10" value="5" data-target="reputation">
        <span class="slider-max">10</span>
      </div>
      <div class="score-bar-container">
        <div class="score-bar-fill" id="bar-reputation" style="width:50%;background:var(--yellow);"></div>
      </div>
      <label class="notes-label">Notes</label>
      <textarea class="notes-area" placeholder="Add observations about their online reputation…" rows="2"></textarea>
    </div>

    <!-- 5. Lead Capture -->
    <div class="category-card" data-category="leads">
      <div class="category-top">
        <div class="category-label">
          <div class="category-icon leads">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div>
            <div class="category-name">Lead Capture</div>
            <div class="category-desc">Contact forms, chat widgets, CTAs</div>
          </div>
        </div>
        <div class="category-score-display">
          <span class="category-score-num" id="score-leads">5</span>
          <span class="category-score-den">/10</span>
        </div>
      </div>
      <div class="slider-row">
        <span class="slider-min">1</span>
        <input type="range" min="1" max="10" value="5" data-target="leads">
        <span class="slider-max">10</span>
      </div>
      <div class="score-bar-container">
        <div class="score-bar-fill" id="bar-leads" style="width:50%;background:var(--yellow);"></div>
      </div>
      <label class="notes-label">Notes</label>
      <textarea class="notes-area" placeholder="Add observations about their lead capture…" rows="2"></textarea>
    </div>

    <!-- 6. Follow-Up System -->
    <div class="category-card" data-category="followup">
      <div class="category-top">
        <div class="category-label">
          <div class="category-icon followup">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
          </div>
          <div>
            <div class="category-name">Follow-Up System</div>
            <div class="category-desc">CRM, automated responses, missed call handling</div>
          </div>
        </div>
        <div class="category-score-display">
          <span class="category-score-num" id="score-followup">5</span>
          <span class="category-score-den">/10</span>
        </div>
      </div>
      <div class="slider-row">
        <span class="slider-min">1</span>
        <input type="range" min="1" max="10" value="5" data-target="followup">
        <span class="slider-max">10</span>
      </div>
      <div class="score-bar-container">
        <div class="score-bar-fill" id="bar-followup" style="width:50%;background:var(--yellow);"></div>
      </div>
      <label class="notes-label">Notes</label>
      <textarea class="notes-area" placeholder="Add observations about their follow-up system…" rows="2"></textarea>
    </div>

  </section>

  <!-- Recommendations -->
  <section class="recommendations-section">
    <h2>Recommended Solutions</h2>
    <p>Based on the scores above, these are the areas where NWS can deliver immediate impact.</p>

    <div class="rec-card website" id="rec-website">
      <div class="rec-header">
        <span class="rec-title">Customer Acquisition Engine</span>
        <span class="rec-price">\$297/mo</span>
      </div>
      <div class="rec-body">
        Your website is underperforming as a sales tool. We'll rebuild it into a high-converting acquisition engine that loads fast, ranks well, and turns visitors into leads.
        <ul class="rec-features">
          <li>Custom high-performance website</li>
          <li>On-page SEO and technical optimization</li>
          <li>Mobile-first responsive design</li>
          <li>SSL, speed, and Core Web Vitals tuning</li>
        </ul>
      </div>
    </div>

    <div class="rec-card leads" id="rec-leads">
      <div class="rec-header">
        <span class="rec-title">AI Receptionist (Growth Tier)</span>
        <span class="rec-price">\$297/mo</span>
      </div>
      <div class="rec-body">
        Prospects are visiting, but you're missing the capture. An AI-powered receptionist ensures every inquiry gets answered instantly — 24/7, no leads left behind.
        <ul class="rec-features">
          <li>AI chat widget on your website</li>
          <li>Automated appointment booking</li>
          <li>Smart lead qualification</li>
          <li>Multi-channel capture (web, SMS, voice)</li>
        </ul>
      </div>
    </div>

    <div class="rec-card followup" id="rec-followup">
      <div class="rec-header">
        <span class="rec-title">Sales Automation (Starter Tier)</span>
        <span class="rec-price">\$97/mo</span>
      </div>
      <div class="rec-body">
        Leads go cold when follow-up is manual or delayed. Automated workflows ensure every prospect gets the right message at the right time, moving them toward a sale.
        <ul class="rec-features">
          <li>CRM setup and pipeline management</li>
          <li>Automated email and SMS sequences</li>
          <li>Missed call text-back</li>
          <li>Task reminders and lead scoring</li>
        </ul>
      </div>
    </div>

    <div class="rec-card visibility" id="rec-visibility">
      <div class="rec-header">
        <span class="rec-title">AI Visibility (Growth Tier)</span>
        <span class="rec-price">\$297/mo</span>
      </div>
      <div class="rec-body">
        Your business is invisible in local search and social. We fix your Google profile, build your review engine, and create consistent social presence that drives discovery.
        <ul class="rec-features">
          <li>Google Business Profile optimization</li>
          <li>Automated review request campaigns</li>
          <li>Social media content and scheduling</li>
          <li>Reputation monitoring and response management</li>
        </ul>
      </div>
    </div>

    <div class="rec-card bundle" id="rec-bundle">
      <div class="rec-header">
        <span class="rec-title">🚀 Scale Bundle — NWS Business OS Pro</span>
        <span class="rec-price">\$497/mo</span>
      </div>
      <div class="rec-body">
        Multiple gaps compound each other. When 4 or more areas are underperforming, our Pro tier delivers the biggest ROI — combining all features with custom AI multi-agent workflows.
        <ul class="rec-features">
          <li>Everything in all recommended services above</li>
          <li>Dedicated account manager</li>
          <li>Monthly performance reporting</li>
          <li>Priority support and quarterly strategy reviews</li>
        </ul>
      </div>
    </div>

    <div class="no-recs-msg" id="noRecsMsg">
      ✓ All areas are scoring well. No critical gaps found.
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section">
    <h2>Ready to fix these gaps?</h2>
    <p>Book a free 30-minute strategy call. We'll walk through this report together and build a game plan to grow your visibility.</p>
    <a href="/book" class="cta-btn" target="_blank">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      Book a Free Strategy Call
    </a>
    <span class="cta-secondary">No obligation. No pressure. Just a conversation.</span>
  </section>

  <!-- Footer -->
  <footer class="audit-footer">
    <p>This report was generated by <a href="https://noveltywebsolutions.com" target="_blank">Novelty Web Solutions</a>. All scores are based on publicly available data and manual review. This is not a substitute for a full technical audit.</p>
  </footer>

</div>

`;

export default function BusinessAuditMockup() {
  useEffect(() => {

(function () {
  'use strict';

  /* ── Date ─────────────────────────────────────────── */
  const now = new Date();
  document.getElementById('reportDate').textContent = now.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  /* ── Category config ──────────────────────────────── */
  const categories = ['website', 'google', 'social', 'reputation', 'leads', 'followup'];
  const categoryNames = {
    website: 'Website', google: 'Google', social: 'Social',
    reputation: 'Reputation', leads: 'Lead Capture', followup: 'Follow-Up'
  };

  const THRESHOLD = 6; // scores at or below this trigger recommendations

  /* ── Score color helper ───────────────────────────── */
  function scoreColor(val) {
    if (val <= 3)  return 'var(--red)';
    if (val <= 6)  return 'var(--yellow)';
    return 'var(--green)';
  }

  function gradeLabel(avg) {
    if (avg <= 2)  return { text: 'Critical', color: 'var(--red)' };
    if (avg <= 4)  return { text: 'Poor', color: 'var(--red)' };
    if (avg <= 5)  return { text: 'Below Average', color: 'var(--yellow)' };
    if (avg <= 6)  return { text: 'Average', color: 'var(--yellow)' };
    if (avg <= 7.5) return { text: 'Good', color: 'var(--teal)' };
    if (avg <= 9)  return { text: 'Strong', color: 'var(--green)' };
    return { text: 'Excellent', color: 'var(--green)' };
  }

  /* ── Update everything ────────────────────────────── */
  function updateAll() {
    const scores = {};
    let total = 0;

    categories.forEach(cat => {
      const slider = document.querySelector(`input[data-target="${cat}"]`);
      const val = parseInt(slider.value, 10);
      scores[cat] = val;
      total += val;

      // Update score display
      const scoreEl = document.getElementById('score-' + cat);
      scoreEl.textContent = val;
      scoreEl.style.color = scoreColor(val);

      // Update bar
      const bar = document.getElementById('bar-' + cat);
      bar.style.width = (val * 10) + '%';
      bar.style.background = scoreColor(val);

      // Update slider thumb color
      slider.style.setProperty('--thumb-color', scoreColor(val));
    });

    // Overall
    const avg = total / categories.length;
    const avgRounded = Math.round(avg * 10) / 10;
    document.getElementById('overallScore').textContent = avgRounded.toFixed(1);
    document.getElementById('overallScore').style.color = scoreColor(avgRounded);

    const grade = gradeLabel(avgRounded);
    const gradeEl = document.getElementById('overallGrade');
    gradeEl.textContent = grade.text;
    gradeEl.style.color = grade.color;

    // Gauge arc
    const maxArc = 283; // half circumference for semi-circle
    const halfArc = maxArc / 2;
    const fillAmount = halfArc - (halfArc * (avgRounded / 10));
    const gaugeFill = document.getElementById('gaugeFill');
    gaugeFill.style.strokeDashoffset = (halfArc + fillAmount).toString();
    gaugeFill.style.stroke = scoreColor(avgRounded);

    // Strongest / Weakest
    let strongest = categories[0], weakest = categories[0];
    categories.forEach(cat => {
      if (scores[cat] > scores[strongest]) strongest = cat;
      if (scores[cat] < scores[weakest]) weakest = cat;
    });
    document.getElementById('strongestCat').textContent = categoryNames[strongest];
    document.getElementById('strongestCat').style.color = scoreColor(scores[strongest]);
    document.getElementById('weakestCat').textContent = categoryNames[weakest];
    document.getElementById('weakestCat').style.color = scoreColor(scores[weakest]);

    // Recommendations
    let recCount = 0;

    // Website
    const showWebsite = scores.website <= THRESHOLD;
    document.getElementById('rec-website').classList.toggle('visible', showWebsite);
    if (showWebsite) recCount++;

    // Lead Capture → AI Receptionist
    const showLeads = scores.leads <= THRESHOLD;
    document.getElementById('rec-leads').classList.toggle('visible', showLeads);
    if (showLeads) recCount++;

    // Follow-Up → Sales Automation
    const showFollowup = scores.followup <= THRESHOLD;
    document.getElementById('rec-followup').classList.toggle('visible', showFollowup);
    if (showFollowup) recCount++;

    // Google / Social / Reputation → AI Visibility
    const showVisibility = scores.google <= THRESHOLD || scores.social <= THRESHOLD || scores.reputation <= THRESHOLD;
    document.getElementById('rec-visibility').classList.toggle('visible', showVisibility);
    if (showVisibility) recCount++;

    // Bundle: 4+ weak areas
    const weakAreas = categories.filter(cat => scores[cat] <= THRESHOLD).length;
    const showBundle = weakAreas >= 4;
    document.getElementById('rec-bundle').classList.toggle('visible', showBundle);

    // No recs message
    document.getElementById('noRecsMsg').classList.toggle('visible', recCount === 0);

    // Action items count
    document.getElementById('actionCount').textContent = recCount;
    document.getElementById('actionCount').style.color = recCount === 0 ? 'var(--green)' : 'var(--coral)';
  }

  /* ── Event listeners ──────────────────────────────── */
  document.querySelectorAll('input[type="range"]').forEach(slider => {
    slider.addEventListener('input', updateAll);
  });

  /* ── Initial render ───────────────────────────────── */
  updateAll();
})();

  }, []);

  return (
    <div className="business-audit-mockup-wrapper bg-transparent w-full">
      <style dangerouslySetInnerHTML={{ __html: styleContent }} />
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
