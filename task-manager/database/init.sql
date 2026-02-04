-- Create database
CREATE DATABASE IF NOT EXISTS task_manager;
USE task_manager;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO tasks (title, description, status, priority, due_date) VALUES
('Complete Project Proposal', 'Write and submit the project proposal document', 'completed', 'high', '2024-01-15'),
('Prepare Meeting Slides', 'Create presentation slides for team meeting', 'in-progress', 'medium', '2024-01-20'),
('Update Documentation', 'Update API documentation for new features', 'pending', 'low', NULL),
('Fix Bug #123', 'Resolve the authentication issue on login page', 'pending', 'high', '2024-01-18'),
('Code Review', 'Review pull requests from team members', 'pending', 'medium', '2024-01-22');