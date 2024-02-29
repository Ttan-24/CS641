// Line style
var lineScalar = 1;
var distanceBetweenLines = canvas.width / 100;
var lineWidth = canvas.width / 100 * lineScalar;
var lineHeight = canvas.height / 2;
var maxLineDraws = 10;

var tilt = 0;

// Line colors
color_blue = '#6592a9';
color_pink = '#a0797a';
color_purple = '#85869a';
color_yellow = '#acaa6f';
color_white = '#dee7e4';

// Color array
const colors = [color_white, color_blue, color_white, color_blue, color_white, color_pink, color_white, color_pink, color_white, color_purple, color_white, color_blue, color_white, color_blue, color_white, color_purple, color_white, color_purple, color_white, color_purple, color_white, color_yellow, color_white, color_yellow, color_white, color_yellow];
let colorIndex = 0;

function clock() {

    const now = new Date();
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    //canvas.height = window.innerHeight;
    //canvas.width = window.innerWidth;
    const sec = now.getSeconds();
    lineScalar = 1;
    distanceBetweenLines = canvas.width / 100;
    lineWidth = canvas.width / 100 * sec;
    lineHeight = canvas.height / 2;
    maxLineDraws = 10;

    // redraw
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.translate(75, 75);
    //ctx.scale(0.4, 0.4);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
  


    
    ctx.save();
    // Draw background
    ctx.fillStyle = "#adaea6";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    for (let x = 0; x < canvas.width; x += distanceBetweenLines) {
        
        ctx.beginPath();
        ctx.strokeStyle = colors[colorIndex];
        ctx.lineWidth = lineWidth;
      
      // Modulo to find even colors (non-white) which I will change width for
      if (colorIndex % 2 == 1) 
      {
        ctx.lineWidth += (Math.cos(x+10) * 5)
      }
      
      // Draw lines repeatedly to bottom of page
      for (let i = 0; i < maxLineDraws; i++) {
        const y = i * (lineHeight);
        createBezierLine(ctx, x, y);
      }
      ctx.stroke();
      
      // Increment color
      if (colorIndex < colors.length) {
          colorIndex++;
      }
      else {
          colorIndex = 0;
      }
    }
    colorIndex = 0;
    ctx.restore();
    // Write seconds
    ctx.save();
    ctx.rotate((tilt)/ 50);
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(83, 0);
    ctx.stroke();
    ctx.restore();
  
    // the circle 
    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = "#325FA2";
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();
  
    ctx.restore();
  
    window.requestAnimationFrame(clock);
  }
  
  window.requestAnimationFrame(clock);

  

  function createBezierLine(ctx, x, y) {
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
  ctx.moveTo(xCentre, y);
  ctx.bezierCurveTo(xRight, y1, xLeft, y2, xCentre, y3);
}


  function handleOrientation(e) {
    console.log(e);
    let alpha = e.alpha;
    let beta = e.beta;
    let gamma = e.gamma;

    tilt = alpha;
    //lineScalar = alpha;
  }
  
  async function requestDeviceOrientation() {
    if (typeof DeviceOrientationEvent != 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      //iOs 13+
      try {
        const permissionState = await DeviceOrientationEvent.requestPermission();
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
        }
      } catch(error) {
        console.error(error);
      }
    } else if ('DeviceOrientationEvent' in window) {
      // not iOs 13+
      window.addEventListener('deviceorientation', handleOrientation);
    } else {
      // device orientation is nto supported
      alert('not supported')
    }
  }
  