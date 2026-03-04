const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const playAgainBtn = document.getElementById("play-again-btn");

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over-screen");

const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const finalScore = document.getElementById("final-score");

let score = 0;
let time = 30;
let timer;
let moleTimer;
let holes = [];

function startGame() {
  startScreen.classList.remove("active");
  gameOverScreen.classList.remove("active");
  gameScreen.classList.add("active");

  score = 0;
  time = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = time;

  createGrid();

  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;

    if (time === 0) {
      endGame();
    }
  }, 1000);

  moleTimer = setInterval(showMole, 800);
}

function createGrid() {
  grid.innerHTML = "";
  holes = [];

  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");

    const mole = document.createElement("div");
    mole.classList.add("mole");

    mole.addEventListener("click", hitMole);

    hole.appendChild(mole);
    grid.appendChild(hole);

    holes.push(hole);
  }
}

function showMole() {
  holes.forEach(hole => hole.classList.remove("up"));

  const randomHole = holes[Math.floor(Math.random() * holes.length)];
  randomHole.classList.add("up");
}

function hitMole(e) {
  if (!e.target.parentElement.classList.contains("up")) return;

  score++;
  scoreDisplay.textContent = score;
  e.target.parentElement.classList.remove("up");
}

function endGame() {
  clearInterval(timer);
  clearInterval(moleTimer);
  gameScreen.classList.remove("active");
  gameOverScreen.classList.add("active");
  finalScore.textContent = score;
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);
