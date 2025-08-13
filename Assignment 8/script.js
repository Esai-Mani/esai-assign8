// Initial tasks array
let tasks = [
    { id: 1, name: "Drink lots of Water", done: true },
    { id: 2, name: "Make sure to get some sun", done: false },
    { id: 3, name: "Keep positive mindset", done: true },
    { id: 4, name: "Limit Phone Distractions", done: false },
    { id: 5, name: "You can do this", done: true }
];

// References
const input = document.getElementById("task");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
let editId = null;

// Load tasks
function loadTask() {
    const tbody = document.querySelector("#taskList");
    tbody.innerHTML = "";

    tasks.forEach((task, index) => {
        tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td class="${task.done ? 'completed' : ''}">${task.name}</td>
            <td>${task.done ? "completed" : "pending"}</td>
            <td>
                <button class="btn btn-success btn-sm editBtn" data-id="${task.id}">
                    <i class="bi bi-pencil"></i>
                </button>
            </td>
            <td>
                <button class="btn btn-danger btn-sm deleteBtn" data-id="${task.id}">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>`;
    });

    // Delete
    document.querySelectorAll(".deleteBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = Number(e.currentTarget.dataset.id);
            tasks = tasks.filter(task => task.id !== id);
            loadTask();
        });
    });

    // Edit
    document.querySelectorAll(".editBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = Number(e.currentTarget.dataset.id);
            const task = tasks.find(t => t.id === id);
            input.value = task.name;
            editId = id;
            addBtn.innerHTML = `<i class="bi bi-pencil"></i> Update Task`;
        });
    });
}

// Add / Update
addBtn.addEventListener("click", () => {
    const value = input.value.trim();
    if (!value) return alert("Enter a task!");

    if (editId) {
        const task = tasks.find(t => t.id === editId);
        task.name = value;
        editId = null;
        addBtn.innerHTML = `<i class="bi bi-file-earmark-plus"></i> Add Task`;
    } else {
        const newTask = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            name: value,
            done: false
        };
        tasks.push(newTask);
    }

    input.value = "";
    loadTask();
});

// Clear All
clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all tasks?")) {
        tasks = [];
        loadTask();
    }
});

// Initial load
loadTask();
