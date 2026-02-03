const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Get all movies
app.get('/api/movies', async (req, res) => {
    try {
        const [movies] = await db.execute('SELECT * FROM movies');
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get movie by ID
app.get('/api/movies/:id', async (req, res) => {
    try {
        const [movie] = await db.execute(
            'SELECT * FROM movies WHERE id = ?',
            [req.params.id]
        );
        
        if (movie.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        
        res.json(movie[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get showtimes for a movie
app.get('/api/movies/:id/showtimes', async (req, res) => {
    try {
        const [showtimes] = await db.execute(
            `SELECT s.*, m.title, m.price 
             FROM showtimes s 
             JOIN movies m ON s.movie_id = m.id 
             WHERE s.movie_id = ? AND s.show_date >= CURDATE() 
             ORDER BY s.show_date, s.show_time`,
            [req.params.id]
        );
        res.json(showtimes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all showtimes for today
app.get('/api/showtimes/today', async (req, res) => {
    try {
        const [showtimes] = await db.execute(
            `SELECT s.*, m.title, m.genre, m.rating, m.poster_url, m.price 
             FROM showtimes s 
             JOIN movies m ON s.movie_id = m.id 
             WHERE s.show_date = CURDATE() 
             ORDER BY s.show_time`
        );
        res.json(showtimes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create booking
app.post('/api/bookings', async (req, res) => {
    const { showtime_id, customer_name, customer_email, seats } = req.body;
    
    try {
        // Start transaction
        await db.execute('START TRANSACTION');
        
        // Get showtime details
        const [showtimes] = await db.execute(
            'SELECT s.*, m.price FROM showtimes s JOIN movies m ON s.movie_id = m.id WHERE s.id = ? FOR UPDATE',
            [showtime_id]
        );
        
        if (showtimes.length === 0) {
            throw new Error('Showtime not found');
        }
        
        const showtime = showtimes[0];
        
        // Check available seats
        if (showtime.available_seats < seats) {
            throw new Error('Not enough seats available');
        }
        
        // Calculate total price
        const total_price = showtime.price * seats;
        
        // Create booking
        const [result] = await db.execute(
            'INSERT INTO bookings (showtime_id, customer_name, customer_email, seats, total_price) VALUES (?, ?, ?, ?, ?)',
            [showtime_id, customer_name, customer_email, seats, total_price]
        );
        
        // Update available seats
        await db.execute(
            'UPDATE showtimes SET available_seats = available_seats - ? WHERE id = ?',
            [seats, showtime_id]
        );
        
        await db.execute('COMMIT');
        
        res.json({
            success: true,
            booking_id: result.insertId,
            total_price: total_price,
            message: 'Booking successful!'
        });
    } catch (error) {
        await db.execute('ROLLBACK');
        res.status(400).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Get booking details
app.get('/api/bookings/:id', async (req, res) => {
    try {
        const [bookings] = await db.execute(
            `SELECT b.*, m.title, s.show_date, s.show_time, s.theater 
             FROM bookings b 
             JOIN showtimes s ON b.showtime_id = s.id 
             JOIN movies m ON s.movie_id = m.id 
             WHERE b.id = ?`,
            [req.params.id]
        );
        
        if (bookings.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        
        res.json(bookings[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});