document.addEventListener('DOMContentLoaded', () => {
    // Card animations
    const cards = document.querySelectorAll('.destination-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 200 + 500);
    });

    // Feedback modal functionality
    const modal = document.getElementById('feedbackModal');
    const feedbackBtn = document.getElementById('feedbackBtn');
    const closeBtn = document.getElementsByClassName('close')[0];
    const feedbackForm = document.getElementById('feedbackForm');

    feedbackBtn.onclick = function() {
        modal.style.display = "block";
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    feedbackForm.onsubmit = function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Here you can add code to handle the form submission
        console.log('Feedback submitted:', { name, email, message });
        
        // Clear form and close modal
        feedbackForm.reset();
        modal.style.display = "none";
        alert('Thank you for your feedback!');
    }
});