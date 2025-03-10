// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mainNav = document.querySelector('.main-nav');

    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const menuIcon = mobileMenuBtn.querySelector('.material-icons');
        menuIcon.textContent = mainNav.classList.contains('active') ? 'close' : 'menu';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mainNav.contains(e.target)) {
            mainNav.classList.remove('active');
            mobileMenuBtn.querySelector('.material-icons').textContent = 'menu';
        }
    });
});

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                document.querySelector('.main-nav').classList.remove('active');
                document.querySelector('.mobile-menu .material-icons').textContent = 'menu';
            }
        });
    });
});

// Logo click handler
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
        window.location.href = window.location.pathname;
    });
});

// Load components
async function loadComponent(containerId, path) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        container.innerHTML = html;
        
        // Trigger AOS refresh after component load
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        console.log(`Successfully loaded ${path} into ${containerId}`);
    } catch (error) {
        console.error(`Error loading component ${path}:`, error);
        container.innerHTML = `<div class="error-message">Failed to load content. Please refresh the page.</div>`;
    }
}

// Initialize components
document.addEventListener('DOMContentLoaded', async () => {
    const components = [
        { id: 'hero-container', path: './site/Home/components/hero/hero.html' },
        { id: 'features-container', path: './site/Home/components/features/features.html' },
        { id: 'download-section-container', path: './site/Home/components/download-section/download-section.html' },
        { id: 'about-container', path: './site/Home/components/About/about.html' },
        { id: 'contact-container', path: './site/Home/components/Contact/contact.html' },
        { id: 'footer-container', path: './site/Home/components/footer/footer.html' }
    ];

    // Load all components sequentially
    for (const component of components) {
        await loadComponent(component.id, component.path);
    }
});
