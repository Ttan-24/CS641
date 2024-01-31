
function openItchWebsite() {
    var audioClick = new Audio();
    audioClick.src = "assets/arcade-bleep.mp3";
    audioClick.play();
    window.open('https://aaiko.itch.io/bouncebuds', '_blank');
}

function onNextImage() {
    var imageTag = document.getElementById("gameImage2");
    imageTag.style.display = "block";
}

function onPreviousImage() {
    var imageTag = document.getElementById("gameImage");
    imageTag.style.display = "block";
}