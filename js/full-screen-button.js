
const elem = document.documentElement;
// site is not in fullscreen mode by default
let fullScreen = false;

// turns on full screen mode
function openFullScreen(){
    elem.requestFullscreen();
}

// turns off full screen mode
function closeFullScreen(){
    elem.closeFullScreen();
}

document.getElementById("full-screen-btn").click(function(){
    fullScreen = !fullScreen;
    
    if (fullScreen){
        closeFullScreen();
    } else {
        openFullScreen();
    }
});