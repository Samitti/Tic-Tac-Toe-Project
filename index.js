import {
  startGame,
  gameBord,
  replayGame,
  allcells,
  nextPlayer,
  playersForm,
  playerOneName,
  playerTwoName,
  alertMsg,
  gameOver,
  // eslint-disable-next-line import/extensions
} from "./dom.js";

// eslint-disable-next-line func-names
const gameBordModule = (function () {
  const gameOn = false;
  const playerOneName = "";
  const playerTwoName = "";
  const currentPlayerName = "";
  const currentPlayerSym = "";
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  const count = 0;

  return {
    gameOn,
    playerOneName,
    playerTwoName,
    currentPlayerName,
    currentPlayerSym,
    gameBoard,
    count,
  };
})();

const playerModule = (function () {
  const checkInput = (ev) => {
    ev.preventDefault();
    if (playerOneName.value === "" || playerTwoName.value === "") {
      alertMsg.innerHTML = "NAME CANNOT BE BLANK!";
    } else {
      gameModule.gameInit(playerOneName.value, playerTwoName.value);
    }
  };

  const changePlayer = () => {
    if (gameBordModule.currentPlayerName === gameBordModule.playerOneName) {
      gameBordModule.currentPlayerName = gameBordModule.playerTwoName;
      gameBordModule.currentPlayerSym = "O";
    } else if (gameBordModule.currentPlayerName === gameBordModule.playerTwoName) {
      gameBordModule.currentPlayerName = gameBordModule.playerOneName;
      gameBordModule.currentPlayerSym = "X";
    }
  };

  return {
    checkInput: checkInput,
    changePlayer: changePlayer,
  }
})();

const gameModule = (function () {
  const gameInit = (playerOneName, playerTwoName) => {
    gameBordModule.gameOn = true;
    gameBordModule.playerOneName = playerOneName;
    gameBordModule.playerTwoName = playerTwoName;
    gameBordModule.currentPlayerName = gameBordModule.playerOneName;
    gameBordModule.currentPlayerSym = "X";
    playersForm.style.display = "none";
    nextPlayer.innerHTML = `${gameBordModule.currentPlayerName} Start!`;
  };

  const winChecker = () => {
    let win = false;
    const gb = gameBordModule.gameBoard;
    const winCombinations = [
      [gb[0], gb[1], gb[2]],
      [gb[3], gb[4], gb[5]],
      [gb[6], gb[7], gb[8]],
      [gb[0], gb[3], gb[6]],
      [gb[1], gb[4], gb[7]],
      [gb[2], gb[5], gb[8]],
      [gb[0], gb[4], gb[8]],
      [gb[2], gb[4], gb[6]],
    ];
    const checkSym = (sym) => sym === gameBordModule.currentPlayerSym;
    winCombinations.forEach((el) => {
      if (el.every(checkSym)) {
        win = true;
      }
    });
    return win;
  };

  const checkNextMove = () => {
    if (winChecker()) {
      gameOver.innerHTML = `${gameBordModule.currentPlayerName} Wins!`;
      gameOver.style.display = "block";
      for (let i = 0; i < allcells.length; i += 1) {
        allcells[i].disabled = true;
      }
      replayGame.style.display = "block";
    } else if (drawChecker()) {
      gameOver.innerHTML = "No One Wins Game Over!";
      gameOver.style.display = "block";
      replayGame.style.display = "block";
    } else {
      playerModule.changePlayer();
    }
  };

  const updateMoves = (el) => {
    if (gameBordModule.gameOn) {
      el.innerHTML = gameBordModule.currentPlayerSym;
      gameBordModule.gameBoard[el.value] = gameBordModule.currentPlayerSym;
      el.disabled = true;
      gameBordModule.count += 1;
      checkNextMove();
      nextPlayer.innerHTML = `${gameBordModule.currentPlayerName} Turn!`;
    } else {
      alertMsg.innerHTML = "Invalid Move";
    }
  };

  const drawChecker = () => {
    if (gameBordModule.count > 8) {
      return true;
    }
    return false;
  };

  const restartGame = () => {
    gameBordModule.currentPlayerName = gameBordModule.playerOneName;
    gameBordModule.currentPlayerSym = "X";
    gameBordModule.count = 0;
    gameBordModule.gameBoard = ["", "", "", "", "", "", "", "", ""];

    for (let i = 0; i < allcells.length; i += 1) {
      allcells[i].disabled = false;
      allcells[i].innerHTML = "";
    }
    replayGame.style.display = "none";
    gameOver.style.display = "none";
  };

  return {
    gameInit: gameInit,
    checkNextMove: checkNextMove,
    winChecker: winChecker,
    updateMoves: updateMoves,
    drawChecker: drawChecker,
    restartGame: restartGame,
  }
})();

startGame.addEventListener("click", playerModule.checkInput);
gameBord.addEventListener("click", (e) => {
  gameModule.updateMoves(e.target);
});
replayGame.addEventListener("click", gameModule.restartGame);