document.addEventListener('DOMContentLoaded', () => {
    // Load features content into main page
    const featuresContainer = document.getElementById('features-container');
    fetch('site/Home/components/features/features.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            featuresContainer.appendChild(doc.querySelector('.features'));
        })
        .catch(error => console.error('Error loading features section:', error));

    // Initialize intersection observer for animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards once they're loaded
    setTimeout(() => {
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.style.animationPlayState = 'paused';
            observer.observe(card);
        });
    }, 100);
});
