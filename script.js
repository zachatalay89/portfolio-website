// Hardware-themed portfolio JavaScript functionality

// Global variables
let particles = [];
let mousePosition = { x: 0, y: 0 };

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeNavigation();
    initializeParallax();
    initializeScrollEffects();
    initializeSkillsSection();
    initializeProjectsSection();
    initializeContactForm();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
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
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.remove('active');
}

function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Parallax effect for hero background
function initializeParallax() {
    const heroBg = document.getElementById('hero-bg');
    
    document.addEventListener('mousemove', function(e) {
        mousePosition.x = (e.clientX / window.innerWidth) * 100;
        mousePosition.y = (e.clientY / window.innerHeight) * 100;
        
        if (heroBg) {
            const moveX = mousePosition.x * 0.02;
            const moveY = mousePosition.y * 0.02;
            heroBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
}

// Animated particles
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay and duration
    particle.style.animationDelay = Math.random() * 4 + 's';
    particle.style.animationDuration = (3 + Math.random() * 2) + 's';
    
    container.appendChild(particle);
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Skills section functionality
function initializeSkillsSection() {
    // Animate progress bars when skills section comes into view
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skillsObserver.observe(skillsSection);
}

function showSkillCategory(category) {
    // Hide all categories
    document.querySelectorAll('.skill-category').forEach(cat => {
        cat.classList.remove('active');
    });
    
    // Show selected category
    const targetCategory = document.getElementById(category);
    if (targetCategory) {
        targetCategory.classList.add('active');
    }
    
    // Update tab states
    document.querySelectorAll('.skill-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    // Re-animate progress bars
    setTimeout(() => {
        animateProgressBars();
    }, 100);
}

function animateProgressBars() {
    const activeCategory = document.querySelector('.skill-category.active');
    if (!activeCategory) return;
    
    const progressBars = activeCategory.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Projects section functionality
function initializeProjectsSection() {
    // Show project highlights on hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const highlights = card.querySelector('.project-highlights');
        if (highlights) {
            card.addEventListener('mouseenter', () => {
                highlights.style.display = 'block';
                highlights.style.animation = 'fadeIn 0.3s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                highlights.style.display = 'none';
            });
        }
    });
}

function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update button states
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter projects
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Contact form functionality
function initializeContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simulate form submission
    showNotification('Message Sent!', 'Thanks for reaching out. I\'ll get back to you soon!');
    
    // Reset form
    event.target.reset();
}

function showNotification(title, message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card);
        border: 1px solid var(--primary);
        border-radius: var(--radius);
        padding: 1rem;
        box-shadow: 0 0 20px hsla(190, 100%, 50%, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Add CSS for notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification h4 {
        color: var(--primary);
        margin-bottom: 0.5rem;
        font-size: 1rem;
    }
    
    .notification p {
        color: var(--muted-foreground);
        font-size: 0.875rem;
        margin: 0;
    }
`;
document.head.appendChild(notificationStyles);

// Performance optimization: Throttle scroll and mouse events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to expensive operations
window.addEventListener('scroll', throttle(function() {
    // Scroll handler is already optimized in initializeNavigation
}, 16));

document.addEventListener('mousemove', throttle(function(e) {
    // Parallax handler is already in initializeParallax
}, 16));

// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@1.4.10/dist/smoothscroll.min.js';
    document.head.appendChild(script);
}

// Export functions for global access
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.scrollToSection = scrollToSection;
window.showSkillCategory = showSkillCategory;
window.filterProjects = filterProjects;
window.handleFormSubmit = handleFormSubmit;