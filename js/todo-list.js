// todo : adding tasks by pressing Enter key
// todo : confirm before removing

//**GLOBAL VARIABLES**//

const taskList = document.getElementById("task-list")
const textInput = document.getElementById("add-task-input");
// currentTaskId is not to be decremented because there is a possibility of task id duplicates
// with each currentTaskId increment a new id is created
let currentTaskId = 0;
// counts how many task are currently active
let activeTasksCounter = 0;
let completedTaskCounter = 0;


//**FUNCTION DEFINITIONS**//

// creates a new div, button and p to create a new task and adds it to taskList
// increments currentTaskId to create a new id and increments activeTaskCounter
// activeTaskCounter is checked afterwards to ensure that overflow of tasks in taskList is handled correctly
function addNewTask(userInput) {

    // creates new elements
    const taskDiv = document.createElement("div");
    const taskDescription = document.createElement("p");
    const deleteBtn = document.createElement("button");
    // class assignments
    taskDiv.className = 'task';
    deleteBtn.className = 'delete-task-button';
    // same if is assigned to taskDiv and its deleteBtn
    taskDiv.id = `${currentTaskId}`;
    deleteBtn.id = `${currentTaskId}`
    // text contents of new elements
    deleteBtn.textContent = "-"
    taskDescription.textContent = `${userInput}`;

    // appending new elements taskDiv
    taskDiv.appendChild(taskDescription);
    taskDiv.appendChild(deleteBtn);
    // appending new task to taskList
    taskList.appendChild(taskDiv);

    currentTaskId++;
    activeTasksCounter++;

    // if number of tasks is higher than 4 overflow is set to scroll
    if (activeTasksCounter > 4) {
        document.getElementById("task-list").style.overflowY = "scroll";
    }
}

// returns user input from add-task-input
function getUserInput() {
    return textInput.value.trim()
}

// handles error propagation when add-task-input is empty
// errorCode is an integer that indicates what kind of an error has occured
// error Code values:
// 1 - no input found; 2 - input too long
function inputErrorHandler(errorCode) {
    textInput.style.borderColor = "red"
    textInput.placeholder = "Task Description Required"

    switch (errorCode) {
        case 1:
            textInput.style.borderColor = "red"
            textInput.placeholder = "Task Description Required!"
            break;
        case 2:
            textInput.value = "";
            textInput.style.borderColor = "red"
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


//**Get task description from the user**/ 

//**Adding tasks via the add-task-button**//
document.getElementById("add-task-button").addEventListener("click", function () {

    let userInput = getUserInput();

    if (userInput === '' || userInput === null) { // no input found
        inputErrorHandler(1);
    } else if (userInput.length > 40) { // input is too long
        inputErrorHandler(2);
    } else { // input valid
        inputBackToOriginalState();
        addNewTask(userInput);
    }

});

//**Removing tasks**//
document.getElementById("task-list").addEventListener("click", function (event) {
    if (event.target.className == "delete-task-button") {
        // gets the Id from a deleteBtn that was clicked
        // this id can be used to identify a specific task
        const taskId = event.target.id;
        // finds a specific taskDiv to remove
        const taskDivToRemove = document.getElementById(taskId);
        //removes the task
        taskDivToRemove.remove();

        activeTasksCounter--;
    }

    // disables overflow scroll if scrolling is not needed
    if (activeTasksCounter <= 4) {
        document.getElementById("task-list").style.overflowY = "hidden";
    }
});
