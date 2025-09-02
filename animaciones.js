// Current language state
let currentLanguage = 'es';
let platformsVisible = false;
let countingAnimation = null;
let counterComplete = false;

// Counter animation function
function animateCounter(start, end, duration, callback) {
    const counterElement = document.getElementById('counterNumber');
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(start + (end - start) * easeOutQuart);
        
        // Add counting animation class
        counterElement.classList.add('counting');
        setTimeout(() => counterElement.classList.remove('counting'), 100);
        
        // Format number with commas and dollar sign
        counterElement.textContent = `$${currentValue.toLocaleString()}`;
        
        if (progress < 1) {
            countingAnimation = requestAnimationFrame(updateCounter);
        } else {
            counterElement.textContent = `+$${end.toLocaleString()}`;
            counterComplete = true;
            document.getElementById('counterDisplay').classList.add('complete');
            if (callback) callback();
        }
    }
    
    countingAnimation = requestAnimationFrame(updateCounter);
}

// Platform animation controller
function showPlatforms() {
    if (platformsVisible || !counterComplete) return;
    
    const bubbles = document.querySelectorAll('.platform-bubble');
    const lines = document.querySelectorAll('.connection-line');
    const counter = document.querySelector('.investment-counter');
    
    platformsVisible = true;
    
    // Activate counter animation
    counter.classList.add('active');
    
    // Show connection lines first
    setTimeout(() => {
        lines.forEach(line => line.classList.add('visible'));
    }, 200);
    
    // Then show bubbles with stagger
    setTimeout(() => {
        bubbles.forEach((bubble, index) => {
            setTimeout(() => {
                bubble.classList.add('visible');
            }, index * 200);
        });
    }, 500);
}

function hidePlatforms() {
    if (!platformsVisible) return;
    
    const bubbles = document.querySelectorAll('.platform-bubble');
    const lines = document.querySelectorAll('.connection-line');
    const counter = document.querySelector('.investment-counter');
    
    platformsVisible = false;
    
    // Hide bubbles
    bubbles.forEach(bubble => bubble.classList.remove('visible'));
    
    // Hide lines
    setTimeout(() => {
        lines.forEach(line => line.classList.remove('visible'));
    }, 200);
    
    // Deactivate counter
    setTimeout(() => {
        counter.classList.remove('active');
    }, 400);
}

// Event listeners for counter click
document.getElementById('counterDisplay').addEventListener('click', () => {
    if (counterComplete) {
        if (platformsVisible) {
            hidePlatforms();
        } else {
            showPlatforms();
        }
    }
});

// Language toggle function
function toggleLanguage() {
    const button = document.querySelector('.lang-toggle');
    const elementsToTranslate = document.querySelectorAll('[data-en]');
    if (currentLanguage === 'es') {
        currentLanguage = 'en';
        button.textContent = 'ES';
        elementsToTranslate.forEach(element => {
            element.setAttribute('data-es', element.textContent);
            element.textContent = element.getAttribute('data-en');
        });
    } else {
        currentLanguage = 'es';
        button.textContent = 'EN';
        elementsToTranslate.forEach(element => {
            element.textContent = element.getAttribute('data-es') || element.getAttribute('data-en');
        });
    }
}

// Animate counter on load
window.addEventListener('DOMContentLoaded', () => {
    animateCounter(0, 100000, 1000);
});

        // Slider functionality
        let currentSlide = 0;
        const totalSlides = 6;
        
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            const container = document.getElementById('slidesContainer');
            const translateX = -(slideIndex * 100);
            container.style.transform = `translateX(${translateX}%)`;
            
            // Update active states
            document.querySelectorAll('.slide').forEach((slide, index) => {
                slide.classList.toggle('active', index === slideIndex);
            });
            
            document.querySelectorAll('.nav-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
        }
        
        // Auto-advance slider
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }, 4000);

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to top button visibility
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Smooth scroll for navigation links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Pause brand scroll animation on hover
const brandsContainer = document.querySelector('.brands-container');
if (brandsContainer) {
    brandsContainer.addEventListener('mouseenter', () => {
        brandsContainer.style.animationPlayState = 'paused';
    });
    
    brandsContainer.addEventListener('mouseleave', () => {
        brandsContainer.style.animationPlayState = 'running';
    });
}

// Add floating particles effect - Reduced on mobile
function createParticle() {
    if (window.innerWidth <= 768) return; // No particles on mobile
    
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(65, 105, 225, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        animation: floatUp ${Math.random() * 10 + 10}s linear forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 20000);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-120vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create particles periodically - Only on desktop
if (window.innerWidth > 768) {
    setInterval(createParticle, 5000);
}

// Initialize animations on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.hero').classList.add('animate-in');
    }, 500);
});

// Enhanced contact item interactions
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function() {
        const icon = this.querySelector('.contact-icon i');
        if (window.innerWidth > 768) {
            icon.style.animation = 'iconBounce 0.6s ease';
            setTimeout(() => {
                icon.style.animation = 'iconBounce 2s ease-in-out infinite';
            }, 600);
        }
    });
});

// Scroll reveal animation for footer sections
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.8s ease forwards';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.footer-section, .footer-brand').forEach(section => {
    footerObserver.observe(section);
});

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}