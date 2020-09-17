const startGame = document.getElementById('startGame');
const gameBord = document.getElementById('gameBord');
const replayGame = document.getElementById('replayGame');
const allcells = document.getElementsByClassName('cell');
const nextPlayer = document.getElementById('nextPlayer');
const playersForm = document.getElementById('playersForm');
const playerOneName = document.getElementById('playerOneName');
const playerTwoName = document.getElementById('playerTwoName');
const alertMsg = document.getElementById('alertMsg');
const gameOver = document.getElementById('gameOver');

// eslint-disable-next-line func-names
const domElements = (function () {
  const inAlertMsg = (msg) => {
    alertMsg.innerHTML = msg;
  };

  const inNextPlayer = (msg) => {
    nextPlayer.innerHTML = msg;
  };

  const inGameOver = (msg) => {
    gameOver.innerHTML = msg;
  };

  const clickedBtn = (el, sym) => {
    el.innerHTML = sym;
  };

  const resetBtns = (i) => {
    allcells[i].innerHTML = '';
  };

  const playersFormStyle = () => {
    playersForm.style.display = 'none';
  };

  const gameOverStyle = () => {
    gameOver.style.display = 'block';
  };

  const gameOverStyleNone = () => {
    gameOver.style.display = 'none';
  };

  const replayGameStyle = () => {
    replayGame.style.display = 'block';
  };

  const replayGameStyleNone = () => {
    replayGame.style.display = 'none';
  };

  return {
    inAlertMsg,
    inNextPlayer,
    inGameOver,
    clickedBtn,
    resetBtns,
    playersFormStyle,
    gameOverStyle,
    gameOverStyleNone,
    replayGameStyle,
    replayGameStyleNone,
  };
}());

export {
  startGame,
  gameBord,
  replayGame,
  allcells,
  nextPlayer,
  // playersForm,
  playerOneName,
  playerTwoName,
  alertMsg,
  gameOver,
  domElements,
};