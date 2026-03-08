// Scroll Animation for Cards
document.addEventListener('DOMContentLoaded', function() {
    // Add fade classes to cards
    const serviceCards = document.querySelectorAll('.service-card');
    const projectCards = document.querySelectorAll('.project-card');
    
    serviceCards.forEach((card, index) => {
        card.classList.add(index % 2 === 0 ? 'fade-left' : 'fade-right');
    });
    
    projectCards.forEach((card, index) => {
        card.classList.add(index % 2 === 0 ? 'fade-left' : 'fade-right');
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);
    
    // Observe all cards
    serviceCards.forEach(card => observer.observe(card));
    projectCards.forEach(card => observer.observe(card));
    
    // Counter Animation for Stats
    const counterObserverOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, counterObserverOptions);
    
    // Observe all counters
    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Counter Animation Function
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const increment = target / totalFrames;
    
    let current = 0;
    let frame = 0;
    
    element.classList.add('counting');
    
    const counter = setInterval(() => {
        frame++;
        current += increment;
        
        if (frame === totalFrames) {
            element.textContent = target + suffix;
            element.classList.remove('counting');
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, frameDuration);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery Image Modal
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');

// Add click event to all gallery images
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        modal.classList.add('active');
        modalImg.src = this.src;
    });
});

// Close modal on close button click
modalClose.addEventListener('click', function() {
    modal.classList.remove('active');
});

// Close modal when clicking outside the image
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
    }
});
