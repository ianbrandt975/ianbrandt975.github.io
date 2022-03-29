/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 120;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_HEIGHT = $("#board").height();
  const BOARD_WIDTH = $("#board").width();

  
  var KEY = {
    "W": 87,
    "S": 83,
    "UP": 38,
    "DOWN": 40
  }
  
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
  
  var updatedScore1 = 0;
  var updatedScore2 = 0;
  

  
  
  
  $("#s1").text("Player 1: " + updatedScore1);
  $("#s2").text("Player 2: " + updatedScore2);

  var ball = Item("#ball", 100, 10, 0, 0);
  var leftPaddle = Item("#leftPaddle", 10 , 100, 0, 0);
  var rightPaddle = Item("#rightPaddle", 823, 100, 0, 0);

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).ready(startBall);
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                              // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  
   function newFrame() {
    
    gameOver();
    restrItem();
    moveItem();
    wallCollision();
    collision();
    increaseSpeed();

  }
  
  /* 
  Called in response to events.
  */
  
 

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  function startBall(){

    ball.x = BOARD_WIDTH / 2;
    ball.y = BOARD_HEIGHT / 2;

    ball.speedX = (Math.random() * 3 + 1.5) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() * 3 + 1) * (Math.random() > 0.5 ? -1 : 1);

  }

  function gameOver(){
    
    if(updatedScore1 > 5){
      updatedScore1 = "WINS";
      endGame();
    }

    else if(updatedScore2 > 5){
      updatedScore2 = "WINS";
      endGame();
    }

  }

  
  function moveItem(){
    
    leftPaddle.y += leftPaddle.speedY;
    $("#leftPaddle").css('top', leftPaddle.y);
    
    rightPaddle.y += rightPaddle.speedY;
    $("#rightPaddle").css('top', rightPaddle.y);

    ball.y += ball.speedY;
    $("#ball").css('top', ball.y);
    
    ball.x += ball.speedX;
    $("#ball").css('left', ball.x);


  }

  function restrItem(){

    if (leftPaddle.y + leftPaddle.height > BOARD_HEIGHT){
      leftPaddle.y = BOARD_HEIGHT - leftPaddle.height;
    }
    if (leftPaddle.y < 0){
      leftPaddle.y = 0;
    }

    if (rightPaddle.y + rightPaddle.height > BOARD_HEIGHT){
      rightPaddle.y = BOARD_HEIGHT - rightPaddle.height;
    }
    if (rightPaddle.y < 0){
      rightPaddle.y = 0;
    }
    
    
  }

  function wallCollision(){
    if(ball.x + ball.width > BOARD_WIDTH){
      ball.speedX = -ball.speedX;
      updatedScore1++;
      $("#s1").text("Player 1: " + updatedScore1);
      startBall();
    }
    if(ball.x < 0){
      ball.speedX = -ball.speedX;
      updatedScore2++;
      $("#s2").text("Player 2: " + updatedScore2);
      startBall();
    }
    if(ball.y < 0){
      ball.speedY = -ball.speedY;
    }
    if(ball.y + ball.height > BOARD_HEIGHT){
      ball.speedY = -ball.speedY;
    }
  }





  function handleKeyDown(event) {
    var key = event.which;
    if (key === KEY.UP) {
      rightPaddle.speedY = -2;
    }
    if (key === KEY.DOWN) {
      rightPaddle.speedY = 2;
    }
    if (key === KEY.W) {
      leftPaddle.speedY = -2;
    }
    if (key === KEY.S) {
      leftPaddle.speedY = 2;
    }
  }

  function handleKeyUp(event) {
    var key = event.which;
    if (key === KEY.UP) {
      rightPaddle.speedY = 0;
    }
    if (key === KEY.DOWN) {
      rightPaddle.speedY = 0;
    }
    if (key === KEY.W) {
      leftPaddle.speedY = 0;
    }
    if (key === KEY.S) {
      leftPaddle.speedY = 0;
    }
  }
  
  
  function collision() {
    if(doCollide(ball, leftPaddle)){
      
      ball.speedX = -ball.speedX;
      ball.speedY = ball.speedY;
      
    }
    
    if(doCollide2(ball, rightPaddle)){
      
      ball.speedX = -ball.speedX;
      ball.speedY = ball.speedY;
      if (b){
        
      }
  
    }
  }
  
  
  function doCollide(ball, leftPaddle) {  
  
    ball.x = ball.x;
    ball.rightX = ball.x + $("#ball").width();
    ball.topY = ball.y;
    ball.bottomY = ball.y + $("#ball").height();
    

    leftPaddle.x = leftPaddle.x;
    leftPaddle.rightX = leftPaddle.x + $("#leftPaddle").width();
    leftPaddle.topY = leftPaddle.y;
    leftPaddle.bottomY = leftPaddle.y + $("#leftPaddle").height();
   
	
    if((ball.rightX > leftPaddle.x) &&
      (ball.x < leftPaddle.rightX) &&
       (ball.bottomY > leftPaddle.topY) &&
       (ball.topY < leftPaddle.bottomY)) {
      return true;
    } 

    else {
      return false;
    }
		
  }

  function doCollide2(ball, rightPaddle) {  
  
    ball.x = ball.x;
    ball.rightX = ball.x + $("#ball").width();
    
    ball.topY = ball.y;
    ball.bottomY = ball.y + $("#ball").height();
    

    rightPaddle.x = rightPaddle.x; 
    rightPaddle.rightX = rightPaddle.x + $("#rightPaddle").width();
    
    rightPaddle.topY = rightPaddle.y;
    rightPaddle.bottomY = rightPaddle.y + $("#rightPaddle").height();
   
	
    if((ball.rightX > rightPaddle.x) &&
      (ball.x < rightPaddle.rightX) &&
       (ball.bottomY > rightPaddle.topY) &&
       (ball.topY < rightPaddle.bottomY)) {
      return true;
    } else {
      return false;
    }
		
  }
  

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}