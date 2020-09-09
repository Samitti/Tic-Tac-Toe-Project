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
} from './dom.js';

// eslint-disable-next-line func-names
const gameModule = (function () {
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

const gameInit = (playerOneName, playerTwoName) => {
  gameModule.gameOn = true;
  gameModule.playerOneName = playerOneName;
  gameModule.playerTwoName = playerTwoName;
  gameModule.currentPlayerName = gameModule.playerOneName;
  gameModule.currentPlayerSym = 'X';
  playersForm.style.display = 'none';
  nextPlayer.innerHTML = `${gameModule.currentPlayerName} Start!`;
};

const checkInput = (ev) => {
  ev.preventDefault();
  if (playerOneName.value === '' || playerTwoName.value === '') {
    alertMsg.innerHTML = 'NAME CANNOT BE BLANK!';
  } else {
    gameInit(playerOneName.value, playerTwoName.value);
  }
};

const winChecker = () => {
  let win = false;
  const gb = gameModule.gameBoard;
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
  const checkSym = (sym) => sym === gameModule.currentPlayerSym;
  winCombinations.forEach((el) => {
    if (el.every(checkSym)) {
      win = true;
    }
  });
  return win;
};

const changePlayer = () => {
  if (gameModule.currentPlayerName === gameModule.playerOneName) {
    gameModule.currentPlayerName = gameModule.playerTwoName;
    gameModule.currentPlayerSym = 'O';
  } else if (gameModule.currentPlayerName === gameModule.playerTwoName) {
    gameModule.currentPlayerName = gameModule.playerOneName;
    gameModule.currentPlayerSym = 'X';
  }
};

const drawChecker = () => {
  if (gameModule.count > 8) {
    return true;
  }
  return false;
};

const checkNextMove = () => {
  if (winChecker()) {
    gameOver.innerHTML = `${gameModule.currentPlayerName} Wins!`;
    gameOver.style.display = 'block';
    for (let i = 0; i < allcells.length; i += 1) {
      allcells[i].disabled = true;
    }
    replayGame.style.display = 'block';
  } else if (drawChecker()) {
    gameOver.innerHTML = 'No One Wins Game Over!';
    gameOver.style.display = 'block';
    replayGame.style.display = 'block';
  } else {
    changePlayer();
  }
};

const updateMoves = (el) => {
  if (gameModule.gameOn) {
    el.innerHTML = gameModule.currentPlayerSym;
    gameModule.gameBoard[el.value] = gameModule.currentPlayerSym;
    el.disabled = true;
    gameModule.count += 1;
    checkNextMove();
    nextPlayer.innerHTML = `${gameModule.currentPlayerName} Turn!`;
  } else {
    alertMsg.innerHTML = 'Invalid Move';
  }
};

const restartGame = () => {
  gameModule.currentPlayerName = gameModule.playerOneName;
  gameModule.currentPlayerSym = 'X';
  gameModule.count = 0;
  gameModule.gameBoard = ['', '', '', '', '', '', '', '', ''];

  for (let i = 0; i < allcells.length; i += 1) {
    allcells[i].disabled = false;
    allcells[i].innerHTML = i;
  }
  replayGame.style.display = 'none';
  gameOver.style.display = 'none';
};

startGame.addEventListener('click', checkInput);
gameBord.addEventListener('click', (e) => {
  updateMoves(e.target);
});
replayGame.addEventListener('click', restartGame);