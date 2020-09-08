const gameModule = (function () {
    let gameOn = false;
    let playerOneName = "";
    let playerTwoName = "";
    let currentPlayerName = "";
    let currentPlayerSym = "";
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
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
    gameModule.currentPlayerName = gameModule.playerOneName;
    gameModule.currentPlayerSym = "X";
    let playersForm = document.getElementById('playersForm');
    playersForm.style.display = 'none';
    let nextPlayer = document.getElementById('nextPlayer');
    nextPlayer.innerHTML = gameModule.currentPlayerName + " Start!";

};

const updateMoves = (el) => {
    if (gameModule.gameOn) {
        el.innerHTML = gameModule.currentPlayerSym;
        gameModule.gameBoard[el.value] = gameModule.currentPlayerSym;
        el.disabled = true;
        gameModule.count++;
        checkNextMove();
        let nextPlayer = document.getElementById('nextPlayer');
        nextPlayer.innerHTML = gameModule.currentPlayerName + " Turn!";
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

const changePlayer = () => {
    if (gameModule.currentPlayerName === gameModule.playerOneName) {
        gameModule.currentPlayerName = gameModule.playerTwoName;
        gameModule.currentPlayerSym = "O";
    } else if (gameModule.currentPlayerName === gameModule.playerTwoName) {
        gameModule.currentPlayerName = gameModule.playerOneName;
        gameModule.currentPlayerSym = "X";
    }
}

const checkNextMove = () => {
    if (winChecker()) {
        alert(gameModule.currentPlayerName + " Wins!");
        let allcells = document.getElementsByClassName('cell');
        for (let i = 0; i < allcells.length; i++) {
            allcells[i].disabled = true;
        }
        let replayGame = document.getElementById('replayGame');
        replayGame.style.display = 'block';

    } else if (drawChecker()) {
        alert("No One Wins Game Over!")
    } else {
        changePlayer();
    }
};

const replayGame = () => {
    gameModule.currentPlayerName = gameModule.playerOneName;
    gameModule.currentPlayerSym = "X";
    gameModule.count = 0;
    gameModule.gameBoard = ['', '', '', '', '', '', '', '', ''];
    let allcells = document.getElementsByClassName('cell');
    for (let i = 0; i < allcells.length; i++) {
        allcells[i].disabled = false;
        allcells[i].innerHTML = i;
    }
    let replayGame = document.getElementById('replayGame');
    replayGame.style.display = 'none';
}

document.getElementById("startGame").addEventListener("click", checkInput);
document.getElementById('gameBord').addEventListener('click', (e) => {
    updateMoves(e.target);
})
document.getElementById('replayGame').addEventListener('click', replayGame);