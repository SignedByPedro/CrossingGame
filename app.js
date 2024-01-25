/* Death Zone */

class DeathZone {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    // Parameters for location of zone
    this.top = 50;
    this.width = 650;
    this.height = 250;

    // create the HTML elements and default styling of the zone
    this.element = document.createElement("img");
    this.element.style.backgroundImage = "url(./images/water-surface.png)";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.backgroundColor = "blue";

    //append the zone to the Game Screen
    this.gameScreen.appendChild(this.element);
  }
}

/* DepositPrizeZone */

// Class for the invisible zone where the player will need to deposit the prize.
// This zone is also the starting zone where the player is at the start of the game.
class DepositPrizeZone {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    // parameters to ensure the zone is at the bottom of the gamescreen and only occupies "one move's" worth of height.
    this.top = 600;
    this.width = 650;
    this.height = 50;

    //The HTML element and default styling of the zone
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;

    //append zone to the Game Screen
    this.gameScreen.appendChild(this.element);
  }
}

/* GetPrizeZone */

//  class for the zone where the player will acquire a prize upon reaching
// Takes place at the highest layer of the gamescreen with a "height" of 50.
class GetPrizeZone {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    // Parameters for location of zone
    this.top = 0;
    this.width = 650;
    this.height = 50;

    // create the HTML elements and default styling of the zone
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;

    //append the zone to the Game Screen
    this.gameScreen.appendChild(this.element);
  }
}

/* obstacles */

