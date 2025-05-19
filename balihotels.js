// Sample hotel data
const hotels = [
    {
        id: 1,
        name: "Amandaya Canggu",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/457344988.jpg?k=93b615873c47d6fe6cf69189fb0bdbf3a663356a726adaed50db367fce0435fb&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/481646118.jpg?k=cebc780a10b0f8da71cbdc28352762919fd5209c2983b9151cc9a21fbfb5ece6&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/481645878.jpg?k=0cb907f9840aadb0bf2863b40e7be515100d7b80c45c327886f78ae8afe4df49&o=&hp=1"],
        rating: 4.2,
        price: 5600,
        totalPrice: 4209,
        description: "Luxury hotel with pool and city view"
    },
    {
        id: 2,
        name: "Onaya Bali Resort - Adults Only",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/516491700.jpg?k=6ff2ffff59e065486df78ddb3d38840ef3799bd2118e9aae9c203a1482c62694&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/541757860.jpg?k=61a07bca50bc60b90706fb4d3cdf10e772c449c185a73bdfc104c21e4754e660&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/397021949.jpg?k=ef95ade82b9db389532464c9488a259ee4ee99b6ff104f1b2d7143d7b83c494f&o=&hp=1"],
        rating: 4.9,
        price: 7900,
        totalPrice: 8450,
        description: "5-star hotel with executive lounge"
    },
    {
        id: 3,
        name: "Neano Escape",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/351021506.jpg?k=c1c0805e4d12e033b27d1f140e6481c60a0b849785a6689f71c73cd076d7483a&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/655004500.jpg?k=6ce706314b3fe327e8015fad8ae42be9649b1ee881f909004a04605da5a7329d&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/351021392.jpg?k=af4fdaf7564b573bd362a8a2a659af7c3765faf765020326e60b7982cf9b7c1a&o=&hp=1"],
        rating: 4.8,
        price: 6540,
        totalPrice: 6950,
        description: "Historic luxury hotel "
    },
    {
        id: 4,
        name: "Renaissance Bali Nusa Dua ",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/468241734.jpg?k=c551b08142bb1357792c5e7fb258c26cd5981d514b31b7d5c5f908de3d3f6625&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/603379119.jpg?k=28988c9cedfd0e75b9240b656e879e68c4bba41aa7f9bf5c56ada643c2bb5373&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/604771714.jpg?k=64588c6f4a967ddc09aab6c02d43abc1f25763ad4b209a24603c6b939e6a88bf&o=&hp=1"],
        rating: 4.9,
        price: 8500,
        totalPrice: 9775,
        description: "Modern suites with business center"
    },
    {
        id: 5,
        name: "Ecozy Dijiwa Canggu",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/484169241.jpg?k=828be17b18d189437ba7c55b3a79156454431dcd44c4812beeaa6a22c0f27a60&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/405911311.jpg?k=dffb78423814efec09d362c5c158641e419a8febe5e56bb962c57a7d215304d0&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/350034366.jpg?k=fced5afd377bb63e3a62a9e3b9b60b1b09274438b3954f879d3c3e060910307f&o=&hp=1"],
        rating: 4.6,
        price: 7500,
        totalPrice: 8500,
        description: "Ultra-luxury palace hotel"
    },
    {
        id: 6,
        name: "Terra Cottages Bali",
        images: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/374184348.jpg?k=54d04b6a215a75e57719ae36ff54971741160a92180737d8e8ed3a3f892f31c1&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/374446298.jpg?k=194e26139856efbdfac5c1314109a7d654b111c47195573669acae2e19e8a1f5&o=&hp=1", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/373425119.jpg?k=4b6f5cc1d99946f79768edb04a7f94d95c996beb7a51e2065735e2d35cf55d6d&o=&hp=1"],
        rating: 4.95,
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
