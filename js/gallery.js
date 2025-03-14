// Created by Raihan Patel
// Gallery functionality for the events page

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    const dotsContainer = document.querySelector('.gallery-dots');
    
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('gallery-dot');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.gallery-dot');

    // Initialize gallery
    function showSlide(index) {
        slides.forEach(slide => slide.style.display = 'none');
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].style.display = 'block';
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-advance slides
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    galleryContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Initialize first slide
    showSlide(currentSlide);
});