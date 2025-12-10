// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.submit-btn');
const formMessage = document.getElementById('formMessage');

// Check if form was submitted successfully (redirected back from FormSubmit)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('submitted') === 'true') {
    // Show success message
    const name = urlParams.get('name') || 'there';
    showFormMessage('success', `Thank you, ${name}! Your message has been received. We will contact you soon.`);
    // Clean URL
    const currentUrl = window.location.href.split('?')[0];
    window.history.replaceState({}, document.title, currentUrl + '#contact');
    // Reset form
    contactForm.reset();
}

// Function to show form messages
function showFormMessage(type, message) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

contactForm.addEventListener('submit', (e) => {
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Hide any previous messages
    formMessage.style.display = 'none';
    
    // Simple validation
    if (!name || !phone || !email || !message) {
        e.preventDefault();
        showFormMessage('error', 'Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        e.preventDefault();
        showFormMessage('error', 'Please enter a valid email address.');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
        e.preventDefault();
        showFormMessage('error', 'Please enter a valid phone number.');
        return;
    }
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Set redirect URL with form data
    const currentUrl = window.location.href.split('#')[0].split('?')[0];
    const thankYouUrl = currentUrl + '?submitted=true&name=' + encodeURIComponent(name) + '#contact';
    contactForm.querySelector('input[name="_next"]').value = thankYouUrl;
    
    // Form will submit to FormSubmit service
    // FormSubmit will send email to tayalchandigarh@gmail.com
    // Then redirect back to our page with success message
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service tiles and info items
document.querySelectorAll('.service-tile, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeSection = document.querySelector('.home-section');
    if (homeSection && scrolled < window.innerHeight) {
        homeSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        homeSection.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