class Obstacle {
  constructor(
    gameScreen,
    speed,
    height,
    width,
    top,
    startPosition,
    moveDirection,
    imgSrc
  ) {
    this.gameScreen = gameScreen;
    this.speed = speed;
    this.top = top;
    this.startPosition = startPosition;
    this.moveDirection = moveDirection; //moveDirection will only be either "left" or "right"

    // Define size of obstacle
    this.width = width;
    this.height = height;
    this.left = this.startPosition;

    // Define obstacle speed on the Y axis

    // create the HTML element and default styling
    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.setAttribute("id", "obstacles");
    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.top = `${top}px`;
    this.element.style.left = `${this.left}px`;

    //append obstacles to the Game Screen
    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${top}px`;
  }

  move() {
    //drop the obstacles 3px to the bottom
    if (this.moveDirection === "left") {
      this.left -= this.speed;
      this.updatePosition();
    } else {
      this.left += this.speed;
      this.updatePosition();
    }
  }
}

/* player */

class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;

    // horizontal position of the player (via position absolute)
    this.left = left;
    // vertical position of the player (via position absolute)
    this.top = top;
    // width of the player
    this.width = width;
    //  height of the player
    this.height = height;
    // direction of the player's moving horizontally
    // create the img tag fro the player, define src and default
    this.element = document.createElement("img");
    this.element.setAttribute("id", "player");
    this.element.style.position = "absolute";
    this.element.src = imgSrc;
    //  set up default element's properties
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.top = `${top}px`;
    this.element.style.left = `${left}px`;

    //append Player to the Game Screen
    this.gameScreen.appendChild(this.element);
  }

  // function that limits the player's boundaries
  stayInPlay() {
    // Right Side boundary
    if (this.left + this.width > this.gameScreen.offsetWidth) {
      this.left = this.gameScreen.offsetWidth - this.width;
    }

    // Left side boundary
    else if (this.left < 0) {
      this.left = 0;
    }

    // handle top and bottom borders
    // bottom side boundary
    if (this.top + this.height > this.gameScreen.offsetHeight) {
      this.top = this.gameScreen.offsetHeight - this.height;

      // top side boundary
    } else if (this.top < 0) {
      this.top = 0;
    }

    this.updatePosition();
  }

  // Updates the Position of the car in the CSS
  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  gotPrize(getPrize) {
    // .getBoundinClientRect() return info about top, left, right, bottom, width, height of an html element

    const playerRect = this.element.getBoundingClientRect();
    const getPrizeRect = getPrize.element.getBoundingClientRect();

    if (
      playerRect.left < getPrizeRect.right &&
      playerRect.right > getPrizeRect.left &&
      playerRect.top < getPrizeRect.bottom &&
      playerRect.bottom > getPrizeRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }

  touchDepositArea(prizeCheck) {
    // .getBoundinClientRect() return info about top, left, right, bottom, width, height of an html element

    const playerRect = this.element.getBoundingClientRect();
    const prizeCheckRect = prizeCheck.element.getBoundingClientRect();

    if (
      playerRect.left < prizeCheckRect.right &&
      playerRect.right > prizeCheckRect.left &&
      playerRect.top < prizeCheckRect.bottom &&
      playerRect.bottom > prizeCheckRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }

  didCollide(obstacle) {
    // .getBoundinClientRect() return info about top, left, right, bottom, width, height of an html element

    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}

/* script */

window.onload = function () {
  // Variables for each button so we can easily call them.
  let playButton = document.getElementById("play-button");
  let instructionsButton = document.getElementById("instructions-button");
  let creditsbutton = document.getElementById("credits-button");
  let restartButton = document.querySelectorAll(".restart-button");

  // Declare the variable that will be the game itself
  let game;

  // Actions of each created button
  playButton.addEventListener("click", function () {
    startGame();
  });

  instructionsButton.addEventListener("click", function () {
    instructions();
  });

  creditsbutton.addEventListener("click", function () {
    credits();
  });

  for (let i = 0; i < restartButton.length; i++) {
    let currentRestartButton = restartButton[i];
    currentRestartButton.addEventListener("click", function () {
      console.log("clicked button");
      location.reload();
    });
  }

  // function to start the game, assinging the game variable to the Game class and initiating its start() function
  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
    backgroundMusic.play();
  }

  function instructions() {
    console.log("instructions");
    let instructionsScreen = document.getElementById("instructions-screen");
    let startScreen = document.getElementById("start-screen");
    startScreen.style.display = "none";
    instructionsScreen.style.display = "block";
  }

  function credits() {
    console.log("credits");
    let creditsScreen = document.getElementById("credits-screen");
    let startScreen = document.getElementById("start-screen");
    startScreen.style.display = "none";
    creditsScreen.style.display = "block";
  }

  // function that handles keydown events
  function handleKeyDown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];
    // Player movement happens based only on the possible keystrokes
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      // player only moves when game is loaded
      if (game && !game.prizeInHand) {
        switch (key) {
          case "ArrowLeft":
            game.player.left += -50;
            game.player.element.src = "./images/ash left.png";
            break;

          case "ArrowUp":
            game.player.top += -50;
            game.player.element.src = "./images/ash back.png";
            break;

          case "ArrowRight":
            game.player.left += 50;
            game.player.element.src = "./images/ash right.png";
            break;

          case "ArrowDown":
            game.player.top += 50;
            game.player.element.src = "./images/ash fte.png";
            break;
        }
      }
      if (game && game.prizeInHand) {
        switch (key) {
          case "ArrowLeft":
            game.player.left += -50;
            game.player.element.src = "./images/ash left prize.png";

            break;

          case "ArrowUp":
            game.player.top += -50;
            game.player.element.src = "./images/ash back prize.png";

            break;

          case "ArrowRight":
            game.player.left += 50;
            game.player.element.src = "./images/ash right prize.png";

            break;

          case "ArrowDown":
            game.player.top += 50;
            game.player.element.src = "./images/ash fte prize.png";

            break;
        }
      }
    }
  }
  // event listened to grab the input made by the user and translate it into the movement of the character
  window.addEventListener("keydown", handleKeyDown);
};

/* game */

class Game {
  constructor() {
    // Variables to later refer to the different possible screens of the webpage
    this.startScreen = document.getElementById("start-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.endScreen = document.getElementById("end-screen");
    this.instructionsScreen = document.getElementById("instructions-screen");
    this.creditsScreen = document.getElementById("credits-screen");
    this.victoryScreen = document.getElementById("victory-screen");
    this.gameContainer = document.getElementById("game-container");

    // Creating the zone property where the player acquires the prize
    this.getPrize = new GetPrizeZone(this.gameScreen);

    // Variable for frame count
    this.frameCount = 0;

    // Creating prize deposit zone property
    this.depositPrize = new DepositPrizeZone(this.gameScreen);

    // Player's life system
    this.lives = 5;

    // Controls of the gamespeed
    this.gamespeed = 0.5;

    // Player's score system
    this.score = 0;

    // Visual queue for the score
    this.scoreArray = [];

    // Game State Boolean
    this.gameIsOver = false;

    // game over flag
    this.gameIsOver = false;

    //  Check to see if Player got prize from prize area
    this.prizeInHand = false;

    // Creating the player property
    this.player = new Player(
      this.gameScreen,
      300,
      600,
      50,
      50,
      "./images/ash back.png"
    );

    //might be deprecated, UNSURE
    // Tracker if player is on top of an obstacle)
    // this.playerInObstacle = false;

    // Create the obstacles array of arrays
    this.obstaclesArray = [[], [], [], [], [], [], [], [], [], [], []];

    //define the height and width we want to apply to the gameScreen once game is running
    this.height = 650;
    this.width = 650;

    // gameScreen will by default have 0x
    // When variable game is assigned to Game class and initialized, the gameScreen will have the height and width defined above.
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
  }

  // Method to start the game
  start() {
    // Change the  "windows" to display and to disappear
    this.startScreen.style.display = "none";
    this.endScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameContainer.style.display = "block";

    // Run the gameloop
    this.gameLoop();
  }

  // Method of the gameloop
  gameLoop() {
    // checks if the game is over to interrupt the game loop, else is just runs the update method
    if (this.gameIsOver) {
      return;
    }

    this.update();

    // javascript magic to make animations and the game update via frames
    window.requestAnimationFrame(() => this.gameLoop());
    // increased the frameCount variable by 1 each time it loops so we can store the current frame as the game is being played
    this.frameCount++;
  }

  // Method that handles the first 5 rows of obstacles (aka the cars)
  // It handles spawns (pushing to obstaclesArray), collision with player and removal of obstacles once they are outside of specified boundaries.
  updateGroupObjectsGround(arr, order) {
    // Check for collision and position of each obstacle in the given array
    for (let j = 0; j < arr.length; j++) {
      // grabs an obstacle and runs its move method so they actively move throughout the screen
      const obstacle = arr[j];
      obstacle.move();

      // Check if the player collided with an obstacle
      if (this.player.didCollide(obstacle)) {
        // player returns to his starting position
        this.player.left = 300;
        this.player.top = 600;

        // Reduce player's life by 1
        this.lives--;
        // player loses the prize if he was carrying it
        this.prizeInHand = false;
        damageSound.play();
      }

      // Check if the obstacle is beyond the given boundaries (either left or right)
      else if (obstacle.left < -100 || obstacle.left + obstacle.width > 750) {
        // Remove the obstacle from the HTML
        obstacle.element.remove();

        // Remove the object from the array
        this.obstaclesArray[order].splice(j, 1);
      }
    }

    // with the method parameter "order", we specify which object we want to push at a given time and which array inside the main array do we want to push it to.
    // we can control in with frame interval each obstacle spawns in their respective row and the max amount of objects per row
    if (order == 0) {
      if (
        (this.frameCount % 110) / (this.gamespeed * 100) === 0 &&
        this.obstaclesArray[0].length < 3
      ) {
        this.obstaclesArray[0].push(
          new Obstacle(
            this.gameScreen,
            1 * this.gamespeed,
            50,
            50,
            550,
            700,
            "left",
            "./images/mew.gif"
          )
        );
      }
    } else if (order == 1) {
      if (
        (this.frameCount % 130) / (this.gamespeed * 100) === 0 &&
        this.obstaclesArray[1].length < 3
      ) {
        this.obstaclesArray[1].push(
          new Obstacle(
            this.gameScreen,
            1.5 * this.gamespeed,
            50,
            50,
            500,
            -100,
            "right",
            "./images/pikachu.gif"
          )
        );
      }
    } else if (order == 2) {
      if (
        (this.frameCount % 130) / (this.gamespeed * 100) === 0 &&
        this.obstaclesArray[2].length < 3
      ) {
        this.obstaclesArray[2].push(
          new Obstacle(
            this.gameScreen,
            2 * this.gamespeed,
            50,
            50,
            450,
            700,
            "left",
            "./images/wigglytuff.gif"
          )
        );
      }
    } else if (order == 3) {
      if (
        (this.frameCount % 200) / (this.gamespeed * 100) === 0 &&
        this.obstaclesArray[3].length < 3
      ) {
        this.obstaclesArray[3].push(
          new Obstacle(
            this.gameScreen,
            1.5 * this.gamespeed,
            50,
            50,
            400,
            -100,
            "right",
            "./images/snorlax.gif"
          )
        );
      }
    } else if (order == 4) {
      if (
        (this.frameCount % 130) / (this.gamespeed * 100) === 0 &&
        this.obstaclesArray[4].length < 3
      ) {
        this.obstaclesArray[4].push(
          new Obstacle(
            this.gameScreen,
            2.5 * this.gamespeed,
            50,
            100,
            350,
            650,
            "left",
            "./images/charizard.gif"
          )
        );
      }
    }
  }

  // Method that handles the last 5 rows of obstacles (aka the trunks)(pain in the butt to finally get right)
  // It handles spawns (pushing to obstaclesArray), collision with player and removal of obstacles once they are outside of specified boundaries.
  updateGroupObjectsWater(arr, order, obstaclesArray) {
    // Check for collision and position of each obstacle in the given array
    for (let j = 0; j < arr.length; j++) {
      // grabs an obstacle and runs its move method so they actively move throughout the screen
      const obstacle = arr[j];
      obstacle.move();

      // Check if the obstacle is beyond the given boundaries (either left or right)
      if (obstacle.left < -200 || obstacle.left + obstacle.width > 850) {
        // Remove the obstacle from the HTML
        obstacle.element.remove();

        // Remove the object from the array
        this.obstaclesArray[order].splice(j, 1);
      }
    }

    // with the method parameter "order", we specify which object we want to push at a given time and which array inside the main array do we want to push it to.
    // we can control in with frame interval each obstacle spawns in their respective row and the max amount of objects per row
    if (order == 5) {
      if (
        (this.frameCount % 200) / (this.gamespeed * 20) === 0 &&
        this.obstaclesArray[5].length < 3
      ) {
        this.obstaclesArray[5].push(
          new Obstacle(
            this.gameScreen,
            2 * this.gamespeed,
            50,
            150,
            250,
            650,
            "left",
            "./images/gyarados.gif"
          )
        );
      }
    }

    if (order == 6) {
      if (
        (this.frameCount % 150) / (this.gamespeed * 20) === 0 &&
        this.obstaclesArray[6].length < 3
      ) {
        this.obstaclesArray[6].push(
          new Obstacle(
            this.gameScreen,
            1.5 * this.gamespeed,
            50,
            100,
            200,
            -100,
            "right",
            "./images/magikarp.gif"
          )
        );
      }
    }

    if (order == 7) {
      if (
        (this.frameCount % 150) / (this.gamespeed * 20) === 0 &&
        this.obstaclesArray[7].length < 3
      ) {
        this.obstaclesArray[7].push(
          new Obstacle(
            this.gameScreen,
            2 * this.gamespeed,
            50,
            200,
            150,
            650,
            "left",
            "./images/kyogre.gif"
          )
        );
      }
    }

    if (order == 8) {
      if (
        (this.frameCount % 150) / (this.gamespeed * 20) === 0 &&
        this.obstaclesArray[8].length < 3
      ) {
        this.obstaclesArray[8].push(
          new Obstacle(
            this.gameScreen,
            2 * this.gamespeed,
            50,
            100,
            100,
            -100,
            "right",
            "./images/milotic.gif"
          )
        );
      }
    }
    if (order == 9) {
      if (
        (this.frameCount % 150) / (this.gamespeed * 20) === 0 &&
        this.obstaclesArray[9].length < 3
      ) {
        this.obstaclesArray[9].push(
          new Obstacle(
            this.gameScreen,
            2.5 * this.gamespeed,
            50,
            150,
            50,
            650,
            "left",
            "./images/lapras.gif"
          )
        );
      }
    }
  }

  // Method that runs each gameloop that ensures that the various systems of the game are updating as the loop goes
  // this applies to score, lives, winning condition, losing condition and collision checks for the water zone.
  update() {
    console.log(this.gamespeed);

    // Set background to darken when the the gameScreen is running
    if (
      this.gameScreen.style.display === "block" ||
      this.victoryScreen.style.display === "block" ||
      this.endScreen.style.display === "block" ||
      this.creditsScreen.style.display === "block" ||
      this.instructionsScreen.style.display === "block"
    ) {
      document.body.style.backgroundImage =
        "url('./images/backgroundDark.png')";
    }

    // Score and lives system
    let score = document.getElementById("score");
    let lives = document.getElementById("lives");

    // End/lose the game if lives are 0
    if (this.lives <= 0) {
      this.endGame();
    }

    if (this.score === 8) {
      this.victoryGame();
    }

    // Player's method for ensuring it stays inside of the gameScreen's boundaries
    this.player.stayInPlay();

    // Check to see if player has collided with the prize zone
    if (this.player.gotPrize(this.getPrize)) {
      // If player did collide, then he will have the prize in hand.
      this.prizeInHand = true;
      this.player.element.src = "./images/ash back prize.png";
    }

    // Running the methods for the first 5 rows of obstacles (cars)
    this.updateGroupObjectsGround(this.obstaclesArray[0], 0);
    this.updateGroupObjectsGround(this.obstaclesArray[1], 1);
    this.updateGroupObjectsGround(this.obstaclesArray[2], 2);
    this.updateGroupObjectsGround(this.obstaclesArray[3], 3);
    this.updateGroupObjectsGround(this.obstaclesArray[4], 4);

    // Running the methods for the first 5 rows of obstacles (trunks)
    this.updateGroupObjectsWater(
      this.obstaclesArray[5],
      5,
      this.obstaclesArray
    );
    this.updateGroupObjectsWater(
      this.obstaclesArray[6],
      6,
      this.obstaclesArray
    );
    this.updateGroupObjectsWater(
      this.obstaclesArray[7],
      7,
      this.obstaclesArray
    );
    this.updateGroupObjectsWater(
      this.obstaclesArray[8],
      8,
      this.obstaclesArray
    );
    this.updateGroupObjectsWater(
      this.obstaclesArray[9],
      9,
      this.obstaclesArray
    );

    // Test 1 with this method
    let collisionCheck = false;

    if (
      this.obstaclesArray[5].some((obstacle) =>
        this.player.didCollide(obstacle)
      ) ||
      this.obstaclesArray[6].some((obstacle) =>
        this.player.didCollide(obstacle)
      ) ||
      this.obstaclesArray[7].some((obstacle) =>
        this.player.didCollide(obstacle)
      ) ||
      this.obstaclesArray[8].some((obstacle) =>
        this.player.didCollide(obstacle)
      ) ||
      this.obstaclesArray[9].some((obstacle) =>
        this.player.didCollide(obstacle)
      )
    ) {
      collisionCheck = true;
      const collidedObstacle =
        this.obstaclesArray[5].find((obstacle) =>
          this.player.didCollide(obstacle)
        ) ||
        this.obstaclesArray[6].find((obstacle) =>
          this.player.didCollide(obstacle)
        ) ||
        this.obstaclesArray[7].find((obstacle) =>
          this.player.didCollide(obstacle)
        ) ||
        this.obstaclesArray[8].find((obstacle) =>
          this.player.didCollide(obstacle)
        ) ||
        this.obstaclesArray[9].find((obstacle) =>
          this.player.didCollide(obstacle)
        );

      if (collidedObstacle.moveDirection === "left") {
        this.player.left -= collidedObstacle.speed;
      } else if (collidedObstacle.moveDirection === "right") {
        this.player.left += collidedObstacle.speed;
      }
    }
    if (!collisionCheck && this.player.top >= 50 && this.player.top < 300) {
      this.player.left = 300;
      this.player.top = 600;
      // Reduce player's life by 1
      this.lives--;
      this.prizeInHand = false;
      collisionCheck = false;
      this.player.element.src = "./images/ash fte.png";
      damageSound.play();
    }

    // Check the amount of player lives to remove a heart image
    if (this.lives === 4) {
      document.getElementById("heart-1").style.display = "none";
    } else if (this.lives === 3) {
      document.getElementById("heart-1").style.display = "none";
      document.getElementById("heart-2").style.display = "none";
    } else if (this.lives === 2) {
      document.getElementById("heart-1").style.display = "none";
      document.getElementById("heart-2").style.display = "none";
      document.getElementById("heart-3").style.display = "none";
    } else if (this.lives === 1) {
      document.getElementById("heart-1").style.display = "none";
      document.getElementById("heart-2").style.display = "none";
      document.getElementById("heart-3").style.display = "none";
      document.getElementById("heart-4").style.display = "none";
    }

    // Check the ammount of badges to add them
    if (this.score === 1) {
      document.getElementById("badge-1").style.display = "block";
    } else if (this.score === 2) {
      document.getElementById("badge-1").style.display = "block";
      document.getElementById("badge-2").style.display = "block";
    } else if (this.score === 3) {
      document.getElementById("badge-1").style.display = "block";
      document.getElementById("badge-2").style.display = "block";
      document.getElementById("badge-3").style.display = "block";
    } else if (this.score === 4) {
      document.getElementById("badge-1").style.display = "block";
      document.getElementById("badge-2").style.display = "block";
      document.getElementById("badge-3").style.display = "block";
      document.getElementById("badge-4").style.display = "block";
    } else if (this.score === 5) {
      document.getElementById("badge-1").style.display = "block";
      document.getElementById("badge-2").style.display = "block";
      document.getElementById("badge-3").style.display = "block";
      document.getElementById("badge-4").style.display = "block";
      document.getElementById("badge-5").style.display = "block";
    } else if (this.score === 6) {
      document.getElementById("badge-1").style.display = "block";
      document.getElementById("badge-2").style.display = "block";
      document.getElementById("badge-3").style.display = "block";
      document.getElementById("badge-4").style.display = "block";
      document.getElementById("badge-5").style.display = "block";
      document.getElementById("badge-6").style.display = "block";
    } else if (this.score === 7) {
      document.getElementById("badge-1").style.display = "block";
      document.getElementById("badge-2").style.display = "block";
      document.getElementById("badge-3").style.display = "block";
      document.getElementById("badge-4").style.display = "block";
      document.getElementById("badge-5").style.display = "block";
      document.getElementById("badge-6").style.display = "block";
      document.getElementById("badge-7").style.display = "block";
    } else if (this.score === 8) {
      document.getElementById("badge-1").style.display = "block";
      document.getElementById("badge-2").style.display = "block";
      document.getElementById("badge-3").style.display = "block";
      document.getElementById("badge-4").style.display = "block";
      document.getElementById("badge-5").style.display = "block";
      document.getElementById("badge-6").style.display = "block";
      document.getElementById("badge-7").style.display = "block";
      document.getElementById("badge-8").style.display = "block";
    }

    // Check if player has prize in hand and has reached the deposit zone (aka starting zone)
    if (
      this.prizeInHand === true &&
      this.player.touchDepositArea(this.depositPrize) === true
    ) {
      // When player reaches the deposit zone, remove prize in hand, add to total score and increase the overall speed of all obstacles.
      this.prizeInHand = false;
      this.score++;
      this.gamespeed += 0.05;
      this.player.element.src = "./images/ash fte.png";
      successSound.play();
      console.log(`Game speed has now been increased to${this.gamespeed}`);
    }
  }

  // Method that ends the game
  endGame() {
    // Removes player
    this.player.element.remove();

    // Remove all obstacles from the array of obstacles
    this.obstaclesArray.forEach((array) => {
      array.forEach((obstacle) => {
        // remove from the HTML
        obstacle.element.remove();
      });
    });

    // variable becomes true
    this.gameIsOver = true;

    // gameScreen and container are no longer displayed
    this.gameScreen.style.display = "none";
    this.gameContainer.style.display = "none";

    // show end game screen
    this.endScreen.style.display = "block";
  }

  // method for victory screen
  victoryGame() {
    // Remove player
    this.player.element.remove();

    // Remove all obstacles from the array of obstacles
    this.obstaclesArray.forEach((array) => {
      array.forEach((obstacle) => {
        // remove from the HTML
        obstacle.element.remove();
      });
    });

    // variable becomes true
    this.gameIsOver = true;

    // gameScreen and container are no longer displayed
    this.gameScreen.style.display = "none";
    this.gameContainer.style.display = "none";

    // show victory game screen
    this.victoryScreen.style.display = "block";

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    let victoryMusic = new Audio("./audio/pokemon masters league.wav");
    victoryMusic.play();
  }
}

let backgroundMusic = new Audio("./audio/theme song.wav");
let damageSound = new Audio("./audio/damage.wav");
let badgeSound = new Audio("./audio/badge.wav");
let successSound = new Audio("./audio/success.wav");

backgroundMusic.loop = true;
