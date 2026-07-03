<script>
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
</script>