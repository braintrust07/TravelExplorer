// Sample hotel data
const hotels = [
    {
        id: 1,
        name: "The Laylow, Autograph Collection",
        images: ["https://images.trvl-media.com/lodging/17000000/16820000/16819700/16819625/7de91457.jpg?impolicy=resizecrop&rw=1200&ra=fit", "https://images.trvl-media.com/lodging/17000000/16820000/16819700/16819625/0aeba32f.jpg?impolicy=resizecrop&rw=1200&ra=fit", "https://images.trvl-media.com/lodging/17000000/16820000/16819700/16819625/c1325b27.jpg?impolicy=resizecrop&rw=1200&ra=fit"],
        rating: 4.2,
        price: 4079,
        totalPrice: 4600,
        description: "Luxury hotel with pool and city view"
    },
    {
        id: 2,
        name: "Outrigger Waikiki Beachcomber Hotel",
        images: ["https://images.trvl-media.com/lodging/22000000/21130000/21123600/21123568/85f7d28f.jpg?impolicy=resizecrop&rw=1200&ra=fit", "https://images.trvl-media.com/lodging/22000000/21130000/21123600/21123568/cd26031d.jpg?impolicy=resizecrop&rw=1200&ra=fit", "https://images.trvl-media.com/lodging/22000000/21130000/21123600/21123568/e5dbbb4a.jpg?impolicy=resizecrop&rw=1200&ra=fit"],
        rating: 4.7,
        price: 12325,
        totalPrice: 14544,
        description: "5-star hotel with executive lounge"
    },
    {
        id: 3,
        name: "Hyatt Regency Waikiki Beach Resort & Spa",
        images: ["https://images.trvl-media.com/lodging/1000000/20000/20000/19988/102be0c0.jpg?impolicy=resizecrop&rw=1200&ra=fit", "https://images.trvl-media.com/lodging/1000000/20000/20000/19988/c5a0b914.jpg?impolicy=resizecrop&rw=1200&ra=fit", "https://images.trvl-media.com/lodging/1000000/20000/20000/19988/w3837h2557x3y3-6963d498.jpg?impolicy=resizecrop&rw=1200&ra=fit"],
        rating: 4.8,
        price: 15000,
        totalPrice: 17250,
        description: "Historic luxury hotel with spa"
    },
    {
        id: 4,
        name: "Ramada Plaza by Wyndham Waikiki",
        images: ["https://images.trvl-media.com/lodging/1000000/10000/1800/1755/d89d9c86.jpg?impolicy=resizecrop&rw=1200&ra=fit", "https://images.trvl-media.com/lodging/1000000/10000/1800/1755/9e05968c.jpg?impolicy=resizecrop&rw=1200&ra=fit", "https://images.trvl-media.com/lodging/1000000/10000/1800/1755/9f516d8b.jpg?impolicy=resizecrop&rw=1200&ra=fit"],
        rating: 4.5,
        price: 12965,
        totalPrice: 13595,
        description: "Modern suites with business center"
    },
    {
        id: 5,
        name: "Sheraton Waikiki Beach Resort",
        images: ["https://images.trvl-media.com/lodging/1000000/10000/7400/7385/9859e5c7.jpg?impolicy=resizecrop&rw=1200&ra=fit", "https://images.trvl-media.com/lodging/1000000/10000/7400/7385/f0832aaf.jpg?impolicy=resizecrop&rw=1200&ra=fit", "https://images.trvl-media.com/lodging/1000000/10000/7400/7385/w4000h2663x0y0-916d26f9.jpg?impolicy=resizecrop&rw=1200&ra=fit"],
        rating: 4.8,
        price: 12500,
        totalPrice: 13095,
        description: "Ultra-luxury palace hotel"
    },
    {
        id: 6,
        name: "Alohilani Resort Waikiki Beach",
        images: ["https://images.trvl-media.com/lodging/1000000/30000/21800/21781/02fb38ac.jpg?impolicy=resizecrop&rw=1200&ra=fit", "https://images.trvl-media.com/lodging/1000000/30000/21800/21781/0cfa0e2a.jpg?impolicy=resizecrop&rw=1200&ra=fit", "https://images.trvl-media.com/lodging/1000000/30000/21800/21781/a579a06e.jpg?impolicy=resizecrop&rw=1200&ra=fit"],
        rating: 4.9,
        price: 18000,
        totalPrice: 20700,
        description: "Contemporary hotel with rooftop dining"
    }
];

// Available coupons
const coupons = {
    'SAVE20': 20,
    'HOLIDAY30': 30
};

// State management
let wishlist = [];
let bookings = [];
let currentSlides = {};
let currentBookingDetails = {
    hotelId: null,
    days: 0,
    basePrice: 0,
    discount: 0
};

// Initialize the page
function initializePage() {
    renderHotels();
    updateWishlistUI();
    updateBookingsUI();
}

// Render hotel cards
function renderHotels() {
    const container = document.getElementById('hotels-container');
    container.innerHTML = hotels.map(hotel => `
        <div class="hotel-card" data-hotel-id="${hotel.id}">
            <div class="slider-container">
                <img src="${hotel.images[0]}" class="slider-image" id="image-${hotel.id}">
                <div class="slider-buttons">
                    <button onclick="changeSlide(${hotel.id}, -1)" class="slider-button">&lt;</button>
                    <button onclick="changeSlide(${hotel.id}, 1)" class="slider-button">&gt;</button>
                </div>
                <button onclick="toggleWishlist(${hotel.id})" class="wishlist-button">
                    <i class="fas fa-heart ${wishlist.includes(hotel.id) ? 'active' : ''}"></i>
                </button>
            </div>
            <div class="hotel-info">
                <h3 class="hotel-name">${hotel.name}</h3>
                <div class="hotel-rating">
                    ${generateStars(hotel.rating)}
                    <span>(${hotel.rating})</span>
                </div>
                <p class="hotel-description">${hotel.description}</p>
                <p class="hotel-price">
                    ₹${hotel.price}
                    <small>₹${hotel.totalPrice} total includes taxes & fees</small>
                </p>
                <button onclick="openBookingModal(${hotel.id})" class="book-now">Book Now</button>
            </div>
        </div>
    `).join('');
}

