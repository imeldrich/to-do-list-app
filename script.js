const add = document.getElementById("add-btn");
const input = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const taskFromLocalStorage = JSON.parse(localStorage.getItem("task"));

let tasks = [];

// add task to the list
add.addEventListener("click", function() {
    tasks.push(input.value);
    localStorage.setItem("task", JSON.stringify(tasks));
    renderTasks();
});

// render tasks to the page
function renderTasks() {
    let taskLog = "";
    for (let i = 0; i < tasks.length; i++) {
        taskLog += `<li>${tasks[i]}</li>`;
    }
    ulEl.innerHTML = taskLog;
}

// load tasks from local storage on page load
if (taskFromLocalStorage) {
    tasks = taskFromLocalStorage;
    renderTasks();
}