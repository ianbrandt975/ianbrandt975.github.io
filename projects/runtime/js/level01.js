var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
        function createSawBlade(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = groundY - y;
            game.addGameItem(sawBladeHitZone);   
            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -10;
            obstacleImage.y = -10; 
        }
        
        function createMyObstacle(x,y){
            var hitZoneSize = 25;
            var damageFromObstacle = 30;
            var myObstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            myObstacleHitZone.x = x;
            myObstacleHitZone.y = groundY - y;
            game.addGameItem(myObstacleHitZone);
            var myObstacleImage = draw.bitmap('img/Demon_sprite.png');
            myObstacleHitZone.addChild(myObstacleImage);
            myObstacleImage.x = -10;
            myObstacleImage.y = -10;
        }
    
        createSawBlade(500, 150);
        createSawBlade(400, 100);
        createSawBlade(300, 125);
        createMyObstacle(300, 100);
        
            var audio = new Audio('img/Doom-E2M1_SC-8850.mp3');//audio :)
                audio.play();
            document.getElementById("myAudio").loop = true;
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01; 
}
