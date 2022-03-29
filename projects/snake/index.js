/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  
  function Item(id, x, y, speedX, speedY) {
    
    var gameItem = {};
    gameItem.id = id;
    gameItem.x = x;
    gameItem.y = y;
    gameItem.speedX = speedX;
    gameItem.speedY = speedY;
    gameItem.width = $(id).width();
    gameItem.height = $(id).height();
    return gameItem;
  
  }

  var snake = Item("#snake", 100, 100, 0, 0);
  
  

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', KeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', KeyUp)
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    
    moveSnake();
    

  }
  
  /* 
  Called in response to events.
  */
  function KeyUp(event){

    var key = event.which;

    if(key === KEY.UP){
      snake.speedY = 0;
    }
    if(key === KEY.DOWN){
      snake.speedY = 0;
    }
    if(key === KEY.LEFT){
      snake.speedX = 0;
    }
    if(key === KEY.RIGHT){
      snake.speedX = 0;
    }

  }
  
  function KeyDown(event) {

    var key = event.which
    
    if(key === KEY.UP){
      snake.speedY = -20;
    }
    if(key === KEY.DOWN){
      snake.speedY = 20;
    }
    if(key === KEY.LEFT){
      snake.speedX = -20;
    }
    if(key === KEY.RIGHT){
      snake.speedX = 20;
    }

  }

 

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  var KEY = {
   
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,

  }



  function moveSnake(){
    
    snake.y += snake.speedY;
    $("#snake").css('top', snake.y);

    snake.x += snake.speedX;
    $("#snake").css('left', snake.x);

  }
  
  
  

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
