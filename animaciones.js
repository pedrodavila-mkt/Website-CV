// Current language state
let currentLanguage = 'es';
let platformsVisible = false;
let countingAnimation = null;
let counterComplete = false;

// Mobile Menu Logic
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-item a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
});


// Counter animation function
function animateCounter(start, end, duration, callback) {
    const counterElement = document.getElementById('counterNumber');
    if (!counterElement) return;

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
            const display = document.getElementById('counterDisplay');
            if(display) display.classList.add('complete');
            if (callback) callback();
        }
    }
    
    countingAnimation = requestAnimationFrame(updateCounter);
}

// Platform animation controller
function showPlatforms() {
    if (platformsVisible || !counterComplete) return;
    
    const bubbles = document.querySelectorAll('.platform-bubble');
    const counter = document.querySelector('.investment-counter');
    
    platformsVisible = true;
    
    // Activate counter animation
    if(counter) counter.classList.add('active');
    
    // Show bubbles with stagger
    bubbles.forEach((bubble, index) => {
        setTimeout(() => {
            bubble.classList.add('visible');
        }, index * 200);
    });
}

function hidePlatforms() {
    if (!platformsVisible) return;
    
    const bubbles = document.querySelectorAll('.platform-bubble');
    const counter = document.querySelector('.investment-counter');
    
    platformsVisible = false;
    
    // Hide bubbles
    bubbles.forEach(bubble => bubble.classList.remove('visible'));
    
    // Deactivate counter
    setTimeout(() => {
        if(counter) counter.classList.remove('active');
    }, 400);
}

// Event listeners for counter click
const counterDisplay = document.getElementById('counterDisplay');
if (counterDisplay) {
    counterDisplay.addEventListener('click', () => {
        if (counterComplete) {
            if (platformsVisible) {
                hidePlatforms();
            } else {
                showPlatforms();
            }
        }
    });
}

// Language toggle function
function toggleLanguage() {
    const button = document.querySelector('.lang-toggle');
    const elementsToTranslate = document.querySelectorAll('[data-en]');
    if (currentLanguage === 'es') {
        currentLanguage = 'en';
        if(button) button.textContent = 'ES';
        elementsToTranslate.forEach(element => {
            element.setAttribute('data-es', element.textContent);
            element.textContent = element.getAttribute('data-en');
        });
    } else {
        currentLanguage = 'es';
        if(button) button.textContent = 'EN';
        elementsToTranslate.forEach(element => {
            element.textContent = element.getAttribute('data-es') || element.getAttribute('data-en');
        });
    }
}

// Animate counter on load
window.addEventListener('DOMContentLoaded', () => {
    animateCounter(0, 100000, 1000);
});

/* =========================================
   EXPERIENCE SLIDER LOGIC WITH SWIPE/DRAG
   ========================================= */
let currentSlide = 0;
const totalSlides = 6;
let sliderInterval;

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    const container = document.getElementById('slidesContainer');
    if (!container) return;

    // Normalizar index
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;

    const translateX = -(currentSlide * 100);
    container.style.transform = `translateX(${translateX}%)`;
    
    // Update active states
    document.querySelectorAll('.slide').forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    
    document.querySelectorAll('.nav-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function startSliderInterval() {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 4000);
}

// Initialize Slider
startSliderInterval();

// --- Drag & Swipe Logic for Experience Slider ---
const sliderArea = document.getElementById('experienceSliderArea');
let isDraggingSlider = false;
let startPosSlider = 0;
let currentTranslateSlider = 0;
let prevTranslateSlider = 0;
let animationIDSlider;
let currentIndexSlider = 0;

if (sliderArea) {
    // Touch Events
    sliderArea.addEventListener('touchstart', touchStart);
    sliderArea.addEventListener('touchend', touchEnd);
    sliderArea.addEventListener('touchmove', touchMove);
    
    // Mouse Events
    sliderArea.addEventListener('mousedown', touchStart);
    sliderArea.addEventListener('mouseup', touchEnd);
    sliderArea.addEventListener('mouseleave', () => {
        if(isDraggingSlider) touchEnd();
    });
    sliderArea.addEventListener('mousemove', touchMove);
}

function touchStart(index) {
    return function(event) {
        clearInterval(sliderInterval); // Pause auto-slide
        isDraggingSlider = true;
        startPosSlider = getPositionX(event);
        // Reset transition temporarily for drag effect if we were to do real-time drag
        // For simple swipe detection, we just need start pos
    }
}

