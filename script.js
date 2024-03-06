//initialization
const gameArray = new Array(9).fill("");
let turn = "X";
let gameOver = false;

const playerTurn = document.querySelector(".player");
const square = document.querySelectorAll(".square");
const winner = document.querySelector(".winner")

function renderSquare() { // Render Player's mark on the squares
  square.forEach((element, i) => (element.textContent = gameArray[i]));
}

function playerChange() {
  turn === "X" ? (turn = "O") : (turn = "X");
  playerTurn.textContent = turn;
}

function checkRows(numOne, numTwo) { // check Rows for matching
  for (numOne = numTwo - 3; numOne < numTwo; numOne++) {
    if (turn == gameArray[numOne]) {
      continue
    }
    else return false
  }
  return true
}

function checkColumns(numOne, numTwo) { // check Rows for matching
  for (numOne = numTwo - 6; numOne < numTwo+1; numOne=numOne+3) {
    if (turn == gameArray[numOne]) {
      continue
    }
    else return false
  }
  return true
}

function checkDiagonal(array) { // check Rows for matching
  for (let i = 0; i < 3; i++) {
    if (turn == gameArray[array[i]]) {
      continue
    }
    else return false
  }
  return true
}

function checkWinner() {   // Checking for a winner
  if (checkRows(0, 3) || checkRows(3, 6) || checkRows(6, 9)) {
    winner.textContent = `Winner: ${turn}`
    gameOver = true;
    return
  };

  if (checkColumns(0, 6) || checkColumns(1, 7) || checkColumns(2, 8)) {
    winner.textContent = `Winner: ${turn}`
    gameOver = true;
    return
  };

  if (checkDiagonal([0, 4, 8]) || checkDiagonal([2, 4, 6])) {
    winner.textContent = `Winner: ${turn}`
    gameOver = true;
    return
  };
}

function fillSquare(e) { // Pushes mark to Array and then render on DOM
  if (!gameArray[e.target.id] && !gameOver) {
    gameArray[e.target.id] = turn;
    checkWinner();
    playerChange();
  }
  renderSquare();
}

square.forEach((element, i) => {
  element.setAttribute("id", i);
  element.addEventListener("click", (e) => fillSquare(e));
});
