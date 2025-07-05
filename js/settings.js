//**Other elements**/
const settingsMenu = document.getElementById("settings-menu");
const root = document.documentElement;

//**Input objects from settings menu**//
// timer settings inputs
const fullFocusInput = document.getElementById("focus-time-input");
const shortBreakInput = document.getElementById("shortbreak-time-input");
const longBreakInput = document.getElementById("longbreak-time-input");
// sound settings inputs
const soundVolumeBar = document.getElementById("sound-volume-input");
// theme selection inputs
const themeSelection = document.getElementById("theme-select");

//**Time values for timer.js**/
export let focusTime = localStorage.getItem("focusTime") || 25;
export let shortBreak = localStorage.getItem("shortBreak") || 5;
export let longBreak = localStorage.getItem("longBreak") || 10;

//**Display correct settings inputs values right after the web site is visited **/ 
fullFocusInput.value = localStorage.getItem("focusTime") || 25;
shortBreakInput.value = localStorage.getItem("shortBreak") || 5;
longBreakInput.value = localStorage.getItem("longBreak") || 10;
soundVolumeBar.value = localStorage.getItem("soundVolume") || 50;
themeSelection.value = localStorage.getItem("theme") || "Neon City";

//**Settings menu visibility**/
// used when closing the settings window
let settingsVisible = false;

//**Changing theme**/ 
// themeSelected is a string like "Neon City" that determines which theme is to be set
function changeTheme(themeSelected) {

    if (themeSelected == "Neon City") {
        root.style.setProperty("--text-color", "#EBE6E6");
        root.style.setProperty("--decoration-color", "#B25CA0");
        root.style.setProperty("--button-hover-text-color", "#683DB3");
        root.style.setProperty("--content-bg-color", "rgba(46, 17, 58, 0.6)");
        root.style.setProperty("--content-border-color", "#2E113A");
        root.style.setProperty("--page-bg-image", 'url("../images/neon-city-bg.jpg")');
    } else if (themeSelected == "Autumn Forest") {
        root.style.setProperty("--text-color", "#E0DBD8");
        root.style.setProperty("--decoration-color", "#A69C94");
        root.style.setProperty("--button-hover-text-color", "#3D3E40");
        root.style.setProperty("--content-bg-color", "rgba(62, 45, 38, 0.6)");
        root.style.setProperty("--content-border-color", "#3E2D26");
        root.style.setProperty("--page-bg-image", 'url("../images/autumn-forest-bg.jpg")');
    } else if (themeSelected == "Cozy Cafe") {
        root.style.setProperty("--text-color", "#f0e9e4");
        root.style.setProperty("--decoration-color", "#a77c5a");
        root.style.setProperty("--button-hover-text-color", "#3D3E40");
        root.style.setProperty("--content-bg-color", "rgba(64, 36, 59, 0.6)");
        root.style.setProperty("--content-border-color", "#3E2D26");
        root.style.setProperty("--page-bg-image", 'url("../images/cozy-cafe-bg.jpg")');
    } else if (themeSelected == "Night City") {
        root.style.setProperty("--text-color", "#EBE6E6");
        root.style.setProperty("--decoration-color", "#027368");
        root.style.setProperty("--button-hover-text-color", "#EBE6E6");
        root.style.setProperty("--content-bg-color", "rgba(1, 64, 64, 0.6)");
        root.style.setProperty("--content-border-color", "#025959");
        root.style.setProperty("--page-bg-image", 'url("../images/night-city-bg.jpg")');
    } else if (themeSelected == "Foggy Forest") {
        root.style.setProperty("--text-color", "#EBE6E6");
        root.style.setProperty("--decoration-color", "#A4A694");
        root.style.setProperty("--button-hover-text-color", "#EBE6E6");
        root.style.setProperty("--content-bg-color", "rgba(66, 85, 67, 0.6)");
        root.style.setProperty("--content-border-color", "#1F2620");
        root.style.setProperty("--page-bg-image", 'url("../images/foggy-forest-bg.jpg")');
    }
}

// makes settings visible after summoning them
function openSettings() {
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
}

// makes settings invisible after closing them
function closeSettings() {
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
}


//**Change theme to a correct one after starting the web site**/
changeTheme(themeSelection.value);

//**CLOSE SETTINGS BTN**/
document.getElementById("close-settings").addEventListener("click", function () {
    closeSettings();
});

//**SETTINGS BTN IN HEADER**/
document.getElementById("settings-button").addEventListener("click", function () {

    settingsVisible = !settingsVisible;
    
    if (settingsVisible) {
        openSettings();
    } else {
        closeSettings();
    }
});


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
    localStorage.setItem("focusTime", fullFocusInput.value);
    localStorage.setItem("shortBreak", shortBreakInput.value);
    localStorage.setItem("longBreak", longBreakInput.value);
    localStorage.setItem("soundVolume", soundVolumeBar.value);
    localStorage.setItem("theme", themeSelection.value)
    themeSelection.value = localStorage.getItem("theme");
    console.log(themeSelection.value);
    //refresh of the site to display and use correct values set by the user in settings
    location.reload();
    //reopen settings
});