document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.scroll-container');
    const wrapper = document.querySelector('.places-wrapper');
    const cards = document.querySelectorAll('.place-card');
    
    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let rafId = null;

    function smoothScroll() {
        if (!isDown && Math.abs(velocity) > 0.1) {
            container.scrollLeft += velocity;
            velocity *= 0.95;
            rafId = requestAnimationFrame(smoothScroll);
        }
    }

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        cancelAnimationFrame(rafId);
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
        requestAnimationFrame(smoothScroll);
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        const prevScroll = container.scrollLeft;
        container.scrollLeft = scrollLeft - walk;
        velocity = container.scrollLeft - prevScroll;
    });

    const updateCardsStyle = (e) => {
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(containerCenter - cardCenter);
            const maxDistance = containerRect.width / 2;
            
            const scale = Math.max(0.8, 1 - (distance / maxDistance) * 0.2);
            const opacity = Math.max(0.6, 1 - (distance / maxDistance) * 0.4);
            
            card.style.transform = `scale(${scale})`;
            card.style.opacity = opacity;
        });
    };

    container.addEventListener('scroll', updateCardsStyle);
    window.addEventListener('resize', updateCardsStyle);
    
    // Initial style update
    updateCardsStyle();

    // Map links functionality
    document.querySelectorAll('.map-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const location = e.target.closest('.place-card').querySelector('h3').textContent;
            window.open(`https://www.google.com/maps/search/${encodeURIComponent(location)}`, '_blank');
        });
    });

    // Hover effect enhancement
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cards.forEach(c => {
                if (c !== card) {
                    c.style.transform = 'scale(0.95)';
                    c.style.opacity = '0.7';
                }
            });
            card.style.transform = 'scale(1.05)';
            card.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                c.style.transform = '';
                c.style.opacity = '';
            });
            updateCardsStyle();
        });
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