
function openItchWebsite() {
    var audioArcadeBleep = new Audio();
    audioArcadeBleep.src = "assets/arcade-bleep.mp3";
    audioArcadeBleep.play();
    window.open('https://aaiko.itch.io/bouncebuds', '_blank');
}

function onNextImage() {
    var gameImageTag = document.getElementById("gameImage");
    var nextButton = document.getElementById("nextbutton");
    var previousButton = document.getElementById("previousbutton");
    gameImageTag.src = "assets/gameimage2.png";
    console.log("clicked");
    gameImageTag.style.display = "block";
    gameImageTag.style.margin = "0 auto";
    nextButton.disabled = true;
    nextButton.style.backgroundColor = "#c0c1c2d0";
    previousButton.disabled = false;
    previousButton.style.backgroundColor = "#61a7d0";
}

function onPreviousImage() {
    var gameImageTag = document.getElementById("gameImage");
    var previousButton = document.getElementById("previousbutton");
    var nextButton = document.getElementById("nextbutton");
    gameImageTag.src = "assets/gameimage.png";
    console.log("clicked");
    gameImageTag.style.display = "block";
    gameImageTag.style.margin = "0 auto";
    previousButton.disabled = true;
    previousButton.style.backgroundColor = "#c0c1c2d0";
    nextButton.disabled = false;
    nextButton.style.backgroundColor = "#61a7d0";
}