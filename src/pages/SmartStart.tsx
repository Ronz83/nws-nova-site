import React from 'react';

const htmlContent = `
  <!-- TOP NAV -->
  <nav class="top-nav">
    <div class="logo">N<span>W</span>S</div>
    <div class="trust-badge">Get Business OS Free — No Credit Card Required</div>
  </nav>

  <!-- PROGRESS BAR -->
  <div class="progress-wrap" id="progressWrap">
    <div class="progress-meta">
      <span class="progress-label" id="progressLabel">Step 1 — Industry</span>
      <span class="progress-step-count" id="progressCount">1 / 5</span>
    </div>
    <div class="progress-bar-track">
      <div class="progress-bar-fill" id="progressFill" style="width:20%"></div>
    </div>
    <div class="step-dots" id="stepDots"></div>
  </div>

  <!-- SURVEY CONTAINER -->
  <div class="survey-container" id="surveyContainer">

    <!-- ══════════════════════════════════════════════════ -->
    <!-- STEP 1: INDUSTRY -->
    <!-- ══════════════════════════════════════════════════ -->
    <div class="step active" id="step-1">
      <div class="step-header">
        <h1 class="step-headline">What type of business do you run?</h1>
        <p class="step-subtext">We'll tailor your Business OS and recommendations to your industry.</p>
      </div>

      <div class="card-grid" id="industryGrid">
        <div class="option-card" data-value="home_services" onclick="selectIndustry(this)">
          <span class="card-icon">🏠</span>
          <span class="card-label">Home Services</span>
        </div>
        <div class="option-card" data-value="automotive" onclick="selectIndustry(this)">
          <span class="card-icon">🚗</span>
          <span class="card-label">Automotive</span>
        </div>
        <div class="option-card" data-value="real_estate" onclick="selectIndustry(this)">
          <span class="card-icon">🏡</span>
          <span class="card-label">Real Estate</span>
        </div>
        <div class="option-card" data-value="dental_medical" onclick="selectIndustry(this)">
          <span class="card-icon">🦷</span>
          <span class="card-label">Dental & Medical</span>
        </div>
        <div class="option-card" data-value="veterinary" onclick="selectIndustry(this)">
          <span class="card-icon">🐾</span>
          <span class="card-label">Veterinary</span>
        </div>
        <div class="option-card" data-value="hospitality" onclick="selectIndustry(this)">
          <span class="card-icon">🏨</span>
          <span class="card-label">Hospitality</span>
        </div>
        <div class="option-card" data-value="death_care" onclick="selectIndustry(this)">
          <span class="card-icon">⚰️</span>
          <span class="card-label">Death Care</span>
        </div>
        <div class="option-card" data-value="other" onclick="selectIndustry(this)">
          <span class="card-icon">🏪</span>
          <span class="card-label">Other / General</span>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════ -->
    <!-- STEP 2: BUSINESS BASICS -->
    <!-- ══════════════════════════════════════════════════ -->
    <div class="step" id="step-2">
      <div class="step-header">
        <h2 class="step-headline">Tell us about your business</h2>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="businessName">Business Name</label>
          <input class="form-input" type="text" id="businessName" placeholder="e.g. Smith's Plumbing" oninput="state.businessName = this.value" />
        </div>
        <div class="form-group">
          <label class="form-label" for="location">City / Location</label>
          <input class="form-input" type="text" id="location" placeholder="e.g. Miami, FL" oninput="state.location = this.value" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="yearsInBusiness">How long have you been in business?</label>
        <select class="form-select" id="yearsInBusiness" onchange="state.yearsInBusiness = this.value">
          <option value="" disabled selected>Select one...</option>
          <option value="less_than_1">Less than 1 year</option>
          <option value="1_to_3">1–3 years</option>
          <option value="3_to_10">3–10 years</option>
          <option value="10_plus">10+ years</option>
        </select>
      </div>

      <div class="section-divider">Team size</div>
      <div class="card-grid two-col" id="staffGrid">
        <div class="option-card" data-value="solo" onclick="selectStaff(this)">
          <span class="card-icon">👤</span>
          <span class="card-label">Just me</span>
        </div>
        <div class="option-card" data-value="small" onclick="selectStaff(this)">
          <span class="card-icon">👥</span>
          <span class="card-label">2–10 people</span>
        </div>
        <div class="option-card" data-value="medium" onclick="selectStaff(this)">
          <span class="card-icon">🏢</span>
          <span class="card-label">11–50 people</span>
        </div>
        <div class="option-card" data-value="large" onclick="selectStaff(this)">
          <span class="card-icon">🏭</span>
          <span class="card-label">50+ people</span>
        </div>
      </div>
      <p class="error-msg" id="err-step2">Please fill in your business name and select a team size.</p>

      <div class="btn-nav-row">
        <button class="btn btn-secondary" onclick="goToStep(1)">← Back</button>
        <button class="btn btn-primary" onclick="advanceStep2()">Continue →</button>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════ -->
    <!-- STEP 3: PAIN POINTS -->
    <!-- ══════════════════════════════════════════════════ -->
    <div class="step" id="step-3">
      <div class="step-header">
        <h2 class="step-headline">Where are you losing revenue right now?</h2>
        <p class="step-subtext">Be honest — this is how we build the right automation for you.</p>
      </div>

      <div class="checkbox-grid" id="painPointsGrid" style="grid-template-columns:1fr;"></div>

      <p class="error-msg" id="err-step3">Select at least one pain point to continue.</p>

      <div class="btn-nav-row" style="margin-top:24px;">
        <button class="btn btn-secondary" onclick="goToStep(2)">← Back</button>
        <button class="btn btn-primary" onclick="advanceStep3()">Show My Analysis →</button>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════ -->
    <!-- STEP 4: THE REVEAL -->
    <!-- ══════════════════════════════════════════════════ -->
    <div class="step" id="step-4">

      <!-- PART A: Pain Analysis -->
      <div id="revealPartA" class="reveal-section">
        <h2 class="reveal-headline" id="revealHeadline">Here's what our analysis found</h2>
        <p class="reveal-subtext">Based on your answers</p>
        <div id="painCardsContainer"></div>
      </div>

      <!-- PART B: The Offer (revealed after 1.5s) -->
      <div id="revealPartB" class="hidden">

        <div class="section-divider" style="margin-top:0;">Here's what you get</div>

        <!-- Starter / Growth / Pro offers -->
        <div id="offerStandardWrap">
          <div class="offer-columns" id="offerColumns">
            <!-- FREE column -->
            <div class="offer-card free-card">
              <div class="offer-title">Business OS Free</div>
              <div class="offer-badge"><span class="badge-free">FREE</span></div>
              <ul class="offer-list" id="freeList">
                <li><span class="li-check">✅</span> Industry CRM (50 contacts max)</li>
                <li><span class="li-check">✅</span> Essential Business Website Template</li>
                <li><span class="li-check">✅</span> Unified Inbox (preview mode)</li>
                <li><span class="li-check">✅</span> Lead capture form</li>
                <li><span class="li-check">✅</span> Your business audit PDF report</li>
                <li><span class="li-check" style="color:var(--gold)">🌴</span> <strong style="color:var(--gold)">Free CB Connect listing</strong> — your business on the Caribbean's #1 directory</li>
              </ul>
              <p class="offer-note">The software is yours free. Upgrade to a paid tier to host your site on your domain, unlock unlimited CRM contacts, and add AI automations.</p>
            </div>

            <!-- PLAN column -->
            <div class="offer-card plan-card" id="planCard">
              <div class="offer-title" id="planTitle">NWS Recommended Tier</div>
              <div class="offer-badge">
                <span class="badge-price" id="planPriceDisplay">$97</span>
                <span class="badge-per-mo">/mo</span>
              </div>
              <ul class="offer-list" id="planFeaturesList"></ul>
              <p class="offer-note" id="planNote"></p>
            </div>
          </div>
        </div>

        <div class="urgency-bar">🔥 July Promotion — 10 spots remaining. Free website + free CB Connect directory listing included with every free signup this month.</div>

        <button class="btn btn-primary mt-8" onclick="goToStep(5)">Claim My Free Business OS →</button>
      </div>

      <div class="btn-nav-row" style="margin-top:16px;">
        <button class="btn btn-secondary" onclick="goToStep(3)">← Back</button>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════ -->
    <!-- STEP 5: CONTACT FORM -->
    <!-- ══════════════════════════════════════════════════ -->
    <div class="step" id="step-5">
      <div class="step-header">
        <h2 class="step-headline">Almost there — where do we set up your account?</h2>
        <p class="step-subtext">We'll reach out within 24 hours to kick things off.</p>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="firstName">First Name</label>
          <input class="form-input" type="text" id="firstName" placeholder="Jane" oninput="state.firstName = this.value" />
        </div>
        <div class="form-group">
          <label class="form-label" for="lastName">Last Name</label>
          <input class="form-input" type="text" id="lastName" placeholder="Smith" oninput="state.lastName = this.value" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="email">Email Address</label>
        <input class="form-input" type="email" id="email" placeholder="jane@mybusiness.com" oninput="state.email = this.value" />
      </div>

      <div class="form-group">
        <label class="form-label" for="phone">Phone / WhatsApp Number</label>
        <input class="form-input" type="tel" id="phone" placeholder="+1 (555) 000-0000" oninput="state.phone = this.value" />
      </div>

      <div class="form-group">
        <label class="form-label" for="notes">Anything else we should know? <span style="color:var(--text-faint)">(Optional)</span></label>
        <textarea class="form-textarea" id="notes" placeholder="Tell us anything that'll help us set up your OS better..." oninput="state.notes = this.value"></textarea>
      </div>

      <p class="error-msg" id="err-step5">Please fill in your name, email, and phone number.</p>

      <div class="btn-nav-row">
        <button class="btn btn-secondary" onclick="goToStep(4)">← Back</button>
        <button class="btn btn-primary" onclick="submitForm()">Create My Free Account →</button>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════ -->
    <!-- SUCCESS SCREEN -->
    <!-- ══════════════════════════════════════════════════ -->
    <div class="success-screen" id="successScreen">
      <div class="success-icon">🎉</div>
      <h2 class="success-headline">You're in!</h2>
      <p class="success-body">
        We'll be in touch within <strong>24 hours</strong> to get your account set up.<br />
        Check your email for your free Business Audit Report in the meantime.
      </p>

      <div class="success-plan-reminder" id="successPlanReminder">
        <h4>Your Recommended Upgrade</h4>
        <div class="success-plan-price" id="successPrice">$97<span style="font-size:1rem;color:var(--text-muted)">/mo</span></div>
        <div class="success-plan-tier" id="successTier">NWS Starter Tier</div>
        <ul class="success-plan-features" id="successFeatures"></ul>
      </div>

      <a id="mailtoLink" href="#" class="btn btn-primary" style="max-width:380px;margin:0 auto;">
        Open Email Confirmation →
      </a>
      <p style="font-size:0.75rem;color:var(--text-faint);margin-top:14px;">
        Or reach us directly at <a href="mailto:info@noveltywebsolutions.com" style="color:var(--teal)">info@noveltywebsolutions.com</a>
      </p>
    </div>

  </div><!-- /survey-container -->
`;

