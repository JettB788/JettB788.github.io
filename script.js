// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function smoothScrollToSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;
    const offsetTop = targetSection.offsetTop - 80;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

function setupAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            if (!targetSection) return;

            e.preventDefault();
            smoothScrollToSection(targetId);
        });
    });
}

function setupServiceTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const cards = document.querySelectorAll('.pricing-card');

    function setCategory(category) {
        tabButtons.forEach(button => {
            const isActive = button.dataset.target === category;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        cards.forEach(card => {
            card.classList.remove('active', 'visible');
            card.style.display = 'none';
            card.setAttribute('aria-hidden', 'true');
        });

        const matchingCards = Array.from(cards).filter(card => card.dataset.category === category);

        matchingCards.forEach((card, index) => {
            card.style.display = 'flex';
            card.classList.add('active');
            card.setAttribute('aria-hidden', 'false');
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 90);
        });
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.target;
            setCategory(category);
        });
    });

    setCategory('exterior');
}

function revealOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18
    });

    document.querySelectorAll('.fade-up').forEach(card => observer.observe(card));
}

function setupMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupAnchors();
    setupServiceTabs();
    revealOnScroll();
    setupMobileNav();
});
