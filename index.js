document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementsByClassName("game-board")[0];
  const gameBoardSize = 600 // gameBoard.offsetWidth // width includes border 
  let cellSize = 20;
  let gameStarted = false;
  let score = 0;
  let food = { x: 240, y: 200 };
  let snake = [
    { x: 160, y: 200 },
    { x: 140, y: 200 },
    { x: 120, y: 200 },
  ];
  let dx = 0; // displacement on x axis
  let dy = 0; // displacement on y axis
  // drawScoreBoard
  function drawScoreBoard() {
    const scoreBoard = document.getElementById("score-board");
    scoreBoard.textContent = score;
  }
  // draw div of width 20 and height 20
  function drawDiv(x, y, classname) {
    // console.log('drawdiv')
    const div = document.createElement("div");
    div.classList.add(classname);
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    return div;
  }
  function drawFoodAndSnake() {
    // if anything drawn previously first clean it
    gameBoard.innerHTML = "";
    // wipe out everything and redraw with new coordinates when snake moves
    // draw food
    const foodElement = drawDiv(food.x, food.y, "food");
    gameBoard.appendChild(foodElement);
    // draw snake
    console.log("draw snake ")
    snake.map((snakePart) =>
      gameBoard.appendChild(drawDiv(snakePart.x, snakePart.y, "snake"))
    );
  }
  // food movement
  function moveFood() {
    let newX, newY
    do {
      newX = Math.floor(Math.random() * ((gameBoardSize - cellSize) / cellSize)) * cellSize
      newY = Math.floor(Math.random() * ((gameBoardSize - cellSize) / cellSize)) * cellSize

    } while (snake.some(snakePart => snakePart.x == newX && snakePart.y == newY))
    food = { x: newX, y: newY }
  }
   // snake movement
function updateSnake(){
  snake.unshift({ // add elt at begining
    x: snake[0].x + dx,
    y: snake[0].y + dy
  })
  //collison
  console.log('snake 0 ',snake[0],"food",food)
  if (snake[0].x == food.x && snake[0].y == food.y) {
    score += 5
    // show updated score
    drawScoreBoard();
    // move the food
    moveFood()
  }else {
    snake.pop() // remove last elt
  }
}
 // check for game over
  function isGameOver() {
    // check snake body hit itself
    for(let i=1;i<snake.length;i++){
      if(snake[0].x==snake[i].x && snake[0].y==snake[i].y) return true
    }
    console.log("snake",snake)
    const isHittingRightWall=snake[0].x >= 580;
    const isHittingLeftWall=snake[0].x <= 0;
    const isHittingBottomWall=snake[0].y >= 580;
    const isHittingTopWall=snake[0].y <= 0;
    console.log(
     isHittingLeftWall, isHittingRightWall,
      isHittingTopWall, isHittingBottomWall
    )
    if (isHittingLeftWall || isHittingRightWall
      || isHittingTopWall || isHittingBottomWall
    ) {
      // game over
      return true
    }
  }
  // change direction
  function changeDirection(e){
    const keypress = e.keyCode
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const isGoingUp = dy == -cellSize;
    const isGoingDown = dy == cellSize;
    const isGoingLeft = dx == -cellSize;
    const isGoingRight = dx == cellSize;
        // IF we are not going left then we can go right
    if (keypress == RIGHT_KEY && !isGoingLeft) { 
      dy=0;dx=cellSize
    }
    if (keypress == LEFT_KEY && !isGoingRight) {
      dy=0;dx=-cellSize
    }
    if (keypress == UP_KEY && !isGoingDown) {
      dy=-cellSize;dx=0
    }
    if (keypress == DOWN_KEY && !isGoingUp) {
      dy=cellSize;dx=0
    }
    updateSnake()
  }
  document.addEventListener("keydown", (event) => {
    event.preventDefault();
    changeDirection(event)
    drawFoodAndSnake();
    // check whether snake crosses wall or not (check for game over) 
    if (isGameOver()) {
      setTimeout(() => {
        alert(`Game Over Score =${score}`)
        document.location.reload()
        return
      }, 10)
    }
  });
  // game loop
  function gameLoop() {
    // setInterval(() => {
    drawScoreBoard();
    drawFoodAndSnake();
    // }, 1000);
  }
  // run game
  function runGame() {
    gameLoop();
  }
  //initiate game
  function initiateGame() {
    gameStarted = true;
    const scoreBoard = document.createElement("div");
    scoreBoard.id = "score-board";
    document.body.insertBefore(scoreBoard, gameBoard);
    runGame();
  }
  // call initiate game when user click on start
  const startButton = document.getElementById("start-button");
  startButton.onclick = !gameStarted && initiateGame;
});

// in following sequence above functions are getting called
// click on start => initiateGame => runGame => gameLoop => drawScoreBoard,drawFoodAndSnake
// click on arrow => changeDirection =>  updateSnake => drawFoodAndSnake => if collison then moveFood => isGameOver() 