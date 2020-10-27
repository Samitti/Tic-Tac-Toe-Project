import {
  gameModule,
  gameBordModule,
} from '../index';

test('check draw condition false', () => {
  expect(gameModule.drawChecker()).toBe(false);
});

test('check draw condition true', () => {
  gameBordModule.count = 9;
  expect(gameModule.drawChecker()).toBe(true);
});

test('win check if no symbol is assigned', () => {
  expect(gameModule.winChecker()).toBe(true);
});

test('win check if symbol is assigned', () => {
  gameBordModule.currentPlayerSym = 'X';
  expect(gameModule.winChecker()).toBe(false);
});

// test('updateMoves', () => {
//   gameBordModule.gameOn = false;
//   expect(gameModule.updateMoves()).toBe(gameBordModule.count = 0);
// });

// test('updateMoves', () => {
//   gameBordModule.gameOn = true;
//   expect(gameModule.updateMoves()).toBe(gameBordModule.count = 1);
// });