// Image slider functionality
function changeSlide(hotelId, direction) {
    const hotel = hotels.find(h => h.id === hotelId);
    if (!currentSlides[hotelId]) currentSlides[hotelId] = 0;
    
    currentSlides[hotelId] = (currentSlides[hotelId] + direction + hotel.images.length) % hotel.images.length;
    document.getElementById(`image-${hotelId}`).src = hotel.images[currentSlides[hotelId]];
}

// Wishlist functionality
function toggleWishlist(hotelId) {
    const index = wishlist.indexOf(hotelId);
    if (index === -1) {
        wishlist.push(hotelId);
    } else {
        wishlist.splice(index, 1);
    }
    updateWishlistUI();
    
    const heartIcon = document.querySelector(`[data-hotel-id="${hotelId}"] .fa-heart`);
    if (heartIcon) {
        heartIcon.classList.toggle('active');
    }
}

// Update wishlist UI
function updateWishlistUI() {
    const container = document.getElementById('wishlist-items');
    if (!container) return;
    
    if (wishlist.length === 0) {
        container.innerHTML = '<div class="wishlist-item">No items in wishlist</div>';
        return;
    }
    
    container.innerHTML = wishlist.map(id => {
        const hotel = hotels.find(h => h.id === id);
        return `
            <div class="wishlist-item" onclick="scrollToHotel(${id})">
                ${hotel.name}
                <button onclick="event.stopPropagation(); toggleWishlist(${id})">Remove</button>
            </div>
        `;
    }).join('');
}

// Update bookings UI
function updateBookingsUI() {
    const container = document.getElementById('booking-items');
    if (!container) return;
    
    if (!bookings || bookings.length === 0) {
        container.innerHTML = '<div class="booking-item">No bookings yet</div>';
        return;
    }
    
    container.innerHTML = bookings.map(booking => {
        const hotel = hotels.find(h => h.id === booking.hotelId);
        if (!hotel) return '';
        
        return `
            <div class="booking-item">
                <strong>${hotel.name}</strong><br>
                ${booking.days} days<br>
                Amount: ₹${booking.amount}<br>
                ${booking.discount > 0 ? `Discount: ${booking.discount}%<br>` : ''}
                Booked on: ${booking.date}
            </div>
        `;
    }).join('');
}

// Booking functionality
function openBookingModal(hotelId) {
    const modal = document.getElementById('booking-modal');
    const hotel = hotels.find(h => h.id === hotelId);
    
    currentBookingDetails = {
        hotelId: hotelId,
        days: 0,
        basePrice: hotel.price,
        discount: 0
    };
    
    document.getElementById('price-per-day').textContent = hotel.price;
    document.getElementById('days').value = '';
    document.getElementById('coupon-code').value = '';
    document.getElementById('discount').textContent = '0';
    document.getElementById('total-amount').textContent = '0';
    document.getElementById('subtotal').textContent = '0';
    document.getElementById('total-days').textContent = '0';
    
    modal.style.display = 'block';
}

function updatePriceCalculation() {
    const days = parseInt(document.getElementById('days').value) || 0;
    const basePrice = currentBookingDetails.basePrice;
    
    currentBookingDetails.days = days;
    const subtotal = basePrice * days;
    
    document.getElementById('total-days').textContent = days;
    document.getElementById('subtotal').textContent = subtotal;
    
    const discountAmount = (subtotal * currentBookingDetails.discount) / 100;
    document.getElementById('discount').textContent = discountAmount.toFixed(2);
    document.getElementById('total-amount').textContent = (subtotal - discountAmount).toFixed(2);
}

function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.toUpperCase();
    if (coupons.hasOwnProperty(couponCode)) {
        currentBookingDetails.discount = coupons[couponCode];
        updatePriceCalculation();
        alert(`Coupon applied successfully! You got ${coupons[couponCode]}% discount.`);
    } else {
        alert('Invalid coupon code!');
    }
}

// Utility functions
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    return stars;
}

function scrollToHotel(hotelId) {
    const hotelCard = document.querySelector(`[data-hotel-id="${hotelId}"]`);
    if (hotelCard) {
        hotelCard.scrollIntoView({ behavior: 'smooth' });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    
    const daysInput = document.getElementById('days');
    if (daysInput) {
        daysInput.addEventListener('input', updatePriceCalculation);
    }
    
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const totalAmount = parseFloat(document.getElementById('total-amount').textContent);
            
            if (totalAmount <= 0) {
                alert('Please enter number of days first!');
                return;
            }
            
            if (confirm(`Proceed to pay ₹${totalAmount}?`)) {
                const newBooking = {
                    hotelId: currentBookingDetails.hotelId,
                    days: currentBookingDetails.days,
                    amount: totalAmount,
                    discount: currentBookingDetails.discount,
                    date: new Date().toLocaleDateString('en-IN')
                };
                
                bookings.push(newBooking);
                updateBookingsUI();
                
                document.getElementById('booking-modal').style.display = 'none';
                alert('Congratulations! Hotel booked successfully!');
            }
        });
    }
    
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            document.getElementById('booking-modal').style.display = 'none';
        });
    }
    
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('booking-modal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
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
