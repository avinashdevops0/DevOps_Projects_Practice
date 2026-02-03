// Configuration
const API_BASE_URL = '/api';
let selectedMovie = null;
let selectedShowtime = null;

// DOM Elements
const moviesSection = document.getElementById('moviesSection');
const bookingSection = document.getElementById('bookingSection');
const confirmationSection = document.getElementById('confirmationSection');
const loadingScreen = document.getElementById('loadingScreen');
const moviesGrid = document.getElementById('moviesGrid');
const bookingForm = document.getElementById('bookingForm');
const bookingTitle = document.getElementById('bookingTitle');
const confirmationDetails = document.getElementById('confirmationDetails');
const movieDetailCard = document.getElementById('movieDetailCard');
const statusIndicator = document.getElementById('statusIndicator');

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    checkBackendConnection();
    loadMovies();
});

// Check backend connection
async function checkBackendConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        
        if (data.status === 'healthy') {
            statusIndicator.innerHTML = '<i class="fas fa-circle"></i> <span>Connected</span>';
            statusIndicator.classList.add('connected');
        } else {
            statusIndicator.innerHTML = '<i class="fas fa-circle"></i> <span>Backend Issue</span>';
        }
    } catch (error) {
        statusIndicator.innerHTML = '<i class="fas fa-circle"></i> <span>Disconnected</span>';
        console.error('Backend connection failed:', error);
    }
}