const scriptContent = `
    const state = {
      industry: null,
      businessName: '',
      location: '',
      yearsInBusiness: '',
      staffSize: '',
      painPoints: [],
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      notes: '',
      planTier: '',
      recommendedPrice: '',
    };

    const industryLabels = {
      home_services: 'Home Services',
      automotive: 'Automotive',
      real_estate: 'Real Estate',
      dental_medical: 'Dental & Medical',
      veterinary: 'Veterinary',
      hospitality: 'Hospitality',
      death_care: 'Death Care',
      other: 'General Business',
    };

    const painPointMap = {
      home_services: [
        { emoji: '📵', label: 'Missing calls after hours', impact: 'Industry data shows missed calls cost service businesses $200–$800 per unanswered call.' },
        { emoji: '⏳', label: 'Losing leads who don\\'t hear back fast', impact: 'Leads contacted within 5 minutes are 21× more likely to convert than those reached after 30 minutes.' },
        { emoji: '🏆', label: 'Customers choosing competitors who respond faster', impact: 'Speed-to-lead is the #1 differentiator in local home services markets.' },
        { emoji: '🔁', label: 'No system to follow up with leads', impact: 'Most local businesses lose 40–60% of potential revenue to zero follow-up.' },
        { emoji: '⭐', label: 'Difficult to get Google reviews', impact: 'Businesses with 50+ reviews earn 47% more revenue than those with fewer than 10.' },
      ],
      automotive: [
        { emoji: '🔧', label: 'Customers don\\'t come back for recommended repairs', impact: 'Declined repair follow-up alone represents $3,000–$8,000 in lost revenue per bay monthly.' },
        { emoji: '📅', label: 'Missed service inquiries on weekends', impact: 'Over 60% of automotive searches happen outside business hours.' },
        { emoji: '🔁', label: 'No way to follow up after a visit', impact: 'Repeat customers spend 67% more than first-time visitors — but only if you stay in contact.' },
        { emoji: '⭐', label: 'Low online review count', impact: '93% of consumers check online reviews before choosing an automotive business.' },
        { emoji: '🗓️', label: 'Hard to fill last-minute appointment slots', impact: 'Empty bays cost an average of $400–$900/day in unbilled labor.' },
      ],
      real_estate: [
        { emoji: '🧊', label: 'Portal leads go cold before you can call', impact: 'Real estate leads lose 80% of their conversion potential if not contacted within 10 minutes.' },
        { emoji: '🏃', label: 'Losing leads to agents who respond faster', impact: '78% of buyers work with the first agent who responds to their inquiry.' },
        { emoji: '📬', label: 'No automated follow-up for interested buyers', impact: 'Agents using automated follow-up close 33% more deals annually.' },
        { emoji: '📋', label: 'Juggling too many leads manually', impact: 'Manual lead management results in an average 35% of leads being lost or forgotten.' },
        { emoji: '👁️', label: 'Not enough online visibility', impact: 'Only 12% of buyers find their agent through a referral — the rest start online.' },
      ],
      dental_medical: [
        { emoji: '📋', label: 'Patients don\\'t accept treatment plans', impact: 'Practices with automated treatment follow-up see 28% higher case acceptance rates.' },
        { emoji: '🚫', label: 'Too many no-shows and cancellations', impact: 'No-shows cost an average dental practice $50,000–$80,000 per year.' },
        { emoji: '🔔', label: 'Slow patient recall process', impact: 'Practices with automated recall fill 40% more hygiene chairs annually.' },
        { emoji: '📞', label: 'Staff spending too much time on the phone', impact: 'Front desk phone management costs the average practice 12+ hours per week.' },
        { emoji: '⭐', label: 'Not enough new patient reviews', impact: '84% of patients trust online reviews as much as personal recommendations.' },
      ],
      veterinary: [
        { emoji: '🐾', label: 'Pet owners don\\'t return for follow-up care', impact: 'Practices with automated recall reminders see 31% higher patient retention.' },
        { emoji: '🚫', label: 'Appointment no-shows waste clinic capacity', impact: 'Each missed appointment costs clinics an average of $120–$250 in lost revenue.' },
        { emoji: '📞', label: 'Staff overwhelmed with calls and inquiries', impact: 'Front desk overflow costs the average clinic 10–15 hours weekly in wasted staff time.' },
        { emoji: '💉', label: 'No automated wellness reminders', impact: 'Automated reminders increase preventive care compliance by up to 40%.' },
        { emoji: '🌙', label: 'After-hours emergency calls go unanswered', impact: 'Unanswered calls during off-hours result in 65% of pet owners calling a competitor.' },
      ],
      hospitality: [
        { emoji: '🌙', label: 'Lose bookings after hours', impact: '43% of restaurant reservations are made outside business hours — and go unanswered.' },
        { emoji: '🚫', label: 'No-shows hurt revenue', impact: 'Restaurant no-shows cost the industry an estimated $225 per empty table per evening.' },
        { emoji: '📋', label: 'Hard to manage waitlists efficiently', impact: 'Manual waitlists lead to 22% higher table abandonment rates.' },
        { emoji: '🔁', label: 'Inconsistent follow-up with guests', impact: 'A single follow-up message increases repeat visit rate by 26%.' },
        { emoji: '📱', label: 'Slow response to DMs and inquiries', impact: '53% of consumers won\\'t wait more than one hour for a social media response before moving on.' },
      ],
      death_care: [
        { emoji: '🌿', label: 'Pre-need leads not being nurtured', impact: 'Only 28% of pre-need inquiries are followed up with — leaving significant revenue untouched.' },
        { emoji: '👥', label: 'Staff stretched thin during high-volume periods', impact: 'Demand spikes during peak periods can overwhelm small teams, risking service quality.' },
        { emoji: '💻', label: 'No digital presence for grief support resources', impact: 'Funeral homes with online grief support content see 3× more engagement from at-need families.' },
        { emoji: '🤝', label: 'Hard to handle sensitive inquiries at scale', impact: 'Automated intake routing ensures no sensitive inquiry falls through the cracks.' },
        { emoji: '📬', label: 'No system for aftercare follow-up', impact: 'Aftercare outreach increases memorial merchandise and future pre-need conversations by 35%.' },
      ],
      other: [
        { emoji: '🔁', label: 'Inconsistent lead follow-up', impact: 'Only 27% of leads are ever contacted after initial inquiry — and follow-up drops off sharply after the first attempt.' },
        { emoji: '📵', label: 'Missing calls or messages', impact: 'Missed calls cost the average small business $1,200–$3,000 per month in lost opportunity.' },
        { emoji: '👁️', label: 'Low online visibility', impact: '97% of consumers search online for local businesses before making a purchase decision.' },
        { emoji: '⭐', label: 'Hard to get more reviews', impact: 'Businesses averaging 4+ stars earn 18% more revenue than those below 4 stars.' },
        { emoji: '📅', label: 'No automated booking system', impact: 'Businesses with online booking capture 30% more appointments than phone-only operations.' },
      ],
    };

    const starterFeatures = [
      'Unlimited CRM Contacts',
      'Custom Hosted Website (SEO Ready)',
      'Full Unified Inbox (Email/FB/IG)',
      'Basic Email Campaigns',
      'Appointment Booking'
    ];
    const growthFeatures = [
      'Everything in Starter, PLUS:',
      'Voice AI Receptionist (24/7 coverage)',
      'Chat AI Website Widget',
      'Reputation Management AI',
      'Advanced Workflow Automations',
      'WhatsApp Integration'
    ];
    const proFeatures = [
      'Everything in Growth, PLUS:',
      'Custom AI Workflow Builder',
      'Multi-Location Support',
      'NWS Business Mobile App',
      'White Glove Onboarding',
      '24/7 SLA Priority Support'
    ];

    let currentStep = 1;
    const totalSteps = 5;
    const stepLabels = ['Industry', 'Business Info', 'Pain Points', 'Your Analysis', 'Claim It'];

    function buildDots() {
      const wrap = document.getElementById('stepDots');
      wrap.innerHTML = '';
      for (let i = 1; i <= totalSteps; i++) {
        const d = document.createElement('div');
        d.className = 'step-dot';
        if (i < currentStep) d.classList.add('done');
        else if (i === currentStep) d.classList.add('active');
        wrap.appendChild(d);
      }
    }

    function updateProgress(step) {
      currentStep = step;
      const pct = ((step - 1) / totalSteps) * 100 + (100 / totalSteps);
      document.getElementById('progressFill').style.width = Math.min(pct, 100) + '%';
      document.getElementById('progressLabel').textContent = \`Step \${step} — \${stepLabels[step - 1]}\`;
      document.getElementById('progressCount').textContent = \`\${step} / \${totalSteps}\`;
      buildDots();
    }

    function goToStep(n) {
      const curr = document.getElementById(\`step-\${currentStep}\`);
      if (curr) {
        curr.classList.add('slide-out');
        setTimeout(() => {
          curr.classList.remove('active', 'slide-out');
          showStep(n);
        }, 260);
      } else {
        showStep(n);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showStep(n) {
      const el = document.getElementById(\`step-\${n}\`);
      if (!el) return;
      el.classList.add('active');
      updateProgress(n);
      if (n === 3) buildPainPoints();
      if (n === 4) buildReveal();
    }

    function selectIndustry(card) {
      document.querySelectorAll('#industryGrid .option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.industry = card.dataset.value;
      setTimeout(() => goToStep(2), 400);
    }

    function selectStaff(card) {
      document.querySelectorAll('#staffGrid .option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.staffSize = card.dataset.value;
    }

    function advanceStep2() {
      const err = document.getElementById('err-step2');
      if (!state.businessName.trim() || !state.staffSize) {
        err.classList.add('visible');
        return;
      }
      err.classList.remove('visible');
      computePlan();
      goToStep(3);
    }

    function buildPainPoints() {
      const grid = document.getElementById('painPointsGrid');
      const industry = state.industry || 'other';
      const points = painPointMap[industry] || painPointMap.other;
      grid.innerHTML = '';
      state.painPoints = [];
      points.forEach((p, i) => {
        const label = document.createElement('label');
        label.className = 'checkbox-item';
        label.dataset.pain = i;
        label.innerHTML = \`
          <input type="checkbox" />
          <div class="check-box"></div>
          <span class="check-label">\${p.emoji} \${p.label}</span>
        \`;
        label.addEventListener('click', () => {
          label.classList.toggle('checked');
          const cb = label.querySelector('input');
          cb.checked = !cb.checked;
          const box = label.querySelector('.check-box');
          box.textContent = cb.checked ? '✓' : '';
          if (cb.checked) {
            if (!state.painPoints.find(x => x.label === p.label)) state.painPoints.push(p);
          } else {
            state.painPoints = state.painPoints.filter(x => x.label !== p.label);
          }
        });
        grid.appendChild(label);
      });
    }

    function advanceStep3() {
      const err = document.getElementById('err-step3');
      if (state.painPoints.length === 0) {
        err.classList.add('visible');
        return;
      }
      err.classList.remove('visible');
      goToStep(4);
    }

    function computePlan() {
      const { staffSize } = state;
      if (staffSize === 'large') {
        state.planTier = 'pro';
        state.recommendedPrice = '$497';
      } else if (staffSize === 'small' || staffSize === 'medium') {
        state.planTier = 'growth';
        state.recommendedPrice = '$297';
      } else {
        state.planTier = 'starter';
        state.recommendedPrice = '$97';
      }
    }

    function buildReveal() {
      computePlan();

      const name = state.businessName.trim() || 'your business';
      document.getElementById('revealHeadline').textContent = \`Here's what our analysis found for \${name}\`;

      const container = document.getElementById('painCardsContainer');
      container.innerHTML = '';
      const displayPains = state.painPoints.slice(0, 3);
      displayPains.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'pain-card';
        card.style.animationDelay = \`\${i * 0.15}s\`;
        card.innerHTML = \`
          <div class="pain-card-top">
            <div class="pain-card-title">\${p.emoji} \${p.label}</div>
            <span class="badge-leak">🔴 Revenue Leak Detected</span>
          </div>
          <p class="pain-card-body">\${p.impact}</p>
        \`;
        container.appendChild(card);
      });

      const partB = document.getElementById('revealPartB');
      partB.classList.add('hidden');

      setTimeout(() => {
        partB.classList.remove('hidden');
        partB.style.animation = 'fadeUp 0.6s cubic-bezier(.4,0,.2,1) both';
        buildOfferColumns();
      }, 1500);
    }

    function buildOfferColumns() {
      const { planTier, recommendedPrice, industry } = state;
      const industryLabel = industryLabels[industry] || 'Your Industry';

      const priceDisplay = document.getElementById('planPriceDisplay');
      const planTitle = document.getElementById('planTitle');
      const featuresList = document.getElementById('planFeaturesList');
      const planNote = document.getElementById('planNote');

      if (planTier === 'pro') {
        planTitle.textContent = 'Business OS Pro';
        priceDisplay.textContent = '$497';
        featuresList.innerHTML = proFeatures.map(f =>
          \`<li><span class="li-check gold">✅</span> \${f}</li>\`
        ).join('');
        planNote.textContent = 'For multi-location SMBs. Billed monthly. Cancel anytime.';
      } else if (planTier === 'growth') {
        planTitle.textContent = 'Business OS Growth';
        priceDisplay.textContent = '$297';
        featuresList.innerHTML = growthFeatures.map(f =>
          \`<li><span class="li-check gold">✅</span> \${f}</li>\`
        ).join('');
        planNote.textContent = 'Our most popular tier. Includes AI Receptionist. Billed monthly.';
      } else {
        planTitle.textContent = 'Business OS Starter';
        priceDisplay.textContent = '$97';
        featuresList.innerHTML = starterFeatures.map(f =>
          \`<li><span class="li-check gold">✅</span> \${f}</li>\`
        ).join('');
        planNote.textContent = 'Perfect for solo operators. Billed monthly. Cancel anytime.';
      }
    }

    async function submitForm() {
      const err = document.getElementById('err-step5');
      const { firstName, lastName, email, phone, businessName } = state;
      if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
        err.classList.add('visible');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        err.textContent = 'Please enter a valid email address.';
        err.classList.add('visible');
        return;
      }
      err.classList.remove('visible');

      const btn = document.querySelector('#step-5 .btn-primary');
      if (btn) {
        btn.innerHTML = 'Provisioning Workspace... <span style="display:inline-block;animation:spin 1s linear infinite;">⏳</span>';
        btn.style.opacity = '0.7';
        btn.style.pointerEvents = 'none';
      }

      try {
        const res = await fetch('/api/connect/provision', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, lastName, email, phone, businessName })
        });
        
        if (!res.ok) {
          throw new Error('Auto-provisioning failed.');
        }
        showSuccess(true);
      } catch (e) {
        console.error(e);
        showSuccess(false);
      }
    }

    function showSuccess(autoProvisioned = false) {
      document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
      document.getElementById('progressWrap').classList.add('hidden');

      if (autoProvisioned) {
        document.querySelector('.success-body').innerHTML = \`
          Your Free Business OS workspace is ready! 🎉<br />
          Check your email (<strong>\${state.email}</strong>) for your temporary password and Business Audit Report.
        \`;
        const mailto = document.getElementById('mailtoLink');
        if (mailto) mailto.style.display = 'none';
      } else {
        const industry = industryLabels[state.industry] || 'General';
        const tier = state.planTier === 'starter' ? 'Starter' : state.planTier === 'growth' ? 'Growth' : 'Pro';
        const subject = encodeURIComponent(\`Business OS: \${state.businessName} — \${industry} — \${tier}\`);
        const body = encodeURIComponent(
          \`Business: \${state.businessName}\\nLocation: \${state.location}\\nIndustry: \${industry}\\nPlan: \${tier}\\nEmail: \${state.email}\\nPhone: \${state.phone}\\nNotes: \${state.notes}\`
        );
        document.getElementById('mailtoLink').href = \`mailto:info@noveltywebsolutions.com?subject=\${subject}&body=\${body}\`;
      }

      const { planTier, recommendedPrice } = state;
      const priceEl = document.getElementById('successPrice');
      const tierEl = document.getElementById('successTier');
      const featList = document.getElementById('successFeatures');

      if (planTier === 'pro') {
        priceEl.innerHTML = \`$497<span style="font-size:1rem;color:var(--text-muted)">/mo</span>\`;
        tierEl.textContent = 'Business OS Pro';
        featList.innerHTML = proFeatures.slice(0, 4).map(f => \`<li>\${f}</li>\`).join('');
      } else if (planTier === 'growth') {
        priceEl.innerHTML = \`$297<span style="font-size:1rem;color:var(--text-muted)">/mo</span>\`;
        tierEl.textContent = 'Business OS Growth';
        featList.innerHTML = growthFeatures.slice(0, 4).map(f => \`<li>\${f}</li>\`).join('');
      } else {
        priceEl.innerHTML = \`\${recommendedPrice}<span style="font-size:1rem;color:var(--text-muted)">/mo</span>\`;
        tierEl.textContent = 'Business OS Starter';
        featList.innerHTML = starterFeatures.slice(0, 4).map(f => \`<li>\${f}</li>\`).join('');
      }

      document.getElementById('successScreen').classList.add('visible');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    buildDots();
`;

