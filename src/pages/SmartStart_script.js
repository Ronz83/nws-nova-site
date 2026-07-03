<script>
    // ═══════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════
    const state = {
      industry: null,
      businessName: '',
      location: '',
      yearsInBusiness: '',
      staffSize: '',
      hasWebsite: '',
      primaryGoal: '',
      pagesNeeded: [],
      brandVibe: '',
      painPoints: [],
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      notes: '',
      planTier: '',
      recommendedPrice: '',
    };

    // ═══════════════════════════════════════════════════════
    // DATA MAPS
    // ═══════════════════════════════════════════════════════
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
        { emoji: '⏳', label: 'Losing leads who don\'t hear back fast', impact: 'Leads contacted within 5 minutes are 21× more likely to convert than those reached after 30 minutes.' },
        { emoji: '🏆', label: 'Customers choosing competitors who respond faster', impact: 'Speed-to-lead is the #1 differentiator in local home services markets.' },
        { emoji: '🔁', label: 'No system to follow up with leads', impact: 'Most local businesses lose 40–60% of potential revenue to zero follow-up.' },
        { emoji: '⭐', label: 'Difficult to get Google reviews', impact: 'Businesses with 50+ reviews earn 47% more revenue than those with fewer than 10.' },
      ],
      automotive: [
        { emoji: '🔧', label: 'Customers don\'t come back for recommended repairs', impact: 'Declined repair follow-up alone represents $3,000–$8,000 in lost revenue per bay monthly.' },
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
        { emoji: '📋', label: 'Patients don\'t accept treatment plans', impact: 'Practices with automated treatment follow-up see 28% higher case acceptance rates.' },
        { emoji: '🚫', label: 'Too many no-shows and cancellations', impact: 'No-shows cost an average dental practice $50,000–$80,000 per year.' },
        { emoji: '🔔', label: 'Slow patient recall process', impact: 'Practices with automated recall fill 40% more hygiene chairs annually.' },
        { emoji: '📞', label: 'Staff spending too much time on the phone', impact: 'Front desk phone management costs the average practice 12+ hours per week.' },
        { emoji: '⭐', label: 'Not enough new patient reviews', impact: '84% of patients trust online reviews as much as personal recommendations.' },
      ],
      veterinary: [
        { emoji: '🐾', label: 'Pet owners don\'t return for follow-up care', impact: 'Practices with automated recall reminders see 31% higher patient retention.' },
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
        { emoji: '📱', label: 'Slow response to DMs and inquiries', impact: '53% of consumers won\'t wait more than one hour for a social media response before moving on.' },
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
      'Website hosted on NWS platform (we manage everything)',
      'Your own AI business agent (you name them, we train them)',
      'Industry-specific CRM pipeline setup',
      'WhatsApp + email automation sequences',
      'Missed call instant response',
      'Appointment booking automation',
      'Review routing (4–5 stars → Google; 1–3 → private feedback)',
      'Lead reactivation campaigns',
      'Monthly performance report',
      'Priority support',
    ];
    const proFeatures = [
      'Everything in Starter, PLUS:',
      'Multi-department AI agents',
      'Multi-location support',
      'Advanced workflow customization',
      'Dedicated account manager',
      'Custom integrations',
    ];

    const priceMap = {
      home_services_starter: '$349',
      automotive_starter: '$399',
      real_estate_starter: '$399',
      dental_medical_starter: '$449',
      veterinary_starter: '$449',
      hospitality_starter: '$349',
      death_care_starter: '$449',
      other_starter: '$299',
    };

    // ═══════════════════════════════════════════════════════
    // STEP NAVIGATION
    // ═══════════════════════════════════════════════════════
    let currentStep = 1;
    const totalSteps = 6;
    const stepLabels = ['Industry', 'Business Info', 'Website Details', 'Pain Points', 'Your Analysis', 'Claim It'];

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
      document.getElementById('progressLabel').textContent = `Step ${step} — ${stepLabels[step - 1]}`;
      document.getElementById('progressCount').textContent = `${step} / ${totalSteps}`;
      buildDots();
    }

    function goToStep(n) {
      const curr = document.getElementById(`step-${currentStep}`);
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
      const el = document.getElementById(`step-${n}`);
      if (!el) return;
      el.classList.add('active');
      updateProgress(n);
      if (n === 4) buildPainPoints();
      if (n === 5) buildReveal();
    }

    // ═══════════════════════════════════════════════════════
    // STEP 1 — INDUSTRY
    // ═══════════════════════════════════════════════════════
    function selectIndustry(card) {
      document.querySelectorAll('#industryGrid .option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.industry = card.dataset.value;
      setTimeout(() => goToStep(2), 400);
    }

    // ═══════════════════════════════════════════════════════
    // STEP 2 — BUSINESS BASICS
    // ═══════════════════════════════════════════════════════
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

    // ═══════════════════════════════════════════════════════
    // STEP 3 — WEBSITE QUESTIONS
    // ═══════════════════════════════════════════════════════
    function selectSingle(card, gridId, stateKey) {
      document.querySelectorAll(`#${gridId} .option-card`).forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state[stateKey] = card.dataset.value;
    }

    function togglePage(label, pageName) {
      label.classList.toggle('checked');
      const cb = label.querySelector('input[type="checkbox"]');
      cb.checked = !cb.checked;
      const box = label.querySelector('.check-box');
      box.textContent = cb.checked ? '✓' : '';
      if (cb.checked) {
        if (!state.pagesNeeded.includes(pageName)) state.pagesNeeded.push(pageName);
      } else {
        state.pagesNeeded = state.pagesNeeded.filter(p => p !== pageName);
      }
    }

    function advanceStep3() {
      const err = document.getElementById('err-step3');
      if (!state.hasWebsite || !state.primaryGoal || !state.brandVibe) {
        err.classList.add('visible');
        return;
      }
      err.classList.remove('visible');
      goToStep(4);
    }

    // ═══════════════════════════════════════════════════════
    // STEP 4 — PAIN POINTS
    // ═══════════════════════════════════════════════════════
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
        label.innerHTML = `
          <input type="checkbox" />
          <div className="check-box"></div>
          <span className="check-label">${p.emoji} ${p.label}</span>
        `;
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

    function advanceStep4() {
      const err = document.getElementById('err-step4');
      if (state.painPoints.length === 0) {
        err.classList.add('visible');
        return;
      }
      err.classList.remove('visible');
      goToStep(5);
    }

    // ═══════════════════════════════════════════════════════
    // PLAN COMPUTATION
    // ═══════════════════════════════════════════════════════
    function computePlan() {
      const { staffSize, industry } = state;
      if (staffSize === 'large') {
        state.planTier = 'enterprise';
        state.recommendedPrice = 'Contact Sales';
      } else if (staffSize === 'medium') {
        state.planTier = 'pro';
        state.recommendedPrice = '$799';
      } else {
        state.planTier = 'starter';
        const key = `${industry}_starter`;
        state.recommendedPrice = priceMap[key] || '$299';
      }
    }

    // ═══════════════════════════════════════════════════════
    // STEP 5 — REVEAL
    // ═══════════════════════════════════════════════════════
    function buildReveal() {
      // Re-compute plan in case we navigated back
      computePlan();

      // PART A — headline
      const name = state.businessName.trim() || 'your business';
      document.getElementById('revealHeadline').textContent = `Here's what our analysis found for ${name}`;

      // Build pain cards
      const container = document.getElementById('painCardsContainer');
      container.innerHTML = '';
      const displayPains = state.painPoints.slice(0, 3);
      displayPains.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'pain-card';
        card.style.animationDelay = `${i * 0.15}s`;
        card.innerHTML = `
          <div className="pain-card-top">
            <div className="pain-card-title">${p.emoji} ${p.label}</div>
            <span className="badge-leak">🔴 Revenue Leak Detected</span>
          </div>
          <p className="pain-card-body">${p.impact}</p>
        `;
        container.appendChild(card);
      });

      // PART A visible immediately; PART B after 1.5s
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

      // Update industry label in free column
      document.getElementById('offerIndustryLabel').textContent = industryLabel;

      const standardWrap = document.getElementById('offerStandardWrap');
      const enterpriseWrap = document.getElementById('offerEnterpriseWrap');

      if (planTier === 'enterprise') {
        standardWrap.classList.add('hidden');
        enterpriseWrap.classList.remove('hidden');
        return;
      }

      standardWrap.classList.remove('hidden');
      enterpriseWrap.classList.add('hidden');

      // Plan column
      const priceDisplay = document.getElementById('planPriceDisplay');
      const planTitle = document.getElementById('planTitle');
      const featuresList = document.getElementById('planFeaturesList');
      const planNote = document.getElementById('planNote');

      if (planTier === 'pro') {
        planTitle.textContent = 'NWS Business Pro';
        priceDisplay.textContent = '$799';
        const features = proFeatures;
        featuresList.innerHTML = features.map(f =>
          `<li><span className="li-check gold">✅</span> ${f}</li>`
        ).join('');
        planNote.textContent = 'Includes everything in Starter. Billed monthly. Cancel anytime.';
      } else {
        // starter
        planTitle.textContent = 'NWS Starter Plan';
        priceDisplay.textContent = recommendedPrice;
        featuresList.innerHTML = starterFeatures.map(f =>
          `<li><span className="li-check gold">✅</span> ${f}</li>`
        ).join('');
        planNote.textContent = 'Billed monthly. Cancel anytime. No setup fees.';
      }
    }

    // ═══════════════════════════════════════════════════════
    // STEP 6 — CONTACT FORM + SUBMIT
    // ═══════════════════════════════════════════════════════
    function submitForm() {
      const err = document.getElementById('err-step6');
      const { firstName, lastName, email, phone } = state;
      if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
        err.classList.add('visible');
        return;
      }
      // Basic email check
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        err.textContent = 'Please enter a valid email address.';
        err.classList.add('visible');
        return;
      }
      err.classList.remove('visible');
      showSuccess();
    }

    function showSuccess() {
      // Hide all steps and progress
      document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
      document.getElementById('progressWrap').classList.add('hidden');

      // Build mailto
      const industry = industryLabels[state.industry] || 'General';
      const tier = state.planTier === 'starter' ? 'Starter' : state.planTier === 'pro' ? 'Business Pro' : 'Enterprise';
      const subject = encodeURIComponent(`Smart Start: ${state.businessName} — ${industry} — ${tier}`);
      const body = encodeURIComponent(
        `Business: ${state.businessName}\nLocation: ${state.location}\nIndustry: ${industry}\nPlan: ${tier}\nEmail: ${state.email}\nPhone: ${state.phone}\nNotes: ${state.notes}`
      );
      document.getElementById('mailtoLink').href = `mailto:info@noveltywebsolutions.com?subject=${subject}&body=${body}`;

      // Populate success reminder
      const { planTier, recommendedPrice } = state;
      const priceEl = document.getElementById('successPrice');
      const tierEl = document.getElementById('successTier');
      const featList = document.getElementById('successFeatures');

      if (planTier === 'enterprise') {
        priceEl.innerHTML = 'Custom';
        tierEl.textContent = 'NWS Enterprise';
        featList.innerHTML = '<li>Custom pricing based on your needs</li><li>Dedicated team and SLA</li>';
      } else if (planTier === 'pro') {
        priceEl.innerHTML = `$799<span style={{"fontSize":"1rem","color":"var(--text-muted)"}}>/mo</span>`;
        tierEl.textContent = 'NWS Business Pro';
        featList.innerHTML = proFeatures.slice(0, 4).map(f => `<li>${f}</li>`).join('');
      } else {
        priceEl.innerHTML = `${recommendedPrice}<span style={{"fontSize":"1rem","color":"var(--text-muted)"}}>/mo</span>`;
        tierEl.textContent = 'NWS Starter Plan';
        featList.innerHTML = starterFeatures.slice(0, 5).map(f => `<li>${f}</li>`).join('');
      }

      document.getElementById('successScreen').classList.add('visible');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ═══════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════
    buildDots();
  </script>