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
let colorIndex = 0;

// Line style
var distanceBetweenLines = canvas.width / 100;
var lineWidth = canvas.width / 100;
var lineHeight = canvas.height / 2;
var maxLineDraws = 10;

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
  var xLeft = x - (canvas.width / 10)
  var xRight = x + (canvas.width / 10);
  
  // Draw bezier curve
  context.moveTo(xCentre, y);
  context.bezierCurveTo(xRight, y1, xLeft, y2, xCentre, y3);
}