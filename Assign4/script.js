var canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var context = canvas.getContext("2d");

context.beginPath();

// border of the canvas
context.lineWidth = canvas.height*0.01; //border radius
context.moveTo(0, 0);
context.lineTo(canvas.width, 0);
context.lineTo(canvas.width, canvas.height);
context.lineTo(0, canvas.height);
context.lineTo(0, 0);

// line 
context.moveTo(canvas.width * 0.5, canvas.height * 0);
context.lineTo(canvas.width * 0.5, canvas.height * 0.5);
context.stroke();

// line 2
context.beginPath();
context.lineWidth = canvas.height*0.005;
context.moveTo(canvas.width * 0.5, canvas.height * 0.5);
context.lineTo(canvas.width * 0.5, canvas.height * 1);
context.stroke();

//multiple lines
var lineX = canvas.width * 0.6;
var brushWidth = canvas.height * 0.001;
var brushWidthIncrease = brushWidth;
for (let i = 0; i < 10; i++) {
    context.beginPath();
    context.moveTo(lineX, canvas.height * 0);
    context.lineTo(lineX, canvas.height * 0.5);
    lineX += 20;
    context.lineWidth = brushWidth;
    brushWidth += brushWidthIncrease;
    context.stroke();
}

// vertical multiple lines
var numberofLines = 20;
var lineHeight = canvas.height / numberofLines;
var originBrushWidth = canvas.height * 0.001;
var verticalBrushWidth = originBrushWidth;
var brushWidthIncrease = verticalBrushWidth;
var xOrigin = canvas.width * 0.4;
var xLast = xOrigin;
for (let i = 0; i < numberofLines; i++) {
    var xCurve = 10 * Math.cos(i);
    var brushCurve = Math.cos(i/4) * 10;
    var x = xCurve + xOrigin;
    context.beginPath();
    context.strokeStyle = "green";
    context.moveTo(xLast, i * lineHeight);
    context.lineTo(x, (i * lineHeight) + lineHeight);
    verticalBrushWidth = originBrushWidth + brushCurve;
    context.lineWidth = verticalBrushWidth;
    context.stroke();
    xLast = x;
}

// vertical multiple lines
var numberofLines = 20;
var lineHeight = canvas.height / numberofLines;
var originBrushWidth = canvas.height * 0.001;
var verticalBrushWidth = originBrushWidth;
var brushWidthIncrease = verticalBrushWidth;
var xOrigin = canvas.width * 0.3;
var xLast = xOrigin;
for (let i = 0; i < numberofLines; i++) {
    var xCurve = 10 * Math.cos(i);
    var brushCurve = Math.cos(i/4) * 10;
    var x = xCurve + xOrigin;

    //variables for bezierCurve
    var x1 = xLast;
    var x3 = x;
    var x2 = lerp(x1, x3, 0.5);
    var y1 = i * lineHeight;
    var y3 = y1 + lineHeight;
    var y2 = lerp(y1, y2, 0.5);

    context.beginPath();
    context.strokeStyle = "green";
    context.moveTo(xLast, i * lineHeight);
    context.bezierCurveTo(x1, y1, x2, y2, x3, y3);
    //context.lineTo(x, (i * lineHeight) + lineHeight);
    verticalBrushWidth = originBrushWidth + brushCurve;
    context.lineWidth = verticalBrushWidth;
    context.stroke();
    xLast = x;
}

var x1 = canvas.width * 0;
var x2 = canvas.width * 0.5;
var x3 = canvas.width * 1;
var y1 = canvas.height * 0;
var y2 = canvas.height * 0.5;
var y3 = canvas.height * 0.75;

context.beginPath();
context.moveTo(canvas.width * 0, canvas.height * 0.1);
context.bezierCurveTo(x1, y1, x2, y2, x3, y3);
// draw
context.stroke();

function lerp(a, b, scalar) {
    return a + ((b - a)*scalar);
}

// context.beginPath();
// context.moveTo(canvas.width * 0.9, canvas.height * 0.05);
// context.lineTo(canvas.width * 0.09, canvas.height * 0.5);
// context.stroke();

