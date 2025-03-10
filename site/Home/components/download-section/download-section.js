document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.download-btn:not([disabled])');

    downloadButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const card = e.target.closest('.card');
            const type = card.dataset.type;

            // Add loading state
            button.disabled = true;
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

            try {
                // Simulate download delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Handle different download types
                switch(type) {
                    case 'pdf':
                        alert('PDF download started!');
                        break;
                    case 'notes':
                        alert('Notes download started!');
                        break;
                }
            } catch (error) {
                alert('Download failed. Please try again.');
            } finally {
                // Reset button state
                button.disabled = false;
                button.innerHTML = originalText;
            }
        });
    });

    // Add hover effect for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.card-icon i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.card-icon i');
            icon.style.transform = 'scale(1)';
        });
    });
});