// Load all movies
async function loadMovies() {
    try {
        loadingScreen.style.display = 'flex';
        moviesSection.style.display = 'none';
        
        const response = await fetch(`${API_BASE_URL}/movies`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const movies = await response.json();
        displayMovies(movies);
        
        loadingScreen.style.display = 'none';
        moviesSection.style.display = 'block';
    } catch (error) {
        console.error('Error loading movies:', error);
        loadingScreen.innerHTML = `
            <div style="text-align: center; color: white;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <h3>Failed to Load Movies</h3>
                <p>${error.message}</p>
                <button class="btn-primary" onclick="loadMovies()" style="margin-top: 20px;">
                    <i class="fas fa-redo"></i> Try Again
                </button>
            </div>
        `;
    }
}

// Display movies in grid
function displayMovies(movies) {
    moviesGrid.innerHTML = '';
    
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="${movie.poster_url}" alt="${movie.title}" class="movie-poster" 
                 onerror="this.src='https://via.placeholder.com/300x450?text=No+Image'">
            <div class="movie-info">
                <div class="movie-title">
                    <span>${movie.title}</span>
                    <span class="movie-price">$${movie.price.toFixed(2)}</span>
                </div>
                <div class="movie-genre">${movie.genre}</div>
                <div class="movie-details">
                    <p><i class="fas fa-clock"></i> ${movie.duration} min</p>
                    <p><i class="fas fa-star"></i> ${movie.rating}</p>
                    <p><i class="fas fa-video"></i> Available Now</p>
                </div>
                <p class="movie-description">${movie.description.substring(0, 100)}...</p>
                <button class="btn-primary" onclick="startBooking(${movie.id})">
                    <i class="fas fa-ticket-alt"></i> Book Tickets
                </button>
            </div>
        `;
        moviesGrid.appendChild(movieCard);
    });
}

// Start booking process
async function startBooking(movieId) {
    try {
        // Get movie details
        const movieResponse = await fetch(`${API_BASE_URL}/movies/${movieId}`);
        selectedMovie = await movieResponse.json();
        
        // Get showtimes
        const showtimesResponse = await fetch(`${API_BASE_URL}/movies/${movieId}/showtimes`);
        const showtimes = await showtimesResponse.json();
        
        showBookingInterface(showtimes);
    } catch (error) {
        console.error('Error starting booking:', error);
        alert('Failed to load movie details. Please try again.');
    }
}

// Show booking interface
function showBookingInterface(showtimes) {
    moviesSection.style.display = 'none';
    bookingSection.style.display = 'block';
    
    // Update booking title
    bookingTitle.textContent = `Book: ${selectedMovie.title}`;
    
    // Display movie details
    movieDetailCard.innerHTML = `
        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
            <img src="${selectedMovie.poster_url}" alt="${selectedMovie.title}" 
                 style="width: 100px; height: 150px; object-fit: cover; border-radius: 8px;"
                 onerror="this.src='https://via.placeholder.com/100x150?text=No+Image'">
            <div>
                <h3 style="margin-bottom: 10px; color: #2d3748;">${selectedMovie.title}</h3>
                <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                    <span style="background: #e9d8fd; color: #6b46c1; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem;">
                        ${selectedMovie.genre}
                    </span>
                    <span style="background: #fed7d7; color: #c53030; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem;">
                        ${selectedMovie.rating}
                    </span>
                </div>
                <p style="color: #718096; font-size: 0.9rem; margin-bottom: 10px;">
                    <i class="fas fa-clock"></i> ${selectedMovie.duration} min
                </p>
                <p style="color: #2d3748; font-weight: 600; font-size: 1.2rem;">
                    $${selectedMovie.price.toFixed(2)} per ticket
                </p>
            </div>
        </div>
        <p style="color: #4a5568; line-height: 1.6;">${selectedMovie.description}</p>
    `;
    
    // Display showtime selection form
    displayShowtimeSelection(showtimes);
}

// Display showtime selection
function displayShowtimeSelection(showtimes) {
    if (showtimes.length === 0) {
        bookingForm.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <i class="fas fa-calendar-times" style="font-size: 3rem; color: #cbd5e0; margin-bottom: 20px;"></i>
                <h3 style="color: #4a5568; margin-bottom: 10px;">No Showtimes Available</h3>
                <p style="color: #718096;">Check back later for new showtimes.</p>
            </div>
        `;
        return;
    }
    
    // Group showtimes by date
    const groupedShowtimes = {};
    showtimes.forEach(showtime => {
        const date = new Date(showtime.show_date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
        
        if (!groupedShowtimes[date]) {
            groupedShowtimes[date] = [];
        }
        groupedShowtimes[date].push(showtime);
    });
    
    let showtimesHTML = '';
    for (const [date, dateShowtimes] of Object.entries(groupedShowtimes)) {
        showtimesHTML += `
            <div style="margin-bottom: 25px;">
                <h3 style="color: #2d3748; margin-bottom: 15px; font-size: 1.1rem;">
                    <i class="fas fa-calendar-day"></i> ${date}
                </h3>
                <div class="showtime-options">
                    ${dateShowtimes.map(showtime => `
                        <div class="showtime-option" onclick="selectShowtime(${showtime.id}, ${showtime.available_seats}, ${showtime.price}, this)">
                            <div class="showtime-time">${showtime.show_time.substring(0, 5)}</div>
                            <div class="showtime-theater">${showtime.theater}</div>
                            <div class="showtime-seats">${showtime.available_seats} seats</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    bookingForm.innerHTML = `
        <div id="step1Content">
            <div class="form-group">
                <label><i class="fas fa-calendar-alt"></i> Select Showtime</label>
                ${showtimesHTML}
            </div>
        </div>
        
        <div id="step2Content" style="display: none;">
            <div class="form-group">
                <label><i class="fas fa-user"></i> Full Name</label>
                <input type="text" id="customerName" class="form-control" placeholder="Enter your full name" required>
            </div>
            
            <div class="form-group">
                <label><i class="fas fa-envelope"></i> Email Address</label>
                <input type="email" id="customerEmail" class="form-control" placeholder="Enter your email" required>
            </div>
            
            <div class="form-group">
                <label><i class="fas fa-chair"></i> Number of Seats</label>
                <select id="seats" class="form-control" onchange="updatePriceSummary()">
                    ${Array.from({length: 10}, (_, i) => 
                        `<option value="${i + 1}">${i + 1} seat${i > 0 ? 's' : ''}</option>`
                    ).join('')}
                </select>
            </div>
            
            <div id="priceSummary" class="form-group"></div>
            
            <button class="btn-primary" onclick="submitBooking()" id="submitBtn">
                <i class="fas fa-lock"></i> Confirm Booking
            </button>
        </div>
        
        <div id="step3Content" style="display: none;"></div>
    `;
    
    // Update step indicators
    updateStepIndicator(1);
}

// Select showtime
function selectShowtime(showtimeId, availableSeats, price, element) {
    // Remove selected class from all options
    document.querySelectorAll('.showtime-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    selectedShowtime = {
        id: showtimeId,
        availableSeats: availableSeats,
        price: price
    };
    
    // Show step 2
    document.getElementById('step1Content').style.display = 'none';
    document.getElementById('step2Content').style.display = 'block';
    updateStepIndicator(2);
    updatePriceSummary();
}

// Update price summary
function updatePriceSummary() {
    if (!selectedMovie || !selectedShowtime) return;
    
    const seats = parseInt(document.getElementById('seats').value);
    const totalPrice = selectedMovie.price * seats;
    
    document.getElementById('priceSummary').innerHTML = `
        <div style="background: #f7fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
            <h4 style="margin-bottom: 10px; color: #2d3748;">Price Summary</h4>
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span>Price per ticket:</span>
                <span>$${selectedMovie.price.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span>Number of seats:</span>
                <span>${seats}</span>
            </div>
            <hr style="margin: 10px 0; border: none; border-top: 1px solid #e2e8f0;">
            <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 1.1rem; color: #667eea;">
                <span>Total Amount:</span>
                <span>$${totalPrice.toFixed(2)}</span>
            </div>
        </div>
    `;
}

// Submit booking
async function submitBooking() {
    const customerName = document.getElementById('customerName').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();
    const seats = parseInt(document.getElementById('seats').value);
    
    // Validation
    if (!customerName || !customerEmail) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (!selectedShowtime) {
        alert('Please select a showtime.');
        return;
    }
    
    if (seats < 1 || seats > selectedShowtime.availableSeats) {
        alert(`Please select between 1 and ${selectedShowtime.availableSeats} seats.`);
        return;
    }
    
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    try {
        const bookingData = {
            showtime_id: selectedShowtime.id,
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
            showConfirmation(result.booking_id, customerName, customerEmail, seats, result.total_price);
        } else {
            alert(`Booking failed: ${result.error}`);
        }
    } catch (error) {
        console.error('Booking error:', error);
        alert('An error occurred. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Show confirmation
async function showConfirmation(bookingId, customerName, customerEmail, seats, totalPrice) {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`);
        const booking = await response.json();
        
        // Update step indicator
        updateStepIndicator(3);
        
        // Show confirmation details
        confirmationDetails.innerHTML = `
            <div class="detail-row">
                <span class="detail-label">Booking ID:</span>
                <span class="detail-value">#${booking.id}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Movie:</span>
                <span class="detail-value">${booking.title}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date & Time:</span>
                <span class="detail-value">
                    ${new Date(booking.show_date).toLocaleDateString()} at ${booking.show_time.substring(0, 5)}
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Theater:</span>
                <span class="detail-value">${booking.theater}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Seats:</span>
                <span class="detail-value">${seats}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Total Amount:</span>
                <span class="detail-value" style="color: #48bb78; font-weight: bold;">
                    $${totalPrice.toFixed(2)}
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Booked By:</span>
                <span class="detail-value">${customerName}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${customerEmail}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Booking Date:</span>
                <span class="detail-value">
                    ${new Date(booking.booking_date).toLocaleString()}
                </span>
            </div>
        `;
        
        // Switch to confirmation section
        bookingSection.style.display = 'none';
        confirmationSection.style.display = 'block';
        
    } catch (error) {
        console.error('Error loading booking details:', error);
        // Still show basic confirmation
        goToConfirmationSection({
            id: bookingId,
            total_price: totalPrice
        });
    }
}

// Update step indicator
function updateStepIndicator(stepNumber) {
    // Reset all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Activate steps up to current step
    for (let i = 1; i <= stepNumber; i++) {
        const stepElement = document.getElementById(`step${i}`);
        if (stepElement) {
            stepElement.classList.add('active');
        }
    }
}

// Go back to movies
function goBackToMovies() {
    bookingSection.style.display = 'none';
    confirmationSection.style.display = 'none';
    moviesSection.style.display = 'block';
    
    // Reset selections
    selectedMovie = null;
    selectedShowtime = null;
}

// Print confirmation
function printConfirmation() {
    window.print();
}

// Initialize price summary when seats change
document.addEventListener('change', function(e) {
    if (e.target && e.target.id === 'seats') {
        updatePriceSummary();
    }
});