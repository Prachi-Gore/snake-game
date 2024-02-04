
document.addEventListener('DOMContentLoaded',()=>{
    const gameBoard=document.getElementsByClassName('game-board')[0]
    // const snake=document.getElementsByClassName('snake')[0]
    // const food=document.getElementsByClassName('food')[0]
    let cellSize=20;
    let gameStarted=false
    let score=0
    let food={x:300,y:200}
    let snake=[{x:120,y:200},{x:140,y:200},{x:160,y:200}]
    let dx=cellSize; // displacement on x axis
    let dy=0 ;
    console.log('gameBoard',gameBoard);
    // drawScoreBoard
    function drawScoreBoard() {
        const scoreBoard=document.getElementById('score-board')
        scoreBoard.textContent=90

    }
    // draw div
    function drawDiv(x,y,classname){
        // console.log('drawdiv')
        const div =document.createElement('div');
        div.classList.add(classname);
        div.style.top=`${y}px`
        div.style.left=`${x}px`
        return div ;
    }
    function drawFoodAndSnake(){
        // if anything drawn previously first clean it
        gameBoard.innerHTML=''
        // wipe out everything and redraw with new coordinates when snake moves
        const foodElement=drawDiv(food.x,food.y,'food')
        // console.log('foodElement ',foodElement)
        gameBoard.appendChild(foodElement);
        
        // console.log('draw',gameBoard.children)


    }
    // game loop
    function gameLoop(){
        setInterval(()=>{
         drawScoreBoard()
         drawFoodAndSnake()
        },1000)
    }
    // run game
    function runGame(){
   gameStarted=true
   gameLoop()
    }
    //initiate game
function initiateGame(){
     console.log('hi')
     const scoreBoard=document.createElement('div');
     scoreBoard.id='score-board';
     document.body.insertBefore(scoreBoard,gameBoard)
    //   console.log('scoreBoard',scoreBoard)
    runGame()

 }
 // call initiate game when user click on start 
 const startButton=document.getElementById('start-button')
 startButton.onclick=initiateGame

  

   
   
})
