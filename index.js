document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementsByClassName("game-board")[0];
  const gameBoardSize=600 // gameBoard.offsetWidth // width includes border 
  console.log('width',gameBoardSize)
  // const snake=document.getElementsByClassName('snake')[0]
  // const food=document.getElementsByClassName('food')[0]
  let cellSize = 20;
  let gameStarted = false;
  let score = 0;
  let food = { x: 240, y: 200 };
  let snake = [
    { x: 120, y: 200 },
    { x: 140, y: 200 },
    { x: 160, y: 200 },
  ];
  let dx = cellSize; // displacement on x axis
  let dy = 0;
  console.log("gameBoard", gameBoard);
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
  function moveFood(){
    let newX,newY
    do{
        newX=Math.floor(Math.random()*((gameBoardSize-cellSize)/cellSize)*cellSize)
        newY=Math.floor(Math.random()*((gameBoardSize-cellSize)/cellSize)*cellSize)

    }while(snake.some(snakePart=>snakePart.x==newX && snakePart.y==newY))
    food={x:newX,y:newY}
  }
   // check whether snake crosses wall or not (check for game over)
   function isGameOver(){
    // console.log('before is game over snake ',snake,snake[snake.length-1].x)
    console.log('is game over snake ',snake)
    console.log(
        (snake.length==0) , (snake[0].x<=0) , (snake[snake.length-1].x>=580) ,
    (snake[0].y<=0) , (snake[snake.length-1].y>=580) 
    )
    if((snake.length==0) || (snake[0].x<=0)|| (snake[snake.length-1].x>=580)
        || (snake[0].y<=0) || (snake[snake.length-1].y>=580) 
        ){
        // game over
       
        return true
    }   
}
   // snake movement
   document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.keyCode == 39) {
      // right
      console.log(event.keyCode)
     snake= snake.map((snakePart) => {
        return {
          ...snakePart,
          x: snakePart.x + 20,
        };
        
      });
    }
    if(snake[snake.length-1].x==food.x && snake[snake.length-1].y==food.y) {
        //collison
        score+=5
        snake.unshift({
            x:snake[0].x-20 ,
            y:snake[0].y
        })
        // show updated score
        drawScoreBoard();
        // move the food
        moveFood()
    }
   
    drawFoodAndSnake();
   
     // check whether snake crosses wall or not (check for game over) 
    
    if(isGameOver()){
      setTimeout(()=>{
        alert(`Game Over Score =${score}`)
        document.location.reload()
        return 
      },10)
        
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
    gameStarted = true;
    gameLoop();
  }
  //initiate game
  function initiateGame() {
    console.log("hi");
    const scoreBoard = document.createElement("div");
    scoreBoard.id = "score-board";
    document.body.insertBefore(scoreBoard, gameBoard);
    // console.log('scoreBoard',scoreBoard)
    runGame();
  }
  // call initiate game when user click on start
  const startButton = document.getElementById("start-button");
  startButton.onclick = initiateGame;
});
