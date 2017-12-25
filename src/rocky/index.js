// rocky index.js
var rocky = require('rocky');

// Global object to store weather data
var kaka;

rocky.on('hourchange', function(event) {
  // Send a message to fetch the weather information (on startup and every hour)
  rocky.postMessage({'fetch': true});
});

rocky.on('message', function(event) {
  // Receive a message from the mobile device (pkjs)
  var message = event.data;

  if (message.kaka) {
    // Save the weather data
    kaka = message.kaka;

    // Request a redraw so we see the information
    rocky.requestDraw();
  }
});

rocky.on('draw', function(event) {
  var ctx = event.context;
  var d = new Date();

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  ctx.fillStyle = 'lightgray';
  ctx.textAlign = 'center';
  ctx.font = '16px Gothic';
  ctx.fillText('Axis fredagskaka', ctx.canvas.unobstructedWidth / 2, 10);
  ctx.fillText('Fredagskakan.se', ctx.canvas.unobstructedWidth / 2, 145);
  // Draw the conditions (before clock hands, so it's drawn underneath them)
  if (kaka) {
    drawKaka(ctx, kaka);

  }
});


function drawKaka(ctx, kaka) {
  var kakaString;
  var dateString;
  if(kaka.kaka == 'Ingen'){
    kakaString = 'Ingen kaka \ndenna vecka';
    dateString = ':(';
  }else{
    kakaString = 'Veckans kaka är \n' + kaka.kaka;
    dateString = 'Den serveras den \n' + kaka.date;
  }

  // Draw the text, top center
  ctx.fillStyle = 'lightgray';
  ctx.textAlign = 'center';
  ctx.font = '18px Gothic';
  ctx.fillText(kakaString, ctx.canvas.unobstructedWidth / 2, 40);
  ctx.fillText(dateString, ctx.canvas.unobstructedWidth / 2, 90);
}