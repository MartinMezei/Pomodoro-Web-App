
//**GLOBAL VARIABLES**//
import { soundOn } from "./header-buttons.js";
// time of each interval is exported from settings.js 
// there for each value it is checked if there are any values in local storage and if there are not any a default value is assigned
import { focusTime, shortBreak, longBreak } from "./settings.js";
const intervalCompleteAudio = new Audio("../sounds/interval-complete.mp3");
intervalCompleteAudio.volume = localStorage.getItem("soundVolume") / 100 || 0.5;

let timerOn = false; // used to check if timer is running, implicit value is false
let fullFocusTimeSpent = 0; // total time spent in full focus in secs

// timer mode values:
// 0 - focus mode
// 1 - short break mode
// 2 - long break mode
let timerMode = 0; // by default timer mode is set to focus mode
let currentModeTime = focusTime * 60; // currentModeTime is set to 25 by default
let timeRemaining = currentModeTime // time remaining in the timer countdown, by default set to the value of currentModeTime
document.getElementById("big-timer").textContent = timeFormatter(currentModeTime);
document.getElementById("small-timer").textContent = `${timeFormatter(sessionStorage.getItem("fullFocusTimeSpent"))}`;

//**FUNCTION DEFINITIONS**//

// displays total time spent in full focus on the small timer
function timeSpentStudyingHandler() {
    document.getElementById("small-timer").textContent = `${timeFormatter(fullFocusTimeSpent)}`; // displays total time spent in focus mode on the website
}

// this function is called after switching between timer modes or after the countdown runs out
// resets the timer to the original state
function reset() {
    document.getElementById("timer-toggle-button").textContent = "Start";
    timerOn = false;
    timeRemaining = currentModeTime;
    let displayedTime = timeFormatter(currentModeTime);
    document.getElementById("big-timer").textContent = `${displayedTime}`;
}

// if needed this function creates a formatted string to add a 0 before seconds or minutes in the timer
// it is needed when amount of minutes or seconds is below 10
function twoNumFormatter(timeValue) {
    if (timeValue < 10) {
        return `0${timeValue}`;
    } else {
        return `${timeValue}`
    }
}

// currentTime is in seconds
// returns time in a format of hh:mm:ss
function timeFormatter(currentTime) {

    let hours = Math.floor(currentTime / 3600);
    currentTime %= 3600;
    let mins = Math.floor(currentTime / 60);
    let secs = currentTime % 60;

    // string values of mins and secs formatted to mm:ss format
    let hoursDisplayed = twoNumFormatter(hours);
    let minsDisplayed = twoNumFormatter(mins);
    let secsDisplayed = twoNumFormatter(secs);

    if (hours != 0) { // hours need to be displayed
        return hoursDisplayed + ":" + minsDisplayed + ":" + secsDisplayed;
    } else { // no need for hours to be displayed
        return minsDisplayed + ":" + secsDisplayed;
    }
}

// countdown function to implement the timer 
// if timer is paused or mode is switched while the countdown is running the function is prematurly ended
// after countdown running out reset function is called to reset the timer to its original state
async function countDown() {

    for (timeRemaining; timeRemaining >= 0; timeRemaining--) {

        if (!timerOn) {
            return; // function is ended because the timer has been paused or mode has been change abruptly
        }

        document.getElementById("big-timer").textContent = timeFormatter(timeRemaining);
        await delay(1000);
    }
    // countdown ended successfully
    if (timerMode == 0) {
        fullFocusTimeSpent += focusTime * 60;
        sessionStorage.setItem("fullFocusTimeSpent", fullFocusTimeSpent);
        timeSpentStudyingHandler(focusTime); // calculates current total full focus time and displays it on the website
    }

    if (soundOn) {
        intervalCompleteAudio.play()
    }
    reset(); // reseting the timer to its original state
}

// takes time in miliseconds and creates a delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//**Changing timer modes**//

// timer mode changed to focus
document.getElementById("focus-button").onclick = function () {

    // mode charateristics are set
    timerMode = 0;
    currentModeTime = focusTime * 60;

    document.getElementById("current-mode-display").textContent = "Full Focus";
    document.getElementById("big-timer").textContent = timeFormatter(currentModeTime);


    // timer is reset to its original state
    reset();
};

// timer mode changed to short break
document.getElementById("short-break-button").onclick = function () {

    document.getElementById("current-mode-display").textContent = "Short Break";

    // mode charateristics are set
    timerMode = 1; // short break mode value
    currentModeTime = shortBreak * 60 // time based on the mode is converted to secs

    // timer is reset to its original state
    reset();
};

// timer mode changed to long break
document.getElementById("long-break-button").onclick = function () {

    document.getElementById("current-mode-display").textContent = "Long Break";

    // mode charateristics are set
    timerMode = 2; // long break mode value
    currentModeTime = longBreak * 60 // time based on the mode is converted to secs

    // timer is reset to its original state
    reset();
};

//**Pausing and unpausing the timer**//

document.getElementById("timer-toggle-button").addEventListener("click", function () {
    timerOn = !timerOn; // toggles the timerOn value after every click

    if (timerOn) { // start button was clicked 
        document.getElementById("timer-toggle-button").textContent = "Pause";
        countDown();
    } else { // pause button was clicked
        document.getElementById("timer-toggle-button").textContent = "Start";
    }
});







