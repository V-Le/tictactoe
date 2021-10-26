const mainContainer = document.querySelector('.mainContainer');
const boardContainer = document.querySelector('.boardContainer');
const boardCells = document.querySelectorAll('.boardCell'); 
const currentTurn = document.querySelector('.currentTurn');

//https://stackoverflow.com/questions/32537168/make-players-take-turns-playing-tic-tac-toe-in-javascript?rq=1

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
  if (
    (boardCells[0].innerText == 'X' &&
      boardCells[1].innerText == 'X' &&
      boardCells[2].innerText == 'X') ||
    (boardCells[3].innerText == 'X' &&
      boardCells[4].innerText == 'X' &&
      boardCells[5].innerText == 'X') ||
    (boardCells[6].innerText == 'X' &&
      boardCells[7].innerText == 'X' &&
      boardCells[8].innerText == 'X') ||
    (boardCells[0].innerText == 'X' &&
      boardCells[4].innerText == 'X' &&
      boardCells[8].innerText == 'X') ||
    (boardCells[2].innerText == 'X' &&
      boardCells[4].innerText == 'X' &&
      boardCells[6].innerText == 'X') ||
    (boardCells[0].innerText == 'X' &&
      boardCells[3].innerText == 'X' &&
      boardCells[6].innerText == 'X') ||
    (boardCells[1].innerText == 'X' &&
      boardCells[4].innerText == 'X' &&
      boardCells[7].innerText == 'X') ||
    (boardCells[2].innerText == 'X' &&
      boardCells[5].innerText == 'X' &&
      boardCells[8].innerText == 'X')
  ) {
    console.log('Congrats Player 1! You won the match!');
    clearBoard();
  }

  if (
    (boardCells[0].innerText == 'O' &&
      boardCells[1].innerText == 'O' &&
      boardCells[2].innerText == 'O') ||
    (boardCells[3].innerText == 'O' &&
      boardCells[4].innerText == 'O' &&
      boardCells[5].innerText == 'O') ||
    (boardCells[6].innerText == 'O' &&
      boardCells[7].innerText == 'O' &&
      boardCells[8].innerText == 'O') ||
    (boardCells[0].innerText == 'O' &&
      boardCells[4].innerText == 'O' &&
      boardCells[8].innerText == 'O') ||
    (boardCells[2].innerText == 'O' &&
      boardCells[4].innerText == 'O' &&
      boardCells[6].innerText == 'O') ||
    (boardCells[0].innerText == 'O' &&
      boardCells[3].innerText == 'O' &&
      boardCells[6].innerText == 'O') ||
    (boardCells[1].innerText == 'O' &&
      boardCells[4].innerText == 'O' &&
      boardCells[7].innerText == 'O') ||
    (boardCells[2].innerText == 'O' &&
      boardCells[5].innerText == 'O' &&
      boardCells[8].innerText == 'O')
  ) {
    console.log('Congrats Player 2! You won the match!');
    clearBoard();
  }
}

//Allow player X and Player O to alternate turns
function alternateTurns() {
  var turn = 'X';
  currentTurn.innerText = `Current turn is ${turn}`;

  boardCells.forEach(function (boardCell) {
    boardCell.addEventListener('click', function (e) {
      if (turn == 'X') {
        if (e.target.innerText == '') {
          e.target.innerText = player1.peice;
          turn = 'O';
          checkWinCondition();
          currentTurn.innerText = `Current turn is ${turn}`;
        }
      } else {
        if (e.target.innerText == '') {
          e.target.innerText = player2.peice;
          turn = 'X';
          checkWinCondition();
          currentTurn.innerText = `Current turn is ${turn}`;
        }
      }
    });
  });
}



//End game if a win condition is met
//Give one point to winner and announce winner
//Allow to reset board to play again
//First player to score 10 wins the set
