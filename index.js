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
    let gameOn = true;
    let currentPlayerName = playerOneName;
    let currentPlayerSym = "X";
    let playersForm = document.getElementById('playersForm');
    playersForm.style.display = 'none';
    let nextPlayer = document.getElementById('nextPlayer');
    nextPlayer.innerHTML = playerOneName + " Start!";
};


document.getElementById("startGame").addEventListener("click", checkInput);
document.getElementById('gameBord').addEventListener('click', (e) => {
    updateMoves(e.target);
})