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
  var apple = Item("#apple", 140, 140, 0, 0 );
  
  var BOARD_WIDTH = 440;
  var BOARD_HEIGHT = 440;
  var direction;
  
  

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', KeyDown);                           // change 'eventType' to the type of event you want to handle
 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    
    createFruit();
    moveSnake();
    doCollide();
    boundaryCollision();

  }
  
  /* 
  Called in response to events.
  */
  
  function createFruit(){
    $("#apple").css('top', apple.y);
    $("#apple").css('left', apple.x);
  }


  function KeyDown(event) {

    var key = event.which
    
    if(key === KEY.UP && direction !== "South"){
      direction = "North";
      snake.speedX = 0;
      snake.speedY = -20;
    }
    if(key === KEY.DOWN && direction !== "North"){
      direction = "South";
      snake.speedX = 0;
      snake.speedY = 20;
    }
    if(key === KEY.LEFT && direction !== "East"){
      direction = "West";
      snake.speedY = 0;
      snake.speedX = -20;
    }
    if(key === KEY.RIGHT && direction !== "West"){
      direction = "East";
      snake.speedY = 0;
      snake.speedX = 20;
    }

  }

  function boundaryCollision() {
    
    if(snake.x > BOARD_WIDTH - 20 || snake.x < 0){
      endGame();
    }
    if(snake.y > BOARD_HEIGHT - 20 || snake.y < 0){
      endGame();
    }

  }

  function doCollide(){
    if(snake.x === fruit.x && snake.y === fruit.y){
      var randomX = Math.random() * 440;  
      var randomY = Math.random() * 440;  
      fruit.x = (randomX % 20) + randomX;
      fruit.y = (randomY % 20) + randomY;

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
