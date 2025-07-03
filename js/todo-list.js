// todo : confirmation before removing a task

//**GLOBAL VARIABLES**//
import {soundOn} from "./header-buttons.js";
const taskCompleteAudio = new Audio("../sounds/task-complete.mp3");
taskCompleteAudio.volume = localStorage.getItem("soundVolume")/100 || 0.5;

const incompleteTasksList = document.getElementById("incomplete-tasks-list");
const completeTasksList = document.getElementById("complete-tasks-list");
const textInput = document.getElementById("add-task-input");

// !currentTaskId is not to be decremented because there is a possibility of task id duplicates
// with each currentTaskId increment a new id is created, so no duplicity is possible even after deleting a task
let currentTaskId = 0;

// !these might be used in the future
// let incompleteTasksCounter = 0;
// let completeTasksCounter = 0;

//**FUNCTION DEFINITIONS**//

// creates a new div, button and p to create a new task and adds it to taskList
// increments currentTaskId to create a new id and increments activeTaskCounter
// activeTaskCounter is checked afterwards to ensure that overflow of tasks in taskList is handled correctly
function addNewTask(userInput) {

    // creates new elements
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const taskDescription = document.createElement("p");
    const deleteBtn = document.createElement("button");

    // class and attributes assingnments
    checkbox.type = "checkbox";
    checkbox.name = "checkbox";
    deleteBtn.className = 'delete-task-button';
    listItem.className = "incomplete"; // used to determine the state of a specific task
    // text contents of new elements
    taskDescription.textContent = `${userInput}`;
    deleteBtn.textContent = "🗑️";
    // appending new elements listItem
    listItem.appendChild(deleteBtn);
    listItem.appendChild(checkbox);
    listItem.appendChild(taskDescription);
    // appending new task to taskList
    incompleteTasksList.appendChild(listItem);

    currentTaskId++;

    // if number of tasks is higher than 4 overflow is set to scroll
    // if (incompleteTasksCounter > 4) {
    //     document.getElementById("incomplete-tasks-list").style.overflowY = "scroll";
    // }
}

// gets and parses user input from add-task-input
function getUserInput() {
    return textInput.value.trim()
}

// handles error propagation when add-task-input is empty
// errorCode is an integer that indicates what kind of an error has occured
// error Code values:
// 1 - no input found; 2 - input too long
function inputErrorHandler(errorCode) {
    textInput.style.borderColor = "red"
    switch (errorCode) {
        case 1:
            textInput.placeholder = "Task Description Required!"
            break;
        case 2:
            textInput.value = "";
            textInput.placeholder = "Input Too Long!"
            break;
        default:
            break;
    }
}

// changes everything so input is set to its original state after adding a new task
function inputBackToOriginalState() {
    textInput.value = "";
    textInput.style.borderColor = "#B25CA0"
    textInput.placeholder = "Task Description Here"
}

//**Adding tasks via the add-task-button**//
document.getElementById("add-task-button").addEventListener("click", function () {

    let userInput = getUserInput(); // input from add-task-input

    if (userInput === '' || userInput === null) {
        inputErrorHandler(1);
    } else if (userInput.length > 30) {
        inputErrorHandler(2);
    } else { // input valid
        inputBackToOriginalState();
        addNewTask(userInput);
    }
});

//**Adding tasks via Enter key**//
document.getElementById("add-task-input").addEventListener("keypress", function (event) {

    let userInput = getUserInput();

    if (event.key == "Enter") {
        if (userInput === '' || userInput === null) {
            inputErrorHandler(1);
        } else if (userInput.length > 30) {
            inputErrorHandler(2);
        } else { // input valid
            inputBackToOriginalState();
            addNewTask(userInput);
        }
    }

});

//**Actions performed in task lists**//
document.getElementById("tasks-lists-wrapper").addEventListener("click", function (event) {
    if (event.target.className == "delete-task-button") {
        let taskChildElement = event.target;
        let taskToRemove = taskChildElement.parentElement;
        taskToRemove.remove();
    }
});

document.getElementById("tasks-lists-wrapper").addEventListener("change", function (event) {
    if (event.target.type == "checkbox") {
        let taskChildElement = event.target;
        let taskItem = taskChildElement.parentElement;

        if (taskChildElement.checked) {
            completeTasksList.appendChild(taskItem);
            if (soundOn){
                taskCompleteAudio.play();
            }
        } else {
            incompleteTasksList.appendChild(taskItem);
        }
    }
});
