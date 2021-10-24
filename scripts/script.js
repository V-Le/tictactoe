const mainContainer = document.querySelector('.mainContainer');
const boardContainer = document.querySelector('.boardContainer');
const boardCells = document.querySelectorAll('.boardCell');

//Create Players X and O with factory
function Player(name, peice) {
  let score = 0;
  return { name, peice, score };
}

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

//checks if each cell is empty or not
function isCellEmpty() {
  var checkedCell = true;

  boardCells.forEach(function (boardCell) {
    if (boardCell.innerText != '') {
      checkedCell = false;
    }
  });
  return checkedCell;
}

//if board is not empty, creates a button to clear board
function clearBoard() {
  var isBoardCleared = isCellEmpty();

  if (isBoardCleared == false) {
    const resetBoard = document.createElement('button');
    resetBoard.innerText = 'Reset';
    resetBoard.classList.add('resetBtn');
    resetBoard.setAttribute('style', 'margin: 20px; padding: 5px 20px;');
    mainContainer.appendChild(resetBoard);

    const resetBtn = document.querySelector('.resetBtn');
    resetBtn.addEventListener('click', function () {
      boardCells.forEach(function (boardCell) {
        boardCell.innerHTML = '';
        resetBtn.remove();
      });
    });
  } else {
    console.log('Empty');
  }
}

//Create win conditions of 3 X's or O's in a row
function checkWinCondition() {
  if ((boardCells[0].innerText == "X" && boardCells[1].innerText == "X" && boardCells[2].innerText == "X") ||
      (boardCells[3].innerText == "X" && boardCells[4].innerText == "X" && boardCells[5].innerText == "X") ||
      (boardCells[6].innerText == "X" && boardCells[7].innerText == "X" && boardCells[8].innerText == "X") ||
      (boardCells[0].innerText == "X" && boardCells[4].innerText == "X" && boardCells[8].innerText == "X") ||
      (boardCells[2].innerText == "X" && boardCells[4].innerText == "X" && boardCells[6].innerText == "X") ||
      (boardCells[0].innerText == "X" && boardCells[3].innerText == "X" && boardCells[6].innerText == "X") ||
      (boardCells[1].innerText == "X" && boardCells[4].innerText == "X" && boardCells[7].innerText == "X") ||
      (boardCells[2].innerText == "X" && boardCells[5].innerText == "X" && boardCells[8].innerText == "X")) {
    return 'Congrats Player 1! You won the match!';
  }

  if ((boardCells[0].innerText == "O" && boardCells[1].innerText == "O" && boardCells[2].innerText == "O") ||
      (boardCells[3].innerText == "O" && boardCells[4].innerText == "O" && boardCells[5].innerText == "O") ||
      (boardCells[6].innerText == "O" && boardCells[7].innerText == "O" && boardCells[8].innerText == "O") ||
      (boardCells[0].innerText == "O" && boardCells[4].innerText == "O" && boardCells[8].innerText == "O") ||
      (boardCells[2].innerText == "O" && boardCells[4].innerText == "O" && boardCells[6].innerText == "O") ||
      (boardCells[0].innerText == "O" && boardCells[3].innerText == "O" && boardCells[6].innerText == "O") ||
      (boardCells[1].innerText == "O" && boardCells[4].innerText == "O" && boardCells[7].innerText == "O") ||
      (boardCells[2].innerText == "O" && boardCells[5].innerText == "O" && boardCells[8].innerText == "O")) {
    return 'Congrats Player 2! You won the match!';
  }
  
}

//Start game with Player X allowed to place 1 X on board
function startGame() {
  var peice;
  var odd = 1;

  for(let i = 0; i <= 9; i++) {
    if (i != odd){
      peice = 'X';
    } else {
      peice = 'O';
      odd += 2;
    }
    boardCells.forEach(function (boardCell) {
      boardCell.addEventListener('click', function() {
        boardCell.innerHTML = peice;
      }) 
    });
  }

}

startGame();

//Allow player X and Player O to alternate turns
//End game if a win condition is met
//Give one point to winner and announce winner
//Allow to reset board to play again
//First player to score 10 wins the set

/* const buttons = Array.from(buttonsContainer.querySelectorAll('.button'));
buttons.map(function(button) {
    button.addEventListener('click', (e) => {
        switch (e.target.innerText) {
            case "AC":
                inputArea.innerText = '';
                calcArea.innerText = '';
                tempOne = '';
                tempTwo = '';
                break;
                
            default:
                if (inputArea.innerText == finalAnswer) {
                    calcArea.innerText = '';
                    inputArea.innerText = '';
                    inputArea.innerText += e.target.innerText;
                    break;
                } else {
                inputArea.innerText += e.target.innerText;
                
                }
        }
    }
} */
