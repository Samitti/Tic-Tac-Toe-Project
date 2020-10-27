import { gameBordModule } from '../index';

test('precence of the game board', () => {
  const board = ['', '', '', '', '', '', '', '', ''];
  expect(gameBordModule.gameBoard).toEqual(board);
});
