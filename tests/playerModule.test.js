import {
  playerModule,
  gameBordModule,
} from '../index';

test('check change player to O', () => {
  expect(playerModule.changePlayer()).toBe('O');
});

test('check change player to X', () => {
  gameBordModule.currentPlayerName = 'Sami';
  gameBordModule.playerTwoName = 'Sami';
  expect(playerModule.changePlayer()).toBe('X');
});