const add = document.getElementById("add-btn");
const input = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const taskFromLocalStorage = JSON.parse(localStorage.getItem("task"));
const isCheckedLocalStorage = JSON.parse(localStorage.getItem("isChecked"));

let tasks = [];
let completedTasks = [];

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
            <img src="images/remove.png" class="remove-btn"/>
        </li>`;
    }
    ulEl.innerHTML = taskLog;
    removeTask();
    isCheckedTask();
}

// load tasks from local storage on page load
if (taskFromLocalStorage) {
    tasks = taskFromLocalStorage;
    renderTasks();
}

// remove task when checkbox is clicked
function removeTask() {
    const removeBtn = document.getElementsByClassName("remove-btn");
    for (let i = 0; i < tasks.length; i++) {
        removeBtn[i].addEventListener("click", function() {
            tasks.splice(tasks[i], 1);
            localStorage.setItem("task", JSON.stringify(tasks));
            renderTasks();
        });
    }
}

// mark task as completed
function isCheckedTask() {
    const checkbox = document.getElementsByClassName("checkbox");
    for (let i = 0; i < tasks.length; i++) {
        checkbox[i].addEventListener("change", function() {
            if (checkbox[i].checked) {
                checkbox[i].nextElementSibling.style.textDecoration = "line-through";
                checkbox[i].nextElementSibling.style.color = "#6c757d";
                completedTasks.push(i);
                localStorage.setItem("isChecked", JSON.stringify(completedTasks));
                removeTask();
            }else {
                completedTasks.splice(i, 1);
                localStorage.setItem("isChecked", JSON.stringify(completedTasks));
                checkbox[i].nextElementSibling.style.textDecoration = "none";
                checkbox[i].nextElementSibling.style.color = "#03045e";
                removeTask();
            }
        });

        // load isChecked in local storage
        // if (isCheckedLocalStorage) {
        //     checkbox[i].checked = true;
        //     checkbox[i].nextElementSibling.style.textDecoration = "line-through";
        //     checkbox[i].nextElementSibling.style.color = "#6c757d";
        // } else {
        //     checkbox[i].nextElementSibling.style.textDecoration = "none";
        //     checkbox[i].nextElementSibling.style.color = "#03045e";
        // }
    }
}

