document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task');
    const addButton = document.getElementById('add');
    const taskList = document.getElementById('task-list');

    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to display tasks
    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function(task, index) {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" id="task${index}" ${task.completed ? 'checked' : ''}>
                <label for="task${index}">${task.text}</label>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Add a new task
    addButton.addEventListener('click', function() {
        const text = taskInput.value.trim();
        if (text !== '') {
            tasks.push({ text, completed: false });
            saveTasks();
            taskInput.value = '';
            displayTasks();
        }
    });

    // Toggle task completion
    taskList.addEventListener('change', function(event) {
        const index = event.target.id.replace('task', '');
        tasks[index].completed = event.target.checked;
        saveTasks();
    });

    // Delete a task
    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-button')) {
            const index = event.target.getAttribute('data-index');
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        }
    });

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initial display of tasks
    displayTasks();
});