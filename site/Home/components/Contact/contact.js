// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-text, .animate-text-delay, .animate-slide-right, .animate-slide-left, .animate-up').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// Form handling
const contactForm = document.getElementById('contactForm');
const inputs = document.querySelectorAll('.animate-input');

// Add animation to form inputs
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Form validation and submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Validate form
    let isValid = true;
    const errors = {};

    if (!data.name || data.name.trim().length < 2) {
        isValid = false;
        errors.name = 'Name must be at least 2 characters long';
    }

    if (!data.email || !isValidEmail(data.email)) {
        isValid = false;
        errors.email = 'Please enter a valid email address';
    }

    if (!data.message || data.message.trim().length < 10) {
        isValid = false;
        errors.message = 'Message must be at least 10 characters long';
    }

    if (!isValid) {
        showErrors(errors);
        return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
        // Simulate API call (replace with your actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();

        // Remove focused class from all inputs
        inputs.forEach(input => {
            input.parentElement.classList.remove('focused');
        });

    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        // Restore button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showErrors(errors) {
    // Remove existing error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    // Show new error messages
    Object.entries(errors).forEach(([field, message]) => {
        const input = document.getElementById(field);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ff7675';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
    });
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '5px';
    notification.style.color = 'white';
    notification.style.backgroundColor = type === 'success' ? '#00b894' : '#ff7675';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    notification.textContent = message;

    // Add to DOM
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Social links hover effect
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-5px)';
    });

    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateY(0)';
    });
}); 