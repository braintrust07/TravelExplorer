// Sample hotel data
const hotels = [
    {
        id: 1,
        name: "Blue Stay 115",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/588942431.jpg?k=2eae0d32e835c01a228ba612573ee9626ab6ce0193ca5d4e6f98dd003ae933fb&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/588942419.jpg?k=16bdb90b5eb3320b9ad0250e0da09cabd3786b69dac9a3b9c956fc163b8d00ed&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/588942439.jpg?k=8d844b22bcc10f06b2e640bbfed480b8dd1a13cd796eef5760b62a3bf6d64262&o=&hp=1"],
        rating: 4.2,
        price: 4079,
        totalPrice: 4600,
        description: "Luxury hotel with pool and city view"
    },
    {
        id: 2,
        name: "Hotel Brady",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/303483262.jpg?k=822e9b3293d2859126ddad013dcd62b726222e28343eed6446ac9c562361fd18&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/608544325.jpg?k=f492aeebc43005add299ed1504bf0cec6b27f5390321f01bead2d0113d0a7f43&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/182141233.jpg?k=ed110aacd29799ed8fa2aaf6eee88c4ce75d7fba2b7f659f056a8fbad0bbc6c9&o=&hp=1"],
        rating: 4.7,
        price: 4550,
        totalPrice: 5200,
        description: "5-star hotel with executive lounge"
    },
    {
        id: 3,
        name: "Prince Monceau",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/86463833.jpg?k=2e71e8c0c6e021dd31edea9dea8881ecea8fc417a1421d096ea552bf3fc9efd7&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/57595303.jpg?k=51bd94447f98cc63f8d3da2801d5db7ac13723d4a7e38cc7ecf39bf4c67c03bd&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/121105217.jpg?k=0b02b2fa6449321cf2fceeeb6bcfee2ea144564afecd85cf05cd5ace5ea75daf&o=&hp=1"],
        rating: 4.8,
        price: 4600,
        totalPrice: 5800,
        description: "Historic luxury hotel with spa"
    },
    {
        id: 4,
        name: "Midnight Hotel Paris",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/56121629.jpg?k=b36b0119ea31812f52b60e50d60a3caf14d96f70e0650410edd3480fc5da52a3&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/45082641.jpg?k=d4774deb6c1f9d46eec51cade799d64e7cea46c020e9121764167d0347df8f52&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/56117621.jpg?k=4bc305467e207089a7cc0bf8d53fb9f38fa12d220a834ea7f71a6082e6b254d4&o=&hp=1"],
        rating: 4.5,
        price: 6500,
        totalPrice: 7000,
        description: "Modern suites with business center"
    },
    {
        id: 5,
        name: "Hotel Beausejour",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/274203310.jpg?k=0d967f3998443c5e9581c021e7e45bd0cd93d40b0b8e6f210da2663a983668ad&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/273751595.jpg?k=f37969ddbb9c6b1218f9c500a1a3f10aeeb685035ceeabbed95414bcfd7971ef&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/274202032.jpg?k=fe46541219f00408ae6037da2ce993a2e3c3c3d39df4e0e4d83b706e82e741b3&o=&hp=1"],
        rating: 4.9,
        price: 6580,
        totalPrice: 7200,
        description: "Ultra-luxury palace hotel"
    },
    {
        id: 6,
        name: "Le Lampika Hotel",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/600093919.jpg?k=06ba0f03b29ace3bdb56c1fe829a2af24333d5f750c7142fa70f1fa1100fa2c2&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/589797665.jpg?k=44c2acb3d5fda02a01d588b9955b8c8238c5b4045d1bfeb2063f03a25f90021c&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/600093383.jpg?k=543fb98059c177dbc2e88273a9ff8377668f7d64cebbb1d9c63b218c326aa00f&o=&hp=1"],
        rating: 4.6,
        price: 3900,
        totalPrice:4600 ,
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
