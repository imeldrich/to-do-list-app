const add = document.getElementById("add-btn");
const input = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const checkbox = document.getElementsByClassName("checkbox");
const taskFromLocalStorage = JSON.parse(localStorage.getItem("task"));

let tasks = [];

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
        taskLog += `
        <li>
            <input type="checkbox" class="checkbox"/>
            <label>${tasks[i]}</label>
        </li>`;
    }
    ulEl.innerHTML = taskLog;
    removeTask();
}

// load tasks from local storage on page load
if (taskFromLocalStorage) {
    tasks = taskFromLocalStorage;
    renderTasks();
}

// remove task when checkbox is clicked
function removeTask() {
    for (let i = 0; i < tasks.length; i++) {
        checkbox[i].addEventListener("click", function() {
            if (checkbox[i].checked) {
                tasks.splice(i, 1);
                localStorage.setItem("task", JSON.stringify(tasks));
                renderTasks();
            }
        });
    }
}