function touchStart(event) {
    clearInterval(sliderInterval);
    isDraggingSlider = true;
    startPosSlider = getPositionX(event);
}

function touchMove(event) {
    if (isDraggingSlider) {
        // Optional: Add realtime drag visual feedback here
    }
}

function touchEnd() {
    isDraggingSlider = false;
    const movedBy = currentTranslateSlider - prevTranslateSlider;
    // We will just calculate diff from startPos vs current mouse pos is easier for simple swipe
    // Let's rely on the last event position (not stored globally in this simplified version, so let's fix logic)
}

// Simplified Swipe Logic
let touchStartX = 0;
let touchEndX = 0;

if (sliderArea) {
    sliderArea.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(sliderInterval);
    });
    
    sliderArea.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startSliderInterval();
    });
    
    sliderArea.addEventListener('mousedown', e => {
        touchStartX = e.clientX;
        clearInterval(sliderInterval);
    });
    
    sliderArea.addEventListener('mouseup', e => {
        touchEndX = e.clientX;
        handleSwipe();
        startSliderInterval();
    });
}

function handleSwipe() {
    const threshold = 50; // Minimum distance for swipe
    if (touchEndX < touchStartX - threshold) {
        // Swiped Left -> Next Slide
        goToSlide(currentSlide + 1);
    }
    if (touchEndX > touchStartX + threshold) {
        // Swiped Right -> Prev Slide
        goToSlide(currentSlide - 1);
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}


/* =========================================
   BRANDS SCROLL LOGIC (DRAG TO SCROLL + AUTO)
   ========================================= */
const brandsWrapper = document.getElementById('brandsScrollWrapper');
let brandsScrollInterval;
let isBrandDragging = false;
let brandStartX;
let brandScrollLeft;

if (brandsWrapper) {
    // Auto Scroll Logic
    function startBrandScroll() {
        stopBrandScroll();
        brandsScrollInterval = setInterval(() => {
            if (!isBrandDragging) {
                brandsWrapper.scrollLeft += 1;
                // Infinite scroll reset logic
                if(brandsWrapper.scrollLeft >= (brandsWrapper.scrollWidth - brandsWrapper.clientWidth)) {
                     // Optionally reset to 0 or reverse. For simple UX, let it stop or loop if content duplicated.
                     // Simple loop:
                     if(brandsWrapper.scrollLeft >= (brandsWrapper.scrollWidth - brandsWrapper.clientWidth - 1)) {
                         brandsWrapper.scrollLeft = 0; 
                     }
                }
            }
        }, 30); // Speed
    }

    startBrandScroll();

    // Drag to Scroll Logic
    brandsWrapper.addEventListener('mousedown', (e) => {
        isBrandDragging = true;
        brandsWrapper.classList.add('active'); // Optional class for cursor
        brandStartX = e.pageX - brandsWrapper.offsetLeft;
        brandScrollLeft = brandsWrapper.scrollLeft;
        stopBrandScroll();
    });

    brandsWrapper.addEventListener('mouseleave', () => {
        isBrandDragging = false;
        startBrandScroll();
    });

    brandsWrapper.addEventListener('mouseup', () => {
        isBrandDragging = false;
        startBrandScroll();
    });

    brandsWrapper.addEventListener('mousemove', (e) => {
        if (!isBrandDragging) return;
        e.preventDefault();
        const x = e.pageX - brandsWrapper.offsetLeft;
        const walk = (x - brandStartX) * 2; // Scroll-fast
        brandsWrapper.scrollLeft = brandScrollLeft - walk;
    });

    // Touch events are handled natively by overflow:auto but we pause auto-scroll
    brandsWrapper.addEventListener('touchstart', () => {
        isBrandDragging = true;
        stopBrandScroll();
    });
    
    brandsWrapper.addEventListener('touchend', () => {
        isBrandDragging = false;
        startBrandScroll();
    });
}

function stopBrandScroll() {
    clearInterval(brandsScrollInterval);
}


// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Back to top button visibility
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
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
        const hero = document.querySelector('.hero');
        if(hero) hero.classList.add('animate-in');
    }, 500);
});

// Enhanced contact item interactions
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function() {
        const icon = this.querySelector('.contact-icon i');
        if (window.innerWidth > 768 && icon) {
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
