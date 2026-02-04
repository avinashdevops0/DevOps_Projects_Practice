require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// Database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'task_manager',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database');
        connection.release();
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

// Create tasks table if not exists
async function initializeDatabase() {
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
            priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
            due_date DATE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    
    try {
        await pool.execute(createTableSQL);
        console.log('Tasks table initialized');
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
}

// Routes
app.get('/api/tasks', async (req, res) => {
    try {
        const [tasks] = await pool.execute('SELECT * FROM tasks ORDER BY created_at DESC');
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

app.get('/api/tasks/:id', async (req, res) => {
    try {
        const [tasks] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
        if (tasks.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(tasks[0]);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ error: 'Failed to fetch task' });
    }
});

app.post('/api/tasks', async (req, res) => {
    const { title, description, status, priority, due_date } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    
    try {
        const [result] = await pool.execute(
            'INSERT INTO tasks (title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?)',
            [title, description || null, status || 'pending', priority || 'medium', due_date || null]
        );
        
        const [newTask] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
        res.status(201).json(newTask[0]);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

app.put('/api/tasks/:id', async (req, res) => {
    const { title, description, status, priority, due_date } = req.body;
    
    try {
        const [existingTask] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
        if (existingTask.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        await pool.execute(
            'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ? WHERE id = ?',
            [
                title || existingTask[0].title,
                description !== undefined ? description : existingTask[0].description,
                status || existingTask[0].status,
                priority || existingTask[0].priority,
                due_date !== undefined ? due_date : existingTask[0].due_date,
                req.params.id
            ]
        );
        
        const [updatedTask] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
        res.json(updatedTask[0]);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM tasks WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Start server
async function startServer() {
    await testConnection();
    await initializeDatabase();
    
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`API endpoints available at http://localhost:${PORT}/api/tasks`);
    });
}

startServer();