// Sample hotel data
const hotels = [
    {
        id: 1,
        name: "Four Seasons Hotel Sydney",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/227683811.jpg?k=a79499041ee26e48a5e613dc9525c2994058966ad7fe43189348ab85a321e1b1&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/206600180.jpg?k=fcf86a591bbab6acc848b42c9f3918cb29c779d6419600e6600df2632b52fa77&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/227683915.jpg?k=5508ecc9cc17f6f0fae7245dc6377d311cd9d530e054b3cdfbf12f688106279e&o=&hp=1"],
        rating: 4.96,
        price: 5079,
        totalPrice: 5600,
        description: "Luxury hotel with city view"
    },
    {
        id: 2,
        name: "The Grace Hotel ",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/345694689.jpg?k=49c1d332834233e8f86e60c593190591c5273fbca9ee3f719a8b569162918f92&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/345693564.jpg?k=f4ba4513ff04eb371ece547621a9681117ab51837086c1e0bae64639a4abd492&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/345693535.jpg?k=3d114de36a84a4c7edd34e2d93b9bdb0bf02b7a2a8d39fb81458d100061bed27&o=&hp=1"],
        rating: 4.0,
        price: 3999,
        totalPrice: 4544,
        description: "5-star hotel with executive lounge"
    },
    {
        id: 3,
        name: "Hyatt Regency Sydney",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/451957770.jpg?k=eb09294395c185cfac661bfcdc332f3f5b78b8cddce09670a0300c7908c70e5d&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/291582466.jpg?k=c62ebe8d31ff2806cb404fbaa8fc8a8054ba14475db686d223b561744c4c43f4&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/535391556.jpg?k=28ca57bc9c64f16682969a476d0b042e613399e3f82c7abee911af610a9f4af0&o=&hp=1"],
        rating: 4.5,
        price: 6000,
        totalPrice: 6500,
        description: "Historic luxury hotel with spa"
    },
    {
        id: 4,
        name: "View Sydney",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/471356472.jpg?k=a9e1a4fd97aab5824ee93d5ae394e94dc9198d8ae12825574883bc9c9328447e&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/166346260.jpg?k=8a8ab83d119181e79bfa46af7097a15545b8d7ee7d958972b0fee83eaceb7f37&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/410270131.jpg?k=34a75c44e421730dd2240607b4950290b2299872e26f96ccf63c9aa449f46520&o=&hp=1"],
        rating: 4.5,
        price: 8500,
        totalPrice: 9775,
        description: "Modern suites with Pub center"
    },
    {
        id: 5,
        name: "Vibe Hotel Sydney Darling Harbour",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/404691422.jpg?k=e313bae7a3ee7c44537962e0cd1cb61b9c6c2e326118abe189006ce9757e6e93&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/574286658.jpg?k=1504837ed175890f5a5da48d5befe69d0958e81e9e8bd20fd6e2057c4e36cfc8&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/404691350.jpg?k=87184c3b77b48eb3af3a081426515753f503743701d02f1bfc823974aaa000b4&o=&hp=1"],
        rating: 4.9,
        price: 8000,
        totalPrice: 8500,
        description: "Ultra-luxury palace hotel"
    },
    {
        id: 6,
        name: "The Fullerton Hotel Sydney",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/278229303.jpg?k=46c050d7b2b87773216f67a2019d04bb924b3a0523d4190e686a9e652eeb0f48&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/336824927.jpg?k=04a9b2aa1c39515d2ca0b3f7720567affcefe0230c5dd994a756323c17490e16&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/225502866.jpg?k=d48d6af3b3a52136aff236b514df3f8c74311e2b3e2c41b6ecc0773e2101ca8d&o=&hp=1"],
        rating: 4.9,
        price: 9500,
        totalPrice: 10925,
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
