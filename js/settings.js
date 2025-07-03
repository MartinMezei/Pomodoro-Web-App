//**Other elements**/
const settingsMenu = document.getElementById("settings-menu");

//**Input objects from settings menu**//
// timer settings inputs
const fullFocusInput = document.getElementById("focus-time-input");
const shortBreakInput = document.getElementById("shortbreak-time-input");
const longBreakInput = document.getElementById("longbreak-time-input");
// sound settings inputs
const soundOnCheckbox = document.getElementById("sound-toggle");
const soundVolumeBar = document.getElementById("sound-volume-input");
// theme selection inputs
const themeSelection = document.getElementById("theme-select");

//**Time values for timer.js**/
export let focusTime = localStorage.getItem("focusTime") || 25;
export let shortBreak = localStorage.getItem("shortBreak") || 5;
export let longBreak = localStorage.getItem("longBreak") || 10;

//**Set correct settings inputs values right after the web site is visited **/ 
fullFocusInput.value = localStorage.getItem("focusTime") || 25;
shortBreakInput.value = localStorage.getItem("shortBreak") || 5;
longBreakInput.value = localStorage.getItem("longBreak") || 10;
soundVolumeBar.value = localStorage.getItem("soundVolume") || 50;
localStorage.setItem("theme", themeSelection.value) || "Neon City";

// checkbox setting
if (localStorage.getItem("soundToggle") === null) {
    soundOnCheckbox.checked = true;
} else {
    soundOnCheckbox.checked = localStorage.getItem("soundToggle") === "true";
}


//**RESET TO DEFAULT SETTINGS BTN**/ 
// settings-reset-button functionality
document.getElementById("settings-reset").addEventListener("click", function () {

    // Sets site theme to default
    document.getElementById("theme-select").value = "Neon City";
    // Sets timer settings to default
    document.getElementById("focus-time-input").value = 25;
    document.getElementById("shortbreak-time-input").value = 5;
    document.getElementById("longbreak-time-input").value = 10;
    // Sets volume to default
    document.getElementById("sound-volume-input").value = 50;
    document.getElementById("sound-toggle").checked = true;
});

//**SAVE SETTINGS BTN**/ 
// gets the values from timer settings inputs and saves them to in local storage
// sets up timer or volume based on the saved settings
document.getElementById("save-settings").addEventListener("click", function () {

    // Save the values of all inputs to localStorage
    // full focus
    localStorage.setItem("focusTime", fullFocusInput.value);
    // short break
    localStorage.setItem("shortBreak", shortBreakInput.value);
    // long break
    localStorage.setItem("longBreak", longBreakInput.value);
    // sounds
    localStorage.setItem("soundToggle", soundOnCheckbox.checked);
    localStorage.setItem("soundVolume", soundVolumeBar.value);
    localStorage.setItem("theme", themeSelection.value)
    // web site theme
    themeSelection.value = localStorage.getItem("theme");

    //refresh of the site to display and use correct values set by the user in settings
    location.reload();
});

//**Settings menu visibility**/
// used when closing the settings window
let settingsVisible = false;

//**CLOSE SETTINGS BTN**/
document.getElementById("close-settings").addEventListener("click", function () {

    settingsMenu.animate(
        [
            {
                opacity: 1,
                transform: "translateY(0px)"
            },
            {
                opacity: 0,
                transform: "translateY(80px)"
            }
        ],
        {
            duration: 700,
            fill: "forwards",
            easing: "ease-in-out"
        }
    )

    setTimeout(function () {
        settingsMenu.style.display = "none"
    }, 650);

    settingsVisible = false;
});

//**SETTINGS BTN IN HEADER**/
document.getElementById("settings-button").addEventListener("click", function () {

    settingsVisible = !settingsVisible;

    if (settingsVisible) {
        settingsMenu.style.display = "block";

        settingsMenu.animate(
            [
                {
                    opacity: 0,
                    transform: "translateY(80px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0px)"
                }
            ],
            {
                duration: 700,
                fill: "forwards",
                easing: "ease-in-out"
            }

        )
    } else {
        settingsMenu.animate(
            [
                {
                    opacity: 1,
                    transform: "translateY(0px)"
                },
                {
                    opacity: 0,
                    transform: "translateY(80px)"
                }
            ],
            {
                duration: 700,
                fill: "forwards",
                easing: "ease-in-out"
            }
        )
        setTimeout(function () {
            settingsMenu.style.display = "none"
        }, 650);
    }
});