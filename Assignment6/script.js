var canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var context = canvas.getContext('2d');

// Draw background
context.fillStyle = "#adaea6";
context.fillRect(0,0,canvas.width,canvas.height);

// Line colors
color_blue = '#6592a9';
color_pink = '#a0797a';
color_purple = '#85869a';
color_yellow = '#acaa6f';
color_white = '#dee7e4';

// Color array
const colors = [color_white, color_blue, color_white, color_blue, color_white, color_pink, color_white, color_pink, color_white, color_purple, color_white, color_blue, color_white, color_blue, color_white, color_purple, color_white, color_purple, color_white, color_purple, color_white, color_yellow, color_white, color_yellow, color_white, color_yellow];


// Line style
//var lineScalar = 0;
var distanceBetweenLines = canvas.width / 100;
var originalLineWidth = canvas.width / 100 * 5;
var lineWidth = originalLineWidth;
var lineHeight = canvas.height / 2;
var maxLineDraws = 10;
var targetLineWaviness = 10;
var lineWaviness = targetLineWaviness; 
var maxLineWaviness = canvas.width;
var minLineWaviness = canvas.width/ 10;

requestDeviceMotion();

function lerp(min, max, scalar) {
  var difference = max-min;
  return min + (difference * scalar); 
}

function draw() {
  let colorIndex = 0;
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before redrawing
  context.fillRect(0,0,canvas.width,canvas.height);
  // For loop to create lines
  for (let x = 0; x < canvas.width; x += distanceBetweenLines) {
    context.beginPath();
    context.strokeStyle = colors[colorIndex];
    context.lineWidth = lineWidth;
  
    // Modulo to find even colors (non-white) which I will change width for
    if (colorIndex % 2 == 1) 
    {
      context.lineWidth += (Math.cos(x+10) * 5)
    }
  
    // Draw lines repeatedly to bottom of page
    for (let i = 0; i < maxLineDraws; i++) {
      const y = i * (lineHeight);
      createBezierLine(context, x, y);
    }
    context.stroke();
  
    // Increment color
    if (colorIndex < colors.length) {
      colorIndex++;
    }
    else {
      colorIndex = 0;
    }
  }
  //colorIndex = 0;
  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

// Bezier function
function createBezierLine(context, x, y) {
    // Adjustment is for the different control point heights
  verticalAdjustment = lineHeight / 3;
  
  // Y coordinates 
  var y1 = y + (verticalAdjustment);
  var y2 = y + (verticalAdjustment*2);
  var y3 = y + (verticalAdjustment*3);
  
  // X coordinates
  var xCentre = x;
  var xLeft = x - (lineWaviness)
  var xRight = x + (lineWaviness);
  
  // Draw bezier curve
  context.moveTo(xCentre, y);
  context.bezierCurveTo(xRight, y1, xLeft, y2, xCentre, y3);
}


function handleMotion(e) {
  console.log(e);
  let x = e.accelerationIncludingGravity.x;
  let y = e.accelerationIncludingGravity.y;
  let z = e.accelerationIncludingGravity.z;
  //lineWaviness = (alpha/ 360);  
  let scalar = (((x + 180) % 360) - 180)/ 10;
  targetLineWaviness = lerp(minLineWaviness, maxLineWaviness, scalar);
  lineWaviness = lerp(lineWaviness, targetLineWaviness, 0.2);
  draw();
  
  if (scalar > 0.6 || scalar < -0.6) {
    shakeSpeech();
  }
  //colorIndex = 0;
  //alert("device moving!" + alpha);
}

draw();
//colorIndex = 0;
async function requestDeviceMotion() {
  // return early if undefined
  if (typeof DeviceMotionEvent == 'undefined') {
    return;
  } 
  // check if request permission type is function
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    // i-phone
    try {
      const permission = await DeviceMotionEvent.requestPermission();
      if (permission === 'granted') {
        window.addEventListener('devicemotion', handleMotion);
      }
    } catch(e) {
      console.error(e);
    }
  } else if ('DeviceMotionEvent' in window) {
    // not i-phone
    window.addEventListener('devicemotion', handleMotion);
  } else {
    // no device motion
    alert('no device motion');
  }
}

// timeOut = false;
// timer = 0;
// function resetTimeOut() {
//   timeOut = false;
// }

// function decrementTimer() {
//   timer--;
//   alert("ayoo");
// }
// setInterval(resetTimeout, 1000);
//document.getElementById("myButton").addEventListener("click", shakeSpeech());
function shakeSpeech() {
  inputTextSpeech = "Hey! Stop shaking me";
  alert(inputTextSpeech);
  const speech = new SpeechSynthesisUtterance(inputTextSpeech);
  speechSynthesis.speak(speech);
  //timeOut = true;
  //timer = 5;
}

