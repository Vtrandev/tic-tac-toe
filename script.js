//initialization
const gameArray = new Array(9).fill("");
let turn = ["X"];
let gameOver = false;
let nameOne;
let nameTwo;

const playerTurn = document.querySelector(".player");
const playerName = document.querySelector(".player__name");
const newGame = document.querySelector(".btn__new_game");
const square = document.querySelectorAll(".square");
const winner = document.querySelector(".winner");
const form = document.querySelector(".form");

newGame.addEventListener("click", reset);
form.addEventListener("submit", validateForm);

function reset() {
  gameArray.fill("");
  gameOver = false;
  winner.textContent = nameOne = nameTwo = "";
  playerName.textContent = "Player";
  turn = ["X"];
  playerTurn.textContent = turn;
  renderSquare();
}

function validateForm(e) {
  const [playerOne, playerTwo] = e.target;
  nameOne = ["X", playerOne.value];
  nameTwo = ["O", playerTwo.value];
  e.preventDefault();
  nameChange(nameOne[1]);
}

function renderSquare() {
  // Render Player's mark on the squares
  square.forEach((element, i) => (element.textContent = gameArray[i]));
}

function nameChange(name) {
  turn[1] = name
  playerName.textContent = name;
}

function playerChange() {
  if (turn[0] === "X") {
    turn[0] = "O";
    nameTwo && nameChange(nameTwo[1]);
  } else {
    turn[0] = "X";
    nameOne && nameChange(nameOne[1]);
  }
  playerTurn.textContent = turn[0];
}

// function checkRows(numOne, numTwo) {
//   // check Rows for matching
//   for (numOne = numTwo - 3; numOne < numTwo; numOne++) {
//     if (turn == gameArray[numOne]) {
//       continue;
//     } else return false;
//   }
//   return true;
// }

// function checkColumns(numOne, numTwo) {
//   // check Rows for matching
//   for (numOne = numTwo - 6; numOne < numTwo + 1; numOne = numOne + 3) {
//     if (turn == gameArray[numOne]) {
//       continue;
//     } else return false;
//   }
//   return true;
// }

function checkLine(array) {
  // check line for matching
  for (let i = 0; i < 3; i++) {
    if (turn[0] == gameArray[array[i]]) {
      continue;
    } else return false;
  }
  return true;
}

function checkWinner(name) {
  // Checking for a winner
  if (
    checkLine([0, 1, 2]) ||
    checkLine([3, 4, 5]) ||
    checkLine([6, 7, 8]) ||
    checkLine([0, 3, 6]) ||
    checkLine([1, 4, 7]) ||
    checkLine([2, 5, 8]) ||
    checkLine([0, 4, 8]) ||
    checkLine([2, 4, 6])
  ) {
    winner.textContent = `Winner: ${name[1] || name[0]}!`;
    gameOver = true;
    return;
  }
}

function fillSquare(e) {
  // Pushes mark to Array and then render on DOM
  if (!gameArray[e.target.id] && !gameOver) {
    gameArray[e.target.id] = turn[0];
    checkWinner(turn);
    playerChange();
  }
  renderSquare();
}

square.forEach((element, i) => {
  element.setAttribute("id", i);
  element.addEventListener("click", (e) => fillSquare(e));
});
