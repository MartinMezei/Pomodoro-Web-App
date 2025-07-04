// todo : implement changes of settings menu visibility

export let soundOn = true;
let settingsVisible = false;
let todoListVisible = true;

//**Changing todo lists visibility**//

document.getElementById("todo-toggle-button").addEventListener("click",function(){
    todoListVisible = !todoListVisible;

    if (todoListVisible){
        document.getElementById("todo-list").style.display = "block";
        document.getElementById("todo-toggle-button").textContent = "Hide Task List";
    } else {
        document.getElementById("todo-list").style.display = "none";
        document.getElementById("todo-toggle-button").textContent = "Show Task List";
    }
});

//**Sounds mute and unmute**//

document.getElementById("sound-toggle-button").addEventListener("click", function () {
    soundOn = !soundOn;

    // todo: add music of and music on icons
    if (soundOn) {
        document.getElementById("sound-toggle-button").textContent = "Sound Off";
    } else {
        document.getElementById("sound-toggle-button").textContent = "Sound On";
    }

});

// todo : settings button