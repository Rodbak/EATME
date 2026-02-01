// ===== EAT ME - Interactive Scripts =====

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initCursor();
    initNavbar();
    initMenuTabs();
    initScrollAnimations();
    initParallax();
    initFormHandling();
    initMobileMenu();
});

// ===== Custom Cursor =====
function initCursor() {
    const cursor = document.querySelector('.cursor-glow');
    
    // Only initialize custom cursor on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .menu-item, .service-card, .cocktail-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    } else {
        // Hide custom cursor on touch devices
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
}

// ===== Navbar Scroll Effect =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for background
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            let mobileMenu = document.querySelector('.mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                mobileMenu.innerHTML = navLinks.innerHTML;
                
                // Add styles
                mobileMenu.style.cssText = `
                    position: fixed;
                    top: 70px;
                    left: 0;
                    right: 0;
                    background: rgba(28, 20, 16, 0.98);
                    padding: 2rem;
                    display: none;
                    flex-direction: column;
                    gap: 1.5rem;
                    z-index: 999;
                    backdrop-filter: blur(20px);
                `;
                
                // Style the links
                const links = mobileMenu.querySelectorAll('a');
                links.forEach(link => {
                    link.style.cssText = `
                        font-size: 1.2rem;
                        padding: 0.5rem 0;
                        border-bottom: 1px solid rgba(255,255,255,0.1);
                    `;
                });
                
                document.body.appendChild(mobileMenu);
            }
            
            // Toggle visibility
            if (mobileMenu.style.display === 'flex') {
                mobileMenu.style.display = 'none';
            } else {
                mobileMenu.style.display = 'flex';
            }
        });
    }
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu) {
        mobileMenu.style.display = 'none';
    }
    if (menuBtn) {
        menuBtn.classList.remove('active');
    }
}

// ===== Menu Category Tabs =====
function initMenuTabs() {
    const tabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-item');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.dataset.category;
            
            // Filter items with animation
            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger children animations
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('animate-in');
                });
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.about-content, .about-image, .service-card, .menu-item, ' +
        '.catering-content, .catering-gallery, .cocktail-card, ' +
        '.testimonial-card, .order-info, .order-form-container, .contact-card'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animate-in styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== Parallax Effects =====
function initParallax() {
    const bgTexts = document.querySelectorAll('.hero-bg-text, .menu-bg-text, .cocktails-bg-text');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        bgTexts.forEach(text => {
            const rect = text.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                text.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.1}px)`;
            }
        });
    });
}

// ===== Form Handling =====
function initFormHandling() {
    const orderForm = document.querySelector('.order-form');
    
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(orderForm);
            const data = Object.fromEntries(formData);
            
            // Simulate submission
            const submitBtn = orderForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Show success message
                showNotification('Order received! We\'ll be in touch soon. 😏', 'success');
                orderForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Input focus animations
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <p>${message}</p>
        <button class="notification-close">&times;</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#4A6741' : '#2A1F1A'};
        color: #FDF6E9;
        padding: 1.5rem 2rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        box-shadow: 0 10px 40px rgba(229, 168, 48, 0.3);
        border-left: 3px solid #E5A830;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const suffix = counter.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// ===== Hover Effects Enhancement =====
document.querySelectorAll('.service-card, .cocktail-card, .menu-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ===== Typed Text Effect for Hero =====
function initTypedEffect() {
    const taglines = [
        "Don't resist temptation",
        "Indulge your desires",
        "Feed your cravings",
        "Taste the forbidden"
    ];
    
    const taglineElement = document.querySelector('.hero-tagline');
    if (!taglineElement) return;
    
    let currentIndex = 0;
    
    setInterval(() => {
        taglineElement.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % taglines.length;
            taglineElement.textContent = taglines[currentIndex];
            taglineElement.style.opacity = '1';
        }, 500);
    }, 4000);
}

// Initialize typed effect after page load
setTimeout(initTypedEffect, 2000);

// ===== Order Type Toggle =====
document.querySelectorAll('input[name="order-type"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const labels = document.querySelectorAll('.order-option label');
        labels.forEach(label => {
            label.style.transition = 'all 0.3s ease';
        });
    });
});

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});

// ===== Easter Egg - Konami Code =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'hueRotate 2s ease';
        showNotification('🔥 Secret Menu Unlocked! Just kidding... but we like your style! 😏', 'success');
        
        // Add hue rotate animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes hueRotate {
                0% { filter: hue-rotate(0deg); }
                50% { filter: hue-rotate(180deg); }
                100% { filter: hue-rotate(0deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

console.log('%c EAT ME 😏', 'font-size: 48px; font-weight: bold; color: #E5A830;');
console.log('%c Satisfy your cravings...', 'font-size: 16px; color: #4A6741;');
