import {
  startGame,
  gameBord,
  replayGame,
  allcells,
  playerOneName,
  playerTwoName,
  domElements,
  // eslint-disable-next-line import/extensions
} from './dom.js';

// eslint-disable-next-line func-names
const gameBordModule = (function () {
  const gameOn = false;
  const playerOneName = '';
  const playerTwoName = '';
  const currentPlayerName = '';
  const currentPlayerSym = '';
  const gameBoard = ['', '', '', '', '', '', '', '', ''];
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
}());

// eslint-disable-next-line func-names
const gameModule = (function () {
  const gameInit = (playerOneName, playerTwoName) => {
    gameBordModule.gameOn = true;
    gameBordModule.playerOneName = playerOneName;
    gameBordModule.playerTwoName = playerTwoName;
    gameBordModule.currentPlayerName = gameBordModule.playerOneName;
    gameBordModule.currentPlayerSym = 'X';
    domElements.inNextPlayer(`${gameBordModule.currentPlayerName} Start!`);
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

  const drawChecker = () => {
    if (gameBordModule.count > 8) {
      return true;
    }
    return false;
  };

  const checkNextMove = () => {
    if (winChecker()) {
      domElements.inGameOver(`${gameBordModule.currentPlayerName} Wins!`);
      domElements.gameOverStyle();
      for (let i = 0; i < allcells.length; i += 1) {
        allcells[i].disabled = true;
      }
      domElements.replayGameStyle();
    } else if (drawChecker()) {
      domElements.inGameOver('No One Wins Game Over!');
      domElements.gameOverStyle();
      domElements.replayGameStyle();
    } else {
      // eslint-disable-next-line no-use-before-define
      playerModule.changePlayer();
    }
  };

  const updateMoves = (el) => {
    if (gameBordModule.gameOn) {
      domElements.clickedBtn(el, gameBordModule.currentPlayerSym);
      gameBordModule.gameBoard[el.value] = gameBordModule.currentPlayerSym;
      el.disabled = true;
      gameBordModule.count += 1;
      checkNextMove();
      domElements.inNextPlayer(`${gameBordModule.currentPlayerName} Turn!`);
    } else {
      domElements.inAlertMsg('Invalid Move');
    }
  };

  const restartGame = () => {
    gameBordModule.currentPlayerName = gameBordModule.playerOneName;
    gameBordModule.currentPlayerSym = 'X';
    gameBordModule.count = 0;
    gameBordModule.gameBoard = ['', '', '', '', '', '', '', '', ''];

    for (let i = 0; i < allcells.length; i += 1) {
      allcells[i].disabled = false;
      domElements.resetBtns(i);
    }
    domElements.replayGameStyleNone();
    domElements.gameOverStyleNone();
  };

  return {
    gameInit,
    checkNextMove,
    winChecker,
    updateMoves,
    drawChecker,
    restartGame,
  };
}());

// eslint-disable-next-line func-names
const playerModule = (function () {
  const checkInput = (ev) => {
    ev.preventDefault();
    if (playerOneName.value === '' || playerTwoName.value === '') {
      domElements.inAlertMsg('NAME CANNOT BE BLANK!');
    } else {
      domElements.playersFormStyle();
      gameModule.gameInit(playerOneName.value, playerTwoName.value);
    }
  };

  const changePlayer = () => {
    if (gameBordModule.currentPlayerName === gameBordModule.playerOneName) {
      gameBordModule.currentPlayerName = gameBordModule.playerTwoName;
      gameBordModule.currentPlayerSym = 'O';
    } else if (gameBordModule.currentPlayerName === gameBordModule.playerTwoName) {
      gameBordModule.currentPlayerName = gameBordModule.playerOneName;
      gameBordModule.currentPlayerSym = 'X';
    }
  };

  return {
    checkInput,
    changePlayer,
  };
}());

document.addEventListener('DOMContentLoaded', () => {
  startGame.addEventListener('click', playerModule.checkInput);
  gameBord.addEventListener('click', (e) => {
    gameModule.updateMoves(e.target);
  });
  replayGame.addEventListener('click', gameModule.restartGame);
});

module.exports = gameModule;
