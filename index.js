const tiles = document.querySelectorAll(".tile");
const PLAYER_X = 'X'
const PLAYER_O  =   'O';
let turn = PLAYER_X;

const boardState = Array(tiles.length);
boardState.fill(null);

// Elements
const strike = document.getElementById("strike"); //gets strike ID
const gameOverArea = document.getElementById("game-over-area"); // '' 
const gameOverText = document.getElementById("game-over-text"); // ''
const playAgain = document.getElementById("play-again");// ''
//Sound
const gameOverSound = new Audio("sounds/game_over.wav"); // adds audio
const clickSound = new Audio("sounds/click.wav");        // ' ' ' ' ' ' 

tiles.forEach((tile) => tile.addEventListener("click", tileClick));  

function setHoverText() {
    //remove all hover text
    tiles.forEach((tile) =>{
            tile.classList.remove('x-hover');
            tile.classList.remove('o-hover');
    });

    const hoverClass = `${turn.toLowerCase()}-hover`;// ${} can use a variable in a string > in this case turns the "Let turn = X" into lower x and combines witn -hover to give it a class name.
    

   tiles.forEach((tile)=>{
        if (tile.innerText == "") {
            tile.classList.add(hoverClass);
        }
   });
    
}


setHoverText();

function tileClick(event) {
    if (gameOverArea.classList.contains("visbile")){
        return;
    }

    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if(tile.innerText != ""){
        return;
    }
    if(turn === PLAYER_X){  
        tile.innerText = PLAYER_X; // Places X text here
        boardState[tileNumber -1] = PLAYER_X; // when X clicks on tile -1 from array index to get proper tile
        turn = PLAYER_O; // redefines let = turn to PLAYER_O

    }
    else {
        tile.innerText = PLAYER_O; // Places X text here
        boardState[tileNumber -1] = PLAYER_O; // when X clicks on tile -1 from array index to get proper tile
        turn = PLAYER_X; // redefines let = turn to PLAYER_O
    }

    // clickSound.play();
    setHoverText();
    checkWinner();
}

function checkWinner(){
    //check for winner
    for(const winningCombonation of winningCombonations){
        //object Destructing 
        const { combo, strikeClass} = winningCombonation;
        const tileValue1 = boardState[combo[0]-1];
        const tileValue2 = boardState[combo[1]-1];
        const tileValue3 = boardState[combo[2]-1];

       if(
        tileValue1 != null && 
        tileValue1 === tileValue2 &&
        tileValue1 === tileValue3
    )
    {
        strike.classList.add(strikeClass);
       }
    }
}
const winningCombonations = [
        //Rows
        {combo:[1, 2, 3], strikeClass: "strike-row-1"},
        {combo:[4, 5, 6], strikeClass: "strike-row-2"},
        {combo:[7,8,9], strikeClass: "strike-row-3"},
        //Columns
        {combo:[1,4,7], strikeClass: "strike-column-1"},
        {combo:[2,5,8], strikeClass: "strike-column-2"},
        {combo:[3,6,9], strikeClass: "strike-column-3"},
        //Diagonals
        {combo:[1,5,9], strikeClass: "strike-diagonal-1"},
        {combo:[3,5,7], strikeClass: "strike-diagonal-2"},
]