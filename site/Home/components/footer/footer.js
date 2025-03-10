document.addEventListener('DOMContentLoaded', () => {
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to your backend
        console.log('Newsletter subscription for:', email);
        
        // Show success message
        alert('Thanks for subscribing!');
        e.target.reset();
    });

    // Social media links
    const socialLinks = document.querySelectorAll('.social-link');
    const socialUrls = {
        github: 'https://github.com/yourusername',
        twitter: 'https://twitter.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername'
    };

    socialLinks.forEach(link => {
        const platform = link.dataset.platform;
        if (platform && socialUrls[platform]) {
            link.href = socialUrls[platform];
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });

    // Update copyright year
    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear) {
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2024', new Date().getFullYear());
    }
});
