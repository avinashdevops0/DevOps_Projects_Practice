const API_BASE_URL = '/api';

let selectedMovie = null;
let selectedShowtime = null;

// DOM Elements
const moviesSection = document.getElementById('moviesSection');
const bookingSection = document.getElementById('bookingSection');
const confirmationSection = document.getElementById('confirmationSection');
const moviesGrid = document.getElementById('moviesGrid');
const bookingForm = document.getElementById('bookingForm');
const bookingTitle = document.getElementById('bookingTitle');
const confirmationDetails = document.getElementById('confirmationDetails');

// Load movies on page load
document.addEventListener('DOMContentLoaded', loadMovies);

async function loadMovies() {
    try {
        const response = await fetch(`${API_BASE_URL}/movies`);
        const movies = await response.json();
        displayMovies(movies);
    } catch (error) {
        console.error('Error loading movies:', error);
        moviesGrid.innerHTML = '<p class="error">Error loading movies. Please try again later.</p>';
    }
}

function displayMovies(movies) {
    moviesGrid.innerHTML = '';
    
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="${movie.poster_url}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <span class="movie-genre">${movie.genre}</span>
                <div class="movie-details">
                    <p><i class="fas fa-clock"></i> ${movie.duration} min</p>
                    <p><i class="fas fa-star"></i> ${movie.rating}</p>
                    <p><i class="fas fa-tag"></i> $${movie.price.toFixed(2)}</p>
                </div>
                <p>${movie.description.substring(0, 100)}...</p>
                <button class="btn-primary" onclick="selectMovie(${movie.id})">
                    Book Now <i class="fas fa-ticket-alt"></i>
                </button>
            </div>
        `;
        moviesGrid.appendChild(movieCard);
    });
}

async function selectMovie(movieId) {
    try {
        // Get movie details
        const movieResponse = await fetch(`${API_BASE_URL}/movies/${movieId}`);
        selectedMovie = await movieResponse.json();
        
        // Get showtimes for this movie
        const showtimesResponse = await fetch(`${API_BASE_URL}/movies/${movieId}/showtimes`);
        const showtimes = await showtimesResponse.json();
        
        showBookingForm(showtimes);
    } catch (error) {
        console.error('Error selecting movie:', error);
        alert('Error loading movie details. Please try again.');
    }
}

function showBookingForm(showtimes) {
    moviesSection.style.display = 'none';
    bookingSection.style.display = 'block';
    
    bookingTitle.textContent = `Book Tickets: ${selectedMovie.title}`;
    
    if (showtimes.length === 0) {
        bookingForm.innerHTML = '<p>No showtimes available for this movie.</p>';
        return;
    }
    
    const showtimesHTML = showtimes.map(showtime => `
        <div class="showtime-option" onclick="selectShowtime(${showtime.id}, this)">
            <div class="showtime-date">${new Date(showtime.show_date).toLocaleDateString()}</div>
            <div class="showtime-time">${showtime.show_time.substring(0, 5)}</div>
            <div class="showtime-theater">${showtime.theater}</div>
            <div class="showtime-seats">${showtime.available_seats} seats left</div>
        </div>
    `).join('');
    
    bookingForm.innerHTML = `
        <div class="form-group">
            <label><i class="fas fa-calendar-alt"></i> Select Showtime</label>
            <div class="showtime-options" id="showtimesContainer">
                ${showtimesHTML}
            </div>
        </div>
        
        <div id="bookingDetails" style="display: none;">
            <div class="form-group">
                <label><i class="fas fa-user"></i> Full Name</label>
                <input type="text" id="customerName" class="form-control" placeholder="Enter your name" required>
            </div>
            
            <div class="form-group">
                <label><i class="fas fa-envelope"></i> Email Address</label>
                <input type="email" id="customerEmail" class="form-control" placeholder="Enter your email" required>
            </div>
            
            <div class="form-group">
                <label><i class="fas fa-chair"></i> Number of Seats</label>
                <select id="seats" class="form-control">
                    ${Array.from({length: 10}, (_, i) => `<option value="${i + 1}">${i + 1} seat${i > 0 ? 's' : ''}</option>`).join('')}
                </select>
            </div>
            
            <div class="form-group">
                <div id="priceSummary"></div>
            </div>
            
            <button class="btn-primary" onclick="submitBooking()" id="submitBtn">
                Confirm Booking <i class="fas fa-check"></i>
            </button>
        </div>
    `;
}

function selectShowtime(showtimeId, element) {
    // Remove selected class from all options
    document.querySelectorAll('.showtime-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    selectedShowtime = showtimeId;
    
    // Show booking details form
    document.getElementById('bookingDetails').style.display = 'block';
    updatePriceSummary();
}

function updatePriceSummary() {
    if (!selectedMovie || !selectedShowtime) return;
    
    const seats = parseInt(document.getElementById('seats').value);
    const totalPrice = selectedMovie.price * seats;
    
    document.getElementById('priceSummary').innerHTML = `
        <div style="background: #f7fafc; padding: 15px; border-radius: 8px;">
            <h4>Price Summary</h4>
            <p>Price per ticket: $${selectedMovie.price.toFixed(2)}</p>
            <p>Number of seats: ${seats}</p>
            <p style="font-weight: bold; color: #667eea; font-size: 1.2rem;">
                Total: $${totalPrice.toFixed(2)}
            </p>
        </div>
    `;
}

async function submitBooking() {
    const customerName = document.getElementById('customerName').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();
    const seats = parseInt(document.getElementById('seats').value);
    
    // Simple validation
    if (!customerName || !customerEmail) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (!selectedShowtime) {
        alert('Please select a showtime.');
        return;
    }
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    try {
        const bookingData = {
            showtime_id: selectedShowtime,
            customer_name: customerName,
            customer_email: customerEmail,
            seats: seats
        };
        
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showConfirmation(result.booking_id);
        } else {
            alert(`Booking failed: ${result.error}`);
        }
    } catch (error) {
        console.error('Booking error:', error);
        alert('An error occurred. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Confirm Booking <i class="fas fa-check"></i>';
    }
}

async function showConfirmation(bookingId) {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`);
        const booking = await response.json();
        
        confirmationDetails.innerHTML = `
            <div class="booking-details">
                <h3>Booking Details</h3>
                <div class="booking-detail">
                    <span>Booking ID:</span>
                    <span>#${booking.id}</span>
                </div>
                <div class="booking-detail">
                    <span>Movie:</span>
                    <span>${booking.title}</span>
                </div>
                <div class="booking-detail">
                    <span>Date:</span>
                    <span>${new Date(booking.show_date).toLocaleDateString()}</span>
                </div>
                <div class="booking-detail">
                    <span>Time:</span>
                    <span>${booking.show_time.substring(0, 5)}</span>
                </div>
                <div class="booking-detail">
                    <span>Theater:</span>
                    <span>${booking.theater}</span>
                </div>
                <div class="booking-detail">
                    <span>Seats:</span>
                    <span>${booking.seats}</span>
                </div>
                <div class="booking-detail">
                    <span>Total Paid:</span>
                    <span style="color: #38a169; font-weight: bold;">$${booking.total_price.toFixed(2)}</span>
                </div>
                <div class="booking-detail">
                    <span>Booked By:</span>
                    <span>${booking.customer_name}</span>
                </div>
            </div>
            <p><i class="fas fa-envelope"></i> A confirmation email has been sent to ${booking.customer_email}</p>
        `;
        
        bookingSection.style.display = 'none';
        confirmationSection.style.display = 'block';
    } catch (error) {
        console.error('Error loading booking details:', error);
    }
}

function showMovies() {
    bookingSection.style.display = 'none';
    confirmationSection.style.display = 'none';
    moviesSection.style.display = 'block';
    
    // Reset selections
    selectedMovie = null;
    selectedShowtime = null;
}

// Initialize event listeners for dynamic elements
document.addEventListener('change', function(e) {
    if (e.target && e.target.id === 'seats') {
        updatePriceSummary();
    }
});