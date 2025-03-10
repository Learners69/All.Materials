// Load hero component
document.addEventListener('DOMContentLoaded', () => {
    initHero();
});

function initHero() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn-hover-effect');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
    
    // Watch Demo button click handler
    const watchDemoBtn = document.querySelector('.secondary-btn');
    watchDemoBtn.addEventListener('click', () => {
        // Add your video modal logic here
        console.log('Opening demo video...');
    });
    
    // Get Started button click handler
    const getStartedBtn = document.querySelector('.primary-btn');
    getStartedBtn.addEventListener('click', () => {
        // Add your onboarding logic here
        console.log('Starting onboarding...');
    });
    
    // Parallax effect for shapes
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX * speed);
            const y = (mouseY * speed);
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}