const styleContent = `
.funnel-theme-wrapper {

    &, *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    & {
      --bg: #0A0F1C;
      --surface: #111928;
      --surface2: #182236;
      --border: #1E2D45;
      --coral: #FF6B4D;
      --coral-dim: rgba(255,107,77,0.15);
      --coral-glow: 0 0 20px rgba(255,107,77,0.35);
      --teal: #2BD9C2;
      --teal-dim: rgba(43,217,194,0.12);
      --gold: #F2B705;
      --gold-dim: rgba(242,183,5,0.12);
      --text: #E8EDF5;
      --text-muted: #7A90B0;
      --text-faint: #3E5070;
      --radius: 14px;
      --radius-sm: 8px;
    }

    & { scroll-behavior: smooth; }

    & {
      background: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 0 80px;
    }

    /* ─── TOP NAV ─── */
    .top-nav {
      width: 100%;
      padding: 18px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      background: rgba(10,15,28,0.92);
      backdrop-filter: blur(14px);
      z-index: 100;
    }
    .logo {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 800;
      font-size: 1.25rem;
      letter-spacing: -0.5px;
    }
    .logo span { color: var(--coral); }
    .trust-badge {
      font-size: 0.72rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .trust-badge::before {
      content: '🔒';
      font-size: 0.8rem;
    }

    /* ─── PROGRESS BAR ─── */
    .progress-wrap {
      width: 100%;
      max-width: 680px;
      padding: 28px 24px 0;
    }
    .progress-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .progress-label {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--coral);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .progress-step-count {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-family: 'JetBrains Mono', monospace;
    }
    .progress-bar-track {
      height: 5px;
      background: var(--border);
      border-radius: 999px;
      overflow: hidden;
    }
    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--coral) 0%, #ff9070 100%);
      border-radius: 999px;
      transition: width 0.5s cubic-bezier(.4,0,.2,1);
    }
    .step-dots {
      display: flex;
      gap: 6px;
      margin-top: 12px;
    }
    .step-dot {
      flex: 1;
      height: 3px;
      border-radius: 999px;
      background: var(--border);
      transition: background 0.3s;
    }
    .step-dot.done { background: var(--coral); }
    .step-dot.active { background: var(--coral); opacity: 0.5; }

    /* ─── SURVEY CONTAINER ─── */
    .survey-container {
      width: 100%;
      max-width: 680px;
      padding: 32px 24px 0;
      overflow: hidden;
      position: relative;
    }

    /* ─── STEP SLIDE ANIMATION ─── */
    .step {
      display: none;
      animation: slideInRight 0.38s cubic-bezier(.4,0,.2,1) both;
    }
    .step.active { display: block; }
    .step.slide-out {
      animation: slideOutLeft 0.28s cubic-bezier(.4,0,.2,1) both;
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(48px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOutLeft {
      from { opacity: 1; transform: translateX(0); }
      to   { opacity: 0; transform: translateX(-48px); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes spin {
      100% { transform: rotate(360deg); }
    }

    /* ─── CARDS ─── */
    .card-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }
    .card-grid.two-col { grid-template-columns: 1fr 1fr; }
    .card-grid.three-col { grid-template-columns: repeat(3, 1fr); }
    .card-grid.horiz-cards { grid-template-columns: 1fr 1fr; }
    .option-card {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 16px 12px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .option-card:hover {
      border-color: rgba(43,217,194,0.4);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .option-card.selected {
      border-color: var(--teal);
      background: var(--teal-dim);
    }
    .card-icon { font-size: 1.8rem; line-height: 1; }
    .horiz-cards .option-card {
      flex-direction: row;
      justify-content: flex-start;
      padding: 14px 18px;
      gap: 12px;
    }
    .horiz-cards .card-icon { font-size: 1.4rem; }
    .card-label {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text);
      line-height: 1.3;
    }

    /* ─── TYPOGRAPHY ─── */
    .step-header { margin-bottom: 24px; }
    .step-headline {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(1.4rem, 4vw, 1.8rem);
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 6px;
    }
    .step-subtext {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    /* ─── CHECKBOX GRID ─── */
    .checkbox-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 28px;
    }
    .checkbox-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.18s;
      user-select: none;
    }
    .checkbox-item:hover { border-color: rgba(43,217,194,0.4); }
    .checkbox-item.checked {
      border-color: var(--teal);
      background: var(--teal-dim);
    }
    .checkbox-item input[type="checkbox"] { display: none; }
    .check-box {
      width: 18px;
      height: 18px;
      border: 2px solid var(--border);
      border-radius: 4px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.18s;
      font-size: 0.7rem;
    }
    .checkbox-item.checked .check-box {
      background: var(--teal);
      border-color: var(--teal);
      color: #0A0F1C;
      font-weight: 700;
    }
    .check-label {
      font-size: 0.83rem;
      font-weight: 500;
      color: var(--text);
      line-height: 1.3;
    }

    /* ─── FORM INPUTS ─── */
    .form-group { margin-bottom: 18px; }
    .form-label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 7px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .form-input, .form-select, .form-textarea {
      width: 100%;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-sm);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      font-size: 0.95rem;
      padding: 13px 16px;
      outline: none;
      transition: border-color 0.18s, box-shadow 0.18s;
      -webkit-appearance: none;
    }
    .form-input:focus, .form-select:focus, .form-textarea:focus {
      border-color: var(--coral);
      box-shadow: 0 0 0 3px rgba(255,107,77,0.15);
    }
    .form-select {
      cursor: pointer;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%237A90B0' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 14px center;
      padding-right: 40px;
    }
    .form-select option { background: #182236; }
    .form-textarea { min-height: 100px; resize: vertical; line-height: 1.6; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

    /* ─── SECTION DIVIDER ─── */
    .section-divider {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--text-faint);
      margin: 24px 0 14px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .section-divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border);
    }

    /* ─── BUTTONS ─── */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 0.95rem;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.22s cubic-bezier(.4,0,.2,1);
      text-decoration: none;
      letter-spacing: 0.2px;
    }
    .btn-primary {
      background: linear-gradient(135deg, var(--coral) 0%, #ff8060 100%);
      color: #fff;
      padding: 15px 32px;
      width: 100%;
      font-size: 1rem;
      box-shadow: 0 4px 24px rgba(255,107,77,0.35);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(255,107,77,0.5);
    }
    .btn-primary:active { transform: translateY(0); }
    .btn-primary:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    .btn-secondary {
      background: transparent;
      border: 1.5px solid var(--border);
      color: var(--text-muted);
      padding: 12px 20px;
    }
    .btn-secondary:hover { border-color: var(--text-muted); color: var(--text); }
    .btn-nav-row {
      display: flex;
      gap: 12px;
      align-items: center;
      margin-top: 8px;
    }
    .btn-nav-row .btn-secondary { flex-shrink: 0; }
    .btn-nav-row .btn-primary { flex: 1; }

    /* ─── STEP 4 REVEAL ─── */
    .reveal-section { margin-bottom: 32px; }
    .reveal-headline {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(1.3rem, 3.5vw, 1.7rem);
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 6px;
    }
    .reveal-subtext { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 20px; }

    .pain-card {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-left: 4px solid #FF3B3B;
      border-radius: var(--radius);
      padding: 16px 18px;
      margin-bottom: 12px;
      animation: fadeUp 0.4s cubic-bezier(.4,0,.2,1) both;
    }
    .pain-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }
    .pain-card-title {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .pain-card-body { font-size: 0.8rem; color: var(--text-muted); line-height: 1.5; }
    .badge-leak {
      background: rgba(255,59,59,0.15);
      color: #FF6B6B;
      font-size: 0.65rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 999px;
      white-space: nowrap;
      border: 1px solid rgba(255,59,59,0.3);
    }

    /* ─── OFFER COLUMNS ─── */
    .offer-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      animation: fadeUp 0.5s cubic-bezier(.4,0,.2,1) both;
    }
    .offer-card {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius);
      padding: 22px 20px;
      display: flex;
      flex-direction: column;
    }
    .offer-card.free-card { border-color: var(--teal); }
    .offer-card.plan-card { border-color: var(--gold); }

    .offer-badge {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 800;
      font-size: 1.4rem;
      margin-bottom: 16px;
      display: flex;
      align-items: baseline;
      gap: 6px;
    }
    .badge-free { color: var(--teal); }
    .badge-price { color: var(--gold); }
    .badge-per-mo {
      font-size: 0.7rem;
      font-weight: 500;
      color: var(--text-muted);
    }
    .offer-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 14px;
    }
    .free-card .offer-title { color: var(--teal); }
    .plan-card .offer-title { color: var(--gold); }

    .offer-list { list-style: none; flex: 1; }
    .offer-list li {
      font-size: 0.8rem;
      color: var(--text);
      line-height: 1.5;
      padding: 4px 0;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    .offer-list li .li-check { color: var(--teal); flex-shrink: 0; margin-top: 1px; }
    .offer-list li .li-check.gold { color: var(--gold); }

    .offer-note {
      font-size: 0.72rem;
      color: var(--text-muted);
      margin-top: 14px;
      line-height: 1.5;
      border-top: 1px solid var(--border);
      padding-top: 12px;
    }

    .urgency-bar {
      background: rgba(242,183,5,0.08);
      border: 1px solid rgba(242,183,5,0.2);
      border-radius: var(--radius-sm);
      padding: 12px 16px;
      font-size: 0.8rem;
      color: var(--gold);
      text-align: center;
      margin: 16px 0;
      font-weight: 600;
    }

    /* ─── SUCCESS SCREEN ─── */
    .success-screen {
      display: none;
      text-align: center;
      padding: 40px 0 20px;
      animation: fadeUp 0.5s cubic-bezier(.4,0,.2,1) both;
    }
    .success-screen.visible { display: block; }
    .success-icon {
      width: 72px;
      height: 72px;
      background: var(--teal-dim);
      border: 2px solid var(--teal);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin: 0 auto 24px;
      animation: popIn 0.5s cubic-bezier(.175,.885,.32,1.275) both;
    }
    @keyframes popIn {
      from { transform: scale(0); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .success-headline {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(1.4rem, 4vw, 1.9rem);
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 12px;
    }
    .success-body {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.7;
      max-width: 480px;
      margin: 0 auto 28px;
    }
    .success-plan-reminder {
      background: var(--surface);
      border: 1.5px solid var(--gold);
      border-radius: var(--radius);
      padding: 20px 24px;
      margin: 24px auto;
      max-width: 480px;
      text-align: left;
    }
    .success-plan-reminder h4 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--gold);
      margin-bottom: 10px;
    }
    .success-plan-price {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2rem;
      font-weight: 800;
      color: var(--gold);
      margin-bottom: 4px;
    }
    .success-plan-tier {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-bottom: 14px;
    }
    .success-plan-features { list-style: none; }
    .success-plan-features li {
      font-size: 0.82rem;
      color: var(--text);
      padding: 3px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .success-plan-features li::before { content: '✅'; font-size: 0.7rem; }

    /* ─── UTILITY ─── */
    .mt-8 { margin-top: 8px; }
    .mt-16 { margin-top: 16px; }
    .mt-24 { margin-top: 24px; }
    .hidden { display: none !important; }
    .error-msg {
      color: #FF6B6B;
      font-size: 0.75rem;
      margin-top: 6px;
      display: none;
    }
    .error-msg.visible { display: block; }

    /* ─── RESPONSIVE ─── */
    @media (max-width: 600px) {
      .offer-columns { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
      .card-grid.four-col { grid-template-columns: repeat(2, 1fr); }
      .card-grid.three-col { grid-template-columns: repeat(3, 1fr); }
      .checkbox-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 400px) {
      .card-grid { grid-template-columns: repeat(2, 1fr); }
      .card-grid.horiz-cards { grid-template-columns: 1fr; }
      .checkbox-grid { grid-template-columns: 1fr; }
      .card-grid.three-col { grid-template-columns: 1fr 1fr; }
    }
  
}
`

export default function SmartStart() {

  React.useEffect(() => {
    if (scriptContent.trim()) {
      const script = document.createElement('script');
      script.innerHTML = scriptContent;
      document.body.appendChild(script);
      return () => { document.body.removeChild(script); };
    }
  }, []);

  return (
    <div className="funnel-theme-wrapper">
      <style dangerouslySetInnerHTML={{ __html: styleContent }} />
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
