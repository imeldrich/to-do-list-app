import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://to-do-list-app-96d73-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const tasksInDB = ref(database, "to-do-list");
const markedTasksInDB = ref(database, "marked-tasks");

const add = document.getElementById("add-btn");
const input = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const ulForMarkedTasks = document.getElementById("ul-for-marked-tasks");

// push data to the database
add.addEventListener("click", function() {
    let inputValue = input.value;

    if (inputValue){
        push(tasksInDB, inputValue)
        clearInputField()
    }
})

// fetch data from the database and display it
onValue(tasksInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearToDoListEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];

            appendItemToToDoListEl(currentItem)
        }
    } else {
        ulEl.innerHTML = "No tasks here... yet"
    }

})

// clear input field
function clearInputField() {
    input.value = ""
}

// clear unordered list before appending items
function clearToDoListEl() {
    ulEl.innerHTML = ""
}

// append items to the unordered list
function appendItemToToDoListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEL = document.createElement("li")

    let image = document.createElement("img");
    image.src = "images/remove.png"
    image.className = "remove-btn"
    newEL.appendChild(image)

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox"
    checkbox.className = "checkbox"
    newEL.prepend(checkbox)

    let label = document.createElement("label");
    label.textContent = itemValue
    newEL.appendChild(label)

    ulEl.append(newEL)

    // remove task when remove butotn is clicked
    image.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `to-do-list/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    // mark task as completed
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            label.style.textDecoration = "line-through";
            label.style.color = "#6c757d";
            push(markedTasksInDB, itemValue);

            let exactLocationOfItemInDB = ref(database, `to-do-list/${itemID}`)
            remove(exactLocationOfItemInDB)

        } else {
            label.style.textDecoration = "none";
            label.style.color = "#03045e";
        }
    })
}

// fetch marked tasks from the database and display it
onValue(markedTasksInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearUlForMarkedTasks()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];

            appendItemToMarkedTask(currentItem)
        }
    } else {
        ulForMarkedTasks.innerHTML = "No completed tasks"
    }
})

// clear unordered list before appending items
function clearUlForMarkedTasks() {
    ulForMarkedTasks.innerHTML = ""
}

// append marked tasks to the unordered list
function appendItemToMarkedTask(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEL = document.createElement("li")

    let image = document.createElement("img");
    image.src = "images/remove.png"
    image.className = "remove-btn"
    newEL.appendChild(image)

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox"
    checkbox.className = "checkbox"
    checkbox.checked = true;
    newEL.prepend(checkbox)

    let label = document.createElement("label");
    label.textContent = itemValue
    label.style.textDecoration = "line-through";
    label.style.color = "#6c757d";
    newEL.appendChild(label)

    ulForMarkedTasks.append(newEL)

    // remove task when remove butotn is clicked
    image.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `marked-tasks/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    // return task to to-do list when checkbox is unchecked
    checkbox.addEventListener("click", function() {
        if (!checkbox.checked) {
            push(tasksInDB, itemValue);

            let exactLocationOfItemInDB = ref(database, `marked-tasks/${itemID}`)
            remove(exactLocationOfItemInDB)
        }
    })
}