let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameOver = false;
let vsAI = false;

const cells = document.getElementsByClassName("cell");
const statusText = document.getElementById("status");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");

let scores = JSON.parse(localStorage.getItem("ttt_scores")) || {X:0,O:0};
updateScoreUI();

function play(index) {
    if (board[index] || gameOver) return;

    makeMove(index, currentPlayer);

    let win = checkWin();
    if (win) return endGame(`${currentPlayer} Wins 🎉`, win);

    if (!board.includes("")) return endGame("Draw 🤝");

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerHTML = `Player ${currentPlayer} Turn`;

    if (vsAI && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
}

function makeMove(i, player) {
    board[i] = player;
    cells[i].innerHTML = player;
    cells[i].classList.add(player.toLowerCase());
    clickSound.play();
}

function aiMove() {
    let empty = board.map((v,i)=>v===""?i:null).filter(v=>v!==null);
    let move = empty[Math.floor(Math.random()*empty.length)];
    play(move);
}

function checkWin() {
    const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let p of wins) {
        if (board[p[0]] && board[p[0]]===board[p[1]] && board[p[1]]===board[p[2]]) {
            return p;
        }
    }
    return null;
}

function endGame(msg, pattern=null) {
    statusText.innerHTML = msg;
    gameOver = true;
    if (pattern) {
        pattern.forEach(i=>cells[i].style.background="#90ee90");
        scores[currentPlayer]++;
        winSound.play();
        saveScores();
        updateScoreUI();
    }
}

function resetGame() {
    board = ["","","","","","","","",""];
    currentPlayer = "X";
    gameOver = false;
    statusText.innerHTML = "Player X Turn";
    for (let c of cells) {
        c.innerHTML="";
        c.className="cell";
        c.style.background="#fff";
    }
}

function saveScores() {
    localStorage.setItem("ttt_scores", JSON.stringify(scores));
}

function updateScoreUI() {
    document.getElementById("score").innerHTML =
        `❌ X: ${scores.X} &nbsp;&nbsp; ⭕ O: ${scores.O}`;
}

function toggleAI() {
    vsAI = !vsAI;
    resetGame();
    alert(vsAI ? "AI Mode ON 🤖" : "2 Player Mode 👥");
}

function toggleMode() {
    document.body.classList.toggle("light");
        }
