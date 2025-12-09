const add = document.getElementById("add-btn");
const input = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const checkbox = document.querySelectorAll("input[type='checkbox']");
const taskFromLocalStorage = JSON.parse(localStorage.getItem("task"));

let tasks = [];
let index = ""

// add task to the list
add.addEventListener("click", function() {
    if (input.value) {
    tasks.push(input.value);
    localStorage.setItem("task", JSON.stringify(tasks));
    input.value = "";
    renderTasks();
    }
});

// render tasks to the page
function renderTasks() {
    let taskLog = "";
    for (let i = 0; i < tasks.length; i++) {
    index = tasks[i];
    taskLog += `
    <li>
        <input type="checkbox" id="${tasks[i]}" class="checkbox"/>
        <label for="${tasks[i]}">${tasks[i]}</label>
    </li>`;
}
    ulEl.innerHTML = taskLog;
}

// load tasks from local storage on page load
if (taskFromLocalStorage) {
    tasks = taskFromLocalStorage;
    renderTasks();
}

// if (index) {
//         tasks.splice(index, 1);
//         localStorage.setItem("task", JSON.stringify(tasks));
//         renderTasks();
//     }