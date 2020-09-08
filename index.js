const gameModule = (function () {
    let gameOn = false;
    let playerOneName = "";
    let playerTwoName = "";
    let currentPlayerName = "";
    let currentPlayerSym = "";


    return {
        gameOn: gameOn,
        playerOneName: playerOneName,
        playerTwoName: playerTwoName,
        currentPlayerName: currentPlayerName,
        currentPlayerSym: currentPlayerSym
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
        alert(el.value);
        el.innerHTML = gameModule.currentPlayerSym;

    } else {
        alert("Invalid Move");
    }
}

document.getElementById("startGame").addEventListener("click", checkInput);
document.getElementById('gameBord').addEventListener('click', (e) => {
    updateMoves(e.target);
})