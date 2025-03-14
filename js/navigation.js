// Created by Raihan Patel
// Navigation functionality for the Slovak Education Center website

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const mainNav = document.querySelector('.main-nav');

    // Only proceed if we have the required elements
    if (mobileMenuBtn && navLinks && mainNav) {
        // Scroll position tracking
        let lastScrollTop = 0;
        const scrollThreshold = 50;

        // Toggle mobile menu with animation
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Hide navigation on scroll down, show on scroll up
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
                // Scrolling down
                mainNav.classList.add('nav-hidden');
            } else {
                // Scrolling up
                mainNav.classList.remove('nav-hidden');
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });

        // Add active state to current page link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const activeLink = navLinks.querySelector(`a[href="${currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Smooth scroll for navigation links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        // Close mobile menu after clicking
                        mobileMenuBtn.classList.remove('active');
                        navLinks.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });
        });

        // Add hover animation for logo
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                const logoImg = logo.querySelector('.logo-img');
                if (logoImg) {
                    logoImg.style.transform = 'rotate(360deg)';
                }
            });

            logo.addEventListener('mouseleave', () => {
                const logoImg = logo.querySelector('.logo-img');
                if (logoImg) {
                    logoImg.style.transform = 'rotate(0deg)';
                }
            });
        }
    }
});