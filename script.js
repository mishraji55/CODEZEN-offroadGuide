// ============================================
// MOBILE MENU TOGGLE
// ============================================

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLL INTERSECTION OBSERVER
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and components
document.querySelectorAll('.problem-card, .solution-card, .pipeline-step, .class-card, .metric-card, .failure-card, .app-card, .conclusion-box').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// SCROLL INDICATOR ANIMATION
// ============================================

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(30, 30, 30, 0.98)';
    } else {
        navbar.style.background = 'rgba(30, 30, 30, 0.95)';
    }
});

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================

const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.style.color = 'var(--text-light)';
        if (item.getAttribute('href').slice(1) === current) {
            item.style.color = 'var(--tech-blue)';
        }
    });
});

// ============================================
// FORM SUBMISSION HANDLER
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = 'var(--vegetation-green)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'var(--tech-blue)';
        }, 3000);
    });
}

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : element.textContent.match(/[^\d]/g) ? element.textContent.match(/[^\d]/g).join('') : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Animate stat values when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const text = entry.target.textContent;
            const number = parseInt(text);
            
            if (!isNaN(number)) {
                animateCounter(entry.target, number);
                entry.target.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value, .metric-value, .stat-number, .iou-value').forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// PROGRESS BAR ANIMATION FOR IoU
// ============================================

const iouObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.iou-fill');
            
            progressBars.forEach(bar => {
                const targetWidth = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1s ease-out';
                    bar.style.width = targetWidth;
                }, 100);
            });
            
            iouObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const classIouSection = document.querySelector('.class-iou');
if (classIouSection) {
    iouObserver.observe(classIouSection);
}

// ============================================
// PARALLAX EFFECT FOR HERO SECTION
// ============================================

const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
        const scrollPercentage = window.scrollY / window.innerHeight;
        
        const cards = document.querySelectorAll('.floating-card');
        cards.forEach((card, index) => {
            const offset = scrollPercentage * 50 * (index + 1);
            card.style.transform = `translateY(${offset}px)`;
        });
    }
});

// ============================================
// TOOLTIP/HOVER EFFECTS
// ============================================

document.querySelectorAll('[title]').forEach(element => {
    element.addEventListener('mouseenter', function(e) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('title');
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(58, 125, 255, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 0.85rem;
            white-space: nowrap;
            z-index: 1001;
            pointer-events: none;
            margin-top: -40px;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = (rect.top - 10) + 'px';
    });
    
    element.addEventListener('mouseleave', function() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// ============================================
// DYNAMIC CLASS COLOR DISPLAY
// ============================================

const classMapping = {
    'Rocks': { color: '#C0392B', hex: 'C0392B' },
    'Trees & Trunks': { color: '#6B7A4A', hex: '6B7A4A' },
    'Bushes & Low Vegetation': { color: '#2ECC71', hex: '2ECC71' },
    'Ground & Sand': { color: '#7A4A2E', hex: '7A4A2E' },
    'Sky': { color: '#5DA9E9', hex: '5DA9E9' },
    'Logs & Debris': { color: '#8B5E3C', hex: '8B5E3C' }
};

// ============================================
// KEYBOARD NAVIGATION
// ============================================

const navLinksItems = document.querySelectorAll('.nav-links a');

navLinksItems.forEach((link, index) => {
    link.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            if (navLinksItems[index + 1]) {
                navLinksItems[index + 1].focus();
            }
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (navLinksItems[index - 1]) {
                navLinksItems[index - 1].focus();
            }
        }
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION - LAZY LOADING SIMULATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Simulate lazy loading for images (if images were used)
    const images = document.querySelectorAll('[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// ============================================
// SMOOTH PAGE TRANSITIONS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// THEME TOGGLE (Optional Dark/Light Mode)
// ============================================

// Check for saved user preference or default to dark mode
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDark) {
    document.documentElement.style.colorScheme = 'dark';
} else {
    document.documentElement.style.colorScheme = 'light';
}

// ============================================
// PRINT STYLES
// ============================================

window.addEventListener('beforeprint', () => {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
});

window.addEventListener('afterprint', () => {
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
});

// ============================================
// ACCESSIBILITY - SKIP TO MAIN CONTENT
// ============================================

// Create skip to main content link if it doesn't exist
const skipLink = document.createElement('a');
skipLink.href = '#problem';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--tech-blue);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
    border-radius: 0 0 4px 0;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Log Web Vitals if available
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    });
}

// ============================================
// UTILITY FUNCTION FOR DYNAMIC DATA
// ============================================

function updateMetrics(data) {
    // This function can be used to dynamically update metrics
    // Example: updateMetrics({ meanIoU: 94.2, accuracy: 97 })
    
    if (data.meanIoU) {
        const metricValue = document.querySelector('.metric-value');
        if (metricValue) {
            metricValue.textContent = data.meanIoU + '%';
        }
    }
}

// ============================================
// PRINT REPORT FUNCTIONALITY
// ============================================

function printReport() {
    window.print();
}

// Add print button functionality if needed
window.printReport = printReport;

// ============================================
// CONSOLE BRANDING
// ============================================

console.log('%c🚀 Offroad Semantic Scene Segmentation', 'color: #3A7DFF; font-size: 20px; font-weight: bold;');
console.log('%cAdvanced AI perception for autonomous vehicles', 'color: #E6D3A3; font-size: 14px;');
console.log('%cVisit: github.com/yourrepo', 'color: #2ECC71; font-size: 12px;');
