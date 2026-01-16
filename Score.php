let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

function play(index) {
    if (board[index] === "" && !gameOver) {
        board[index] = currentPlayer;
        document.getElementsByClassName("cell")[index].innerHTML = currentPlayer;

        if (checkWin()) {
            document.getElementById("status").innerHTML = "Player " + currentPlayer + " Wins!";
            saveScore(currentPlayer);
            gameOver = true;
        } else if (!board.includes("")) {
            document.getElementById("status").innerHTML = "Draw!";
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("status").innerHTML = "Player " + currentPlayer + " Turn";
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return winPatterns.some(p =>
        board[p[0]] === currentPlayer &&
        board[p[1]] === currentPlayer &&
        board[p[2]] === currentPlayer
    );
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    document.getElementById("status").innerHTML = "Player X Turn";
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
    }
}

function saveScore(player) {
    fetch("score.php?winner=" + player);
}