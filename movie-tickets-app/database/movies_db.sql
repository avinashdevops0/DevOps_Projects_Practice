-- Create database
CREATE DATABASE IF NOT EXISTS movies_db;
USE movies_db;

-- Movies table
CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    duration INT, -- in minutes
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
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
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
    FOREIGN KEY (showtime_id) REFERENCES showtimes(id) ON DELETE CASCADE
);

-- Insert sample movies
INSERT INTO movies (title, description, duration, genre, rating, poster_url, price) VALUES
('Inception', 'A thief who steals corporate secrets through dream-sharing technology.', 148, 'Sci-Fi', 'PG-13', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', 12.99),
('The Shawshank Redemption', 'Two imprisoned men bond over a number of years.', 142, 'Drama', 'R', 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg', 10.99),
('The Dark Knight', 'Batman faces the Joker, a criminal mastermind.', 152, 'Action', 'PG-13', 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg', 13.99);

-- Insert sample showtimes
INSERT INTO showtimes (movie_id, show_date, show_time, theater, available_seats) VALUES
(1, '2024-12-25', '14:30:00', 'Screen 1', 100),
(1, '2024-12-25', '18:00:00', 'Screen 2', 100),
(2, '2024-12-25', '16:00:00', 'Screen 3', 100),
(3, '2024-12-25', '20:00:00', 'IMAX', 50);