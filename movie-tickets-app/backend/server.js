const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend')); // Serve frontend files

// Routes
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: '../frontend' });
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Movie Tickets API is working!',
        timestamp: new Date().toISOString()
    });
});

// Get all movies
app.get('/api/movies', async (req, res) => {
    try {
        const [movies] = await db.query('SELECT * FROM movies ORDER BY title');
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
});

// Get movie by ID
app.get('/api/movies/:id', async (req, res) => {
    try {
        const [movies] = await db.query('SELECT * FROM movies WHERE id = ?', [req.params.id]);
        if (movies.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movies[0]);
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ error: 'Failed to fetch movie' });
    }
});

// Get showtimes for a movie
app.get('/api/movies/:id/showtimes', async (req, res) => {
    try {
        const [showtimes] = await db.query(
            `SELECT s.*, m.title, m.price 
             FROM showtimes s 
             JOIN movies m ON s.movie_id = m.id 
             WHERE s.movie_id = ? AND s.show_date >= CURDATE()
             ORDER BY s.show_date, s.show_time`,
            [req.params.id]
        );
        res.json(showtimes);
    } catch (error) {
        console.error('Error fetching showtimes:', error);
        res.status(500).json({ error: 'Failed to fetch showtimes' });
    }
});

// Get all showtimes for today
app.get('/api/showtimes/today', async (req, res) => {
    try {
        const [showtimes] = await db.query(
            `SELECT s.*, m.title, m.genre, m.rating, m.poster_url, m.price 
             FROM showtimes s 
             JOIN movies m ON s.movie_id = m.id 
             WHERE s.show_date = CURDATE() 
             ORDER BY s.show_time`
        );
        res.json(showtimes);
    } catch (error) {
        console.error('Error fetching today\'s showtimes:', error);
        res.status(500).json({ error: 'Failed to fetch showtimes' });
    }
});

// Create booking
app.post('/api/bookings', async (req, res) => {
    const { showtime_id, customer_name, customer_email, seats } = req.body;
    
    // Validation
    if (!showtime_id || !customer_name || !customer_email || !seats) {
        return res.status(400).json({ 
            success: false, 
            error: 'All fields are required' 
        });
    }
    
    if (seats < 1 || seats > 10) {
        return res.status(400).json({ 
            success: false, 
            error: 'Number of seats must be between 1 and 10' 
        });
    }
    
    try {
        // Start transaction
        await db.query('START TRANSACTION');
        
        // Get showtime details with lock
        const [showtimes] = await db.query(
            'SELECT * FROM showtimes WHERE id = ? FOR UPDATE',
            [showtime_id]
        );
        
        if (showtimes.length === 0) {
            await db.query('ROLLBACK');
            return res.status(404).json({ 
                success: false, 
                error: 'Showtime not found' 
            });
        }
        
        const showtime = showtimes[0];
        
        // Check available seats
        if (showtime.available_seats < seats) {
            await db.query('ROLLBACK');
            return res.status(400).json({ 
                success: false, 
                error: `Only ${showtime.available_seats} seats available` 
            });
        }
        
        // Get movie price
        const [movies] = await db.query(
            'SELECT price FROM movies WHERE id = ?',
            [showtime.movie_id]
        );
        
        if (movies.length === 0) {
            await db.query('ROLLBACK');
            return res.status(404).json({ 
                success: false, 
                error: 'Movie not found' 
            });
        }
        
        const moviePrice = movies[0].price;
        const total_price = moviePrice * seats;
        
        // Create booking
        const [result] = await db.query(
            'INSERT INTO bookings (showtime_id, customer_name, customer_email, seats, total_price) VALUES (?, ?, ?, ?, ?)',
            [showtime_id, customer_name, customer_email, seats, total_price]
        );
        
        // Update available seats
        await db.query(
            'UPDATE showtimes SET available_seats = available_seats - ? WHERE id = ?',
            [seats, showtime_id]
        );
        
        // Commit transaction
        await db.query('COMMIT');
        
        res.json({
            success: true,
            booking_id: result.insertId,
            total_price: total_price,
            message: 'Booking confirmed successfully!'
        });
        
    } catch (error) {
        await db.query('ROLLBACK');
        console.error('Booking error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to create booking' 
        });
    }
});

// Get booking details
app.get('/api/bookings/:id', async (req, res) => {
    try {
        const [bookings] = await db.query(
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
        console.error('Error fetching booking:', error);
        res.status(500).json({ error: 'Failed to fetch booking' });
    }
});

// Health check
app.get('/api/health', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.json({ 
            status: 'healthy',
            database: 'connected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'unhealthy',
            database: 'disconnected',
            error: error.message 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🎬 Movies API: http://localhost:${PORT}/api/movies`);
    console.log(`🎟️  Frontend: http://localhost:${PORT}`);
});