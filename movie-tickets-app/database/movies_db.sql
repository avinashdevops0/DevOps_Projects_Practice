-- Create database
CREATE DATABASE IF NOT EXISTS movie_tickets_db;
USE movie_tickets_db;

-- Movies table
CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    duration INT,
    genre VARCHAR(50),
    rating VARCHAR(10),
    poster_url VARCHAR(255),
    price DECIMAL(6,2) NOT NULL
);

-- Showtimes table
CREATE TABLE IF NOT EXISTS showtimes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    show_date DATE NOT NULL,
    show_time TIME NOT NULL,
    theater VARCHAR(50),
    available_seats INT DEFAULT 100,
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    showtime_id INT,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    seats INT NOT NULL,
    total_price DECIMAL(8,2) NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (showtime_id) REFERENCES showtimes(id)
);

-- Insert sample movies
INSERT INTO movies (title, description, duration, genre, rating, poster_url, price) VALUES
('Inception', 'A thief who steals corporate secrets through dream-sharing technology.', 148, 'Sci-Fi', 'PG-13', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', 12.99),
('The Matrix', 'A computer hacker learns about the true nature of his reality.', 136, 'Sci-Fi', 'R', 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', 11.99),
('Jurassic Park', 'Scientists create a wildlife park with cloned dinosaurs.', 127, 'Adventure', 'PG-13', 'https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg', 10.99),
('The Avengers', 'Earth''s mightiest heroes must come together to stop Loki.', 143, 'Action', 'PG-13', 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', 13.99);

-- Insert sample showtimes (for today and tomorrow)
INSERT INTO showtimes (movie_id, show_date, show_time, theater, available_seats) VALUES
(1, CURDATE(), '14:30:00', 'Screen 1', 100),
(1, CURDATE(), '18:00:00', 'Screen 2', 80),
(1, CURDATE(), '21:30:00', 'Screen 1', 60),
(2, CURDATE(), '15:00:00', 'Screen 3', 100),
(2, CURDATE(), '19:00:00', 'Screen 2', 90),
(3, CURDATE(), '16:30:00', 'Screen 3', 100),
(3, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '20:00:00', 'IMAX', 50),
(4, CURDATE(), '17:00:00', 'Screen 4', 100),
(4, CURDATE(), '20:30:00', 'IMAX', 40),
(4, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '19:30:00', 'Screen 1', 100);