//subtract 3 from hour so it matches unit circle when converting to degrees
function hoursToDegrees(hour) { 
  return (hour - 3) * 30;
}

  //subtract 15 from minutes so it matches unit circle when converting to degrees
function minutesToDegrees(minute) {
  return (minute - 15) * 6;
}

Math.radians = function (degrees) {
  var radians = degrees * (Math.PI / 180);
  return radians;
};

function degreesToCoords(degrees, radius) {
  var coords = {};
  var xCoord = Math.round(radius * Math.cos(Math.radians(degrees)));
  coords.x = xCoord;
  var yCoord = Math.round( radius * Math.sin(Math.radians(degrees)));
  coords.y = yCoord;
  return coords;
}

var radius = 200;
var hourHandRadius = radius * (3/5);
var minuteHandRadius = radius * (4/5);
var secondHandRadius = radius * (9/10);

function drawClock() {

  //get current date
  var date = new Date(Date.now());

  var hours = date.getHours()
  if (hours > 12) {
    hours = hours - 12;
  }
  
  var minutes = date.getMinutes();
  var seconds = date.getSeconds(); 

  // divide minutes by 12 to get the amount that the hour hand moves relative to the minute hand
  var hourHandCoords = degreesToCoords(hoursToDegrees(hours) + minutesToDegrees(minutes)/12, hourHandRadius);
  
  var minuteHandCoords = degreesToCoords(minutesToDegrees(minutes), minuteHandRadius);

  var secondHandCoords = degreesToCoords(minutesToDegrees(-seconds), secondHandRadius);
  
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  
    ctx.beginPath();
    var centerHeight = window.innerHeight/2;
    var centerWidth = window.innerWidth/2;
    ctx.arc(centerWidth, centerHeight, radius, 0, Math.PI * 2, true);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#ffffff';
    ctx.moveTo(centerWidth, centerHeight);
    var minuteHand = ctx.lineTo(centerWidth + minuteHandCoords.x, centerHeight + minuteHandCoords.y)
    ctx.moveTo(centerWidth, centerHeight);
    var hourHand = ctx.lineTo(centerWidth + hourHandCoords.x, centerHeight + hourHandCoords.y);
    ctx.moveTo(centerWidth, centerHeight);
    var secondHand = ctx.lineTo(centerWidth - secondHandCoords.x, centerHeight + secondHandCoords.y);

    var knife = document.getElementById('knife');
    var issa = document.getElementById('issa');
    var savage = document.getElementById('savage');
    ctx.drawImage(knife, 0, 0, 200, 200);
    ctx.drawImage(knife, 100, 0, 200, 200);
    ctx.drawImage(issa, 500, 0);
    ctx.drawImage(knife, ctx.canvas.width - 200, 0, 200, 200);
    ctx.drawImage(knife, ctx.canvas.width - 300, 0, 200, 200);
    ctx.drawImage(issa, 500, 0);
    ctx.drawImage(savage, centerWidth - 230, centerHeight - 200);
    ctx.stroke();

    ctx.fillStyle = '#e9b53e';
    ctx.font = '24pt Times New Roman';
    ctx.fillText('clock', 650, 70)
    ctx.fillStyle = 'white';
    ctx.font = '24pt Times New Roman';
    ctx.fillText('21', centerWidth - 10, centerHeight - (secondHandRadius - 20))
    ctx.fillText('21', centerWidth + (secondHandRadius - 30), centerHeight)
    ctx.fillText('21', centerWidth - 10, centerHeight + secondHandRadius)
    ctx.fillText('21', centerWidth - secondHandRadius, centerHeight)
  }

}

setInterval(drawClock, 1000);
