const mainContainer = document.querySelector('.mainContainer');
const boardContainer = document.querySelector('.boardContainer');
const boardCells = document.querySelectorAll('.boardCell');
const currentTurn = document.querySelector('.currentTurn');
const buttons = document.querySelector('.buttons');
const scorep1 = document.querySelector('.score-p1');
const scorep2 = document.querySelector('.score-p2');
var turn = 'X';

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
    resetBoard.innerText = 'Reset Board';
    resetBoard.classList.add('resetBtn');
    resetBoard.setAttribute('style', 'margin: 20px; padding: 5px 20px;');
    buttons.appendChild(resetBoard);

    const resetScore = document.createElement('button');
    resetScore.innerText = 'Reset Score';
    resetScore.classList.add('resetScoreBtn');
    resetScore.setAttribute('style', 'margin: 20px; padding: 5px 20px;');
    buttons.appendChild(resetScore);

    const resetBtn = document.querySelector('.resetBtn');
    resetBtn.addEventListener('click', function () {
      boardCells.forEach(function (boardCell) {
        boardCell.innerHTML = '';
      });
      resetBtn.remove();
      resetScoreBtn.remove();
      startGame();
    });

    const resetScoreBtn = document.querySelector('.resetScoreBtn');
    resetScoreBtn.addEventListener('click', function () {
      boardCells.forEach(function (boardCell) {
        boardCell.innerHTML = '';
      });
      player1.score = 0;
      player2.score = 0;
      scorep1.innerHTML = `Player X has won <br> ${player1.score} time(s)`;
      scorep2.innerHTML = `Player X has won <br> ${player2.score} time(s)`;
      resetBtn.remove();
      resetScoreBtn.remove();
      startGame();
    });
  } else {
    console.log('Empty');
  }
}

//Create win conditions of 3 X's or O's in a row
function checkWinCondition() {
  let winnerFound = false;

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
    currentTurn.innerText = 'Congrats Player 1! You won the match!';
    player1.score += 1;
    scorep1.innerHTML = `Player X has won <br> ${player1.score} time(s)`;
    stopGame();
    winnerFound = true;
    console.log('p1 win');
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
    currentTurn.innerText = 'Congrats Player 2! You won the match!';
    player2.score += 1;
    scorep2.innerHTML = `Player O has won <br> ${player2.score} time(s)`;
    stopGame();
    winnerFound = true;
    console.log('p2 win');
  } else {
    if (!winnerFound) {
      checkTieCondition();
    }
  }
}

function checkTieCondition() {
  const isBoardFull = [...boardCells].every(function (cell) {
    return cell.innerText.includes('X') || cell.innerText.includes('O');
  });
  if (isBoardFull) {
    currentTurn.innerText = 'Game is a tie';
    stopGame();
  }
}

function stopGame() {
  boardCells.forEach(function (boardCell) {
    boardCell.removeEventListener('click', turnMouseHander, { once: true });
  });
  clearBoard();
}

function startGame() {
  turn = 'X';
  currentTurn.innerText = `Current turn is ${turn}`;

  boardCells.forEach(function (boardCell) {
    boardCell.addEventListener('click', turnMouseHander, { once: true });
  });
}

//Allow player X and Player O to alternate turns
function turnMouseHander(e) {
  if (turn == 'X') {
    if (e.target.innerText == '') {
      e.target.innerText = player1.peice;
      turn = 'O';
      currentTurn.innerText = `Current turn is ${turn}`;
      checkWinCondition();
    }
  } else {
    if (e.target.innerText == '') {
      e.target.innerText = player2.peice;
      turn = 'X';
      currentTurn.innerText = `Current turn is ${turn}`;
      checkWinCondition();
    }
  }
}

startGame();
