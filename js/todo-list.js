// todo : adding tasks by pressing Enter key
// todo : confirm before removing

//**GLOBAL VARIABLES**//

const incompleteTasksList = document.getElementById("incomplete-tasks-list");
const completeTasksList = document.getElementById("complete-tasks-list");
const textInput = document.getElementById("add-task-input");
// currentTaskId is not to be decremented because there is a possibility of task id duplicates
// with each currentTaskId increment a new id is created
let currentTaskId = 0;
// counts how many task are currently active
let incompleteTasksCounter = 0;
let completeTasksCounter = 0;


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
    checkbox.className = "incomplete";
    deleteBtn.className = 'delete-task-button';
    // same if is assigned to taskDiv and its deleteBtn
    listItem.id = `${currentTaskId}`;
    deleteBtn.id = `${currentTaskId}`;
    checkbox.id = `${currentTaskId}`;
    // text contents of new elements
    deleteBtn.textContent = "-"
    taskDescription.textContent = `${userInput}`;

    // appending new elements listItem
    listItem.appendChild(checkbox);
    listItem.appendChild(taskDescription);
    listItem.appendChild(deleteBtn);
    // appending new task to taskList
    incompleteTasksList.appendChild(listItem);

    currentTaskId++;
    incompleteTasksCounter++;

    // if number of tasks is higher than 4 overflow is set to scroll
    if (incompleteTasksCounter > 4) {
        document.getElementById("incomplete-tasks-list").style.overflowY = "scroll";
    }
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

// moves tasks between complete and incomplete task lists
// changes attributes of task items according to their current state
function moveTask(taskToMove) {
    
    if (taskToMove.className == "incomplete") {
        incompleteTasksCounter--;
        completeTasksCounter++;
        taskToMove.className == "complete";
        completeTasksList.appendChild(taskToMove);
        incompleteTasksList.removeChild(taskToMove);
    } else if (taskToMove.className == "complete") {
        incompleteTasksCounter++;
        completeTasksCounter--;
        taskToMove.className == "incomplete";
        completeTasksList.removeChild(taskToMove);
        incompleteTasksList.appendChild(taskToMove);
    }
}


//**Adding tasks via the add-task-button**//
document.getElementById("add-task-button").addEventListener("click", function () {

    let userInput = getUserInput(); // input from add-task-input

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
document.getElementById("tasks-lists-wrapper").addEventListener("click", function (event) {
    if (event.target.className == "delete-task-button") {
        // gets the Id from a deleteBtn that was clicked
        // this id can be used to identify a specific task
        const taskId = event.target.id;
        // finds a specific taskDiv to remove
        const taskToRemove = document.getElementById(taskId);
        //removes the task
        taskToRemove.remove();
        incompleteTasksCounter--;
    }

    // disables overflow scroll if scrolling is not needed
    if (incompleteTasksCounter <= 4) {
        document.getElementById("task-list").style.overflowY = "hidden";
    }
});

// todo : checkbox class changing not working
// todo : check if this approach to detect checking the box is good
//**Moving tasks between todo and done**/
document.getElementById("tasks-lists-wrapper").addEventListener("click", function (event) {
    if (event.target.name == "checkbox") {
        // gets the Id from a checkbox that was clicked
        // this id can be used to identify a specific task
        const taskId = event.target.id;
        // finds a specific taskItem to move
        const taskToMove = document.getElementById(taskId);
        moveTask(taskToMove);
    }

    // disables overflow scroll if scrolling is not needed
    if (incompleteTasksCounter <= 4) {
        document.getElementById("task-list").style.overflowY = "hidden";
    }
});
