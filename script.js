const gameArray = new Array(9).fill("");
let turn = "X";

const playerTurn = document.querySelector(".player");
const square = document.querySelectorAll(".square");

function renderSquare() {
  square.forEach((element, i) => (element.textContent = gameArray[i]));
}

function fillSquare(e) {
  gameArray[e.target.id] = turn
  turn === "X" ? (turn = "O") : (turn = "X");
  playerTurn.textContent = turn;
  renderSquare();
}

square.forEach((element, i) => {
  element.setAttribute("id", i)
  element.addEventListener("click", (e) => fillSquare(e));
});
