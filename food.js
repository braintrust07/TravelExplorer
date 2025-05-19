document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const slideCount = slides.length;

    // Initialize slider position
    updateSliderPosition();

    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSliderPosition();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSliderPosition();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
    });

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Feedback Modal Functionality
    const modal = document.getElementById('feedbackModal');
    const btn = document.getElementById('feedbackBtn');
    const span = document.getElementsByClassName('close')[0];
    const form = document.getElementById('feedbackForm');

    // Open modal when feedback button is clicked
    btn.onclick = () => {
        modal.style.display = "block";
    }

    // Close modal when X is clicked
    span.onclick = () => {
        modal.style.display = "none";
    }

    // Close modal when clicking outside
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Handle form submission
    form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const feedback = document.getElementById('feedback').value;

        // Here you can add code to handle the form submission
        console.log('Feedback submitted:', { name, email, feedback });

        // Clear form and close modal
        form.reset();
        modal.style.display = "none";
        alert('Thank you for your feedback!');
    }
});