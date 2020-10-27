import {
  playerModule,
  gameBordModule,
} from '../index';

test('check change player to O', () => {
  playerModule.changePlayer();
  expect(gameBordModule.currentPlayerSym).toBe('O');
});

test('check change player to X', () => {
  gameBordModule.currentPlayerName = 'Sami';
  gameBordModule.playerTwoName = 'Sami';
  playerModule.changePlayer();
  expect(gameBordModule.currentPlayerSym).toBe('X');
});