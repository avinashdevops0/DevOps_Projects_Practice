const API_URL = '/api/tasks';
let currentTaskId = null;
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('taskForm').addEventListener('submit', handleTaskSubmit);
    document.getElementById('cancelEdit').addEventListener('click', cancelEdit);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            loadTasks();
        });
    });
}

async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        displayTasks(tasks);
        updateStats(tasks);
    } catch (error) {
        console.error('Error loading tasks:', error);
        showNotification('Failed to load tasks', 'error');
    }
}

function displayTasks(tasks) {
    const container = document.getElementById('taskContainer');
    
    if (tasks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-tasks"></i>
                <h3>No tasks found</h3>
                <p>Add your first task to get started!</p>
            </div>
        `;
        return;
    }

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'all') return true;
        return task.status === currentFilter;
    });

    if (filteredTasks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-filter"></i>
                <h3>No tasks match this filter</h3>
                <p>Try changing your filter criteria</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredTasks.map(task => `
        <div class="task-card ${task.status} ${task.priority}" data-id="${task.id}">
            <div class="task-content">
                <h3 class="task-title">
                    ${task.title}
                    ${task.status === 'completed' ? '<i class="fas fa-check-circle" style="color:#10b981"></i>' : ''}
                </h3>
                <p class="task-description">${task.description || 'No description'}</p>
                <div class="task-meta">
                    <span><i class="fas fa-flag"></i> ${task.priority}</span>
                    <span><i class="fas fa-hourglass-half"></i> ${task.status}</span>
                    ${task.due_date ? `<span><i class="fas fa-calendar"></i> ${formatDate(task.due_date)}</span>` : ''}
                    <span><i class="fas fa-clock"></i> ${formatDate(task.created_at)}</span>
                </div>
            </div>
            <div class="task-actions">
                ${task.status !== 'completed' ? `
                    <button class="action-btn complete-btn" onclick="markAsComplete(${task.id})" title="Mark as Complete">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editTask(${task.id})" title="Edit Task">
                        <i class="fas fa-edit"></i>
                    </button>
                ` : ''}
                <button class="action-btn delete-btn" onclick="deleteTask(${task.id})" title="Delete Task">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function updateStats(tasks) {
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(task => task.status === 'pending').length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;

    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('pendingTasks').textContent = pendingTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
}

async function handleTaskSubmit(e) {
    e.preventDefault();
    
    const taskData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value,
        due_date: document.getElementById('due_date').value || null,
        priority: document.getElementById('priority').value
    };

    try {
        if (currentTaskId) {
            await fetch(`${API_URL}/${currentTaskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
            showNotification('Task updated successfully!', 'success');
        } else {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
            showNotification('Task added successfully!', 'success');
        }

        resetForm();
        loadTasks();
    } catch (error) {
        console.error('Error saving task:', error);
        showNotification('Failed to save task', 'error');
    }
}

async function editTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const task = await response.json();
        
        document.getElementById('title').value = task.title;
        document.getElementById('description').value = task.description || '';
        document.getElementById('status').value = task.status;
        document.getElementById('due_date').value = task.due_date ? task.due_date.split('T')[0] : '';
        document.getElementById('priority').value = task.priority;
        
        currentTaskId = id;
        document.getElementById('cancelEdit').style.display = 'inline-block';
        document.querySelector('.add-btn').innerHTML = '<i class="fas fa-save"></i> Update Task';
        
        document.getElementById('title').focus();
    } catch (error) {
        console.error('Error loading task for edit:', error);
        showNotification('Failed to load task for editing', 'error');
    }
}

function cancelEdit() {
    resetForm();
    showNotification('Edit cancelled', 'info');
}

async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        showNotification('Task deleted successfully!', 'success');
        loadTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
        showNotification('Failed to delete task', 'error');
    }
}

async function markAsComplete(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'completed' })
        });
        showNotification('Task marked as complete!', 'success');
        loadTasks();
    } catch (error) {
        console.error('Error updating task:', error);
        showNotification('Failed to update task', 'error');
    }
}

function resetForm() {
    document.getElementById('taskForm').reset();
    currentTaskId = null;
    document.getElementById('cancelEdit').style.display = 'none';
    document.querySelector('.add-btn').innerHTML = '<i class="fas fa-plus"></i> Add Task';
    document.getElementById('title').focus();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);