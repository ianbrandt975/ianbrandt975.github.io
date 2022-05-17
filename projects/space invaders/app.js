const grid = document.querySelector('.grid')  // sets the grid as a constant and allows for adding .grid
const resultsDisplay = document.querySelector('.results') // sets the results as a constant and allows for adding .results
let currentShooterIndex = 202 // sets the starting position for the shooter
let width = 15 // defines the width of the grid in squares
let direction = 1 // defines what value rightward movement is associated with
let invadersId  // creates a unique Id for the alienInvaders
let goingRight = true // allows for the differentiation of rightward and leftward movement
let aliensRemoved = [] // creates the array for counting the number of alienInvaders removed
let results = 0 // placeholder for the results

    for (let i = 0; i < 225; i++){ // loop that essentially breaks the grid into 225 squares
        const square = document.createElement('div') // creates a new div element for the square
        grid.appendChild(square) // appends it to the grid
    }

    const squares = Array.from(document.querySelectorAll('.grid div')) // searches for all divs inside of grid and makes an array out them named 'squares'

    const alienInvaders = [ // assigns each alien invader an index and a number
      0,1,2,3,4,5,6,7,8,9,
      15,16,17,18,19,20,21,22,23,24,
      30,31,32,33,34,35,36,37,38,39 
    ]

    function draw() { // function to draw the alien invaders
        for(let i = 0; i < alienInvaders.length; i++) { // loops to draw each alien invader to its assigned square
            if (!aliensRemoved.includes(i)) { // it checks if the invader i is currently removed or not
                squares[alienInvaders[i]].classList.add('invader') // it assigns invader i the class of 'invader'
            }
        }
    }

    draw() // draws the alien invaders

    function remove() {  // a function to remove the 'invader' class from an invader.
        for(let i = 0; i < alienInvaders.length; i++) { // loops for the length of the 'alienInvaders' array
            squares[alienInvaders[i]].classList.remove('invader') // removes the i index's class of 'invader'
        }
    }

    squares[currentShooterIndex].classList.add('shooter') // assigns the 202nd square as the shooter


    function moveShooter(e) { // a function to move the shooter
        squares[currentShooterIndex].classList.remove('shooter') // removes the 'shooter' class from the current square
        switch(e.key){ // a switch case function
            case 'ArrowLeft': // called in response to an input of the left arrow
                if (currentShooterIndex % width !== 0) currentShooterIndex -= 1 // once the squares position is checked and determined to be inside the box, its index is lowered by one
                break // break :)
            case 'ArrowRight': // called in response to an input of the right arrow
                if (currentShooterIndex % width < width -1) currentShooterIndex += 1 // once the squares position is checked and determined to be inside the box, its index is increased by one.
                break // break :O
        }
        squares[currentShooterIndex].classList.add('shooter') // adds the 'shooter' class to the now 'repositioned' square
    }
    document.addEventListener('keydown', moveShooter) // called in response to a keypress, runs moveShooter

    function moveInvaders() { // a function used to move the 'invaders'
        const leftEdge = alienInvaders[0] % width === 0 // defines the left edge of the grid as the first value of the alienInvaders array.
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1 // defines the right edge of the grid as the the length of the alienInvaders array - 1, because arrays are 0 indexed
        remove() // runs the remove function to remove the 'invader' class

        if (rightEdge && goingRight) { // used to turn the group of alienInvaders when they reach the right edge
            for (let i = 0; i < alienInvaders.length; i++) { // runs for every value of the alienInvaders array
                alienInvaders[i] += width + 1 
                direction = -1 // changes the direction of movement
                goingRight = false // indicates leftward movement
            }
        }

        if(leftEdge && !goingRight){ // used to turn the group of alienInvaders when they reach the left edge
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width - 1 // moves the invaders downward once
                direction = 1 // changes the direction of movement
                goingRight = true // indicates rightward movement
            }
        }

        for(let i = 0; i < alienInvaders.length; i++){ // moves the group of alienInvaders 
            alienInvaders[i] += direction // moves the group of alienInvaders
        }

        draw() // draws the invaders in their updated positions

        if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) { // checks if a certain index has both the 'shooter' and  'invader' class
            resultsDisplay.innerHTML = 'GAME OVER' // updates the results to display 'GAME OVER'
            clearInterval(invadersId) // stops the invaders from moving
        }

        for (let i = 0; i < alienInvaders.length; i++) { // loops to check all values in the alienInvaders array
            if(alienInvaders[i] > squares.length - width){ // detects if the alienInvaders are further than squares.length
                resultsDisplay.innerHTML = 'GAME OVER' // updates the results to diplay 'GAME OVER'
                clearInterval(invadersId) // stops the invaders from moving
            }
        }

        if (aliensRemoved.length === alienInvaders.length) { // checks if the array aliensRemoved is equal to alienInvaders
            resultsDisplay.innerHTML = 'YOU WIN' // updates the results to diplay 'YOU WIN'
            clearInterval(invadersId) // stops the invaders from moving
        }

    } 

invadersId = setInterval(moveInvaders, 200) // sets the speed at which the moveInvaders function will be called at

function shoot(e) { // function that allows the player to shoot
    let laserId // sets a value for the speed of the laser to be assigned to
    let currentLaserIndex = currentShooterIndex // makes the starting position of the laser the same as the starting position of the player
    function moveLaser() { // function to move te laser
        squares[currentLaserIndex].classList.remove('laser') // removes the 'laser' class from the previous index
        currentLaserIndex -= width // moves the index backwards 15 squares (how many spaces you need to move in order to continue in a straight line)
        squares[currentLaserIndex].classList.add('laser') // adds ther 'laser' class to the updated position

        if (squares[currentLaserIndex].classList.contains('invader'))  { // checks if the space that the laser now occupies is shared with an invader
            squares[currentLaserIndex].classList.remove('laser') // removes the 'laser' class
            squares[currentLaserIndex].classList.remove('invader') // removes the 'invader' class
            squares[currentLaserIndex].classList.add('boom') // adds the 'boom' class

            setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300) // removes the 'boom' class after 300ms
            clearInterval(laserId) // stops the lasers movement

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex) // defines the constant 'aliensRemoved'
            results++ // increases the 'results' (score)
            resultsDisplay.innerHTML = "Score: " + results; // displays the score
            aliensRemoved.push(alienRemoved) // updates the length of the 'aliensRemoved' array
        }
    }
    switch(e.key){ // a switch case function for shooting
        case 'ArrowUp': // detects if the up arrow is pressed
         laserId = setInterval(moveLaser, 100) // sets the speed of the laser and initiates its movement
    }
}

document.addEventListener('keydown', shoot) // detects when the a key is pressed and runs the shoot function