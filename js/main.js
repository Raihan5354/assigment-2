// Created by Raihan Patel
// Main JavaScript functionality for the Slovak Education Center website

document.addEventListener('DOMContentLoaded', () => {
    // Language switcher
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', (e) => {
            const lang = e.target.value;
            // Initialize Google Translate
            const googleTranslateElement = document.getElementById('google_translate_element');
            if (googleTranslateElement) {
                const select = googleTranslateElement.querySelector('.goog-te-combo');
                if (select) {
                    select.value = lang;
                    select.dispatchEvent(new Event('change'));
                }
            }
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            // TODO: Implement newsletter subscription
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll-based animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature, .event-card, .game-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize animation states
    document.querySelectorAll('.feature, .event-card, .game-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Educational games interaction
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const link = card.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank');
            }
        });

        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});