const taskInput = document.getElementById('task-input');
const taskDesc = document.getElementById('task-desc');
const taskDate = document.getElementById('task-date');
const taskTime = document.getElementById('task-time');
const searchInput = document.getElementById('search-input');

const pendingTasks = document.getElementById('pending-tasks');
const inProgressTasks = document.getElementById('in-progress-tasks');
const completedTasks = document.getElementById('completed-tasks');

let tasks = [];

function addTask() {
  const taskText = taskInput.value.trim();
  const dueDate = taskDate.value;
  const dueTime = taskTime.value;
  const description = taskDesc.value.trim();

  if (taskText === '') {
    alert("Please enter a task name.");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    description: description || "No description provided",
    date: dueDate,
    time: dueTime,
    status: 'pending', // Default status
  };

  tasks.push(task);
  renderTasks();
  taskInput.value = '';
  taskDesc.value = '';
  taskDate.value = '';
  taskTime.value = '';
}

function updateTaskStatus(taskId, newStatus) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.status = newStatus;
    renderTasks();
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
}

function searchTasks() {
  const query = searchInput.value.toLowerCase();
  renderTasks(query);
}

function renderTasks(query = '') {
  pendingTasks.innerHTML = '';
  inProgressTasks.innerHTML = '';
  completedTasks.innerHTML = '';

  tasks
    .filter(task => task.text.toLowerCase().includes(query))
    .forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.classList.add('task');

      taskItem.innerHTML = `
        <div>
          <strong>${task.text}</strong> 
          <span class="task-due">${task.date || ''} ${task.time || ''}</span>
          <p>${task.description}</p>
        </div>
        <div class="task-actions">
          ${task.status !== 'pending' ? `<button onclick="updateTaskStatus(${task.id}, 'pending')">Pending</button>` : ''}
          ${task.status !== 'in-progress' ? `<button onclick="updateTaskStatus(${task.id}, 'in-progress')">In Progress</button>` : ''}
          ${task.status !== 'completed' ? `<button onclick="updateTaskStatus(${task.id}, 'completed')">Completed</button>` : ''}
          <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
      `;

      if (task.status === 'pending') pendingTasks.appendChild(taskItem);
      else if (task.status === 'in-progress') inProgressTasks.appendChild(taskItem);
      else completedTasks.appendChild(taskItem);
    });
}

renderTasks();
