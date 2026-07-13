
import React from 'react';
import BookingModal from '../components/BookingModal';
import { VoiceCallOverlay } from '../components/samantha/VoiceCallOverlay';

const htmlContent = `

<!-- Background effects -->
<div class="bg-grid"></div>
<div class="bg-gradient-orb orb-1"></div>
<div class="bg-gradient-orb orb-2"></div>

<!-- ─── NAVBAR ─── -->
<nav class="navbar" id="navbar">
    <div class="container">
        <a href="/" class="logo">NWS<span>.</span></a>
        <div class="nav-links">
            <a href="#problem">The Problem</a>
            <a href="#solution">Solution</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="mailto:info@noveltywebsolutions.com?subject=AI%20Receptionist%20Inquiry" class="btn btn-primary nav-cta">Get Started</a>
        </div>
    </div>
</nav>

<!-- ─── HERO ─── -->
<section class="hero">
    <div class="container">
        <div class="hero-grid">
            <div class="hero-content reveal">
                <span class="tag"><span class="ring-icon">📞</span>&ensp;AI-Powered Voice Receptionist</span>
                <h1>Every Missed Call Is a Customer You'll <span class="highlight gradient-text">Never Get Back</span></h1>
                <p>Your AI receptionist answers every call, books appointments, captures leads, and follows up by text — 24 hours a day, 7 days a week. No hold music. No voicemail graveyard. No lost revenue.</p>
                <div class="hero-buttons">
                    <a href="mailto:info@noveltywebsolutions.com?subject=AI%20Receptionist%20Inquiry" class="btn btn-primary btn-glow">
                        Book Free Consultation
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <a href="javascript:void(0)" onclick="(window as any).openVoiceDemo && (window as any).openVoiceDemo()" class="btn btn-secondary">
                        Hear the AI in Action
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </a>
                </div>
                <div class="hero-stat-bar">
                    <div class="hero-stat">
                        <h4 class="gradient-text">24/7</h4>
                        <p>Always answering</p>
                    </div>
                    <div class="hero-stat">
                        <h4 class="gradient-text-teal">3</h4>
                        <p>AI agents deployed</p>
                    </div>
                    <div class="hero-stat">
                        <h4 class="gradient-text">0</h4>
                        <p>Missed calls</p>
                    </div>
                </div>
            </div>
            <div class="phone-visual reveal reveal-delay-2">
                <div class="phone-mock">
                    <div class="phone-notch"></div>
                    <div class="phone-screen">
                        <div class="call-ui">
                            <div class="call-avatar">🤖</div>
                            <div class="call-name">NWS AI Receptionist</div>
                            <div class="call-status">● Live — Handling call</div>
                            <div class="call-wave">
                                <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                            </div>
                            <div class="call-transcript">
                                <p class="ai-msg">
                                    <span class="label">AI Receptionist</span>
                                    "Good afternoon! Thank you for calling ABC Motors. How can I help you today?"
                                </p>
                                <p class="caller-msg">
                                    <span class="label">Caller</span>
                                    "Hi, I need to schedule a service appointment for my 2021 Camry."
                                </p>
                                <p class="ai-msg">
                                    <span class="label">AI Receptionist</span>
                                    "I'd be happy to help. Let me pull up available times for you..."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ─── PROBLEM ─── -->
<section class="problem" id="problem">
    <div class="container">
        <div class="section-intro reveal">
            <span class="tag">The Problem</span>
            <h2>Your Phone Is Your Most Expensive<br><span class="gradient-text">Liability</span></h2>
            <p>While you're helping one customer, three more are hearing a busy signal — and calling your competitor instead.</p>
        </div>
        <div class="problem-grid">
            <div class="glass problem-card reveal reveal-delay-1">
                <span class="icon">📵</span>
                <div class="stat-big gradient-text">35%</div>
                <h3>Calls Go Unanswered</h3>
                <p>The average small business misses over a third of all incoming phone calls. Nights, weekends, lunch breaks — that's revenue walking away.</p>
            </div>
            <div class="glass problem-card reveal reveal-delay-2">
                <span class="icon">💸</span>
                <div class="stat-big gradient-text">\$500</div>
                <h3>Lost Per Missed Call</h3>
                <p>Each unanswered call represents \$100–\$500 in potential revenue. Over a month, that's thousands of dollars silently draining from your business.</p>
            </div>
            <div class="glass problem-card reveal reveal-delay-3">
                <span class="icon">🚪</span>
                <div class="stat-big gradient-text">85%</div>
                <h3>Won't Call Back</h3>
                <p>Customers who reach voicemail rarely leave a message. If they don't get through the first time, they're already dialing someone else.</p>
            </div>
        </div>
    </div>
</section>

<!-- ─── SOLUTION ─── -->
<section class="solution" id="solution">
    <div class="container">
        <div class="section-intro reveal">
            <span class="tag">The Solution</span>
            <h2>An AI Receptionist That <span class="gradient-text-teal">Never Sleeps</span></h2>
            <p>Powered by conversational AI, your receptionist handles calls exactly the way you would — just faster, and without coffee breaks.</p>
        </div>
        <div class="solution-grid">
            <div class="glass solution-card reveal reveal-delay-1">
                <div class="solution-icon teal">📞</div>
                <h3>24/7 Call Answering</h3>
                <p>Every call answered instantly — mornings, evenings, weekends, holidays. Your business never goes dark.</p>
            </div>
            <div class="glass solution-card reveal reveal-delay-2">
                <div class="solution-icon coral">📅</div>
                <h3>Auto-Book Appointments</h3>
                <p>The AI checks your calendar and books directly into your schedule. Customers get confirmation instantly.</p>
            </div>
            <div class="glass solution-card reveal reveal-delay-3">
                <div class="solution-icon gold">💬</div>
                <h3>SMS Follow-Up</h3>
                <p>If lines are busy, the AI texts customers back automatically with links, confirmations, or follow-up info.</p>
            </div>
            <div class="glass solution-card reveal reveal-delay-1">
                <div class="solution-icon coral">🔀</div>
                <h3>Smart Call Routing</h3>
                <p>Sales, support, service — the AI identifies the caller's intent and routes them to the right person or department.</p>
            </div>
            <div class="glass solution-card reveal reveal-delay-2">
                <div class="solution-icon teal">📋</div>
                <h3>CRM Lead Capture</h3>
                <p>Every caller's name, number, and inquiry is logged automatically in your CRM. Zero manual data entry.</p>
            </div>
            <div class="glass solution-card reveal reveal-delay-3">
                <div class="solution-icon gold">🌙</div>
                <h3>After-Hours Coverage</h3>
                <p>Nights, weekends, holidays — your AI handles overflow and after-hours calls with the same quality as prime time.</p>
            </div>
        </div>
    </div>
</section>

<!-- ─── HOW IT WORKS ─── -->
<section class="how-it-works" id="how-it-works">
    <div class="container">
        <div class="section-intro reveal">
            <span class="tag">How It Works</span>
            <h2>Live in <span class="gradient-text">72 Hours</span>. Seriously.</h2>
            <p>No months-long integrations. No complex onboarding. We handle everything.</p>
        </div>
        <div class="steps">
            <div class="glass step reveal reveal-delay-1">
                <div class="step-number">01</div>
                <span class="step-icon">🔧</span>
                <h3>We Build It For You</h3>
                <p>We configure your AI receptionist with your business info, scripts, and call routing rules. You approve the voice and flow.</p>
                <div class="step-connector"></div>
            </div>
            <div class="glass step reveal reveal-delay-2">
                <div class="step-number">02</div>
                <span class="step-icon">🤖</span>
                <h3>AI Answers Your Calls</h3>
                <p>Forward your phone line (or use a new number). The AI picks up every call, handles conversations, and takes action.</p>
                <div class="step-connector"></div>
            </div>
            <div class="glass step reveal reveal-delay-3">
                <div class="step-number">03</div>
                <span class="step-icon">📈</span>
                <h3>You Get More Customers</h3>
                <p>More calls answered. More appointments booked. More leads captured. Real growth you can measure in your bottom line.</p>
            </div>
        </div>
    </div>
</section>

<!-- ─── DEMO ─── -->
<section class="demo" id="demo">
    <div class="container">
        <div class="section-intro reveal">
            <span class="tag">Hear It In Action</span>
            <h2>What Your Customers <span class="gradient-text-teal">Actually Hear</span></h2>
            <p>This is a real conversation flow. Natural. Helpful. Indistinguishable from a trained receptionist.</p>
        </div>
        <div class="demo-container reveal">
            <div class="glass demo-card">
                <div class="demo-header">
                    <div class="demo-dot"></div>
                    <span>Live call transcript — ABC Motors</span>
                </div>
                <div class="demo-body" id="demoBody">
                    <div class="chat-msg ai">
                        <div class="chat-avatar">🤖</div>
                        <div>
                            <span class="chat-label">AI Receptionist</span>
                            <div class="chat-bubble">"Good afternoon, thanks for calling ABC Motors! My name is Alex, your virtual assistant. Are you calling about sales, service, or something else I can help with?"</div>
                        </div>
                    </div>
                    <div class="chat-msg caller">
                        <div class="chat-avatar">👤</div>
                        <div>
                            <span class="chat-label">Caller</span>
                            <div class="chat-bubble">"Yeah, I need to bring my truck in for an oil change. Do you have anything open this week?"</div>
                        </div>
                    </div>
                    <div class="chat-msg ai">
                        <div class="chat-avatar">🤖</div>
                        <div>
                            <span class="chat-label">AI Receptionist</span>
                            <div class="chat-bubble">"Absolutely! I have openings on Thursday at 10 AM and Friday at 2 PM. Which works better for you?"</div>
                        </div>
                    </div>
                    <div class="chat-msg caller">
                        <div class="chat-avatar">👤</div>
                        <div>
                            <span class="chat-label">Caller</span>
                            <div class="chat-bubble">"Thursday at 10 works."</div>
                        </div>
                    </div>
                    <div class="chat-msg ai">
                        <div class="chat-avatar">🤖</div>
                        <div>
                            <span class="chat-label">AI Receptionist</span>
                            <div class="chat-bubble">"You're all set for Thursday at 10 AM. I'll send you a text confirmation right now with the details. Can I get your name and the best number to reach you?"</div>
                        </div>
                    </div>
                    <div class="chat-msg caller">
                        <div class="chat-avatar">👤</div>
                        <div>
                            <span class="chat-label">Caller</span>
                            <div class="chat-bubble">"It's Mike, 555-0142."</div>
                        </div>
                    </div>
                    <div class="chat-msg ai">
                        <div class="chat-avatar">🤖</div>
                        <div>
                            <span class="chat-label">AI Receptionist</span>
                            <div class="chat-bubble">"Got it, Mike. Your appointment is confirmed and your info has been saved. You'll receive a text shortly. Is there anything else I can help you with?"</div>
                        </div>
                    </div>
                </div>
            </div>
            <p style="text-align: center; margin-top: 20px; font-size: 0.85rem; color: #6B7589;">Appointment booked. Lead captured. SMS sent. Zero human effort.</p>
        </div>
    </div>
</section>

<!-- ─── PRICING ─── -->
<section class="pricing" id="pricing">
    <div class="container">
        <div class="section-intro reveal">
            <span class="tag">Simple Pricing</span>
            <h2>One Investment. <span class="gradient-text">Unlimited Returns.</span></h2>
            <p>No hidden fees. No per-minute surprises. Just a flat monthly rate that pays for itself with the first few calls.</p>
        </div>
        <div class="pricing-grid">
            <div class="glass pricing-card reveal reveal-delay-1">
                <div class="pricing-label">One-Time Setup</div>
                <div class="pricing-amount">\$497<span>–\$997</span></div>
                <div class="pricing-range">Based on complexity & number of AI agents</div>
                <ul class="pricing-features">
                    <li>Custom AI voice & personality configuration</li>
                    <li>Business-specific call scripts & flows</li>
                    <li>CRM integration & lead pipeline setup</li>
                    <li>Calendar & booking system connection</li>
                    <li>Call routing & department mapping</li>
                    <li>SMS auto-response templates</li>
                    <li>Testing, QA & launch support</li>
                </ul>
                <a href="mailto:info@noveltywebsolutions.com?subject=AI%20Receptionist%20Inquiry" class="btn btn-secondary" style="width:100%;justify-content:center;">Get a Custom Quote</a>
            </div>
            <div class="glass pricing-card featured reveal reveal-delay-2">
                <div class="pricing-badge">Most Popular</div>
                <div class="pricing-label">Monthly Service</div>
                <div class="pricing-amount">\$297<span>/mo</span></div>
                <div class="pricing-range">Everything you need. Nothing you don't.</div>
                <ul class="pricing-features">
                    <li>24/7 AI voice receptionist (unlimited calls)</li>
                    <li>GoHighLevel CRM included</li>
                    <li>AI voice minutes included</li>
                    <li>Appointment booking & confirmations</li>
                    <li>SMS follow-up & text-back</li>
                    <li>Lead capture & pipeline automation</li>
                    <li>Call analytics & reporting dashboard</li>
                    <li>Ongoing optimization & support</li>
                </ul>
                <a href="mailto:info@noveltywebsolutions.com?subject=AI%20Receptionist%20Inquiry" class="btn btn-primary btn-glow" style="width:100%;justify-content:center;">Start Free Consultation →</a>
            </div>
        </div>
    </div>
</section>

<!-- ─── SOCIAL PROOF ─── -->
<section class="social-proof" id="proof">
    <div class="container">
        <div class="proof-banner reveal">
            <span class="tag">Already Live</span>
            <h2>Powering <span class="gradient-text">3 AI Agents</span> for a<br>Local Automotive Dealership</h2>
            <p style="margin: 16px auto 0; max-width: 55ch; color: #8B95A8;">Our AI receptionist system is already deployed and handling real customer calls — booking service appointments, dispatching roadside assistance, and routing customer inquiries around the clock.</p>
            <div class="proof-agents">
                <div class="proof-agent-tag">🛎️ Customer Service Agent</div>
                <div class="proof-agent-tag">🚗 Roadside Assistance Agent</div>
                <div class="proof-agent-tag">🔧 Service Intake Agent</div>
            </div>
        </div>
    </div>
</section>

<!-- ─── FAQ ─── -->
<section class="faq" id="faq">
    <div class="container">
        <div class="section-intro reveal">
            <span class="tag">FAQ</span>
            <h2>Questions? <span class="gradient-text-teal">We've Got Answers.</span></h2>
        </div>
        <div class="faq-list reveal">
            <div class="faq-item">
                <button class="faq-question" onclick="toggleFaq(this)">
                    Will my customers know it's an AI?
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer">
                    <p>Our AI uses natural-sounding conversational voice technology that's nearly indistinguishable from a human receptionist. It handles pauses, interruptions, and follow-up questions naturally. Most callers have no idea they're speaking to an AI — they just know they got great service.</p>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-question" onclick="toggleFaq(this)">
                    What if a caller needs a real human?
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer">
                    <p>The AI is smart enough to recognize when a human is needed. It can warm-transfer calls directly to you, a manager, or a specific department. You set the escalation rules — the AI follows them.</p>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-question" onclick="toggleFaq(this)">
                    How long does setup take?
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer">
                    <p>Most businesses are live within 48–72 hours. We handle all the configuration, scripting, and integration. You just review, approve, and start getting calls answered.</p>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-question" onclick="toggleFaq(this)">
                    Do I need to change my phone number?
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer">
                    <p>No. You keep your existing business number. We set up call forwarding so the AI answers when you can't — or handles all calls if you prefer. No disruption to your current setup.</p>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-question" onclick="toggleFaq(this)">
                    What's included in the \$297/month?
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer">
                    <p>Everything: your AI receptionist, GoHighLevel CRM access, AI voice minutes, SMS follow-up automation, appointment booking, lead capture, call analytics, and ongoing support. There are no hidden per-minute charges or surprise fees.</p>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-question" onclick="toggleFaq(this)">
                    Can the AI handle multiple calls at the same time?
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer">
                    <p>Yes. Unlike a human receptionist who handles one call at a time, the AI can handle unlimited simultaneous calls. Your customers never hear a busy signal again.</p>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-question" onclick="toggleFaq(this)">
                    What if I want to cancel?
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer">
                    <p>No contracts. No lock-ins. Cancel anytime with 30 days' notice. We keep working with you because the results speak for themselves — not because you're trapped.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ─── FINAL CTA ─── -->
<section class="final-cta" id="contact">
    <div class="container">
        <div class="reveal">
            <span class="tag">🚀 Ready to Stop Losing Revenue?</span>
            <h2>Your Next Customer Is Calling.<br><span class="gradient-text">Will Someone Answer?</span></h2>
            <p>Get a free consultation. We'll map your call flow, show you the AI in action, and have a custom proposal ready within 24 hours.</p>
            <a href="mailto:info@noveltywebsolutions.com?subject=AI%20Receptionist%20Inquiry" class="btn btn-primary btn-glow" style="font-size: 1.15rem; padding: 20px 48px;">
                Book Your Free Consultation
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <p class="cta-email-hint">or email us directly at <a href="mailto:info@noveltywebsolutions.com">info@noveltywebsolutions.com</a></p>
        </div>
    </div>
</section>

<!-- ─── FOOTER ─── -->
<footer>
    <div class="container">
        <p>&copy; 2026 <a href="https://noveltywebsolutions.com">Novelty Web Solutions</a>. All rights reserved.</p>
    </div>
</footer>

`;
const scriptContent = `
    /* ─── NAVBAR SCROLL ─── */
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    /* ─── REVEAL ON SCROLL ─── */
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    /* ─── FAQ TOGGLE ─── */
    function toggleFaq(btn) {
        const item = btn.parentElement;
        const wasOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        // Open clicked (if wasn't open)
        if (!wasOpen) item.classList.add('open');
    }

    /* ─── SMOOTH ANCHOR SCROLL ─── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ─── COUNTER ANIMATION ─── */
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-big');
        counters.forEach(counter => {
            const text = counter.textContent;
            const match = text.match(/(\d+)/);
            if (!match) return;
            const target = parseInt(match[1]);
            const prefix = text.slice(0, text.indexOf(match[1]));
            const suffix = text.slice(text.indexOf(match[1]) + match[1].length);
            let current = 0;
            const increment = target / 40;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = prefix + target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = prefix + Math.floor(current) + suffix;
                }
            }, 30);
        });
    }

    // Trigger counters when problem section is visible
    const problemSection = document.getElementById('problem');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    if (problemSection) counterObserver.observe(problemSection);
`;
const styleContent = `
.funnel-theme-wrapper {

        /* ─── RESET & BASE ─── */
        &, *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        & { scroll-behavior: smooth; font-size: 16px; }
        & {
            font-family: 'Inter', system-ui, sans-serif;
            background: #0A0F1C;
            color: #C8D1E0;
            line-height: 1.7;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
        }

        /* ─── TYPOGRAPHY ─── */
        h1, h2, h3, h4 { font-family: 'Space Grotesk', sans-serif; color: #F0F4FC; line-height: 1.2; }
        h1 { font-size: clamp(2.2rem, 5.5vw, 4rem); font-weight: 700; }
        h2 { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 700; }
        h3 { font-size: clamp(1.2rem, 2.5vw, 1.5rem); font-weight: 600; }
        p { max-width: 65ch; }
        a { color: #2BD9C2; text-decoration: none; transition: color 0.2s; }
        a:hover { color: #FF6B4D; }

        /* ─── LAYOUT ─── */
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        section { padding: 100px 0; position: relative; }
        @media (max-width: 768px) { section { padding: 64px 0; } }

        /* ─── UTILITY ─── */
        .gradient-text {
            background: linear-gradient(135deg, #FF6B4D, #F2B705);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .gradient-text-teal {
            background: linear-gradient(135deg, #2BD9C2, #4DAAFF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .tag {
            display: inline-block;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            font-weight: 500;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            padding: 6px 16px;
            border-radius: 100px;
            border: 1px solid rgba(43, 217, 194, 0.3);
            color: #2BD9C2;
            background: rgba(43, 217, 194, 0.06);
            margin-bottom: 20px;
        }
        .section-intro { text-align: center; margin-bottom: 60px; }
        .section-intro p { margin: 16px auto 0; color: #8B95A8; font-size: 1.1rem; }

        /* ─── BUTTONS ─── */
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 600;
            font-size: 1.05rem;
            padding: 16px 36px;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-decoration: none;
            position: relative;
            overflow: hidden;
        }
        .btn-primary {
            background: linear-gradient(135deg, #FF6B4D, #E85535);
            color: #fff;
            box-shadow: 0 4px 24px rgba(255, 107, 77, 0.3), 0 0 0 0 rgba(255, 107, 77, 0);
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 32px rgba(255, 107, 77, 0.45), 0 0 0 4px rgba(255, 107, 77, 0.1);
            color: #fff;
        }
        .btn-primary:active { transform: translateY(0); }
        .btn-secondary {
            background: rgba(255, 255, 255, 0.04);
            color: #F0F4FC;
            border: 1px solid rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(8px);
        }
        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.2);
            color: #fff;
            transform: translateY(-2px);
        }
        .btn-glow {
            animation: btnPulse 3s ease-in-out infinite;
        }
        @keyframes btnPulse {
            0%, 100% { box-shadow: 0 4px 24px rgba(255, 107, 77, 0.3), 0 0 0 0 rgba(255, 107, 77, 0); }
            50% { box-shadow: 0 4px 24px rgba(255, 107, 77, 0.3), 0 0 0 8px rgba(255, 107, 77, 0.08); }
        }

        /* ─── GLASS CARD ─── */
        .glass {
            background: rgba(17, 25, 40, 0.75);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 20px;
            backdrop-filter: blur(16px);
        }
        .glass:hover {
            border-color: rgba(255, 255, 255, 0.1);
        }

        /* ─── ANIMATIONS ─── */
        .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
        }
        @keyframes ring {
            0% { transform: rotate(0deg); }
            5% { transform: rotate(14deg); }
            10% { transform: rotate(-12deg); }
            15% { transform: rotate(10deg); }
            20% { transform: rotate(-8deg); }
            25% { transform: rotate(4deg); }
            30%, 100% { transform: rotate(0deg); }
        }
        @keyframes typeIn {
            from { width: 0; }
            to { width: 100%; }
        }

        /* ─── BACKGROUND GRID ─── */
        .bg-grid {
            position: fixed;
            inset: 0;
            z-index: 0;
            background-image:
                linear-gradient(rgba(43, 217, 194, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(43, 217, 194, 0.03) 1px, transparent 1px);
            background-size: 60px 60px;
            pointer-events: none;
        }
        .bg-gradient-orb {
            position: fixed;
            width: 800px;
            height: 800px;
            border-radius: 50%;
            filter: blur(120px);
            opacity: 0.15;
            pointer-events: none;
            z-index: 0;
        }
        .orb-1 { background: #FF6B4D; top: -200px; right: -200px; }
        .orb-2 { background: #2BD9C2; bottom: -300px; left: -200px; opacity: 0.1; }

        /* ─── NAVBAR ─── */
        .navbar {
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 100;
            padding: 16px 0;
            transition: all 0.3s;
        }
        .navbar.scrolled {
            background: rgba(10, 15, 28, 0.85);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding: 12px 0;
        }
        .navbar .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .logo {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.4rem;
            font-weight: 700;
            color: #F0F4FC;
        }
        .logo span { color: #FF6B4D; }
        .nav-links { display: flex; gap: 32px; align-items: center; }
        .nav-links a {
            font-size: 0.9rem;
            font-weight: 500;
            color: #8B95A8;
            transition: color 0.2s;
        }
        .nav-links a:hover { color: #F0F4FC; }
        .nav-cta {
            padding: 10px 24px !important;
            font-size: 0.85rem !important;
            border-radius: 10px !important;
        }
        @media (max-width: 768px) {
            .nav-links { display: none; }
        }

        /* ─── HERO ─── */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding-top: 80px;
            position: relative;
        }
        .hero-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
        }
        @media (max-width: 960px) {
            .hero-grid { grid-template-columns: 1fr; text-align: center; }
            .hero-grid p { margin: 16px auto; }
        }
        .hero-content h1 { margin-bottom: 24px; }
        .hero-content .highlight {
            display: inline;
            position: relative;
        }
        .hero-content .highlight::after {
            content: '';
            position: absolute;
            bottom: 4px; left: 0;
            width: 100%; height: 8px;
            background: rgba(255, 107, 77, 0.3);
            border-radius: 4px;
            z-index: -1;
        }
        .hero-content p {
            font-size: 1.15rem;
            color: #8B95A8;
            margin-bottom: 36px;
        }
        .hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }
        @media (max-width: 960px) { .hero-buttons { justify-content: center; } }
        .hero-stat-bar {
            display: flex;
            gap: 40px;
            margin-top: 48px;
            padding-top: 32px;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        @media (max-width: 960px) { .hero-stat-bar { justify-content: center; } }
        @media (max-width: 480px) { .hero-stat-bar { flex-direction: column; align-items: center; gap: 20px; } }
        .hero-stat h4 {
            font-size: 2rem;
            font-weight: 700;
        }
        .hero-stat p {
            font-size: 0.85rem;
            color: #6B7589;
            margin: 0;
        }

        /* ─── PHONE VISUAL ─── */
        .phone-visual {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .phone-mock {
            width: 300px;
            background: #111928;
            border-radius: 36px;
            border: 2px solid rgba(255, 255, 255, 0.08);
            padding: 16px;
            box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5), 0 0 60px rgba(255, 107, 77, 0.08);
            animation: float 6s ease-in-out infinite;
            position: relative;
        }
        .phone-notch {
            width: 120px;
            height: 24px;
            background: #0A0F1C;
            border-radius: 0 0 16px 16px;
            margin: 0 auto 16px;
        }
        .phone-screen {
            background: #0A0F1C;
            border-radius: 24px;
            padding: 24px 16px;
            min-height: 380px;
        }
        .call-ui { text-align: center; }
        .call-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, #2BD9C2, #1A9E8F);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px;
            font-size: 2rem;
            position: relative;
        }
        .call-avatar::after {
            content: '';
            position: absolute;
            inset: -6px;
            border-radius: 50%;
            border: 2px solid rgba(43, 217, 194, 0.3);
            animation: ring-pulse 2s ease-in-out infinite;
        }
        @keyframes ring-pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.4; }
        }
        .call-name {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.1rem;
            font-weight: 600;
            color: #F0F4FC;
            margin-bottom: 4px;
        }
        .call-status {
            font-size: 0.8rem;
            color: #2BD9C2;
            margin-bottom: 24px;
        }
        .call-wave {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 3px;
            margin-bottom: 28px;
            height: 40px;
        }
        .call-wave span {
            display: block;
            width: 3px;
            border-radius: 3px;
            background: #2BD9C2;
            animation: wave 1.2s ease-in-out infinite;
        }
        .call-wave span:nth-child(1) { height: 12px; animation-delay: 0s; }
        .call-wave span:nth-child(2) { height: 24px; animation-delay: 0.1s; }
        .call-wave span:nth-child(3) { height: 36px; animation-delay: 0.2s; }
        .call-wave span:nth-child(4) { height: 20px; animation-delay: 0.3s; }
        .call-wave span:nth-child(5) { height: 28px; animation-delay: 0.4s; }
        .call-wave span:nth-child(6) { height: 16px; animation-delay: 0.5s; }
        .call-wave span:nth-child(7) { height: 32px; animation-delay: 0.6s; }
        @keyframes wave {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.4); }
        }
        .call-transcript {
            text-align: left;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            padding-top: 16px;
        }
        .call-transcript p {
            font-size: 0.78rem;
            margin-bottom: 10px;
            line-height: 1.5;
            max-width: 100%;
        }
        .call-transcript .ai-msg {
            color: #2BD9C2;
        }
        .call-transcript .caller-msg {
            color: #8B95A8;
        }
        .call-transcript .label {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.65rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            display: block;
            margin-bottom: 2px;
        }
        .call-transcript .ai-msg .label { color: #1A9E8F; }
        .call-transcript .caller-msg .label { color: #6B7589; }

        /* ─── RINGING ICON ─── */
        .ring-icon {
            font-size: 1.5rem;
            display: inline-block;
            animation: ring 2.5s ease-in-out infinite;
            transform-origin: 50% 0;
        }

        /* ─── PROBLEM SECTION ─── */
        .problem { background: #080D18; }
        .problem-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
        }
        @media (max-width: 768px) { .problem-grid { grid-template-columns: 1fr; } }
        .problem-card {
            padding: 36px;
            text-align: center;
        }
        .problem-card .icon {
            font-size: 2.5rem;
            margin-bottom: 20px;
            display: block;
        }
        .problem-card h3 { margin-bottom: 12px; }
        .problem-card p { font-size: 0.95rem; color: #6B7589; margin: 0 auto; }
        .stat-big {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 3.5rem;
            font-weight: 700;
            line-height: 1;
            margin-bottom: 8px;
        }

        /* ─── SOLUTION SECTION ─── */
        .solution-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
        }
        @media (max-width: 960px) { .solution-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .solution-grid { grid-template-columns: 1fr; } }
        .solution-card {
            padding: 36px;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
        }
        .solution-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 3px;
            background: linear-gradient(90deg, transparent, #2BD9C2, transparent);
            opacity: 0;
            transition: opacity 0.3s;
        }
        .solution-card:hover::before { opacity: 1; }
        .solution-card:hover {
            transform: translateY(-4px);
            border-color: rgba(43, 217, 194, 0.15);
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
        }
        .solution-icon {
            width: 52px;
            height: 52px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 20px;
        }
        .solution-icon.coral { background: rgba(255, 107, 77, 0.12); }
        .solution-icon.teal { background: rgba(43, 217, 194, 0.12); }
        .solution-icon.gold { background: rgba(242, 183, 5, 0.12); }
        .solution-card h3 { margin-bottom: 10px; }
        .solution-card p { font-size: 0.92rem; color: #6B7589; }

        /* ─── HOW IT WORKS ─── */
        .how-it-works { background: #080D18; }
        .steps {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
            position: relative;
        }
        @media (max-width: 768px) { .steps { grid-template-columns: 1fr; gap: 32px; } }
        .step {
            text-align: center;
            padding: 40px 28px;
            position: relative;
        }
        .step-number {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 4rem;
            font-weight: 700;
            opacity: 0.06;
            position: absolute;
            top: 8px;
            left: 50%;
            transform: translateX(-50%);
            line-height: 1;
        }
        .step-icon {
            font-size: 2.5rem;
            margin-bottom: 20px;
            display: block;
        }
        .step h3 { margin-bottom: 12px; }
        .step p { font-size: 0.92rem; color: #6B7589; margin: 0 auto; }
        .step-connector {
            position: absolute;
            top: 50%;
            right: -20px;
            width: 40px;
            height: 2px;
            background: linear-gradient(90deg, #2BD9C2, transparent);
        }
        @media (max-width: 768px) { .step-connector { display: none; } }

        /* ─── DEMO SECTION ─── */
        .demo-container {
            max-width: 700px;
            margin: 0 auto;
        }
        .demo-card {
            padding: 0;
            overflow: hidden;
        }
        .demo-header {
            background: rgba(43, 217, 194, 0.06);
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
            padding: 20px 28px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .demo-dot {
            width: 10px; height: 10px;
            border-radius: 50%;
            background: #2BD9C2;
            animation: ring-pulse 2s ease-in-out infinite;
        }
        .demo-header span {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            color: #2BD9C2;
        }
        .demo-& { padding: 32px 28px; }
        .chat-msg {
            margin-bottom: 20px;
            display: flex;
            gap: 12px;
            align-items: flex-start;
        }
        .chat-msg.ai { flex-direction: row; }
        .chat-msg.caller { flex-direction: row-reverse; }
        .chat-bubble {
            max-width: 80%;
            padding: 14px 18px;
            border-radius: 16px;
            font-size: 0.92rem;
            line-height: 1.55;
        }
        .chat-msg.ai .chat-bubble {
            background: rgba(43, 217, 194, 0.08);
            border: 1px solid rgba(43, 217, 194, 0.12);
            color: #C8D1E0;
            border-top-left-radius: 4px;
        }
        .chat-msg.caller .chat-bubble {
            background: rgba(255, 107, 77, 0.08);
            border: 1px solid rgba(255, 107, 77, 0.12);
            color: #C8D1E0;
            border-top-right-radius: 4px;
        }
        .chat-avatar {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
            flex-shrink: 0;
        }
        .chat-msg.ai .chat-avatar { background: rgba(43, 217, 194, 0.15); }
        .chat-msg.caller .chat-avatar { background: rgba(255, 107, 77, 0.15); }
        .chat-label {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 6px;
            display: block;
        }
        .chat-msg.ai .chat-label { color: #2BD9C2; }
        .chat-msg.caller .chat-label { color: #FF6B4D; }
        .typing-indicator {
            display: inline-flex;
            gap: 4px;
            padding: 8px 4px;
        }
        .typing-indicator span {
            width: 6px; height: 6px;
            background: #2BD9C2;
            border-radius: 50%;
            animation: typing 1.4s ease-in-out infinite;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing {
            0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
            30% { opacity: 1; transform: translateY(-4px); }
        }

        /* ─── PRICING ─── */
        .pricing { background: #080D18; }
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
            max-width: 900px;
            margin: 0 auto;
        }
        @media (max-width: 768px) { .pricing-grid { grid-template-columns: 1fr; } }
        .pricing-card {
            padding: 44px 36px;
            position: relative;
            overflow: hidden;
        }
        .pricing-card.featured {
            border-color: rgba(255, 107, 77, 0.25);
            box-shadow: 0 0 80px rgba(255, 107, 77, 0.06);
        }
        .pricing-card.featured::before {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 3px;
            background: linear-gradient(90deg, #FF6B4D, #F2B705);
        }
        .pricing-badge {
            position: absolute;
            top: 16px;
            right: 16px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            padding: 4px 12px;
            border-radius: 6px;
            background: rgba(255, 107, 77, 0.15);
            color: #FF6B4D;
        }
        .pricing-label {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #6B7589;
            margin-bottom: 8px;
        }
        .pricing-amount {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 3rem;
            font-weight: 700;
            color: #F0F4FC;
            line-height: 1.1;
        }
        .pricing-amount span {
            font-size: 1rem;
            font-weight: 500;
            color: #6B7589;
        }
        .pricing-range {
            font-size: 0.85rem;
            color: #6B7589;
            margin-top: 4px;
            margin-bottom: 28px;
        }
        .pricing-features {
            list-style: none;
            margin-bottom: 32px;
        }
        .pricing-features li {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            font-size: 0.92rem;
            margin-bottom: 14px;
            color: #8B95A8;
        }
        .pricing-features li::before {
            content: '✓';
            color: #2BD9C2;
            font-weight: 700;
            flex-shrink: 0;
            margin-top: 1px;
        }

        /* ─── SOCIAL PROOF ─── */
        .proof-banner {
            text-align: center;
            padding: 48px 24px;
            border-radius: 24px;
            background: linear-gradient(135deg, rgba(43, 217, 194, 0.05), rgba(255, 107, 77, 0.05));
            border: 1px solid rgba(255, 255, 255, 0.06);
            position: relative;
            overflow: hidden;
        }
        .proof-banner::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 30% 50%, rgba(43, 217, 194, 0.08), transparent 60%);
        }
        .proof-agents {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 32px;
            flex-wrap: wrap;
        }
        .proof-agent-tag {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            padding: 10px 20px;
            border-radius: 10px;
            background: rgba(43, 217, 194, 0.08);
            border: 1px solid rgba(43, 217, 194, 0.15);
            color: #2BD9C2;
        }

        /* ─── FAQ ─── */
        .faq-list {
            max-width: 800px;
            margin: 0 auto;
        }
        .faq-item {
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .faq-question {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 24px 0;
            background: none;
            border: none;
            cursor: pointer;
            text-align: left;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.1rem;
            font-weight: 600;
            color: #F0F4FC;
            transition: color 0.2s;
        }
        .faq-question:hover { color: #2BD9C2; }
        .faq-icon {
            font-size: 1.5rem;
            color: #6B7589;
            transition: transform 0.3s;
            flex-shrink: 0;
            margin-left: 16px;
        }
        .faq-item.open .faq-icon { transform: rotate(45deg); color: #FF6B4D; }
        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s;
            padding: 0 0;
        }
        .faq-item.open .faq-answer {
            max-height: 300px;
            padding: 0 0 24px;
        }
        .faq-answer p {
            font-size: 0.95rem;
            color: #8B95A8;
            line-height: 1.7;
        }

        /* ─── FINAL CTA ─── */
        .final-cta {
            text-align: center;
            padding: 120px 0;
            background: linear-gradient(180deg, #0A0F1C, #080D18);
            position: relative;
        }
        .final-cta::before {
            content: '';
            position: absolute;
            top: 0; left: 50%;
            transform: translateX(-50%);
            width: 600px; height: 600px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 107, 77, 0.06), transparent 70%);
            pointer-events: none;
        }
        .final-cta h2 { margin-bottom: 20px; }
        .final-cta p { margin: 0 auto 40px; color: #8B95A8; font-size: 1.1rem; }
        .cta-email-hint {
            font-size: 0.85rem;
            color: #6B7589;
            margin-top: 16px;
        }
        .cta-email-hint a { color: #2BD9C2; }

        /* ─── FOOTER ─── */
        footer {
            text-align: center;
            padding: 40px 0;
            border-top: 1px solid rgba(255, 255, 255, 0.04);
            font-size: 0.85rem;
            color: #4A5568;
        }
        footer a { color: #6B7589; }

        /* ─── MOBILE POLISH ─── */
        @media (max-width: 480px) {
            .btn { width: 100%; justify-content: center; }
            .pricing-amount { font-size: 2.4rem; }
            .stat-big { font-size: 2.5rem; }
            .phone-mock { width: 260px; }
        }

        /* ─── SCROLLBAR ─── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A0F1C; }
        ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #334155; }
    
}
`;

export default function AIReceptionist() {

  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [showVoice, setShowVoice] = React.useState(false);

  React.useEffect(() => {
    (window as any).openBookingModal = () => setIsBookingOpen(true);
    (window as any).openVoiceDemo = () => setShowVoice(true);
    return () => {
      delete (window as any).openBookingModal;
      delete (window as any).openVoiceDemo;
    };
  }, []);

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
      
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      {showVoice && (
        <VoiceCallOverlay
          demoId="nws-giveaway-demo"
          businessName="Your Business"
          primaryColor="#2BD9C2"
          apiBase=""
          onClose={() => setShowVoice(false)}
        />
      )}

    </div>
  );
}
