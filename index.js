const gameModule = (function () {
    let gameOn = false;
    let playerOneName = "";
    let playerTwoName = "";
    let currentPlayerName = "";
    let currentPlayerSym = "";
    let gameBoard = ['', '', '', '', '', '', '', '', '' ];
    let count = 0;

    return {
        gameOn: gameOn,
        playerOneName: playerOneName,
        playerTwoName: playerTwoName,
        currentPlayerName: currentPlayerName,
        currentPlayerSym: currentPlayerSym,
        gameBoard: gameBoard,
        count: count
    };
})();

const checkInput = (ev) => {
    ev.preventDefault();
    const playerOneName = document.getElementById("playerOneName").value;
    const playerTwoName = document.getElementById("playerTwoName").value;
    if (playerOneName === "" || playerTwoName === "") {
        alert("Name can't be empty!");
    } else {
        gameInit(playerOneName, playerTwoName);
    }
};



const gameInit = (playerOneName, playerTwoName) => {
    gameModule.gameOn = true;
    gameModule.playerOneName = playerOneName;
    gameModule.playerTwoName = playerTwoName;
    gameModule.currentPlayerName = playerOneName;
    gameModule.currentPlayerSym = "X";
    let playersForm = document.getElementById('playersForm');
    playersForm.style.display = 'none';
    let nextPlayer = document.getElementById('nextPlayer');
    nextPlayer.innerHTML = playerOneName + " Start!";

};

const updateMoves = (el) => {
    if (gameModule.gameOn) {
        el.innerHTML = gameModule.currentPlayerSym;
        gameModule.gameBoard[el.value] = gameModule.currentPlayerSym;
        gameModule.count++;
        winChecker();
        alert(drawChecker());
    } else {
        alert("Invalid Move");
    }
}

const winChecker = () => {
    let win = false;
    let gb = gameModule.gameBoard;
    let winCombinations = [
        [gb[0], gb[1], gb[2]],
        [gb[3], gb[4], gb[5]],
        [gb[6], gb[7], gb[8]],
        [gb[0], gb[3], gb[6]],
        [gb[1], gb[4], gb[7]],
        [gb[2], gb[5], gb[8]],
        [gb[0], gb[4], gb[8]],
        [gb[2], gb[4], gb[6]]
    ];
    let checkSym = (sym) => sym === gameModule.currentPlayerSym;
    winCombinations.forEach((el) => {
        if (el.every(checkSym)) {
            win = true;
        };
    })
    return win;
};

const drawChecker = () => {
    if (gameModule.count > 8) {
        return true;
    } else {
        return false;
    }
}

document.getElementById("startGame").addEventListener("click", checkInput);
document.getElementById('gameBord').addEventListener('click', (e) => {
    updateMoves(e.target);
})