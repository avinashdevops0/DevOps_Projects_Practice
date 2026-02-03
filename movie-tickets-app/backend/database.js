const mysql = require('mysql2');
require('dotenv').config();

// Create connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'movie_tickets_db'
});

// Connect to database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        console.log('Trying to create database...');
        createDatabase();
        return;
    }
    console.log('✅ Connected to MySQL database');
});

function createDatabase() {
    const tempConnection = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
    });

    tempConnection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'movie_tickets_db'}`, (err) => {
        if (err) {
            console.error('Error creating database:', err);
            return;
        }
        console.log('Database created or already exists');
        // Reconnect with database selected
        tempConnection.end();
        connection.config.database = process.env.DB_NAME || 'movie_tickets_db';
        connection.connect((err) => {
            if (err) {
                console.error('Error reconnecting:', err);
                return;
            }
            console.log('✅ Connected to database');
            createTables();
        });
    });
}

function createTables() {
    const createMoviesTable = `
        CREATE TABLE IF NOT EXISTS movies (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            description TEXT,
            duration INT,
            genre VARCHAR(50),
            rating VARCHAR(10),
            poster_url VARCHAR(255),
            price DECIMAL(6,2) NOT NULL
        )`;
    
    const createShowtimesTable = `
        CREATE TABLE IF NOT EXISTS showtimes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            movie_id INT,
            show_date DATE NOT NULL,
            show_time TIME NOT NULL,
            theater VARCHAR(50),
            available_seats INT DEFAULT 100,
            FOREIGN KEY (movie_id) REFERENCES movies(id)
        )`;
    
    const createBookingsTable = `
        CREATE TABLE IF NOT EXISTS bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            showtime_id INT,
            customer_name VARCHAR(100) NOT NULL,
            customer_email VARCHAR(100) NOT NULL,
            seats INT NOT NULL,
            total_price DECIMAL(8,2) NOT NULL,
            booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (showtime_id) REFERENCES showtimes(id)
        )`;
    
    connection.query(createMoviesTable, (err) => {
        if (err) console.error('Error creating movies table:', err);
    });
    
    connection.query(createShowtimesTable, (err) => {
        if (err) console.error('Error creating showtimes table:', err);
    });
    
    connection.query(createBookingsTable, (err) => {
        if (err) console.error('Error creating bookings table:', err);
    });
    
    // Insert sample data if tables are empty
    setTimeout(insertSampleData, 1000);
}

function insertSampleData() {
    // Check if movies table is empty
    connection.query('SELECT COUNT(*) as count FROM movies', (err, results) => {
        if (err || results[0].count > 0) return;
        
        console.log('Inserting sample data...');
        
        const sampleMovies = [
            ['Inception', 'A thief who steals corporate secrets through dream-sharing technology.', 148, 'Sci-Fi', 'PG-13', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', 12.99],
            ['The Matrix', 'A computer hacker learns about the true nature of his reality.', 136, 'Sci-Fi', 'R', 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', 11.99],
            ['Jurassic Park', 'Scientists create a wildlife park with cloned dinosaurs.', 127, 'Adventure', 'PG-13', 'https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg', 10.99],
            ['The Avengers', 'Earth\'s mightiest heroes must come together to stop Loki.', 143, 'Action', 'PG-13', 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', 13.99]
        ];
        
        connection.query('INSERT INTO movies (title, description, duration, genre, rating, poster_url, price) VALUES ?', [sampleMovies], (err) => {
            if (err) console.error('Error inserting movies:', err);
            
            // Insert showtimes
            const today = new Date().toISOString().split('T')[0];
            const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
            
            const sampleShowtimes = [
                [1, today, '14:30:00', 'Screen 1', 100],
                [1, today, '18:00:00', 'Screen 2', 80],
                [1, today, '21:30:00', 'Screen 1', 60],
                [2, today, '15:00:00', 'Screen 3', 100],
                [2, today, '19:00:00', 'Screen 2', 90],
                [3, today, '16:30:00', 'Screen 3', 100],
                [3, tomorrow, '20:00:00', 'IMAX', 50],
                [4, today, '17:00:00', 'Screen 4', 100],
                [4, today, '20:30:00', 'IMAX', 40],
                [4, tomorrow, '19:30:00', 'Screen 1', 100]
            ];
            
            connection.query('INSERT INTO showtimes (movie_id, show_date, show_time, theater, available_seats) VALUES ?', [sampleShowtimes], (err) => {
                if (err) console.error('Error inserting showtimes:', err);
                console.log('✅ Sample data inserted successfully');
            });
        });
    });
}

// Export connection with promise support
const promiseConnection = connection.promise();
module.exports = promiseConnection;